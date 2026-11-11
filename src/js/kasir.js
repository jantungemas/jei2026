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

const DEFAULT_OUTLETS = [
    {
        id: 1,
        name: 'Outlet Jakarta (Pusat & Selatan)',
        tagline: 'Store Utama Jantung Emas',
        address: 'Jl. Gajah Mada No. 88 / Mall Ambassador Area, Jakarta Pusat',
        mapUrl: 'https://maps.google.com/?q=Jakarta',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    },
    {
        id: 2,
        name: 'Outlet Tangerang & Gading Serpong',
        tagline: 'Outlet Resmi Tangerang & BSD',
        address: 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang',
        mapUrl: 'https://maps.google.com/?q=Gading+Serpong',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    },
    {
        id: 3,
        name: 'Outlet Bekasi & Depok',
        tagline: 'Outlet Resmi Bekasi & Depok',
        address: 'Ruko Summarecon Bekasi & Margonda Raya, Depok',
        mapUrl: 'https://maps.google.com/?q=Bekasi',
        whatsapp: '6282122126634',
        hours: '08.00 - 21.00 WIB'
    }
];

const DEFAULT_CASHIERS = [
    { id: 1, name: 'FAKAR', username: 'fakar', pin: '1234', outletId: 2, branchCode: 'GS' },
    { id: 2, name: 'ANDI', username: 'kasir_jkt', pin: '1234', outletId: 1, branchCode: 'JKT' },
    { id: 3, name: 'RINA', username: 'kasir_bks', pin: '1234', outletId: 3, branchCode: 'BKS' }
];

const DEFAULT_BASE = 2280000;

function getBase24k() {
    return parseInt(localStorage.getItem('jantung_emas_base_24k')) || DEFAULT_BASE;
}

function getKaratData() {
    const raw = localStorage.getItem('jantung_emas_karat_data');
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_KARAT_DATA));
}

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
    return JSON.parse(raw);
}

const MATERIAL_TYPE_OPTIONS = [
    'LM Antam Redmark',
    'LM Antam Non Redmark',
    'LM Antam Retro',
    'LM UBS',
    'LM G24',
    'LM Lainnya',
    'Perhiasan-Cincin',
    'Perhiasan-Kalung',
    'Perhiasan-Gelang',
    'Perhiasan-Anting',
    'Perhiasan-Liontin',
    'Perhiasan Lainnya'
];

function calcPricePerGram(karatName) {
    if (!karatName) return 0;
    const base = getBase24k();
    const list = getKaratData();
    const found = list.find(k => k.name === karatName);
    if (!found) return 0;
    return Math.floor((base * found.percent) / 1000) * 1000;
}

function formatDotNumber(num) {
    const n = Math.round(Number(num) || 0);
    return n.toLocaleString('id-ID');
}

function formatIDR(num) {
    return 'Rp ' + formatDotNumber(num);
}

function formatNotaDate(dateObj = new Date()) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const d = String(dateObj.getDate()).padStart(2, '0');
    const m = months[dateObj.getMonth()];
    const y = dateObj.getFullYear();
    const hh = String(dateObj.getHours()).padStart(2, '0');
    const mm = String(dateObj.getMinutes()).padStart(2, '0');
    const ss = String(dateObj.getSeconds()).padStart(2, '0');
    return `${d} ${m} ${y} ${hh}:${mm}:${ss}`;
}

function generateInvoiceNumber(branchCode = 'GS') {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const rand = String(Math.floor(100 + Math.random() * 900));
    return `JEI.${branchCode}.${y}${m}${d}${rand}`;
}

// Collapse Sidebar
const kasirSidebar = document.getElementById('kasirSidebar');
const collapseKasirSidebarBtn = document.getElementById('collapseKasirSidebarBtn');
let sidebarCollapsed = false;
collapseKasirSidebarBtn.addEventListener('click', () => {
    sidebarCollapsed = !sidebarCollapsed;
    kasirSidebar.querySelectorAll('.sidebar-text').forEach(el => {
        el.style.display = sidebarCollapsed ? 'none' : '';
    });
    kasirSidebar.style.width = sidebarCollapsed ? '88px' : '';
    document.getElementById('collapseKasirIcon').className = sidebarCollapsed ? 'fa-solid fa-angles-right mx-auto' : 'fa-solid fa-angles-left';
});

// State Aplikasi Kasir
let activeCashier = null;
let currentItems = [
    {
        material: '',
        karat: '',
        weight: '',
        unitPrice: 0
    }
];

// DOM Elements
const cashierLoginSection = document.getElementById('cashierLoginSection');
const mainWorkspace = document.getElementById('mainWorkspace');
const activeCashierNameDisplay = document.getElementById('activeCashierNameDisplay');
const activeBranchNameDisplay = document.getElementById('activeBranchNameDisplay');
const headerBranchLabel = document.getElementById('headerBranchLabel');
const availableCashiersQuickList = document.getElementById('availableCashiersQuickList');

const loginUsernameInput = document.getElementById('loginUsernameInput');
const loginPinInput = document.getElementById('loginPinInput');
const cashierLoginForm = document.getElementById('cashierLoginForm');
const cashierLoginError = document.getElementById('cashierLoginError');
const logoutCashierBtn = document.getElementById('logoutCashierBtn');

// Form Inputs
const inputInvoiceNo = document.getElementById('inputInvoiceNo');
const inputTrxDate = document.getElementById('inputTrxDate');
const inputBranchAddress = document.getElementById('inputBranchAddress');
const inputCustName = document.getElementById('inputCustName');
const inputCustKtp = document.getElementById('inputCustKtp');
const inputCustPhone = document.getElementById('inputCustPhone');
const inputCustAddress = document.getElementById('inputCustAddress');
const itemsFormContainer = document.getElementById('itemsFormContainer');
const addItemRowBtn = document.getElementById('addItemRowBtn');
const inputAdmFee = document.getElementById('inputAdmFee');
const formGrandTotalPreview = document.getElementById('formGrandTotalPreview');

const inputPaymentMethod = document.getElementById('inputPaymentMethod');
const inputBankName = document.getElementById('inputBankName');
const inputBankRek = document.getElementById('inputBankRek');
const inputBankAn = document.getElementById('inputBankAn');
const inputCashierSign = document.getElementById('inputCashierSign');
const inputExaminerSign = document.getElementById('inputExaminerSign');

// Dedicated Menu Containers (1 Menu = 1 Tampilan)
const kasirTabDashboard = document.getElementById('kasirTabDashboard');
const kasirTabInput = document.getElementById('kasirTabInput');
const notaPreviewWrapper = document.getElementById('notaPreviewWrapper');
const kasirTabHistory = document.getElementById('kasirTabHistory');
const kasirTabKarat = document.getElementById('kasirTabKarat');
const kasirActiveMenuDesc = document.getElementById('kasirActiveMenuDesc');

const sideNavDashboardBtn = document.getElementById('sideNavDashboardBtn');
const sideNavInputBtn = document.getElementById('sideNavInputBtn');
const sideNavPreviewBtn = document.getElementById('sideNavPreviewBtn');
const sideNavHistoryBtn = document.getElementById('sideNavHistoryBtn');
const sideNavKaratListBtn = document.getElementById('sideNavKaratListBtn');

function setKasirSideActive(activeBtn) {
    [sideNavDashboardBtn, sideNavInputBtn, sideNavPreviewBtn, sideNavHistoryBtn, sideNavKaratListBtn].forEach(btn => {
        if (btn) btn.className = 'w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition sidebar-link-inactive';
    });
    if (activeBtn) {
        activeBtn.className = 'w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition sidebar-link-active';
    }
}

function switchKasirSubTab(tabKey) {
    [kasirTabDashboard, kasirTabInput, notaPreviewWrapper, kasirTabHistory, kasirTabKarat].forEach(el => {
        if (el) el.classList.add('hidden');
    });

    const greetTitle = document.getElementById('kasirGreetingText');

    if (tabKey === 'dashboard') {
        kasirTabDashboard.classList.remove('hidden');
        renderQuickKaratSidebarWidget();
        setKasirSideActive(sideNavDashboardBtn);
        if (greetTitle) greetTitle.textContent = 'OVERVIEW';
        if (kasirActiveMenuDesc) kasirActiveMenuDesc.textContent = 'Ringkasan operasional kasir cabang dan status nota pembelian hari ini.';
    } else if (tabKey === 'form' || tabKey === 'payment') {
        kasirTabInput.classList.remove('hidden');
        setKasirSideActive(sideNavInputBtn);
        if (greetTitle) greetTitle.textContent = 'INPUT TRANSAKSI';
        if (kasirActiveMenuDesc) kasirActiveMenuDesc.textContent = 'Input data pelanggan & berat emas di bawah ini, harga terhitung otomatis sesuai kadar Admin.';
    } else if (tabKey === 'preview') {
        notaPreviewWrapper.classList.remove('hidden');
        updateLiveNotaPreview();
        setKasirSideActive(sideNavPreviewBtn);
        if (greetTitle) greetTitle.textContent = 'PREVIEW NOTA A4';
        if (kasirActiveMenuDesc) kasirActiveMenuDesc.textContent = 'Preview tampilan cetak Nota Pembelian A4 resmi Jantung Emas Indonesia.';
    } else if (tabKey === 'history') {
        kasirTabHistory.classList.remove('hidden');
        renderRecentTransactions();
        setKasirSideActive(sideNavHistoryBtn);
        if (greetTitle) greetTitle.textContent = 'RIWAYAT NOTA';
        if (kasirActiveMenuDesc) kasirActiveMenuDesc.textContent = 'Daftar riwayat Nota Pembelian yang telah disimpan di cabang ini.';
    } else if (tabKey === 'karat') {
        kasirTabKarat.classList.remove('hidden');
        renderKaratReferenceGrid();
        setKasirSideActive(sideNavKaratListBtn);
        if (greetTitle) greetTitle.textContent = 'TABEL 20 KADAR';
        if (kasirActiveMenuDesc) kasirActiveMenuDesc.textContent = 'Daftar harga beli emas per gram untuk 20 tingkat kadar sesuai ketetapan Admin.';
    }
}

