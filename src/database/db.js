/**
 * JANTUNG EMAS INDONESIA (JEI) - RELATIONAL ACID DATABASE ENGINE (SQLite 3 WAL)
 * Dirancang khusus untuk kebutuhan:
 * - Buyback Emas Multi-Kadar & Multi-Cabang
 * - Database Pelanggan KYC Terenkripsi (AES-256-GCM) & Point Loyalitas (1 Transaksi = 1 Point)
 * - Akuntansi & Keuangan Terintegrasi (Penjualan Buyer, Biaya, Utang, Jurnal, Tutup Buku)
 * - Audit Trail Keamanan & Anti-Tampering Nota
 */

const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');
const cryptoService = require('../security/cryptoService');

const DB_DIR = path.join(__dirname, '..', '..', 'database');
const BACKUP_DIR = path.join(DB_DIR, 'backups');
const DB_FILE = path.join(DB_DIR, 'jei_buyback.sqlite');
const SCHEMA_FILE = path.join(DB_DIR, 'schema.sql');

const POINTS_PER_TRANSACTION = 1;

const DEFAULT_OUTLETS = [
    {
        id: 1,
        branchCode: 'JKT',
        name: 'Outlet Jakarta (Pusat & Selatan)',
        tagline: 'Store Utama Jantung Emas',
        address: 'Jl. Gajah Mada No. 88 / Mall Ambassador Area, Jakarta Pusat',
        mapUrl: 'https://maps.google.com/?q=Jakarta',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    },
    {
        id: 2,
        branchCode: 'GS',
        name: 'Outlet Tangerang & BSD',
        tagline: 'Outlet Resmi Tangerang & BSD',
        address: 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang',
        mapUrl: 'https://maps.google.com/?q=BSD+City',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    },
    {
        id: 3,
        branchCode: 'BKS',
        name: 'Outlet Bekasi & Depok',
        tagline: 'Outlet Resmi Bekasi & Depok',
        address: 'Ruko Summarecon Bekasi & Margonda Raya, Depok',
        mapUrl: 'https://maps.google.com/?q=Bekasi',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    }
];

const DEFAULT_KARAT_DATA = [
    { name: '24K+', percent: 1.04 },
    { name: '24K',  percent: 1.000 },
    { name: '23K',  percent: 0.931 },
    { name: '22K',  percent: 0.865 },
    { name: '21K',  percent: 0.826 },
    { name: '20K',  percent: 0.789 },
    { name: '19K',  percent: 0.745 },
    { name: '18K',  percent: 0.707 },
    { name: '17K',  percent: 0.690 },
    { name: '16K',  percent: 0.640 },
    { name: '15K',  percent: 0.589 },
    { name: '14K',  percent: 0.549 },
    { name: '13K',  percent: 0.510 },
    { name: '12K',  percent: 0.471 },
    { name: '11K',  percent: 0.432 },
    { name: '10K',  percent: 0.392 },
    { name: '9K',   percent: 0.370 },
    { name: '8K',   percent: 0.340 },
    { name: '7K',   percent: 0.279 },
    { name: '6K',   percent: 0.250 }
];

const DEFAULT_CUSTOMERS = [
    {
        id: 'CUST-1',
        name: 'KEVIN RAFIF FELIATRA',
        ktp: '1471091307970021',
        phone: '082122126634',
        address: 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang',
        bankName: 'BCA',
        bankRek: '8830918273',
        bankAn: 'KEVIN RAFIF FELIATRA',
        paymentMethod: 'TRANSFER',
        outletId: 2,
        trxCount: 2,
        points: 2,
        pointsMigratedTo1: true
    },
    {
        id: 'CUST-2',
        name: 'HENDRA WIJAYA',
        ktp: '3174051804880003',
        phone: '081288997711',
        address: 'Jl. Jenderal Sudirman No. 45, Jakarta Selatan, DKI Jakarta',
        bankName: 'MANDIRI',
        bankRek: '1240009876543',
        bankAn: 'HENDRA WIJAYA',
        paymentMethod: 'TRANSFER',
        outletId: 1,
        trxCount: 3,
        points: 3,
        pointsMigratedTo1: true
    },
    {
        id: 'CUST-3',
        name: 'SITI NURHALIZA',
        ktp: '3275014509920012',
        phone: '081355667788',
        address: 'Jl. Ahmad Yani Kav. 12, Bekasi Selatan, Kota Bekasi',
        bankName: 'BRI',
        bankRek: '034101002938475',
        bankAn: 'SITI NURHALIZA',
        paymentMethod: 'TRANSFER',
        outletId: 3,
        trxCount: 1,
        points: 1,
        pointsMigratedTo1: true
    }
];

