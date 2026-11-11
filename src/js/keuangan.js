// ============================================================================
// CHART OF ACCOUNTS (DAFTAR AKUN STANDAR AKUNTANSI EMAS JEI)
// ============================================================================
const COA_LIST = [
    { code: '1101', name: 'Kas & Bank Perusahaan', type: 'ASSET', normal: 'DEBIT' },
    { code: '1102', name: 'Persediaan Emas (Stok Logam Mulia & Perhiasan)', type: 'ASSET', normal: 'DEBIT' },
    { code: '1103', name: 'Piutang Usaha Buyer / Refinery', type: 'ASSET', normal: 'DEBIT' },
    { code: '1201', name: 'Peralatan, Timbangan & Inventaris Cabang', type: 'ASSET', normal: 'DEBIT' },
    { code: '2101', name: 'Utang Usaha & Pinjaman Modal Kerja', type: 'LIABILITY', normal: 'CREDIT' },
    { code: '3101', name: 'Modal Disetor Jantung Emas Indonesia', type: 'EQUITY', normal: 'CREDIT' },
    { code: '3102', name: 'Laba Ditahan (Retained Earnings)', type: 'EQUITY', normal: 'CREDIT' },
    { code: '4101', name: 'Penjualan Emas / Peleburan Refinery', type: 'REVENUE', normal: 'CREDIT' },
    { code: '5101', name: 'Harga Pokok Penjualan (HPP) Emas', type: 'COGS', normal: 'DEBIT' },
    // 61xx - Beban Operasional
    { code: '6101', name: 'Beban Gaji', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6102', name: 'Beban Bonus/Insentif', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6103', name: 'Beban Sewa', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6104', name: 'Beban Listrik', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6105', name: 'Beban Air', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6106', name: 'Beban Internet', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6107', name: 'Beban Keamanan', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6108', name: 'Beban Transportasi', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6109', name: 'Beban BBM', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6110', name: 'Beban Promosi & Iklan', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6111', name: 'Beban ATK', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6112', name: 'Beban Administrasi', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6113', name: 'Beban Reparasi & Pemeliharaan', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6114', name: 'Beban Penyusutan', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6115', name: 'Beban Asuransi', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6116', name: 'Beban Kebersihan', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6117', name: 'Beban Legal & Perizinan', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6118', name: 'Beban Bank & Administrasi', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    { code: '6119', name: 'Beban Lain-lain', type: 'EXPENSE', normal: 'DEBIT', group: 'OPERATIONAL' },
    // 71xx - Beban Sosial / Berbagi & Program Jantung Emas
    { code: '7101', name: 'Beban Berbagi/Amal', type: 'EXPENSE', normal: 'DEBIT', group: 'SOCIAL' },
    { code: '7102', name: 'Bantuan Sosial', type: 'EXPENSE', normal: 'DEBIT', group: 'SOCIAL' },
    { code: '7103', name: 'Santunan Karyawan', type: 'EXPENSE', normal: 'DEBIT', group: 'SOCIAL' },
    { code: '7104', name: 'Program Masyarakat', type: 'EXPENSE', normal: 'DEBIT', group: 'SOCIAL' },
    { code: '7105', name: 'Donasi', type: 'EXPENSE', normal: 'DEBIT', group: 'SOCIAL' },
    { code: '7106', name: 'Program Jantung Emas', type: 'EXPENSE', normal: 'DEBIT', group: 'SOCIAL' }
];

const EXPENSE_COA_CODES = COA_LIST.filter(a => a.type === 'EXPENSE').map(a => a.code);
const OP_EXPENSE_CODES = COA_LIST.filter(a => a.group === 'OPERATIONAL').map(a => a.code);
const SOCIAL_EXPENSE_CODES = COA_LIST.filter(a => a.group === 'SOCIAL').map(a => a.code);

function getAccountMeta(code) {
    return COA_LIST.find(a => a.code === String(code)) || { code, name: 'Akun Umum', type: 'ASSET', normal: 'DEBIT' };
}

function formatIDR(num) {
    const val = Math.round(Number(num) || 0);
    const sign = val < 0 ? '-' : '';
    return sign + 'Rp\u00A0' + Math.abs(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseAnyDateToISO(rawDateStr) {
    const now = new Date();
    const fallbackISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    if (!rawDateStr || rawDateStr === 'Hari Ini') return fallbackISO;
    const s = String(rawDateStr).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    const monthMap = {
        jan: '01', feb: '02', mar: '03', apr: '04', mei: '05', may: '05',
        jun: '06', jul: '07', agu: '08', aug: '08', sep: '09', okt: '10', oct: '10', nov: '11', des: '12', dec: '12'
    };
    const parts = s.split(/\s+/);
    if (parts.length >= 3) {
        const day = String(parseInt(parts[0]) || 1).padStart(2, '0');
        const mKey = parts[1].toLowerCase().slice(0, 3);
        const month = monthMap[mKey] || '10';
        const year = parts[2].length === 4 ? parts[2] : String(now.getFullYear());
        return `${year}-${month}-${day}`;
    }
    return fallbackISO;
}

const DEFAULT_OUTLETS = [
    {
        id: 1,
        name: 'Outlet Jakarta (Pusat & Selatan)',
        tagline: 'Melayani jual beli emas area DKI Jakarta',
        address: 'Jl. Jenderal Sudirman, Jakarta Selatan, DKI Jakarta',
        mapUrl: 'https://maps.google.com/?q=Jakarta+Selatan',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    },
    {
        id: 2,
        name: 'Outlet Tangerang & Gading Serpong',
        tagline: 'Melayani area Gading Serpong, BSD & Tangerang',
        address: 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang',
        mapUrl: 'https://maps.google.com/?q=Gading+Serpong+Tangerang',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    },
    {
        id: 3,
        name: 'Outlet Bekasi & Depok',
        tagline: 'Melayani area Bekasi Kota, Summarecon & Depok',
        address: 'Jl. Ahmad Yani, Bekasi Selatan, Kota Bekasi',
        mapUrl: 'https://maps.google.com/?q=Bekasi+Selatan',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    }
];

const DEFAULT_CASHIERS = [
    { id: 1, name: 'FAKAR', username: 'fakar', pin: '1234', outletId: 2, branchCode: 'GS' },
    { id: 2, name: 'ANDI', username: 'kasir_jkt', pin: '1234', outletId: 1, branchCode: 'JKT' },
    { id: 3, name: 'RINA', username: 'kasir_bks', pin: '1234', outletId: 3, branchCode: 'BKS' }
];

function getOutlets() {
    const raw = localStorage.getItem('jantung_emas_outlets');
    if (!raw) {
        localStorage.setItem('jantung_emas_outlets', JSON.stringify(DEFAULT_OUTLETS));
        return DEFAULT_OUTLETS;
    }
    return JSON.parse(raw) || DEFAULT_OUTLETS;
}

function getCashiers() {
    const raw = localStorage.getItem('jantung_emas_cashiers');
    if (!raw) {
        localStorage.setItem('jantung_emas_cashiers', JSON.stringify(DEFAULT_CASHIERS));
        return DEFAULT_CASHIERS;
    }
    return JSON.parse(raw) || DEFAULT_CASHIERS;
}

function getBranchNameById(branchId, fallbackName = '') {
    const idNum = Number(branchId);
    if (!idNum || idNum === 0) return fallbackName || 'Pusat / Konsolidasi';
    const outlets = getOutlets();
    const found = outlets.find(o => Number(o.id) === idNum);
    if (found) return found.name;
    if (fallbackName) return fallbackName;
    return `Cabang #${idNum}`;
}

function extractFinInvoiceBranchCode(invoiceNo) {
    if (!invoiceNo) return '';
    const parts = String(invoiceNo).trim().split('.');
    if (parts.length >= 3 && parts[0].toUpperCase() === 'JEI') {
        return parts[1].trim().toUpperCase();
    }
    return '';
}

function resolveCashierTrxOutletId(t) {
    if (!t) return 0;
    const allCashiers = getCashiers();
    const invCode = (t.branchCode || extractFinInvoiceBranchCode(t.invoiceNo)).toUpperCase();
    if (invCode) {
        const byCode = allCashiers.find(c => (c.branchCode || '').trim().toUpperCase() === invCode);
        if (byCode && byCode.outletId) return Number(byCode.outletId);
    }
    const trxCashier = (t.cashierName || '').trim().toUpperCase();
    if (trxCashier) {
        const byName = allCashiers.find(c => (c.name || '').trim().toUpperCase() === trxCashier);
        if (byName && byName.outletId) return Number(byName.outletId);
    }
    if (t.outletId != null && Number(t.outletId) > 0) return Number(t.outletId);
    const allOutlets = getOutlets();
    if (t.branchName) {
        const bLower = t.branchName.toLowerCase();
        const byOutlet = allOutlets.find(o => bLower.includes(o.name.toLowerCase()) || o.name.toLowerCase().includes(bLower));
        if (byOutlet) return Number(byOutlet.id);
    }
    return Number(t.outletId) || 0;
}

function isCashierTrxBelongingToBranch(t, branchId) {
    if (!t || !branchId) return false;
    const resolvedId = resolveCashierTrxOutletId(t);
    if (resolvedId && Number(resolvedId) === Number(branchId)) return true;
    const allOutlets = getOutlets();
    const bObj = allOutlets.find(o => Number(o.id) === Number(branchId));
    if (bObj && t.branchName && t.branchName.toLowerCase().includes(bObj.name.toLowerCase())) return true;
    return false;
}

// ============================================================================
// DEFAULT INITIAL DATA (Agar Semua Modul Langsung Terisi & Seimbang)
// ============================================================================
const nowObj = new Date();
const todayISO = `${nowObj.getFullYear()}-${String(nowObj.getMonth() + 1).padStart(2, '0')}-${String(nowObj.getDate()).padStart(2, '0')}`;
const firstDayISO = `${nowObj.getFullYear()}-${String(nowObj.getMonth() + 1).padStart(2, '0')}-01`;

const DEFAULT_SALES = [
    {
        id: 'SLS-1',
        date: todayISO,
        invoiceNo: 'INV.REFINERY.001',
        buyer: 'PT Logam Mulia Nusantara',
        outletId: 2,
        weight: 12.5,
        totalSale: 36500000,
        cogs: 33200000
    },
    {
        id: 'SLS-2',
        date: todayISO,
        invoiceNo: 'INV.REFINERY.002',
        buyer: 'PT Sentral Emas Murni',
        outletId: 1,
        weight: 8.0,
        totalSale: 23600000,
        cogs: 21400000
    }
];

const DEFAULT_EXPENSES = [
    {
        id: 'EXP-1',
        date: todayISO,
        refNo: 'BKK.2026.001',
        accountCode: '6101',
        outletId: 2,
        amount: 4500000,
        description: 'Pembayaran Gaji Tim Kasir Cabang Gading Serpong'
    },
    {
        id: 'EXP-2',
        date: todayISO,
        refNo: 'BKK.2026.002',
        accountCode: '6104',
        outletId: 1,
        amount: 850000,
        description: 'Tagihan Listrik Bulanan Cabang Jakarta'
    },
    {
        id: 'EXP-3',
        date: todayISO,
        refNo: 'BKK.2026.003',
        accountCode: '6106',
        outletId: 1,
        amount: 400000,
        description: 'Tagihan Internet High-Speed Operasional Cabang'
    },
    {
        id: 'EXP-4',
        date: todayISO,
        refNo: 'BKK.2026.004',
        accountCode: '7106',
        outletId: 2,
        amount: 1000000,
        description: 'Penyaluran Dana Sosial Program Jantung Emas'
    }
];

const DEFAULT_PAYABLES = [
    {
        id: 'AP-1',
        date: firstDayISO,
        refNo: 'AP.2026.001',
        vendor: 'PT Brankas & Alat Uji XRF Indonesia',
        dueDate: '2026-12-31',
        outletId: 1,
        amount: 25000000,
        paidAmount: 10000000,
        description: 'Fasilitas Modal Kerja & Pengadaan Alat Uji Emas'
    }
];

const DEFAULT_MANUAL_JOURNALS = [
    {
        id: 'MJ-INIT-1',
        date: '2026-01-01',
        refNo: 'JU.MODAL.001',
        debitCode: '1101',
        creditCode: '3101',
        amount: 450000000,
        outletId: 0,
        description: 'Setoran Modal Awal Kas & Bank Jantung Emas Indonesia'
    },
    {
        id: 'MJ-INIT-2',
        date: '2026-01-01',
        refNo: 'JU.MODAL.002',
        debitCode: '1201',
        creditCode: '3101',
        amount: 50000000,
        outletId: 0,
        description: 'Setoran Modal Inventaris Timbangan Digital & Peralatan Cabang'
    }
];

let finSales = localStorage.getItem('jantung_emas_fin_sales') !== null
    ? JSON.parse(localStorage.getItem('jantung_emas_fin_sales'))
    : DEFAULT_SALES;
let finReceivables = JSON.parse(localStorage.getItem('jantung_emas_fin_receivables')) || [];
let finExpenses = localStorage.getItem('jantung_emas_fin_expenses') !== null
    ? JSON.parse(localStorage.getItem('jantung_emas_fin_expenses'))
    : [];
let finPayables = localStorage.getItem('jantung_emas_fin_payables') !== null
    ? JSON.parse(localStorage.getItem('jantung_emas_fin_payables'))
    : DEFAULT_PAYABLES;
let finManualJournals = localStorage.getItem('jantung_emas_fin_journals') !== null
    ? JSON.parse(localStorage.getItem('jantung_emas_fin_journals'))
    : DEFAULT_MANUAL_JOURNALS;
let finAdjustments = JSON.parse(localStorage.getItem('jantung_emas_fin_adjustments')) || [];
let finClosings = JSON.parse(localStorage.getItem('jantung_emas_fin_closings')) || [];

// Data Kas Kecil Terpisah (Petty Cash)
let pettyCashOpening = JSON.parse(localStorage.getItem('jantung_emas_petty_cash_opening')) || {
    date: '2026-01-01',
    amount: 0
};
let pettyCashTrx = localStorage.getItem('jantung_emas_petty_cash_trx') !== null
    ? JSON.parse(localStorage.getItem('jantung_emas_petty_cash_trx'))
    : [];

function saveFinanceState() {
    localStorage.setItem('jantung_emas_fin_sales', JSON.stringify(finSales));
    localStorage.setItem('jantung_emas_fin_receivables', JSON.stringify(finReceivables));
    localStorage.setItem('jantung_emas_fin_expenses', JSON.stringify(finExpenses));
    localStorage.setItem('jantung_emas_fin_payables', JSON.stringify(finPayables));
    localStorage.setItem('jantung_emas_fin_journals', JSON.stringify(finManualJournals));
    localStorage.setItem('jantung_emas_fin_adjustments', JSON.stringify(finAdjustments));
    localStorage.setItem('jantung_emas_fin_closings', JSON.stringify(finClosings));
    localStorage.setItem('jantung_emas_petty_cash_opening', JSON.stringify(pettyCashOpening));
    localStorage.setItem('jantung_emas_petty_cash_trx', JSON.stringify(pettyCashTrx));
}

// ============================================================================
// FILTER PERIODE & CABANG
// ============================================================================
let activeFinTab = 'overview';
const finPeriodModeSelect = document.getElementById('finPeriodModeSelect');
const finStartDateWrap = document.getElementById('finStartDateWrap');
const finEndDateWrap = document.getElementById('finEndDateWrap');
const finMonthWrap = document.getElementById('finMonthWrap');
const finYearWrap = document.getElementById('finYearWrap');
const finStartDateInput = document.getElementById('finStartDateInput');
const finEndDateInput = document.getElementById('finEndDateInput');
const finMonthSelect = document.getElementById('finMonthSelect');
const finYearSelect = document.getElementById('finYearSelect');
const finBranchScopeSelect = document.getElementById('finBranchScopeSelect');

// Init date inputs
if (finStartDateInput) finStartDateInput.value = firstDayISO;
if (finEndDateInput) finEndDateInput.value = todayISO;
['jurnalDateInput', 'saleDateInput', 'arDateInput', 'expDateInput', 'apDateInput', 'adjDateInput', 'invAssetDateInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = todayISO;
});
const apDueEl = document.getElementById('apDueInput');
if (apDueEl) apDueEl.value = '2026-12-31';
const arDueEl = document.getElementById('arDueInput');
if (arDueEl) arDueEl.value = '2026-12-31';

function populateCoaDropdowns() {
    const dSel = document.getElementById('jurnalDebitAccSelect');
    const cSel = document.getElementById('jurnalCreditAccSelect');
    const adjDSel = document.getElementById('adjDebitAccSelect');
    const adjCSel = document.getElementById('adjCreditAccSelect');
    const lSel = document.getElementById('ledgerAccountSelect');
    const optsHtml = COA_LIST.map(a => `<option value="${a.code}">${a.code} - ${a.name}</option>`).join('');
    if (dSel) { dSel.innerHTML = optsHtml; dSel.value = '1101'; }
    if (cSel) { cSel.innerHTML = optsHtml; cSel.value = '3101'; }
    if (adjDSel) { adjDSel.innerHTML = optsHtml; adjDSel.value = '6114'; }
    if (adjCSel) { adjCSel.innerHTML = optsHtml; adjCSel.value = '1201'; }
    if (lSel) {
        lSel.innerHTML = optsHtml;
        lSel.value = '1101';
        lSel.addEventListener('change', () => renderAllFinanceModules());
    }
}
populateCoaDropdowns();

let lockedFinanceBranchId = null;

function populateFinanceBranchDropdowns() {
    const outlets = getOutlets();
    const branchOptionsOnly = outlets.map(o => `<option value="${o.id}">${o.name}</option>`).join('');
    const pusatFirstOptions = `<option value="0">Pusat / Konsolidasi</option>` + branchOptionsOnly;
    const branchFirstOptions = branchOptionsOnly + `<option value="0">Pusat / Konsolidasi</option>`;

    if (finBranchScopeSelect) {
        const prevScope = finBranchScopeSelect.value;
        if (lockedFinanceBranchId) {
            const lockedObj = outlets.find(o => Number(o.id) === Number(lockedFinanceBranchId));
            finBranchScopeSelect.innerHTML = `<option value="${lockedFinanceBranchId}">Cabang ${lockedObj ? lockedObj.name : '#' + lockedFinanceBranchId} (Khusus Cabang)</option>`;
            finBranchScopeSelect.value = String(lockedFinanceBranchId);
            finBranchScopeSelect.disabled = true;
        } else {
            finBranchScopeSelect.disabled = false;
            finBranchScopeSelect.innerHTML = `<option value="ALL">Semua Cabang (Konsolidasi)</option>` +
                outlets.map(o => `<option value="${o.id}">Cabang ${o.name}</option>`).join('');
            if (prevScope && [...finBranchScopeSelect.options].some(opt => opt.value === prevScope)) {
                finBranchScopeSelect.value = prevScope;
            } else {
                finBranchScopeSelect.value = 'ALL';
            }
        }
    }

    const updateSelectPreserve = (id, htmlStr, defaultVal) => {
        const el = document.getElementById(id);
        if (!el) return;
        const prev = el.value;
        el.innerHTML = htmlStr;
        if (lockedFinanceBranchId && [...el.options].some(opt => opt.value === String(lockedFinanceBranchId))) {
            el.value = String(lockedFinanceBranchId);
        } else if (prev && [...el.options].some(opt => opt.value === prev)) {
            el.value = prev;
        } else if (defaultVal !== undefined && [...el.options].some(opt => opt.value === String(defaultVal))) {
            el.value = String(defaultVal);
        }
    };

    updateSelectPreserve('invAssetBranchSelect', pusatFirstOptions, 0);
    updateSelectPreserve('saleBranchSelect', branchOptionsOnly, outlets[0]?.id || 1);
    updateSelectPreserve('arBranchSelect', branchOptionsOnly, outlets[0]?.id || 1);
    updateSelectPreserve('expBranchSelect', branchFirstOptions, outlets[0]?.id || 1);
    updateSelectPreserve('adjBranchSelect', pusatFirstOptions, 0);
}
populateFinanceBranchDropdowns();

function isDateMatchFilter(isoDate, allowOpening = false) {
    if (allowOpening && isoDate === '2026-01-01') return true;
    const mode = finPeriodModeSelect ? finPeriodModeSelect.value : 'all';
    if (mode === 'all') return true;
    if (mode === 'date_range') {
        const s = finStartDateInput?.value || '2000-01-01';
        const e = finEndDateInput?.value || '2099-12-31';
        return isoDate >= s && isoDate <= e;
    }
    if (mode === 'monthly') {
        const m = finMonthSelect?.value || '10';
        const y = finYearSelect?.value || '2026';
        return isoDate.slice(0, 4) === String(y) && isoDate.slice(5, 7) === String(m);
    }
    if (mode === 'yearly') {
        const y = finYearSelect?.value || '2026';
        return isoDate.slice(0, 4) === String(y);
    }
    return true;
}

function isBranchMatchFilter(outletId, branchName = '', posTrxObj = null) {
    const scope = finBranchScopeSelect ? finBranchScopeSelect.value : 'ALL';
    if (scope === 'ALL') return true;
    if (posTrxObj) {
        return isCashierTrxBelongingToBranch(posTrxObj, scope);
    }
    if (Number(outletId) === 0) return true; // Jurnal modal pusat tetap tampil di neraca
    if (String(outletId) === String(scope)) return true;
    const bName = getBranchNameById(scope).toLowerCase();
    if (branchName && branchName.toLowerCase().includes(bName)) return true;
    return false;
}

function getActivePeriodLabel() {
    const mode = finPeriodModeSelect ? finPeriodModeSelect.value : 'all';
    const scope = finBranchScopeSelect ? finBranchScopeSelect.value : 'ALL';
    const unitTxt = scope === 'ALL' ? 'Semua Cabang (Konsolidasi)' : `Cabang ${getBranchNameById(scope)}`;
    if (mode === 'date_range') {
        return `Rentang: ${finStartDateInput?.value} s/d ${finEndDateInput?.value} • ${unitTxt}`;
    }
    if (mode === 'monthly') {
        const mTxt = finMonthSelect?.options[finMonthSelect.selectedIndex]?.text || '';
        return `Bulanan: ${mTxt} ${finYearSelect?.value} • ${unitTxt}`;
    }
    if (mode === 'yearly') {
        return `Tahunan: Tahun ${finYearSelect?.value} • ${unitTxt}`;
    }
    return `Semua Periode • ${unitTxt}`;
}

if (finPeriodModeSelect) {
    finPeriodModeSelect.addEventListener('change', () => {
        const m = finPeriodModeSelect.value;
        finStartDateWrap?.classList.toggle('hidden', m !== 'date_range');
        finEndDateWrap?.classList.toggle('hidden', m !== 'date_range');
        finMonthWrap?.classList.toggle('hidden', m !== 'monthly');
        finYearWrap?.classList.toggle('hidden', m !== 'monthly' && m !== 'yearly');
        renderAllFinanceModules();
    });
}

[finStartDateInput, finEndDateInput, finMonthSelect, finYearSelect, finBranchScopeSelect].forEach(el => {
    if (el) el.addEventListener('change', () => renderAllFinanceModules());
});

// ============================================================================
// UNIFIED JOURNAL ENGINE (Menggabungkan Kasir, Penjualan, Biaya, Utang, Tutup Buku)
// ============================================================================
function buildUnifiedJournalEntries() {
    const entries = [];

    // 1. Jurnal Manual & Modal Awal
    finManualJournals.forEach(mj => {
        const iso = parseAnyDateToISO(mj.date);
        if (!isDateMatchFilter(iso, true) || !isBranchMatchFilter(mj.outletId)) return;
        entries.push({
            id: mj.id,
            date: iso,
            refNo: mj.refNo,
            source: 'JURNAL UMUM',
            description: mj.description,
            debitCode: mj.debitCode,
            creditCode: mj.creditCode,
            amount: Number(mj.amount) || 0,
            canDelete: !String(mj.id).startsWith('MJ-INIT-'),
            deleteType: 'MANUAL'
        });
    });

    // 2. Transaksi Pembelian Emas dari Nota Kasir (jantung_emas_transactions)
    const cashierTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    cashierTrx.forEach(t => {
        const iso = parseAnyDateToISO(t.dateStr);
        if (!isDateMatchFilter(iso) || !isBranchMatchFilter(t.outletId, t.branchName, t)) return;
        let totalGr = 0;
        (t.items || []).forEach(it => { totalGr += parseFloat(it.weight) || 0; });
        const resolvedOutletId = resolveCashierTrxOutletId(t);
        const syncedBranchName = getBranchNameById(resolvedOutletId, t.branchName || 'Cabang');
        entries.push({
            id: `KASIR-${t.id}`,
            date: iso,
            refNo: t.invoiceNo || 'JEI.NOTA',
            source: 'NOTA KASIR',
            description: `Pembelian Emas Customer ${t.customerName || ''} (${Number(totalGr.toFixed(2))}g - ${syncedBranchName})`,
            debitCode: '1102', // Persediaan Emas bertambah
            creditCode: '1101', // Kas keluar
            amount: Number(t.grandTotal) || 0,
            gram: totalGr,
            canDelete: false
        });
    });

    // 3. Penjualan / Peleburan Emas (Menghasilkan 2 pasang ayat jurnal: Kas vs Penjualan, dan HPP vs Persediaan)
    finSales.forEach(s => {
        const iso = parseAnyDateToISO(s.date);
        if (!isDateMatchFilter(iso) || !isBranchMatchFilter(s.outletId)) return;
        entries.push({
            id: `${s.id}-REV`,
            rawId: s.id,
            date: iso,
            refNo: s.invoiceNo,
            source: 'PENJUALAN EMAS',
            description: `Penjualan Emas ke ${s.buyer} (${s.weight}g - ${getBranchNameById(s.outletId)})`,
            debitCode: '1101', // Kas Masuk
            creditCode: '4101', // Pendapatan Penjualan
            amount: Number(s.totalSale) || 0,
            gram: Number(s.weight) || 0,
            canDelete: true,
            deleteType: 'SALE'
        });
        if (Number(s.cogs) > 0) {
            entries.push({
                id: `${s.id}-COGS`,
                rawId: s.id,
                date: iso,
                refNo: s.invoiceNo,
                source: 'HPP PENJUALAN',
                description: `HPP Pelepasan Stok Emas (${s.weight}g - ${s.buyer})`,
                debitCode: '5101', // HPP
                creditCode: '1102', // Persediaan Emas Berkurang
                amount: Number(s.cogs) || 0,
                canDelete: false
            });
        }
    });

    // 3b. Piutang Usaha & Penerimaan Pelunasan Piutang (1103)
    finReceivables.forEach(ar => {
        const iso = parseAnyDateToISO(ar.date);
        if (!isDateMatchFilter(iso, true) || !isBranchMatchFilter(ar.outletId)) return;
        entries.push({
            id: `${ar.id}-NEW`,
            rawId: ar.id,
            date: iso,
            refNo: ar.refNo,
            source: 'PIUTANG USAHA',
            description: `Pencatatan Piutang Usaha: ${ar.debtor} (${ar.description} - ${getBranchNameById(ar.outletId)})`,
            debitCode: '1103',
            creditCode: '4101',
            amount: Number(ar.amount) || 0,
            canDelete: true,
            deleteType: 'RECEIVABLE'
        });
        if (Number(ar.paidAmount) > 0) {
            entries.push({
                id: `${ar.id}-PAID`,
                rawId: ar.id,
                date: iso,
                refNo: `${ar.refNo}/RCV`,
                source: 'PELUNASAN PIUTANG',
                description: `Penerimaan Pelunasan Piutang Usaha dari ${ar.debtor}`,
                debitCode: '1101',
                creditCode: '1103',
                amount: Number(ar.paidAmount) || 0,
                canDelete: false
            });
        }
    });

    // 4. Biaya Operasional & Program Sosial / CSR (6101-6119 & 7101-7106)
    finExpenses.forEach(ex => {
        const iso = parseAnyDateToISO(ex.date);
        if (!isDateMatchFilter(iso) || !isBranchMatchFilter(ex.outletId)) return;
        const codeStr = String(ex.accountCode || '6119');
        const isSocial = codeStr.startsWith('71');
        entries.push({
            id: ex.id,
            date: iso,
            refNo: ex.refNo,
            source: isSocial ? 'PROGRAM SOSIAL / JEI' : 'BIAYA OPERASIONAL',
            description: `${ex.description} (${getBranchNameById(ex.outletId)})`,
            debitCode: codeStr,
            creditCode: '1101',
            amount: Number(ex.amount) || 0,
            canDelete: true,
            deleteType: 'EXPENSE'
        });
    });

    // 5. Utang Usaha & Pelunasan Utang
    finPayables.forEach(ap => {
        const iso = parseAnyDateToISO(ap.date);
        if (!isDateMatchFilter(iso, true) || !isBranchMatchFilter(ap.outletId)) return;
        // Pencairan / Pencatatan Utang Usaha
        entries.push({
            id: `${ap.id}-NEW`,
            rawId: ap.id,
            date: iso,
            refNo: ap.refNo,
            source: 'UTANG USAHA',
            description: `Penerimaan Utang Usaha / Modal Kerja: ${ap.vendor} (${ap.description})`,
            debitCode: '1101',
            creditCode: '2101',
            amount: Number(ap.amount) || 0,
            canDelete: true,
            deleteType: 'PAYABLE'
        });
        // Pelunasan Utang Usaha (jika sudah ada pembayaran)
        if (Number(ap.paidAmount) > 0) {
            entries.push({
                id: `${ap.id}-PAY`,
                rawId: ap.id,
                date: iso,
                refNo: `${ap.refNo}/PAID`,
                source: 'PELUNASAN UTANG',
                description: `Pembayaran / Cicilan Utang Usaha ke ${ap.vendor}`,
                debitCode: '2101',
                creditCode: '1101',
                amount: Number(ap.paidAmount) || 0,
                canDelete: false
            });
        }
    });

    // 6. Jurnal Penyesuaian (Adjusting Journal Entries / AJP)
    finAdjustments.forEach(adj => {
        const iso = parseAnyDateToISO(adj.date);
        if (!isDateMatchFilter(iso, true) || !isBranchMatchFilter(adj.outletId)) return;
        entries.push({
            id: adj.id,
            rawId: adj.id,
            date: iso,
            refNo: adj.refNo,
            source: 'JURNAL PENYESUAIAN',
            description: `${adj.description} (${getBranchNameById(adj.outletId)})`,
            debitCode: adj.debitCode,
            creditCode: adj.creditCode,
            amount: Number(adj.amount) || 0,
            canDelete: true,
            deleteType: 'ADJUSTMENT'
        });
    });

    return entries.sort((a, b) => a.date.localeCompare(b.date));
}

// ============================================================================
// ENGINE PERHITUNGAN SALDO AKUN, LABA RUGI, ARUS KAS & NERACA
// ============================================================================
function computeFinancialSummary() {
    const entries = buildUnifiedJournalEntries();
    const balances = {};
    COA_LIST.forEach(acc => {
        balances[acc.code] = { ...acc, debit: 0, credit: 0, balance: 0 };
    });

    entries.forEach(e => {
        const amt = Number(e.amount) || 0;
        if (balances[e.debitCode]) balances[e.debitCode].debit += amt;
        if (balances[e.creditCode]) balances[e.creditCode].credit += amt;
    });

    Object.values(balances).forEach(acc => {
        if (acc.normal === 'DEBIT') {
            acc.balance = acc.debit - acc.credit;
        } else {
            acc.balance = acc.credit - acc.debit;
        }
    });

    // Hitung Gram Emas (Beli dari Kasir vs Terjual ke Buyer)
    const allCashierTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    let purchasedGram = 0;
    let purchasedRp = 0;
    allCashierTrx.forEach(t => {
        const iso = parseAnyDateToISO(t.dateStr);
        if (!isDateMatchFilter(iso) || !isBranchMatchFilter(t.outletId, t.branchName)) return;
        purchasedRp += Number(t.grandTotal) || 0;
        (t.items || []).forEach(it => { purchasedGram += parseFloat(it.weight) || 0; });
    });

    let soldGram = 0;
    let totalSalesRp = balances['4101']?.balance || 0;
    let totalCogsRp = balances['5101']?.balance || 0;
    finSales.forEach(s => {
        const iso = parseAnyDateToISO(s.date);
        if (!isDateMatchFilter(iso) || !isBranchMatchFilter(s.outletId)) return;
        soldGram += Number(s.weight) || 0;
    });

    const stockGram = Number((purchasedGram - soldGram).toFixed(2));
    const totalOpExpensesRp = OP_EXPENSE_CODES.reduce((acc, c) => acc + (balances[c]?.balance || 0), 0);
    const totalSocialExpensesRp = SOCIAL_EXPENSE_CODES.reduce((acc, c) => acc + (balances[c]?.balance || 0), 0);
    const totalExpensesRp = EXPENSE_COA_CODES.reduce((acc, c) => acc + (balances[c]?.balance || 0), 0);
    const grossProfit = totalSalesRp - totalCogsRp;
    const netProfit = grossProfit - totalExpensesRp;

    // Total Utang Usaha
    let apTotal = 0;
    let apPaid = 0;
    finPayables.forEach(ap => {
        const iso = parseAnyDateToISO(ap.date);
        if (!isDateMatchFilter(iso, true) || !isBranchMatchFilter(ap.outletId)) return;
        apTotal += Number(ap.amount) || 0;
        apPaid += Number(ap.paidAmount) || 0;
    });
    const apRemaining = balances['2101']?.balance || 0;

    // Posisi Neraca (Aktiva = Pasiva)
    const cashBalance = balances['1101']?.balance || 0;
    const invBalance = balances['1102']?.balance || 0;
    const arBalance = balances['1103']?.balance || 0;
    const fixedAssetBalance = balances['1201']?.balance || 0;
    const totalAssets = cashBalance + invBalance + arBalance + fixedAssetBalance;

    const totalLiabilities = apRemaining;
    const paidInCapital = balances['3101']?.balance || 0;
    const retainedEarnings = (balances['3102']?.balance || 0) + netProfit;
    const totalEquity = paidInCapital + retainedEarnings;
    const totalPasiva = totalLiabilities + totalEquity;

    return {
        entries,
        balances,
        purchasedGram: Number(purchasedGram.toFixed(2)),
        purchasedRp,
        soldGram: Number(soldGram.toFixed(2)),
        stockGram,
        totalSalesRp,
        totalCogsRp,
        grossProfit,
        totalOpExpensesRp,
        totalSocialExpensesRp,
        totalExpensesRp,
        netProfit,
        apTotal,
        apPaid,
        apRemaining,
        cashBalance,
        invBalance,
        arBalance,
        fixedAssetBalance,
        totalAssets,
        totalLiabilities,
        paidInCapital,
        retainedEarnings,
        totalEquity,
        totalPasiva
    };
}

// Helper Setoran Modal Awal Kas
function getCurrentOpeningCashCapitalEntry() {
    return finManualJournals.find(mj =>
        mj.id === 'MJ-INIT-1' ||
        mj.refNo === 'JU.MODAL.001' ||
        (mj.debitCode === '1101' && mj.creditCode === '3101' && String(mj.description || '').toLowerCase().includes('modal awal kas'))
    ) || null;
}

function setOpeningCashCapital(newAmountVal, dateStr = '2026-01-01') {
    const cleanAmt = Math.max(0, Number(newAmountVal) || 0);
    const cleanDate = dateStr || '2026-01-01';
    // Hapus entri modal awal kas lama agar tidak ganda
    finManualJournals = finManualJournals.filter(mj =>
        mj.id !== 'MJ-INIT-1' &&
        mj.refNo !== 'JU.MODAL.001' &&
        !(mj.debitCode === '1101' && mj.creditCode === '3101' && String(mj.description || '').toLowerCase().includes('modal awal kas'))
    );
    if (cleanAmt > 0) {
        finManualJournals.unshift({
            id: 'MJ-INIT-1',
            date: cleanDate,
            refNo: 'JU.MODAL.001',
            debitCode: '1101',
            creditCode: '3101',
            amount: cleanAmt,
            outletId: 0,
            description: 'Setoran Modal Awal Kas & Bank Jantung Emas Indonesia'
        });
    }
    saveFinanceState();
    renderAllFinanceModules();
}

window.resetOpeningCashCapitalToZero = function () {
    setOpeningCashCapital(0, '2026-01-01');
    const qInput = document.getElementById('quickModalAmountInput');
    const iInput = document.getElementById('invModalAmountInput');
    if (qInput) qInput.value = 0;
    if (iInput) iInput.value = 0;
    alert('Setoran Modal Awal Kas berhasil di-reset menjadi Rp 0!');
};

// Helper Perhitungan Kas Kecil Terpisah
function computePettyCashSummary() {
    const openingAmt = Math.max(0, Number(pettyCashOpening.amount) || 0);
    const openingDate = pettyCashOpening.date || '2026-01-01';
    const filteredTrx = pettyCashTrx.filter(tx =>
        isDateMatchFilter(parseAnyDateToISO(tx.date)) && isBranchMatchFilter(tx.outletId)
    ).sort((a, b) => String(a.date).localeCompare(String(b.date)));

    let totalIn = 0;
    let totalOut = 0;
    let runningBal = openingAmt;
    const rowsWithBalance = filteredTrx.map(tx => {
        const amt = Math.max(0, Number(tx.amount) || 0);
        const isIn = tx.type === 'PEMASUKAN';
        if (isIn) {
            totalIn += amt;
            runningBal += amt;
        } else {
            totalOut += amt;
            runningBal -= amt;
        }
        return {
            ...tx,
            inAmount: isIn ? amt : 0,
            outAmount: isIn ? 0 : amt,
            runningBalance: runningBal
        };
    });

    return {
        openingDate,
        openingAmt,
        totalIn,
        totalOut,
        endingBalance: openingAmt + totalIn - totalOut,
        rows: rowsWithBalance
    };
}

// ============================================================================
// RENDER SELURUH MODUL AKUNTANSI & KAS KECIL TERPISAH
// ============================================================================
function renderAllFinanceModules() {
    const sum = computeFinancialSummary();
    const pettySum = computePettyCashSummary();

    // Toggle KPI Utama vs KPI Khusus Kas Kecil (Gambar 2)
    const mainKpiEl = document.getElementById('mainFinKpiGrid');
    const pettyKpiEl = document.getElementById('pettyCashKpiGrid');
    if (mainKpiEl && pettyKpiEl) {
        if (activeFinTab === 'biaya') {
            mainKpiEl.classList.add('hidden');
            pettyKpiEl.classList.remove('hidden');
        } else {
            mainKpiEl.classList.remove('hidden');
            pettyKpiEl.classList.add('hidden');
        }
    }

    // Update 4 KPI Cards Utama
    document.getElementById('kpiFinCashVal').textContent = formatIDR(sum.cashBalance);
    document.getElementById('kpiFinInventoryVal').textContent = formatIDR(sum.invBalance);
    document.getElementById('kpiFinInventorySub').textContent = `Stok Bersih: ${sum.stockGram} Gram (Beli ${sum.purchasedGram}g / Jual ${sum.soldGram}g)`;
    document.getElementById('kpiFinSalesVal').textContent = formatIDR(sum.totalSalesRp);
    document.getElementById('kpiFinSalesSub').textContent = `Laba Kotor: ${formatIDR(sum.grossProfit)}`;
    document.getElementById('kpiFinNetProfitVal').textContent = formatIDR(sum.netProfit);
    document.getElementById('kpiFinNetProfitSub').textContent = `Sisa Utang Usaha: ${formatIDR(sum.apRemaining)}`;

    // Update 2 KPI Cards Khusus Kas Kecil (Gambar 2)
    const kpiPettyBalEl = document.getElementById('kpiPettyCashBalanceVal');
    const kpiPettyBalSubEl = document.getElementById('kpiPettyCashBalanceSub');
    const kpiPettyExpEl = document.getElementById('kpiPettyCashExpenseVal');
    const kpiPettyExpSubEl = document.getElementById('kpiPettyCashExpenseSub');
    if (kpiPettyBalEl) kpiPettyBalEl.textContent = formatIDR(pettySum.endingBalance);
    if (kpiPettyBalSubEl) kpiPettyBalSubEl.textContent = `Saldo Awal: ${formatIDR(pettySum.openingAmt)} | Pemasukan: ${formatIDR(pettySum.totalIn)}`;
    if (kpiPettyExpEl) kpiPettyExpEl.textContent = formatIDR(pettySum.totalOut);
    if (kpiPettyExpSubEl) kpiPettyExpSubEl.textContent = `${pettySum.rows.filter(r => r.type !== 'PEMASUKAN').length} Transaksi Pengeluaran Biaya Harian`;

    // Update Input & Label Setoran Modal Awal Kas (Gambar 4)
    const currentModalEntry = getCurrentOpeningCashCapitalEntry();
    const currentModalAmt = currentModalEntry ? (Number(currentModalEntry.amount) || 0) : 0;
    const currentModalDate = currentModalEntry ? (currentModalEntry.date || '2026-01-01') : '2026-01-01';
    const ovModalLbl = document.getElementById('ovCurrentModalCashLabel');
    if (ovModalLbl) ovModalLbl.textContent = formatIDR(currentModalAmt);
    const qModalAmtInput = document.getElementById('quickModalAmountInput');
    const qModalDateInput = document.getElementById('quickModalDateInput');
    const iModalAmtInput = document.getElementById('invModalAmountInput');
    const iModalDateInput = document.getElementById('invModalDateInput');
    if (qModalAmtInput && document.activeElement !== qModalAmtInput) qModalAmtInput.value = currentModalAmt;
    if (qModalDateInput && document.activeElement !== qModalDateInput) qModalDateInput.value = currentModalDate;
    if (iModalAmtInput && document.activeElement !== iModalAmtInput) iModalAmtInput.value = currentModalAmt;
    if (iModalDateInput && document.activeElement !== iModalDateInput) iModalDateInput.value = currentModalDate;

    // Update Overview Tab
    document.getElementById('ovPurchaseVal').textContent = formatIDR(sum.purchasedRp);
    document.getElementById('ovPurchaseGram').textContent = `${sum.purchasedGram} Gram`;
    document.getElementById('ovSalesVal').textContent = formatIDR(sum.totalSalesRp);
    document.getElementById('ovCogsVal').textContent = formatIDR(sum.totalCogsRp);
    document.getElementById('ovGrossProfitVal').textContent = formatIDR(sum.grossProfit);

    document.getElementById('ovExpensesVal').textContent = formatIDR(sum.totalExpensesRp);
    document.getElementById('ovPayablesTotalVal').textContent = formatIDR(sum.apTotal);
    document.getElementById('ovPayablesPaidVal').textContent = formatIDR(sum.apPaid);
    document.getElementById('ovPayablesRemVal').textContent = formatIDR(sum.apRemaining);
    document.getElementById('ovNetIncomeVal').textContent = formatIDR(sum.netProfit);

    document.getElementById('ovTotalAssetsVal').textContent = formatIDR(sum.totalAssets);
    document.getElementById('ovTotalLiabVal').textContent = formatIDR(sum.totalLiabilities);
    document.getElementById('ovTotalEquityVal').textContent = formatIDR(sum.totalEquity);
    document.getElementById('ovTotalPasivaVal').textContent = formatIDR(sum.totalPasiva);
    document.getElementById('ovClosedCountVal').textContent = `${finClosings.length} Periode`;

    // 2. Render Jurnal Umum
    const jTbody = document.getElementById('jurnalTableBody');
    let sumD = 0;
    let sumK = 0;
    if (jTbody) {
        jTbody.innerHTML = sum.entries.slice().reverse().map(e => {
            sumD += e.amount;
            sumK += e.amount;
            const dAcc = getAccountMeta(e.debitCode);
            const cAcc = getAccountMeta(e.creditCode);
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3 font-bold text-slate-700 whitespace-nowrap">${e.date}</td>
                    <td class="py-3 px-3 font-mono font-extrabold text-emerald-700">${e.refNo}</td>
                    <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-extrabold text-[10px]">${e.source}</span></td>
                    <td class="py-3 px-3">
                        <div class="font-bold text-slate-800">${e.description}</div>
                        <div class="text-[11px] text-emerald-700 mt-0.5"><strong>[D]</strong> ${dAcc.code} - ${dAcc.name}</div>
                        <div class="text-[11px] text-blue-700 pl-4"><strong>[K]</strong> ${cAcc.code} - ${cAcc.name}</div>
                    </td>
                    <td class="py-3 px-3 text-right font-extrabold text-slate-800">${formatIDR(e.amount)}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-slate-800">${formatIDR(e.amount)}</td>
                    <td class="py-3 px-3 text-center">
                        ${e.canDelete ? `<button onclick="deleteJournalItem('${e.deleteType}', '${e.rawId || e.id}')" class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-[11px] font-bold transition"><i class="fa-solid fa-trash"></i></button>` : '<span class="text-[10px] text-slate-400 font-bold">Auto</span>'}
                    </td>
                </tr>
            `;
        }).join('');
        document.getElementById('jurnalTotalDebitEl').textContent = formatIDR(sumD);
        document.getElementById('jurnalTotalCreditEl').textContent = formatIDR(sumK);
    }

    // 3. Render Buku Besar (General Ledger)
    const selectedAccCode = document.getElementById('ledgerAccountSelect')?.value || '1101';
    const accMeta = getAccountMeta(selectedAccCode);
    const lTbody = document.getElementById('ledgerTableBody');
    if (lTbody) {
        let runBal = 0;
        let mutDebit = 0;
        let mutCredit = 0;
        const ledgerRows = [];
        sum.entries.forEach(e => {
            if (e.debitCode !== selectedAccCode && e.creditCode !== selectedAccCode) return;
            const dVal = e.debitCode === selectedAccCode ? e.amount : 0;
            const cVal = e.creditCode === selectedAccCode ? e.amount : 0;
            mutDebit += dVal;
            mutCredit += cVal;
            if (accMeta.normal === 'DEBIT') {
                runBal += (dVal - cVal);
            } else {
                runBal += (cVal - dVal);
            }
            ledgerRows.push(`
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3 font-bold text-slate-700">${e.date}</td>
                    <td class="py-3 px-3 font-mono font-extrabold text-blue-700">${e.refNo}</td>
                    <td class="py-3 px-3 font-medium text-slate-800">${e.description} <span class="text-[10px] text-slate-400">(${e.source})</span></td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-700">${dVal > 0 ? formatIDR(dVal) : '-'}</td>
                    <td class="py-3 px-3 text-right font-bold text-rose-600">${cVal > 0 ? formatIDR(cVal) : '-'}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-[#0b132b]">${formatIDR(runBal)}</td>
                </tr>
            `);
        });
        lTbody.innerHTML = ledgerRows.join('') || `<tr><td colspan="6" class="py-6 text-center text-slate-400">Belum ada mutasi pada akun ini di periode terpilih.</td></tr>`;
        document.getElementById('ledgerSumAccName').textContent = `${accMeta.code} - ${accMeta.name} (Saldo Normal: ${accMeta.normal})`;
        document.getElementById('ledgerSumDebit').textContent = formatIDR(mutDebit);
        document.getElementById('ledgerSumCredit').textContent = formatIDR(mutCredit);
        document.getElementById('ledgerSumBalance').textContent = formatIDR(runBal);
    }

    // 3b. Render Inventory / Inventaris (Akun 1201 & Persediaan Emas 1102)
    const invAssetBadge = document.getElementById('invAssetTotalBadge');
    if (invAssetBadge) invAssetBadge.textContent = formatIDR(sum.fixedAssetBalance);
    const invAssetsTbody = document.getElementById('inventoryAssetsTableBody');
    if (invAssetsTbody) {
        const assetEntries = finManualJournals.filter(mj =>
            (mj.debitCode === '1201' || mj.creditCode === '1201') &&
            isDateMatchFilter(parseAnyDateToISO(mj.date), true) &&
            isBranchMatchFilter(mj.outletId)
        );
        invAssetsTbody.innerHTML = assetEntries.slice().reverse().map(ast => {
            const srcAcc = getAccountMeta(ast.creditCode);
            const qtyVal = ast.qty || 1;
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3">
                        <div class="font-mono font-extrabold text-orange-600">${ast.refNo}</div>
                        <div class="text-[11px] text-slate-400">${ast.date}</div>
                    </td>
                    <td class="py-3 px-3 font-bold text-slate-800">${ast.description}</td>
                    <td class="py-3 px-3 font-semibold text-slate-600">${getBranchNameById(ast.outletId)}</td>
                    <td class="py-3 px-3 text-center font-extrabold text-slate-700">${qtyVal} Unit</td>
                    <td class="py-3 px-3 text-slate-600">${srcAcc.code} - ${srcAcc.name}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-orange-600">${formatIDR(ast.amount)}</td>
                    <td class="py-3 px-3 text-center">
                        <div class="flex items-center justify-center gap-1.5">
                            <button onclick="editInventoryAssetValue('${ast.id}')" class="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-[11px] font-bold transition" title="Ubah Nilai"><i class="fa-solid fa-pen"></i></button>
                            <button onclick="deleteInventoryAssetItem('${ast.id}')" class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-[11px] font-bold transition" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="7" class="py-6 text-center text-slate-400">Belum ada data inventaris peralatan cabang (Akun 1201).</td></tr>`;
    }

    const invGoldInGramEl = document.getElementById('invGoldInGramEl');
    const invGoldInRpEl = document.getElementById('invGoldInRpEl');
    const invGoldOutGramEl = document.getElementById('invGoldOutGramEl');
    const invGoldOutRpEl = document.getElementById('invGoldOutRpEl');
    const invGoldNetGramEl = document.getElementById('invGoldNetGramEl');
    const invGoldBalanceRpEl = document.getElementById('invGoldBalanceRpEl');
    if (invGoldInGramEl) invGoldInGramEl.textContent = `${sum.purchasedGram} Gram`;
    if (invGoldInRpEl) invGoldInRpEl.textContent = formatIDR(sum.purchasedRp);
    if (invGoldOutGramEl) invGoldOutGramEl.textContent = `${sum.soldGram} Gram`;
    if (invGoldOutRpEl) invGoldOutRpEl.textContent = `HPP: ${formatIDR(sum.totalCogsRp)}`;
    if (invGoldNetGramEl) invGoldNetGramEl.textContent = `${sum.stockGram} Gram`;
    if (invGoldBalanceRpEl) invGoldBalanceRpEl.textContent = formatIDR(sum.invBalance);

    const invGoldTbody = document.getElementById('inventoryGoldMutationTableBody');
    if (invGoldTbody) {
        const goldMutations = sum.entries.filter(e => e.debitCode === '1102' || e.creditCode === '1102');
        invGoldTbody.innerHTML = goldMutations.slice().reverse().map(gm => {
            const isIn = gm.debitCode === '1102';
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3 font-bold text-slate-700">${gm.date}</td>
                    <td class="py-3 px-3 font-mono font-extrabold ${isIn ? 'text-emerald-700' : 'text-rose-600'}">${gm.refNo}</td>
                    <td class="py-3 px-3">
                        <span class="px-2 py-0.5 rounded-md ${isIn ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'} font-extrabold text-[10px]">
                            ${isIn ? 'EMAS MASUK (BELI)' : 'EMAS KELUAR (JUAL)'}
                        </span>
                    </td>
                    <td class="py-3 px-3 text-slate-800 font-medium">${gm.description}</td>
                    <td class="py-3 px-3 text-right font-bold ${isIn ? 'text-emerald-700' : 'text-rose-600'}">${gm.gram ? `${isIn ? '+' : '-'}${gm.gram}g` : '-'}</td>
                    <td class="py-3 px-3 text-right font-extrabold ${isIn ? 'text-emerald-700' : 'text-rose-600'}">${isIn ? '+' : '-'}${formatIDR(gm.amount)}</td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="6" class="py-6 text-center text-slate-400">Belum ada mutasi stok emas pada periode ini.</td></tr>`;
    }

    // 4. Render Penjualan Emas
    const sTbody = document.getElementById('salesTableBody');
    if (sTbody) {
        const filteredSales = finSales.filter(s => isDateMatchFilter(parseAnyDateToISO(s.date)) && isBranchMatchFilter(s.outletId));
        sTbody.innerHTML = filteredSales.slice().reverse().map(s => {
            const margin = (Number(s.totalSale) || 0) - (Number(s.cogs) || 0);
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3">
                        <div class="font-mono font-extrabold text-emerald-700">${s.invoiceNo}</div>
                        <div class="text-[11px] text-slate-400">${s.date}</div>
                    </td>
                    <td class="py-3 px-3 font-bold text-slate-800">${s.buyer}</td>
                    <td class="py-3 px-3 text-slate-600 font-semibold">${getBranchNameById(s.outletId)}</td>
                    <td class="py-3 px-3 text-right font-bold text-purple-700">${s.weight} Gram</td>
                    <td class="py-3 px-3 text-right font-extrabold text-emerald-700">${formatIDR(s.totalSale)}</td>
                    <td class="py-3 px-3 text-right font-bold text-slate-600">${formatIDR(s.cogs)}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-blue-700">${formatIDR(margin)}</td>
                    <td class="py-3 px-3 text-center">
                        <button onclick="deleteJournalItem('SALE', '${s.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-bold"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="8" class="py-6 text-center text-slate-400">Belum ada data penjualan emas pada periode ini.</td></tr>`;
    }

    // 4b. Render Piutang Usaha (Accounts Receivable)
    const arTbody = document.getElementById('receivablesTableBody');
    if (arTbody) {
        const filteredAr = finReceivables.filter(ar => isDateMatchFilter(parseAnyDateToISO(ar.date), true) && isBranchMatchFilter(ar.outletId));
        let arTotalVal = 0;
        let arPaidVal = 0;
        arTbody.innerHTML = filteredAr.slice().reverse().map(ar => {
            const amt = Number(ar.amount) || 0;
            const paid = Number(ar.paidAmount) || 0;
            const rem = Math.max(0, amt - paid);
            arTotalVal += amt;
            arPaidVal += paid;
            const isLunas = rem === 0;
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3">
                        <div class="font-mono font-extrabold text-teal-700">${ar.refNo}</div>
                        <div class="text-[11px] text-slate-400">${ar.date}</div>
                    </td>
                    <td class="py-3 px-3 font-bold text-slate-800">${ar.debtor}</td>
                    <td class="py-3 px-3 font-semibold text-slate-600">${getBranchNameById(ar.outletId)}</td>
                    <td class="py-3 px-3">
                        <div class="text-slate-700">${ar.description}</div>
                        <div class="text-[10px] text-slate-400">Jatuh Tempo: ${ar.dueDate || '-'}</div>
                    </td>
                    <td class="py-3 px-3 text-right font-bold text-slate-800">${formatIDR(amt)}</td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-600">${formatIDR(paid)}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-teal-700">${formatIDR(rem)}</td>
                    <td class="py-3 px-3 text-center">
                        ${isLunas
                    ? `<span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px]">LUNAS</span>`
                    : `<span class="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-[10px]">BELUM LUNAS</span>`}
                    </td>
                    <td class="py-3 px-3 text-center">
                        <div class="flex items-center justify-center gap-1.5">
                            ${!isLunas ? `<button onclick="collectAccountsReceivable('${ar.id}')" class="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px]">Terima</button>` : ''}
                            <button onclick="deleteJournalItem('RECEIVABLE', '${ar.id}')" class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-xs"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="9" class="py-6 text-center text-slate-400">Belum ada catatan piutang usaha pada periode ini.</td></tr>`;
        const arRemVal = Math.max(0, arTotalVal - arPaidVal);
        const arSumTotalEl = document.getElementById('arSumTotalEl');
        const arSumPaidEl = document.getElementById('arSumPaidEl');
        const arSumRemEl = document.getElementById('arSumRemEl');
        if (arSumTotalEl) arSumTotalEl.textContent = formatIDR(arTotalVal);
        if (arSumPaidEl) arSumPaidEl.textContent = formatIDR(arPaidVal);
        if (arSumRemEl) arSumRemEl.textContent = formatIDR(arRemVal);
    }

    // 5. Render Kas Kecil Terpisah (Petty Cash - Gambar 2)
    const pettyBadgeEl = document.getElementById('pettyOpeningCurrentBadge');
    const pettyOpenAmtInput = document.getElementById('pettyOpeningAmountInput');
    const pettyOpenDateInput = document.getElementById('pettyOpeningDateInput');
    if (pettyBadgeEl) pettyBadgeEl.textContent = formatIDR(pettySum.openingAmt);
    if (pettyOpenAmtInput && document.activeElement !== pettyOpenAmtInput) pettyOpenAmtInput.value = pettySum.openingAmt;
    if (pettyOpenDateInput && document.activeElement !== pettyOpenDateInput) pettyOpenDateInput.value = pettySum.openingDate;

    const pettySumOpenEl = document.getElementById('pettySumOpeningEl');
    const pettySumInEl = document.getElementById('pettySumInEl');
    const pettySumOutEl = document.getElementById('pettySumOutEl');
    const pettySumBalEl = document.getElementById('pettySumBalanceEl');
    if (pettySumOpenEl) pettySumOpenEl.textContent = formatIDR(pettySum.openingAmt);
    if (pettySumInEl) pettySumInEl.textContent = formatIDR(pettySum.totalIn);
    if (pettySumOutEl) pettySumOutEl.textContent = formatIDR(pettySum.totalOut);
    if (pettySumBalEl) pettySumBalEl.textContent = formatIDR(pettySum.endingBalance);

    const eTbody = document.getElementById('expensesTableBody');
    if (eTbody) {
        eTbody.innerHTML = pettySum.rows.slice().reverse().map(tx => {
            const isIn = tx.type === 'PEMASUKAN';
            const accLabel = tx.accountCode === 'TOPUP'
                ? 'Pengisian / Top-Up Kas Kecil'
                : `${getAccountMeta(tx.accountCode).code} - ${getAccountMeta(tx.accountCode).name}`;
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3">
                        <div class="font-mono font-extrabold ${isIn ? 'text-emerald-700' : 'text-rose-600'}">${tx.refNo}</div>
                        <div class="text-[11px] text-slate-400">${tx.date}</div>
                    </td>
                    <td class="py-3 px-3">
                        <span class="px-2 py-0.5 rounded-md ${isIn ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'} font-extrabold text-[10px]">
                            ${isIn ? 'PEMASUKAN' : 'PENGELUARAN'}
                        </span>
                    </td>
                    <td class="py-3 px-3 font-bold text-slate-700">${accLabel}</td>
                    <td class="py-3 px-3 font-semibold text-slate-600">${getBranchNameById(tx.outletId)}</td>
                    <td class="py-3 px-3 text-slate-800">${tx.description}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-emerald-700">${tx.inAmount > 0 ? formatIDR(tx.inAmount) : '-'}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-rose-600">${tx.outAmount > 0 ? formatIDR(tx.outAmount) : '-'}</td>
                    <td class="py-3 px-3 text-right font-black text-[#0b132b]">${formatIDR(tx.runningBalance)}</td>
                    <td class="py-3 px-3 text-center">
                        <button onclick="deletePettyCashItem('${tx.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-bold"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="9" class="py-6 text-center text-slate-400">Belum ada transaksi pemasukan/pengeluaran kas kecil pada periode ini.</td></tr>`;
    }

    // 6. Render Utang Usaha
    const apTbody = document.getElementById('payablesTableBody');
    if (apTbody) {
        const filteredAp = finPayables.filter(ap => isDateMatchFilter(parseAnyDateToISO(ap.date), true) && isBranchMatchFilter(ap.outletId));
        apTbody.innerHTML = filteredAp.map(ap => {
            const rem = Math.max(0, (Number(ap.amount) || 0) - (Number(ap.paidAmount) || 0));
            const isLunas = rem === 0;
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3">
                        <div class="font-mono font-extrabold text-amber-600">${ap.refNo}</div>
                        <div class="text-[11px] text-slate-400">${ap.date}</div>
                    </td>
                    <td class="py-3 px-3 font-bold text-slate-800">${ap.vendor}</td>
                    <td class="py-3 px-3">
                        <div class="text-slate-700">${ap.description}</div>
                        <div class="text-[10px] text-slate-400">Jatuh Tempo: ${ap.dueDate || '-'}</div>
                    </td>
                    <td class="py-3 px-3 text-right font-bold text-slate-800">${formatIDR(ap.amount)}</td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-600">${formatIDR(ap.paidAmount)}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-amber-600">${formatIDR(rem)}</td>
                    <td class="py-3 px-3 text-center">
                        ${isLunas
                    ? `<span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px]">LUNAS</span>`
                    : `<span class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-extrabold text-[10px]">BELUM LUNAS</span>`}
                    </td>
                    <td class="py-3 px-3 text-center">
                        <div class="flex items-center justify-center gap-1.5">
                            ${!isLunas ? `<button onclick="payAccountsPayable('${ap.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]">Bayar</button>` : ''}
                            <button onclick="deleteJournalItem('PAYABLE', '${ap.id}')" class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-xs"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="8" class="py-6 text-center text-slate-400">Belum ada catatan utang usaha.</td></tr>`;
    }

    // 7. Render Arus Kas (Cash Flow Statement)
    const cfContainer = document.getElementById('cashFlowReportContainer');
    const cfPeriodBadge = document.getElementById('cfPeriodBadge');
    if (cfPeriodBadge) cfPeriodBadge.textContent = getActivePeriodLabel();
    if (cfContainer) {
        const opCashIn = sum.totalSalesRp;
        const opCashOutGold = sum.purchasedRp;
        const opCashOutExp = sum.totalExpensesRp;
        const netOperatingCf = opCashIn - opCashOutGold - opCashOutExp;

        const finCashInModal = sum.entries
            .filter(e => e.debitCode === '1101' && e.creditCode === '3101')
            .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
        const finCashInDebt = sum.apTotal;
        const finCashOutDebt = sum.apPaid;
        const netFinancingCf = finCashInModal + finCashInDebt - finCashOutDebt;

        cfContainer.innerHTML = `
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <h4 class="font-extrabold text-[#0b132b] uppercase text-xs border-b border-slate-200 pb-2">A. Arus Kas dari Aktivitas Operasional</h4>
                <div class="flex justify-between py-1"><span>Penerimaan Kas dari Penjualan / Peleburan Emas</span><strong class="text-emerald-700">${formatIDR(opCashIn)}</strong></div>
                <div class="flex justify-between py-1"><span>Pengeluaran Kas Pembelian Emas Customer (Nota Kasir)</span><strong class="text-rose-600">(${formatIDR(opCashOutGold)})</strong></div>
                <div class="flex justify-between py-1"><span>Pembayaran Biaya Operasional Cabang &amp; Pusat</span><strong class="text-rose-600">(${formatIDR(opCashOutExp)})</strong></div>
                <div class="flex justify-between pt-2 border-t border-slate-200 font-extrabold text-slate-900">
                    <span>Arus Kas Bersih Aktivitas Operasional</span>
                    <span class="${netOperatingCf >= 0 ? 'text-emerald-700' : 'text-rose-600'}">${formatIDR(netOperatingCf)}</span>
                </div>
            </div>

            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <h4 class="font-extrabold text-[#0b132b] uppercase text-xs border-b border-slate-200 pb-2">B. Arus Kas dari Aktivitas Pendanaan &amp; Modal</h4>
                <div class="flex justify-between py-1"><span>Setoran Modal Awal Kas Perusahaan</span><strong class="text-emerald-700">${formatIDR(finCashInModal)}</strong></div>
                <div class="flex justify-between py-1"><span>Penerimaan Fasilitas Utang Usaha / Modal Kerja</span><strong class="text-emerald-700">${formatIDR(finCashInDebt)}</strong></div>
                <div class="flex justify-between py-1"><span>Pembayaran / Pelunasan Utang Usaha</span><strong class="text-rose-600">(${formatIDR(finCashOutDebt)})</strong></div>
                <div class="flex justify-between pt-2 border-t border-slate-200 font-extrabold text-slate-900">
                    <span>Arus Kas Bersih Aktivitas Pendanaan</span>
                    <span class="text-blue-700">${formatIDR(netFinancingCf)}</span>
                </div>
            </div>

            <div class="bg-[#0b132b] text-white rounded-2xl p-4 flex items-center justify-between">
                <div>
                    <span class="text-[10px] uppercase tracking-wider text-emerald-400 font-extrabold block">POSISI SALDO KAS &amp; BANK AKHIR</span>
                    <span class="text-xs text-slate-300">Sesuai Buku Besar Akun 1101 - Kas &amp; Bank Perusahaan</span>
                </div>
                <strong class="text-lg font-black text-emerald-400">${formatIDR(sum.cashBalance)}</strong>
            </div>
        `;
    }

    // 8. Render Neraca & Laba Rugi
    const bsContainer = document.getElementById('balanceSheetContainer');
    if (bsContainer) {
        bsContainer.innerHTML = `
            <div class="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <h4 class="font-extrabold text-blue-800 uppercase text-xs border-b border-slate-200 pb-1.5">AKTIVA (ASET PERUSAHAAN)</h4>
                <div class="flex justify-between py-1"><span>1101 - Kas &amp; Bank Perusahaan</span><strong>${formatIDR(sum.cashBalance)}</strong></div>
                <div class="flex justify-between py-1"><span>1102 - Persediaan Emas (${sum.stockGram} Gram)</span><strong>${formatIDR(sum.invBalance)}</strong></div>
                <div class="flex justify-between py-1"><span>1103 - Piutang Usaha Buyer</span><strong>${formatIDR(sum.arBalance)}</strong></div>
                <div class="flex justify-between py-1"><span>1201 - Peralatan, Timbangan &amp; Inventaris</span><strong>${formatIDR(sum.fixedAssetBalance)}</strong></div>
                <div class="flex justify-between pt-2 border-t border-slate-300 font-black text-blue-700 text-sm">
                    <span>TOTAL AKTIVA</span>
                    <span>${formatIDR(sum.totalAssets)}</span>
                </div>
            </div>

            <div class="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <h4 class="font-extrabold text-emerald-800 uppercase text-xs border-b border-slate-200 pb-1.5">PASIVA (KEWAJIBAN &amp; EKUITAS)</h4>
                <div class="flex justify-between py-1"><span>2101 - Utang Usaha &amp; Kewajiban</span><strong class="text-amber-600">${formatIDR(sum.totalLiabilities)}</strong></div>
                <div class="flex justify-between py-1"><span>3101 - Modal Disetor Perusahaan</span><strong>${formatIDR(sum.paidInCapital)}</strong></div>
                <div class="flex justify-between py-1"><span>3102 - Laba Ditahan &amp; Laba Periode Berjalan</span><strong class="text-emerald-700">${formatIDR(sum.retainedEarnings)}</strong></div>
                <div class="flex justify-between pt-2 border-t border-slate-300 font-black text-emerald-700 text-sm">
                    <span>TOTAL PASIVA</span>
                    <span>${formatIDR(sum.totalPasiva)}</span>
                </div>
            </div>
        `;
    }

    const isContainer = document.getElementById('incomeStatementContainer');
    if (isContainer) {
        isContainer.innerHTML = `
            <div class="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <h4 class="font-extrabold text-slate-800 uppercase text-xs border-b border-slate-200 pb-1.5">PENDAPATAN &amp; HPP EMAS</h4>
                <div class="flex justify-between py-1"><span>4101 - Penjualan Emas / Peleburan (${sum.soldGram}g)</span><strong class="text-emerald-700">${formatIDR(sum.totalSalesRp)}</strong></div>
                <div class="flex justify-between py-1"><span>5101 - Harga Pokok Penjualan (HPP) Emas</span><strong class="text-rose-600">(${formatIDR(sum.totalCogsRp)})</strong></div>
                <div class="flex justify-between pt-2 border-t border-slate-200 font-extrabold text-slate-900">
                    <span>LABA KOTOR PENJUALAN</span>
                    <span class="text-emerald-700">${formatIDR(sum.grossProfit)}</span>
                </div>
            </div>

            <div class="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/80 max-h-[380px] overflow-y-auto">
                <h4 class="font-extrabold text-slate-800 uppercase text-xs border-b border-slate-200 pb-1.5">61xx - BEBAN OPERASIONAL</h4>
                ${OP_EXPENSE_CODES.map(code => {
            const b = sum.balances[code];
            return `<div class="flex justify-between py-0.5 text-[11px]"><span class="${b.balance > 0 ? 'font-bold text-slate-800' : 'text-slate-500'}">${b.code} - ${b.name}</span><strong class="${b.balance > 0 ? 'text-rose-600' : 'text-slate-400'}">${formatIDR(b.balance)}</strong></div>`;
        }).join('')}
                <div class="flex justify-between pt-1.5 border-t border-slate-200 font-extrabold text-rose-700 text-xs">
                    <span>Subtotal Beban Operasional (6101-6119)</span>
                    <span>${formatIDR(sum.totalOpExpensesRp)}</span>
                </div>

                <h4 class="font-extrabold text-slate-800 uppercase text-xs border-b border-slate-200 pt-3 pb-1.5">71xx - BEBAN BERBAGI / SOSIAL &amp; PROGRAM JEI</h4>
                ${SOCIAL_EXPENSE_CODES.map(code => {
            const b = sum.balances[code];
            return `<div class="flex justify-between py-0.5 text-[11px]"><span class="${b.balance > 0 ? 'font-bold text-slate-800' : 'text-slate-500'}">${b.code} - ${b.name}</span><strong class="${b.balance > 0 ? 'text-purple-600' : 'text-slate-400'}">${formatIDR(b.balance)}</strong></div>`;
        }).join('')}
                <div class="flex justify-between pt-1.5 border-t border-slate-200 font-extrabold text-purple-700 text-xs">
                    <span>Subtotal Beban Sosial &amp; Program JEI (7101-7106)</span>
                    <span>${formatIDR(sum.totalSocialExpensesRp)}</span>
                </div>

                <div class="flex justify-between pt-2.5 mt-2 border-t-2 border-slate-300 font-black text-emerald-700 text-sm">
                    <span>LABA BERSIH (NET INCOME)</span>
                    <span>${formatIDR(sum.netProfit)}</span>
                </div>
            </div>
        `;
    }

    // 8b. Render Jurnal Penyesuaian (Adjusting Journal Entries / AJP)
    const adjTbody = document.getElementById('adjustmentTableBody');
    if (adjTbody) {
        const filteredAdj = finAdjustments.filter(adj => isDateMatchFilter(parseAnyDateToISO(adj.date), true) && isBranchMatchFilter(adj.outletId));
        let adjSumD = 0;
        let adjSumK = 0;
        adjTbody.innerHTML = filteredAdj.slice().reverse().map(adj => {
            const amt = Number(adj.amount) || 0;
            adjSumD += amt;
            adjSumK += amt;
            const dAcc = getAccountMeta(adj.debitCode);
            const cAcc = getAccountMeta(adj.creditCode);
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3 font-bold text-slate-700 whitespace-nowrap">${adj.date}</td>
                    <td class="py-3 px-3 font-mono font-extrabold text-sky-700">${adj.refNo}</td>
                    <td class="py-3 px-3 font-semibold text-slate-600">${getBranchNameById(adj.outletId)}</td>
                    <td class="py-3 px-3">
                        <div class="font-bold text-slate-800">${adj.description}</div>
                        <div class="text-[11px] text-emerald-700 mt-0.5"><strong>[D]</strong> ${dAcc.code} - ${dAcc.name}</div>
                        <div class="text-[11px] text-sky-700 pl-4"><strong>[K]</strong> ${cAcc.code} - ${cAcc.name}</div>
                    </td>
                    <td class="py-3 px-3 text-right font-extrabold text-slate-800">${formatIDR(amt)}</td>
                    <td class="py-3 px-3 text-right font-extrabold text-slate-800">${formatIDR(amt)}</td>
                    <td class="py-3 px-3 text-center">
                        <button onclick="deleteJournalItem('ADJUSTMENT', '${adj.id}')" class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-[11px] font-bold transition"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="7" class="py-6 text-center text-slate-400">Belum ada ayat jurnal penyesuaian pada periode ini.</td></tr>`;
        const adjCountEl = document.getElementById('adjCountEl');
        const adjTotalDebitEl = document.getElementById('adjTotalDebitEl');
        const adjTotalCreditEl = document.getElementById('adjTotalCreditEl');
        if (adjCountEl) adjCountEl.textContent = `${filteredAdj.length} Ayat`;
        if (adjTotalDebitEl) adjTotalDebitEl.textContent = formatIDR(adjSumD);
        if (adjTotalCreditEl) adjTotalCreditEl.textContent = formatIDR(adjSumK);
    }

    // 9. Render Tutup Buku
    document.getElementById('closePreviewRev').textContent = formatIDR(sum.totalSalesRp);
    document.getElementById('closePreviewCogs').textContent = formatIDR(sum.totalCogsRp);
    document.getElementById('closePreviewExp').textContent = formatIDR(sum.totalExpensesRp);
    document.getElementById('closePreviewNet').textContent = formatIDR(sum.netProfit);

    const cTbody = document.getElementById('closingTableBody');
    if (cTbody) {
        cTbody.innerHTML = finClosings.slice().reverse().map(c => `
            <tr class="hover:bg-slate-50 transition">
                <td class="py-3 px-3 font-bold text-slate-700">${c.closedAt}</td>
                <td class="py-3 px-3 font-mono font-extrabold text-purple-700">${c.refNo}</td>
                <td class="py-3 px-3 font-bold text-slate-800">${c.periodLabel}</td>
                <td class="py-3 px-3 text-right font-bold text-emerald-700">${formatIDR(c.revenue)}</td>
                <td class="py-3 px-3 text-right font-bold text-rose-600">${formatIDR(c.totalCost)}</td>
                <td class="py-3 px-3 text-right font-black text-purple-700">${formatIDR(c.netIncome)}</td>
                <td class="py-3 px-3 text-center">
                    <button onclick="deleteClosingEntry('${c.id}')" class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-bold"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('') || `<tr><td colspan="7" class="py-6 text-center text-slate-400">Belum ada periode tutup buku yang dijalankan.</td></tr>`;
    }
}

// ============================================================================
// HANDLERS CRUD FORM MODUL KEUANGAN, MODAL KAS, INVENTARIS & KAS KECIL
// ============================================================================
document.getElementById('formQuickSetModalCash')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateStr = document.getElementById('quickModalDateInput')?.value || '2026-01-01';
    const amtVal = Number(document.getElementById('quickModalAmountInput')?.value) || 0;
    setOpeningCashCapital(amtVal, dateStr);
    alert(`Setoran Modal Awal Kas sebesar ${formatIDR(amtVal)} berhasil disimpan & diperbarui ke Saldo Kas, Arus Kas, Buku Besar, dan Neraca!`);
});

document.getElementById('formInvSetModalCash')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateStr = document.getElementById('invModalDateInput')?.value || '2026-01-01';
    const amtVal = Number(document.getElementById('invModalAmountInput')?.value) || 0;
    setOpeningCashCapital(amtVal, dateStr);
    alert(`Setoran Modal Awal Kas sebesar ${formatIDR(amtVal)} berhasil disimpan & diperbarui ke Saldo Kas, Arus Kas, Buku Besar, dan Neraca!`);
});

document.getElementById('formAddInventoryAsset')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('invAssetDateInput')?.value || todayISO;
    const refNo = (document.getElementById('invAssetRefInput')?.value || '').trim();
    const name = (document.getElementById('invAssetNameInput')?.value || '').trim();
    const outletId = Number(document.getElementById('invAssetBranchSelect')?.value) || 0;
    const qty = Math.max(1, Number(document.getElementById('invAssetQtyInput')?.value) || 1);
    const creditCode = document.getElementById('invAssetSourceSelect')?.value || '3101';
    const amount = Number(document.getElementById('invAssetAmountInput')?.value) || 0;
    if (!refNo || !name || amount <= 0) {
        alert('Pastikan Kode Inventaris, Nama Barang, dan Nilai Total > 0 diisi!');
        return;
    }
    finManualJournals.push({
        id: 'AST-' + Date.now(),
        date,
        refNo,
        debitCode: '1201',
        creditCode,
        amount,
        qty,
        outletId,
        description: `${name} (${qty} Unit)`
    });
    saveFinanceState();
    renderAllFinanceModules();
    document.getElementById('invAssetRefInput').value = '';
    document.getElementById('invAssetNameInput').value = '';
    document.getElementById('invAssetAmountInput').value = '';
    alert('Inventaris Peralatan Cabang berhasil ditambahkan & terintegrasi ke Neraca (Akun 1201)!');
});

window.editInventoryAssetValue = function (id) {
    const item = finManualJournals.find(mj => mj.id === id);
    if (!item) return;
    const newDesc = prompt('Nama / Keterangan Aset Inventaris:', item.description || '');
    if (newDesc === null) return;
    const newAmtStr = prompt(`Nominal Nilai Inventaris saat ini: ${formatIDR(item.amount)}\nMasukkan Nilai Inventaris Baru (Rp):`, item.amount);
    if (newAmtStr === null) return;
    const newAmt = Number(newAmtStr);
    if (isNaN(newAmt) || newAmt < 0) {
        alert('Nominal tidak valid!');
        return;
    }
    item.description = newDesc.trim() || item.description;
    item.amount = newAmt;
    saveFinanceState();
    renderAllFinanceModules();
    alert('Data Aset Inventaris berhasil diperbarui!');
};

window.deleteInventoryAssetItem = function (id) {
    if (!confirm('Hapus item inventaris peralatan ini dari daftar dan Neraca?')) return;
    finManualJournals = finManualJournals.filter(mj => mj.id !== id);
    saveFinanceState();
    renderAllFinanceModules();
};

document.getElementById('formAddManualJournal')?.addEventListener('submit', () => {
    const date = document.getElementById('jurnalDateInput').value || todayISO;
    const refNo = document.getElementById('jurnalRefInput').value.trim();
    const debitCode = document.getElementById('jurnalDebitAccSelect').value;
    const creditCode = document.getElementById('jurnalCreditAccSelect').value;
    const amount = Number(document.getElementById('jurnalAmountInput').value) || 0;
    const description = document.getElementById('jurnalDescInput').value.trim();
    if (!refNo || amount <= 0 || debitCode === creditCode) {
        alert('Pastikan No. Ref diisi, Nominal > 0, dan Akun Debit tidak sama dengan Akun Kredit!');
        return;
    }
    finManualJournals.push({
        id: 'MJ-' + Date.now(),
        date, refNo, debitCode, creditCode, amount, outletId: 0, description
    });
    saveFinanceState();
    renderAllFinanceModules();
    document.getElementById('jurnalRefInput').value = '';
    document.getElementById('jurnalAmountInput').value = '';
    document.getElementById('jurnalDescInput').value = '';
    alert('Jurnal Umum berhasil diposting!');
});

document.getElementById('formAddSale')?.addEventListener('submit', () => {
    const date = document.getElementById('saleDateInput').value || todayISO;
    const invoiceNo = document.getElementById('saleInvInput').value.trim();
    const buyer = document.getElementById('saleBuyerInput').value.trim();
    const outletId = Number(document.getElementById('saleBranchSelect').value) || 1;
    const weight = parseFloat(document.getElementById('saleWeightInput').value) || 0;
    const totalSale = Number(document.getElementById('saleTotalInput').value) || 0;
    const cogs = Number(document.getElementById('saleCogsInput').value) || 0;
    finSales.push({ id: 'SLS-' + Date.now(), date, invoiceNo, buyer, outletId, weight, totalSale, cogs });
    saveFinanceState();
    renderAllFinanceModules();
    document.getElementById('saleInvInput').value = '';
    document.getElementById('saleBuyerInput').value = '';
    document.getElementById('saleWeightInput').value = '';
    document.getElementById('saleTotalInput').value = '';
    document.getElementById('saleCogsInput').value = '';
    alert('Transaksi Penjualan Emas berhasil disimpan & terjurnal otomatis!');
});

document.getElementById('formAddReceivable')?.addEventListener('submit', () => {
    const date = document.getElementById('arDateInput').value || todayISO;
    const refNo = document.getElementById('arRefInput').value.trim();
    const debtor = document.getElementById('arDebtorInput').value.trim();
    const outletId = Number(document.getElementById('arBranchSelect').value) || 1;
    const dueDate = document.getElementById('arDueInput').value;
    const amount = Number(document.getElementById('arAmountInput').value) || 0;
    const description = document.getElementById('arDescInput').value.trim();
    if (!refNo || !debtor || amount <= 0) {
        alert('Pastikan No. Faktur, Nama Debitur, dan Nominal Piutang > 0 diisi!');
        return;
    }
    finReceivables.push({
        id: 'AR-' + Date.now(),
        date, refNo, debtor, dueDate, outletId, amount, paidAmount: 0, description
    });
    saveFinanceState();
    renderAllFinanceModules();
    document.getElementById('arRefInput').value = '';
    document.getElementById('arDebtorInput').value = '';
    document.getElementById('arAmountInput').value = '';
    document.getElementById('arDescInput').value = '';
    alert('Piutang Usaha berhasil dicatat & terintegrasi ke Neraca dan Buku Besar!');
});

window.collectAccountsReceivable = function (arId) {
    const item = finReceivables.find(a => a.id === arId);
    if (!item) return;
    const rem = (Number(item.amount) || 0) - (Number(item.paidAmount) || 0);
    const input = prompt(`Sisa Piutang dari ${item.debtor}: ${formatIDR(rem)}\nMasukkan nominal penerimaan pembayaran piutang (Rp):`, rem);
    if (input === null) return;
    const payVal = Number(input);
    if (isNaN(payVal) || payVal <= 0 || payVal > rem) {
        alert('Nominal penerimaan tidak valid atau melebihi sisa piutang!');
        return;
    }
    item.paidAmount = (Number(item.paidAmount) || 0) + payVal;
    saveFinanceState();
    renderAllFinanceModules();
    alert(`Penerimaan pelunasan piutang sebesar ${formatIDR(payVal)} berhasil dicatat & menambah Saldo Kas!`);
};

// Handlers Kas Kecil Terpisah (Gambar 2)
document.getElementById('formSetPettyCashOpening')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateStr = document.getElementById('pettyOpeningDateInput')?.value || '2026-01-01';
    const amtVal = Math.max(0, Number(document.getElementById('pettyOpeningAmountInput')?.value) || 0);
    pettyCashOpening = { date: dateStr, amount: amtVal };
    saveFinanceState();
    renderAllFinanceModules();
    alert(`Saldo Awal Kas Kecil sebesar ${formatIDR(amtVal)} berhasil disimpan!`);
});

window.resetPettyCashOpeningToZero = function () {
    pettyCashOpening = { date: '2026-01-01', amount: 0 };
    const pInput = document.getElementById('pettyOpeningAmountInput');
    if (pInput) pInput.value = 0;
    saveFinanceState();
    renderAllFinanceModules();
    alert('Saldo Awal Kas Kecil berhasil di-reset menjadi Rp 0!');
};

document.getElementById('expTypeSelect')?.addEventListener('change', (e) => {
    const accSel = document.getElementById('expAccountSelect');
    if (!accSel) return;
    if (e.target.value === 'PEMASUKAN') {
        accSel.value = 'TOPUP';
    } else if (accSel.value === 'TOPUP') {
        accSel.value = '6111';
    }
});

document.getElementById('formAddExpense')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('expDateInput').value || todayISO;
    const refNo = document.getElementById('expRefInput').value.trim();
    const type = document.getElementById('expTypeSelect')?.value || 'PENGELUARAN';
    const accountCode = document.getElementById('expAccountSelect').value;
    const outletId = Number(document.getElementById('expBranchSelect').value) || 0;
    const amount = Number(document.getElementById('expAmountInput').value) || 0;
    const description = document.getElementById('expDescInput').value.trim();
    if (!refNo || amount <= 0 || !description) {
        alert('Pastikan No. Bukti Kas Kecil, Nominal > 0, dan Keterangan diisi!');
        return;
    }
    pettyCashTrx.push({
        id: 'PC-' + Date.now(),
        date,
        refNo,
        type,
        accountCode: type === 'PEMASUKAN' ? 'TOPUP' : accountCode,
        outletId,
        amount,
        description
    });
    saveFinanceState();
    renderAllFinanceModules();
    document.getElementById('expRefInput').value = '';
    document.getElementById('expAmountInput').value = '';
    document.getElementById('expDescInput').value = '';
    alert(`Transaksi ${type === 'PEMASUKAN' ? 'Pemasukan' : 'Pengeluaran'} Kas Kecil berhasil disimpan!`);
});

window.deletePettyCashItem = function (id) {
    if (!confirm('Hapus transaksi Kas Kecil ini?')) return;
    pettyCashTrx = pettyCashTrx.filter(x => x.id !== id);
    saveFinanceState();
    renderAllFinanceModules();
};

document.getElementById('formAddPayable')?.addEventListener('submit', () => {
    const date = document.getElementById('apDateInput').value || todayISO;
    const refNo = document.getElementById('apRefInput').value.trim();
    const vendor = document.getElementById('apVendorInput').value.trim();
    const dueDate = document.getElementById('apDueInput').value;
    const amount = Number(document.getElementById('apAmountInput').value) || 0;
    const description = document.getElementById('apDescInput').value.trim();
    finPayables.push({ id: 'AP-' + Date.now(), date, refNo, vendor, dueDate, outletId: 1, amount, paidAmount: 0, description });
    saveFinanceState();
    renderAllFinanceModules();
    document.getElementById('apRefInput').value = '';
    document.getElementById('apVendorInput').value = '';
    document.getElementById('apAmountInput').value = '';
    document.getElementById('apDescInput').value = '';
    alert('Utang Usaha berhasil dicatat & terintegrasi ke Neraca!');
});

window.payAccountsPayable = function (apId) {
    const item = finPayables.find(a => a.id === apId);
    if (!item) return;
    const rem = (Number(item.amount) || 0) - (Number(item.paidAmount) || 0);
    const input = prompt(`Sisa Utang ke ${item.vendor}: ${formatIDR(rem)}\nMasukkan nominal pembayaran pelunasan (Rp):`, rem);
    if (input === null) return;
    const payVal = Number(input);
    if (isNaN(payVal) || payVal <= 0 || payVal > rem) {
        alert('Nominal pembayaran tidak valid atau melebihi sisa utang!');
        return;
    }
    item.paidAmount = (Number(item.paidAmount) || 0) + payVal;
    saveFinanceState();
    renderAllFinanceModules();
    alert(`Pembayaran utang sebesar ${formatIDR(payVal)} berhasil dicatat!`);
};

document.getElementById('formAddAdjustment')?.addEventListener('submit', () => {
    const date = document.getElementById('adjDateInput').value || todayISO;
    const refNo = document.getElementById('adjRefInput').value.trim();
    const outletId = Number(document.getElementById('adjBranchSelect').value) || 0;
    const debitCode = document.getElementById('adjDebitAccSelect').value;
    const creditCode = document.getElementById('adjCreditAccSelect').value;
    const amount = Number(document.getElementById('adjAmountInput').value) || 0;
    const description = document.getElementById('adjDescInput').value.trim();
    if (!refNo || amount <= 0 || debitCode === creditCode) {
        alert('Pastikan No. Bukti AJP diisi, Nominal > 0, dan Akun Debit tidak sama dengan Akun Kredit!');
        return;
    }
    finAdjustments.push({
        id: 'AJP-' + Date.now(),
        date, refNo, outletId, debitCode, creditCode, amount, description
    });
    saveFinanceState();
    renderAllFinanceModules();
    document.getElementById('adjRefInput').value = '';
    document.getElementById('adjAmountInput').value = '';
    document.getElementById('adjDescInput').value = '';
    alert('Jurnal Penyesuaian (AJP) berhasil diposting & terintegrasi ke Buku Besar, Neraca dan Laba Rugi!');
});

window.deleteJournalItem = function (type, id) {
    if (!confirm('Hapus data transaksi akuntansi ini?')) return;
    if (type === 'MANUAL') finManualJournals = finManualJournals.filter(x => x.id !== id);
    if (type === 'SALE') finSales = finSales.filter(x => x.id !== id);
    if (type === 'RECEIVABLE') finReceivables = finReceivables.filter(x => x.id !== id);
    if (type === 'EXPENSE') finExpenses = finExpenses.filter(x => x.id !== id);
    if (type === 'PAYABLE') finPayables = finPayables.filter(x => x.id !== id);
    if (type === 'ADJUSTMENT') finAdjustments = finAdjustments.filter(x => x.id !== id);
    saveFinanceState();
    renderAllFinanceModules();
};

document.getElementById('btnExecuteClosing')?.addEventListener('click', () => {
    const sum = computeFinancialSummary();
    const pLabel = getActivePeriodLabel();
    if (!confirm(`Proses Tutup Buku untuk periode:\n${pLabel}\n\nLaba Bersih sebesar ${formatIDR(sum.netProfit)} akan dikunci ke Ikhtisar Laba Ditahan. Lanjutkan?`)) return;
    finClosings.push({
        id: 'CLS-' + Date.now(),
        closedAt: todayISO,
        refNo: `CLS.${new Date().getFullYear()}.${String(finClosings.length + 1).padStart(3, '0')}`,
        periodLabel: pLabel,
        revenue: sum.totalSalesRp,
        totalCost: sum.totalCogsRp + sum.totalExpensesRp,
        netIncome: sum.netProfit
    });
    saveFinanceState();
    renderAllFinanceModules();
    alert('Tutup Buku Periode berhasil dilaksanakan!');
});

window.deleteClosingEntry = function (id) {
    if (!confirm('Batalkan riwayat tutup buku ini?')) return;
    finClosings = finClosings.filter(c => c.id !== id);
    saveFinanceState();
    renderAllFinanceModules();
};

// ============================================================================
// NAVIGATION 1 MENU = 1 TAMPILAN
// ============================================================================
const TAB_META = {
    overview: { title: 'OVERVIEW KEUANGAN', desc: 'Ringkasan terintegrasi Kas, Persediaan Emas, Penjualan, Piutang, Kas Kecil, Utang & Neraca.' },
    jurnal: { title: 'JURNAL UMUM (GENERAL JOURNAL)', desc: 'Pencatatan kronologis Debit & Kredit seluruh transaksi Kasir, Penjualan, Piutang, Utang & Penyesuaian.' },
    bukubesar: { title: 'BUKU BESAR (GENERAL LEDGER)', desc: 'Rincian mutasi Debit, Kredit, dan Saldo Berjalan per Akun COA.' },
    inventaris: { title: 'INVENTORY / INVENTARIS & MODAL AWAL KAS', desc: 'Pengaturan Setoran Modal Awal Kas, Daftar Inventaris Peralatan Cabang (1201) & Stok Fisik Emas (1102).' },
    penjualan: { title: 'PENJUALAN & PELEBURAN EMAS', desc: 'Pencatatan penjualan emas ke buyer/pabrik beserta perhitungan HPP dan Margin Laba.' },
    piutang: { title: 'PIUTANG USAHA (ACCOUNTS RECEIVABLE)', desc: 'Manajemen tagihan piutang usaha buyer/mitra, jatuh tempo, dan penerimaan pelunasan.' },
    biaya: { title: 'KAS KECIL TERPISAH (PETTY CASH)', desc: 'Pencatatan terpisah Saldo Awal, Pemasukan, dan Pengeluaran Biaya Kebutuhan Harian.' },
    utang: { title: 'UTANG USAHA (ACCOUNTS PAYABLE)', desc: 'Manajemen kewajiban utang usaha, jatuh tempo, dan pencatatan pelunasan.' },
    aruskas: { title: 'LAPORAN ARUS KAS (CASH FLOW)', desc: 'Aliran kas masuk dan keluar dari aktivitas operasional dan pendanaan.' },
    neraca: { title: 'NERACA & LABA RUGI', desc: 'Laporan Posisi Keuangan (Aktiva = Pasiva) dan Laporan Laba Rugi Komprehensif.' },
    penyesuaian: { title: 'JURNAL PENYESUAIAN (ADJUSTING JOURNAL)', desc: 'Pencatatan ayat jurnal penyesuaian (AJP) akhir periode yang terintegrasi ke Buku Besar, Neraca & Laba Rugi.' },
    tutupbuku: { title: 'TUTUP BUKU PERIODE (CLOSING)', desc: 'Penguncian laba rugi periode berjalan ke akun Laba Ditahan (Retained Earnings).' }
};

function updateExportScopeDropdownForTab(tabKey) {
    const expSelect = document.getElementById('finExportTypeSelect');
    if (!expSelect) return;
    if (tabKey === 'neraca') {
        const prev = expSelect.value;
        expSelect.innerHTML = `
            <option value="NERACA_LABARUGI">1. Laporan Neraca &amp; Laba Rugi</option>
            <option value="NERACA_ONLY">2. Laporan Neraca</option>
            <option value="LABARUGI_ONLY">3. Laporan Laba Rugi</option>
        `;
        if (['NERACA_LABARUGI', 'NERACA_ONLY', 'LABARUGI_ONLY'].includes(prev)) {
            expSelect.value = prev;
        } else {
            expSelect.value = 'NERACA_LABARUGI';
        }
    } else {
        expSelect.innerHTML = `<option value="ACTIVE_TAB" selected>Laporan Menu Aktif Saat Ini</option>`;
        expSelect.value = 'ACTIVE_TAB';
    }
}

window.switchFinTab = function (tabKey) {
    activeFinTab = tabKey;
    document.querySelectorAll('.fin-tab-panel').forEach(el => el.classList.add('hidden'));
    const targetPanel = document.getElementById(`finTab_${tabKey}`);
    if (targetPanel) targetPanel.classList.remove('hidden');

    document.querySelectorAll('.fin-nav-btn').forEach(btn => {
        const isMatch = btn.getAttribute('data-fintab') === tabKey;
        btn.className = `fin-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition ${isMatch ? 'sidebar-link-active' : 'sidebar-link-inactive'}`;
    });

    const meta = TAB_META[tabKey] || TAB_META.overview;
    document.getElementById('finActiveMenuTitle').textContent = meta.title;
    document.getElementById('finActiveMenuDesc').textContent = meta.desc;
    updateExportScopeDropdownForTab(tabKey);
    renderAllFinanceModules();
};

document.querySelectorAll('.fin-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchFinTab(btn.getAttribute('data-fintab')));
});

// Login Handler (User ID + Password / PIN yang diatur oleh Admin)
document.getElementById('finSubmitLoginBtn')?.addEventListener('click', () => {
    const username = (document.getElementById('finLoginUsernameInput')?.value || '').trim().toLowerCase();
    const pin = (document.getElementById('finLoginPinInput')?.value || '').trim();
    const errEl = document.getElementById('finLoginErrorMsg');

    if (!username || !pin) {
        if (errEl) {
            errEl.textContent = 'Silakan masukkan User ID dan PIN / Password terlebih dahulu!';
            errEl.classList.remove('hidden');
        }
        return;
    }

    const storedFinUsers = JSON.parse(localStorage.getItem('jantung_emas_finance_users')) || [];
    const matchedFinUser = storedFinUsers.find(u =>
        String(u.username || '').trim().toLowerCase() === username &&
        String(u.pin || '').trim() === pin
    );

    const isDefaultFinanceAdmin = (
        (username === 'keuangan' || username === 'fin_pusat' || username === 'superadmin' || username === 'admin') &&
        (pin === '1234' || pin === '190212Aja')
    );

    if (matchedFinUser || isDefaultFinanceAdmin) {
        if (matchedFinUser && String(matchedFinUser.scope || '').startsWith('FIN_BRANCH_')) {
            lockedFinanceBranchId = parseInt(String(matchedFinUser.scope).split('_')[2]) || null;
        } else {
            lockedFinanceBranchId = null;
        }
        populateFinanceBranchDropdowns();
        if (!lockedFinanceBranchId && finBranchScopeSelect) {
            finBranchScopeSelect.value = 'ALL';
        }
        if (errEl) errEl.classList.add('hidden');
        document.getElementById('financeLoginSection').classList.add('hidden');
        document.getElementById('financeDashboardSection').classList.remove('hidden');
        renderAllFinanceModules();
    } else {
        if (errEl) {
            errEl.textContent = 'User ID atau PIN / Password salah! Silakan hubungi Superadmin.';
            errEl.classList.remove('hidden');
        }
    }
});

// ============================================================================
// EXPORT LAPORAN SESUAI MENU AKTIF SAAT INI (GAMBAR 2 & GAMBAR 3)
// Mulai dari Jurnal Umum sampai Tutup Buku Periode hanya mengunduh isi menu itu sendiri
// ============================================================================
function generateFullFinancialReportHTML() {
    const sum = computeFinancialSummary();
    const pettySum = computePettyCashSummary();
    const periodLabel = getActivePeriodLabel();
    let reportTitle = TAB_META[activeFinTab]?.title || 'LAPORAN KEUANGAN';

    let bodySectionHtml = '';

    if (activeFinTab === 'biaya') {
        // GAMBAR 2: Laporan Kas Kecil Terpisah Saja
        const pettyRowsHtml = pettySum.rows.map((tx, idx) => {
            const isIn = tx.type === 'PEMASUKAN';
            const accLabel = tx.accountCode === 'TOPUP'
                ? 'Pengisian / Top-Up Kas Kecil'
                : `${getAccountMeta(tx.accountCode).code} - ${getAccountMeta(tx.accountCode).name}`;
            return `
                <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>${tx.date}</td>
                    <td><strong>${tx.refNo}</strong></td>
                    <td>${isIn ? 'PEMASUKAN' : 'PENGELUARAN'}</td>
                    <td>${accLabel}</td>
                    <td>${getBranchNameById(tx.outletId)}</td>
                    <td>${tx.description}</td>
                    <td style="text-align:right;color:#047857;font-weight:bold;">${tx.inAmount > 0 ? formatIDR(tx.inAmount) : '-'}</td>
                    <td style="text-align:right;color:#e11d48;font-weight:bold;">${tx.outAmount > 0 ? formatIDR(tx.outAmount) : '-'}</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(tx.runningBalance)}</td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="10" style="text-align:center;padding:12px;">Belum ada transaksi kas kecil pada periode ini.</td></tr>`;

        bodySectionHtml = `
            <table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:12px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th style="width:50%;text-align:left;">SALDO KAS KECIL AKTIF</th>
                        <th style="width:50%;text-align:left;">TOTAL PENGELUARAN KAS KECIL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-size:16px;font-weight:bold;color:#1d4ed8;">
                            ${formatIDR(pettySum.endingBalance)}
                            <div style="font-size:11px;font-weight:normal;color:#475569;margin-top:4px;">Saldo Awal: ${formatIDR(pettySum.openingAmt)} | Total Pemasukan: ${formatIDR(pettySum.totalIn)}</div>
                        </td>
                        <td style="font-size:16px;font-weight:bold;color:#e11d48;">
                            ${formatIDR(pettySum.totalOut)}
                            <div style="font-size:11px;font-weight:normal;color:#475569;margin-top:4px;">Total Pengeluaran Biaya Kebutuhan Harian</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3>DAFTAR MUTASI PEMASUKAN &amp; PENGELUARAN KAS KECIL</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Bukti</th>
                        <th>Jenis</th>
                        <th>Kategori / Akun</th>
                        <th>Cabang</th>
                        <th>Keterangan Kebutuhan Harian</th>
                        <th style="text-align:right;">Pemasukan (Rp)</th>
                        <th style="text-align:right;">Pengeluaran (Rp)</th>
                        <th style="text-align:right;">Saldo Kas Kecil (Rp)</th>
                    </tr>
                </thead>
                <tbody>${pettyRowsHtml}</tbody>
            </table>
        `;
    } else if (activeFinTab === 'neraca') {
        // Opsi Cakupan Export pada Menu Neraca & Laba Rugi:
        // 1. NERACA_LABARUGI (Digabung), 2. NERACA_ONLY (Neraca Saja), 3. LABARUGI_ONLY (Laba Rugi Saja)
        const neracaExportScope = document.getElementById('finExportTypeSelect')?.value || 'NERACA_LABARUGI';

        const opExpRows = OP_EXPENSE_CODES.map(code => {
            const b = sum.balances[code];
            return `<tr><td>${b.code} - ${b.name}</td><td style="text-align:right;">${formatIDR(b.balance)}</td></tr>`;
        }).join('');
        const socialExpRows = SOCIAL_EXPENSE_CODES.map(code => {
            const b = sum.balances[code];
            return `<tr><td>${b.code} - ${b.name}</td><td style="text-align:right;">${formatIDR(b.balance)}</td></tr>`;
        }).join('');

        const neracaSectionHtml = `
            <h3 style="margin-top:0;">NERACA KEUANGAN (BALANCE SHEET)</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:11px;">
                <thead style="background:#1e3a8a;color:#ffffff;">
                    <tr><th colspan="2" style="text-align:left;">AKTIVA (ASET PERUSAHAAN)</th></tr>
                </thead>
                <tbody>
                    <tr><td>1101 - Kas &amp; Bank Perusahaan</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.cashBalance)}</td></tr>
                    <tr><td>1102 - Persediaan Emas (${sum.stockGram} Gram)</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.invBalance)}</td></tr>
                    <tr><td>1103 - Piutang Usaha Buyer</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.arBalance)}</td></tr>
                    <tr><td>1201 - Peralatan, Timbangan &amp; Inventaris</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.fixedAssetBalance)}</td></tr>
                    <tr style="background:#eff6ff;font-weight:bold;color:#1d4ed8;">
                        <td>TOTAL AKTIVA</td>
                        <td style="text-align:right;">${formatIDR(sum.totalAssets)}</td>
                    </tr>
                </tbody>
            </table>

            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#065f46;color:#ffffff;">
                    <tr><th colspan="2" style="text-align:left;">PASIVA (KEWAJIBAN &amp; EKUITAS)</th></tr>
                </thead>
                <tbody>
                    <tr><td>2101 - Utang Usaha &amp; Kewajiban</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.totalLiabilities)}</td></tr>
                    <tr><td>3101 - Modal Disetor Perusahaan</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.paidInCapital)}</td></tr>
                    <tr><td>3102 - Laba Ditahan &amp; Laba Periode Berjalan</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.retainedEarnings)}</td></tr>
                    <tr style="background:#ecfdf5;font-weight:bold;color:#047857;">
                        <td>TOTAL PASIVA</td>
                        <td style="text-align:right;">${formatIDR(sum.totalPasiva)}</td>
                    </tr>
                </tbody>
            </table>
        `;

        const labaRugiSectionHtml = `
            <h3 style="margin-top:0;">LAPORAN LABA RUGI (INCOME STATEMENT)</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr><th colspan="2" style="text-align:left;">PENDAPATAN &amp; HPP EMAS</th></tr>
                </thead>
                <tbody>
                    <tr><td>4101 - Penjualan Emas / Peleburan (${sum.soldGram}g)</td><td style="text-align:right;font-weight:bold;color:#047857;">${formatIDR(sum.totalSalesRp)}</td></tr>
                    <tr><td>5101 - Harga Pokok Penjualan (HPP) Emas</td><td style="text-align:right;font-weight:bold;color:#e11d48;">(${formatIDR(sum.totalCogsRp)})</td></tr>
                    <tr style="background:#f8fafc;font-weight:bold;">
                        <td>LABA KOTOR PENJUALAN</td>
                        <td style="text-align:right;color:#047857;">${formatIDR(sum.grossProfit)}</td>
                    </tr>
                </tbody>
            </table>

            <table border="1" cellpadding="5" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr><th colspan="2" style="text-align:left;">61XX - BEBAN OPERASIONAL &amp; 71XX - BEBAN SOSIAL</th></tr>
                </thead>
                <tbody>
                    ${opExpRows}
                    <tr style="background:#fff1f2;font-weight:bold;color:#be123c;">
                        <td>Subtotal Beban Operasional (6101-6119)</td>
                        <td style="text-align:right;">${formatIDR(sum.totalOpExpensesRp)}</td>
                    </tr>
                    ${socialExpRows}
                    <tr style="background:#faf5ff;font-weight:bold;color:#7e22ce;">
                        <td>Subtotal Beban Sosial &amp; Program JEI (7101-7106)</td>
                        <td style="text-align:right;">${formatIDR(sum.totalSocialExpensesRp)}</td>
                    </tr>
                    <tr style="background:#ecfdf5;font-weight:bold;font-size:12px;color:#047857;">
                        <td>LABA BERSIH (NET INCOME)</td>
                        <td style="text-align:right;">${formatIDR(sum.netProfit)}</td>
                    </tr>
                </tbody>
            </table>
        `;

        if (neracaExportScope === 'NERACA_ONLY') {
            reportTitle = 'LAPORAN NERACA KEUANGAN (BALANCE SHEET)';
            bodySectionHtml = neracaSectionHtml;
        } else if (neracaExportScope === 'LABARUGI_ONLY') {
            reportTitle = 'LAPORAN LABA RUGI (INCOME STATEMENT)';
            bodySectionHtml = labaRugiSectionHtml;
        } else {
            reportTitle = 'LAPORAN NERACA & LABA RUGI (DIGABUNG)';
            bodySectionHtml = `
                <table border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
                    <tr>
                        <td style="width:49%;vertical-align:top;padding-right:10px;">
                            ${neracaSectionHtml}
                        </td>
                        <td style="width:51%;vertical-align:top;padding-left:10px;">
                            ${labaRugiSectionHtml}
                        </td>
                    </tr>
                </table>
            `;
        }
    } else if (activeFinTab === 'jurnal') {
        let totalD = 0;
        const journalRows = sum.entries.map((e, idx) => {
            totalD += Number(e.amount) || 0;
            return `
                <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>${e.date}</td>
                    <td><strong>${e.refNo}</strong></td>
                    <td>${e.source}</td>
                    <td>${e.description}</td>
                    <td>${e.debitCode} - ${getAccountMeta(e.debitCode).name}</td>
                    <td>${e.creditCode} - ${getAccountMeta(e.creditCode).name}</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(e.amount)}</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(e.amount)}</td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="9" style="text-align:center;padding:12px;">Belum ada transaksi jurnal umum pada periode ini.</td></tr>`;

        bodySectionHtml = `
            <h3>DAFTAR TRANSAKSI JURNAL UMUM (DOUBLE-ENTRY)</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Referensi</th>
                        <th>Sumber Modul</th>
                        <th>Uraian Transaksi</th>
                        <th>Akun Debit</th>
                        <th>Akun Kredit</th>
                        <th style="text-align:right;">Debit (Rp)</th>
                        <th style="text-align:right;">Kredit (Rp)</th>
                    </tr>
                </thead>
                <tbody>
                    ${journalRows}
                    <tr style="background:#ecfdf5;font-weight:bold;">
                        <td colspan="7" style="text-align:right;">TOTAL DEBIT &amp; KREDIT</td>
                        <td style="text-align:right;">${formatIDR(totalD)}</td>
                        <td style="text-align:right;">${formatIDR(totalD)}</td>
                    </tr>
                </tbody>
            </table>
        `;
    } else if (activeFinTab === 'bukubesar') {
        const selectedAccCode = document.getElementById('ledgerAccountSelect')?.value || '1101';
        const accMeta = getAccountMeta(selectedAccCode);
        let runBal = 0;
        let mutDebit = 0;
        let mutCredit = 0;
        const ledgerRows = [];
        sum.entries.forEach((e, idx) => {
            if (e.debitCode !== selectedAccCode && e.creditCode !== selectedAccCode) return;
            const dVal = e.debitCode === selectedAccCode ? e.amount : 0;
            const cVal = e.creditCode === selectedAccCode ? e.amount : 0;
            mutDebit += dVal;
            mutCredit += cVal;
            runBal += accMeta.normal === 'DEBIT' ? (dVal - cVal) : (cVal - dVal);
            ledgerRows.push(`
                <tr>
                    <td>${e.date}</td>
                    <td><strong>${e.refNo}</strong></td>
                    <td>${e.description} (${e.source})</td>
                    <td style="text-align:right;">${dVal > 0 ? formatIDR(dVal) : '-'}</td>
                    <td style="text-align:right;">${cVal > 0 ? formatIDR(cVal) : '-'}</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(runBal)}</td>
                </tr>
            `);
        });

        bodySectionHtml = `
            <h3>BUKU BESAR AKUN: ${accMeta.code} - ${accMeta.name} (SALDO NORMAL: ${accMeta.normal})</h3>
            <p style="font-size:12px;margin:4px 0 10px;">
                <strong>Total Mutasi Debit:</strong> ${formatIDR(mutDebit)} |
                <strong>Total Mutasi Kredit:</strong> ${formatIDR(mutCredit)} |
                <strong>Saldo Akhir Akun:</strong> ${formatIDR(runBal)}
            </p>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>Tanggal</th>
                        <th>No. Referensi</th>
                        <th>Keterangan Transaksi</th>
                        <th style="text-align:right;">Mutasi Debit (Rp)</th>
                        <th style="text-align:right;">Mutasi Kredit (Rp)</th>
                        <th style="text-align:right;">Saldo Berjalan (Rp)</th>
                    </tr>
                </thead>
                <tbody>${ledgerRows.join('') || `<tr><td colspan="6" style="text-align:center;padding:12px;">Belum ada mutasi pada akun ini.</td></tr>`}</tbody>
            </table>
        `;
    } else if (activeFinTab === 'inventaris') {
        const currentModalEntry = getCurrentOpeningCashCapitalEntry();
        const currentModalAmt = currentModalEntry ? (Number(currentModalEntry.amount) || 0) : 0;
        const assetEntries = finManualJournals.filter(mj =>
            (mj.debitCode === '1201' || mj.creditCode === '1201') &&
            isDateMatchFilter(parseAnyDateToISO(mj.date), true) &&
            isBranchMatchFilter(mj.outletId)
        );
        const assetRows = assetEntries.map((ast, idx) => `
            <tr>
                <td style="text-align:center;">${idx + 1}</td>
                <td>${ast.date}</td>
                <td><strong>${ast.refNo}</strong></td>
                <td>${ast.description}</td>
                <td>${getBranchNameById(ast.outletId)}</td>
                <td style="text-align:center;">${ast.qty || 1} Unit</td>
                <td>${ast.creditCode} - ${getAccountMeta(ast.creditCode).name}</td>
                <td style="text-align:right;font-weight:bold;">${formatIDR(ast.amount)}</td>
            </tr>
        `).join('') || `<tr><td colspan="8" style="text-align:center;padding:10px;">Belum ada data inventaris peralatan cabang.</td></tr>`;

        const goldMutations = sum.entries.filter(e => e.debitCode === '1102' || e.creditCode === '1102');
        const goldRows = goldMutations.map((gm, idx) => {
            const isIn = gm.debitCode === '1102';
            return `
                <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>${gm.date}</td>
                    <td><strong>${gm.refNo}</strong></td>
                    <td>${isIn ? 'EMAS MASUK (BELI)' : 'EMAS KELUAR (JUAL)'}</td>
                    <td>${gm.description}</td>
                    <td style="text-align:right;">${gm.gram ? `${isIn ? '+' : '-'}${gm.gram}g` : '-'}</td>
                    <td style="text-align:right;font-weight:bold;">${isIn ? '+' : '-'}${formatIDR(gm.amount)}</td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="7" style="text-align:center;padding:10px;">Belum ada mutasi stok emas pada periode ini.</td></tr>`;

        bodySectionHtml = `
            <h3>1. SETORAN MODAL AWAL KAS PERUSAHAAN (AKUN 1101 &amp; 3101): ${formatIDR(currentModalAmt)}</h3>
            <h3>2. DAFTAR INVENTARIS &amp; PERALATAN CABANG (AKUN 1201) — TOTAL: ${formatIDR(sum.fixedAssetBalance)}</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Kode</th>
                        <th>Nama Barang / Inventaris</th>
                        <th>Cabang</th>
                        <th>Qty</th>
                        <th>Sumber Perolehan</th>
                        <th style="text-align:right;">Nilai Inventaris (Rp)</th>
                    </tr>
                </thead>
                <tbody>${assetRows}</tbody>
            </table>

            <h3>3. INVENTORY PERSEDIAAN STOK EMAS (AKUN 1102) — STOK BERSIH: ${sum.stockGram} GRAM (${formatIDR(sum.invBalance)})</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Nota / Invoice</th>
                        <th>Tipe Mutasi</th>
                        <th>Rincian Material / Buyer &amp; Cabang</th>
                        <th style="text-align:right;">Berat (Gram)</th>
                        <th style="text-align:right;">Nilai Persediaan / HPP (Rp)</th>
                    </tr>
                </thead>
                <tbody>${goldRows}</tbody>
            </table>
        `;
    } else if (activeFinTab === 'penjualan') {
        const filteredSales = finSales.filter(s => isDateMatchFilter(parseAnyDateToISO(s.date)) && isBranchMatchFilter(s.outletId));
        const salesRows = filteredSales.map((s, idx) => {
            const margin = (Number(s.totalSale) || 0) - (Number(s.cogs) || 0);
            return `
                <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>${s.date}</td>
                    <td><strong>${s.invoiceNo}</strong></td>
                    <td>${s.buyer}</td>
                    <td>${getBranchNameById(s.outletId)}</td>
                    <td style="text-align:right;">${s.weight} Gram</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(s.totalSale)}</td>
                    <td style="text-align:right;">${formatIDR(s.cogs)}</td>
                    <td style="text-align:right;font-weight:bold;color:#047857;">${formatIDR(margin)}</td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="9" style="text-align:center;padding:12px;">Belum ada data penjualan emas pada periode ini.</td></tr>`;

        bodySectionHtml = `
            <h3>RIWAYAT PENJUALAN &amp; PELEBURAN EMAS</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Invoice</th>
                        <th>Buyer / Tujuan</th>
                        <th>Cabang</th>
                        <th style="text-align:right;">Berat (Gram)</th>
                        <th style="text-align:right;">Nilai Penjualan (Rp)</th>
                        <th style="text-align:right;">HPP Emas (Rp)</th>
                        <th style="text-align:right;">Margin Laba (Rp)</th>
                    </tr>
                </thead>
                <tbody>${salesRows}</tbody>
            </table>
        `;
    } else if (activeFinTab === 'piutang') {
        const filteredAr = finReceivables.filter(ar => isDateMatchFilter(parseAnyDateToISO(ar.date), true) && isBranchMatchFilter(ar.outletId));
        const arRows = filteredAr.map((ar, idx) => {
            const amt = Number(ar.amount) || 0;
            const paid = Number(ar.paidAmount) || 0;
            const rem = Math.max(0, amt - paid);
            return `
                <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>${ar.date}</td>
                    <td><strong>${ar.refNo}</strong></td>
                    <td>${ar.debtor}</td>
                    <td>${getBranchNameById(ar.outletId)}</td>
                    <td>${ar.description} (Jatuh Tempo: ${ar.dueDate || '-'})</td>
                    <td style="text-align:right;">${formatIDR(amt)}</td>
                    <td style="text-align:right;">${formatIDR(paid)}</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(rem)}</td>
                    <td style="text-align:center;">${rem === 0 ? 'LUNAS' : 'BELUM LUNAS'}</td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="10" style="text-align:center;padding:12px;">Belum ada catatan piutang usaha pada periode ini.</td></tr>`;

        bodySectionHtml = `
            <h3>DAFTAR PIUTANG USAHA &amp; STATUS PENERIMAAN PELUNASAN (AKUN 1103)</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Faktur</th>
                        <th>Debitur / Buyer</th>
                        <th>Cabang</th>
                        <th>Keterangan &amp; Jatuh Tempo</th>
                        <th style="text-align:right;">Total Piutang (Rp)</th>
                        <th style="text-align:right;">Sudah Diterima (Rp)</th>
                        <th style="text-align:right;">Sisa Piutang (Rp)</th>
                        <th style="text-align:center;">Status</th>
                    </tr>
                </thead>
                <tbody>${arRows}</tbody>
            </table>
        `;
    } else if (activeFinTab === 'utang') {
        const filteredAp = finPayables.filter(ap => isDateMatchFilter(parseAnyDateToISO(ap.date), true) && isBranchMatchFilter(ap.outletId));
        const apRows = filteredAp.map((ap, idx) => {
            const amt = Number(ap.amount) || 0;
            const paid = Number(ap.paidAmount) || 0;
            const rem = Math.max(0, amt - paid);
            return `
                <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>${ap.date}</td>
                    <td><strong>${ap.refNo}</strong></td>
                    <td>${ap.vendor}</td>
                    <td>${ap.description} (Jatuh Tempo: ${ap.dueDate || '-'})</td>
                    <td style="text-align:right;">${formatIDR(amt)}</td>
                    <td style="text-align:right;">${formatIDR(paid)}</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(rem)}</td>
                    <td style="text-align:center;">${rem === 0 ? 'LUNAS' : 'BELUM LUNAS'}</td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="9" style="text-align:center;padding:12px;">Belum ada catatan utang usaha pada periode ini.</td></tr>`;

        bodySectionHtml = `
            <h3>DAFTAR UTANG USAHA &amp; STATUS PELUNASAN (AKUN 2101)</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Faktur</th>
                        <th>Kreditur / Supplier</th>
                        <th>Keterangan &amp; Jatuh Tempo</th>
                        <th style="text-align:right;">Total Utang (Rp)</th>
                        <th style="text-align:right;">Sudah Dibayar (Rp)</th>
                        <th style="text-align:right;">Sisa Utang (Rp)</th>
                        <th style="text-align:center;">Status</th>
                    </tr>
                </thead>
                <tbody>${apRows}</tbody>
            </table>
        `;
    } else if (activeFinTab === 'aruskas') {
        const opCashIn = sum.totalSalesRp;
        const opCashOutGold = sum.purchasedRp;
        const opCashOutExp = sum.totalExpensesRp;
        const netOperatingCf = opCashIn - opCashOutGold - opCashOutExp;
        const finCashInModal = sum.entries
            .filter(e => e.debitCode === '1101' && e.creditCode === '3101')
            .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
        const finCashInDebt = sum.apTotal;
        const finCashOutDebt = sum.apPaid;
        const netFinancingCf = finCashInModal + finCashInDebt - finCashOutDebt;

        bodySectionHtml = `
            <h3>LAPORAN ARUS KAS (STATEMENT OF CASH FLOWS) — METODE LANGSUNG</h3>
            <table border="1" cellpadding="7" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr><th colspan="2" style="text-align:left;">A. ARUS KAS DARI AKTIVITAS OPERASIONAL</th></tr>
                </thead>
                <tbody>
                    <tr><td>Penerimaan Kas dari Penjualan / Peleburan Emas</td><td style="text-align:right;font-weight:bold;color:#047857;">${formatIDR(opCashIn)}</td></tr>
                    <tr><td>Pengeluaran Kas Pembelian Emas Customer (Nota Kasir)</td><td style="text-align:right;font-weight:bold;color:#e11d48;">(${formatIDR(opCashOutGold)})</td></tr>
                    <tr><td>Pembayaran Biaya Operasional Cabang &amp; Pusat</td><td style="text-align:right;font-weight:bold;color:#e11d48;">(${formatIDR(opCashOutExp)})</td></tr>
                    <tr style="background:#f8fafc;font-weight:bold;">
                        <td>Arus Kas Bersih Aktivitas Operasional</td>
                        <td style="text-align:right;">${formatIDR(netOperatingCf)}</td>
                    </tr>
                </tbody>
            </table>

            <table border="1" cellpadding="7" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr><th colspan="2" style="text-align:left;">B. ARUS KAS DARI AKTIVITAS PENDANAAN &amp; MODAL</th></tr>
                </thead>
                <tbody>
                    <tr><td>Setoran Modal Awal Kas Perusahaan</td><td style="text-align:right;font-weight:bold;color:#047857;">${formatIDR(finCashInModal)}</td></tr>
                    <tr><td>Penerimaan Fasilitas Utang Usaha / Modal Kerja</td><td style="text-align:right;font-weight:bold;color:#047857;">${formatIDR(finCashInDebt)}</td></tr>
                    <tr><td>Pembayaran / Pelunasan Utang Usaha</td><td style="text-align:right;font-weight:bold;color:#e11d48;">(${formatIDR(finCashOutDebt)})</td></tr>
                    <tr style="background:#f8fafc;font-weight:bold;">
                        <td>Arus Kas Bersih Aktivitas Pendanaan</td>
                        <td style="text-align:right;">${formatIDR(netFinancingCf)}</td>
                    </tr>
                </tbody>
            </table>

            <table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:12px;">
                <tr style="background:#0b132b;color:#ffffff;font-weight:bold;">
                    <td>POSISI SALDO KAS &amp; BANK AKHIR (AKUN 1101)</td>
                    <td style="text-align:right;color:#34d399;">${formatIDR(sum.cashBalance)}</td>
                </tr>
            </table>
        `;
    } else if (activeFinTab === 'penyesuaian') {
        const filteredAdj = finAdjustments.filter(adj => isDateMatchFilter(parseAnyDateToISO(adj.date), true) && isBranchMatchFilter(adj.outletId));
        let adjSum = 0;
        const adjRows = filteredAdj.map((adj, idx) => {
            const amt = Number(adj.amount) || 0;
            adjSum += amt;
            const dAcc = getAccountMeta(adj.debitCode);
            const cAcc = getAccountMeta(adj.creditCode);
            return `
                <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td>${adj.date}</td>
                    <td><strong>${adj.refNo}</strong></td>
                    <td>${getBranchNameById(adj.outletId)}</td>
                    <td>${adj.description}</td>
                    <td>${dAcc.code} - ${dAcc.name}</td>
                    <td>${cAcc.code} - ${cAcc.name}</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(amt)}</td>
                    <td style="text-align:right;font-weight:bold;">${formatIDR(amt)}</td>
                </tr>
            `;
        }).join('') || `<tr><td colspan="9" style="text-align:center;padding:12px;">Belum ada ayat jurnal penyesuaian pada periode ini.</td></tr>`;

        bodySectionHtml = `
            <h3>DAFTAR AYAT JURNAL PENYESUAIAN (AJP)</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No. Bukti AJP</th>
                        <th>Cabang / Unit</th>
                        <th>Uraian Penyesuaian</th>
                        <th>Akun Debit</th>
                        <th>Akun Kredit</th>
                        <th style="text-align:right;">Debit (Rp)</th>
                        <th style="text-align:right;">Kredit (Rp)</th>
                    </tr>
                </thead>
                <tbody>
                    ${adjRows}
                    <tr style="background:#f0f9ff;font-weight:bold;">
                        <td colspan="7" style="text-align:right;">TOTAL JURNAL PENYESUAIAN (${filteredAdj.length} AYAT)</td>
                        <td style="text-align:right;">${formatIDR(adjSum)}</td>
                        <td style="text-align:right;">${formatIDR(adjSum)}</td>
                    </tr>
                </tbody>
            </table>
        `;
    } else if (activeFinTab === 'tutupbuku') {
        const closeRows = finClosings.map((c, idx) => `
            <tr>
                <td style="text-align:center;">${idx + 1}</td>
                <td>${c.closedAt}</td>
                <td><strong>${c.refNo}</strong></td>
                <td>${c.periodLabel}</td>
                <td style="text-align:right;">${formatIDR(c.revenue)}</td>
                <td style="text-align:right;">${formatIDR(c.totalCost)}</td>
                <td style="text-align:right;font-weight:bold;">${formatIDR(c.netIncome)}</td>
            </tr>
        `).join('') || `<tr><td colspan="7" style="text-align:center;padding:12px;">Belum ada riwayat tutup buku periode yang dijalankan.</td></tr>`;

        bodySectionHtml = `
            <h3>RINGKASAN IKHTISAR TUTUP BUKU PERIODE BERJALAN</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>Total Pendapatan Periode</th>
                        <th>Total HPP Emas</th>
                        <th>Total Beban Operasional</th>
                        <th>Laba Bersih (Ditutup ke Ekuitas 3102)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:right;font-weight:bold;color:#047857;">${formatIDR(sum.totalSalesRp)}</td>
                        <td style="text-align:right;font-weight:bold;color:#d97706;">${formatIDR(sum.totalCogsRp)}</td>
                        <td style="text-align:right;font-weight:bold;color:#e11d48;">${formatIDR(sum.totalExpensesRp)}</td>
                        <td style="text-align:right;font-weight:bold;color:#7e22ce;">${formatIDR(sum.netProfit)}</td>
                    </tr>
                </tbody>
            </table>

            <h3>RIWAYAT JURNAL PENUTUP (CLOSING ENTRIES)</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>No</th>
                        <th>Tanggal Tutup Buku</th>
                        <th>No. Bukti Closing</th>
                        <th>Periode yang Ditutup</th>
                        <th style="text-align:right;">Pendapatan Ditutup</th>
                        <th style="text-align:right;">Total Beban &amp; HPP</th>
                        <th style="text-align:right;">Laba Bersih ke Ekuitas</th>
                    </tr>
                </thead>
                <tbody>${closeRows}</tbody>
            </table>
        `;
    } else {
        // Default: Overview Keuangan
        bodySectionHtml = `
            <h3>RINGKASAN EKSEKUTIF OVERVIEW KEUANGAN</h3>
            <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:11px;">
                <thead style="background:#0b132b;color:#ffffff;">
                    <tr>
                        <th>Komponen Keuangan</th>
                        <th style="text-align:right;">Nilai (Rp / Gram)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Saldo Kas &amp; Bank Aktif (1101)</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.cashBalance)}</td></tr>
                    <tr><td>Persediaan Emas (1102)</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.invBalance)} (${sum.stockGram} Gram)</td></tr>
                    <tr><td>Total Pembelian Emas (Nota Kasir)</td><td style="text-align:right;">${formatIDR(sum.purchasedRp)} (${sum.purchasedGram} Gram)</td></tr>
                    <tr><td>Total Penjualan / Peleburan Emas (4101)</td><td style="text-align:right;">${formatIDR(sum.totalSalesRp)} (${sum.soldGram} Gram)</td></tr>
                    <tr><td>Harga Pokok Penjualan / HPP (5101)</td><td style="text-align:right;">${formatIDR(sum.totalCogsRp)}</td></tr>
                    <tr><td>Laba Kotor Penjualan</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.grossProfit)}</td></tr>
                    <tr><td>Laba Bersih (Net Profit)</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.netProfit)}</td></tr>
                    <tr><td>Total Aktiva = Total Pasiva (Neraca)</td><td style="text-align:right;font-weight:bold;">${formatIDR(sum.totalAssets)}</td></tr>
                </tbody>
            </table>
        `;
    }

    return `
        <div style="font-family:Arial,sans-serif;color:#0f172a;">
            <h2 style="margin:0;color:#0b132b;">JANTUNG EMAS INDONESIA — ${reportTitle}</h2>
            <p style="margin:4px 0 14px;color:#475569;font-size:12px;">
                <strong>Periode Filter:</strong> ${periodLabel} | <strong>Dicetak:</strong> ${new Date().toLocaleString('id-ID')}
            </p>
            ${bodySectionHtml}
        </div>
    `;
}

document.getElementById('finDownloadExcelBtn')?.addEventListener('click', () => {
    const contentHtml = generateFullFinancialReportHTML();
    const excelDoc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"></head><body>${contentHtml}</body></html>`;
    const blob = new Blob([excelDoc], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safePeriod = getActivePeriodLabel().replace(/[^a-zA-Z0-9_-]/g, '_');
    let tabSuffix = activeFinTab.toUpperCase();
    if (activeFinTab === 'neraca') {
        const expScope = document.getElementById('finExportTypeSelect')?.value || 'NERACA_LABARUGI';
        if (expScope === 'NERACA_ONLY') tabSuffix = 'NERACA_SAJA';
        else if (expScope === 'LABARUGI_ONLY') tabSuffix = 'LABA_RUGI_SAJA';
        else tabSuffix = 'NERACA_DAN_LABA_RUGI';
    }
    a.download = `Laporan_Keuangan_JEI_${tabSuffix}_${safePeriod}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('finDownloadPdfBtn')?.addEventListener('click', () => {
    const contentHtml = generateFullFinancialReportHTML();
    const printWin = window.open('', '_blank', 'width=1100,height=800');
    if (!printWin) {
        alert('Silakan izinkan pop-up browser untuk mencetak / menyimpan PDF.');
        return;
    }
    printWin.document.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <title>Laporan Keuangan JEI - ${getActivePeriodLabel()}</title>
            <style>
                body { margin: 20px; font-family: Arial, sans-serif; }
                h3 { margin: 18px 0 6px; font-size: 13px; color: #0b132b; text-transform: uppercase; }
                @media print { @page { size: A4 landscape; margin: 10mm; } }
            </style>
        </head>
        <body>
            ${contentHtml}
            <script>window.onload = function() { setTimeout(function() { window.print(); }, 300); };<\/script>
        </body>
        </html>
    `);
    printWin.document.close();
});