// Sidebar Nav Bindings (Satu Menu = Satu Tampilan)
sideNavDashboardBtn.addEventListener('click', () => switchKasirSubTab('dashboard'));
sideNavInputBtn.addEventListener('click', () => switchKasirSubTab('form'));
sideNavPreviewBtn.addEventListener('click', () => switchKasirSubTab('preview'));
sideNavHistoryBtn.addEventListener('click', () => switchKasirSubTab('history'));
sideNavKaratListBtn.addEventListener('click', () => switchKasirSubTab('karat'));

function renderKaratReferenceGrid() {
    const grid = document.getElementById('kasirKaratReferenceGrid');
    if (!grid) return;
    grid.innerHTML = '';
    getKaratData().forEach(k => {
        const price = calcPricePerGram(k.name);
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between';
        div.innerHTML = `
            <span class="text-xs font-black text-[#6351f7]">${k.name}</span>
            <span class="text-xs font-extrabold text-slate-800 mt-1">${formatIDR(price)}</span>
            <span class="text-[10px] text-slate-400">per gram</span>
        `;
        grid.appendChild(div);
    });
}

function extractDateOnly(rawDateStr) {
    if (!rawDateStr) {
        const full = formatNotaDate(new Date());
        return full.split(' ').slice(0, 3).join(' ');
    }
    const parts = String(rawDateStr).trim().split(/\s+/);
    if (parts.length >= 3) {
        return `${parts[0]} ${parts[1]} ${parts[2]}`;
    }
    return rawDateStr;
}

function extractInvoiceBranchCode(invoiceNo) {
    if (!invoiceNo) return '';
    const parts = String(invoiceNo).trim().split('.');
    if (parts.length >= 3 && parts[0].toUpperCase() === 'JEI') {
        return parts[1].trim().toUpperCase();
    }
    return '';
}

function getTransactionsForActiveCashier() {
    const allTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    if (!activeCashier) return [];
    const myId = activeCashier.id != null ? String(activeCashier.id) : '';
    const myName = (activeCashier.name || '').trim().toUpperCase();
    const myBranchCode = (activeCashier.branchCode || '').trim().toUpperCase();
    const myOutletId = activeCashier.outletId != null ? String(activeCashier.outletId) : '';

    return allTrx.filter(t => {
        // 1. Jika ada cashierId pada transaksi, harus cocok dengan kasir aktif
        if (t.cashierId != null && myId && String(t.cashierId) !== myId) {
            return false;
        }
        // 2. Cek kode cabang dari nomor nota (contoh: JEI.GS vs JEI.TNCITY)
        const invCode = (t.branchCode || extractInvoiceBranchCode(t.invoiceNo)).toUpperCase();
        if (invCode && myBranchCode && invCode !== myBranchCode) {
            return false;
        }
        // 3. Cek nama kasir pada nota (contoh: FAKAR vs ANDI)
        const trxCashier = (t.cashierName || '').trim().toUpperCase();
        if (trxCashier && myName && trxCashier !== myName) {
            return false;
        }
        // 4. Cek outletId cabang jika tidak ada pencocokan kode/nama di atas
        if (!invCode && !trxCashier && t.outletId != null && myOutletId && String(t.outletId) !== myOutletId) {
            return false;
        }
        return true;
    });
}

