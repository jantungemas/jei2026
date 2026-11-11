/**
 * JANTUNG EMAS INDONESIA (JEI) - DATA SECURITY & CRYPTOGRAPHY SERVICE
 * Menyediakan:
 * 1. Enkripsi Data Sensitif Pelanggan (NIK/KTP & No. Rekening) dengan AES-256-GCM
 * 2. Blind Index Hash (HMAC-SHA256) untuk pencarian KTP cepat tanpa ekspos plaintext
 * 3. Hashing Password & PIN Kasir/Admin/Keuangan dengan PBKDF2-HMAC-SHA512
 * 4. Tanda Tangan Integritas Nota Buyback (HMAC-SHA256 Anti-Tampering)
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const KEY_FILE_PATH = path.join(__dirname, '..', '..', 'database', '.security_key');

function loadOrCreateMasterKeys() {
    if (process.env.JEI_MASTER_KEY && process.env.JEI_HMAC_SECRET) {
        return {
            encryptionKey: crypto.createHash('sha256').update(process.env.JEI_MASTER_KEY).digest(),
            hmacSecret: crypto.createHash('sha256').update(process.env.JEI_HMAC_SECRET).digest()
        };
    }

    const dbDir = path.dirname(KEY_FILE_PATH);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }

    if (fs.existsSync(KEY_FILE_PATH)) {
        try {
            const raw = JSON.parse(fs.readFileSync(KEY_FILE_PATH, 'utf8'));
            if (raw.encryptionKeyHex && raw.hmacSecretHex) {
                return {
                    encryptionKey: Buffer.from(raw.encryptionKeyHex, 'hex'),
                    hmacSecret: Buffer.from(raw.hmacSecretHex, 'hex')
                };
            }
        } catch (_) {
            // Regenerate if corrupted
        }
    }

    const encryptionKey = crypto.randomBytes(32); // 256-bit AES key
    const hmacSecret = crypto.randomBytes(32);    // 256-bit HMAC secret
    fs.writeFileSync(
        KEY_FILE_PATH,
        JSON.stringify(
            {
                algorithm: 'AES-256-GCM + HMAC-SHA256',
                createdAt: new Date().toISOString(),
                encryptionKeyHex: encryptionKey.toString('hex'),
                hmacSecretHex: hmacSecret.toString('hex')
            },
            null,
            2
        ),
        { encoding: 'utf8', mode: 0o600 }
    );

    return { encryptionKey, hmacSecret };
}

const { encryptionKey, hmacSecret } = loadOrCreateMasterKeys();

/**
 * Enkripsi teks sensitif (NIK KTP / No Rekening) menggunakan AES-256-GCM
 */
function encryptSensitiveField(plainText) {
    const clean = String(plainText || '').trim();
    if (!clean || clean === '-') return '';
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
    const encrypted = Buffer.concat([cipher.update(clean, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Dekripsi teks sensitif yang dienkripsi dengan AES-256-GCM
 */
function decryptSensitiveField(cipherPayload, fallbackValue = '') {
    if (!cipherPayload || typeof cipherPayload !== 'string' || !cipherPayload.includes(':')) {
        return fallbackValue || cipherPayload || '';
    }
    try {
        const parts = cipherPayload.split(':');
        if (parts.length !== 3) return fallbackValue;
        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encrypted = Buffer.from(parts[2], 'hex');
        const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKey, iv);
        decipher.setAuthTag(authTag);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString('utf8');
    } catch (_) {
        return fallbackValue;
    }
}

/**
 * Blind Index (HMAC-SHA256) untuk pencarian cepat berdasarkan NIK KTP
 */
function createBlindIndex(value) {
    const clean = String(value || '').trim().toUpperCase();
    if (!clean || clean === '-') return '';
    return crypto.createHmac('sha256', hmacSecret).update(clean).digest('hex');
}

/**
 * Masking NIK KTP untuk tampilan log/tabel publik (Contoh: 147109******0021)
 */
function maskKtp(ktp) {
    const clean = String(ktp || '').trim();
    if (!clean || clean === '-') return '-';
    if (clean.length <= 8) return clean;
    return `${clean.slice(0, 6)}******${clean.slice(-4)}`;
}

/**
 * Masking Nomor Rekening Bank (Contoh: 8830****73)
 */
function maskBankAccount(rek) {
    const clean = String(rek || '').trim();
    if (!clean || clean === '-') return '';
    if (clean.length <= 6) return clean;
    return `${clean.slice(0, 4)}****${clean.slice(-2)}`;
}

/**
 * Hash Password / PIN menggunakan PBKDF2-HMAC-SHA512 (100.000 iterasi)
 */
function hashPassword(password, existingSaltHex = null) {
    const salt = existingSaltHex ? Buffer.from(existingSaltHex, 'hex') : crypto.randomBytes(16);
    const derivedKey = crypto.pbkdf2Sync(String(password || ''), salt, 100000, 64, 'sha512');
    return {
        hash: derivedKey.toString('hex'),
        salt: salt.toString('hex')
    };
}

/**
 * Verifikasi Password / PIN secara timing-safe (tahan serangan timing attack)
 */
function verifyPassword(password, storedHashHex, storedSaltHex) {
    if (!storedHashHex || !storedSaltHex) return false;
    const { hash } = hashPassword(password, storedSaltHex);
    const bufA = Buffer.from(hash, 'hex');
    const bufB = Buffer.from(storedHashHex, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Tanda tangan digital (HMAC-SHA256) untuk menjaga integritas Nota Buyback
 */
function signTransactionIntegrity(trx) {
    const canonical = [
        String(trx.invoiceNo || '').trim(),
        String(trx.customerName || '').trim().toUpperCase(),
        Number(trx.subTotal || 0),
        Number(trx.admFee || 0),
        Number(trx.grandTotal || 0),
        (trx.items || []).map(i => `${i.karat}:${Number(i.weight || 0)}:${Number(i.unitPrice || 0)}`).join('|')
    ].join('::');
    return crypto.createHmac('sha256', hmacSecret).update(canonical).digest('hex');
}

function verifyTransactionIntegrity(trx, signature) {
    if (!signature) return false;
    const expected = signTransactionIntegrity(trx);
    const bufA = Buffer.from(expected, 'hex');
    const bufB = Buffer.from(signature, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

function sha256Checksum(dataStr) {
    return crypto.createHash('sha256').update(String(dataStr || '')).digest('hex');
}

module.exports = {
    encryptSensitiveField,
    decryptSensitiveField,
    createBlindIndex,
    maskKtp,
    maskBankAccount,
    hashPassword,
    verifyPassword,
    signTransactionIntegrity,
    verifyTransactionIntegrity,
    sha256Checksum
};

