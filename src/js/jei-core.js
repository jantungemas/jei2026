/**
 * JANTUNG EMAS INDONESIA (JEI) - SHARED CORE & DATABASE SYNC CLIENT
 * Modul pusat untuk:
 * 1. Standarisasi aturan bisnis (1 Transaksi = 1 Point Loyalitas Pelanggan)
 * 2. Sinkronisasi otomatis antara Browser Storage & Backend SQLite Database (/api/v1/sync)
 * 3. Utilitas format mata uang, perhitungan harga buyback emas, dan normalisasi data
 */

(function (global) {
    'use strict';

    const POINTS_PER_TRANSACTION = 1;

    const STORAGE_KEYS = {
        KARAT_DATA: 'jantung_emas_karat_data',
        BASE_24K: 'jantung_emas_base_24k',
        BRANCH_BASE_PRICES: 'jantung_emas_branch_base_prices',
        LAST_UPDATE: 'jantung_emas_last_update',
        SLIDES: 'jantung_emas_slides',
        OUTLETS: 'jantung_emas_outlets',
        CASHIERS: 'jantung_emas_cashiers',
        TRANSACTIONS: 'jantung_emas_transactions',
        CUSTOMERS: 'jantung_emas_customers'
    };

    /**
     * Normalisasi data pelanggan: pastikan 1 transaksi = 1 point (dan migrasi data lama 10x -> 1x)
     */
    function normalizeCustomersInLocalStorage() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
            if (!raw) return;
            const list = JSON.parse(raw);
            if (!Array.isArray(list)) return;

            let changed = false;
            list.forEach(c => {
                const tc = Math.max(0, Number(c.trxCount) || 0);
                const pts = Math.max(0, Number(c.points) || 0);
                if (!c.pointsMigratedTo1 && tc > 0 && pts === tc * 10) {
                    c.points = tc * POINTS_PER_TRANSACTION;
                    c.pointsMigratedTo1 = true;
                    changed = true;
                }
            });

            if (changed) {
                origSetItem.call(localStorage, STORAGE_KEYS.CUSTOMERS, JSON.stringify(list));
            }
        } catch (_) {}
    }

    const origSetItem = Storage.prototype.setItem;
    let syncTimeout = null;
    let isApplyingServerState = false;

    function collectJeiStorageSnapshot() {
        const snapshot = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('jantung_emas_')) {
                snapshot[key] = localStorage.getItem(key);
            }
        }
        return snapshot;
    }

    function scheduleDatabaseSync(changedKey) {
        if (isApplyingServerState) return;
        if (window.location.protocol === 'file:') return;

        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
            const storage = collectJeiStorageSnapshot();
            fetch('/api/v1/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    changedKey,
                    storage
                })
            }).catch(() => {
                // Offline fallback tetap berjalan normal menggunakan localStorage
            });
        }, 250);
    }

    // Intercept localStorage.setItem agar setiap perubahan data otomatis tersinkron ke SQLite Database
    Storage.prototype.setItem = function (key, value) {
        let finalValue = value;
        if (this === localStorage && key === STORAGE_KEYS.CUSTOMERS) {
            try {
                const parsed = JSON.parse(value);
                if (Array.isArray(parsed)) {
                    parsed.forEach(c => {
                        const tc = Math.max(0, Number(c.trxCount) || 0);
                        const pts = Math.max(0, Number(c.points) || 0);
                        if (!c.pointsMigratedTo1 && tc > 0 && pts === tc * 10) {
                            c.points = tc * POINTS_PER_TRANSACTION;
                            c.pointsMigratedTo1 = true;
                        }
                    });
                    finalValue = JSON.stringify(parsed);
                }
            } catch (_) {}
        }

        origSetItem.call(this, key, finalValue);

        if (this === localStorage && String(key || '').startsWith('jantung_emas_')) {
            scheduleDatabaseSync(key);
        }
    };

    async function hydrateFromServerDatabase() {
        if (window.location.protocol === 'file:') return;
        try {
            const res = await fetch('/api/v1/sync', { method: 'GET', cache: 'no-store' });
            if (!res.ok) return;
            const data = await res.json();
            if (!data || !data.storage) return;

            isApplyingServerState = true;
            let hasNewDataFromDb = false;

            for (const [k, v] of Object.entries(data.storage)) {
                if (!localStorage.getItem(k) && v) {
                    origSetItem.call(localStorage, k, v);
                    hasNewDataFromDb = true;
                }
            }
            isApplyingServerState = false;

            // Dorong juga snapshot terbaru dari browser ke DB agar DB selalu memiliki data terlengkap
            scheduleDatabaseSync('INITIAL_HANDSHAKE');

            if (hasNewDataFromDb) {
                window.dispatchEvent(new StorageEvent('storage', { key: 'jantung_emas_sync' }));
            }
        } catch (_) {
            isApplyingServerState = false;
        }
    }

    // Jalankan normalisasi point segera saat script dimuat
    normalizeCustomersInLocalStorage();
    hydrateFromServerDatabase();

    global.JEICore = {
        POINTS_PER_TRANSACTION,
        STORAGE_KEYS,
        normalizeCustomersInLocalStorage,
        syncNow: () => scheduleDatabaseSync('MANUAL_SYNC'),
        formatIDR: (num) => 'Rp ' + Math.round(Number(num) || 0).toLocaleString('id-ID'),
        calcPricePerGram: (base24k, percent) => Math.floor(((Number(base24k) || 0) * (Number(percent) || 0)) / 1000) * 1000
    };
})(window);