function renderQuickKaratSidebarWidget() {
    const kpi24kPlus = document.getElementById('kpiKasir24kPlusVal');
    if (kpi24kPlus) kpi24kPlus.textContent = formatIDR(calcPricePerGram('24K+'));

    const savedTrx = getTransactionsForActiveCashier();

    // Hitung data nota aktif saat ini sebagai fallback jika belum ada nota tersimpan
    let activeWeight = 0;
    let activeTotal = 0;
    currentItems.forEach(it => {
        const w = parseFloat(it.weight) || 0;
        const p = parseFloat(it.unitPrice) || 0;
        activeWeight += w;
        activeTotal += Math.round(w * p);
    });
    const activeAdm = parseInt(inputAdmFee?.value) || 0;
    activeTotal = Math.max(0, activeTotal - activeAdm);

    const todayDateLabel = extractDateOnly(inputTrxDate?.value || formatNotaDate(new Date()));

    const dataTrx = savedTrx.length > 0 ? savedTrx : [
        {
            invoiceNo: inputInvoiceNo?.value || 'NOTA-AKTIF',
            customerName: (inputCustName?.value || 'CUSTOMER 1').toUpperCase(),
            dateStr: todayDateLabel,
            grandTotal: activeTotal,
            items: currentItems.map(it => ({
                material: it.material || 'EMAS',
                karat: it.karat || '24K+',
                weight: parseFloat(it.weight) || 0,
                unitPrice: parseFloat(it.unitPrice) || 0
            }))
        }
    ];

    // 1. Hitung Pengeluaran Perusahaan Per Tanggal, Total Gram, dan Perkembangan Transaksi berdasarkan Jumlah Customer
    let totalPengeluaran = 0;
    let totalGramAll = 0;
    const gramByKarat = {};
    const customerMap = {};
    const byDateMap = {};

    dataTrx.forEach((t, idx) => {
        const nominal = Number(t.grandTotal) || 0;
        totalPengeluaran += nominal;

        let trxGram = 0;
        (t.items || []).forEach(it => {
            const w = parseFloat(it.weight) || 0;
            trxGram += w;
            const kName = it.karat || '24K+';
            gramByKarat[kName] = (gramByKarat[kName] || 0) + w;
        });
        totalGramAll += trxGram;

        const cName = (t.customerName || `CUSTOMER #${idx + 1}`).trim().toUpperCase();
        if (!customerMap[cName]) {
            customerMap[cName] = {
                name: cName,
                trxCount: 0,
                totalGram: 0
            };
        }
        customerMap[cName].trxCount += 1;
        customerMap[cName].totalGram += trxGram;

        const dateKey = extractDateOnly(t.dateStr);
        if (!byDateMap[dateKey]) {
            byDateMap[dateKey] = {
                dateLabel: dateKey,
                totalPengeluaran: 0,
                totalGram: 0,
                trxCount: 0,
                customerSet: new Set()
            };
        }
        byDateMap[dateKey].totalPengeluaran += nominal;
        byDateMap[dateKey].totalGram += trxGram;
        byDateMap[dateKey].trxCount += 1;
        byDateMap[dateKey].customerSet.add(cName);
    });

    const dateList = Object.values(byDateMap);
    const customerList = Object.values(customerMap).sort((a, b) => b.trxCount - a.trxCount);
    const uniqueCustCount = savedTrx.length > 0 ? customerList.length : (inputCustName?.value?.trim() ? 1 : customerList.length);
    const displayTrxCount = savedTrx.length;

    // Update Kartu KPI #4 & Ringkasan Mini
    const kpiSavedSub = document.getElementById('kpiSavedCustomerSub');
    if (kpiSavedSub) {
        kpiSavedSub.textContent = `${uniqueCustCount} Customer • ${dateList.length} Tanggal Aktif`;
    }
    const miniDonutTrx = document.getElementById('miniDonutTrxCount');
    if (miniDonutTrx) miniDonutTrx.textContent = `${displayTrxCount || dataTrx.length} Nota`;
    const miniUang = document.getElementById('miniStatTotalUang');
    if (miniUang) miniUang.textContent = formatIDR(totalPengeluaran);
    const miniGram = document.getElementById('miniStatTotalGram');
    if (miniGram) miniGram.textContent = `${Number(totalGramAll.toFixed(2))} Gram`;
    const miniCust = document.getElementById('miniStatTotalCust');
    if (miniCust) miniCust.textContent = `${uniqueCustCount} Customer`;

    // 2. GRAFIK 1: PERKEMBANGAN PENGELUARAN PERUSAHAAN PER TANGGAL
    const badgePengeluaran = document.getElementById('badgeTotalPengeluaranUang');
    if (badgePengeluaran) badgePengeluaran.textContent = formatIDR(totalPengeluaran);
    const sumPengeluaran = document.getElementById('summaryTotalPengeluaranUang');
    if (sumPengeluaran) sumPengeluaran.textContent = formatIDR(totalPengeluaran);

    const moneyBarsEl = document.getElementById('chartMoneyBarsContainer');
    const moneyLabelsEl = document.getElementById('chartMoneyLabelsContainer');
    if (moneyBarsEl && moneyLabelsEl) {
        const recentDates = dateList.slice(-5);
        const maxMoney = Math.max(...recentDates.map(d => d.totalPengeluaran || 0), 1);
        const barColors = [
            'from-emerald-600 to-emerald-400',
            'from-blue-600 to-blue-400',
            'from-purple-600 to-purple-400',
            'from-orange-500 to-amber-400',
            'from-cyan-600 to-cyan-400'
        ];

        moneyBarsEl.innerHTML = `
            <div class="flex-1 grid grid-cols-${Math.max(recentDates.length, 1)} gap-2.5 items-end h-full pt-2">
                ${recentDates.map((d, i) => {
                    const val = d.totalPengeluaran || 0;
                    const hPct = Math.max(18, Math.round((val / maxMoney) * 88));
                    const color = barColors[i % barColors.length];
                    return `
                        <div class="flex flex-col items-center h-full justify-end">
                            <span class="text-[9px] font-extrabold text-slate-700 mb-1 leading-tight text-center">${formatIDR(val)}</span>
                            <div class="w-full max-w-[42px] rounded-t-lg bg-gradient-to-t ${color} shadow-sm transition-all" style="height: ${hPct}%;"></div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        moneyLabelsEl.className = `grid grid-cols-${Math.max(recentDates.length, 1)} gap-1.5 pt-2 text-center text-[10px] font-bold text-slate-600`;
        moneyLabelsEl.innerHTML = recentDates.map(d => {
            return `<span class="leading-tight">${d.dateLabel}</span>`;
        }).join('');
    }

    // 3. GRAFIK 2: JUMLAH TOTAL GRAM
    const cleanTotalGram = Number(totalGramAll.toFixed(2));
    const badgeGram = document.getElementById('badgeTotalGramAkumulasi');
    if (badgeGram) badgeGram.textContent = `${cleanTotalGram} Gram`;
    const centerGram = document.getElementById('donutCenterTotalGram');
    if (centerGram) centerGram.textContent = `${cleanTotalGram} Gr`;
    const avgGramEl = document.getElementById('summaryAvgGramPerNota');
    if (avgGramEl) {
        const avgGr = dataTrx.length > 0 ? Number((totalGramAll / dataTrx.length).toFixed(2)) : 0;
        avgGramEl.textContent = `${avgGr} Gram / Nota`;
    }

    const gramListEl = document.getElementById('chartGramBreakdownList');
    if (gramListEl) {
        const sortedKarats = Object.entries(gramByKarat).sort((a, b) => b[1] - a[1]).slice(0, 4);
        const dotColors = ['bg-[#7c3aed]', 'bg-[#10b981]', 'bg-[#2563eb]', 'bg-[#f97316]'];
        gramListEl.innerHTML = sortedKarats.map(([kName, grVal], idx) => {
            const pct = totalGramAll > 0 ? Math.round((grVal / totalGramAll) * 100) : 100;
            return `
                <div class="flex items-center justify-between gap-2 py-1 border-b border-slate-100 last:border-0">
                    <span class="flex items-center gap-1.5 font-extrabold text-slate-700">
                        <span class="w-2.5 h-2.5 rounded-full ${dotColors[idx % dotColors.length]} shrink-0"></span>
                        Kadar ${kName}
                    </span>
                    <span class="font-black text-purple-700">${Number(grVal.toFixed(2))} Gram (${pct}%)</span>
                </div>
            `;
        }).join('');
    }

    // 4. GRAFIK 3: PERKEMBANGAN TRANSAKSI BERDASARKAN JUMLAH CUSTOMER
    const badgeCust = document.getElementById('badgeCustomerTrxRatio');
    if (badgeCust) badgeCust.textContent = `${uniqueCustCount} Customer • ${dataTrx.length} Transaksi`;
    const sumCust = document.getElementById('summaryTotalUniqueCustomers');
    if (sumCust) sumCust.textContent = `${uniqueCustCount} Customer (${dataTrx.length} Transaksi)`;

    const listEl = document.getElementById('quickKaratWidgetList');
    if (listEl) {
        const maxDateTrx = Math.max(...dateList.map(d => d.trxCount), 1);
        const badgeStyles = [
            'bg-blue-600 text-white',
            'bg-indigo-600 text-white',
            'bg-purple-600 text-white',
            'bg-emerald-600 text-white',
            'bg-amber-500 text-white'
        ];
        listEl.innerHTML = dateList.slice(-5).reverse().map((d, idx) => {
            const custCountOnDate = d.customerSet.size;
            const widthPct = Math.max(25, Math.round((d.trxCount / maxDateTrx) * 100));
            return `
                <div class="py-2 border-b border-slate-100 last:border-0 space-y-1">
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2 min-w-0">
                            <span class="w-5 h-5 rounded-full ${badgeStyles[idx % badgeStyles.length]} text-[10px] font-black flex items-center justify-center shrink-0">${idx + 1}</span>
                            <span class="text-xs font-extrabold text-slate-800">${d.dateLabel}</span>
                        </div>
                        <span class="text-[11px] font-black text-blue-600 shrink-0">${custCountOnDate} Customer &bull; ${d.trxCount} Transaksi</span>
                    </div>
                    <div class="flex items-center justify-between gap-2 pl-7">
                        <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div class="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full" style="width: ${widthPct}%;"></div>
                        </div>
                        <span class="text-[10px] font-extrabold text-purple-600 shrink-0">${Number(d.totalGram.toFixed(2))} Gram</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 5. TABEL BAWAH: REKAPITULASI PENGELUARAN PERUSAHAAN PER TANGGAL, TOTAL GRAM & JUMLAH CUSTOMER
    const overviewTbody = document.getElementById('kasirOverviewTableBody');
    if (overviewTbody) {
        overviewTbody.innerHTML = dateList.slice().reverse().map((d, idx) => {
            const custCount = d.customerSet.size;
            return `
                <tr class="hover:bg-slate-50/90 transition">
                    <td class="px-3.5 py-3 font-extrabold text-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="w-5 h-5 rounded-full bg-indigo-50 text-[#5842f4] text-[10px] font-black flex items-center justify-center shrink-0">${idx + 1}</span>
                            <span>${d.dateLabel}</span>
                        </div>
                    </td>
                    <td class="px-3 py-3 text-center">
                        <span class="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-extrabold text-[11px]">${custCount} Customer</span>
                    </td>
                    <td class="px-3 py-3 text-center">
                        <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[11px]">${d.trxCount} Transaksi</span>
                    </td>
                    <td class="px-3 py-3 text-center">
                        <span class="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-extrabold text-[11px]">${Number(d.totalGram.toFixed(2))} Gram</span>
                    </td>
                    <td class="px-3 py-3 text-right font-extrabold text-emerald-600">${formatIDR(d.totalPengeluaran)}</td>
                    <td class="px-3 py-3 text-center">
                        <svg class="w-16 h-5 mx-auto" viewBox="0 0 64 20" fill="none">
                            <path d="M2 15 L16 11 L30 13 L46 6 L62 3" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </td>
                </tr>
            `;
        }).join('') + `
            <tr class="bg-slate-100/90 font-black text-[#0b132b] border-t-2 border-slate-200">
                <td class="px-3.5 py-3 uppercase">TOTAL AKUMULASI (${dateList.length} TANGGAL)</td>
                <td class="px-3 py-3 text-center text-cyan-700">${uniqueCustCount} Customer</td>
                <td class="px-3 py-3 text-center text-blue-700">${dataTrx.length} Transaksi</td>
                <td class="px-3 py-3 text-center text-purple-700">${cleanTotalGram} Gram</td>
                <td class="px-3 py-3 text-right text-emerald-700">${formatIDR(totalPengeluaran)}</td>
                <td class="px-3 py-3 text-center text-emerald-600"><i class="fa-solid fa-arrow-trend-up"></i> Aktif</td>
            </tr>
        `;
    }
}

// Keamanan Login: Daftar akun dan PIN dirahasiakan (diatur oleh Admin)
function renderQuickLoginCashiers() {
    if (availableCashiersQuickList) {
        availableCashiersQuickList.innerHTML = '';
    }
}

function loginCashier(username, pin) {
    const cashiers = getCashiers();
    const uClean = (username || '').trim().toLowerCase();
    const pClean = String(pin || '').trim();
    const found = cashiers.find(
        c => (c.username.toLowerCase() === uClean || c.name.toLowerCase() === uClean) && String(c.pin) === pClean
    );

    if (!found) {
        cashierLoginError.classList.remove('hidden');
        return false;
    }

    cashierLoginError.classList.add('hidden');
    activeCashier = found;
    sessionStorage.setItem('jantung_emas_active_cashier', JSON.stringify(found));
    enterWorkspace();
    return true;
}

cashierLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginCashier(loginUsernameInput.value, loginPinInput.value);
});

logoutCashierBtn.addEventListener('click', () => {
    sessionStorage.removeItem('jantung_emas_active_cashier');
    activeCashier = null;
    if (loginUsernameInput) loginUsernameInput.value = '';
    if (loginPinInput) loginPinInput.value = '';
    mainWorkspace.classList.add('hidden');
    cashierLoginSection.classList.remove('hidden');
});

function getBranchForCashier(cashier) {
    const outlets = getOutlets();
    const branch = outlets.find(o => String(o.id) === String(cashier?.outletId));
    if (branch) return branch;
    return {
        id: 2,
        name: 'Outlet Tangerang & Gading Serpong',
        address: 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang',
        whatsapp: '6282122126634'
    };
}

function syncActiveCashierAndBranchUI() {
    if (!activeCashier) return;
    const allCashiers = getCashiers();
    const freshCashier = allCashiers.find(c =>
        (activeCashier.id != null && Number(c.id) === Number(activeCashier.id)) ||
        (activeCashier.username && String(c.username).toLowerCase() === String(activeCashier.username).toLowerCase())
    );
    if (freshCashier) {
        activeCashier = freshCashier;
        sessionStorage.setItem('jantung_emas_active_cashier', JSON.stringify(activeCashier));
    }
    const branch = getBranchForCashier(activeCashier);
    if (activeCashierNameDisplay) activeCashierNameDisplay.textContent = activeCashier.name;
    if (activeBranchNameDisplay) activeBranchNameDisplay.textContent = branch.name;
    if (headerBranchLabel) headerBranchLabel.textContent = `Kode: JEI.${activeCashier.branchCode || 'GS'}`;
    if (inputBranchAddress && branch.address) {
        inputBranchAddress.value = branch.address;
    }
}

function enterWorkspace() {
    cashierLoginSection.classList.add('hidden');
    mainWorkspace.classList.remove('hidden');

    syncActiveCashierAndBranchUI();
    const branch = getBranchForCashier(activeCashier);
    if (activeCashierNameDisplay) activeCashierNameDisplay.textContent = activeCashier.name;
    if (activeBranchNameDisplay) activeBranchNameDisplay.textContent = branch.name;
    if (headerBranchLabel) headerBranchLabel.textContent = `Kode: JEI.${activeCashier.branchCode || 'GS'}`;

    const hr = new Date().getHours();
    let greet = 'Selamat Pagi';
    if (hr >= 11 && hr < 15) greet = 'Selamat Siang';
    else if (hr >= 15 && hr < 19) greet = 'Selamat Sore';
    else if (hr >= 19 || hr < 4) greet = 'Selamat Malam';
    document.getElementById('kasirGreetingText').textContent = `${greet}, ${activeCashier.name}!`;

    renderKaratReferenceGrid();
    renderQuickKaratSidebarWidget();
    initNewTransaction();
    renderRecentTransactions();
    switchKasirSubTab('dashboard');
}

function initNewTransaction() {
    const branch = getBranchForCashier(activeCashier);
    const code = activeCashier?.branchCode || 'GS';

    inputInvoiceNo.value = generateInvoiceNumber(code);
    inputTrxDate.value = formatNotaDate(new Date());

    if (String(branch.id) === '2' && branch.address.includes('BSD City')) {
        inputBranchAddress.value = 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang';
    } else {
        inputBranchAddress.value = branch.address || 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang';
    }

    inputCustName.value = '';
    inputCustKtp.value = '';
    inputCustPhone.value = '';
    inputCustAddress.value = '';
    inputAdmFee.value = 0;
    inputPaymentMethod.value = '';
    inputBankName.value = '';
    inputBankRek.value = '';
    inputBankAn.value = '';
    inputCashierSign.value = activeCashier ? activeCashier.name : 'FAKAR';
    inputExaminerSign.value = '';
    const statusBadge = document.getElementById('custAutoFillStatusBadge');
    if (statusBadge) statusBadge.classList.add('hidden');

    currentItems = [
        {
            material: '',
            karat: '',
            weight: '',
            unitPrice: 0
        }
    ];

    renderItemsForm();
    updateLiveNotaPreview();
}

document.getElementById('resetNewTrxBtn').addEventListener('click', () => {
    switchKasirSubTab('form');
    initNewTransaction();
});

// Tombol "Isi Contoh Sesuai Gambar"
document.getElementById('fillSampleCustomerBtn').addEventListener('click', () => {
    switchKasirSubTab('form');
    inputInvoiceNo.value = 'JEI.GS.20260920209';
    inputTrxDate.value = '20 Sep 2026 19:42:23';
    inputBranchAddress.value = 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang';
    inputCustName.value = 'KEVIN RAFIF FELIATRA';
    inputCustKtp.value = '1471091307970021';
    inputCustPhone.value = '08970827977';
    inputCustAddress.value = 'Villa ilhami blok h0 nomer 11';
    inputCashierSign.value = 'FAKAR';
    inputExaminerSign.value = '';
    inputAdmFee.value = 0;

    currentItems = [
        {
            material: 'LM Antam Redmark',
            karat: '24K+',
            weight: 1,
            unitPrice: calcPricePerGram('24K+')
        }
    ];
    renderItemsForm();
    updateLiveNotaPreview();
});

// Render Baris Input Barang (Taskly Soft Row Style)
function renderItemsForm() {
    const karatList = getKaratData();
    itemsFormContainer.innerHTML = '';

    currentItems.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3.5 space-y-2.5 hover:border-[#6351f7]/40 transition';

        const materialOptionsHtml = `<option value="" ${!item.material ? 'selected' : ''}>Pilih Tipe Material</option>` +
            MATERIAL_TYPE_OPTIONS.map(m => {
                const selected = m === item.material ? 'selected' : '';
                return `<option value="${m}" ${selected}>${m}</option>`;
            }).join('');

        const karatOptionsHtml = `<option value="" ${!item.karat ? 'selected' : ''}>Pilih Kadar</option>` +
            karatList.map(k => {
                const price = calcPricePerGram(k.name);
                const selected = k.name === item.karat ? 'selected' : '';
                return `<option value="${k.name}" ${selected}>${k.name} — ${formatIDR(price)}/gr</option>`;
            }).join('');

        const rowTotal = Math.round((parseFloat(item.weight) || 0) * (parseFloat(item.unitPrice) || 0));

        row.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
                <div class="sm:col-span-4">
                    <label class="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Barang #${idx + 1} - Tipe Material</label>
                    <select data-idx="${idx}" data-field="material" class="item-material-select w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs ${item.material ? 'text-slate-800' : 'text-slate-400'} font-extrabold focus:outline-none focus:border-[#6351f7]">
                        ${materialOptionsHtml}
                    </select>
                </div>

                <div class="sm:col-span-3">
                    <label class="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Pilih Kadar</label>
                    <select data-idx="${idx}" data-field="karat" class="item-karat-select w-full bg-[#efeaff]/60 border border-purple-200 rounded-xl px-2.5 py-2 text-xs ${item.karat ? 'text-[#5945f5]' : 'text-slate-500'} font-extrabold focus:outline-none focus:border-[#6351f7]">
                        ${karatOptionsHtml}
                    </select>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Berat (Gram)</label>
                    <input type="number" step="0.01" min="0" data-idx="${idx}" data-field="weight" value="${item.weight}" placeholder="Isi Berat" class="item-input w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-extrabold text-center placeholder:text-slate-400 placeholder:font-bold focus:outline-none focus:border-[#6351f7]">
                </div>

                <div class="sm:col-span-3 flex items-center justify-between sm:justify-end gap-2 bg-white border border-slate-200/80 rounded-xl px-3 py-1.5">
                    <div class="text-right">
                        <span class="text-[9px] font-bold text-slate-400 block">@${formatDotNumber(item.unitPrice)}/gr</span>
                        <span class="text-xs font-black text-emerald-600" id="rowTotalDisplay-${idx}">${formatIDR(rowTotal)}</span>
                    </div>
                    ${currentItems.length > 1 ? `
                        <button type="button" onclick="removeItemRow(${idx})" class="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center text-xs transition shrink-0" title="Hapus Baris">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        itemsFormContainer.appendChild(row);
    });

    // Bind listeners
    itemsFormContainer.querySelectorAll('.item-material-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            currentItems[idx].material = e.target.value;
            renderItemsForm();
            updateLiveNotaPreview();
        });
    });

    itemsFormContainer.querySelectorAll('.item-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            const field = e.target.getAttribute('data-field');
            if (field === 'weight') {
                currentItems[idx].weight = e.target.value;
                const rowTotal = Math.round((parseFloat(currentItems[idx].weight) || 0) * (parseFloat(currentItems[idx].unitPrice) || 0));
                const totalEl = document.getElementById(`rowTotalDisplay-${idx}`);
                if (totalEl) totalEl.textContent = formatIDR(rowTotal);
            }
            updateLiveNotaPreview();
        });
    });

    itemsFormContainer.querySelectorAll('.item-karat-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            const selectedKarat = e.target.value;
            currentItems[idx].karat = selectedKarat;
            currentItems[idx].unitPrice = calcPricePerGram(selectedKarat);
            renderItemsForm();
            updateLiveNotaPreview();
        });
    });
}