let dbInstance = null;

function initDatabase() {
    if (dbInstance) return dbInstance;

    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

    dbInstance = new DatabaseSync(DB_FILE);
    dbInstance.exec('PRAGMA journal_mode = WAL;');
    dbInstance.exec('PRAGMA synchronous = NORMAL;');
    dbInstance.exec('PRAGMA foreign_keys = ON;');

    const schemaSql = fs.readFileSync(SCHEMA_FILE, 'utf8');
    dbInstance.exec(schemaSql);

    seedInitialData(dbInstance);
    return dbInstance;
}

function seedInitialData(db) {
    // 1. Seed Outlets
    const outletCount = db.prepare('SELECT COUNT(*) AS cnt FROM outlets').get().cnt;
    if (outletCount === 0) {
        const insertOutlet = db.prepare(`
            INSERT INTO outlets (id, branch_code, name, tagline, address, map_url, whatsapp, operating_hours)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const o of DEFAULT_OUTLETS) {
            insertOutlet.run(o.id, o.branchCode, o.name, o.tagline, o.address, o.mapUrl, o.whatsapp, o.hours);
        }
    }

    // 2. Seed Gold Karat Rates
    const karatCount = db.prepare('SELECT COUNT(*) AS cnt FROM gold_karat_rates').get().cnt;
    if (karatCount === 0) {
        const base24k = 2280000;
        const insertKarat = db.prepare(`
            INSERT INTO gold_karat_rates (karat_name, purity_percent, base_price_24k, calculated_price_per_gram, display_order)
            VALUES (?, ?, ?, ?, ?)
        `);
        DEFAULT_KARAT_DATA.forEach((k, idx) => {
            const calc = Math.floor((base24k * k.percent) / 1000) * 1000;
            insertKarat.run(k.name, k.percent, base24k, calc, idx + 1);
        });
    }

    // 3. Seed Users with Salted PBKDF2-HMAC-SHA512 Hashes
    const userCount = db.prepare('SELECT COUNT(*) AS cnt FROM users').get().cnt;
    if (userCount === 0) {
        const defaultUsers = [
            { id: 'USR-SUPER', username: 'superadmin', fullName: 'SUPERADMIN PUSAT JEI', role: 'SUPERADMIN', outletId: null, branchCode: 'HQ', pin: 'JEI2026' },
            { id: 'USR-ADMIN', username: 'admin', fullName: 'ADMIN CABANG JEI', role: 'ADMIN_CABANG', outletId: 2, branchCode: 'GS', pin: '123456' },
            { id: 'USR-KASIR-1', username: 'fakar', fullName: 'FAKAR (KASIR GADING SERPONG)', role: 'KASIR', outletId: 2, branchCode: 'GS', pin: '1234' },
            { id: 'USR-FIN-1', username: 'keuangan', fullName: 'KEUANGAN PUSAT JEI', role: 'HEAD_FINANCE', outletId: null, branchCode: 'HQ', pin: '123456' }
        ];
        const insertUser = db.prepare(`
            INSERT INTO users (id, username, full_name, role, outlet_id, branch_code, password_hash, password_salt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const u of defaultUsers) {
            const { hash, salt } = cryptoService.hashPassword(u.pin);
            insertUser.run(u.id, u.username, u.fullName, u.role, u.outletId, u.branchCode, hash, salt);
        }
    }

    // 4. Seed Customers (1 Transaksi = 1 Point, Encrypted KTP & Bank Rek)
    const custCount = db.prepare('SELECT COUNT(*) AS cnt FROM customers').get().cnt;
    if (custCount === 0) {
        for (const c of DEFAULT_CUSTOMERS) {
            upsertCustomerRecord(db, c);
        }
    }
}

function normalizeCustomerPointsObject(c) {
    const trxCount = Math.max(0, Number(c.trxCount) || 0);
    let points = Math.max(0, Number(c.points) || 0);
    if (!c.pointsMigratedTo1 && trxCount > 0 && points === trxCount * 10) {
        points = trxCount * POINTS_PER_TRANSACTION;
    } else if (points === 0 && trxCount > 0 && !c.manualTrxOverride) {
        points = trxCount * POINTS_PER_TRANSACTION;
    }
    return {
        ...c,
        trxCount,
        points,
        pointsMigratedTo1: true
    };
}

function upsertCustomerRecord(db, rawCust) {
    const c = normalizeCustomerPointsObject(rawCust);
    const id = String(c.id || 'CUST-' + Date.now());
    const fullName = String(c.name || c.full_name || '').trim().toUpperCase();
    if (!fullName) return;

    const rawKtp = String(c.ktp || '').trim();
    const ktpMasked = cryptoService.maskKtp(rawKtp);
    const ktpEncrypted = cryptoService.encryptSensitiveField(rawKtp);
    const ktpBlindHash = cryptoService.createBlindIndex(rawKtp);

    const rawRek = String(c.bankRek || '').trim();
    const rekMasked = cryptoService.maskBankAccount(rawRek);
    const rekEncrypted = cryptoService.encryptSensitiveField(rawRek);

    const stmt = db.prepare(`
        INSERT INTO customers (
            id, full_name, ktp_masked, ktp_encrypted, ktp_blind_hash,
            phone, address, bank_name, bank_rek_masked, bank_rek_encrypted,
            bank_account_holder, preferred_payment_method, outlet_id,
            trx_count, loyalty_points, manual_trx_override, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))
        ON CONFLICT(id) DO UPDATE SET
            full_name = excluded.full_name,
            ktp_masked = excluded.ktp_masked,
            ktp_encrypted = excluded.ktp_encrypted,
            ktp_blind_hash = excluded.ktp_blind_hash,
            phone = excluded.phone,
            address = excluded.address,
            bank_name = excluded.bank_name,
            bank_rek_masked = excluded.bank_rek_masked,
            bank_rek_encrypted = excluded.bank_rek_encrypted,
            bank_account_holder = excluded.bank_account_holder,
            preferred_payment_method = excluded.preferred_payment_method,
            outlet_id = excluded.outlet_id,
            trx_count = excluded.trx_count,
            loyalty_points = excluded.loyalty_points,
            manual_trx_override = excluded.manual_trx_override,
            updated_at = datetime('now', 'localtime')
    `);

    stmt.run(
        id,
        fullName,
        ktpMasked,
        ktpEncrypted,
        ktpBlindHash,
        String(c.phone || '-').trim(),
        String(c.address || '-').trim(),
        String(c.bankName || '').trim().toUpperCase(),
        rekMasked,
        rekEncrypted,
        String(c.bankAn || fullName).trim().toUpperCase(),
        String(c.paymentMethod || 'TRANSFER').trim().toUpperCase(),
        Number(c.outletId) || 2,
        c.trxCount,
        c.points,
        c.manualTrxOverride ? 1 : 0
    );
}

function getDecryptedCustomers() {
    const db = initDatabase();
    const rows = db.prepare('SELECT * FROM customers ORDER BY id ASC').all();
    return rows.map(r => ({
        id: r.id,
        name: r.full_name,
        ktp: cryptoService.decryptSensitiveField(r.ktp_encrypted, r.ktp_masked),
        ktpMasked: r.ktp_masked,
        phone: r.phone,
        address: r.address,
        bankName: r.bank_name,
        bankRek: cryptoService.decryptSensitiveField(r.bank_rek_encrypted, r.bank_rek_masked),
        bankRekMasked: r.bank_rek_masked,
        bankAn: r.bank_account_holder || r.full_name,
        paymentMethod: r.preferred_payment_method || 'TRANSFER',
        outletId: Number(r.outlet_id) || 2,
        trxCount: Number(r.trx_count) || 0,
        points: Number(r.loyalty_points) || 0,
        manualTrxOverride: Boolean(r.manual_trx_override),
        pointsMigratedTo1: true
    }));
}

function upsertTransactionRecord(db, trx) {
    if (!trx || !trx.invoiceNo) return;
    const id = String(trx.id || 'TRX-' + Date.now());
    const invoiceNo = String(trx.invoiceNo).trim();
    const items = Array.isArray(trx.items) ? trx.items : [];
    const totalWeight = items.reduce((acc, it) => acc + (Number(it.weight) || 0), 0);
    const signature = cryptoService.signTransactionIntegrity(trx);

    const ktpEncrypted = cryptoService.encryptSensitiveField(trx.customerKtp || '');
    const ktpMasked = cryptoService.maskKtp(trx.customerKtp || '');
    const rekEncrypted = cryptoService.encryptSensitiveField(trx.bankRek || '');
    const rekMasked = cryptoService.maskBankAccount(trx.bankRek || '');

    const stmt = db.prepare(`
        INSERT INTO buyback_transactions (
            id, invoice_no, transaction_date, outlet_id, branch_code, branch_name, branch_address,
            customer_name, customer_ktp_encrypted, customer_ktp_masked, customer_phone, customer_address,
            payment_method, bank_name, bank_rek_encrypted, bank_rek_masked, bank_account_holder,
            cashier_id, cashier_username, cashier_name, examiner_name,
            total_weight_gram, sub_total, admin_fee, grand_total, points_awarded, integrity_signature, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))
        ON CONFLICT(invoice_no) DO UPDATE SET
            transaction_date = excluded.transaction_date,
            outlet_id = excluded.outlet_id,
            branch_code = excluded.branch_code,
            branch_name = excluded.branch_name,
            branch_address = excluded.branch_address,
            customer_name = excluded.customer_name,
            customer_ktp_encrypted = excluded.customer_ktp_encrypted,
            customer_ktp_masked = excluded.customer_ktp_masked,
            customer_phone = excluded.customer_phone,
            customer_address = excluded.customer_address,
            payment_method = excluded.payment_method,
            bank_name = excluded.bank_name,
            bank_rek_encrypted = excluded.bank_rek_encrypted,
            bank_rek_masked = excluded.bank_rek_masked,
            bank_account_holder = excluded.bank_account_holder,
            cashier_name = excluded.cashier_name,
            examiner_name = excluded.examiner_name,
            total_weight_gram = excluded.total_weight_gram,
            sub_total = excluded.sub_total,
            admin_fee = excluded.admin_fee,
            grand_total = excluded.grand_total,
            integrity_signature = excluded.integrity_signature,
            updated_at = datetime('now', 'localtime')
    `);

    stmt.run(
        id,
        invoiceNo,
        String(trx.dateStr || new Date().toISOString().slice(0, 10)),
        Number(trx.outletId) || 2,
        String(trx.branchCode || 'GS').toUpperCase(),
        String(trx.branchName || ''),
        String(trx.branchAddress || ''),
        String(trx.customerName || '').trim().toUpperCase(),
        ktpEncrypted,
        ktpMasked,
        String(trx.customerPhone || ''),
        String(trx.customerAddress || ''),
        String(trx.paymentMethod || 'TRANSFER'),
        String(trx.bankName || ''),
        rekEncrypted,
        rekMasked,
        String(trx.bankAn || '').toUpperCase(),
        trx.cashierId ? String(trx.cashierId) : null,
        String(trx.cashierUsername || ''),
        String(trx.cashierName || 'KASIR'),
        String(trx.examinerName || ''),
        Number(totalWeight.toFixed(4)),
        Number(trx.subTotal) || 0,
        Number(trx.admFee) || 0,
        Number(trx.grandTotal) || 0,
        POINTS_PER_TRANSACTION,
        signature
    );

    const savedTrx = db.prepare('SELECT id FROM buyback_transactions WHERE invoice_no = ?').get(invoiceNo);
    const actualTrxId = savedTrx ? savedTrx.id : id;

    db.prepare('DELETE FROM buyback_transaction_items WHERE transaction_id = ?').run(actualTrxId);
    const insertItem = db.prepare(`
        INSERT INTO buyback_transaction_items (
            transaction_id, item_no, material_type, karat_name, weight_gram, unit_price, total_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    items.forEach((it, idx) => {
        insertItem.run(
            actualTrxId,
            idx + 1,
            String(it.material || 'PERHIASAN'),
            String(it.karat || '24K'),
            Number(it.weight) || 0,
            Number(it.unitPrice) || 0,
            Number(it.totalPrice) || Math.round((Number(it.weight) || 0) * (Number(it.unitPrice) || 0))
        );
    });
}

function getDecryptedTransactions() {
    const db = initDatabase();
    const headers = db.prepare('SELECT * FROM buyback_transactions ORDER BY created_at ASC, id ASC').all();
    const itemsStmt = db.prepare('SELECT * FROM buyback_transaction_items WHERE transaction_id = ? ORDER BY item_no ASC');

    return headers.map(h => {
        const itemRows = itemsStmt.all(h.id);
        const trxObj = {
            id: h.id,
            invoiceNo: h.invoice_no,
            dateStr: h.transaction_date,
            outletId: Number(h.outlet_id) || 2,
            branchCode: h.branch_code,
            branchName: h.branch_name,
            branchAddress: h.branch_address,
            cashierId: h.cashier_id,
            cashierUsername: h.cashier_username,
            cashierName: h.cashier_name,
            examinerName: h.examiner_name,
            customerName: h.customer_name,
            customerKtp: cryptoService.decryptSensitiveField(h.customer_ktp_encrypted, h.customer_ktp_masked),
            customerPhone: h.customer_phone,
            customerAddress: h.customer_address,
            paymentMethod: h.payment_method,
            bankName: h.bank_name,
            bankRek: cryptoService.decryptSensitiveField(h.bank_rek_encrypted, h.bank_rek_masked),
            bankAn: h.bank_account_holder,
            items: itemRows.map(ir => ({
                material: ir.material_type,
                karat: ir.karat_name,
                weight: Number(ir.weight_gram),
                unitPrice: Number(ir.unit_price),
                totalPrice: Number(ir.total_price)
            })),
            subTotal: Number(h.sub_total) || 0,
            admFee: Number(h.admin_fee) || 0,
            grandTotal: Number(h.grand_total) || 0
        };
        trxObj.integrityVerified = cryptoService.verifyTransactionIntegrity(trxObj, h.integrity_signature);
        return trxObj;
    });
}

function logSecurityAudit(db, { eventType, actorRole = 'SYSTEM', actorName = 'SYSTEM', clientIp = '127.0.0.1', resourceTarget = 'APP', payload = '' }) {
    const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload || {});
    const hash = cryptoService.sha256Checksum(payloadStr);
    db.prepare(`
        INSERT INTO security_audit_logs (event_type, actor_role, actor_name, client_ip, resource_target, payload_hash, details)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(eventType, actorRole, actorName, clientIp, resourceTarget, hash, payloadStr.slice(0, 500));
}

function syncFromClientStorage(storageMap, clientMeta = {}) {
    const db = initDatabase();
    if (!storageMap || typeof storageMap !== 'object') return getAllSyncState();

    db.exec('BEGIN IMMEDIATE TRANSACTION;');
    try {
        const upsertState = db.prepare(`
            INSERT INTO app_state_store (state_key, state_json, checksum_sha256, updated_at)
            VALUES (?, ?, ?, datetime('now', 'localtime'))
            ON CONFLICT(state_key) DO UPDATE SET
                state_json = excluded.state_json,
                checksum_sha256 = excluded.checksum_sha256,
                updated_at = datetime('now', 'localtime')
        `);

        for (const [key, rawVal] of Object.entries(storageMap)) {
            if (!key.startsWith('jantung_emas_')) continue;
            let strVal = typeof rawVal === 'string' ? rawVal : JSON.stringify(rawVal);

            // Jika key adalah customers, pastikan aturan 1 transaksi = 1 point diterapkan sebelum masuk DB
            if (key === 'jantung_emas_customers') {
                try {
                    const parsedCusts = JSON.parse(strVal);
                    if (Array.isArray(parsedCusts)) {
                        const normalized = parsedCusts.map(normalizeCustomerPointsObject);
                        strVal = JSON.stringify(normalized);
                        db.exec('DELETE FROM customers;');
                        for (const c of normalized) {
                            upsertCustomerRecord(db, c);
                        }
                    }
                } catch (_) {}
            }

            // Jika key adalah transactions, simpan ke tabel relasional buyback_transactions & items
            if (key === 'jantung_emas_transactions') {
                try {
                    const parsedTrx = JSON.parse(strVal);
                    if (Array.isArray(parsedTrx)) {
                        for (const t of parsedTrx) {
                            upsertTransactionRecord(db, t);
                        }
                    }
                } catch (_) {}
            }

            // Jika key adalah karat_data atau base_24k, sinkronkan ke tabel gold_karat_rates
            if (key === 'jantung_emas_karat_data') {
                try {
                    const parsedKarat = JSON.parse(strVal);
                    if (Array.isArray(parsedKarat)) {
                        const baseRow = db.prepare("SELECT state_json FROM app_state_store WHERE state_key = 'jantung_emas_base_24k'").get();
                        const base24k = baseRow ? parseInt(baseRow.state_json, 10) || 2280000 : 2280000;
                        const updateKarat = db.prepare(`
                            INSERT INTO gold_karat_rates (karat_name, purity_percent, base_price_24k, calculated_price_per_gram, display_order, updated_at)
                            VALUES (?, ?, ?, ?, ?, datetime('now', 'localtime'))
                            ON CONFLICT(karat_name) DO UPDATE SET
                                purity_percent = excluded.purity_percent,
                                base_price_24k = excluded.base_price_24k,
                                calculated_price_per_gram = excluded.calculated_price_per_gram,
                                updated_at = datetime('now', 'localtime')
                        `);
                        parsedKarat.forEach((k, idx) => {
                            const calc = Math.floor((base24k * (Number(k.percent) || 0)) / 1000) * 1000;
                            updateKarat.run(String(k.name), Number(k.percent) || 0, base24k, calc, idx + 1);
                        });
                    }
                } catch (_) {}
            }

            const checksum = cryptoService.sha256Checksum(strVal);
            upsertState.run(key, strVal, checksum);
        }

        logSecurityAudit(db, {
            eventType: 'STORAGE_SYNC',
            actorRole: clientMeta.role || 'CLIENT_APP',
            actorName: clientMeta.actor || 'BROWSER_CLIENT',
            clientIp: clientMeta.ip || '127.0.0.1',
            resourceTarget: Object.keys(storageMap).join(','),
            payload: { keysUpdated: Object.keys(storageMap).length }
        });

        db.exec('COMMIT;');
    } catch (err) {
        db.exec('ROLLBACK;');
        throw err;
    }

    return getAllSyncState();
}

function getAllSyncState() {
    const db = initDatabase();
    const stateRows = db.prepare('SELECT state_key, state_json, updated_at FROM app_state_store').all();
    const storage = {};
    for (const r of stateRows) {
        storage[r.state_key] = r.state_json;
    }

    // Pastikan customers & transactions dari tabel relasional selalu tersedia
    const customers = getDecryptedCustomers();
    if (customers.length > 0 && !storage['jantung_emas_customers']) {
        storage['jantung_emas_customers'] = JSON.stringify(customers);
    } else if (storage['jantung_emas_customers']) {
        try {
            const parsed = JSON.parse(storage['jantung_emas_customers']).map(normalizeCustomerPointsObject);
            storage['jantung_emas_customers'] = JSON.stringify(parsed);
        } catch (_) {}
    }

    const transactions = getDecryptedTransactions();
    if (transactions.length > 0 && !storage['jantung_emas_transactions']) {
        storage['jantung_emas_transactions'] = JSON.stringify(transactions);
    }

    return {
        pointsPerTransaction: POINTS_PER_TRANSACTION,
        storage,
        stats: getDatabaseStats()
    };
}

function getDatabaseStats() {
    const db = initDatabase();
    const outletsCount = db.prepare('SELECT COUNT(*) AS cnt FROM outlets').get().cnt;
    const usersCount = db.prepare('SELECT COUNT(*) AS cnt FROM users').get().cnt;
    const karatCount = db.prepare('SELECT COUNT(*) AS cnt FROM gold_karat_rates').get().cnt;
    const customersCount = db.prepare('SELECT COUNT(*) AS cnt FROM customers').get().cnt;
    const totalPoints = db.prepare('SELECT COALESCE(SUM(loyalty_points), 0) AS pts FROM customers').get().pts;
    const trxCount = db.prepare('SELECT COUNT(*) AS cnt FROM buyback_transactions').get().cnt;
    const auditCount = db.prepare('SELECT COUNT(*) AS cnt FROM security_audit_logs').get().cnt;

    return {
        engine: 'SQLite 3 (WAL Mode, ACID Compliant)',
        databaseFile: 'database/jei_buyback.sqlite',
        encryption: 'AES-256-GCM (NIK KTP & Rekening Bank) + PBKDF2-HMAC-SHA512 (Password/PIN)',
        integrityProtection: 'HMAC-SHA256 Digital Signature per Nota Buyback',
        loyaltyRule: '1 Transaksi = 1 Point',
        counts: {
            outlets: outletsCount,
            users: usersCount,
            karatTiers: karatCount,
            customers: customersCount,
            totalCustomerPoints: totalPoints,
            buybackTransactions: trxCount,
            securityAuditLogs: auditCount
        }
    };
}

function createDatabaseBackup() {
    initDatabase();
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `jei_buyback_backup_${timestamp}.sqlite`);
    fs.copyFileSync(DB_FILE, backupFile);
    return backupFile;
}

module.exports = {
    POINTS_PER_TRANSACTION,
    initDatabase,
    getDecryptedCustomers,
    getDecryptedTransactions,
    syncFromClientStorage,
    getAllSyncState,
    getDatabaseStats,
    createDatabaseBackup
};

