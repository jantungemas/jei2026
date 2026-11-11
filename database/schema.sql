-- ============================================================================
-- JANTUNG EMAS INDONESIA (JEI) - ENTERPRISE GOLD BUYBACK & ACCOUNTING SCHEMA
-- Database Engine : SQLite 3 (WAL Mode) / PostgreSQL Compatible
-- Security Level  : AES-256-GCM Field Encryption (KTP/Rekening),
--                   PBKDF2-HMAC-SHA512 Credential Hashing,
--                   HMAC-SHA256 Invoice Tamper-Proof Signature,
--                   Immutable Audit Trail & Loyalty Point Ledger (1 Trx = 1 Pt)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. MASTER CABANG / OUTLET
CREATE TABLE IF NOT EXISTS outlets (
    id INTEGER PRIMARY KEY,
    branch_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT DEFAULT '',
    address TEXT NOT NULL,
    map_url TEXT DEFAULT '',
    whatsapp TEXT DEFAULT '',
    operating_hours TEXT DEFAULT '08.00 - 21.00 WIB',
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 2. MANAJEMEN PENGGUNA & HAK AKSES (SUPERADMIN, ADMIN CABANG, KASIR, KEUANGAN)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('SUPERADMIN', 'ADMIN_CABANG', 'KASIR', 'HEAD_FINANCE', 'BRANCH_FINANCE')),
    outlet_id INTEGER,
    branch_code TEXT DEFAULT 'GS',
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1,
    failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TEXT DEFAULT NULL,
    last_login_at TEXT DEFAULT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (outlet_id) REFERENCES outlets(id) ON DELETE SET NULL
);