window.removeItemRow = function(idx) {
    if (currentItems.length <= 1) return;
    currentItems.splice(idx, 1);
    renderItemsForm();
    updateLiveNotaPreview();
};

addItemRowBtn.addEventListener('click', () => {
    currentItems.push({
        material: '',
        karat: '',
        weight: '',
        unitPrice: 0
    });
    renderItemsForm();
    updateLiveNotaPreview();
});

// Update Live Nota Pembelian Preview & KPI Cards
function updateLiveNotaPreview() {
    const rawAddress = inputBranchAddress.value.trim() || 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang';
    const commaIdx = rawAddress.indexOf(',');
    if (commaIdx !== -1) {
        const part1 = rawAddress.slice(0, commaIdx + 1).trim();
        const part2 = rawAddress.slice(commaIdx + 1).trim();
        document.getElementById('notaBranchAddress').innerHTML = `${part1}<br>${part2}`;
    } else {
        document.getElementById('notaBranchAddress').textContent = rawAddress;
    }

    const invNo = inputInvoiceNo.value.trim() || '-';
    document.getElementById('notaInvoiceNo').textContent = ': ' + invNo;
    document.getElementById('kpiActiveInvoice').textContent = invNo;
    document.getElementById('notaTrxDate').textContent = ': ' + (inputTrxDate.value.trim() || '-');

    const custName = inputCustName.value.trim().toUpperCase();
    const custKtp = inputCustKtp.value.trim();
    const custPhone = inputCustPhone.value.trim();
    const custAddr = inputCustAddress.value.trim();

    document.getElementById('notaCustName').textContent = ': ' + (custName || '-');
    document.getElementById('notaCustKtp').textContent = ': ' + (custKtp || '-');
    document.getElementById('notaCustPhone').textContent = ': ' + (custPhone || '-');
    document.getElementById('notaCustAddress').textContent = ': ' + (custAddr || '-');

    const tbody = document.getElementById('notaItemsTbody');
    tbody.innerHTML = '';
    let subTotal = 0;
    let totalWeight = 0;

    currentItems.forEach((item, index) => {
        const weightNum = parseFloat(item.weight) || 0;
        const unitPriceNum = parseFloat(item.unitPrice) || 0;
        const rowTotal = Math.round(weightNum * unitPriceNum);
        subTotal += rowTotal;
        totalWeight += weightNum;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td class="text-left uppercase">${item.material || '-'}</td>
            <td class="text-center">${item.karat || '-'}</td>
            <td class="text-center">${item.weight !== '' ? item.weight : '0'}</td>
            <td class="text-right">${formatDotNumber(unitPriceNum)}</td>
            <td class="text-right">${formatDotNumber(rowTotal)}</td>
        `;
        tbody.appendChild(tr);
    });

    const admFee = parseInt(inputAdmFee.value) || 0;
    const grandTotal = Math.max(0, subTotal - admFee);

    document.getElementById('notaSubTotal').textContent = formatDotNumber(subTotal);
    document.getElementById('notaAdmFee').textContent = formatDotNumber(admFee);
    document.getElementById('notaGrandTotal').textContent = formatDotNumber(grandTotal);
    formGrandTotalPreview.textContent = formatIDR(grandTotal);

    const kpiWeightEl = document.getElementById('kpiTotalWeightVal');
    if (kpiWeightEl) kpiWeightEl.textContent = `${Number(totalWeight.toFixed(2))} Gram`;
    const kpiItemsSubEl = document.getElementById('kpiTotalItemsSub');
    if (kpiItemsSubEl) kpiItemsSubEl.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${currentItems.length} Baris Barang`;

    // Metode Pembayaran & Bank
    const payMethod = inputPaymentMethod.value;
    document.getElementById('chkCash').textContent = payMethod === 'CASH' ? '✓' : '';
    document.getElementById('chkTransfer').textContent = payMethod === 'TRANSFER' ? '✓' : '';
    document.getElementById('chkOther').textContent = payMethod === 'LAINNYA' ? '✓' : '';

    const rek = inputBankRek.value.trim();
    const bank = inputBankName.value.trim();
    const an = inputBankAn.value.trim().toUpperCase();

    document.getElementById('notaRekBankLine').textContent =
        `No Rek : ${rek ? rek.padEnd(38, ' ') : '.......................................................'} Bank : ${bank ? bank : '...........................'}`;
    document.getElementById('notaAnLine').textContent =
        `A.N : ${an ? an : '...........................................................................................'}`;

    // Tanda Tangan
    document.getElementById('notaSignCashier').textContent = (inputCashierSign.value.trim() || 'FAKAR').toUpperCase();
    document.getElementById('notaSignCustomer').textContent = custName || '....................................';
    document.getElementById('notaSignExaminer').textContent = inputExaminerSign.value.trim().toUpperCase();

    renderQuickKaratSidebarWidget();
}

[
    inputInvoiceNo,
    inputTrxDate,
    inputBranchAddress,
    inputCustName,
    inputCustKtp,
    inputCustPhone,
    inputCustAddress,
    inputAdmFee,
    inputPaymentMethod,
    inputBankName,
    inputBankRek,
    inputBankAn,
    inputCashierSign,
    inputExaminerSign
].forEach(el => {
    if (el) {
        el.addEventListener('input', updateLiveNotaPreview);
        el.addEventListener('change', updateLiveNotaPreview);
    }
});

// ============================================================================
// AUTO-COMPLETE & AUTO-FILL DATA PELANGGAN DARI DATABASE / RIWAYAT TRANSAKSI
// (Nama Lengkap, No. KTP, No. HP, Alamat, Nama Bank, No. Rekening, Atas Nama)
// ============================================================================
const DEFAULT_KASIR_CUSTOMERS = [
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

function getUnifiedCustomerDatabase() {
    let storedCusts = JSON.parse(localStorage.getItem('jantung_emas_customers')) || null;
    if (!storedCusts) {
        storedCusts = JSON.parse(JSON.stringify(DEFAULT_KASIR_CUSTOMERS));
        localStorage.setItem('jantung_emas_customers', JSON.stringify(storedCusts));
    } else {
        let migratedPts = false;
        storedCusts.forEach(c => {
            const tc = Math.max(0, Number(c.trxCount) || 0);
            const pts = Math.max(0, Number(c.points) || 0);
            if (!c.pointsMigratedTo1 && tc > 0 && pts === tc * 10) {
                c.points = tc;
                c.pointsMigratedTo1 = true;
                migratedPts = true;
            }
        });
        if (migratedPts) {
            localStorage.setItem('jantung_emas_customers', JSON.stringify(storedCusts));
        }
    }
    const allTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    const mapByKey = new Map();

    // 1. Masukkan dari database pelanggan (jantung_emas_customers)
    storedCusts.forEach(c => {
        const nameClean = String(c.name || '').trim().toUpperCase();
        const ktpClean = String(c.ktp && c.ktp !== '-' ? c.ktp : '').trim();
        if (!nameClean && !ktpClean) return;
        const key = ktpClean || nameClean;
        mapByKey.set(key, {
            name: nameClean,
            ktp: ktpClean,
            phone: String(c.phone && c.phone !== '-' ? c.phone : '').trim(),
            address: String(c.address && c.address !== '-' ? c.address : '').trim(),
            bankName: String(c.bankName || '').trim(),
            bankRek: String(c.bankRek || '').trim(),
            bankAn: String(c.bankAn || nameClean).trim().toUpperCase(),
            paymentMethod: String(c.paymentMethod || '').trim(),
            trxCount: Number(c.trxCount) || 1
        });
    });

    // 2. Gabungkan / lengkapi dari riwayat transaksi nota (jantung_emas_transactions)
    // Urutkan dari yang terlama ke terbaru agar data rekening/HP terbaru menimpa yang kosong
    allTrx.forEach(t => {
        const nameClean = String(t.customerName || '').trim().toUpperCase();
        const ktpClean = String(t.customerKtp || '').trim();
        if (!nameClean && !ktpClean) return;

        // Cari apakah sudah ada di map berdasarkan KTP atau Nama
        let foundKey = null;
        for (const [k, val] of mapByKey.entries()) {
            if ((ktpClean && val.ktp === ktpClean) || (nameClean && val.name === nameClean)) {
                foundKey = k;
                break;
            }
        }
        const prev = foundKey ? mapByKey.get(foundKey) : {
            name: nameClean,
            ktp: ktpClean,
            phone: '',
            address: '',
            bankName: '',
            bankRek: '',
            bankAn: nameClean,
            paymentMethod: '',
            trxCount: 0
        };

        const updatedRecord = {
            name: nameClean || prev.name,
            ktp: ktpClean || prev.ktp,
            phone: String(t.customerPhone || '').trim() || prev.phone,
            address: String(t.customerAddress || '').trim() || prev.address,
            bankName: String(t.bankName || '').trim() || prev.bankName,
            bankRek: String(t.bankRek || '').trim() || prev.bankRek,
            bankAn: String(t.bankAn || '').trim().toUpperCase() || prev.bankAn || nameClean,
            paymentMethod: String(t.paymentMethod || '').trim() || prev.paymentMethod,
            trxCount: Math.max(1, prev.trxCount || 1)
        };
        mapByKey.set(foundKey || ktpClean || nameClean, updatedRecord);
    });

    return Array.from(mapByKey.values());
}

const custNameSuggestionsBox = document.getElementById('custNameSuggestionsBox');
const custKtpSuggestionsBox = document.getElementById('custKtpSuggestionsBox');
const custAutoFillStatusBadge = document.getElementById('custAutoFillStatusBadge');

function applyCustomerDataToForm(custRecord) {
    if (!custRecord) return;
    if (custRecord.name) inputCustName.value = custRecord.name;
    if (custRecord.ktp) inputCustKtp.value = custRecord.ktp;
    if (custRecord.phone) inputCustPhone.value = custRecord.phone;
    if (custRecord.address) inputCustAddress.value = custRecord.address;
    if (custRecord.bankName) inputBankName.value = custRecord.bankName;
    if (custRecord.bankRek) inputBankRek.value = custRecord.bankRek;
    if (custRecord.bankAn || custRecord.name) {
        inputBankAn.value = (custRecord.bankAn || custRecord.name).toUpperCase();
    }
    if (custRecord.paymentMethod) {
        inputPaymentMethod.value = custRecord.paymentMethod;
    } else if (custRecord.bankRek || custRecord.bankName) {
        inputPaymentMethod.value = 'TRANSFER';
    }

    if (custAutoFillStatusBadge) {
        custAutoFillStatusBadge.classList.remove('hidden');
    }
    if (custNameSuggestionsBox) custNameSuggestionsBox.classList.add('hidden');
    if (custKtpSuggestionsBox) custKtpSuggestionsBox.classList.add('hidden');
    updateLiveNotaPreview();
}

function renderCustomerSuggestions(sourceField, queryStr) {
    const box = sourceField === 'name' ? custNameSuggestionsBox : custKtpSuggestionsBox;
    const otherBox = sourceField === 'name' ? custKtpSuggestionsBox : custNameSuggestionsBox;
    if (otherBox) otherBox.classList.add('hidden');
    if (!box) return;

    const q = String(queryStr || '').trim().toLowerCase();
    if (!q) {
        box.classList.add('hidden');
        return;
    }

    const allCusts = getUnifiedCustomerDatabase();
    const matches = allCusts.filter(c => {
        if (sourceField === 'name') {
            return (c.name || '').toLowerCase().includes(q) || (c.ktp || '').toLowerCase().includes(q);
        } else {
            return (c.ktp || '').toLowerCase().includes(q) || (c.name || '').toLowerCase().includes(q);
        }
    });

    // Jika kasir mengetik No. KTP persis sama (minimal 8 digit) atau Nama Lengkap persis sama, otomatis isi field lainnya
    const exactMatch = allCusts.find(c =>
        (sourceField === 'ktp' && c.ktp && c.ktp.toLowerCase() === q && q.length >= 6) ||
        (sourceField === 'name' && c.name && c.name.toLowerCase() === q && q.length >= 4)
    );
    if (exactMatch) {
        if (sourceField === 'ktp' && !inputCustName.value.trim()) {
            applyCustomerDataToForm(exactMatch);
            return;
        }
        if (sourceField === 'name' && !inputCustKtp.value.trim()) {
            applyCustomerDataToForm(exactMatch);
            return;
        }
    }

    if (matches.length === 0) {
        box.classList.add('hidden');
        return;
    }

    box.innerHTML = '';
    matches.slice(0, 6).forEach(cust => {
        const itemBtn = document.createElement('button');
        itemBtn.type = 'button';
        itemBtn.className = 'w-full text-left px-3.5 py-2.5 hover:bg-[#efeaff]/70 transition flex items-start justify-between gap-2';
        const bankInfo = (cust.bankName || cust.bankRek)
            ? `<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded"><i class="fa-solid fa-building-columns mr-1"></i>${cust.bankName || 'BANK'}: ${cust.bankRek || '-'}</span>`
            : `<span class="text-[10px] text-slate-400">Belum ada data bank</span>`;
        itemBtn.innerHTML = `
            <div class="min-w-0">
                <div class="font-extrabold text-xs text-slate-900 uppercase truncate">${cust.name || '-'}</div>
                <div class="text-[11px] font-mono text-slate-600">KTP: <strong>${cust.ktp || '-'}</strong> &bull; HP: <strong>${cust.phone || '-'}</strong></div>
                <div class="text-[10px] text-slate-400 truncate">${cust.address || '-'}</div>
            </div>
            <div class="shrink-0 flex flex-col items-end gap-1">
                <span class="px-2 py-0.5 rounded-md bg-[#efeaff] text-[#5945f5] font-extrabold text-[10px]">Klik Pilih</span>
                ${bankInfo}
            </div>
        `;
        itemBtn.addEventListener('click', () => {
            applyCustomerDataToForm(cust);
        });
        box.appendChild(itemBtn);
    });
    box.classList.remove('hidden');
}

if (inputCustName) {
    inputCustName.addEventListener('input', (e) => {
        renderCustomerSuggestions('name', e.target.value);
    });
    inputCustName.addEventListener('focus', (e) => {
        if (e.target.value.trim()) renderCustomerSuggestions('name', e.target.value);
    });
}

if (inputCustKtp) {
    inputCustKtp.addEventListener('input', (e) => {
        renderCustomerSuggestions('ktp', e.target.value);
    });
    inputCustKtp.addEventListener('focus', (e) => {
        if (e.target.value.trim()) renderCustomerSuggestions('ktp', e.target.value);
    });
}

document.addEventListener('click', (e) => {
    if (custNameSuggestionsBox && !custNameSuggestionsBox.contains(e.target) && e.target !== inputCustName) {
        custNameSuggestionsBox.classList.add('hidden');
    }
    if (custKtpSuggestionsBox && !custKtpSuggestionsBox.contains(e.target) && e.target !== inputCustKtp) {
        custKtpSuggestionsBox.classList.add('hidden');
    }
});

// Search input filters history
const kasirSearchEl = document.getElementById('kasirSearchInput');
if (kasirSearchEl) {
    kasirSearchEl.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        if (q) {
            switchKasirSubTab('history');
        }
        renderRecentTransactions(q);
    });
}

// Save Transaction
function saveTransactionToStorage() {
    const custName = inputCustName.value.trim().toUpperCase();
    if (!custName) {
        alert('Silakan isi NAMA pelanggan terlebih dahulu sebelum menyimpan nota!');
        switchKasirSubTab('form');
        inputCustName.focus();
        return null;
    }

    for (let i = 0; i < currentItems.length; i++) {
        const it = currentItems[i];
        if (!it.material) {
            alert(`Silakan pilih Tipe Material pada Barang #${i + 1}!`);
            switchKasirSubTab('form');
            return null;
        }
        if (!it.karat) {
            alert(`Silakan pilih Kadar pada Barang #${i + 1}!`);
            switchKasirSubTab('form');
            return null;
        }
        if (!it.weight || parseFloat(it.weight) <= 0) {
            alert(`Silakan isi Berat (Gram) pada Barang #${i + 1}!`);
            switchKasirSubTab('form');
            return null;
        }
    }

    let subTotal = 0;
    const cleanItems = currentItems.map(it => {
        const w = parseFloat(it.weight) || 0;
        const p = parseFloat(it.unitPrice) || 0;
        const total = Math.round(w * p);
        subTotal += total;
        return {
            material: it.material || '-',
            karat: it.karat,
            weight: w,
            unitPrice: p,
            totalPrice: total
        };
    });

    const admFee = parseInt(inputAdmFee.value) || 0;
    const grandTotal = Math.max(0, subTotal - admFee);
    const branch = getBranchForCashier(activeCashier);

    const trxObj = {
        id: 'TRX-' + Date.now(),
        invoiceNo: inputInvoiceNo.value.trim(),
        dateStr: inputTrxDate.value.trim(),
        outletId: activeCashier?.outletId || branch.id,
        branchCode: (activeCashier?.branchCode || extractInvoiceBranchCode(inputInvoiceNo.value) || 'GS').toUpperCase(),
        branchName: branch.name,
        branchAddress: inputBranchAddress.value.trim(),
        cashierId: activeCashier?.id || null,
        cashierUsername: activeCashier?.username || '',
        cashierName: (inputCashierSign.value.trim() || activeCashier?.name || 'KASIR').toUpperCase(),
        examinerName: inputExaminerSign.value.trim().toUpperCase(),
        customerName: custName,
        customerKtp: inputCustKtp.value.trim(),
        customerPhone: inputCustPhone.value.trim(),
        customerAddress: inputCustAddress.value.trim(),
        paymentMethod: inputPaymentMethod.value,
        bankName: inputBankName.value.trim(),
        bankRek: inputBankRek.value.trim(),
        bankAn: inputBankAn.value.trim().toUpperCase(),
        items: cleanItems,
        subTotal,
        admFee,
        grandTotal
    };

    const existing = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    const existIdx = existing.findIndex(t => t.invoiceNo === trxObj.invoiceNo);
    const isNewInvoice = existIdx === -1;
    if (!isNewInvoice) {
        trxObj.id = existing[existIdx].id;
        existing[existIdx] = trxObj;
    } else {
        existing.push(trxObj);
    }

    localStorage.setItem('jantung_emas_transactions', JSON.stringify(existing));

    // Sinkronkan otomatis ke Database Pelanggan (jantung_emas_customers) di Dashboard Admin & Superadmin
    const custList = JSON.parse(localStorage.getItem('jantung_emas_customers')) || [];
    const cKtp = trxObj.customerKtp || '';
    const cName = trxObj.customerName || '';
    const cIdx = custList.findIndex(c =>
        (cKtp && c.ktp && String(c.ktp).trim() === cKtp) ||
        String(c.name || '').trim().toUpperCase() === cName
    );
    if (cIdx !== -1) {
        if (cKtp) custList[cIdx].ktp = cKtp;
        if (trxObj.customerPhone) custList[cIdx].phone = trxObj.customerPhone;
        if (trxObj.customerAddress) custList[cIdx].address = trxObj.customerAddress;
        if (trxObj.bankName) custList[cIdx].bankName = trxObj.bankName;
        if (trxObj.bankRek) custList[cIdx].bankRek = trxObj.bankRek;
        if (trxObj.bankAn) custList[cIdx].bankAn = trxObj.bankAn;
        if (trxObj.paymentMethod) custList[cIdx].paymentMethod = trxObj.paymentMethod;
        if (isNewInvoice) {
            custList[cIdx].trxCount = (Number(custList[cIdx].trxCount) || 0) + 1;
            custList[cIdx].points = (Number(custList[cIdx].points) || 0) + 1;
            custList[cIdx].pointsMigratedTo1 = true;
        }
    } else {
        custList.push({
            id: 'CUST-' + Date.now(),
            name: cName,
            ktp: cKtp || '-',
            phone: trxObj.customerPhone || '-',
            address: trxObj.customerAddress || '-',
            bankName: trxObj.bankName || '',
            bankRek: trxObj.bankRek || '',
            bankAn: trxObj.bankAn || cName,
            paymentMethod: trxObj.paymentMethod || '',
            outletId: Number(trxObj.outletId) || 2,
            trxCount: 1,
            points: 1,
            pointsMigratedTo1: true
        });
    }
    localStorage.setItem('jantung_emas_customers', JSON.stringify(custList));

    renderRecentTransactions();
    return trxObj;
}

document.getElementById('saveAndPrintBtn').addEventListener('click', () => {
    const saved = saveTransactionToStorage();
    if (saved) {
        window.print();
    }
});

document.getElementById('saveOnlyBtn').addEventListener('click', () => {
    const saved = saveTransactionToStorage();
    if (saved) {
        alert(`Nota ${saved.invoiceNo} atas nama ${saved.customerName} berhasil disimpan!`);
    }
});

function parseKasirTrxDateToISO(rawDateStr) {
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
        const month = monthMap[mKey] || '01';
        const year = parts[2].length === 4 ? parts[2] : String(now.getFullYear());
        return `${year}-${month}-${day}`;
    }
    return fallbackISO;
}

