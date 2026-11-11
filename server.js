const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const db = require('./src/database/db');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');
const SRC_CSS_DIR = path.join(ROOT_DIR, 'src', 'css');
const SRC_JS_DIR = path.join(ROOT_DIR, 'src', 'js');

// Inisialisasi SQLite Database saat server dimulai
db.initDatabase();

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const ROUTE_ALIASES = {
    '/': '/index.html',
    '/admin': '/admin_jei.html',
    '/admin_JEI.html': '/admin_jei.html',
    '/admin_JEI_2026.html': '/admin_jei.html',
    '/kasir': '/kasir_jei.html',
    '/kasir.html': '/kasir_jei.html',
    '/keuangan': '/keuangan_jei.html',
    '/keuangan.html': '/keuangan_jei.html'
};

// Security Headers standar industri
const SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block'
};

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, {
        ...SECURITY_HEADERS,
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
    });
    res.end(JSON.stringify(payload, null, 2));
}

function readJsonBody(req, maxBytes = 5 * 1024 * 1024) {
    return new Promise((resolve, reject) => {
        let body = '';
        let total = 0;
        req.on('data', chunk => {
            total += chunk.length;
            if (total > maxBytes) {
                reject(new Error('Payload too large'));
                req.destroy();
                return;
            }
            body += chunk.toString('utf8');
        });
        req.on('end', () => {
            if (!body) return resolve({});
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(new Error('Invalid JSON payload'));
            }
        });
        req.on('error', reject);
    });
}

function openBrowser(url) {
    const platform = process.platform;
    const cmd =
        platform === 'win32'
            ? `start "" "${url}"`
            : platform === 'darwin'
            ? `open "${url}"`
            : `xdg-open "${url}"`;
    exec(cmd, () => {});
}

function resolveFilePath(pathname) {
    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '').replace(/^[\/\\]+/, '');

    const candidates = [
        path.join(PUBLIC_DIR, safePath),
        path.join(ROOT_DIR, safePath),
        path.join(ASSETS_DIR, path.basename(safePath)),
        path.join(SRC_CSS_DIR, path.basename(safePath)),
        path.join(SRC_JS_DIR, path.basename(safePath))
    ];

    for (const candidate of candidates) {
        if (!candidate.startsWith(ROOT_DIR)) continue;

        if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
            const indexInDir = path.join(candidate, 'index.html');
            if (fs.existsSync(indexInDir)) return indexInDir;
            continue;
        }

        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
            return candidate;
        }

        if (!path.extname(candidate)) {
            const htmlCandidate = `${candidate}.html`;
            if (fs.existsSync(htmlCandidate) && fs.statSync(htmlCandidate).isFile()) {
                return htmlCandidate;
            }
        }
    }

    return null;
}

const server = http.createServer(async (req, res) => {
    try {
        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        let pathname = decodeURIComponent(parsedUrl.pathname);

        // --- REST API ENDPOINTS (DATABASE & SECURITY) ---
        if (pathname === '/api/v1/health' && req.method === 'GET') {
            return sendJson(res, 200, {
                status: 'OK',
                timestamp: new Date().toISOString(),
                database: db.getDatabaseStats()
            });
        }

        if (pathname === '/api/v1/sync') {
            if (req.method === 'GET') {
                return sendJson(res, 200, db.getAllSyncState());
            }
            if (req.method === 'POST') {
                const body = await readJsonBody(req);
                const clientIp = req.socket.remoteAddress || '127.0.0.1';
                const result = db.syncFromClientStorage(body.storage || {}, {
                    ip: clientIp,
                    actor: body.actor || 'WEB_CLIENT',
                    role: body.role || 'PORTAL_USER'
                });
                return sendJson(res, 200, result);
            }
        }

        if (pathname === '/api/v1/customers' && req.method === 'GET') {
            return sendJson(res, 200, {
                pointsPerTransaction: db.POINTS_PER_TRANSACTION,
                customers: db.getDecryptedCustomers()
            });
        }

        if (pathname === '/api/v1/transactions' && req.method === 'GET') {
            return sendJson(res, 200, {
                transactions: db.getDecryptedTransactions()
            });
        }

        if (pathname === '/api/v1/backup' && req.method === 'POST') {
            const backupPath = db.createDatabaseBackup();
            return sendJson(res, 200, {
                status: 'BACKUP_CREATED',
                file: path.relative(ROOT_DIR, backupPath)
            });
        }

        // --- STATIC FILE ROUTING ---
        if (ROUTE_ALIASES[pathname]) {
            pathname = ROUTE_ALIASES[pathname];
        }

        // Blokir akses langsung ke folder database/ dan file rahasia dari HTTP publik
        if (pathname.startsWith('/database') || pathname.includes('.security_key')) {
            res.writeHead(403, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('403 Forbidden: Protected Database Resource');
            return;
        }

        const filePath = resolveFilePath(pathname);

        if (!filePath) {
            res.writeHead(404, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`404 Not Found: ${pathname}`);
            return;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`500 Internal Server Error: ${err.code}`);
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            res.writeHead(200, {
                ...SECURITY_HEADERS,
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            res.end(content);
        });
    } catch (e) {
        res.writeHead(500, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
    }
});

function startServer(port) {
    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            startServer(port + 1);
        } else {
            console.error('Gagal menjalankan server:', err);
            process.exit(1);
        }
    });

    server.listen(port, () => {
        const baseUrl = `http://localhost:${port}`;
        const stats = db.getDatabaseStats();
        console.log('==========================================================');
        console.log('  JANTUNG EMAS INDONESIA - SERVER & SQLITE DB AKTIF');
        console.log('==========================================================');
        console.log(`  Website Utama   : ${baseUrl}/index.html`);
        console.log(`  Portal Admin    : ${baseUrl}/admin_jei.html`);
        console.log(`  Portal Kasir    : ${baseUrl}/kasir_jei.html`);
        console.log(`  Portal Keuangan : ${baseUrl}/keuangan_jei.html`);
        console.log(`  API Health & DB : ${baseUrl}/api/v1/health`);
        console.log('----------------------------------------------------------');
        console.log(`  Database Engine : ${stats.engine}`);
        console.log(`  Lokasi File DB  : ${stats.databaseFile}`);
        console.log(`  Aturan Point    : ${stats.loyaltyRule}`);
        console.log('----------------------------------------------------------');
        console.log('  Tekan Ctrl + C untuk menghentikan server.');
        console.log('==========================================================');

        const args = process.argv.slice(2);
        const openArg = args.find((arg) => arg.startsWith('--open'));
        if (openArg) {
            const parts = openArg.split('=');
            const targetPage = parts[1] ? `/${parts[1].replace(/^\//, '')}` : '/index.html';
            openBrowser(`${baseUrl}${targetPage}`);
        }
    });
}

startServer(DEFAULT_PORT);