-- 3. MASTER KADAR EMAS & PERSENTASE BUYBACK (20 TINGKATAN KADAR)
CREATE TABLE IF NOT EXISTS gold_karat_rates (
    karat_name TEXT PRIMARY KEY,
    purity_percent REAL NOT NULL CHECK (purity_percent > 0 AND purity_percent <= 1.20),
    base_price_24k INTEGER NOT NULL DEFAULT 2280000,
    calculated_price_per_gram INTEGER NOT NULL DEFAULT 0,
    display_order INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 4. RIWAYAT PERUBAHAN HARGA ACUAN 24K (AUDIT HARGA HISTORIS BUYBACK)
CREATE TABLE IF NOT EXISTS gold_price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    outlet_id INTEGER DEFAULT NULL,
    previous_base_24k INTEGER NOT NULL,
    new_base_24k INTEGER NOT NULL,
    changed_by TEXT NOT NULL DEFAULT 'ADMIN',
    changed_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 5. MASTER PELANGGAN & KYC (DENGAN ENKRIPSI AES-256-GCM DATA SENSITIF)
-- Aturan Loyalitas: 1 Transaksi = 1 Point
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    ktp_masked TEXT NOT NULL DEFAULT '-',
    ktp_encrypted TEXT NOT NULL DEFAULT '',
    ktp_blind_hash TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '-',
    address TEXT NOT NULL DEFAULT '-',
    bank_name TEXT DEFAULT '',
    bank_rek_masked TEXT DEFAULT '',
    bank_rek_encrypted TEXT DEFAULT '',
    bank_account_holder TEXT DEFAULT '',
    preferred_payment_method TEXT DEFAULT 'TRANSFER',
    outlet_id INTEGER DEFAULT 2,
    trx_count INTEGER NOT NULL DEFAULT 1 CHECK (trx_count >= 0),
    loyalty_points INTEGER NOT NULL DEFAULT 1 CHECK (loyalty_points >= 0),
    manual_trx_override INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (outlet_id) REFERENCES outlets(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_customers_ktp_hash ON customers(ktp_blind_hash);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(full_name);
CREATE INDEX IF NOT EXISTS idx_customers_outlet ON customers(outlet_id);

-- 6. BUKU BESAR POINT LOYALITAS PELANGGAN (1 TRANSAKSI = 1 POINT)
CREATE TABLE IF NOT EXISTS customer_point_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id TEXT NOT NULL,
    invoice_no TEXT DEFAULT NULL,
    mutation_type TEXT NOT NULL CHECK (mutation_type IN ('EARN_BUYBACK', 'REDEEM_REWARD', 'MANUAL_ADJUSTMENT', 'MIGRATION_SYNC')),
    points_delta INTEGER NOT NULL,
    points_balance_after INTEGER NOT NULL,
    notes TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 7. TRANSAKSI BUYBACK / NOTA PEMBELIAN EMAS KASIR (HEADER)
CREATE TABLE IF NOT EXISTS buyback_transactions (
    id TEXT PRIMARY KEY,
    invoice_no TEXT NOT NULL UNIQUE,
    transaction_date TEXT NOT NULL,
    outlet_id INTEGER DEFAULT 2,
    branch_code TEXT NOT NULL DEFAULT 'GS',
    branch_name TEXT NOT NULL DEFAULT '',
    branch_address TEXT DEFAULT '',
    customer_id TEXT DEFAULT NULL,
    customer_name TEXT NOT NULL,
    customer_ktp_encrypted TEXT DEFAULT '',
    customer_ktp_masked TEXT DEFAULT '',
    customer_phone TEXT DEFAULT '',
    customer_address TEXT DEFAULT '',
    payment_method TEXT NOT NULL DEFAULT 'TRANSFER',
    bank_name TEXT DEFAULT '',
    bank_rek_encrypted TEXT DEFAULT '',
    bank_rek_masked TEXT DEFAULT '',
    bank_account_holder TEXT DEFAULT '',
    cashier_id TEXT DEFAULT NULL,
    cashier_username TEXT DEFAULT '',
    cashier_name TEXT NOT NULL DEFAULT 'KASIR',
    examiner_name TEXT DEFAULT '',
    total_weight_gram REAL NOT NULL DEFAULT 0,
    sub_total INTEGER NOT NULL DEFAULT 0,
    admin_fee INTEGER NOT NULL DEFAULT 0,
    grand_total INTEGER NOT NULL DEFAULT 0,
    points_awarded INTEGER NOT NULL DEFAULT 1,
    integrity_signature TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('COMPLETED', 'VOIDED', 'AUDITED')),
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (outlet_id) REFERENCES outlets(id) ON DELETE SET NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_buyback_invoice ON buyback_transactions(invoice_no);
CREATE INDEX IF NOT EXISTS idx_buyback_outlet_date ON buyback_transactions(outlet_id, transaction_date);
CREATE INDEX IF NOT EXISTS idx_buyback_customer ON buyback_transactions(customer_id);

-- 8. DETAIL ITEM BARANG EMAS PER NOTA BUYBACK
CREATE TABLE IF NOT EXISTS buyback_transaction_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id TEXT NOT NULL,
    item_no INTEGER NOT NULL DEFAULT 1,
    material_type TEXT NOT NULL DEFAULT 'PERHIASAN',
    karat_name TEXT NOT NULL,
    weight_gram REAL NOT NULL CHECK (weight_gram >= 0),
    unit_price INTEGER NOT NULL CHECK (unit_price >= 0),
    total_price INTEGER NOT NULL CHECK (total_price >= 0),
    FOREIGN KEY (transaction_id) REFERENCES buyback_transactions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_buyback_items_trx ON buyback_transaction_items(transaction_id);

-- 9. MUTASI STOK FISIK GRAMASI EMAS CABANG & PUSAT
CREATE TABLE IF NOT EXISTS gold_inventory_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_no TEXT NOT NULL,
    outlet_id INTEGER DEFAULT NULL,
    movement_type TEXT NOT NULL CHECK (movement_type IN ('IN_BUYBACK_CUSTOMER', 'OUT_SALE_TO_BUYER', 'ADJUSTMENT')),
    karat_name TEXT NOT NULL DEFAULT 'ALL',
    weight_gram_delta REAL NOT NULL,
    nominal_value INTEGER NOT NULL DEFAULT 0,
    notes TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 10. MODUL KEUANGAN & AKUNTANSI: PENJUALAN KE BUYER / PELEBURAN
CREATE TABLE IF NOT EXISTS finance_sales_to_buyer (
    id TEXT PRIMARY KEY,
    sale_date TEXT NOT NULL,
    buyer_name TEXT NOT NULL,
    outlet_id INTEGER DEFAULT NULL,
    weight_gram REAL NOT NULL DEFAULT 0,
    sell_price_per_gram INTEGER NOT NULL DEFAULT 0,
    total_revenue INTEGER NOT NULL DEFAULT 0,
    cogs_amount INTEGER NOT NULL DEFAULT 0,
    gross_profit INTEGER NOT NULL DEFAULT 0,
    payment_method TEXT DEFAULT 'TRANSFER',
    notes TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 11. MODUL KEUANGAN & AKUNTANSI: BIAYA OPERASIONAL
CREATE TABLE IF NOT EXISTS finance_operational_expenses (
    id TEXT PRIMARY KEY,
    expense_date TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    outlet_id INTEGER DEFAULT NULL,
    payment_method TEXT DEFAULT 'TUNAI',
    pic_name TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 12. MODUL KEUANGAN & AKUNTANSI: UTANG USAHA & PELUNASAN
CREATE TABLE IF NOT EXISTS finance_accounts_payable (
    id TEXT PRIMARY KEY,
    payable_date TEXT NOT NULL,
    creditor_name TEXT NOT NULL,
    description TEXT DEFAULT '',
    principal_amount INTEGER NOT NULL DEFAULT 0,
    paid_amount INTEGER NOT NULL DEFAULT 0,
    remaining_amount INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'UNPAID' CHECK (status IN ('UNPAID', 'PARTIAL', 'PAID')),
    outlet_id INTEGER DEFAULT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 13. MODUL KEUANGAN & AKUNTANSI: TUTUP BUKU PERIODE (LOCKED PERIODS)
CREATE TABLE IF NOT EXISTS finance_closing_periods (
    period_key TEXT PRIMARY KEY,
    outlet_scope TEXT NOT NULL DEFAULT 'ALL',
    total_revenue INTEGER NOT NULL DEFAULT 0,
    total_cogs INTEGER NOT NULL DEFAULT 0,
    total_expenses INTEGER NOT NULL DEFAULT 0,
    net_profit INTEGER NOT NULL DEFAULT 0,
    is_locked INTEGER NOT NULL DEFAULT 1,
    closed_by TEXT NOT NULL DEFAULT 'FINANCE',
    closed_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 14. PENYIMPANAN STATE TERINTEGRASI (KEY-VALUE STORE SINKRONISASI ANTAR MODUL)
CREATE TABLE IF NOT EXISTS app_state_store (
    state_key TEXT PRIMARY KEY,
    state_json TEXT NOT NULL,
    checksum_sha256 TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 15. IMMUTABLE SECURITY AUDIT LOGS (PENCATATAN KEAMANAN & AKTIVITAS SENSITIF)
CREATE TABLE IF NOT EXISTS security_audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    actor_role TEXT NOT NULL DEFAULT 'SYSTEM',
    actor_name TEXT NOT NULL DEFAULT 'SYSTEM',
    client_ip TEXT DEFAULT '127.0.0.1',
    resource_target TEXT NOT NULL,
    payload_hash TEXT NOT NULL,
    details TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

CREATE INDEX IF NOT EXISTS idx_audit_created_at ON security_audit_logs(created_at);