const kasirReportFilterMode = document.getElementById('kasirReportFilterMode');
const kasirDailyDateWrap = document.getElementById('kasirDailyDateWrap');
const kasirStartDateWrap = document.getElementById('kasirStartDateWrap');
const kasirEndDateWrap = document.getElementById('kasirEndDateWrap');
const kasirMonthWrap = document.getElementById('kasirMonthWrap');
const kasirYearWrap = document.getElementById('kasirYearWrap');
const kasirReportDailyDate = document.getElementById('kasirReportDailyDate');
const kasirReportStartDate = document.getElementById('kasirReportStartDate');
const kasirReportEndDate = document.getElementById('kasirReportEndDate');
const kasirReportMonthSelect = document.getElementById('kasirReportMonthSelect');
const kasirReportYearSelect = document.getElementById('kasirReportYearSelect');
const kasirApplyFilterBtn = document.getElementById('kasirApplyFilterBtn');
const kasirResetFilterBtn = document.getElementById('kasirResetFilterBtn');
const downloadKasirExcelBtn = document.getElementById('downloadKasirExcelBtn');
const downloadKasirPdfBtn = document.getElementById('downloadKasirPdfBtn');

(function initKasirReportFilterDefaults() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const todayISO = `${yyyy}-${mm}-${dd}`;
    if (kasirReportDailyDate) kasirReportDailyDate.value = todayISO;
    if (kasirReportStartDate) kasirReportStartDate.value = `${yyyy}-${mm}-01`;
    if (kasirReportEndDate) kasirReportEndDate.value = todayISO;
    if (kasirReportMonthSelect) kasirReportMonthSelect.value = mm;
    if (kasirReportYearSelect) kasirReportYearSelect.value = String(yyyy);
})();