// Sinkronisasi Real-Time antar Tab (Superadmin, Admin Cabang, Keuangan & Kasir)
window.addEventListener('storage', (e) => {
    if (!e.key || e.key.startsWith('jantung_emas_')) {
        finSales = localStorage.getItem('jantung_emas_fin_sales') !== null
            ? JSON.parse(localStorage.getItem('jantung_emas_fin_sales'))
            : DEFAULT_SALES;
        finReceivables = JSON.parse(localStorage.getItem('jantung_emas_fin_receivables')) || [];
        finExpenses = localStorage.getItem('jantung_emas_fin_expenses') !== null
            ? JSON.parse(localStorage.getItem('jantung_emas_fin_expenses'))
            : [];
        finPayables = localStorage.getItem('jantung_emas_fin_payables') !== null
            ? JSON.parse(localStorage.getItem('jantung_emas_fin_payables'))
            : DEFAULT_PAYABLES;
        finManualJournals = localStorage.getItem('jantung_emas_fin_journals') !== null
            ? JSON.parse(localStorage.getItem('jantung_emas_fin_journals'))
            : DEFAULT_MANUAL_JOURNALS;
        finAdjustments = JSON.parse(localStorage.getItem('jantung_emas_fin_adjustments')) || [];
        finClosings = JSON.parse(localStorage.getItem('jantung_emas_fin_closings')) || [];
        pettyCashOpening = JSON.parse(localStorage.getItem('jantung_emas_petty_cash_opening')) || { date: '2026-01-01', amount: 0 };
        pettyCashTrx = localStorage.getItem('jantung_emas_petty_cash_trx') !== null
            ? JSON.parse(localStorage.getItem('jantung_emas_petty_cash_trx'))
            : [];
        populateFinanceBranchDropdowns();
        renderAllFinanceModules();
    }
});