function updateKasirFilterInputsVisibility() {
    const mode = kasirReportFilterMode ? kasirReportFilterMode.value : 'all';
    kasirDailyDateWrap?.classList.add('hidden');
    kasirStartDateWrap?.classList.add('hidden');
    kasirEndDateWrap?.classList.add('hidden');
    kasirMonthWrap?.classList.add('hidden');
    kasirYearWrap?.classList.add('hidden');

    if (mode === 'daily') {
        kasirDailyDateWrap?.classList.remove('hidden');
    } else if (mode === 'date_range') {
        kasirStartDateWrap?.classList.remove('hidden');
        kasirEndDateWrap?.classList.remove('hidden');
    } else if (mode === 'weekly') {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
        const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        if (kasirReportStartDate) kasirReportStartDate.value = toISO(weekAgo);
        if (kasirReportEndDate) kasirReportEndDate.value = toISO(now);
        kasirStartDateWrap?.classList.remove('hidden');
        kasirEndDateWrap?.classList.remove('hidden');
    } else if (mode === 'monthly') {
        kasirMonthWrap?.classList.remove('hidden');
        kasirYearWrap?.classList.remove('hidden');
    }
}

if (kasirReportFilterMode) {
    kasirReportFilterMode.addEventListener('change', () => {
        updateKasirFilterInputsVisibility();
        renderRecentTransactions(kasirSearchEl?.value || '');
    });
}

[kasirReportDailyDate, kasirReportStartDate, kasirReportEndDate, kasirReportMonthSelect, kasirReportYearSelect].forEach(el => {
    if (el) {
        el.addEventListener('change', () => renderRecentTransactions(kasirSearchEl?.value || ''));
    }
});

if (kasirApplyFilterBtn) {
    kasirApplyFilterBtn.addEventListener('click', () => renderRecentTransactions(kasirSearchEl?.value || ''));
}

if (kasirResetFilterBtn) {
    kasirResetFilterBtn.addEventListener('click', () => {
        if (kasirReportFilterMode) kasirReportFilterMode.value = 'all';
        updateKasirFilterInputsVisibility();
        if (kasirSearchEl) kasirSearchEl.value = '';
        renderRecentTransactions('');
    });
}

function getFilteredKasirTransactions(filterQuery = '') {
    let list = getTransactionsForActiveCashier().slice();
    const mode = kasirReportFilterMode ? kasirReportFilterMode.value : 'all';
    let periodLabel = 'Semua Periode';

    if (mode === 'daily') {
        const dVal = kasirReportDailyDate?.value || parseKasirTrxDateToISO();
        periodLabel = `Harian: ${dVal}`;
        list = list.filter(t => parseKasirTrxDateToISO(t.dateStr) === dVal);
    } else if (mode === 'date_range') {
        const sDate = kasirReportStartDate?.value || '2000-01-01';
        const eDate = kasirReportEndDate?.value || '2099-12-31';
        periodLabel = `Rentang Tanggal: ${sDate} s/d ${eDate}`;
        list = list.filter(t => {
            const iso = parseKasirTrxDateToISO(t.dateStr);
            return iso >= sDate && iso <= eDate;
        });
    } else if (mode === 'weekly') {
        const sDate = kasirReportStartDate?.value || '2000-01-01';
        const eDate = kasirReportEndDate?.value || '2099-12-31';
        periodLabel = `Mingguan: ${sDate} s/d ${eDate}`;
        list = list.filter(t => {
            const iso = parseKasirTrxDateToISO(t.dateStr);
            return iso >= sDate && iso <= eDate;
        });
    } else if (mode === 'monthly') {
        const mVal = kasirReportMonthSelect?.value || '11';
        const yVal = kasirReportYearSelect?.value || '2026';
        const mText = kasirReportMonthSelect?.options[kasirReportMonthSelect.selectedIndex]?.text || mVal;
        periodLabel = `Bulanan: ${mText} ${yVal}`;
        list = list.filter(t => {
            const iso = parseKasirTrxDateToISO(t.dateStr);
            return iso.slice(0, 4) === String(yVal) && iso.slice(5, 7) === String(mVal);
        });
    }

    const q = (filterQuery || '').trim().toLowerCase();
    if (q) {
        list = list.filter(t => (
            (t.invoiceNo || '').toLowerCase().includes(q) ||
            (t.customerName || '').toLowerCase().includes(q) ||
            (t.customerKtp || '').toLowerCase().includes(q)
        ));
    }

    return { list, periodLabel };
}

function renderRecentTransactions(filterQuery = '') {
    const listEl = document.getElementById('cashierRecentTrxList');
    const badgeEl = document.getElementById('branchTrxCountBadge');
    const tabCountEl = document.getElementById('tabHistoryCount');
    const kpiCountEl = document.getElementById('kpiSavedNotesCount');
    const reportTbody = document.getElementById('kasirReportTableBody');
    const reportTfoot = document.getElementById('kasirReportTableFoot');
    if (!listEl) return;

    const branchTrx = getTransactionsForActiveCashier();
    if (badgeEl) badgeEl.textContent = branchTrx.length;
    if (tabCountEl) tabCountEl.textContent = branchTrx.length;
    if (kpiCountEl) kpiCountEl.textContent = `${branchTrx.length} Nota`;
    renderQuickKaratSidebarWidget();

    const { list: filtered, periodLabel } = getFilteredKasirTransactions(filterQuery);

    let totalGram = 0;
    let totalBiayaKeluar = 0;
    filtered.forEach(t => {
        totalBiayaKeluar += Number(t.grandTotal) || 0;
        (t.items || []).forEach(it => {
            totalGram += parseFloat(it.weight) || 0;
        });
    });

    const branchInfo = getBranchForCashier(activeCashier);
    const summaryTextEl = document.getElementById('kasirReportSummaryText');
    if (summaryTextEl) {
        summaryTextEl.textContent = `${periodLabel} • ${activeCashier?.name || 'KASIR'} (${branchInfo.name})`;
    }
    const sumNotaEl = document.getElementById('kasirReportSumNota');
    if (sumNotaEl) sumNotaEl.textContent = `${filtered.length} Nota`;
    const sumGramEl = document.getElementById('kasirReportSumGram');
    if (sumGramEl) sumGramEl.textContent = `${Number(totalGram.toFixed(2))} gr`;
    const sumMoneyEl = document.getElementById('kasirReportSumMoney');
    if (sumMoneyEl) sumMoneyEl.textContent = formatIDR(totalBiayaKeluar);

    if (reportTbody && reportTfoot) {
        reportTbody.innerHTML = '';
        if (filtered.length === 0) {
            reportTbody.innerHTML = `
                <tr>
                    <td colspan="8" class="py-6 text-center text-slate-400 text-xs">
                        Tidak ada data transaksi pada periode <strong>${periodLabel}</strong>.
                    </td>
                </tr>
            `;
            reportTfoot.innerHTML = `
                <tr>
                    <td colspan="4" class="py-3 px-3 text-right uppercase text-[11px]">TOTAL KESELURUHAN (0 NOTA)</td>
                    <td class="py-3 px-3 text-right text-purple-700">0 gr</td>
                    <td class="py-3 px-3 text-right">-</td>
                    <td class="py-3 px-3 text-right text-emerald-700">Rp 0</td>
                    <td></td>
                </tr>
            `;
        } else {
            filtered.slice().reverse().forEach(trx => {
                const items = (trx.items && trx.items.length > 0) ? trx.items : [{ material: '-', karat: '-', weight: 0, unitPrice: 0, totalPrice: trx.grandTotal || 0 }];
                items.forEach((it, idx) => {
                    const w = parseFloat(it.weight) || 0;
                    const uPrice = parseFloat(it.unitPrice) || 0;
                    const rTotal = it.totalPrice != null ? Number(it.totalPrice) : Math.round(w * uPrice);
                    const tr = document.createElement('tr');
                    tr.className = 'hover:bg-slate-50 transition';
                    tr.innerHTML = `
                        <td class="py-3 px-3 text-[11px] font-semibold text-slate-600 whitespace-nowrap">${trx.dateStr || '-'}</td>
                        <td class="py-3 px-3 font-mono font-extrabold text-[#6351f7] whitespace-nowrap">${trx.invoiceNo || '-'}</td>
                        <td class="py-3 px-3 font-extrabold text-slate-800 uppercase">${trx.customerName || '-'}</td>
                        <td class="py-3 px-3">
                            <span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-extrabold text-[11px] mr-1">${it.karat || '-'}</span>
                            <span class="text-slate-600 font-semibold text-[11px]">${it.material || '-'}</span>
                        </td>
                        <td class="py-3 px-3 text-right font-extrabold text-slate-800 whitespace-nowrap">${Number(w.toFixed(2))} gr</td>
                        <td class="py-3 px-3 text-right font-bold text-slate-600 whitespace-nowrap">${formatIDR(uPrice)}</td>
                        <td class="py-3 px-3 text-right font-extrabold text-emerald-700 whitespace-nowrap">${formatIDR(rTotal)}</td>
                        <td class="py-3 px-3 text-center whitespace-nowrap">
                            ${idx === 0 ? `
                                <button type="button" onclick="loadTransactionById('${trx.id}')" class="px-2.5 py-1.5 rounded-xl bg-[#efeaff] hover:bg-[#6351f7] text-[#5945f5] hover:text-white font-extrabold text-[11px] transition">
                                    <i class="fa-solid fa-print mr-1"></i> Nota
                                </button>
                            ` : '<span class="text-[10px] text-slate-400">idem</span>'}
                        </td>
                    `;
                    reportTbody.appendChild(tr);
                });
            });

            reportTfoot.innerHTML = `
                <tr>
                    <td colspan="4" class="py-3 px-3 text-right uppercase text-[11px]">TOTAL GRAM &amp; TOTAL BIAYA KELUAR (${filtered.length} NOTA)</td>
                    <td class="py-3 px-3 text-right text-purple-700 whitespace-nowrap">${Number(totalGram.toFixed(2))} gr</td>
                    <td class="py-3 px-3 text-right text-slate-400">-</td>
                    <td class="py-3 px-3 text-right text-emerald-700 whitespace-nowrap">${formatIDR(totalBiayaKeluar)}</td>
                    <td></td>
                </tr>
            `;
        }
    }

    if (filtered.length === 0) {
        const branchLabel = activeCashier ? `${activeCashier.name} (JEI.${activeCashier.branchCode || 'GS'})` : 'cabang ini';
        listEl.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Belum ada riwayat nota yang sesuai filter untuk kasir/cabang <strong>${branchLabel}</strong>.</p>`;
        return;
    }

    listEl.innerHTML = '';
    filtered.slice().reverse().forEach(trx => {
        const div = document.createElement('div');
        div.className = 'p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#6351f7]/50 flex items-center justify-between gap-3 transition';
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl icon-3d-purple text-white flex items-center justify-center text-xs shrink-0">
                    <i class="fa-solid fa-file-invoice"></i>
                </div>
                <div>
                    <div class="font-mono font-extrabold text-xs text-[#6351f7]">${trx.invoiceNo}</div>
                    <div class="text-xs font-extrabold text-slate-800 uppercase">${trx.customerName} <span class="text-emerald-600 font-bold ml-1">(${formatIDR(trx.grandTotal)})</span></div>
                    <div class="text-[10px] text-slate-400">${trx.dateStr} &bull; Kasir: ${trx.cashierName}</div>
                </div>
            </div>
            <button type="button" onclick="loadTransactionById('${trx.id}')" class="px-3.5 py-2 rounded-xl bg-[#efeaff] hover:bg-[#6351f7] text-[#5945f5] hover:text-white font-extrabold text-xs transition shrink-0">
                <i class="fa-solid fa-eye mr-1"></i> Buka Nota
            </button>
        `;
        listEl.appendChild(div);
    });
}

// Download Excel (.xls) Kasir Cabang
if (downloadKasirExcelBtn) {
    downloadKasirExcelBtn.addEventListener('click', () => {
        const { list, periodLabel } = getFilteredKasirTransactions(kasirSearchEl?.value || '');
        const branchInfo = getBranchForCashier(activeCashier);
        let totalGram = 0;
        let totalBiayaKeluar = 0;
        let rowNo = 0;

        const rowsHtml = list.map(t => {
            totalBiayaKeluar += Number(t.grandTotal) || 0;
            const items = (t.items && t.items.length > 0) ? t.items : [{ material: '-', karat: '-', weight: 0, unitPrice: 0, totalPrice: t.grandTotal || 0 }];
            return items.map(it => {
                rowNo++;
                const w = parseFloat(it.weight) || 0;
                const uPrice = parseFloat(it.unitPrice) || 0;
                const rTotal = it.totalPrice != null ? Number(it.totalPrice) : Math.round(w * uPrice);
                totalGram += w;
                return `
                    <tr>
                        <td style="text-align:center;">${rowNo}</td>
                        <td>${t.dateStr || '-'}</td>
                        <td>${t.invoiceNo || '-'}</td>
                        <td>${t.customerName || '-'}</td>
                        <td>${it.karat || '-'} (${it.material || '-'})</td>
                        <td style="text-align:right;">${Number(w.toFixed(2))}</td>
                        <td style="text-align:right;">${formatIDR(uPrice)}</td>
                        <td style="text-align:right;font-weight:bold;">${formatIDR(rTotal)}</td>
                    </tr>
                `;
            }).join('');
        }).join('');

        const excelTemplate = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="UTF-8"></head>
            <body>
                <h2>LAPORAN DATA TRANSAKSI KASIR CABANG - PT JANTUNG EMAS INDONESIA</h2>
                <p><strong>Cabang:</strong> ${branchInfo.name} | <strong>Kasir:</strong> ${activeCashier?.name || '-'} | <strong>Periode:</strong> ${periodLabel}</p>
                <p><strong>Total Nota:</strong> ${list.length} Nota | <strong>Total Gram:</strong> ${Number(totalGram.toFixed(2))} gr | <strong>Total Biaya Keluar:</strong> ${formatIDR(totalBiayaKeluar)}</p>
                <table border="1" cellpadding="6" cellspacing="0">
                    <thead style="background:#0b132b;color:#ffffff;font-weight:bold;">
                        <tr>
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>No Nota</th>
                            <th>Nama Customer</th>
                            <th>Kadar</th>
                            <th>Berat (gr)</th>
                            <th>@Harga</th>
                            <th>Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml || '<tr><td colspan="8" style="text-align:center;">Tidak ada data transaksi pada periode ini</td></tr>'}
                    </tbody>
                    <tfoot>
                        <tr style="background:#f1f5f9;font-weight:bold;">
                            <td colspan="5" style="text-align:right;">TOTAL GRAM &amp; TOTAL BIAYA KELUAR (${list.length} NOTA)</td>
                            <td style="text-align:right;">${Number(totalGram.toFixed(2))} gr</td>
                            <td style="text-align:right;">-</td>
                            <td style="text-align:right;">${formatIDR(totalBiayaKeluar)}</td>
                        </tr>
                    </tfoot>
                </table>
            </body>
            </html>
        `;

        const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const safePeriod = periodLabel.replace(/[^a-zA-Z0-9_-]/g, '_');
        a.download = `Laporan_Transaksi_Kasir_${activeCashier?.branchCode || 'JEI'}_${safePeriod}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Cetak / Download PDF Laporan Kasir Cabang
if (downloadKasirPdfBtn) {
    downloadKasirPdfBtn.addEventListener('click', () => {
        const { list, periodLabel } = getFilteredKasirTransactions(kasirSearchEl?.value || '');
        const branchInfo = getBranchForCashier(activeCashier);
        let totalGram = 0;
        let totalBiayaKeluar = 0;
        let rowNo = 0;

        const rowsHtml = list.map(t => {
            totalBiayaKeluar += Number(t.grandTotal) || 0;
            const items = (t.items && t.items.length > 0) ? t.items : [{ material: '-', karat: '-', weight: 0, unitPrice: 0, totalPrice: t.grandTotal || 0 }];
            return items.map(it => {
                rowNo++;
                const w = parseFloat(it.weight) || 0;
                const uPrice = parseFloat(it.unitPrice) || 0;
                const rTotal = it.totalPrice != null ? Number(it.totalPrice) : Math.round(w * uPrice);
                totalGram += w;
                return `
                    <tr>
                        <td style="text-align:center;">${rowNo}</td>
                        <td>${t.dateStr || '-'}</td>
                        <td><strong>${t.invoiceNo || '-'}</strong></td>
                        <td><strong>${t.customerName || '-'}</strong></td>
                        <td><strong>${it.karat || '-'}</strong> (${it.material || '-'})</td>
                        <td style="text-align:right;font-weight:bold;">${Number(w.toFixed(2))} gr</td>
                        <td style="text-align:right;">${formatIDR(uPrice)}</td>
                        <td style="text-align:right;font-weight:bold;">${formatIDR(rTotal)}</td>
                    </tr>
                `;
            }).join('');
        }).join('');

        const printWin = window.open('', '_blank', 'width=1024,height=768');
        if (!printWin) {
            alert('Silakan izinkan pop-up browser untuk mencetak / mengunduh PDF.');
            return;
        }
        printWin.document.write(`
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>Laporan Data Transaksi Kasir - ${periodLabel}</title>
                <style>
                    body { font-family: Arial, sans-serif; color: #0f172a; margin: 24px; font-size: 12px; }
                    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #0b132b; padding-bottom: 12px; margin-bottom: 16px; }
                    .header h1 { margin: 0; font-size: 18px; color: #0b132b; }
                    .header p { margin: 4px 0 0; color: #475569; font-size: 11px; }
                    .summary { display: flex; gap: 16px; margin-bottom: 16px; background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 14px; border-radius: 8px; }
                    .summary div { flex: 1; }
                    .summary span { display: block; font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: bold; }
                    .summary strong { font-size: 14px; color: #0b132b; }
                    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
                    th, td { border: 1px solid #cbd5e1; padding: 7px 8px; text-align: left; font-size: 11px; }
                    th { background: #0b132b; color: #ffffff; text-transform: uppercase; font-size: 10px; }
                    tfoot td { background: #f1f5f9; font-weight: bold; font-size: 12px; }
                    @media print { @page { size: A4 landscape; margin: 12mm; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <h1>PT JANTUNG EMAS INDONESIA</h1>
                        <p>LAPORAN DATA TRANSAKSI KASIR CABANG &bull; ${branchInfo.name} (Kasir: ${activeCashier?.name || '-'})</p>
                    </div>
                    <div style="text-align:right;">
                        <strong>${periodLabel}</strong>
                        <p>Dicetak: ${new Date().toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <div class="summary">
                    <div><span>Total Transaksi Nota</span><strong>${list.length} Nota</strong></div>
                    <div><span>Total Gram</span><strong>${Number(totalGram.toFixed(2))} gr</strong></div>
                    <div><span>Total Biaya Keluar</span><strong>${formatIDR(totalBiayaKeluar)}</strong></div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="width:32px;text-align:center;">No</th>
                            <th>Tanggal</th>
                            <th>No Nota</th>
                            <th>Nama Customer</th>
                            <th>Kadar</th>
                            <th style="text-align:right;">Berat (gr)</th>
                            <th style="text-align:right;">@Harga</th>
                            <th style="text-align:right;">Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml || '<tr><td colspan="8" style="text-align:center;padding:20px;">Tidak ada data transaksi pada periode ini</td></tr>'}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" style="text-align:right;">TOTAL GRAM &amp; TOTAL BIAYA KELUAR</td>
                            <td style="text-align:right;">${Number(totalGram.toFixed(2))} gr</td>
                            <td style="text-align:right;">-</td>
                            <td style="text-align:right;">${formatIDR(totalBiayaKeluar)}</td>
                        </tr>
                    </tfoot>
                </table>
                <script>
                    window.onload = function() { setTimeout(function() { window.print(); }, 300); };
                <\/script>
            </body>
            </html>
        `);
        printWin.document.close();
    });
}

window.loadTransactionById = function(trxId) {
    const allTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    const trx = allTrx.find(t => String(t.id) === String(trxId));
    if (!trx) return;

    switchKasirSubTab('form');
    inputInvoiceNo.value = trx.invoiceNo || '';
    inputTrxDate.value = trx.dateStr || '';
    inputBranchAddress.value = trx.branchAddress || 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang';
    inputCustName.value = trx.customerName || '';
    inputCustKtp.value = trx.customerKtp || '';
    inputCustPhone.value = trx.customerPhone || '';
    inputCustAddress.value = trx.customerAddress || '';
    inputAdmFee.value = trx.admFee || 0;
    inputPaymentMethod.value = trx.paymentMethod || '';
    inputBankName.value = trx.bankName || '';
    inputBankRek.value = trx.bankRek || '';
    inputBankAn.value = trx.bankAn || '';
    inputCashierSign.value = trx.cashierName || 'FAKAR';
    inputExaminerSign.value = trx.examinerName || '';

    currentItems = (trx.items && trx.items.length > 0) ? JSON.parse(JSON.stringify(trx.items)) : [
        { material: 'ANTAM', karat: '24K+', weight: 1, unitPrice: calcPricePerGram('24K+') }
    ];

    renderItemsForm();
    updateLiveNotaPreview();
    switchKasirSubTab('preview');
};

// Initialize on Page Load
window.addEventListener('DOMContentLoaded', () => {
    renderQuickLoginCashiers();

    const params = new URLSearchParams(window.location.search);
    const trxIdParam = params.get('trx_id');

    const savedSession = sessionStorage.getItem('jantung_emas_active_cashier');
    if (savedSession) {
        activeCashier = JSON.parse(savedSession);
        enterWorkspace();
    } else if (trxIdParam) {
        const cashiers = getCashiers();
        activeCashier = cashiers[0] || DEFAULT_CASHIERS[0];
        enterWorkspace();
    }

    if (trxIdParam) {
        window.loadTransactionById(trxIdParam);
    }
});

// Sinkronisasi Real-Time antar Tab (Superadmin, Admin Cabang, Keuangan & Kasir)
window.addEventListener('storage', (e) => {
    if (!e.key || e.key.startsWith('jantung_emas_')) {
        renderQuickLoginCashiers();
        if (activeCashier) {
            syncActiveCashierAndBranchUI();
            renderKaratReferenceGrid();
            renderQuickKaratSidebarWidget();
            updateLiveNotaPreview();
            renderRecentTransactions(kasirSearchEl?.value || '');
        }
    }
});
