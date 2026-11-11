const DEFAULT_KARAT_DATA = [
    { name: '24K+', percent: 1.04 },
    { name: '24K', percent: 1.000 },
    { name: '23K', percent: 0.931 },
    { name: '22K', percent: 0.865 },
    { name: '21K', percent: 0.826 },
    { name: '20K', percent: 0.789 },
    { name: '19K', percent: 0.745 },
    { name: '18K', percent: 0.707 },
    { name: '17K', percent: 0.690 },
    { name: '16K', percent: 0.640 },
    { name: '15K', percent: 0.589 },
    { name: '14K', percent: 0.549 },
    { name: '13K', percent: 0.510 },
    { name: '12K', percent: 0.471 },
    { name: '11K', percent: 0.432 },
    { name: '10K', percent: 0.392 },
    { name: '9K', percent: 0.370 },
    { name: '8K', percent: 0.340 },
    { name: '7K', percent: 0.279 },
    { name: '6K', percent: 0.250 }
];

const savedKaratStorage = localStorage.getItem('jantung_emas_karat_data');
let karatData = savedKaratStorage ? JSON.parse(savedKaratStorage) : JSON.parse(JSON.stringify(DEFAULT_KARAT_DATA));

const DEFAULT_SLIDES = [
    {
        id: 1,
        badge: 'Pusat Terima Jual Emas Terpercaya di Indonesia',
        title: 'TERIMA JUAL EMAS | DENGAN HARGA TERBAIK',
        subtitle: 'Jantung Emas Indonesia menerima jual emas perhiasan, emas batangan, hingga emas tanpa surat dengan penimbangan presisi dan daftar harga transparan yang selalu ter-update!',
        image: 'assets/logo.png'
    },
    {
        id: 2,
        badge: 'Pengecekan Kadar Spektrometer XRF',
        title: 'PROSES CEPAT & TRANSPARAN | CAIR DETIK INI',
        subtitle: 'Tim penaksir profesional kami siap melayani Anda di outlet terdekat. Penimbangan digital terbuka & pengujian kadar ilmiah canggih tanpa merusak perhiasan Anda.',
        image: 'assets/logo.png'
    },
    {
        id: 3,
        badge: 'Solusi Emas Patah, Rusak & Tanpa Surat',
        title: 'TERIMA EMAS TANPA NOTA | ATAU SURAT HILANG',
        subtitle: 'Surat kwitansi hilang atau perhiasan patah/rusak? Kami tetap membeli dengan penawaran harga pasaran murni berdasarkan pengujian kadar ilmiah.',
        image: 'assets/logo.png'
    }
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

const DEFAULT_BRANCH_ADMINS = [
    { id: 1, name: 'BUDI SANTOSO (ADMIN JAKARTA)', username: 'admin_jkt', pin: '1234', outletId: 1 },
    { id: 2, name: 'HENDRA WIJAYA (ADMIN SERPONG)', username: 'admin_gs', pin: '1234', outletId: 2 },
    { id: 3, name: 'DEWI LESTARI (ADMIN BEKASI)', username: 'admin_bks', pin: '1234', outletId: 3 }
];

const DEFAULT_FINANCE_USERS = [
    { id: 1, name: 'SITI RAHMA (KEUANGAN PUSAT)', username: 'fin_pusat', pin: '1234', scope: 'HEAD_FINANCE' },
    { id: 2, name: 'NADIA PUTRI (KEUANGAN JAKARTA)', username: 'fin_jkt', pin: '1234', scope: 'FIN_BRANCH_1' },
    { id: 3, name: 'REZA PRATAMA (KEUANGAN SERPONG)', username: 'fin_gs', pin: '1234', scope: 'FIN_BRANCH_2' },
    { id: 4, name: 'DINDA AYU (KEUANGAN BEKASI)', username: 'fin_bks', pin: '1234', scope: 'FIN_BRANCH_3' }
];

const DEFAULT_BASE = 2280000;
let base24k = parseInt(localStorage.getItem('jantung_emas_base_24k')) || DEFAULT_BASE;
let lastUpdated = localStorage.getItem('jantung_emas_last_update') || new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

let outlets = JSON.parse(localStorage.getItem('jantung_emas_outlets')) || DEFAULT_OUTLETS;
if (!localStorage.getItem('jantung_emas_outlets')) {
    localStorage.setItem('jantung_emas_outlets', JSON.stringify(outlets));
}
let slides = JSON.parse(localStorage.getItem('jantung_emas_slides')) || DEFAULT_SLIDES;
let cashiers = JSON.parse(localStorage.getItem('jantung_emas_cashiers')) || DEFAULT_CASHIERS;
if (!localStorage.getItem('jantung_emas_cashiers')) {
    localStorage.setItem('jantung_emas_cashiers', JSON.stringify(cashiers));
}
let branchAdmins = JSON.parse(localStorage.getItem('jantung_emas_branch_admins')) || DEFAULT_BRANCH_ADMINS;
if (!localStorage.getItem('jantung_emas_branch_admins')) {
    localStorage.setItem('jantung_emas_branch_admins', JSON.stringify(branchAdmins));
}
let financeUsers = JSON.parse(localStorage.getItem('jantung_emas_finance_users')) || DEFAULT_FINANCE_USERS;
if (!localStorage.getItem('jantung_emas_finance_users')) {
    localStorage.setItem('jantung_emas_finance_users', JSON.stringify(financeUsers));
}

function calcPrice(base, pct) {
    return Math.floor((base * pct) / 1000) * 1000;
}

function formatIDR(amount) {
    const val = Math.round(Number(amount) || 0);
    const sign = val < 0 ? '-' : '';
    return sign + 'Rp\u00A0' + Math.abs(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Header Title helper
function updateGreeting() {
    const el = document.getElementById('adminGreetingTitle');
    if (el) el.textContent = 'OVERVIEW';
}

// Collapse Sidebar Toggle
const adminSidebar = document.getElementById('adminSidebar');
const collapseSidebarBtn = document.getElementById('collapseSidebarBtn');
let sidebarCollapsed = false;
collapseSidebarBtn.addEventListener('click', () => {
    sidebarCollapsed = !sidebarCollapsed;
    document.querySelectorAll('.sidebar-text').forEach(el => {
        el.style.display = sidebarCollapsed ? 'none' : '';
    });
    adminSidebar.style.width = sidebarCollapsed ? '88px' : '';
    document.getElementById('collapseIcon').className = sidebarCollapsed ? 'fa-solid fa-angles-right mx-auto' : 'fa-solid fa-angles-left';
});

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginPinInput = document.getElementById('loginPinInput');
const submitLoginBtn = document.getElementById('submitLoginBtn');
const loginErrorMsg = document.getElementById('loginErrorMsg');

// Navigation Buttons
const sideNavOverviewBtn = document.getElementById('sideNavOverviewBtn');
const tabPricesBtn = document.getElementById('tabPricesBtn');
const tabOutletsBtn = document.getElementById('tabOutletsBtn');
const tabSlidesBtn = document.getElementById('tabSlidesBtn');
const tabCashiersBtn = document.getElementById('tabCashiersBtn');
const tabFinanceBtn = document.getElementById('tabFinanceBtn');
const tabTransactionsBtn = document.getElementById('tabTransactionsBtn');
const tabCustomersBtn = document.getElementById('tabCustomersBtn');

const tabOverviewContent = document.getElementById('tabOverviewContent');
const tabPricesContent = document.getElementById('tabPricesContent');
const tabOutletsContent = document.getElementById('tabOutletsContent');
const tabSlidesContent = document.getElementById('tabSlidesContent');
const tabCashiersContent = document.getElementById('tabCashiersContent');
const tabFinanceContent = document.getElementById('tabFinanceContent');
const tabTransactionsContent = document.getElementById('tabTransactionsContent');
const tabCustomersContent = document.getElementById('tabCustomersContent');
const adminActiveMenuDesc = document.getElementById('adminActiveMenuDesc');
const adminGreetingTitle = document.getElementById('adminGreetingTitle');

function switchAdminTab(tabKey) {
    const isSuper = currentRoleMode === 'SUPERADMIN';
    const allSideBtns = [sideNavOverviewBtn, tabPricesBtn, tabOutletsBtn, tabCashiersBtn, tabFinanceBtn, tabTransactionsBtn, tabCustomersBtn, tabSlidesBtn];
    allSideBtns.forEach(btn => {
        if (!btn) return;
        const shouldHideSlide = (btn === tabSlidesBtn && !isSuper);
        btn.className = 'w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition sidebar-link-inactive' + (shouldHideSlide ? ' hidden' : '');
        if (btn === tabSlidesBtn) {
            btn.style.display = shouldHideSlide ? 'none' : '';
        }
    });

    [tabOverviewContent, tabPricesContent, tabOutletsContent, tabSlidesContent, tabCashiersContent, tabFinanceContent, tabTransactionsContent, tabCustomersContent].forEach(c => {
        if (c) c.classList.add('hidden');
    });

    let targetSideBtn = sideNavOverviewBtn;
    if (tabKey === 'overview') {
        tabOverviewContent.classList.remove('hidden');
        updateAllKpiCards();
        if (typeof renderSuperadminFinanceAll === 'function') renderSuperadminFinanceAll();
        targetSideBtn = sideNavOverviewBtn;
        if (adminGreetingTitle) adminGreetingTitle.textContent = 'OVERVIEW';
        if (adminActiveMenuDesc) adminActiveMenuDesc.textContent = 'Performa Harga Emas, Cabang & Monitoring Keuangan Sekilas';
    } else if (tabKey === 'prices') {
        tabPricesContent.classList.remove('hidden');
        targetSideBtn = tabPricesBtn;
        if (adminGreetingTitle) adminGreetingTitle.textContent = 'HARGA 24K';
        if (adminActiveMenuDesc) adminActiveMenuDesc.textContent = 'Kelola harga dasar emas 24K dan persentase otomatis 20 tingkat kadar.';
    } else if (tabKey === 'outlets') {
        tabOutletsContent.classList.remove('hidden');
        renderAdminOutlets();
        targetSideBtn = tabOutletsBtn;
        if (adminGreetingTitle) adminGreetingTitle.textContent = 'DATA CABANG';
        if (adminActiveMenuDesc) adminActiveMenuDesc.textContent = 'Kelola daftar cabang & alamat outlet resmi Jantung Emas Indonesia.';
    } else if (tabKey === 'cashiers') {
        tabCashiersContent.classList.remove('hidden');
        if (typeof renderAdminBranchAdmins === 'function') renderAdminBranchAdmins();
        if (typeof renderAdminFinanceUsers === 'function') renderAdminFinanceUsers();
        renderAdminCashiers();
        targetSideBtn = tabCashiersBtn;
        if (adminGreetingTitle) adminGreetingTitle.textContent = currentRoleMode === 'SUPERADMIN' ? 'KELOLA AKUN ROLE (CRUD)' : 'TIM KASIR CABANG';
        if (adminActiveMenuDesc) adminActiveMenuDesc.textContent = currentRoleMode === 'SUPERADMIN'
            ? 'Superadmin dapat Tambah, Edit & Hapus Akun Admin Cabang, Staf Keuangan, dan Kasir.'
            : 'Kelola akun login kasir untuk cabang Anda.';
    } else if (tabKey === 'finance') {
        if (tabFinanceContent) tabFinanceContent.classList.remove('hidden');
        if (typeof renderSuperadminFinanceAll === 'function') renderSuperadminFinanceAll();
        targetSideBtn = tabFinanceBtn;
        const bId = getActiveBranchId();
        const bObj = outlets.find(o => Number(o.id) === Number(bId));
        if (adminGreetingTitle) {
            adminGreetingTitle.textContent = isSuper
                ? 'KEUANGAN KOMPLIT'
                : `KEUANGAN CABANG (${bObj ? bObj.name.toUpperCase() : 'CABANG SENDIRI'})`;
        }
        if (adminActiveMenuDesc) {
            adminActiveMenuDesc.textContent = isSuper
                ? 'Buku Besar, Neraca, Laba Rugi, Arus Kas, Biaya (6101–7106), Utang, Penjualan & Jurnal.'
                : `Laporan Keuangan Khusus Cabang ${bObj ? bObj.name : 'Sendiri'} — Download Neraca & Laba Rugi Cabang.`;
        }
    } else if (tabKey === 'transactions') {
        tabTransactionsContent.classList.remove('hidden');
        renderAdminTransactions();
        targetSideBtn = tabTransactionsBtn;
        if (adminGreetingTitle) adminGreetingTitle.textContent = 'LAPORAN NOTA';
        if (adminActiveMenuDesc) adminActiveMenuDesc.textContent = 'Pantau dan cetak ulang riwayat Nota Pembelian dari seluruh cabang.';
    } else if (tabKey === 'customers') {
        if (tabCustomersContent) tabCustomersContent.classList.remove('hidden');
        if (typeof renderAdminCustomers === 'function') renderAdminCustomers();
        targetSideBtn = tabCustomersBtn;
        if (adminGreetingTitle) adminGreetingTitle.textContent = 'DATA PELANGGAN';
        if (adminActiveMenuDesc) adminActiveMenuDesc.textContent = 'Database pelanggan seluruh cabang (Nama Lengkap, No. KTP, No. HP, Alamat, Point & Jumlah Transaksi).';
    } else if (tabKey === 'slides') {
        if (currentRoleMode !== 'SUPERADMIN') {
            switchAdminTab('overview');
            return;
        }
        tabSlidesContent.classList.remove('hidden');
        populateSlidesForm();
        targetSideBtn = tabSlidesBtn;
        if (adminGreetingTitle) adminGreetingTitle.textContent = 'SLIDE HERO';
        if (adminActiveMenuDesc) adminActiveMenuDesc.textContent = 'Kustomisasi teks dan judul pada 3 Slide Hero di halaman utama.';
    }

    if (targetSideBtn) {
        targetSideBtn.className = 'w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition sidebar-link-active';
    }
}

sideNavOverviewBtn.addEventListener('click', () => switchAdminTab('overview'));
tabPricesBtn.addEventListener('click', () => switchAdminTab('prices'));
tabOutletsBtn.addEventListener('click', () => switchAdminTab('outlets'));
tabCashiersBtn.addEventListener('click', () => switchAdminTab('cashiers'));
if (tabFinanceBtn) tabFinanceBtn.addEventListener('click', () => switchAdminTab('finance'));
tabTransactionsBtn.addEventListener('click', () => switchAdminTab('transactions'));
if (tabCustomersBtn) tabCustomersBtn.addEventListener('click', () => switchAdminTab('customers'));
tabSlidesBtn.addEventListener('click', () => switchAdminTab('slides'));

let currentRoleMode = localStorage.getItem('jantung_emas_admin_role') || 'SUPERADMIN';
const loginRoleSelect = document.getElementById('loginRoleSelect');
const activeRoleSwitcherSelect = document.getElementById('activeRoleSwitcherSelect');
const activeRoleBadgePill = document.getElementById('activeRoleBadgePill');

function getActiveBranchId() {
    if (currentRoleMode === 'SUPERADMIN') return null;
    const parts = String(currentRoleMode).split('_');
    return parts.length > 1 ? parseInt(parts[1]) : 1;
}

function getActiveRoleLabel() {
    const bId = getActiveBranchId();
    if (!bId) return 'SUPERADMIN (Semua Cabang)';
    const bObj = outlets.find(o => Number(o.id) === Number(bId));
    return bObj ? `ADMIN CABANG: ${bObj.name}` : `ADMIN CABANG #${bId}`;
}

function applyRolePermissionsUI() {
    const roleOptionsHtml = `<option value="SUPERADMIN">👑 Superadmin (Semua Cabang)</option>` +
        outlets.map(o => `<option value="BRANCH_${o.id}">🏢 Admin Cabang: ${o.name}</option>`).join('');
    if (activeRoleSwitcherSelect) {
        activeRoleSwitcherSelect.innerHTML = roleOptionsHtml;
        if (![...activeRoleSwitcherSelect.options].some(opt => opt.value === currentRoleMode)) {
            currentRoleMode = 'SUPERADMIN';
        }
        activeRoleSwitcherSelect.value = currentRoleMode;
    }
    if (loginRoleSelect) {
        loginRoleSelect.innerHTML = roleOptionsHtml;
        loginRoleSelect.value = currentRoleMode;
    }

    const isSuper = currentRoleMode === 'SUPERADMIN';
    const bId = getActiveBranchId();
    const bObj = outlets.find(o => Number(o.id) === Number(bId));

    if (activeRoleBadgePill) {
        if (isSuper) {
            activeRoleBadgePill.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black uppercase';
            activeRoleBadgePill.innerHTML = '<i class="fa-solid fa-crown text-amber-500"></i> SUPERADMIN • AKSES CRUD SEMUA CABANG, KEUANGAN & ROLE';
        } else {
            activeRoleBadgePill.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase';
            activeRoleBadgePill.innerHTML = `<i class="fa-solid fa-store text-emerald-600"></i> ADMIN CABANG (${bObj ? bObj.name : 'Cabang'}) • CRUD CABANG SENDIRI`;
        }
    }

    // Toggle Superadmin-only sections (Admin Cabang CRUD, Finance Users CRUD, Overview Finance Panel, Slide Hero)
    const saBranchAdminsSec = document.getElementById('superadminBranchAdminsSection');
    const saFinanceUsersSec = document.getElementById('superadminFinanceUsersSection');
    const saOverviewFinPanel = document.getElementById('superadminOverviewFinancePanel');
    const sideAccountsLbl = document.getElementById('sideNavAccountsLabel');
    const cashierSecTitle = document.getElementById('cashierSectionTitleText');
    const sidePortalFinLink = document.getElementById('sideNavPortalKeuanganLink');
    const saFinFullLink = document.getElementById('saFinFullScreenLink');
    const saFinTutupLink = document.getElementById('saFinTutupBukuLink');
    const saFinHdrTitle = document.getElementById('saFinHeaderTitle');
    const saFinHdrDesc = document.getElementById('saFinHeaderDesc');
    const saFinExLbl = document.getElementById('saFinExcelBtnLabel');
    const saFinPdfLbl = document.getElementById('saFinPdfBtnLabel');

    if (saBranchAdminsSec) saBranchAdminsSec.classList.toggle('hidden', !isSuper);
    if (saFinanceUsersSec) saFinanceUsersSec.classList.toggle('hidden', !isSuper);
    if (saOverviewFinPanel) saOverviewFinPanel.classList.toggle('hidden', !isSuper);

    // Menu Keuangan tetap tampil untuk Superadmin & Admin Cabang (Admin Cabang dikunci khusus cabangnya sendiri)
    if (tabFinanceBtn) {
        tabFinanceBtn.classList.remove('hidden');
        tabFinanceBtn.style.display = '';
    }

    // Menu Slide Hero KHUSUS hanya untuk Superadmin (dihilangkan dari tampilan Admin Cabang)
    if (tabSlidesBtn) {
        tabSlidesBtn.classList.toggle('hidden', !isSuper);
        tabSlidesBtn.style.display = isSuper ? '' : 'none';
    }
    if (!isSuper && tabSlidesContent && !tabSlidesContent.classList.contains('hidden')) {
        tabSlidesContent.classList.add('hidden');
    }

    // Sembunyikan link ke Portal Keuangan Pusat (Layar Penuh) bagi Admin Cabang
    if (sidePortalFinLink) {
        sidePortalFinLink.classList.toggle('hidden', !isSuper);
        sidePortalFinLink.style.display = isSuper ? '' : 'none';
    }
    if (saFinFullLink) {
        saFinFullLink.classList.toggle('hidden', !isSuper);
        saFinFullLink.style.display = isSuper ? '' : 'none';
    }
    if (saFinTutupLink) {
        saFinTutupLink.classList.toggle('hidden', !isSuper);
        saFinTutupLink.style.display = isSuper ? '' : 'none';
    }

    // Sesuaikan judul & tombol download di menu Keuangan untuk Superadmin vs Admin Cabang
    const branchLabelText = bObj ? bObj.name : `Cabang #${bId}`;
    if (saFinHdrTitle) {
        saFinHdrTitle.textContent = isSuper
            ? 'SISTEM AKUNTANSI & LAPORAN KEUANGAN KOMPLIT (SUPERADMIN)'
            : `LAPORAN KEUANGAN CABANG — ${branchLabelText.toUpperCase()} (ADMIN CABANG)`;
    }
    if (saFinHdrDesc) {
        saFinHdrDesc.textContent = isSuper
            ? 'Buku Besar, Neraca, Arus Kas, Biaya (6101–7106), Utang Usaha, Penjualan, Jurnal & Tutup Buku Terintegrasi.'
            : `Khusus ${branchLabelText}: Download Neraca, Laporan Laba Rugi, Arus Kas, Buku Besar & Jurnal Cabang Sendiri.`;
    }
    if (saFinExLbl) {
        saFinExLbl.textContent = isSuper
            ? 'Download Excel (.xls)'
            : `Download Neraca & Laba Rugi ${branchLabelText} (.xls)`;
    }
    if (saFinPdfLbl) {
        saFinPdfLbl.textContent = isSuper
            ? 'Download PDF / Cetak'
            : `Download PDF Neraca & Laba Rugi ${branchLabelText}`;
    }

    if (sideAccountsLbl) sideAccountsLbl.textContent = isSuper ? 'Akun Role (CRUD)' : 'Tim Kasir';
    if (cashierSecTitle) cashierSecTitle.textContent = isSuper ? '3. Kelola Akun Kasir Sesuai Cabang (CRUD Superadmin)' : `Kelola Akun Kasir Cabang (${bObj ? bObj.name : 'Cabang Ini'})`;

    // Toggle Add New Outlet Button (Hanya Superadmin bisa tambah cabang baru)
    const addOutletBtnEl = document.getElementById('addNewOutletBtn');
    if (addOutletBtnEl) {
        if (isSuper) {
            addOutletBtnEl.classList.remove('hidden');
        } else {
            addOutletBtnEl.classList.add('hidden');
        }
    }

    // Populate Report Branch Filter Dropdown
    const reportBranchSelect = document.getElementById('reportBranchSelect');
    if (reportBranchSelect) {
        const prevVal = reportBranchSelect.value;
        if (isSuper) {
            reportBranchSelect.disabled = false;
            reportBranchSelect.innerHTML = `<option value="ALL">Semua Cabang (All Outlets)</option>` +
                outlets.map(o => `<option value="${o.id}">${o.name}</option>`).join('');
            if (prevVal && [...reportBranchSelect.options].some(opt => opt.value === prevVal)) {
                reportBranchSelect.value = prevVal;
            }
        } else {
            reportBranchSelect.disabled = true;
            reportBranchSelect.innerHTML = `<option value="${bId}">${bObj ? bObj.name : 'Cabang Sendiri'} (Khusus Cabang Ini)</option>`;
            reportBranchSelect.value = String(bId);
        }
    }

    // Sinkronisasi dropdown cabang di Menu Keuangan (Superadmin vs Admin Cabang)
    const saleBranchSel = document.getElementById('saSaleBranch');
    const expBranchSel = document.getElementById('saExpBranch');
    const scopeBranchSel = document.getElementById('saFinBranchScope');
    if (saleBranchSel) {
        if (isSuper) {
            saleBranchSel.disabled = false;
            const prev = saleBranchSel.value;
            saleBranchSel.innerHTML = `<option value="Semua Cabang (Pusat)">Semua Cabang (Pusat)</option>` +
                outlets.map(o => `<option value="${o.name}">${o.name}</option>`).join('');
            if (prev && [...saleBranchSel.options].some(opt => opt.value === prev)) saleBranchSel.value = prev;
        } else {
            saleBranchSel.disabled = true;
            saleBranchSel.innerHTML = `<option value="${branchLabelText}">${branchLabelText}</option>`;
            saleBranchSel.value = branchLabelText;
        }
    }
    if (expBranchSel) {
        if (isSuper) {
            expBranchSel.disabled = false;
            const prev = expBranchSel.value;
            expBranchSel.innerHTML = outlets.map(o => `<option value="${o.id}">Cabang ${o.name}</option>`).join('');
            if (prev && [...expBranchSel.options].some(opt => opt.value === prev)) expBranchSel.value = prev;
        } else {
            expBranchSel.disabled = true;
            expBranchSel.innerHTML = `<option value="${bId}">Cabang ${branchLabelText}</option>`;
            expBranchSel.value = String(bId);
        }
    }
    if (scopeBranchSel) {
        if (isSuper) {
            scopeBranchSel.disabled = false;
            const prev = scopeBranchSel.value;
            scopeBranchSel.innerHTML = `<option value="ALL">Semua Cabang (Konsolidasi)</option>` +
                outlets.map(o => `<option value="${o.id}">Cabang ${o.name}</option>`).join('');
            if (prev && [...scopeBranchSel.options].some(opt => opt.value === prev)) scopeBranchSel.value = prev;
        } else {
            scopeBranchSel.disabled = true;
            scopeBranchSel.innerHTML = `<option value="${bId}">Cabang ${branchLabelText} (Khusus Cabang Sendiri)</option>`;
            scopeBranchSel.value = String(bId);
        }
    }
}

if (activeRoleSwitcherSelect) {
    activeRoleSwitcherSelect.addEventListener('change', (e) => {
        currentRoleMode = e.target.value;
        localStorage.setItem('jantung_emas_admin_role', currentRoleMode);
        applyRolePermissionsUI();
        if (currentRoleMode !== 'SUPERADMIN' && !tabSlidesContent.classList.contains('hidden')) {
            switchAdminTab('overview');
        } else if (!tabFinanceContent.classList.contains('hidden')) {
            switchAdminTab('finance');
        }
        renderAdminOutlets();
        if (typeof renderAdminBranchAdmins === 'function') renderAdminBranchAdmins();
        if (typeof renderAdminFinanceUsers === 'function') renderAdminFinanceUsers();
        renderAdminCashiers();
        renderAdminTransactions();
        if (typeof renderAdminCustomers === 'function') renderAdminCustomers();
        updateAllKpiCards();
        if (typeof renderSuperadminFinanceAll === 'function') renderSuperadminFinanceAll();
    });
}

submitLoginBtn.addEventListener('click', () => {
    const usernameEl = document.getElementById('loginUsernameInput');
    const username = (usernameEl ? usernameEl.value : '').trim().toLowerCase();
    const pin = loginPinInput.value.trim();

    if (!username || !pin) {
        loginErrorMsg.textContent = 'Silakan isi User ID dan Password terlebih dahulu!';
        loginErrorMsg.classList.remove('hidden');
        return;
    }

    // 1. Cek Akun Admin Cabang yang diatur Superadmin
    const matchedBranchAdmin = branchAdmins.find(adm =>
        String(adm.username || '').trim().toLowerCase() === username &&
        String(adm.pin || '').trim() === pin
    );

    // 2. Cek Akun Superadmin
    const isSuperAdminAccount = (
        (username === 'superadmin' || username === 'admin' || username === 'super_admin' || username === 'jei') &&
        (pin === '190212Aja' || pin === '1234')
    );

    if (isSuperAdminAccount) {
        currentRoleMode = 'SUPERADMIN';
        localStorage.setItem('jantung_emas_admin_role', currentRoleMode);
        if (activeRoleSwitcherSelect && activeRoleSwitcherSelect.parentElement) {
            activeRoleSwitcherSelect.parentElement.classList.remove('hidden');
        }
        loginErrorMsg.classList.add('hidden');
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        initDashboard();
    } else if (matchedBranchAdmin) {
        currentRoleMode = `BRANCH_${matchedBranchAdmin.outletId || 1}`;
        localStorage.setItem('jantung_emas_admin_role', currentRoleMode);
        if (activeRoleSwitcherSelect && activeRoleSwitcherSelect.parentElement) {
            activeRoleSwitcherSelect.parentElement.classList.add('hidden');
        }
        loginErrorMsg.classList.add('hidden');
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        initDashboard();
    } else {
        loginErrorMsg.textContent = 'User ID atau Password salah! Silakan coba kembali.';
        loginErrorMsg.classList.remove('hidden');
    }
});

const basePriceInput = document.getElementById('basePriceInput');
const lastUpdatedStatus = document.getElementById('lastUpdatedStatus');
const savePriceBtn = document.getElementById('savePriceBtn');
const adminPreviewTable = document.getElementById('adminPreviewTable');
const resetPercentBtn = document.getElementById('resetPercentBtn');

function parseTrxDateToISO(rawDateStr) {
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

function extractAdminInvoiceBranchCode(invoiceNo) {
    if (!invoiceNo) return '';
    const parts = String(invoiceNo).trim().split('.');
    if (parts.length >= 3 && parts[0].toUpperCase() === 'JEI') {
        return parts[1].trim().toUpperCase();
    }
    return '';
}

function isTransactionBelongingToBranch(t, branchId) {
    if (!t || !branchId) return false;
    const bObj = outlets.find(o => Number(o.id) === Number(branchId));
    const branchCashiers = cashiers.filter(c => Number(c.outletId) === Number(branchId));
    const otherCashiers = cashiers.filter(c => Number(c.outletId) !== Number(branchId));

    const myCodes = branchCashiers.map(c => (c.branchCode || '').trim().toUpperCase()).filter(Boolean);
    const otherCodes = otherCashiers.map(c => (c.branchCode || '').trim().toUpperCase()).filter(Boolean);
    const myNames = branchCashiers.map(c => (c.name || '').trim().toUpperCase()).filter(Boolean);
    const otherNames = otherCashiers.map(c => (c.name || '').trim().toUpperCase()).filter(Boolean);

    const invCode = (t.branchCode || extractAdminInvoiceBranchCode(t.invoiceNo)).toUpperCase();
    if (invCode) {
        if (myCodes.includes(invCode)) return true;
        if (otherCodes.includes(invCode)) return false;
    }

    const trxCashier = (t.cashierName || '').trim().toUpperCase();
    if (trxCashier) {
        if (myNames.includes(trxCashier)) return true;
        if (otherNames.includes(trxCashier)) return false;
    }

    if (t.outletId != null && Number(t.outletId) === Number(branchId)) return true;
    if (bObj && t.branchName && t.branchName.toLowerCase().includes(bObj.name.toLowerCase())) return true;
    return false;
}

function filterTransactionsByRole(allTrx) {
    const bId = getActiveBranchId();
    if (!bId) return allTrx;
    return allTrx.filter(t => isTransactionBelongingToBranch(t, bId));
}

function updateAllKpiCards() {
    const currentBase = parseInt(basePriceInput.value) || base24k;
    const k24Plus = karatData.find(k => k.name === '24K+') || { percent: 1.04 };
    const price24Plus = calcPrice(currentBase, k24Plus.percent);

    const elBase = document.getElementById('kpiBase24kVal');
    if (elBase) elBase.textContent = formatIDR(currentBase);
    const el24Plus = document.getElementById('kpi24kPlusVal');
    if (el24Plus) el24Plus.textContent = formatIDR(price24Plus);
    const elTooltip = document.getElementById('chartTooltipPrice');
    if (elTooltip) elTooltip.textContent = formatIDR(price24Plus);

    const bId = getActiveBranchId();
    const visibleOutlets = bId ? outlets.filter(o => Number(o.id) === Number(bId)) : outlets;
    const visibleCashiers = bId ? cashiers.filter(c => Number(c.outletId) === Number(bId)) : cashiers;

    const elOutletsCashiers = document.getElementById('kpiOutletsCashiersVal');
    if (elOutletsCashiers) elOutletsCashiers.textContent = `${visibleOutlets.length} Cabang / ${visibleCashiers.length} Kasir`;

    const branchDistEl = document.getElementById('overviewBranchDistributionList');
    if (branchDistEl) {
        const dotColors = ['bg-blue-600', 'bg-emerald-500', 'bg-orange-500', 'bg-purple-600', 'bg-rose-500'];
        branchDistEl.innerHTML = visibleOutlets.map((o, idx) => `
            <div class="flex items-center justify-between gap-2">
                <span class="flex items-center gap-1.5 font-bold text-slate-700 truncate" title="${o.name}">
                    <span class="w-2 h-2 rounded-full shrink-0 ${dotColors[idx % dotColors.length]}"></span>
                    <span class="truncate">${o.name.replace(/^Outlet\s+/i, '')}</span>
                </span>
                <span class="font-extrabold text-emerald-600 shrink-0">Aktif</span>
            </div>
        `).join('');
    }

    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const nowObj = new Date();
    const defaultTodayStr = `${String(nowObj.getDate()).padStart(2, '0')} ${monthsShort[nowObj.getMonth()]} ${nowObj.getFullYear()}`;

    function extractAdminDateOnly(rawDateStr) {
        if (!rawDateStr || rawDateStr === 'Hari Ini') return defaultTodayStr;
        const parts = String(rawDateStr).trim().split(/\s+/);
        if (parts.length >= 3) return `${parts[0]} ${parts[1]} ${parts[2]}`;
        return rawDateStr;
    }

    const allTransactions = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    const transactions = filterTransactionsByRole(allTransactions);
    const dataTrx = transactions.length > 0 ? transactions : [
        {
            invoiceNo: 'JEI.GS.SAMPLE',
            customerName: 'KEVIN RAFIF FELIATRA',
            dateStr: defaultTodayStr,
            grandTotal: price24Plus,
            items: [{ material: 'ANTAM', karat: '24K+', weight: 1, unitPrice: price24Plus }]
        }
    ];

    let totalVol = 0;
    let totalGramAll = 0;
    const gramByKarat = {};
    const customerMap = {};
    const byDateMap = {};

    dataTrx.forEach((t, idx) => {
        const nominal = Number(t.grandTotal) || 0;
        totalVol += nominal;
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
            customerMap[cName] = { name: cName, trxCount: 0, totalGram: 0 };
        }
        customerMap[cName].trxCount += 1;
        customerMap[cName].totalGram += trxGram;

        const dateKey = extractAdminDateOnly(t.dateStr);
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
    const cleanTotalGram = Number(totalGramAll.toFixed(2));
    const uniqueCustCount = transactions.length > 0 ? customerList.length : 1;

    const elAdminPengeluaran = document.getElementById('kpiAdminTotalPengeluaranVal');
    if (elAdminPengeluaran) elAdminPengeluaran.textContent = formatIDR(transactions.length > 0 ? totalVol : 0);
    const elAdminGram = document.getElementById('kpiAdminTotalGramVal');
    if (elAdminGram) elAdminGram.textContent = `${transactions.length > 0 ? cleanTotalGram : 0} Gram`;

    const elTotalTrx = document.getElementById('kpiTotalTrxVal');
    if (elTotalTrx) elTotalTrx.textContent = `${transactions.length} Nota`;
    const elAdminCustSub = document.getElementById('kpiAdminTotalCustSub');
    if (elAdminCustSub) elAdminCustSub.textContent = `${transactions.length > 0 ? customerList.length : 0} Customer • ${dateList.length} Tanggal`;
    const elTotalVolSub = document.getElementById('kpiTotalVolumeSub');
    if (elTotalVolSub) elTotalVolSub.textContent = `Pengeluaran Perusahaan (${dateList.length} Hari)`;
    const elNotif = document.getElementById('notifBadgeCount');
    if (elNotif) elNotif.textContent = transactions.length;

    const footerUpdated = document.getElementById('footerLastUpdatedText');
    if (footerUpdated) footerUpdated.textContent = lastUpdated;

    // Grafik 1 Admin: Perkembangan Pengeluaran Perusahaan Per Tanggal
    const adminBadgePengeluaran = document.getElementById('adminBadgeTotalPengeluaran');
    if (adminBadgePengeluaran) adminBadgePengeluaran.textContent = formatIDR(totalVol);
    const adminSumPengeluaran = document.getElementById('adminSummaryTotalPengeluaran');
    if (adminSumPengeluaran) adminSumPengeluaran.textContent = formatIDR(totalVol);

    const adminMoneyBars = document.getElementById('adminChartMoneyBars');
    const adminMoneyLabels = document.getElementById('adminChartMoneyLabels');
    if (adminMoneyBars && adminMoneyLabels) {
        const recentDates = dateList.slice(-5);
        const maxMoney = Math.max(...recentDates.map(d => d.totalPengeluaran || 0), 1);
        const barColors = [
            'from-emerald-600 to-emerald-400',
            'from-blue-600 to-blue-400',
            'from-purple-600 to-purple-400',
            'from-orange-500 to-amber-400',
            'from-cyan-600 to-cyan-400'
        ];
        adminMoneyBars.innerHTML = `
            <div class="flex-1 grid grid-cols-${Math.max(recentDates.length, 1)} gap-2.5 items-end h-full pt-2">
                ${recentDates.map((d, i) => {
            const val = d.totalPengeluaran || 0;
            const hPct = Math.max(18, Math.round((val / maxMoney) * 88));
            return `
                        <div class="flex flex-col items-center h-full justify-end">
                            <span class="text-[9px] font-extrabold text-slate-700 mb-1 leading-tight text-center">${formatIDR(val)}</span>
                            <div class="w-full max-w-[42px] rounded-t-lg bg-gradient-to-t ${barColors[i % barColors.length]} shadow-sm" style="height: ${hPct}%;"></div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
        adminMoneyLabels.className = `grid grid-cols-${Math.max(recentDates.length, 1)} gap-1.5 pt-2 text-center text-[10px] font-bold text-slate-600`;
        adminMoneyLabels.innerHTML = recentDates.map(d => {
            return `<span class="leading-tight">${d.dateLabel}</span>`;
        }).join('');
    }

    // Grafik 2 Admin: Jumlah Total Gram
    const adminBadgeGram = document.getElementById('adminBadgeTotalGram');
    if (adminBadgeGram) adminBadgeGram.textContent = `${cleanTotalGram} Gram`;
    const adminDonutGram = document.getElementById('adminDonutTotalGram');
    if (adminDonutGram) adminDonutGram.textContent = `${cleanTotalGram} Gr`;
    const adminAvgGram = document.getElementById('adminSummaryAvgGram');
    if (adminAvgGram) {
        const avgGr = dataTrx.length > 0 ? Number((totalGramAll / dataTrx.length).toFixed(2)) : 0;
        adminAvgGram.textContent = `${avgGr} Gram / Nota`;
    }
    const adminGramList = document.getElementById('adminGramBreakdownList');
    if (adminGramList) {
        const sortedKarats = Object.entries(gramByKarat).sort((a, b) => b[1] - a[1]).slice(0, 4);
        const dotColors = ['bg-[#7c3aed]', 'bg-[#10b981]', 'bg-[#2563eb]', 'bg-[#f97316]'];
        adminGramList.innerHTML = sortedKarats.map(([kName, grVal], idx) => {
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

    // Grafik 3 Admin: Perkembangan Transaksi Berdasarkan Jumlah Customer
    const adminBadgeCust = document.getElementById('adminBadgeCustRatio');
    if (adminBadgeCust) adminBadgeCust.textContent = `${uniqueCustCount} Cust • ${dataTrx.length} Nota`;
    const adminSumCust = document.getElementById('adminSummaryTotalCust');
    if (adminSumCust) adminSumCust.textContent = `${uniqueCustCount} Customer (${dataTrx.length} Transaksi)`;

    const topKaratEl = document.getElementById('overviewTopKaratList');
    if (topKaratEl) {
        const maxDateTrx = Math.max(...dateList.map(d => d.trxCount), 1);
        const rankBadgeColors = [
            'bg-blue-600 text-white shadow-sm',
            'bg-indigo-600 text-white',
            'bg-purple-600 text-white',
            'bg-emerald-600 text-white',
            'bg-amber-500 text-white'
        ];
        topKaratEl.innerHTML = dateList.slice(-5).reverse().map((d, i) => {
            const custCountOnDate = d.customerSet.size;
            const widthPct = Math.max(25, Math.round((d.trxCount / maxDateTrx) * 100));
            return `
                <div class="py-2 space-y-1">
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2 min-w-0">
                            <span class="w-5 h-5 rounded-full ${rankBadgeColors[i % rankBadgeColors.length]} font-extrabold text-[10px] flex items-center justify-center shrink-0">${i + 1}</span>
                            <span class="font-extrabold text-slate-800">${d.dateLabel}</span>
                        </div>
                        <span class="font-black text-blue-600 text-[11px] shrink-0">${custCountOnDate} Customer &bull; ${d.trxCount} Transaksi</span>
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

    // Populate Overview Branch Performance Table
    const branchTbody = document.getElementById('overviewBranchTableBody');
    if (branchTbody) {
        const greenSpark = `<svg viewBox="0 0 80 22" class="w-20 h-5 mx-auto"><polyline fill="none" stroke="#16a34a" stroke-width="2" points="4,16 20,10 36,14 52,7 74,4"/><circle cx="20" cy="10" r="2" fill="#16a34a"/><circle cx="52" cy="7" r="2" fill="#16a34a"/><circle cx="74" cy="4" r="2" fill="#16a34a"/></svg>`;
        branchTbody.innerHTML = visibleOutlets.map((o, idx) => {
            const branchCashiers = cashiers.filter(c => String(c.outletId) === String(o.id));
            const branchCode = branchCashiers[0]?.branchCode || (o.id === 1 ? 'JKT' : o.id === 2 ? 'GS' : 'BKS');
            const cashierNames = branchCashiers.map(c => c.name).join(', ') || 'Aktif';
            const branchTrx = allTransactions.filter(t => isTransactionBelongingToBranch(t, o.id));
            const branchVol = branchTrx.reduce((acc, t) => acc + (Number(t.grandTotal) || 0), 0);
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-3.5 font-extrabold text-[#0b132b]">${o.name}</td>
                    <td class="py-3 px-3 text-center font-mono text-blue-600 font-extrabold">JEI.${branchCode}</td>
                    <td class="py-3 px-3 text-center">${cashierNames} (${branchCashiers.length})</td>
                    <td class="py-3 px-3 text-center font-bold text-emerald-600">${formatIDR(price24Plus)}</td>
                    <td class="py-3 px-3 text-center font-bold">${branchTrx.length} Nota</td>
                    <td class="py-3 px-3 text-right font-extrabold text-[#0b132b]">${formatIDR(branchVol)}</td>
                    <td class="py-3 px-3 text-center">${greenSpark}</td>
                </tr>
            `;
        }).join('');
    }
    if (typeof renderSuperadminFinanceAll === 'function') renderSuperadminFinanceAll();
}

function initDashboard() {
    updateGreeting();
    basePriceInput.value = base24k;
    lastUpdatedStatus.textContent = lastUpdated;
    applyRolePermissionsUI();
    renderPreviewTable(base24k);
    renderAdminOutlets();
    populateSlidesForm();
    if (typeof renderAdminBranchAdmins === 'function') renderAdminBranchAdmins();
    if (typeof renderAdminFinanceUsers === 'function') renderAdminFinanceUsers();
    renderAdminCashiers();
    renderAdminTransactions();
    if (typeof renderAdminCustomers === 'function') renderAdminCustomers();
    updateAllKpiCards();
    if (typeof renderSuperadminFinanceAll === 'function') renderSuperadminFinanceAll();
    switchAdminTab('overview');
}

basePriceInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value) || DEFAULT_BASE;
    renderPreviewTable(val);
    updateAllKpiCards();
});

function renderPreviewTable(val, filterQuery = '') {
    adminPreviewTable.innerHTML = '';
    const q = filterQuery.trim().toLowerCase();

    karatData.forEach((item, idx) => {
        if (q && !item.name.toLowerCase().includes(q)) return;

        const calculated = calcPrice(val, item.percent);
        const safeName = item.name.replace('+', 'plus');
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50/90 transition';

        let badgeCat = `<span class="px-2.5 py-1 rounded-lg bg-[#efeaff] text-[#5945f5] font-bold text-[10px]">Logam Mulia / Tua</span>`;
        let statusPill = `<span class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-500 font-extrabold text-[10px]">High</span>`;
        if (idx >= 6 && idx < 14) {
            badgeCat = `<span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 font-bold text-[10px]">Perhiasan Standar</span>`;
            statusPill = `<span class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 font-extrabold text-[10px]">Medium</span>`;
        } else if (idx >= 14) {
            badgeCat = `<span class="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-600 font-bold text-[10px]">Emas Muda</span>`;
            statusPill = `<span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 font-extrabold text-[10px]">Low</span>`;
        }

        tr.innerHTML = `
            <td class="py-3 px-4">
                <div class="flex items-center gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                        <i class="fa-solid fa-check"></i>
                    </span>
                    <span class="font-extrabold text-slate-800 text-xs">${item.name}</span>
                </div>
            </td>
            <td class="py-3 px-4">${badgeCat}</td>
            <td class="py-2 px-4 text-center">
                <input type="number" step="0.001" min="0" max="5" value="${item.percent}" data-karat="${item.name}" class="percent-input w-24 bg-slate-50 border border-slate-200 focus:border-[#6351f7] focus:bg-white rounded-xl px-2.5 py-1.5 text-center text-[#5945f5] font-mono font-extrabold text-xs focus:outline-none transition">
            </td>
            <td class="py-3 px-4 text-right font-extrabold text-slate-800 text-xs" id="calc-price-${safeName}">${formatIDR(calculated)}</td>
            <td class="py-3 px-4 text-center">${statusPill}</td>
        `;
        adminPreviewTable.appendChild(tr);
    });

    adminPreviewTable.querySelectorAll('.percent-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const karatName = e.target.getAttribute('data-karat');
            const newPct = parseFloat(e.target.value);
            const targetItem = karatData.find(k => k.name === karatName);
            if (targetItem && !isNaN(newPct)) {
                targetItem.percent = newPct;
                const currentBase = parseInt(basePriceInput.value) || DEFAULT_BASE;
                const newCalc = calcPrice(currentBase, newPct);
                const safeName = karatName.replace('+', 'plus');
                const priceEl = document.getElementById(`calc-price-${safeName}`);
                if (priceEl) priceEl.textContent = formatIDR(newCalc);
                updateAllKpiCards();
            }
        });
    });
}

if (resetPercentBtn) {
    resetPercentBtn.addEventListener('click', () => {
        if (confirm('Kembalikan semua persentase ke nilai default?')) {
            karatData = JSON.parse(JSON.stringify(DEFAULT_KARAT_DATA));
            const currentBase = parseInt(basePriceInput.value) || DEFAULT_BASE;
            renderPreviewTable(currentBase);
            updateAllKpiCards();
        }
    });
}

function savePricesAction() {
    const newPrice = parseInt(basePriceInput.value);
    if (isNaN(newPrice) || newPrice < 100000) {
        alert('Silakan masukkan harga 24K yang valid!');
        return;
    }

    base24k = newPrice;
    lastUpdated = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

    localStorage.setItem('jantung_emas_base_24k', base24k);
    localStorage.setItem('jantung_emas_karat_data', JSON.stringify(karatData));
    localStorage.setItem('jantung_emas_last_update', lastUpdated);

    lastUpdatedStatus.textContent = lastUpdated;
    updateAllKpiCards();
    alert(`Berhasil!\nHarga Acuan 24K (${formatIDR(base24k)}) dan Persentase 20 Kadar telah disimpan & langsung aktif di Landing Page serta Kasir.`);
}

savePriceBtn.addEventListener('click', savePricesAction);

// Global Search Bar Filter
const globalSearchEl = document.getElementById('globalAdminSearch');
if (globalSearchEl) {
    globalSearchEl.addEventListener('input', (e) => {
        const q = e.target.value;
        renderPreviewTable(parseInt(basePriceInput.value) || base24k, q);
        renderAdminTransactions(q);
        if (typeof renderAdminCustomers === 'function') renderAdminCustomers(q);
        if (typeof renderAdminBranchAdmins === 'function') renderAdminBranchAdmins(q);
        if (typeof renderAdminFinanceUsers === 'function') renderAdminFinanceUsers(q);
    });
}

// --- OUTLET MANAGEMENT (Role-Aware: Superadmin vs Admin Cabang) ---
const adminOutletsList = document.getElementById('adminOutletsList');
const outletModal = document.getElementById('outletModal');
const outletModalTitle = document.getElementById('outletModalTitle');
const addNewOutletBtn = document.getElementById('addNewOutletBtn');
const closeOutletModalBtn = document.getElementById('closeOutletModalBtn');
const saveOutletBtn = document.getElementById('saveOutletBtn');

const outletEditId = document.getElementById('outletEditId');
const outletNameInput = document.getElementById('outletNameInput');
const outletTaglineInput = document.getElementById('outletTaglineInput');
const outletAddressInput = document.getElementById('outletAddressInput');
const outletMapInput = document.getElementById('outletMapInput');
const outletWaInput = document.getElementById('outletWaInput');
const outletHoursInput = document.getElementById('outletHoursInput');

function renderAdminOutlets() {
    if (!adminOutletsList) return;
    adminOutletsList.innerHTML = '';

    const bId = getActiveBranchId();
    const isSuper = currentRoleMode === 'SUPERADMIN';
    const listToRender = isSuper ? outlets : outlets.filter(o => Number(o.id) === Number(bId));

    listToRender.forEach(outlet => {
        const card = document.createElement('div');
        card.className = 'bg-slate-50/90 border border-slate-200/80 p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:shadow-md transition';
        card.innerHTML = `
            <div class="space-y-2.5">
                <div class="flex justify-between items-start gap-2">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl icon-3d-mint text-white flex items-center justify-center text-sm shrink-0">
                            <i class="fa-solid fa-store"></i>
                        </div>
                        <div>
                            <h3 class="text-sm font-extrabold text-slate-800">${outlet.name}</h3>
                            ${outlet.tagline ? `<span class="text-[11px] text-[#6351f7] font-bold">${outlet.tagline}</span>` : ''}
                        </div>
                    </div>
                    <div class="flex gap-1.5">
                        <button onclick="editOutlet(${outlet.id})" class="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-[#6351f7] text-slate-600 hover:text-[#6351f7] flex items-center justify-center text-xs transition" title="Edit Cabang">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        ${isSuper ? `
                        <button onclick="deleteOutlet(${outlet.id})" class="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-rose-400 text-slate-600 hover:text-rose-500 flex items-center justify-center text-xs transition" title="Hapus Cabang">
                            <i class="fa-solid fa-trash"></i>
                        </button>` : ''}
                    </div>
                </div>
                <p class="text-xs text-slate-600 leading-relaxed"><i class="fa-solid fa-location-dot text-[#6351f7] mr-1.5"></i> ${outlet.address}</p>
                <div class="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                    <span><i class="fa-brands fa-whatsapp text-emerald-500 mr-1"></i> +${outlet.whatsapp}</span>
                    <a href="${outlet.mapUrl}" target="_blank" class="text-[#6351f7] font-bold hover:underline">Buka Maps &rarr;</a>
                </div>
            </div>
        `;
        adminOutletsList.appendChild(card);
    });
}

addNewOutletBtn.addEventListener('click', () => {
    if (currentRoleMode !== 'SUPERADMIN') {
        alert('Akses Ditolak: Hanya Superadmin yang dapat menambahkan cabang baru.');
        return;
    }
    outletModalTitle.textContent = 'Tambah Cabang Baru';
    outletEditId.value = '';
    outletNameInput.value = '';
    outletTaglineInput.value = '';
    outletAddressInput.value = '';
    outletMapInput.value = '';
    outletWaInput.value = '6282122126634';
    outletHoursInput.value = '08.00 - 21.00 WIB';
    outletModal.classList.remove('hidden');
});

closeOutletModalBtn.addEventListener('click', () => outletModal.classList.add('hidden'));

window.editOutlet = function (id) {
    const bId = getActiveBranchId();
    if (bId && Number(id) !== Number(bId)) {
        alert('Akses Ditolak: Admin Cabang hanya dapat mengubah data cabangnya sendiri.');
        return;
    }
    const outlet = outlets.find(o => o.id === id);
    if (!outlet) return;
    outletModalTitle.textContent = 'Edit Data Cabang';
    outletEditId.value = outlet.id;
    outletNameInput.value = outlet.name;
    outletTaglineInput.value = outlet.tagline || '';
    outletAddressInput.value = outlet.address;
    outletMapInput.value = outlet.mapUrl;
    outletWaInput.value = outlet.whatsapp;
    outletHoursInput.value = outlet.hours || '08.00 - 21.00 WIB';
    outletModal.classList.remove('hidden');
};

function propagateBranchUpdatesEverywhere(updatedOutletId, newName, newAddress) {
    if (!updatedOutletId) return;
    // 1. Sinkronkan nama & alamat cabang pada transaksi nota kasir (jantung_emas_transactions)
    const trxRaw = localStorage.getItem('jantung_emas_transactions');
    if (trxRaw) {
        let allTrx = JSON.parse(trxRaw) || [];
        let changed = false;
        allTrx = allTrx.map(t => {
            if (isTransactionBelongingToBranch(t, updatedOutletId)) {
                changed = true;
                return {
                    ...t,
                    outletId: Number(updatedOutletId),
                    branchName: newName || t.branchName,
                    branchAddress: newAddress || t.branchAddress
                };
            }
            return t;
        });
        if (changed) {
            localStorage.setItem('jantung_emas_transactions', JSON.stringify(allTrx));
        }
    }
    // 2. Sinkronkan nama cabang pada penjualan emas (jantung_emas_fin_sales)
    const salesRaw = localStorage.getItem('jantung_emas_fin_sales');
    if (salesRaw) {
        let allSales = JSON.parse(salesRaw) || [];
        let sChanged = false;
        allSales = allSales.map(s => {
            if (Number(s.outletId) === Number(updatedOutletId)) {
                sChanged = true;
                return { ...s, branchName: newName };
            }
            return s;
        });
        if (sChanged) {
            localStorage.setItem('jantung_emas_fin_sales', JSON.stringify(allSales));
        }
    }
    // 3. Sinkronkan nama cabang pada pengeluaran biaya (jantung_emas_fin_expenses)
    const expRaw = localStorage.getItem('jantung_emas_fin_expenses');
    if (expRaw) {
        let allExp = JSON.parse(expRaw) || [];
        let eChanged = false;
        allExp = allExp.map(e => {
            if (Number(e.outletId) === Number(updatedOutletId)) {
                eChanged = true;
                return { ...e, branchName: newName };
            }
            return e;
        });
        if (eChanged) {
            localStorage.setItem('jantung_emas_fin_expenses', JSON.stringify(allExp));
        }
    }
}

function refreshAllBranchDependentViews() {
    applyRolePermissionsUI();
    renderAdminOutlets();
    if (typeof renderAdminBranchAdmins === 'function') renderAdminBranchAdmins();
    if (typeof renderAdminFinanceUsers === 'function') renderAdminFinanceUsers();
    renderAdminCashiers();
    renderAdminTransactions();
    if (typeof renderAdminCustomers === 'function') renderAdminCustomers();
    updateAllKpiCards();
    if (typeof renderSuperadminFinanceAll === 'function') renderSuperadminFinanceAll();
}

window.deleteOutlet = function (id) {
    if (currentRoleMode !== 'SUPERADMIN') {
        alert('Akses Ditolak: Hanya Superadmin yang dapat menghapus cabang.');
        return;
    }
    if (confirm('Apakah Anda yakin ingin menghapus cabang ini?')) {
        outlets = outlets.filter(o => o.id !== id);
        localStorage.setItem('jantung_emas_outlets', JSON.stringify(outlets));
        refreshAllBranchDependentViews();
    }
};

saveOutletBtn.addEventListener('click', () => {
    const name = outletNameInput.value.trim();
    const address = outletAddressInput.value.trim();
    const mapUrl = outletMapInput.value.trim();
    const whatsapp = outletWaInput.value.trim();
    const tagline = outletTaglineInput.value.trim();
    const hours = outletHoursInput.value.trim();

    if (!name || !address || !mapUrl || !whatsapp) {
        alert('Silakan lengkapi semua kolom wajib!');
        return;
    }

    const editId = outletEditId.value;
    if (editId) {
        const index = outlets.findIndex(o => o.id == editId);
        if (index !== -1) {
            outlets[index] = { id: parseInt(editId), name, tagline, address, mapUrl, whatsapp, hours };
        }
        propagateBranchUpdatesEverywhere(parseInt(editId), name, address);
    } else {
        if (currentRoleMode !== 'SUPERADMIN') {
            alert('Hanya Superadmin yang dapat menambah cabang baru!');
            return;
        }
        const newId = outlets.length > 0 ? Math.max(...outlets.map(o => o.id)) + 1 : 1;
        outlets.push({ id: newId, name, tagline, address, mapUrl, whatsapp, hours });
    }

    localStorage.setItem('jantung_emas_outlets', JSON.stringify(outlets));
    refreshAllBranchDependentViews();
    outletModal.classList.add('hidden');
    alert('Data cabang berhasil disimpan & disinkronkan ke seluruh portal (Superadmin, Admin, Keuangan & Kasir)!');
});

// --- HERO SLIDES MANAGEMENT ---
const saveAllSlidesBtn = document.getElementById('saveAllSlidesBtn');

function populateSlidesForm() {
    const s1 = slides[0] || DEFAULT_SLIDES[0];
    const s2 = slides[1] || DEFAULT_SLIDES[1];
    const s3 = slides[2] || DEFAULT_SLIDES[2];

    document.getElementById('slide1Badge').value = s1.badge || '';
    document.getElementById('slide1Title').value = s1.title || '';
    document.getElementById('slide1Subtitle').value = s1.subtitle || '';
    document.getElementById('slide1Image').value = (!s1.image || s1.image === 'logo.png') ? 'assets/logo.png' : s1.image;

    document.getElementById('slide2Badge').value = s2.badge || '';
    document.getElementById('slide2Title').value = s2.title || '';
    document.getElementById('slide2Subtitle').value = s2.subtitle || '';
    document.getElementById('slide2Image').value = (!s2.image || s2.image === 'logo.png') ? 'assets/logo.png' : s2.image;

    document.getElementById('slide3Badge').value = s3.badge || '';
    document.getElementById('slide3Title').value = s3.title || '';
    document.getElementById('slide3Subtitle').value = s3.subtitle || '';
    document.getElementById('slide3Image').value = (!s3.image || s3.image === 'logo.png') ? 'assets/logo.png' : s3.image;
}

if (saveAllSlidesBtn) {
    saveAllSlidesBtn.addEventListener('click', () => {
        slides = [
            {
                id: 1,
                badge: document.getElementById('slide1Badge').value.trim(),
                title: document.getElementById('slide1Title').value.trim(),
                subtitle: document.getElementById('slide1Subtitle').value.trim(),
                image: document.getElementById('slide1Image').value.trim() || 'assets/logo.png'
            },
            {
                id: 2,
                badge: document.getElementById('slide2Badge').value.trim(),
                title: document.getElementById('slide2Title').value.trim(),
                subtitle: document.getElementById('slide2Subtitle').value.trim(),
                image: document.getElementById('slide2Image').value.trim() || 'assets/logo.png'
            },
            {
                id: 3,
                badge: document.getElementById('slide3Badge').value.trim(),
                title: document.getElementById('slide3Title').value.trim(),
                subtitle: document.getElementById('slide3Subtitle').value.trim(),
                image: document.getElementById('slide3Image').value.trim() || 'assets/logo.png'
            }
        ];
        localStorage.setItem('jantung_emas_slides', JSON.stringify(slides));
        alert('Berhasil! Ketiga Slide Hero telah diperbarui.');
    });
}

// --- CASHIERS MANAGEMENT (Role-Aware: Superadmin vs Admin Cabang) ---
const adminCashiersList = document.getElementById('adminCashiersList');
const cashierModal = document.getElementById('cashierModal');
const cashierModalTitle = document.getElementById('cashierModalTitle');
const addNewCashierBtn = document.getElementById('addNewCashierBtn');
const closeCashierModalBtn = document.getElementById('closeCashierModalBtn');
const saveCashierBtn = document.getElementById('saveCashierBtn');

const cashierEditId = document.getElementById('cashierEditId');
const cashierNameInput = document.getElementById('cashierNameInput');
const cashierUsernameInput = document.getElementById('cashierUsernameInput');
const cashierPinInput = document.getElementById('cashierPinInput');
const cashierOutletSelect = document.getElementById('cashierOutletSelect');
const cashierBranchCodeInput = document.getElementById('cashierBranchCodeInput');

function populateCashierOutletDropdown(selectedId) {
    if (!cashierOutletSelect) return;
    cashierOutletSelect.innerHTML = '';
    const bId = getActiveBranchId();
    const availableOutlets = bId ? outlets.filter(o => Number(o.id) === Number(bId)) : outlets;
    availableOutlets.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.id;
        opt.textContent = `${o.name} (${o.address.split(',')[0]})`;
        if (String(o.id) === String(selectedId)) opt.selected = true;
        cashierOutletSelect.appendChild(opt);
    });
    cashierOutletSelect.disabled = Boolean(bId);
}

function renderAdminCashiers() {
    if (!adminCashiersList) return;
    adminCashiersList.innerHTML = '';

    const bId = getActiveBranchId();
    const listCashiers = bId ? cashiers.filter(c => Number(c.outletId) === Number(bId)) : cashiers;

    listCashiers.forEach(c => {
        const branch = outlets.find(o => String(o.id) === String(c.outletId)) || { name: 'Cabang JEI', address: '-' };
        const card = document.createElement('div');
        card.className = 'bg-slate-50/90 border border-slate-200/80 p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:shadow-md transition';
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl icon-3d-blue text-white flex items-center justify-center font-extrabold text-sm">
                            <i class="fa-solid fa-user-check"></i>
                        </div>
                        <div>
                            <h3 class="text-sm font-extrabold text-slate-800 uppercase">${c.name}</h3>
                            <span class="text-[11px] text-[#6351f7] font-bold">Kode Nota: JEI.${c.branchCode || 'GS'}.xxxx</span>
                        </div>
                    </div>
                    <div class="flex gap-1.5">
                        <button onclick="editCashier(${c.id})" class="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-[#6351f7] text-slate-600 hover:text-[#6351f7] flex items-center justify-center text-xs transition" title="Edit Akun Kasir">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="deleteCashier(${c.id})" class="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-rose-400 text-slate-600 hover:text-rose-500 flex items-center justify-center text-xs transition" title="Hapus Akun Kasir">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>

                <div class="bg-white border border-slate-200/70 rounded-xl p-3 space-y-1.5 text-xs">
                    <p class="text-slate-700"><i class="fa-solid fa-store text-[#6351f7] w-5"></i> Cabang: <strong>${branch.name}</strong></p>
                    <p class="text-slate-500"><i class="fa-solid fa-location-dot text-slate-400 w-5"></i> ${branch.address}</p>
                    <p class="text-slate-700"><i class="fa-solid fa-key text-amber-500 w-5"></i> User: <code class="text-[#6351f7] font-bold">${c.username}</code> | PIN: <code class="text-emerald-600 font-bold">${c.pin}</code></p>
                </div>
            </div>
        `;
        adminCashiersList.appendChild(card);
    });
}

if (addNewCashierBtn) {
    addNewCashierBtn.addEventListener('click', () => {
        const bId = getActiveBranchId();
        const defaultOutletId = bId || outlets[0]?.id || 1;
        cashierModalTitle.textContent = bId ? 'Tambah Akun Kasir (Cabang Ini)' : 'Tambah Akun Kasir Baru';
        cashierEditId.value = '';
        cashierNameInput.value = '';
        cashierUsernameInput.value = '';
        cashierPinInput.value = '1234';
        cashierBranchCodeInput.value = defaultOutletId === 1 ? 'JKT' : defaultOutletId === 2 ? 'GS' : 'BKS';
        populateCashierOutletDropdown(defaultOutletId);
        cashierModal.classList.remove('hidden');
    });
}

if (closeCashierModalBtn) {
    closeCashierModalBtn.addEventListener('click', () => cashierModal.classList.add('hidden'));
}

window.editCashier = function (id) {
    const c = cashiers.find(item => item.id === id);
    if (!c) return;
    const bId = getActiveBranchId();
    if (bId && Number(c.outletId) !== Number(bId)) {
        alert('Akses Ditolak: Admin Cabang hanya dapat mengubah kasir di cabangnya sendiri.');
        return;
    }
    cashierModalTitle.textContent = 'Edit Akun Kasir';
    cashierEditId.value = c.id;
    cashierNameInput.value = c.name;
    cashierUsernameInput.value = c.username;
    cashierPinInput.value = c.pin;
    cashierBranchCodeInput.value = c.branchCode || 'GS';
    populateCashierOutletDropdown(c.outletId);
    cashierModal.classList.remove('hidden');
};

window.deleteCashier = function (id) {
    const c = cashiers.find(item => item.id === id);
    const bId = getActiveBranchId();
    if (bId && c && Number(c.outletId) !== Number(bId)) {
        alert('Akses Ditolak: Admin Cabang hanya dapat menghapus kasir di cabangnya sendiri.');
        return;
    }
    if (confirm('Apakah Anda yakin ingin menghapus akun kasir ini?')) {
        cashiers = cashiers.filter(item => item.id !== id);
        localStorage.setItem('jantung_emas_cashiers', JSON.stringify(cashiers));
        renderAdminCashiers();
        updateAllKpiCards();
    }
};

if (saveCashierBtn) {
    saveCashierBtn.addEventListener('click', () => {
        const name = cashierNameInput.value.trim().toUpperCase();
        const username = cashierUsernameInput.value.trim().toLowerCase();
        const pin = cashierPinInput.value.trim();
        const bId = getActiveBranchId();
        const outletId = bId ? Number(bId) : parseInt(cashierOutletSelect.value);
        const branchCode = cashierBranchCodeInput.value.trim().toUpperCase() || 'GS';

        if (!name || !username || !pin || !outletId) {
            alert('Silakan lengkapi Nama Kasir, Username, PIN, dan Cabang!');
            return;
        }

        const editId = cashierEditId.value;
        if (editId) {
            const idx = cashiers.findIndex(item => item.id == editId);
            if (idx !== -1) {
                cashiers[idx] = { id: parseInt(editId), name, username, pin, outletId, branchCode };
            }
        } else {
            const newId = cashiers.length > 0 ? Math.max(...cashiers.map(i => i.id)) + 1 : 1;
            cashiers.push({ id: newId, name, username, pin, outletId, branchCode });
        }

        localStorage.setItem('jantung_emas_cashiers', JSON.stringify(cashiers));
        renderAdminCashiers();
        updateAllKpiCards();
        cashierModal.classList.add('hidden');
        alert(`Akun Kasir "${name}" berhasil disimpan!`);
    });
}

// --- SUPERADMIN CRUD: AKUN ADMIN CABANG ---
const adminBranchAdminsList = document.getElementById('adminBranchAdminsList');
const addNewBranchAdminBtn = document.getElementById('addNewBranchAdminBtn');
const branchAdminModal = document.getElementById('branchAdminModal');
const branchAdminModalTitle = document.getElementById('branchAdminModalTitle');
const branchAdminEditId = document.getElementById('branchAdminEditId');
const branchAdminNameInput = document.getElementById('branchAdminNameInput');
const branchAdminUsernameInput = document.getElementById('branchAdminUsernameInput');
const branchAdminPinInput = document.getElementById('branchAdminPinInput');
const branchAdminOutletSelect = document.getElementById('branchAdminOutletSelect');
const closeBranchAdminModalBtn = document.getElementById('closeBranchAdminModalBtn');
const saveBranchAdminBtn = document.getElementById('saveBranchAdminBtn');

function populateBranchAdminOutletSelect(selectedOutletId = null) {
    if (!branchAdminOutletSelect) return;
    branchAdminOutletSelect.innerHTML = outlets.map(o => `<option value="${o.id}">${o.name}</option>`).join('');
    if (selectedOutletId) branchAdminOutletSelect.value = String(selectedOutletId);
}

function renderAdminBranchAdmins(filterQuery = '') {
    if (!adminBranchAdminsList) return;
    adminBranchAdminsList.innerHTML = '';
    const q = filterQuery.trim().toLowerCase();

    branchAdmins.forEach(adm => {
        const outletObj = outlets.find(o => Number(o.id) === Number(adm.outletId));
        const outletName = outletObj ? outletObj.name : `Cabang #${adm.outletId}`;
        if (q && !adm.name.toLowerCase().includes(q) && !adm.username.toLowerCase().includes(q) && !outletName.toLowerCase().includes(q)) return;

        const card = document.createElement('div');
        card.className = 'bg-slate-50/90 rounded-2xl p-4 border border-indigo-100 hover:border-indigo-300 hover:bg-white hover:shadow-md transition flex flex-col justify-between';
        card.innerHTML = `
            <div>
                <div class="flex items-start justify-between gap-2 mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-black shadow-sm">
                            <i class="fa-solid fa-user-tie"></i>
                        </div>
                        <div>
                            <h4 class="font-extrabold text-slate-900 text-sm">${adm.name}</h4>
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mt-0.5">
                                <i class="fa-solid fa-store"></i> ${outletName}
                            </span>
                        </div>
                    </div>
                    <span class="px-2 py-1 rounded-lg bg-indigo-600 text-white font-mono font-extrabold text-[10px]">ADMIN CABANG</span>
                </div>
                <div class="bg-white rounded-xl p-3 border border-slate-200/80 space-y-1.5 text-xs mb-3">
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-semibold">Username:</span>
                        <span class="font-mono font-bold text-slate-800">${adm.username}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-semibold">PIN Login:</span>
                        <span class="font-mono font-bold text-indigo-600">${adm.pin}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-semibold">Hak Akses:</span>
                        <span class="font-bold text-emerald-700">${adm.status || 'CRUD Cabang Sendiri'}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-200/70">
                <button onclick="switchRoleToBranchAdmin(${adm.outletId})" class="text-[11px] font-extrabold text-indigo-600 hover:underline flex items-center gap-1">
                    <i class="fa-solid fa-eye"></i> Simulasikan Role
                </button>
                <div class="flex gap-1.5">
                    <button onclick="editBranchAdmin(${adm.id})" class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center gap-1">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button onclick="deleteBranchAdmin(${adm.id})" class="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        adminBranchAdminsList.appendChild(card);
    });
}

window.switchRoleToBranchAdmin = function (outletId) {
    currentRoleMode = `BRANCH_${outletId}`;
    localStorage.setItem('jantung_emas_admin_role', currentRoleMode);
    applyRolePermissionsUI();
    renderAdminOutlets();
    renderAdminCashiers();
    renderAdminTransactions();
    updateAllKpiCards();
    switchAdminTab('overview');
};

if (addNewBranchAdminBtn) {
    addNewBranchAdminBtn.addEventListener('click', () => {
        if (currentRoleMode !== 'SUPERADMIN') {
            alert('Akses Ditolak: Hanya Superadmin yang dapat menambah Admin Cabang.');
            return;
        }
        branchAdminModalTitle.textContent = 'Tambah Akun Admin Cabang';
        branchAdminEditId.value = '';
        branchAdminNameInput.value = '';
        branchAdminUsernameInput.value = '';
        branchAdminPinInput.value = '1234';
        populateBranchAdminOutletSelect(outlets[0]?.id || 1);
        branchAdminModal.classList.remove('hidden');
    });
}

if (closeBranchAdminModalBtn) {
    closeBranchAdminModalBtn.addEventListener('click', () => branchAdminModal.classList.add('hidden'));
}

window.editBranchAdmin = function (id) {
    if (currentRoleMode !== 'SUPERADMIN') {
        alert('Akses Ditolak: Hanya Superadmin yang dapat mengedit Admin Cabang.');
        return;
    }
    const adm = branchAdmins.find(item => Number(item.id) === Number(id));
    if (!adm) return;
    branchAdminModalTitle.textContent = 'Edit Akun Admin Cabang';
    branchAdminEditId.value = adm.id;
    branchAdminNameInput.value = adm.name;
    branchAdminUsernameInput.value = adm.username;
    branchAdminPinInput.value = adm.pin;
    populateBranchAdminOutletSelect(adm.outletId);
    branchAdminModal.classList.remove('hidden');
};

window.deleteBranchAdmin = function (id) {
    if (currentRoleMode !== 'SUPERADMIN') {
        alert('Akses Ditolak: Hanya Superadmin yang dapat menghapus Admin Cabang.');
        return;
    }
    const adm = branchAdmins.find(item => Number(item.id) === Number(id));
    if (!adm) return;
    if (confirm(`Hapus Akun Admin Cabang "${adm.name}"?`)) {
        branchAdmins = branchAdmins.filter(item => Number(item.id) !== Number(id));
        localStorage.setItem('jantung_emas_branch_admins', JSON.stringify(branchAdmins));
        renderAdminBranchAdmins();
    }
};

if (saveBranchAdminBtn) {
    saveBranchAdminBtn.addEventListener('click', () => {
        const name = branchAdminNameInput.value.trim().toUpperCase();
        const username = branchAdminUsernameInput.value.trim().toLowerCase();
        const pin = branchAdminPinInput.value.trim();
        const outletId = parseInt(branchAdminOutletSelect.value) || 1;

        if (!name || !username || !pin) {
            alert('Silakan lengkapi Nama Admin Cabang, Username, dan PIN!');
            return;
        }

        const editId = branchAdminEditId.value;
        if (editId) {
            const idx = branchAdmins.findIndex(item => Number(item.id) === Number(editId));
            if (idx !== -1) {
                branchAdmins[idx] = { id: parseInt(editId), name, username, pin, outletId, status: 'Aktif (CRUD Cabang Sendiri)' };
            }
        } else {
            const newId = branchAdmins.length > 0 ? Math.max(...branchAdmins.map(i => Number(i.id) || 0)) + 1 : 1;
            branchAdmins.push({ id: newId, name, username, pin, outletId, status: 'Aktif (CRUD Cabang Sendiri)' });
        }

        localStorage.setItem('jantung_emas_branch_admins', JSON.stringify(branchAdmins));
        renderAdminBranchAdmins();
        branchAdminModal.classList.add('hidden');
        alert(`Akun Admin Cabang "${name}" berhasil disimpan!`);
    });
}

// --- SUPERADMIN CRUD: AKUN STAF KEUANGAN ---
const adminFinanceUsersList = document.getElementById('adminFinanceUsersList');
const addNewFinanceUserBtn = document.getElementById('addNewFinanceUserBtn');
const financeUserModal = document.getElementById('financeUserModal');
const financeUserModalTitle = document.getElementById('financeUserModalTitle');
const financeUserEditId = document.getElementById('financeUserEditId');
const financeUserNameInput = document.getElementById('financeUserNameInput');
const financeUserUsernameInput = document.getElementById('financeUserUsernameInput');
const financeUserPinInput = document.getElementById('financeUserPinInput');
const financeUserScopeSelect = document.getElementById('financeUserScopeSelect');
const closeFinanceUserModalBtn = document.getElementById('closeFinanceUserModalBtn');
const saveFinanceUserBtn = document.getElementById('saveFinanceUserBtn');

function getFinanceScopeLabel(scopeVal) {
    if (!scopeVal || scopeVal === 'HEAD_FINANCE') return 'Keuangan Pusat (Konsolidasi Semua Cabang)';
    if (String(scopeVal).startsWith('FIN_BRANCH_')) {
        const bId = parseInt(String(scopeVal).split('_')[2]);
        const o = outlets.find(item => Number(item.id) === Number(bId));
        if (o) return `Keuangan Cabang: ${o.name}`;
    }
    return scopeVal;
}

function populateFinanceScopeSelect(selectedScope = 'HEAD_FINANCE') {
    if (!financeUserScopeSelect) return;
    financeUserScopeSelect.innerHTML = `<option value="HEAD_FINANCE">Keuangan Pusat (Konsolidasi Semua Cabang)</option>` +
        outlets.map(o => `<option value="FIN_BRANCH_${o.id}">Keuangan Cabang: ${o.name}</option>`).join('');
    financeUserScopeSelect.value = selectedScope || 'HEAD_FINANCE';
}

function renderAdminFinanceUsers(filterQuery = '') {
    if (!adminFinanceUsersList) return;
    adminFinanceUsersList.innerHTML = '';
    const q = filterQuery.trim().toLowerCase();

    financeUsers.forEach(fu => {
        const scopeLabel = fu.roleTitle || getFinanceScopeLabel(fu.scope);
        if (q && !fu.name.toLowerCase().includes(q) && !fu.username.toLowerCase().includes(q) && !scopeLabel.toLowerCase().includes(q)) return;

        const card = document.createElement('div');
        card.className = 'bg-slate-50/90 rounded-2xl p-4 border border-emerald-100 hover:border-emerald-300 hover:bg-white hover:shadow-md transition flex flex-col justify-between';
        card.innerHTML = `
            <div>
                <div class="flex items-start justify-between gap-2 mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-black shadow-sm">
                            <i class="fa-solid fa-scale-balanced"></i>
                        </div>
                        <div>
                            <h4 class="font-extrabold text-slate-900 text-sm">${fu.name}</h4>
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-0.5">
                                <i class="fa-solid fa-file-invoice-dollar"></i> ${scopeLabel}
                            </span>
                        </div>
                    </div>
                    <span class="px-2 py-1 rounded-lg bg-emerald-600 text-white font-mono font-extrabold text-[10px]">ROLE KEUANGAN</span>
                </div>
                <div class="bg-white rounded-xl p-3 border border-slate-200/80 space-y-1.5 text-xs mb-3">
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-semibold">Username:</span>
                        <span class="font-mono font-bold text-slate-800">${fu.username}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-semibold">PIN Keuangan:</span>
                        <span class="font-mono font-bold text-emerald-600">${fu.pin}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-semibold">Modul Akses:</span>
                        <span class="font-bold text-slate-700">${fu.accessScope || 'Full Accounting (6101-7106)'}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-200/70">
                <a href="keuangan_jei.html" class="text-[11px] font-extrabold text-emerald-600 hover:underline flex items-center gap-1">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Portal Keuangan
                </a>
                <div class="flex gap-1.5">
                    <button type="button" onclick="editFinanceUser(${fu.id})" class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition flex items-center gap-1">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button type="button" onclick="deleteFinanceUser(${fu.id})" class="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        adminFinanceUsersList.appendChild(card);
    });
}

if (addNewFinanceUserBtn) {
    addNewFinanceUserBtn.addEventListener('click', () => {
        if (currentRoleMode !== 'SUPERADMIN') {
            alert('Akses Ditolak: Hanya Superadmin yang dapat menambah Akun Keuangan.');
            return;
        }
        financeUserModalTitle.textContent = 'Tambah Akun Staf Keuangan';
        financeUserEditId.value = '';
        financeUserNameInput.value = '';
        financeUserUsernameInput.value = '';
        financeUserPinInput.value = '1234';
        populateFinanceScopeSelect('HEAD_FINANCE');
        financeUserModal.classList.remove('hidden');
    });
}

if (closeFinanceUserModalBtn) {
    closeFinanceUserModalBtn.addEventListener('click', () => financeUserModal.classList.add('hidden'));
}

window.editFinanceUser = function (id) {
    if (currentRoleMode !== 'SUPERADMIN') {
        alert('Akses Ditolak: Hanya Superadmin yang dapat mengedit Akun Keuangan.');
        return;
    }
    const fu = financeUsers.find(item => Number(item.id) === Number(id));
    if (!fu) return;
    financeUserModalTitle.textContent = 'Edit Akun Staf Keuangan';
    financeUserEditId.value = fu.id;
    financeUserNameInput.value = fu.name;
    financeUserUsernameInput.value = fu.username;
    financeUserPinInput.value = fu.pin;
    populateFinanceScopeSelect(fu.scope || 'HEAD_FINANCE');
    financeUserModal.classList.remove('hidden');
};

window.deleteFinanceUser = function (id) {
    if (currentRoleMode !== 'SUPERADMIN') {
        alert('Akses Ditolak: Hanya Superadmin yang dapat menghapus Akun Keuangan.');
        return;
    }
    const fu = financeUsers.find(item => Number(item.id) === Number(id));
    if (!fu) return;
    if (confirm(`Hapus Akun Keuangan "${fu.name}"?`)) {
        financeUsers = financeUsers.filter(item => Number(item.id) !== Number(id));
        localStorage.setItem('jantung_emas_finance_users', JSON.stringify(financeUsers));
        renderAdminFinanceUsers();
    }
};

if (saveFinanceUserBtn) {
    saveFinanceUserBtn.addEventListener('click', () => {
        const name = financeUserNameInput.value.trim().toUpperCase();
        const username = financeUserUsernameInput.value.trim().toLowerCase();
        const pin = financeUserPinInput.value.trim();
        const scope = financeUserScopeSelect ? financeUserScopeSelect.value : 'HEAD_FINANCE';
        const roleTitle = getFinanceScopeLabel(scope);

        if (!name || !username || !pin) {
            alert('Silakan lengkapi Nama Staf Keuangan, Username, dan PIN!');
            return;
        }

        const editId = financeUserEditId.value;
        if (editId) {
            const idx = financeUsers.findIndex(item => Number(item.id) === Number(editId));
            if (idx !== -1) {
                financeUsers[idx] = { id: parseInt(editId), name, username, pin, scope, roleTitle, accessScope: 'Buku Besar, Neraca, Arus Kas, Biaya (6101-7106), Utang, Penjualan, Jurnal & Tutup Buku' };
            }
        } else {
            const newId = financeUsers.length > 0 ? Math.max(...financeUsers.map(i => Number(i.id) || 0)) + 1 : 1;
            financeUsers.push({ id: newId, name, username, pin, scope, roleTitle, accessScope: 'Buku Besar, Neraca, Arus Kas, Biaya (6101-7106), Utang, Penjualan, Jurnal & Tutup Buku' });
        }

        localStorage.setItem('jantung_emas_finance_users', JSON.stringify(financeUsers));
        renderAdminFinanceUsers();
        financeUserModal.classList.add('hidden');
        alert(`Akun Staf Keuangan "${name}" berhasil disimpan!`);
    });
}

// --- SUPERADMIN INTEGRATED FINANCE ENGINE (100% SINKRON DENGAN KEUANGAN.HTML) ---
const SA_COA_LIST = [
    { code: '1101', name: 'Kas & Bank (Modal Kerja)', type: 'ASET', normal: 'DEBIT', opening: 0 },
    { code: '1102', name: 'Persediaan Emas (Stok Emas)', type: 'ASET', normal: 'DEBIT', opening: 0 },
    { code: '1103', name: 'Piutang Usaha / Peleburan', type: 'ASET', normal: 'DEBIT', opening: 0 },
    { code: '1201', name: 'Peralatan & Inventaris Cabang', type: 'ASET', normal: 'DEBIT', opening: 0 },
    { code: '2101', name: 'Utang Usaha / Pinjaman Modal', type: 'LIABILITAS', normal: 'KREDIT', opening: 0 },
    { code: '3101', name: 'Modal Disetor PT Jantung Emas Indonesia', type: 'EKUITAS', normal: 'KREDIT', opening: 0 },
    { code: '3102', name: 'Laba Ditahan', type: 'EKUITAS', normal: 'KREDIT', opening: 0 },
    { code: '3201', name: 'Laba Bersih Periode Berjalan', type: 'EKUITAS', normal: 'KREDIT', opening: 0 },
    { code: '4101', name: 'Pendapatan Penjualan / Peleburan Emas', type: 'PENDAPATAN', normal: 'KREDIT', opening: 0 },
    { code: '5101', name: 'Harga Pokok Penjualan Emas (HPP)', type: 'HPP', normal: 'DEBIT', opening: 0 },
    { code: '6101', name: 'Beban Gaji', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6102', name: 'Beban Bonus/Insentif', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6103', name: 'Beban Sewa', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6104', name: 'Beban Listrik', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6105', name: 'Beban Air', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6106', name: 'Beban Internet', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6107', name: 'Beban Keamanan', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6108', name: 'Beban Transportasi', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6109', name: 'Beban BBM', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6110', name: 'Beban Promosi & Iklan', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6111', name: 'Beban ATK', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6112', name: 'Beban Administrasi', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6113', name: 'Beban Reparasi & Pemeliharaan', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6114', name: 'Beban Penyusutan', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6115', name: 'Beban Asuransi', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6116', name: 'Beban Kebersihan', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6117', name: 'Beban Legal & Perizinan', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6118', name: 'Beban Bank & Administrasi', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '6119', name: 'Beban Lain-lain', type: 'BEBAN', normal: 'DEBIT', opening: 0 },
    { code: '7101', name: 'Beban Berbagi/Amal', type: 'BEBAN_SOSIAL', normal: 'DEBIT', opening: 0 },
    { code: '7102', name: 'Bantuan Sosial', type: 'BEBAN_SOSIAL', normal: 'DEBIT', opening: 0 },
    { code: '7103', name: 'Santunan Karyawan', type: 'BEBAN_SOSIAL', normal: 'DEBIT', opening: 0 },
    { code: '7104', name: 'Program Masyarakat', type: 'BEBAN_SOSIAL', normal: 'DEBIT', opening: 0 },
    { code: '7105', name: 'Donasi', type: 'BEBAN_SOSIAL', normal: 'DEBIT', opening: 0 },
    { code: '7106', name: 'Program Jantung Emas', type: 'BEBAN_SOSIAL', normal: 'DEBIT', opening: 0 }
];

const SA_DEFAULT_MANUAL_JOURNALS = [
    {
        id: 'MJ-INIT-1',
        date: '2026-01-01',
        refNo: 'JU.MODAL.001',
        debitCode: '1101',
        creditCode: '3101',
        amount: 450000000,
        outletId: 0,
        description: 'Setoran Modal Awal Kas & Bank PT Jantung Emas Indonesia'
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

function getOutletNameById(outletId, fallbackName) {
    if (outletId != null && Number(outletId) > 0) {
        const o = outlets.find(item => Number(item.id) === Number(outletId));
        if (o) return o.name;
    }
    if (fallbackName) return fallbackName;
    if (!outletId || Number(outletId) === 0) return 'Semua Cabang (Pusat)';
    return `Cabang #${outletId}`;
}

function ensureDefaultFinanceStorage() {
    if (!localStorage.getItem('jantung_emas_fin_journals')) {
        localStorage.setItem('jantung_emas_fin_journals', JSON.stringify(SA_DEFAULT_MANUAL_JOURNALS));
    }
}
ensureDefaultFinanceStorage();

function parseIsoFinanceDate(rawStr) {
    const now = new Date();
    const fallbackISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    if (!rawStr || rawStr === 'Hari Ini') return fallbackISO;
    const s = String(rawStr).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    const map = { jan: '01', feb: '02', mar: '03', apr: '04', mei: '05', may: '05', jun: '06', jul: '07', agu: '08', aug: '08', sep: '09', okt: '10', oct: '10', nov: '11', des: '12', dec: '12' };
    const parts = s.split(/\s+/);
    if (parts.length >= 3) {
        const day = String(parseInt(parts[0]) || 1).padStart(2, '0');
        const mon = map[parts[1].toLowerCase().slice(0, 3)] || '01';
        const yr = parts[2].length === 4 ? parts[2] : String(now.getFullYear());
        return `${yr}-${mon}-${day}`;
    }
    return fallbackISO;
}

(function initSaFinFilters() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const sEl = document.getElementById('saFinStartDate');
    const eEl = document.getElementById('saFinEndDate');
    const mEl = document.getElementById('saFinMonth');
    const yEl = document.getElementById('saFinYear');
    if (sEl) sEl.value = `${yyyy}-${mm}-01`;
    if (eEl) eEl.value = `${yyyy}-${mm}-${dd}`;
    if (mEl) mEl.value = mm;
    if (yEl) yEl.value = String(yyyy);

    const saleDate = document.getElementById('saSaleDate');
    const expDate = document.getElementById('saExpDate');
    const apDate = document.getElementById('saApDate');
    const apDue = document.getElementById('saApDue');
    if (saleDate) saleDate.value = `${yyyy}-${mm}-${dd}`;
    if (expDate) expDate.value = `${yyyy}-${mm}-${dd}`;
    if (apDate) apDate.value = `${yyyy}-${mm}-${dd}`;
    if (apDue) apDue.value = `${yyyy}-${mm}-28`;

    const modeEl = document.getElementById('saFinPeriodMode');
    if (modeEl) {
        modeEl.addEventListener('change', () => {
            const mode = modeEl.value.toLowerCase();
            document.getElementById('saFinStartWrap')?.classList.toggle('hidden', mode !== 'date_range');
            document.getElementById('saFinEndWrap')?.classList.toggle('hidden', mode !== 'date_range');
            document.getElementById('saFinMonthWrap')?.classList.toggle('hidden', mode !== 'monthly');
            document.getElementById('saFinYearWrap')?.classList.toggle('hidden', mode !== 'monthly' && mode !== 'yearly');
            renderSuperadminFinanceAll();
        });
    }
    ['saFinStartDate', 'saFinEndDate', 'saFinMonth', 'saFinYear', 'saFinBranchScope', 'saLedgerAccountFilter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', () => renderSuperadminFinanceAll());
    });
})();

function isInSaFinPeriod(isoDate, allowOpening = false) {
    if (allowOpening && isoDate === '2026-01-01') return true;
    const mode = (document.getElementById('saFinPeriodMode')?.value || 'all').toLowerCase();
    if (mode === 'all' || !isoDate) return true;
    if (mode === 'date_range') {
        const s = document.getElementById('saFinStartDate')?.value || '0000-01-01';
        const e = document.getElementById('saFinEndDate')?.value || '9999-12-31';
        return isoDate >= s && isoDate <= e;
    }
    if (mode === 'monthly') {
        const m = document.getElementById('saFinMonth')?.value || '10';
        const y = document.getElementById('saFinYear')?.value || '2026';
        return isoDate.startsWith(`${y}-${m}`);
    }
    if (mode === 'yearly') {
        const y = document.getElementById('saFinYear')?.value || '2026';
        return isoDate.startsWith(`${y}-`);
    }
    return true;
}

function getActiveSaFinScope() {
    if (currentRoleMode !== 'SUPERADMIN') {
        return String(getActiveBranchId() || 1);
    }
    return document.getElementById('saFinBranchScope')?.value || 'ALL';
}

function getActiveSaFinScopeLabel() {
    const scope = getActiveSaFinScope();
    if (scope === 'ALL') return 'Semua Cabang (Konsolidasi)';
    const bObj = outlets.find(o => String(o.id) === String(scope));
    return bObj ? bObj.name : `Cabang #${scope}`;
}

function getActiveSaFinPeriodLabel() {
    const mode = (document.getElementById('saFinPeriodMode')?.value || 'all').toLowerCase();
    if (mode === 'date_range') {
        const s = document.getElementById('saFinStartDate')?.value || '-';
        const e = document.getElementById('saFinEndDate')?.value || '-';
        return `Rentang Tanggal: ${s} s/d ${e}`;
    }
    if (mode === 'monthly') {
        const mEl = document.getElementById('saFinMonth');
        const mTxt = mEl && mEl.selectedIndex >= 0 ? mEl.options[mEl.selectedIndex].text : (mEl?.value || '');
        const y = document.getElementById('saFinYear')?.value || '2026';
        return `Bulanan: ${mTxt} ${y}`;
    }
    if (mode === 'yearly') {
        const y = document.getElementById('saFinYear')?.value || '2026';
        return `Tahunan: Tahun ${y}`;
    }
    return 'Semua Periode (Akumulasi)';
}

function matchesSaFinBranch(outletIdOrName, branchName = '', posTrxObj = null) {
    const scope = getActiveSaFinScope();
    if (scope === 'ALL') return true;
    if (posTrxObj) {
        return isTransactionBelongingToBranch(posTrxObj, scope);
    }
    if (outletIdOrName != null && String(outletIdOrName) === String(scope)) return true;
    const bObj = outlets.find(o => String(o.id) === String(scope));
    if (!bObj) return false;
    const targetName = bObj.name.toLowerCase();
    const targetCode = (bObj.code || '').toLowerCase();
    const combined = `${outletIdOrName || ''} ${branchName || ''}`.toLowerCase();
    if (targetName && combined.includes(targetName)) return true;
    if (targetCode && combined.includes(targetCode)) return true;
    return false;
}

function buildSaAllJournals() {
    const posTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    const finSales = JSON.parse(localStorage.getItem('jantung_emas_fin_sales')) || [];
    const finExpenses = JSON.parse(localStorage.getItem('jantung_emas_fin_expenses')) || [];
    const finPayables = JSON.parse(localStorage.getItem('jantung_emas_fin_payables')) || [];
    const manualJournals = JSON.parse(localStorage.getItem('jantung_emas_fin_journals')) || SA_DEFAULT_MANUAL_JOURNALS;

    const entries = [];

    // 1. Jurnal Manual & Modal Awal (1101 / 1201 vs 3101)
    manualJournals.forEach(j => {
        const iso = parseIsoFinanceDate(j.date);
        if (!isInSaFinPeriod(iso, true) || !matchesSaFinBranch(j.outletId)) return;
        const dCode = String(j.debitCode || j.debitAcc || '1101');
        const cCode = String(j.creditCode || j.creditAcc || '3101');
        const nom = Number(j.amount ?? j.nominal) || 0;
        entries.push({
            id: j.id,
            date: iso,
            ref: j.refNo || j.id,
            source: 'JURNAL UMUM',
            branchName: getOutletNameById(j.outletId, 'Pusat'),
            desc: j.description || j.desc || 'Jurnal Umum',
            debitAcc: dCode,
            creditAcc: cCode,
            nominal: nom
        });
    });

    // 2. Pembelian Emas dari Nota Kasir (Debit 1102 Persediaan Emas, Kredit 1101 Kas & Bank)
    posTrx.forEach(t => {
        const iso = parseIsoFinanceDate(t.dateStr || t.isoDate || t.timestamp);
        if (!isInSaFinPeriod(iso) || !matchesSaFinBranch(t.outletId, t.branchName || '', t)) return;
        const nom = Number(t.grandTotal) || 0;
        if (nom <= 0) return;
        entries.push({
            id: `JRN-POS-${t.id}`,
            date: iso,
            ref: t.invoiceNo || `POS-${t.id}`,
            source: 'KASIR POS',
            branchName: getOutletNameById(t.outletId, t.branchName || 'Cabang'),
            desc: `Pembelian Emas Customer (${t.customerName || 'Umum'})`,
            debitAcc: '1102',
            creditAcc: '1101',
            nominal: nom
        });
    });

    // 3. Penjualan Emas (Debit 1101 / Kredit 4101 & Debit 5101 HPP / Kredit 1102 Persediaan Emas)
    finSales.forEach(s => {
        const iso = parseIsoFinanceDate(s.date);
        const bName = getOutletNameById(s.outletId, s.branchName);
        if (!isInSaFinPeriod(iso) || !matchesSaFinBranch(s.outletId, bName)) return;
        const total = Number(s.totalSale ?? s.total) || 0;
        const hpp = Number(s.cogs ?? s.hpp) || 0;
        entries.push({
            id: `JRN-${s.id}`,
            date: iso,
            ref: s.invoiceNo || s.id,
            source: 'PENJUALAN',
            branchName: bName,
            desc: `Penjualan Emas ke ${s.buyer} (${s.weight} gr)`,
            debitAcc: '1101',
            creditAcc: '4101',
            nominal: total
        });
        if (hpp > 0) {
            entries.push({
                id: `JRN-HPP-${s.id}`,
                date: iso,
                ref: `${s.invoiceNo || s.id}-HPP`,
                source: 'HPP EMAS',
                branchName: bName,
                desc: `HPP Peleburan/Penjualan Emas (${s.buyer})`,
                debitAcc: '5101',
                creditAcc: '1102',
                nominal: hpp
            });
        }
    });

    // 4. Biaya Operasional & Sosial (6101-6119 & 7101-7106)
    finExpenses.forEach(e => {
        const iso = parseIsoFinanceDate(e.date);
        const bName = getOutletNameById(e.outletId, e.branchName);
        if (!isInSaFinPeriod(iso) || !matchesSaFinBranch(e.outletId, bName)) return;
        const code = String(e.accountCode || e.accCode || '6119');
        const nom = Number(e.amount ?? e.nominal) || 0;
        const descTxt = e.description || e.desc || '-';
        const coa = SA_COA_LIST.find(c => c.code === code);
        entries.push({
            id: `JRN-${e.id}`,
            date: iso,
            ref: e.refNo || e.id,
            source: code.startsWith('71') ? 'SOSIAL/CSR' : 'BIAYA OPS',
            branchName: bName,
            desc: `${coa ? coa.name : (e.accName || 'Beban')} - ${descTxt}`,
            debitAcc: code,
            creditAcc: '1101',
            nominal: nom
        });
    });

    // 5. Utang Usaha & Pelunasan Utang (Sama persis dengan keuangan.html)
    finPayables.forEach(ap => {
        const iso = parseIsoFinanceDate(ap.date);
        if (!isInSaFinPeriod(iso, true) || !matchesSaFinBranch(ap.outletId)) return;
        const nom = Number(ap.amount ?? ap.nominal) || 0;
        const paid = ap.status === 'LUNAS' ? nom : (Number(ap.paidAmount) || 0);
        entries.push({
            id: `JRN-${ap.id}`,
            date: iso,
            ref: ap.refNo || ap.id,
            source: 'UTANG USAHA',
            branchName: getOutletNameById(ap.outletId, 'Pusat'),
            desc: `Penerimaan Utang Usaha / Modal Kerja: ${ap.vendor}`,
            debitAcc: '1101',
            creditAcc: '2101',
            nominal: nom
        });
        if (paid > 0) {
            entries.push({
                id: `JRN-PAY-${ap.id}`,
                date: iso,
                ref: `${ap.refNo || ap.id}-BYR`,
                source: 'PELUNASAN AP',
                branchName: getOutletNameById(ap.outletId, 'Pusat'),
                desc: `Pembayaran/Pelunasan Utang Usaha: ${ap.vendor}`,
                debitAcc: '2101',
                creditAcc: '1101',
                nominal: paid
            });
        }
    });

    // 6. Piutang Usaha & Pelunasan Piutang (1103)
    const finReceivables = JSON.parse(localStorage.getItem('jantung_emas_fin_receivables')) || [];
    finReceivables.forEach(ar => {
        const iso = parseIsoFinanceDate(ar.date);
        const bName = getOutletNameById(ar.outletId, 'Pusat');
        if (!isInSaFinPeriod(iso, true) || !matchesSaFinBranch(ar.outletId, bName)) return;
        const nom = Number(ar.amount) || 0;
        const paid = Number(ar.paidAmount) || 0;
        entries.push({
            id: `JRN-AR-${ar.id}`,
            date: iso,
            ref: ar.refNo || ar.id,
            source: 'PIUTANG USAHA',
            branchName: bName,
            desc: `Pencatatan Piutang Usaha: ${ar.debtor} (${ar.description || ''})`,
            debitAcc: '1103',
            creditAcc: '4101',
            nominal: nom
        });
        if (paid > 0) {
            entries.push({
                id: `JRN-AR-PAID-${ar.id}`,
                date: iso,
                ref: `${ar.refNo || ar.id}/RCV`,
                source: 'PELUNASAN PIUTANG',
                branchName: bName,
                desc: `Penerimaan Pelunasan Piutang Usaha dari ${ar.debtor}`,
                debitAcc: '1101',
                creditAcc: '1103',
                nominal: paid
            });
        }
    });

    // 7. Jurnal Penyesuaian (Adjusting Journal Entries / AJP)
    const finAdjustments = JSON.parse(localStorage.getItem('jantung_emas_fin_adjustments')) || [];
    finAdjustments.forEach(adj => {
        const iso = parseIsoFinanceDate(adj.date);
        const bName = getOutletNameById(adj.outletId, 'Pusat / Konsolidasi');
        if (!isInSaFinPeriod(iso, true) || !matchesSaFinBranch(adj.outletId, bName)) return;
        entries.push({
            id: `JRN-AJP-${adj.id}`,
            date: iso,
            ref: adj.refNo || adj.id,
            source: 'JURNAL PENYESUAIAN',
            branchName: bName,
            desc: adj.description || 'Penyesuaian Akuntansi',
            debitAcc: adj.debitCode,
            creditAcc: adj.creditCode,
            nominal: Number(adj.amount) || 0
        });
    });

    return entries.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
}

function computeSaFinSummary() {
    const entries = buildSaAllJournals();
    const balances = {};
    SA_COA_LIST.forEach(c => {
        balances[c.code] = { ...c, debitTotal: 0, creditTotal: 0, ending: c.opening };
    });

    entries.forEach(e => {
        const nom = Number(e.nominal) || 0;
        if (balances[e.debitAcc]) balances[e.debitAcc].debitTotal += nom;
        if (balances[e.creditAcc]) balances[e.creditAcc].creditTotal += nom;
    });

    Object.values(balances).forEach(acc => {
        if (acc.normal === 'DEBIT') {
            acc.ending = acc.opening + acc.debitTotal - acc.creditTotal;
        } else {
            acc.ending = acc.opening + acc.creditTotal - acc.debitTotal;
        }
    });

    // Hitung Gram Emas (Beli dari Kasir vs Terjual ke Buyer) sama persis dengan keuangan.html
    const posTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    let purchasedGram = 0;
    posTrx.forEach(t => {
        const iso = parseIsoFinanceDate(t.dateStr || t.isoDate || t.timestamp);
        if (!isInSaFinPeriod(iso) || !matchesSaFinBranch(t.outletId, t.branchName || '', t)) return;
        (t.items || []).forEach(it => { purchasedGram += parseFloat(it.weight) || 0; });
    });

    const finSales = JSON.parse(localStorage.getItem('jantung_emas_fin_sales')) || [];
    let soldGram = 0;
    finSales.forEach(s => {
        const iso = parseIsoFinanceDate(s.date);
        const bName = getOutletNameById(s.outletId, s.branchName);
        if (!isInSaFinPeriod(iso) || !matchesSaFinBranch(s.outletId, bName)) return;
        soldGram += Number(s.weight) || 0;
    });

    const purchasedGramClean = Number(purchasedGram.toFixed(2));
    const soldGramClean = Number(soldGram.toFixed(2));
    const stockGram = Number((purchasedGram - soldGram).toFixed(2));

    const totalRevenue = balances['4101']?.ending || 0;
    const totalHpp = balances['5101']?.ending || 0;
    const grossProfit = totalRevenue - totalHpp;

    const operationalExpenseCodes = [
        '6101', '6102', '6103', '6104', '6105', '6106', '6107', '6108', '6109', '6110',
        '6111', '6112', '6113', '6114', '6115', '6116', '6117', '6118', '6119'
    ];
    const socialExpenseCodes = ['7101', '7102', '7103', '7104', '7105', '7106'];

    const totalOpExpenses = operationalExpenseCodes.reduce((s, code) => s + (balances[code]?.ending || 0), 0);
    const totalSocialExpenses = socialExpenseCodes.reduce((s, code) => s + (balances[code]?.ending || 0), 0);
    const totalExpenses = totalOpExpenses + totalSocialExpenses;
    const netProfit = grossProfit - totalExpenses;

    balances['3201'].ending = netProfit;

    const totalAssets = (balances['1101']?.ending || 0) + (balances['1102']?.ending || 0) + (balances['1103']?.ending || 0) + (balances['1201']?.ending || 0);
    const totalLiabilities = balances['2101']?.ending || 0;
    const totalEquity = (balances['3101']?.ending || 0) + (balances['3102']?.ending || 0) + (balances['3201']?.ending || 0);

    return {
        entries,
        balances,
        purchasedGram: purchasedGramClean,
        soldGram: soldGramClean,
        stockGram,
        totalRevenue,
        totalHpp,
        grossProfit,
        totalOpExpenses,
        totalSocialExpenses,
        totalExpenses,
        netProfit,
        totalAssets,
        totalLiabilities,
        totalEquity
    };
}

function renderSuperadminFinanceAll() {
    const isSuper = currentRoleMode === 'SUPERADMIN';
    const bId = getActiveBranchId();
    const bObj = outlets.find(o => Number(o.id) === Number(bId));
    const branchLabelText = bObj ? bObj.name : `Cabang #${bId || 1}`;

    // Pastikan filter cabang terkunci untuk Admin Cabang sebelum menghitung ringkasan
    const saleBranchSel = document.getElementById('saSaleBranch');
    const expBranchSel = document.getElementById('saExpBranch');
    const scopeBranchSel = document.getElementById('saFinBranchScope');
    if (scopeBranchSel) {
        if (isSuper) {
            scopeBranchSel.disabled = false;
            if (scopeBranchSel.options.length <= 1) {
                scopeBranchSel.innerHTML = `<option value="ALL">Semua Cabang (Konsolidasi)</option>` +
                    outlets.map(o => `<option value="${o.id}">Cabang ${o.name}</option>`).join('');
            }
        } else {
            scopeBranchSel.disabled = true;
            scopeBranchSel.innerHTML = `<option value="${bId}">Cabang ${branchLabelText} (Khusus Cabang Sendiri)</option>`;
            scopeBranchSel.value = String(bId);
        }
    }
    if (saleBranchSel) {
        if (isSuper) {
            saleBranchSel.disabled = false;
            if (saleBranchSel.options.length <= 1) {
                saleBranchSel.innerHTML = `<option value="Semua Cabang (Pusat)">Semua Cabang (Pusat)</option>` +
                    outlets.map(o => `<option value="${o.name}">${o.name}</option>`).join('');
            }
        } else {
            saleBranchSel.disabled = true;
            saleBranchSel.innerHTML = `<option value="${branchLabelText}">${branchLabelText}</option>`;
            saleBranchSel.value = branchLabelText;
        }
    }
    if (expBranchSel) {
        if (isSuper) {
            expBranchSel.disabled = false;
            if (expBranchSel.options.length <= 1) {
                expBranchSel.innerHTML = outlets.map(o => `<option value="${o.id}">Cabang ${o.name}</option>`).join('');
            }
        } else {
            expBranchSel.disabled = true;
            expBranchSel.innerHTML = `<option value="${bId}">Cabang ${branchLabelText}</option>`;
            expBranchSel.value = String(bId);
        }
    }

    const sum = computeSaFinSummary();
    const b = sum.balances;
    const activeScopeLabel = getActiveSaFinScopeLabel();

    // Populate dropdowns inside Superadmin Finance Tab if needed
    const ledgerFilter = document.getElementById('saLedgerAccountFilter');
    if (ledgerFilter && ledgerFilter.options.length <= 1) {
        ledgerFilter.innerHTML = `<option value="ALL">Semua Akun Buku Besar (COA 1101 - 7106)</option>` +
            SA_COA_LIST.map(c => `<option value="${c.code}">${c.code} - ${c.name}</option>`).join('');
    }

    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    // 0. Update 4 Kartu KPI Utama di Atas Halaman
    setTxt('kpiAdminFinCashVal', formatIDR(b['1101'].ending));
    setTxt('kpiAdminFinCashSub', isSuper ? 'Modal + Penjualan - Pengeluaran' : `Kas Aktif ${branchLabelText}`);
    setTxt('kpiAdminFinInventoryVal', formatIDR(b['1102'].ending));
    setTxt('kpiAdminFinInventorySub', `Stok Bersih: ${sum.stockGram} Gram (Beli ${sum.purchasedGram}g / Jual ${sum.soldGram}g)`);
    setTxt('kpiAdminFinSalesVal', formatIDR(sum.totalRevenue));
    setTxt('kpiAdminFinSalesSub', `Laba Kotor: ${formatIDR(sum.grossProfit)}`);
    setTxt('kpiAdminFinNetProfitVal', formatIDR(sum.netProfit));
    setTxt('kpiAdminFinNetProfitSub', `Sisa Utang Usaha: ${formatIDR(b['2101'].ending)}`);

    // 1. Update Superadmin Overview Finance Panel (#superadminOverviewFinancePanel)
    setTxt('saOvCashVal', formatIDR(b['1101'].ending));
    setTxt('saOvCashSub', 'Modal + Penjualan - Pengeluaran');
    setTxt('saOvInventoryVal', formatIDR(b['1102'].ending));
    setTxt('saOvInventorySub', `Stok Bersih: ${sum.stockGram} Gram (Beli ${sum.purchasedGram}g / Jual ${sum.soldGram}g)`);
    setTxt('saOvSalesVal', formatIDR(sum.totalRevenue));
    setTxt('saOvGrossProfitSub', `Laba Kotor: ${formatIDR(sum.grossProfit)}`);
    setTxt('saOvNetProfitVal', formatIDR(sum.netProfit));
    setTxt('saOvExpenseDebtSub', `Sisa Utang Usaha: ${formatIDR(b['2101'].ending)}`);

    setTxt('saBsCash', formatIDR(b['1101'].ending));
    setTxt('saBsInv', formatIDR(b['1102'].ending));
    setTxt('saBsFixed', formatIDR(b['1201'].ending));
    setTxt('saBsAssets', formatIDR(sum.totalAssets));
    setTxt('saBsLiab', formatIDR(b['2101'].ending));
    setTxt('saBsEquity', formatIDR(sum.totalEquity));
    setTxt('saBsPasiva', formatIDR(sum.totalLiabilities + sum.totalEquity));

    setTxt('saIsSales', formatIDR(sum.totalRevenue));
    setTxt('saIsCogs', `- ${formatIDR(sum.totalHpp)}`);
    setTxt('saIsGross', formatIDR(sum.grossProfit));
    setTxt('saIsOpExp', `- ${formatIDR(sum.totalOpExpenses)}`);
    setTxt('saIsSocExp', `- ${formatIDR(sum.totalSocialExpenses)}`);
    setTxt('saIsNet', formatIDR(sum.netProfit));

    setTxt('saFinKpiCash', formatIDR(b['1101'].ending));
    setTxt('saFinKpiInventory', formatIDR(b['1102'].ending));
    setTxt('saFinKpiRevenue', formatIDR(sum.totalRevenue));
    setTxt('saFinKpiExpenses', formatIDR(sum.totalExpenses));
    setTxt('saFinKpiNetProfit', formatIDR(sum.netProfit));

    setTxt('saFinNeracaCash', formatIDR(b['1101'].ending));
    setTxt('saFinNeracaInv', formatIDR(b['1102'].ending));
    setTxt('saFinNeracaEquip', formatIDR(b['1201'].ending));
    setTxt('saFinNeracaPayables', formatIDR(b['2101'].ending));
    setTxt('saFinNeracaEquity', formatIDR(sum.totalEquity));
    setTxt('saFinNeracaTotalAsset', formatIDR(sum.totalAssets));

    setTxt('saFinLRRevenue', formatIDR(sum.totalRevenue));
    setTxt('saFinLRHpp', `- ${formatIDR(sum.totalHpp)}`);
    setTxt('saFinLRGross', formatIDR(sum.grossProfit));
    setTxt('saFinLROpEx', `- ${formatIDR(sum.totalOpExpenses)}`);
    setTxt('saFinLRSocEx', `- ${formatIDR(sum.totalSocialExpenses)}`);
    setTxt('saFinLRNet', formatIDR(sum.netProfit));

    const cashIn = b['1101'].debitTotal;
    const posOut = sum.entries.filter(e => e.source === 'KASIR POS').reduce((acc, e) => acc + e.nominal, 0);
    const opsOut = sum.totalExpenses + sum.entries.filter(e => e.source === 'PELUNASAN AP').reduce((acc, e) => acc + e.nominal, 0);
    const finPayables = (JSON.parse(localStorage.getItem('jantung_emas_fin_payables')) || [])
        .filter(ap => matchesSaFinBranch(ap.outletId, getOutletNameById(ap.outletId, ap.branchName)));
    const unpaidCount = finPayables.filter(ap => ap.status !== 'LUNAS').length;
    const apTotalAll = finPayables.reduce((acc, ap) => acc + (Number(ap.amount ?? ap.nominal) || 0), 0);
    const apPaidAll = finPayables.reduce((acc, ap) => acc + (ap.status === 'LUNAS' ? (Number(ap.amount ?? ap.nominal) || 0) : (Number(ap.paidAmount) || 0)), 0);

    setTxt('saCfSalesIn', `+ ${formatIDR(sum.totalRevenue)}`);
    setTxt('saCfGoldOut', `- ${formatIDR(posOut)}`);
    setTxt('saCfExpOut', `- ${formatIDR(sum.totalExpenses)}`);
    setTxt('saApTotal', formatIDR(apTotalAll));
    setTxt('saApPaid', formatIDR(apPaidAll));
    setTxt('saApRem', formatIDR(b['2101'].ending));

    setTxt('saFinCFOpen', formatIDR(b['1101'].opening));
    setTxt('saFinCFIn', `+ ${formatIDR(cashIn)}`);
    setTxt('saFinCFPosOut', `- ${formatIDR(posOut)}`);
    setTxt('saFinCFOpsOut', `- ${formatIDR(opsOut)}`);
    setTxt('saFinCFUnpaidAp', `${formatIDR(b['2101'].ending)} (${unpaidCount} Tagihan)`);
    setTxt('saFinCFEnd', formatIDR(b['1101'].ending));

    // 2. Update Dedicated Finance Tab (#tabFinanceContent)
    setTxt('saTabFinCash', formatIDR(b['1101'].ending));
    setTxt('saTabFinInv', formatIDR(b['1102'].ending));
    setTxt('saTabFinRev', formatIDR(sum.totalRevenue));
    setTxt('saTabFinExp', formatIDR(sum.totalExpenses));
    setTxt('saTabFinNet', formatIDR(sum.netProfit));

    // Render Sub-panel 1 Boxes in #tabFinanceContent (saFullBalanceSheetBox, saFullIncomeStatementBox, saFullCashFlowBox)
    const fullBsBox = document.getElementById('saFullBalanceSheetBox');
    if (fullBsBox) {
        fullBsBox.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div>
                    <h4 class="font-extrabold text-[#0b132b] uppercase text-xs">1. NERACA (BALANCE SHEET)</h4>
                    <p class="text-[10px] font-bold text-emerald-700">${activeScopeLabel}</p>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[10px]">Aktiva = Pasiva</span>
            </div>
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-1.5">
                <div class="font-extrabold text-[#0b132b] uppercase text-[10px] mb-1 border-b border-slate-200 pb-1">ASET (AKTIVA)</div>
                <div class="flex justify-between"><span>1101 - Kas &amp; Bank (Modal Kerja)</span><span class="font-bold">${formatIDR(b['1101'].ending)}</span></div>
                <div class="flex justify-between"><span>1102 - Persediaan Emas (${sum.stockGram} gr)</span><span class="font-bold text-amber-700">${formatIDR(b['1102'].ending)}</span></div>
                <div class="flex justify-between"><span>1103 - Piutang Usaha</span><span class="font-bold">${formatIDR(b['1103']?.ending || 0)}</span></div>
                <div class="flex justify-between"><span>1201 - Peralatan &amp; Inventaris</span><span class="font-bold">${formatIDR(b['1201'].ending)}</span></div>
                <div class="flex justify-between pt-2 border-t border-slate-300 font-black text-slate-900">
                    <span>TOTAL ASET (AKTIVA)</span><span class="text-emerald-700">${formatIDR(sum.totalAssets)}</span>
                </div>
            </div>
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-1.5">
                <div class="font-extrabold text-[#0b132b] uppercase text-[10px] mb-1 border-b border-slate-200 pb-1">LIABILITAS &amp; EKUITAS (PASIVA)</div>
                <div class="flex justify-between"><span>2101 - Utang Usaha (Supplier/Vendor)</span><span class="font-bold text-rose-600">${formatIDR(b['2101'].ending)}</span></div>
                <div class="flex justify-between"><span>3101 - Modal Disetor</span><span class="font-bold">${formatIDR(b['3101'].ending)}</span></div>
                <div class="flex justify-between"><span>3102 - Laba Ditahan</span><span class="font-bold">${formatIDR(b['3102']?.ending || 0)}</span></div>
                <div class="flex justify-between"><span>3201 - Laba Bersih Periode Berjalan</span><span class="font-bold text-indigo-700">${formatIDR(b['3201'].ending)}</span></div>
                <div class="flex justify-between pt-2 border-t border-slate-300 font-black text-slate-900">
                    <span>TOTAL PASIVA</span><span class="text-indigo-700">${formatIDR(sum.totalLiabilities + sum.totalEquity)}</span>
                </div>
            </div>
        `;
    }

    const opRowsHtml = ['6101', '6102', '6103', '6104', '6105', '6106', '6107', '6108', '6109', '6110', '6111', '6112', '6113', '6114', '6115', '6116', '6117', '6118', '6119']
        .map(code => {
            const acc = b[code];
            if (!acc) return '';
            return `<div class="flex justify-between text-[11px] ${acc.ending > 0 ? 'text-slate-800 font-semibold' : 'text-slate-400'}"><span>${acc.code} - ${acc.name}</span><span class="font-bold">${formatIDR(acc.ending)}</span></div>`;
        }).join('');
    const socRowsHtml = ['7101', '7102', '7103', '7104', '7105', '7106']
        .map(code => {
            const acc = b[code];
            if (!acc) return '';
            return `<div class="flex justify-between text-[11px] ${acc.ending > 0 ? 'text-slate-800 font-semibold' : 'text-slate-400'}"><span>${acc.code} - ${acc.name}</span><span class="font-bold">${formatIDR(acc.ending)}</span></div>`;
        }).join('');

    const fullIsBox = document.getElementById('saFullIncomeStatementBox');
    if (fullIsBox) {
        fullIsBox.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div>
                    <h4 class="font-extrabold text-[#0b132b] uppercase text-xs">2. LAPORAN LABA RUGI</h4>
                    <p class="text-[10px] font-bold text-indigo-700">${activeScopeLabel}</p>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold text-[10px]">Income Statement</span>
            </div>
            <div class="bg-emerald-50/70 rounded-xl p-3 border border-emerald-200/70 space-y-1">
                <div class="flex justify-between font-bold text-slate-800"><span>4101 - Pendapatan Penjualan Emas</span><span class="text-emerald-700">${formatIDR(sum.totalRevenue)}</span></div>
                <div class="flex justify-between text-slate-600"><span>5101 - Harga Pokok Penjualan (HPP)</span><span class="text-rose-600">- ${formatIDR(sum.totalHpp)}</span></div>
                <div class="flex justify-between pt-1.5 border-t border-emerald-200 font-black text-slate-900"><span>LABA KOTOR (GROSS PROFIT)</span><span>${formatIDR(sum.grossProfit)}</span></div>
            </div>
            <div class="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1 max-h-48 overflow-y-auto">
                <div class="font-extrabold text-slate-600 text-[10px] uppercase mb-1">Rincian Beban Operasional (6101 - 6119)</div>
                ${opRowsHtml}
                <div class="flex justify-between pt-1 border-t border-slate-200 font-extrabold text-rose-600 text-[11px]">
                    <span>Subtotal Beban Operasional</span><span>- ${formatIDR(sum.totalOpExpenses)}</span>
                </div>
                <div class="font-extrabold text-purple-700 text-[10px] uppercase mt-2 pt-1.5 border-t border-slate-200 mb-1">Rincian Beban Sosial &amp; Program JEI (7101 - 7106)</div>
                ${socRowsHtml}
                <div class="flex justify-between pt-1 border-t border-slate-200 font-extrabold text-purple-700 text-[11px]">
                    <span>Subtotal Beban Sosial (7101-7106)</span><span>- ${formatIDR(sum.totalSocialExpenses)}</span>
                </div>
            </div>
            <div class="bg-[#0b132b] text-white rounded-xl p-3.5 flex justify-between items-center">
                <span class="font-extrabold uppercase text-[11px]">LABA BERSIH (NET PROFIT)</span>
                <span class="font-black text-sm text-amber-400">${formatIDR(sum.netProfit)}</span>
            </div>
        `;
    }

    const fullCfBox = document.getElementById('saFullCashFlowBox');
    if (fullCfBox) {
        fullCfBox.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div>
                    <h4 class="font-extrabold text-[#0b132b] uppercase text-xs">3. ARUS KAS &amp; STOK EMAS</h4>
                    <p class="text-[10px] font-bold text-amber-700">${activeScopeLabel}</p>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-extrabold text-[10px]">Cash Flow</span>
            </div>
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-1.5">
                <div class="font-extrabold text-[#0b132b] uppercase text-[10px] mb-1 border-b border-slate-200 pb-1">MUTASI ARUS KAS (1101)</div>
                <div class="flex justify-between"><span>Kas Masuk (Penjualan / Modal)</span><span class="font-bold text-emerald-700">+ ${formatIDR(cashIn)}</span></div>
                <div class="flex justify-between"><span>Kas Keluar Buyback Kasir POS</span><span class="font-bold text-rose-600">- ${formatIDR(posOut)}</span></div>
                <div class="flex justify-between"><span>Kas Keluar Biaya &amp; Pelunasan Utang</span><span class="font-bold text-rose-600">- ${formatIDR(opsOut)}</span></div>
                <div class="flex justify-between pt-2 border-t border-slate-300 font-black text-slate-900">
                    <span>SALDO AKHIR KAS &amp; BANK</span><span class="text-blue-700">${formatIDR(b['1101'].ending)}</span>
                </div>
            </div>
            <div class="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80 space-y-1.5">
                <div class="font-extrabold text-amber-900 uppercase text-[10px] mb-1 border-b border-amber-200 pb-1">MUTASI BERAT EMAS CABANG (GRAM)</div>
                <div class="flex justify-between"><span>Total Emas Dibeli (Kasir POS)</span><span class="font-bold text-slate-800">${sum.purchasedGram} Gram</span></div>
                <div class="flex justify-between"><span>Total Emas Terjual / Dilebur</span><span class="font-bold text-emerald-700">${sum.soldGram} Gram</span></div>
                <div class="flex justify-between pt-1.5 border-t border-amber-200 font-black text-amber-900">
                    <span>STOK EMAS BERSIH</span><span>${sum.stockGram} Gram</span>
                </div>
            </div>
        `;
    }

    // Legacy containers if present
    const bsContainer = document.getElementById('saBalanceSheetContainer');
    if (bsContainer && fullBsBox) bsContainer.innerHTML = fullBsBox.innerHTML;
    const isContainer = document.getElementById('saIncomeStatementContainer');
    if (isContainer && fullIsBox) isContainer.innerHTML = fullIsBox.innerHTML;

    // Sub-panel 2: Buku Besar (#saLedgerTableBody)
    const ledgerTbody = document.getElementById('saLedgerTableBody');
    if (ledgerTbody) {
        ledgerTbody.innerHTML = SA_COA_LIST.map(acc => {
            const info = b[acc.code];
            return `
                <tr class="hover:bg-slate-50">
                    <td class="py-2.5 px-3 font-mono font-black text-indigo-700">${acc.code}</td>
                    <td class="py-2.5 px-3 font-bold text-slate-800">${acc.name}</td>
                    <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">${acc.type}</span></td>
                    <td class="py-2.5 px-3 text-right font-bold text-emerald-700">${formatIDR(info.debitTotal)}</td>
                    <td class="py-2.5 px-3 text-right font-bold text-rose-600">${formatIDR(info.creditTotal)}</td>
                    <td class="py-2.5 px-3 text-right font-black text-slate-900">${formatIDR(info.ending)}</td>
                </tr>
            `;
        }).join('');
    }

    // Sub-panel 3: Jurnal Umum (#saJurnalTableBody & legacy #saJournalTableBody)
    const jTbody = document.getElementById('saJurnalTableBody') || document.getElementById('saJournalTableBody');
    if (jTbody) {
        let dSum = 0, cSum = 0;
        if (sum.entries.length === 0) {
            jTbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-400">Belum ada transaksi jurnal untuk cakupan cabang/periode ini.</td></tr>`;
        } else {
            jTbody.innerHTML = sum.entries.map(e => {
                dSum += e.nominal;
                cSum += e.nominal;
                const dName = SA_COA_LIST.find(c => c.code === e.debitAcc)?.name || e.debitAcc;
                const cName = SA_COA_LIST.find(c => c.code === e.creditAcc)?.name || e.creditAcc;
                return `
                    <tr class="hover:bg-slate-50">
                        <td class="py-2.5 px-3 font-mono text-slate-700">${e.date}</td>
                        <td class="py-2.5 px-3 font-mono font-bold text-indigo-700">${e.ref}</td>
                        <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded bg-slate-100 font-bold text-[10px]">${e.source}</span><div class="text-[10px] text-slate-500 mt-0.5">${e.branchName}</div></td>
                        <td class="py-2.5 px-3 text-[11px]">
                            <div class="font-semibold text-slate-800 mb-0.5">${e.desc}</div>
                            <div class="font-bold text-emerald-700">[D] ${e.debitAcc} - ${dName}</div>
                            <div class="font-bold text-rose-600 pl-3">[K] ${e.creditAcc} - ${cName}</div>
                        </td>
                        <td class="py-2.5 px-3 text-right font-bold text-emerald-700">${formatIDR(e.nominal)}</td>
                        <td class="py-2.5 px-3 text-right font-bold text-rose-600">${formatIDR(e.nominal)}</td>
                    </tr>
                `;
            }).join('');
        }
        setTxt('saJurnalDebitSum', formatIDR(dSum));
        setTxt('saJurnalCreditSum', formatIDR(cSum));
        setTxt('saJournalTotalDebit', formatIDR(dSum));
        setTxt('saJournalTotalCredit', formatIDR(cSum));
    }

    // Sub-panel 4: Penjualan Emas (#saSalesTableBody)
    const sTbody = document.getElementById('saSalesTableBody');
    if (sTbody) {
        const finSales = (JSON.parse(localStorage.getItem('jantung_emas_fin_sales')) || [])
            .filter(s => isInSaFinPeriod(s.date) && matchesSaFinBranch(s.outletId, getOutletNameById(s.outletId, s.branchName)));
        if (finSales.length === 0) {
            sTbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-400">Belum ada data penjualan emas pada cabang/periode ini.</td></tr>`;
        } else {
            sTbody.innerHTML = finSales.map(s => {
                const bName = getOutletNameById(s.outletId, s.branchName);
                const total = Number(s.totalSale ?? s.total) || 0;
                const hpp = Number(s.cogs ?? s.hpp) || 0;
                const margin = total - hpp;
                return `
                    <tr class="hover:bg-slate-50">
                        <td class="py-2.5 px-3 font-mono">${s.date}<div class="text-[10px] font-bold text-emerald-700">${s.invoiceNo || s.id}</div></td>
                        <td class="py-2.5 px-3 font-bold text-slate-800">${s.buyer}<div class="text-[10px] text-slate-500">${bName}</div></td>
                        <td class="py-2.5 px-3 text-right font-bold">${s.weight} gr</td>
                        <td class="py-2.5 px-3 text-right font-extrabold text-emerald-700">${formatIDR(total)}</td>
                        <td class="py-2.5 px-3 text-right text-rose-600 font-semibold">${formatIDR(hpp)}</td>
                        <td class="py-2.5 px-3 text-right font-extrabold text-indigo-700">${formatIDR(margin)}</td>
                        <td class="py-2.5 px-3 text-center">
                            <button onclick="saDeleteFinItem('sales','${s.id}')" class="text-rose-500 hover:text-rose-700"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    // Sub-panel 5: Biaya (6101-6119 & 7101-7106) (#saExpensesTableBody & legacy #saExpenseTableBody)
    const eTbody = document.getElementById('saExpensesTableBody') || document.getElementById('saExpenseTableBody');
    if (eTbody) {
        const finExpenses = (JSON.parse(localStorage.getItem('jantung_emas_fin_expenses')) || [])
            .filter(e => isInSaFinPeriod(e.date) && matchesSaFinBranch(e.outletId, getOutletNameById(e.outletId, e.branchName)));
        if (finExpenses.length === 0) {
            eTbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-400">Belum ada catatan biaya operasional/sosial pada cabang/periode ini.</td></tr>`;
        } else {
            eTbody.innerHTML = finExpenses.map(e => {
                const code = String(e.accountCode || e.accCode || '6119');
                const nom = Number(e.amount ?? e.nominal) || 0;
                const descTxt = e.description || e.desc || '-';
                const bName = getOutletNameById(e.outletId, e.branchName);
                const coa = SA_COA_LIST.find(c => c.code === code);
                const isSoc = code.startsWith('71');
                return `
                    <tr class="hover:bg-slate-50">
                        <td class="py-2.5 px-3 font-mono">${e.date}<div class="text-[10px] text-slate-400">${e.refNo || e.id}</div></td>
                        <td class="py-2.5 px-3">
                            <span class="px-2 py-0.5 rounded font-mono font-bold text-[10px] ${isSoc ? 'bg-purple-100 text-purple-700' : 'bg-rose-50 text-rose-700'}">${code}</span>
                            <span class="font-bold text-slate-800 ml-1">${coa ? coa.name : (e.accName || 'Beban')}</span>
                        </td>
                        <td class="py-2.5 px-3">${bName}</td>
                        <td class="py-2.5 px-3">${descTxt}</td>
                        <td class="py-2.5 px-3 text-right font-extrabold text-rose-600">${formatIDR(nom)}</td>
                        <td class="py-2.5 px-3 text-center">
                            <button onclick="saDeleteFinItem('expenses','${e.id}')" class="text-rose-500 hover:text-rose-700"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    // Sub-panel 6: Utang Usaha (#saPayablesTableBody & legacy #saApTableBody)
    const apTbody = document.getElementById('saPayablesTableBody') || document.getElementById('saApTableBody');
    if (apTbody) {
        const filteredPayables = (JSON.parse(localStorage.getItem('jantung_emas_fin_payables')) || [])
            .filter(ap => isInSaFinPeriod(ap.date) && matchesSaFinBranch(ap.outletId, getOutletNameById(ap.outletId, ap.branchName)));
        if (filteredPayables.length === 0) {
            apTbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-400">Belum ada catatan utang usaha pada cabang/periode ini.</td></tr>`;
        } else {
            apTbody.innerHTML = filteredPayables.map(ap => {
                const nom = Number(ap.amount ?? ap.nominal) || 0;
                const paid = ap.status === 'LUNAS' ? nom : (Number(ap.paidAmount) || 0);
                const rem = Math.max(0, nom - paid);
                const isPaid = ap.status === 'LUNAS' || (nom > 0 && paid >= nom);
                return `
                    <tr class="hover:bg-slate-50">
                        <td class="py-2.5 px-3 font-mono">${ap.date}<div class="text-[10px] text-indigo-600 font-bold">${ap.refNo || ap.id}</div></td>
                        <td class="py-2.5 px-3 font-bold text-slate-800">${ap.vendor}</td>
                        <td class="py-2.5 px-3 text-slate-600">${ap.description || '-'}</td>
                        <td class="py-2.5 px-3 text-right font-extrabold text-slate-900">${formatIDR(nom)}</td>
                        <td class="py-2.5 px-3 text-right font-bold text-emerald-700">${formatIDR(paid)}</td>
                        <td class="py-2.5 px-3 text-right font-extrabold text-rose-600">${formatIDR(rem)}</td>
                        <td class="py-2.5 px-3 text-center flex items-center justify-center gap-1.5">
                            ${!isPaid ? `<button onclick="saPayApItem('${ap.id}')" class="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-extrabold hover:bg-emerald-700">Lunasi</button>` : `<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700">LUNAS</span>`}
                            <button onclick="saDeleteFinItem('payables','${ap.id}')" class="text-rose-500 hover:text-rose-700"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

window.switchSaFinSubTab = function (subKey) {
    const keys = ['neraca', 'bukubesar', 'jurnal', 'penjualan', 'biaya', 'utang'];
    keys.forEach(k => {
        const p = document.getElementById(`saFinPanel_${k}`);
        if (p) p.classList.toggle('hidden', k !== subKey);
    });
    document.querySelectorAll('.sa-fin-subbtn').forEach(btn => {
        const k = btn.getAttribute('data-safintab');
        btn.className = k === subKey
            ? 'sa-fin-subbtn px-3.5 py-2 rounded-xl bg-[#0b132b] text-white font-extrabold text-xs transition'
            : 'sa-fin-subbtn px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition';
    });
};

// Finance Forms (Penjualan, Biaya 6101-7106, Utang Usaha)
const saFormAddSale = document.getElementById('saFormAddSale');
if (saFormAddSale) {
    saFormAddSale.addEventListener('submit', (e) => {
        e.preventDefault();
        const list = JSON.parse(localStorage.getItem('jantung_emas_fin_sales')) || [];
        const activeScope = getActiveSaFinScope();
        const defaultOutletId = activeScope !== 'ALL' ? (parseInt(activeScope) || 1) : 1;
        const matchedOutlet = outlets.find(o => Number(o.id) === Number(defaultOutletId)) || outlets[0];
        const totalVal = parseInt(document.getElementById('saSaleTotal')?.value) || 0;
        const hppVal = parseInt((document.getElementById('saSaleCogs') || document.getElementById('saSaleHpp'))?.value) || 0;
        const newId = `SLS-${Date.now().toString().slice(-4)}`;
        const invVal = (document.getElementById('saSaleInv')?.value || '').trim() || `INV.${newId}`;
        list.unshift({
            id: newId,
            invoiceNo: invVal,
            date: document.getElementById('saSaleDate')?.value || new Date().toISOString().slice(0, 10),
            buyer: (document.getElementById('saSaleBuyer')?.value || '').trim(),
            outletId: matchedOutlet ? matchedOutlet.id : 1,
            branchName: matchedOutlet ? matchedOutlet.name : 'Cabang',
            weight: parseFloat(document.getElementById('saSaleWeight')?.value) || 0,
            totalSale: totalVal,
            cogs: hppVal,
            total: totalVal,
            hpp: hppVal
        });
        localStorage.setItem('jantung_emas_fin_sales', JSON.stringify(list));
        saFormAddSale.reset();
        const dEl = document.getElementById('saSaleDate');
        if (dEl) dEl.value = new Date().toISOString().slice(0, 10);
        renderSuperadminFinanceAll();
    });
}

const saFormAddExpense = document.getElementById('saFormAddExpense');
if (saFormAddExpense) {
    saFormAddExpense.addEventListener('submit', (e) => {
        e.preventDefault();
        const accSelectEl = document.getElementById('saExpAccountSelect') || document.getElementById('saExpAccSelect');
        const accCode = accSelectEl ? accSelectEl.value : '6119';
        const coa = SA_COA_LIST.find(c => c.code === accCode);
        const rawBranchVal = document.getElementById('saExpBranch')?.value || '';
        const activeBranchId = getActiveBranchId();
        const matchedOutlet = activeBranchId
            ? outlets.find(o => Number(o.id) === Number(activeBranchId))
            : (outlets.find(o => String(o.id) === String(rawBranchVal) || o.name === rawBranchVal) || outlets[0]);
        const nomVal = parseInt((document.getElementById('saExpAmount') || document.getElementById('saExpNominal'))?.value) || 0;
        const descVal = (document.getElementById('saExpDesc')?.value || '').trim();
        const newId = `EXP-${Date.now().toString().slice(-4)}`;
        const refVal = (document.getElementById('saExpRef')?.value || '').trim() || `BKK.${newId}`;
        const list = JSON.parse(localStorage.getItem('jantung_emas_fin_expenses')) || [];
        list.unshift({
            id: newId,
            refNo: refVal,
            date: document.getElementById('saExpDate')?.value || new Date().toISOString().slice(0, 10),
            accountCode: accCode,
            accCode,
            accName: coa ? coa.name : 'Beban Operasional',
            outletId: matchedOutlet ? matchedOutlet.id : 1,
            branchName: matchedOutlet ? matchedOutlet.name : 'Cabang',
            description: descVal,
            desc: descVal,
            amount: nomVal,
            nominal: nomVal
        });
        localStorage.setItem('jantung_emas_fin_expenses', JSON.stringify(list));
        saFormAddExpense.reset();
        const dEl = document.getElementById('saExpDate');
        if (dEl) dEl.value = new Date().toISOString().slice(0, 10);
        renderSuperadminFinanceAll();
    });
}

const saFormAddPayable = document.getElementById('saFormAddPayable');
if (saFormAddPayable) {
    saFormAddPayable.addEventListener('submit', (e) => {
        e.preventDefault();
        const nomVal = parseInt((document.getElementById('saApAmount') || document.getElementById('saApNominal'))?.value) || 0;
        const newId = `AP-${Date.now().toString().slice(-4)}`;
        const refVal = (document.getElementById('saApRef')?.value || '').trim() || `AP.${newId}`;
        const vendorVal = (document.getElementById('saApVendor')?.value || '').trim();
        const descVal = (document.getElementById('saApDesc')?.value || '').trim() || `Tagihan ${vendorVal}`;
        const activeScope = getActiveSaFinScope();
        const targetOutletId = activeScope !== 'ALL' ? (parseInt(activeScope) || 1) : 1;
        const list = JSON.parse(localStorage.getItem('jantung_emas_fin_payables')) || [];
        list.unshift({
            id: newId,
            refNo: refVal,
            date: document.getElementById('saApDate')?.value || new Date().toISOString().slice(0, 10),
            dueDate: document.getElementById('saApDue')?.value || '-',
            vendor: vendorVal,
            outletId: targetOutletId,
            accCode: document.getElementById('saApAcc')?.value || '2101',
            amount: nomVal,
            nominal: nomVal,
            paidAmount: 0,
            description: descVal,
            status: 'BELUM LUNAS'
        });
        localStorage.setItem('jantung_emas_fin_payables', JSON.stringify(list));
        saFormAddPayable.reset();
        const dEl = document.getElementById('saApDate');
        if (dEl) dEl.value = new Date().toISOString().slice(0, 10);
        renderSuperadminFinanceAll();
    });
}

window.saDeleteFinItem = function (type, id) {
    if (!confirm('Hapus data keuangan ini?')) return;
    const keyMap = {
        sales: 'jantung_emas_fin_sales',
        expenses: 'jantung_emas_fin_expenses',
        payables: 'jantung_emas_fin_payables'
    };
    const k = keyMap[type];
    if (!k) return;
    const list = (JSON.parse(localStorage.getItem(k)) || []).filter(item => item.id !== id);
    localStorage.setItem(k, JSON.stringify(list));
    renderSuperadminFinanceAll();
};

window.saPayApItem = function (id) {
    const list = JSON.parse(localStorage.getItem('jantung_emas_fin_payables')) || [];
    const idx = list.findIndex(item => item.id === id);
    if (idx !== -1) {
        const nom = Number(list[idx].amount ?? list[idx].nominal) || 0;
        list[idx].status = 'LUNAS';
        list[idx].paidAmount = nom;
        localStorage.setItem('jantung_emas_fin_payables', JSON.stringify(list));
        renderSuperadminFinanceAll();
    }
};

window.exportSuperadminFinanceExcel = function () {
    const sum = computeSaFinSummary();
    const b = sum.balances;
    const scopeLabel = getActiveSaFinScopeLabel();
    const periodLabel = getActiveSaFinPeriodLabel();
    const isSuper = currentRoleMode === 'SUPERADMIN';
    const roleHeader = isSuper
        ? `LAPORAN NERACA & LABA RUGI (${scopeLabel.toUpperCase()})`
        : `LAPORAN NERACA & LABA RUGI CABANG — ${scopeLabel.toUpperCase()}`;

    const opCodes = ['6101', '6102', '6103', '6104', '6105', '6106', '6107', '6108', '6109', '6110', '6111', '6112', '6113', '6114', '6115', '6116', '6117', '6118', '6119'];
    const socCodes = ['7101', '7102', '7103', '7104', '7105', '7106'];

    const opRowsHtml = opCodes.map(code => {
        const acc = b[code];
        return `<tr><td>${acc.code}</td><td colspan="2">${acc.name}</td><td style="text-align:right">${formatIDR(acc.ending)}</td></tr>`;
    }).join('');

    const socRowsHtml = socCodes.map(code => {
        const acc = b[code];
        return `<tr><td>${acc.code}</td><td colspan="2">${acc.name}</td><td style="text-align:right">${formatIDR(acc.ending)}</td></tr>`;
    }).join('');

    const coaRowsHtml = SA_COA_LIST.map(c => {
        const acc = b[c.code];
        return `<tr>
            <td>${c.code}</td>
            <td>${c.name}</td>
            <td>${c.type}</td>
            <td style="text-align:right">${formatIDR(acc.opening)}</td>
            <td style="text-align:right">${formatIDR(acc.debitTotal)}</td>
            <td style="text-align:right">${formatIDR(acc.creditTotal)}</td>
            <td style="text-align:right;font-weight:bold">${formatIDR(acc.ending)}</td>
        </tr>`;
    }).join('');

    const htmlExcel = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="UTF-8"></head>
        <body>
            <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;">
                <tr>
                    <td colspan="7" style="background:#0b132b;color:#ffffff;font-weight:bold;font-size:15px;text-align:center;">
                        PT JANTUNG EMAS INDONESIA — ${roleHeader}
                    </td>
                </tr>
                <tr>
                    <td colspan="7" style="background:#f1f5f9;font-weight:bold;text-align:center;">
                        Cakupan Cabang: ${scopeLabel} | Periode: ${periodLabel} | Dicetak: ${new Date().toLocaleString('id-ID')}
                    </td>
                </tr>
                <tr><td colspan="7"></td></tr>

                <!-- BAGIAN 1: NERACA (BALANCE SHEET) -->
                <tr style="background:#065f46;color:#ffffff;font-weight:bold;">
                    <td colspan="7">1. LAPORAN NERACA (BALANCE SHEET) — ${scopeLabel.toUpperCase()}</td>
                </tr>
                <tr style="background:#e2e8f0;font-weight:bold;">
                    <th>Kode</th>
                    <th colspan="2">Nama Akun Neraca</th>
                    <th>Kategori</th>
                    <th colspan="3" style="text-align:right">Saldo Akhir (Rp)</th>
                </tr>
                <tr><td>1101</td><td colspan="2">Kas &amp; Bank (Modal Kerja)</td><td>ASET (AKTIVA)</td><td colspan="3" style="text-align:right">${formatIDR(b['1101'].ending)}</td></tr>
                <tr><td>1102</td><td colspan="2">Persediaan Emas (Stok Bersih: ${sum.stockGram} gr)</td><td>ASET (AKTIVA)</td><td colspan="3" style="text-align:right">${formatIDR(b['1102'].ending)}</td></tr>
                <tr><td>1103</td><td colspan="2">Piutang Usaha / Peleburan</td><td>ASET (AKTIVA)</td><td colspan="3" style="text-align:right">${formatIDR(b['1103']?.ending || 0)}</td></tr>
                <tr><td>1201</td><td colspan="2">Peralatan &amp; Inventaris Cabang</td><td>ASET (AKTIVA)</td><td colspan="3" style="text-align:right">${formatIDR(b['1201'].ending)}</td></tr>
                <tr style="background:#ecfdf5;font-weight:bold;">
                    <td colspan="4" style="text-align:right">TOTAL ASET (AKTIVA)</td>
                    <td colspan="3" style="text-align:right">${formatIDR(sum.totalAssets)}</td>
                </tr>
                <tr><td>2101</td><td colspan="2">Utang Usaha (Supplier/Vendor)</td><td>LIABILITAS (PASIVA)</td><td colspan="3" style="text-align:right">${formatIDR(b['2101'].ending)}</td></tr>
                <tr><td>3101</td><td colspan="2">Modal Disetor Perusahaan</td><td>EKUITAS (PASIVA)</td><td colspan="3" style="text-align:right">${formatIDR(b['3101'].ending)}</td></tr>
                <tr><td>3102</td><td colspan="2">Laba Ditahan</td><td>EKUITAS (PASIVA)</td><td colspan="3" style="text-align:right">${formatIDR(b['3102']?.ending || 0)}</td></tr>
                <tr><td>3201</td><td colspan="2">Laba Bersih Periode Berjalan</td><td>EKUITAS (PASIVA)</td><td colspan="3" style="text-align:right">${formatIDR(b['3201'].ending)}</td></tr>
                <tr style="background:#eef2ff;font-weight:bold;">
                    <td colspan="4" style="text-align:right">TOTAL LIABILITAS &amp; EKUITAS (PASIVA)</td>
                    <td colspan="3" style="text-align:right">${formatIDR(sum.totalLiabilities + sum.totalEquity)}</td>
                </tr>
                <tr><td colspan="7"></td></tr>

                <!-- BAGIAN 2: LAPORAN LABA RUGI (INCOME STATEMENT) -->
                <tr style="background:#1e3a8a;color:#ffffff;font-weight:bold;">
                    <td colspan="4">2. LAPORAN LABA RUGI (INCOME STATEMENT) — ${scopeLabel.toUpperCase()}</td>
                    <td colspan="3"></td>
                </tr>
                <tr style="background:#e2e8f0;font-weight:bold;">
                    <th>Kode</th>
                    <th colspan="2">Komponen Laba Rugi</th>
                    <th style="text-align:right">Nilai (Rp)</th>
                    <th colspan="3"></th>
                </tr>
                <tr><td>4101</td><td colspan="2">Pendapatan Penjualan / Peleburan Emas</td><td style="text-align:right;font-weight:bold">${formatIDR(sum.totalRevenue)}</td><td colspan="3"></td></tr>
                <tr><td>5101</td><td colspan="2">Harga Pokok Penjualan Emas (HPP)</td><td style="text-align:right;color:#be123c">- ${formatIDR(sum.totalHpp)}</td><td colspan="3"></td></tr>
                <tr style="background:#ecfdf5;font-weight:bold;">
                    <td colspan="3" style="text-align:right">LABA KOTOR (GROSS PROFIT)</td>
                    <td style="text-align:right">${formatIDR(sum.grossProfit)}</td>
                    <td colspan="3"></td>
                </tr>
                <tr style="background:#f8fafc;font-weight:bold;"><td colspan="4">Rincian Beban Operasional (6101 - 6119)</td><td colspan="3"></td></tr>
                ${opRowsHtml}
                <tr style="background:#fff1f2;font-weight:bold;">
                    <td colspan="3" style="text-align:right">Total Beban Operasional (6101-6119)</td>
                    <td style="text-align:right">- ${formatIDR(sum.totalOpExpenses)}</td>
                    <td colspan="3"></td>
                </tr>
                <tr style="background:#f8fafc;font-weight:bold;"><td colspan="4">Rincian Beban Berbagi / Sosial &amp; Program JEI (7101 - 7106)</td><td colspan="3"></td></tr>
                ${socRowsHtml}
                <tr style="background:#faf5ff;font-weight:bold;">
                    <td colspan="3" style="text-align:right">Total Beban Sosial (7101-7106)</td>
                    <td style="text-align:right">- ${formatIDR(sum.totalSocialExpenses)}</td>
                    <td colspan="3"></td>
                </tr>
                <tr style="background:#fef3c7;font-weight:bold;font-size:13px;">
                    <td colspan="3" style="text-align:right">LABA BERSIH (NET PROFIT) — ${scopeLabel.toUpperCase()}</td>
                    <td style="text-align:right">${formatIDR(sum.netProfit)}</td>
                    <td colspan="3"></td>
                </tr>
                <tr><td colspan="7"></td></tr>

                <!-- BAGIAN 3: DAFTAR SALDO AKUN BUKU BESAR (COA) -->
                <tr style="background:#0b132b;color:#ffffff;font-weight:bold;">
                    <td colspan="7">3. REKAPITULASI SALDO BUKU BESAR (COA) — ${scopeLabel.toUpperCase()}</td>
                </tr>
                <tr style="background:#e2e8f0;font-weight:bold;">
                    <th>Kode Akun</th>
                    <th>Nama Akun</th>
                    <th>Kategori</th>
                    <th style="text-align:right">Saldo Awal</th>
                    <th style="text-align:right">Total Debit</th>
                    <th style="text-align:right">Total Kredit</th>
                    <th style="text-align:right">Saldo Akhir</th>
                </tr>
                ${coaRowsHtml}
            </table>
        </body>
        </html>
    `;

    const safeScopeSlug = scopeLabel.replace(/[^a-zA-Z0-9]/g, '_');
    const blob = new Blob([htmlExcel], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Neraca_LabaRugi_${safeScopeSlug}_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

window.exportSuperadminFinancePdf = function () {
    const sum = computeSaFinSummary();
    const b = sum.balances;
    const scopeLabel = getActiveSaFinScopeLabel();
    const periodLabel = getActiveSaFinPeriodLabel();
    const isSuper = currentRoleMode === 'SUPERADMIN';
    const docTitle = isSuper
        ? `LAPORAN NERACA & LABA RUGI (${scopeLabel.toUpperCase()})`
        : `LAPORAN NERACA & LABA RUGI CABANG — ${scopeLabel.toUpperCase()}`;

    const w = window.open('', '_blank', 'width=1080,height=820');
    if (!w) { alert('Izinkan pop-up browser untuk mencetak / download PDF Neraca & Laba Rugi.'); return; }

    const opCodes = ['6101', '6102', '6103', '6104', '6105', '6106', '6107', '6108', '6109', '6110', '6111', '6112', '6113', '6114', '6115', '6116', '6117', '6118', '6119'];
    const socCodes = ['7101', '7102', '7103', '7104', '7105', '7106'];

    const opRows = opCodes.map(code => {
        const acc = b[code];
        return `<tr><td>${acc.code} - ${acc.name}</td><td style="text-align:right">${formatIDR(acc.ending)}</td></tr>`;
    }).join('');

    const socRows = socCodes.map(code => {
        const acc = b[code];
        return `<tr><td>${acc.code} - ${acc.name}</td><td style="text-align:right">${formatIDR(acc.ending)}</td></tr>`;
    }).join('');

    const coaRows = SA_COA_LIST.map(c => {
        const acc = b[c.code];
        return `<tr>
            <td><strong>${c.code}</strong></td>
            <td>${c.name}</td>
            <td>${c.type}</td>
            <td style="text-align:right">${formatIDR(acc.opening)}</td>
            <td style="text-align:right">${formatIDR(acc.debitTotal)}</td>
            <td style="text-align:right">${formatIDR(acc.creditTotal)}</td>
            <td style="text-align:right;font-weight:bold">${formatIDR(acc.ending)}</td>
        </tr>`;
    }).join('');

    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${docTitle} - PT Jantung Emas Indonesia</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #0f172a; font-size: 11px; }
            .header { border-bottom: 2px solid #0b132b; padding-bottom: 10px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: flex-end; }
            h1 { margin: 0; font-size: 16px; color: #0b132b; text-transform: uppercase; }
            h2 { margin: 14px 0 6px 0; font-size: 12px; color: #0b132b; text-transform: uppercase; border-left: 4px solid #10b981; padding-left: 8px; }
            .meta { font-size: 10px; color: #475569; margin-top: 4px; font-weight: bold; }
            .kpis { display: flex; gap: 10px; margin: 12px 0; }
            .kpi { flex: 1; border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 8px; background: #f8fafc; }
            .kpi span { display: block; font-size: 9px; color: #64748b; text-transform: uppercase; font-weight: bold; }
            .kpi strong { font-size: 12px; color: #0b132b; }
            .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 6px; }
            th, td { border: 1px solid #cbd5e1; padding: 5px 8px; text-align: left; }
            th { background: #0b132b; color: #fff; font-size: 9.5px; text-transform: uppercase; }
            .tot-row { background: #ecfdf5; font-weight: bold; }
            .net-row { background: #fef3c7; font-weight: bold; font-size: 12px; }
            @media print { @page { size: A4 landscape; margin: 10mm; } }
        </style></head><body>
        <div class="header">
            <div>
                <h1>PT JANTUNG EMAS INDONESIA — ${docTitle}</h1>
                <div class="meta">Cakupan Cabang: ${scopeLabel} &bull; Periode: ${periodLabel}</div>
            </div>
            <div style="text-align:right;font-size:10px;color:#64748b;">
                Dicetak pada: <strong>${new Date().toLocaleString('id-ID')}</strong>
            </div>
        </div>
        <div class="kpis">
            <div class="kpi"><span>Saldo Kas &amp; Bank (1101)</span><strong>${formatIDR(b['1101'].ending)}</strong></div>
            <div class="kpi"><span>Persediaan Emas (1102)</span><strong>${formatIDR(b['1102'].ending)} (${sum.stockGram} gr)</strong></div>
            <div class="kpi"><span>Total Penjualan (4101)</span><strong>${formatIDR(sum.totalRevenue)}</strong></div>
            <div class="kpi"><span>Total Beban (6101-7106)</span><strong>${formatIDR(sum.totalExpenses)}</strong></div>
            <div class="kpi"><span>Laba Bersih Cabang</span><strong>${formatIDR(sum.netProfit)}</strong></div>
        </div>
        <div class="grid2">
            <div>
                <h2>1. NERACA (BALANCE SHEET) — ${scopeLabel}</h2>
                <table>
                    <thead><tr><th>Akun Neraca (Aktiva &amp; Pasiva)</th><th style="text-align:right">Saldo Akhir</th></tr></thead>
                    <tbody>
                        <tr><td colspan="2" style="background:#f1f5f9;font-weight:bold;">ASET (AKTIVA)</td></tr>
                        <tr><td>1101 - Kas &amp; Bank (Modal Kerja)</td><td style="text-align:right">${formatIDR(b['1101'].ending)}</td></tr>
                        <tr><td>1102 - Persediaan Emas (${sum.stockGram} gr)</td><td style="text-align:right">${formatIDR(b['1102'].ending)}</td></tr>
                        <tr><td>1103 - Piutang Usaha / Peleburan</td><td style="text-align:right">${formatIDR(b['1103']?.ending || 0)}</td></tr>
                        <tr><td>1201 - Peralatan &amp; Inventaris Cabang</td><td style="text-align:right">${formatIDR(b['1201'].ending)}</td></tr>
                        <tr class="tot-row"><td>TOTAL ASET (AKTIVA)</td><td style="text-align:right">${formatIDR(sum.totalAssets)}</td></tr>
                        <tr><td colspan="2" style="background:#f1f5f9;font-weight:bold;">LIABILITAS &amp; EKUITAS (PASIVA)</td></tr>
                        <tr><td>2101 - Utang Usaha (Supplier/Vendor)</td><td style="text-align:right">${formatIDR(b['2101'].ending)}</td></tr>
                        <tr><td>3101 - Modal Disetor Perusahaan</td><td style="text-align:right">${formatIDR(b['3101'].ending)}</td></tr>
                        <tr><td>3102 - Laba Ditahan</td><td style="text-align:right">${formatIDR(b['3102']?.ending || 0)}</td></tr>
                        <tr><td>3201 - Laba Bersih Periode Berjalan</td><td style="text-align:right">${formatIDR(b['3201'].ending)}</td></tr>
                        <tr class="tot-row"><td>TOTAL LIABILITAS &amp; EKUITAS (PASIVA)</td><td style="text-align:right">${formatIDR(sum.totalLiabilities + sum.totalEquity)}</td></tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>2. LAPORAN LABA RUGI (INCOME STATEMENT) — ${scopeLabel}</h2>
                <table>
                    <thead><tr><th>Komponen Pendapatan &amp; Beban</th><th style="text-align:right">Nominal (Rp)</th></tr></thead>
                    <tbody>
                        <tr><td><strong>4101 - Pendapatan Penjualan Emas</strong></td><td style="text-align:right;font-weight:bold">${formatIDR(sum.totalRevenue)}</td></tr>
                        <tr><td>5101 - Harga Pokok Penjualan (HPP)</td><td style="text-align:right;color:#be123c">- ${formatIDR(sum.totalHpp)}</td></tr>
                        <tr class="tot-row"><td>LABA KOTOR (GROSS PROFIT)</td><td style="text-align:right">${formatIDR(sum.grossProfit)}</td></tr>
                        <tr><td colspan="2" style="background:#f1f5f9;font-weight:bold;">Beban Operasional (6101 - 6119)</td></tr>
                        ${opRows}
                        <tr style="background:#fff1f2;font-weight:bold;"><td>Subtotal Beban Operasional</td><td style="text-align:right">- ${formatIDR(sum.totalOpExpenses)}</td></tr>
                        <tr><td colspan="2" style="background:#f1f5f9;font-weight:bold;">Beban Sosial &amp; Program JEI (7101 - 7106)</td></tr>
                        ${socRows}
                        <tr style="background:#faf5ff;font-weight:bold;"><td>Subtotal Beban Sosial</td><td style="text-align:right">- ${formatIDR(sum.totalSocialExpenses)}</td></tr>
                        <tr class="net-row"><td>LABA BERSIH (NET PROFIT)</td><td style="text-align:right">${formatIDR(sum.netProfit)}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h2>3. REKAPITULASI BUKU BESAR (COA) — ${scopeLabel}</h2>
        <table>
            <thead><tr><th>Kode</th><th>Nama Akun (COA)</th><th>Kategori</th><th style="text-align:right">Saldo Awal</th><th style="text-align:right">Mutasi Debit</th><th style="text-align:right">Mutasi Kredit</th><th style="text-align:right">Saldo Akhir</th></tr></thead>
            <tbody>${coaRows}</tbody>
        </table>
        <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 300); };<\/script>
    </body></html>`);
    w.document.close();
};

// --- TRANSACTIONS HISTORY & REPORT EXPORT (Harian, Rentang Tanggal, Mingguan & Bulanan) ---
const adminTransactionsTable = document.getElementById('adminTransactionsTable');
const adminTransactionsTableFoot = document.getElementById('adminTransactionsTableFoot');
const reportFilterMode = document.getElementById('reportFilterMode');
const filterDailyDateWrap = document.getElementById('filterDailyDateWrap');
const filterStartDateWrap = document.getElementById('filterStartDateWrap');
const filterEndDateWrap = document.getElementById('filterEndDateWrap');
const filterMonthWrap = document.getElementById('filterMonthWrap');
const filterYearWrap = document.getElementById('filterYearWrap');
const reportDailyDate = document.getElementById('reportDailyDate');
const reportStartDate = document.getElementById('reportStartDate');
const reportEndDate = document.getElementById('reportEndDate');
const reportMonthSelect = document.getElementById('reportMonthSelect');
const reportYearSelect = document.getElementById('reportYearSelect');
const reportBranchSelect = document.getElementById('reportBranchSelect');
const applyReportFilterBtn = document.getElementById('applyReportFilterBtn');
const resetReportFilterBtn = document.getElementById('resetReportFilterBtn');
const downloadAdminExcelBtn = document.getElementById('downloadAdminExcelBtn');
const downloadAdminPdfBtn = document.getElementById('downloadAdminPdfBtn');

// Initialize default filter dates
(function initReportFilterDefaults() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const todayISO = `${yyyy}-${mm}-${dd}`;
    if (reportDailyDate) reportDailyDate.value = todayISO;
    if (reportStartDate) reportStartDate.value = `${yyyy}-${mm}-01`;
    if (reportEndDate) reportEndDate.value = todayISO;
    if (reportMonthSelect) reportMonthSelect.value = mm;
    if (reportYearSelect) reportYearSelect.value = String(yyyy);
})();

function updateAdminFilterInputsVisibility() {
    const mode = reportFilterMode ? reportFilterMode.value : 'all';
    filterDailyDateWrap?.classList.add('hidden');
    filterStartDateWrap?.classList.add('hidden');
    filterEndDateWrap?.classList.add('hidden');
    filterMonthWrap?.classList.add('hidden');
    filterYearWrap?.classList.add('hidden');

    if (mode === 'daily') {
        filterDailyDateWrap?.classList.remove('hidden');
    } else if (mode === 'date_range') {
        filterStartDateWrap?.classList.remove('hidden');
        filterEndDateWrap?.classList.remove('hidden');
    } else if (mode === 'weekly') {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
        const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        if (reportStartDate) reportStartDate.value = toISO(weekAgo);
        if (reportEndDate) reportEndDate.value = toISO(now);
        filterStartDateWrap?.classList.remove('hidden');
        filterEndDateWrap?.classList.remove('hidden');
    } else if (mode === 'monthly') {
        filterMonthWrap?.classList.remove('hidden');
        filterYearWrap?.classList.remove('hidden');
    }
}

if (reportFilterMode) {
    reportFilterMode.addEventListener('change', () => {
        updateAdminFilterInputsVisibility();
        renderAdminTransactions(globalSearchEl?.value || '');
    });
}

[reportDailyDate, reportStartDate, reportEndDate, reportMonthSelect, reportYearSelect, reportBranchSelect].forEach(el => {
    if (el) {
        el.addEventListener('change', () => renderAdminTransactions(globalSearchEl?.value || ''));
    }
});

if (applyReportFilterBtn) {
    applyReportFilterBtn.addEventListener('click', () => renderAdminTransactions(globalSearchEl?.value || ''));
}

if (resetReportFilterBtn) {
    resetReportFilterBtn.addEventListener('click', () => {
        if (reportFilterMode) reportFilterMode.value = 'all';
        if (reportBranchSelect) reportBranchSelect.value = 'ALL';
        updateAdminFilterInputsVisibility();
        if (globalSearchEl) globalSearchEl.value = '';
        renderAdminTransactions('');
    });
}

function getFilteredAdminTransactions(filterQuery = '') {
    const allTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    let roleFiltered = filterTransactionsByRole(allTrx);

    // Check branch filter dropdown if SUPERADMIN
    const selectedBranch = reportBranchSelect ? reportBranchSelect.value : 'ALL';
    if (currentRoleMode === 'SUPERADMIN' && selectedBranch && selectedBranch !== 'ALL') {
        roleFiltered = roleFiltered.filter(t => isTransactionBelongingToBranch(t, selectedBranch));
    }

    // Period filter
    const mode = reportFilterMode ? reportFilterMode.value : 'all';
    let periodLabel = 'Semua Periode';
    if (mode === 'daily') {
        const dVal = reportDailyDate?.value || parseTrxDateToISO();
        periodLabel = `Harian: ${dVal}`;
        roleFiltered = roleFiltered.filter(t => parseTrxDateToISO(t.dateStr) === dVal);
    } else if (mode === 'date_range') {
        const sDate = reportStartDate?.value || '2000-01-01';
        const eDate = reportEndDate?.value || '2099-12-31';
        periodLabel = `Rentang Tanggal: ${sDate} s/d ${eDate}`;
        roleFiltered = roleFiltered.filter(t => {
            const iso = parseTrxDateToISO(t.dateStr);
            return iso >= sDate && iso <= eDate;
        });
    } else if (mode === 'weekly') {
        const sDate = reportStartDate?.value || '2000-01-01';
        const eDate = reportEndDate?.value || '2099-12-31';
        periodLabel = `Mingguan: ${sDate} s/d ${eDate}`;
        roleFiltered = roleFiltered.filter(t => {
            const iso = parseTrxDateToISO(t.dateStr);
            return iso >= sDate && iso <= eDate;
        });
    } else if (mode === 'monthly') {
        const mVal = reportMonthSelect?.value || '11';
        const yVal = reportYearSelect?.value || '2026';
        const mText = reportMonthSelect?.options[reportMonthSelect.selectedIndex]?.text || mVal;
        periodLabel = `Bulanan: ${mText} ${yVal}`;
        roleFiltered = roleFiltered.filter(t => {
            const iso = parseTrxDateToISO(t.dateStr);
            return iso.slice(0, 4) === String(yVal) && iso.slice(5, 7) === String(mVal);
        });
    }

    // Text search filter
    const q = filterQuery.trim().toLowerCase();
    if (q) {
        roleFiltered = roleFiltered.filter(trx => (
            (trx.invoiceNo || '').toLowerCase().includes(q) ||
            (trx.customerName || '').toLowerCase().includes(q) ||
            (trx.cashierName || '').toLowerCase().includes(q) ||
            (trx.branchName || '').toLowerCase().includes(q)
        ));
    }

    return { list: roleFiltered, periodLabel };
}

function renderAdminTransactions(filterQuery = '') {
    if (!adminTransactionsTable) return;
    const { list: filtered, periodLabel } = getFilteredAdminTransactions(filterQuery);
    adminTransactionsTable.innerHTML = '';

    // Update Summary Bar
    let sumMoney = 0;
    let sumGram = 0;
    filtered.forEach(t => {
        sumMoney += Number(t.grandTotal) || 0;
        (t.items || []).forEach(it => { sumGram += parseFloat(it.weight) || 0; });
    });

    const elPeriod = document.getElementById('reportFilterSummaryText');
    if (elPeriod) elPeriod.textContent = `Menampilkan: ${periodLabel} • ${getActiveRoleLabel()}`;
    const elCount = document.getElementById('reportSumNota');
    if (elCount) elCount.textContent = `${filtered.length} Nota`;
    const elGram = document.getElementById('reportSumGram');
    if (elGram) elGram.textContent = `${Number(sumGram.toFixed(2))} gr`;
    const elTotal = document.getElementById('reportSumMoney');
    if (elTotal) elTotal.textContent = formatIDR(sumMoney);

    if (filtered.length === 0) {
        adminTransactionsTable.innerHTML = `
            <tr>
                <td colspan="8" class="py-8 text-center text-slate-400 text-xs">
                    Belum ada transaksi nota kasir yang sesuai filter (${periodLabel}). Silakan buat transaksi di <a href="kasir_jei.html" target="_blank" class="text-[#6351f7] underline font-bold">Portal Kasir</a>.
                </td>
            </tr>
        `;
        if (adminTransactionsTableFoot) {
            adminTransactionsTableFoot.innerHTML = `
                <tr>
                    <td colspan="4" class="py-3 px-3 text-right uppercase text-[11px]">TOTAL GRAM &amp; TOTAL BIAYA KELUAR (0 NOTA)</td>
                    <td class="py-3 px-3 text-right text-purple-700">0 gr</td>
                    <td class="py-3 px-3 text-right">-</td>
                    <td class="py-3 px-3 text-right text-emerald-700">Rp 0</td>
                    <td></td>
                </tr>
            `;
        }
        return;
    }

    filtered.slice().reverse().forEach(trx => {
        const items = (trx.items && trx.items.length > 0) ? trx.items : [{ material: '-', karat: '-', weight: 0, unitPrice: 0, totalPrice: trx.grandTotal || 0 }];
        items.forEach((it, idx) => {
            const w = parseFloat(it.weight) || 0;
            const uPrice = parseFloat(it.unitPrice) || 0;
            const rTotal = it.totalPrice != null ? Number(it.totalPrice) : Math.round(w * uPrice);
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition';
            tr.innerHTML = `
                <td class="py-3.5 px-3 text-[11px] font-semibold text-slate-600 whitespace-nowrap">${trx.dateStr || '-'}</td>
                <td class="py-3.5 px-3 font-mono font-extrabold text-[#6351f7] text-xs whitespace-nowrap">${trx.invoiceNo || '-'}</td>
                <td class="py-3.5 px-3">
                    <div class="font-extrabold text-slate-800 text-xs uppercase">${trx.customerName || '-'}</div>
                    <div class="text-[10px] text-slate-400">${trx.branchName || '-'} &bull; Kasir: ${trx.cashierName || '-'}</div>
                </td>
                <td class="py-3.5 px-3">
                    <span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-extrabold text-[11px] mr-1">${it.karat || '-'}</span>
                    <span class="text-slate-600 font-semibold text-xs">${it.material || '-'}</span>
                </td>
                <td class="py-3.5 px-3 text-right font-extrabold text-slate-800 text-xs whitespace-nowrap">${Number(w.toFixed(2))} gr</td>
                <td class="py-3.5 px-3 text-right font-bold text-slate-600 text-xs whitespace-nowrap">${formatIDR(uPrice)}</td>
                <td class="py-3.5 px-3 text-right font-extrabold text-emerald-700 text-xs whitespace-nowrap">${formatIDR(rTotal)}</td>
                <td class="py-3.5 px-3 text-center whitespace-nowrap">
                    ${idx === 0 ? `
                        <div class="flex items-center justify-center gap-1.5">
                            <a href="kasir_jei.html?trx_id=${trx.id}" target="_blank" class="px-2.5 py-1.5 rounded-xl bg-[#efeaff] hover:bg-[#6351f7] text-[#6351f7] hover:text-white font-bold text-xs transition" title="Lihat / Cetak Nota">
                                <i class="fa-solid fa-print"></i> Nota
                            </a>
                            <button onclick="deleteAdminTransaction('${trx.id}')" class="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white text-xs transition" title="Hapus Transaksi">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ` : '<span class="text-[10px] text-slate-400">idem</span>'}
                </td>
            `;
            adminTransactionsTable.appendChild(tr);
        });
    });

    if (adminTransactionsTableFoot) {
        adminTransactionsTableFoot.innerHTML = `
            <tr>
                <td colspan="4" class="py-3.5 px-3 text-right uppercase text-[11px]">TOTAL GRAM &amp; TOTAL BIAYA KELUAR (${filtered.length} NOTA)</td>
                <td class="py-3.5 px-3 text-right text-purple-700 whitespace-nowrap">${Number(sumGram.toFixed(2))} gr</td>
                <td class="py-3.5 px-3 text-right text-slate-400">-</td>
                <td class="py-3.5 px-3 text-right text-emerald-700 whitespace-nowrap">${formatIDR(sumMoney)}</td>
                <td></td>
            </tr>
        `;
    }
}

// Download Laporan Excel (.xls)
if (downloadAdminExcelBtn) {
    downloadAdminExcelBtn.addEventListener('click', () => {
        const { list, periodLabel } = getFilteredAdminTransactions(globalSearchEl?.value || '');
        let totalNominal = 0;
        let totalGram = 0;
        let rowNo = 0;

        const rowsHtml = list.map((t) => {
            totalNominal += Number(t.grandTotal) || 0;
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
                        <td>${t.branchName || '-'} (${t.cashierName || '-'})</td>
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
                <h2>LAPORAN DATA TRANSAKSI NOTA PEMBELIAN EMAS - PT JANTUNG EMAS INDONESIA</h2>
                <p><strong>Role Akses:</strong> ${getActiveRoleLabel()} | <strong>Periode:</strong> ${periodLabel}</p>
                <p><strong>Total Nota:</strong> ${list.length} Nota | <strong>Total Gram:</strong> ${Number(totalGram.toFixed(2))} gr | <strong>Total Biaya Keluar:</strong> ${formatIDR(totalNominal)}</p>
                <table border="1" cellpadding="6" cellspacing="0">
                    <thead style="background:#0b132b;color:#ffffff;font-weight:bold;">
                        <tr>
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>No Nota</th>
                            <th>Nama Customer</th>
                            <th>Cabang &amp; Kasir</th>
                            <th>Kadar</th>
                            <th>Berat (gr)</th>
                            <th>@Harga</th>
                            <th>Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml || '<tr><td colspan="9" style="text-align:center;">Tidak ada data transaksi pada periode ini</td></tr>'}
                    </tbody>
                    <tfoot>
                        <tr style="background:#f1f5f9;font-weight:bold;">
                            <td colspan="6" style="text-align:right;">TOTAL GRAM &amp; TOTAL BIAYA KELUAR (${list.length} NOTA)</td>
                            <td style="text-align:right;">${Number(totalGram.toFixed(2))} gr</td>
                            <td style="text-align:right;">-</td>
                            <td style="text-align:right;">${formatIDR(totalNominal)}</td>
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
        a.download = `Laporan_Admin_JEI_${currentRoleMode}_${safePeriod}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Download / Cetak Laporan PDF
if (downloadAdminPdfBtn) {
    downloadAdminPdfBtn.addEventListener('click', () => {
        const { list, periodLabel } = getFilteredAdminTransactions(globalSearchEl?.value || '');
        let totalNominal = 0;
        let totalGram = 0;
        let rowNo = 0;

        const rowsHtml = list.map((t) => {
            totalNominal += Number(t.grandTotal) || 0;
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
                        <td><strong>${t.customerName || '-'}</strong><br><small>${t.branchName || '-'} (Kasir: ${t.cashierName || '-'})</small></td>
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
            alert('Silakan izinkan pop-up browser untuk mengunduh / mencetak PDF.');
            return;
        }
        printWin.document.write(`
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>Laporan Data Transaksi JEI - ${periodLabel}</title>
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
                        <p>LAPORAN DATA TRANSAKSI PEMBELIAN EMAS &bull; ${getActiveRoleLabel()}</p>
                    </div>
                    <div style="text-align:right;">
                        <strong>${periodLabel}</strong>
                        <p>Dicetak: ${new Date().toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <div class="summary">
                    <div><span>Total Transaksi Nota</span><strong>${list.length} Nota</strong></div>
                    <div><span>Total Gram</span><strong>${Number(totalGram.toFixed(2))} gr</strong></div>
                    <div><span>Total Biaya Keluar</span><strong>${formatIDR(totalNominal)}</strong></div>
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
                        ${rowsHtml || '<tr><td colspan="8" style="text-align:center;padding:20px;">Tidak ada transaksi pada periode ini</td></tr>'}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" style="text-align:right;">TOTAL GRAM &amp; TOTAL BIAYA KELUAR</td>
                            <td style="text-align:right;">${Number(totalGram.toFixed(2))} gr</td>
                            <td style="text-align:right;">-</td>
                            <td style="text-align:right;">${formatIDR(totalNominal)}</td>
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

// ============================================================================
// DATA PELANGGAN SELURUH CABANG (CRUD TAMBAH, EDIT & DELETE - SUPERADMIN & ADMIN)
// ============================================================================
const DEFAULT_CUSTOMERS = [
    {
        id: 'CUST-1',
        name: 'KEVIN RAFIF FELIATRA',
        ktp: '1471091307970021',
        phone: '082122126634',
        address: 'Ruko Sentra Gading Serpong Blok SG1.16, Kabupaten Tangerang',
        bankName: 'BCA',
        bankRek: '8830918273',
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
        outletId: 3,
        trxCount: 1,
        points: 1,
        pointsMigratedTo1: true
    }
];

let customers = JSON.parse(localStorage.getItem('jantung_emas_customers')) || null;
if (!customers) {
    customers = JSON.parse(JSON.stringify(DEFAULT_CUSTOMERS));
    localStorage.setItem('jantung_emas_customers', JSON.stringify(customers));
} else {
    let migratedPts = false;
    customers.forEach(c => {
        const tc = Math.max(0, Number(c.trxCount) || 0);
        const pts = Math.max(0, Number(c.points) || 0);
        if (!c.pointsMigratedTo1 && tc > 0 && pts === tc * 10) {
            c.points = tc;
            c.pointsMigratedTo1 = true;
            migratedPts = true;
        }
    });
    if (migratedPts) {
        localStorage.setItem('jantung_emas_customers', JSON.stringify(customers));
    }
}

function syncCustomersWithTransactions() {
    const allTrx = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
    let updated = false;

    allTrx.forEach(t => {
        const cName = (t.customerName || '').trim().toUpperCase();
        const cKtp = (t.customerKtp || '').trim();
        const cPhone = (t.customerPhone || '').trim();
        const cAddr = (t.customerAddress || '').trim();
        const cBank = (t.bankName || '').trim();
        const cRek = (t.bankRek || '').trim();
        if (!cName) return;

        const matchIdx = customers.findIndex(c =>
            (cKtp && c.ktp && String(c.ktp).trim() === cKtp) ||
            String(c.name || '').trim().toUpperCase() === cName
        );

        // Hitung berapa transaksi nota untuk pelanggan ini (1 transaksi = 1 point)
        const matchingTrxCount = allTrx.filter(tx => {
            const txName = (tx.customerName || '').trim().toUpperCase();
            const txKtp = (tx.customerKtp || '').trim();
            if (cKtp && txKtp) return txKtp === cKtp;
            return txName === cName;
        }).length;

        if (matchIdx === -1) {
            customers.push({
                id: 'CUST-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                name: cName,
                ktp: cKtp || '-',
                phone: cPhone || '-',
                address: cAddr || '-',
                bankName: cBank || '',
                bankRek: cRek || '',
                outletId: Number(t.outletId) || 2,
                trxCount: Math.max(1, matchingTrxCount),
                points: Math.max(1, matchingTrxCount),
                pointsMigratedTo1: true
            });
            updated = true;
        } else {
            const existingCust = customers[matchIdx];
            if (cKtp && (!existingCust.ktp || existingCust.ktp === '-')) { existingCust.ktp = cKtp; updated = true; }
            if (cPhone && (!existingCust.phone || existingCust.phone === '-')) { existingCust.phone = cPhone; updated = true; }
            if (cAddr && (!existingCust.address || existingCust.address === '-')) { existingCust.address = cAddr; updated = true; }
            if (cBank && !existingCust.bankName) { existingCust.bankName = cBank; updated = true; }
            if (cRek && !existingCust.bankRek) { existingCust.bankRek = cRek; updated = true; }
            if (!existingCust.manualTrxOverride && matchingTrxCount > (Number(existingCust.trxCount) || 0)) {
                existingCust.trxCount = matchingTrxCount;
                existingCust.points = Math.max(Number(existingCust.points) || 0, matchingTrxCount);
                existingCust.pointsMigratedTo1 = true;
                updated = true;
            }
        }
    });

    if (updated) {
        localStorage.setItem('jantung_emas_customers', JSON.stringify(customers));
    }
}

const adminCustomersTableBody = document.getElementById('adminCustomersTableBody');
const customerBranchFilterSelect = document.getElementById('customerBranchFilterSelect');
const customerSearchInput = document.getElementById('customerSearchInput');
const addNewCustomerBtn = document.getElementById('addNewCustomerBtn');
const customerModal = document.getElementById('customerModal');
const customerModalTitle = document.getElementById('customerModalTitle');
const closeCustomerModalBtn = document.getElementById('closeCustomerModalBtn');
const saveCustomerBtn = document.getElementById('saveCustomerBtn');
const customerEditId = document.getElementById('customerEditId');
const customerNameInput = document.getElementById('customerNameInput');
const customerKtpInput = document.getElementById('customerKtpInput');
const customerPhoneInput = document.getElementById('customerPhoneInput');
const customerOutletSelect = document.getElementById('customerOutletSelect');
const customerAddressInput = document.getElementById('customerAddressInput');
const customerBankNameInput = document.getElementById('customerBankNameInput');
const customerBankRekInput = document.getElementById('customerBankRekInput');
const customerTrxCountInput = document.getElementById('customerTrxCountInput');
const customerPointsInput = document.getElementById('customerPointsInput');

function populateCustomerDropdowns(selectedOutletId = null) {
    if (customerBranchFilterSelect) {
        const prev = customerBranchFilterSelect.value || 'ALL';
        customerBranchFilterSelect.innerHTML = `<option value="ALL">Semua Cabang (Seluruh Pelanggan)</option>` +
            outlets.map(o => `<option value="${o.id}">${o.name}</option>`).join('');
        if ([...customerBranchFilterSelect.options].some(opt => opt.value === prev)) {
            customerBranchFilterSelect.value = prev;
        }
    }
    if (customerOutletSelect) {
        customerOutletSelect.innerHTML = outlets.map(o => `<option value="${o.id}">${o.name}</option>`).join('');
        const fallbackId = selectedOutletId || getActiveBranchId() || outlets[0]?.id || 1;
        customerOutletSelect.value = String(fallbackId);
    }
}

function renderAdminCustomers(externalSearchQuery = '') {
    if (!adminCustomersTableBody) return;
    syncCustomersWithTransactions();
    populateCustomerDropdowns();

    const searchVal = (customerSearchInput?.value || externalSearchQuery || '').trim().toLowerCase();
    const branchScope = customerBranchFilterSelect ? customerBranchFilterSelect.value : 'ALL';

    const filtered = customers.filter(c => {
        if (branchScope !== 'ALL' && String(c.outletId) !== String(branchScope)) return false;
        if (!searchVal) return true;
        const branchObj = outlets.find(o => Number(o.id) === Number(c.outletId));
        const bName = branchObj ? branchObj.name.toLowerCase() : '';
        return (
            (c.name || '').toLowerCase().includes(searchVal) ||
            (c.ktp || '').toLowerCase().includes(searchVal) ||
            (c.phone || '').toLowerCase().includes(searchVal) ||
            (c.address || '').toLowerCase().includes(searchVal) ||
            bName.includes(searchVal)
        );
    });

    let totalTrxSum = 0;
    let totalPtsSum = 0;
    filtered.forEach(c => {
        totalTrxSum += Number(c.trxCount) || 0;
        totalPtsSum += Number(c.points) || 0;
    });

    const countEl = document.getElementById('custSummaryTotalCount');
    const trxEl = document.getElementById('custSummaryTotalTrx');
    const ptsEl = document.getElementById('custSummaryTotalPoints');
    if (countEl) countEl.textContent = `${filtered.length} Pelanggan`;
    if (trxEl) trxEl.textContent = `${totalTrxSum} Transaksi`;
    if (ptsEl) ptsEl.textContent = `${totalPtsSum} Point`;

    // Update label tombol download sesuai cabang yang dipilih / role aktif
    const branchExcelLbl = document.getElementById('custBtnBranchExcelLabel');
    const pdfBtnLbl = document.getElementById('custBtnPdfLabel');
    if (branchExcelLbl) {
        if (branchScope !== 'ALL') {
            const bObj = outlets.find(o => String(o.id) === String(branchScope));
            branchExcelLbl.textContent = `Download ${bObj ? bObj.name : 'Cabang'} (.xls)`;
        } else if (currentRoleMode !== 'SUPERADMIN') {
            const bId = getActiveBranchId();
            const bObj = outlets.find(o => Number(o.id) === Number(bId));
            branchExcelLbl.textContent = `Download ${bObj ? bObj.name : 'Cabang Sendiri'} (.xls)`;
        } else {
            branchExcelLbl.textContent = 'Download Per Cabang (.xls)';
        }
    }
    if (pdfBtnLbl) {
        if (branchScope !== 'ALL') {
            const bObj = outlets.find(o => String(o.id) === String(branchScope));
            pdfBtnLbl.textContent = `PDF / Cetak (${bObj ? bObj.name : 'Cabang'})`;
        } else {
            pdfBtnLbl.textContent = 'PDF / Cetak Semua';
        }
    }

    adminCustomersTableBody.innerHTML = '';
    if (filtered.length === 0) {
        adminCustomersTableBody.innerHTML = `
            <tr>
                <td colspan="8" class="py-8 text-center text-slate-400 text-xs">
                    Belum ada data pelanggan yang sesuai pencarian. Klik <strong>+ Tambah Pelanggan</strong> untuk menambahkan data baru.
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach((c, idx) => {
        const branchObj = outlets.find(o => Number(o.id) === Number(c.outletId));
        const branchName = branchObj ? branchObj.name : 'Cabang JEI';
        const trxCount = Number(c.trxCount) || 0;
        const pts = Number(c.points) || 0;

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition';
        tr.innerHTML = `
            <td class="py-3.5 px-3 text-center font-bold text-slate-500">${idx + 1}</td>
            <td class="py-3.5 px-3">
                <div class="font-extrabold text-slate-900 text-xs uppercase">${c.name || '-'}</div>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[10px] font-bold mt-0.5">
                    <i class="fa-solid fa-store text-[9px]"></i> ${branchName}
                </span>
            </td>
            <td class="py-3.5 px-3 font-mono font-bold text-slate-700 whitespace-nowrap">${c.ktp || '-'}</td>
            <td class="py-3.5 px-3 whitespace-nowrap">
                <div class="font-mono font-bold text-emerald-700">
                    <i class="fa-brands fa-whatsapp text-emerald-500 mr-1"></i>${c.phone || '-'}
                </div>
                <div class="text-[10px] font-bold text-slate-500 mt-0.5">
                    <i class="fa-solid fa-building-columns text-slate-400 mr-1"></i>${c.bankName ? `${c.bankName}: ${c.bankRek || '-'}` : 'Belum ada rek'}
                </div>
            </td>
            <td class="py-3.5 px-3 text-slate-600 font-medium max-w-xs">${c.address || '-'}</td>
            <td class="py-3.5 px-3 text-center whitespace-nowrap">
                <span class="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-xs">
                    ${trxCount}x Transaksi
                </span>
            </td>
            <td class="py-3.5 px-3 text-center whitespace-nowrap">
                <span class="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-extrabold text-xs">
                    <i class="fa-solid fa-star text-amber-500 mr-1"></i>${pts} Point
                </span>
            </td>
            <td class="py-3.5 px-3 text-center whitespace-nowrap">
                <div class="flex items-center justify-center gap-1.5">
                    <button type="button" onclick="editCustomer('${c.id}')" class="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-[#6351f7] text-[#6351f7] hover:text-white font-bold text-xs transition flex items-center gap-1" title="Edit Data Pelanggan">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button type="button" onclick="deleteCustomer('${c.id}')" class="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white font-bold text-xs transition flex items-center gap-1" title="Hapus Data Pelanggan">
                        <i class="fa-solid fa-trash"></i> Hapus
                    </button>
                </div>
            </td>
        `;
        adminCustomersTableBody.appendChild(tr);
    });
}

if (customerSearchInput) {
    customerSearchInput.addEventListener('input', () => renderAdminCustomers());
}
if (customerBranchFilterSelect) {
    customerBranchFilterSelect.addEventListener('change', () => renderAdminCustomers());
}

window.exportCustomersExcel = function (scopeMode = 'ALL') {
    syncCustomersWithTransactions();
    const searchVal = (customerSearchInput?.value || '').trim().toLowerCase();
    const filterSelectVal = customerBranchFilterSelect ? customerBranchFilterSelect.value : 'ALL';

    let targetBranchId = 'ALL';
    let groupedByBranch = false;

    if (scopeMode === 'ALL') {
        targetBranchId = 'ALL';
    } else if (scopeMode === 'BRANCH') {
        if (filterSelectVal !== 'ALL') {
            targetBranchId = String(filterSelectVal);
        } else if (currentRoleMode !== 'SUPERADMIN') {
            targetBranchId = String(getActiveBranchId() || 1);
        } else {
            groupedByBranch = true;
        }
    } else {
        targetBranchId = filterSelectVal;
    }

    const list = customers.filter(c => {
        if (!groupedByBranch && targetBranchId !== 'ALL' && String(c.outletId) !== String(targetBranchId)) return false;
        if (!searchVal) return true;
        const bObj = outlets.find(o => Number(o.id) === Number(c.outletId));
        const bName = bObj ? bObj.name.toLowerCase() : '';
        return (
            (c.name || '').toLowerCase().includes(searchVal) ||
            (c.ktp || '').toLowerCase().includes(searchVal) ||
            (c.phone || '').toLowerCase().includes(searchVal) ||
            (c.address || '').toLowerCase().includes(searchVal) ||
            bName.includes(searchVal)
        );
    });

    if (list.length === 0) {
        alert('Tidak ada data pelanggan untuk di-download pada cakupan cabang ini.');
        return;
    }

    const targetBranchObj = targetBranchId !== 'ALL' ? outlets.find(o => String(o.id) === String(targetBranchId)) : null;
    const scopeTitle = groupedByBranch
        ? 'PER MASING-MASING CABANG (DIKELOMPOKKAN PER CABANG)'
        : (targetBranchObj ? `CABANG: ${targetBranchObj.name.toUpperCase()}` : 'KESELURUHAN (SEMUA CABANG)');

    let rowsHtml = '';
    let grandTotalTrx = 0;
    let grandTotalPts = 0;

    if (groupedByBranch) {
        outlets.forEach(outlet => {
            const branchCusts = list.filter(c => Number(c.outletId) === Number(outlet.id));
            if (branchCusts.length === 0) return;
            let subTrx = 0;
            let subPts = 0;
            rowsHtml += `
                <tr style="background:#e0e7ff;font-weight:bold;">
                    <td colspan="8">CABANG: ${outlet.name.toUpperCase()} (${branchCusts.length} Pelanggan)</td>
                </tr>
            `;
            branchCusts.forEach((c, idx) => {
                const tc = Number(c.trxCount) || 0;
                const pts = Number(c.points) || 0;
                subTrx += tc;
                subPts += pts;
                grandTotalTrx += tc;
                grandTotalPts += pts;
                rowsHtml += `
                    <tr>
                        <td style="text-align:center">${idx + 1}</td>
                        <td><strong>${c.name || '-'}</strong></td>
                        <td>${outlet.name}</td>
                        <td style="mso-number-format:'\\@'">${c.ktp || '-'}</td>
                        <td style="mso-number-format:'\\@'">${c.phone || '-'}</td>
                        <td>${c.bankName ? `${c.bankName} - ${c.bankRek || '-'}` : '-'}</td>
                        <td>${c.address || '-'}</td>
                        <td style="text-align:center;font-weight:bold">${tc}x (${pts} Point)</td>
                    </tr>
                `;
            });
            rowsHtml += `
                <tr style="background:#f8fafc;font-weight:bold;">
                    <td colspan="7" style="text-align:right">Subtotal ${outlet.name}: ${branchCusts.length} Pelanggan</td>
                    <td style="text-align:center">${subTrx} Transaksi / ${subPts} Point</td>
                </tr>
            `;
        });
    } else {
        list.forEach((c, idx) => {
            const bObj = outlets.find(o => Number(o.id) === Number(c.outletId));
            const bName = bObj ? bObj.name : 'Cabang JEI';
            const tc = Number(c.trxCount) || 0;
            const pts = Number(c.points) || 0;
            grandTotalTrx += tc;
            grandTotalPts += pts;
            rowsHtml += `
                <tr>
                    <td style="text-align:center">${idx + 1}</td>
                    <td><strong>${c.name || '-'}</strong></td>
                    <td>${bName}</td>
                    <td style="mso-number-format:'\\@'">${c.ktp || '-'}</td>
                    <td style="mso-number-format:'\\@'">${c.phone || '-'}</td>
                    <td>${c.bankName ? `${c.bankName} - ${c.bankRek || '-'}` : '-'}</td>
                    <td>${c.address || '-'}</td>
                    <td style="text-align:center;font-weight:bold">${tc}x (${pts} Point)</td>
                </tr>
            `;
        });
    }

    const htmlExcel = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="UTF-8"></head>
        <body>
            <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;">
                <tr>
                    <td colspan="8" style="background:#0b132b;color:#ffffff;font-weight:bold;font-size:15px;text-align:center;">
                        PT JANTUNG EMAS INDONESIA — DATABASE PELANGGAN ${scopeTitle}
                    </td>
                </tr>
                <tr>
                    <td colspan="8" style="background:#f1f5f9;font-weight:bold;text-align:center;">
                        Total Pelanggan: ${list.length} Orang | Total Transaksi: ${grandTotalTrx}x | Total Point: ${grandTotalPts} Point | Dicetak: ${new Date().toLocaleString('id-ID')}
                    </td>
                </tr>
                <tr style="background:#1e293b;color:#ffffff;font-weight:bold;">
                    <th>NO</th>
                    <th>NAMA LENGKAP PELANGGAN</th>
                    <th>CABANG TERDAFTAR</th>
                    <th>NO. KTP (NIK)</th>
                    <th>NO. HP / WHATSAPP</th>
                    <th>REKENING BANK</th>
                    <th>ALAMAT LENGKAP</th>
                    <th>TRANSAKSI &amp; POINT</th>
                </tr>
                ${rowsHtml}
                <tr style="background:#fef3c7;font-weight:bold;">
                    <td colspan="7" style="text-align:right">TOTAL KESELURUHAN (${list.length} PELANGGAN)</td>
                    <td style="text-align:center">${grandTotalTrx} Transaksi / ${grandTotalPts} Point</td>
                </tr>
            </table>
        </body>
        </html>
    `;

    const fileSlug = groupedByBranch
        ? 'Per_Cabang_Masing_Masing'
        : (targetBranchObj ? targetBranchObj.name.replace(/[^a-zA-Z0-9]/g, '_') : 'Semua_Cabang');
    const blob = new Blob([htmlExcel], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Data_Pelanggan_JEI_${fileSlug}_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

window.exportCustomersPdf = function (scopeMode = 'AUTO') {
    syncCustomersWithTransactions();
    const searchVal = (customerSearchInput?.value || '').trim().toLowerCase();
    const filterSelectVal = customerBranchFilterSelect ? customerBranchFilterSelect.value : 'ALL';
    const targetBranchId = scopeMode === 'ALL' ? 'ALL' : filterSelectVal;

    const list = customers.filter(c => {
        if (targetBranchId !== 'ALL' && String(c.outletId) !== String(targetBranchId)) return false;
        if (!searchVal) return true;
        const bObj = outlets.find(o => Number(o.id) === Number(c.outletId));
        const bName = bObj ? bObj.name.toLowerCase() : '';
        return (
            (c.name || '').toLowerCase().includes(searchVal) ||
            (c.ktp || '').toLowerCase().includes(searchVal) ||
            (c.phone || '').toLowerCase().includes(searchVal) ||
            (c.address || '').toLowerCase().includes(searchVal) ||
            bName.includes(searchVal)
        );
    });

    if (list.length === 0) {
        alert('Tidak ada data pelanggan untuk dicetak pada cakupan cabang ini.');
        return;
    }

    const targetBranchObj = targetBranchId !== 'ALL' ? outlets.find(o => String(o.id) === String(targetBranchId)) : null;
    const scopeTitle = targetBranchObj ? `CABANG ${targetBranchObj.name.toUpperCase()}` : 'SELURUH CABANG (KESELURUHAN)';

    let totalTrx = 0;
    let totalPts = 0;
    const rowsHtml = list.map((c, idx) => {
        const bObj = outlets.find(o => Number(o.id) === Number(c.outletId));
        const bName = bObj ? bObj.name : 'Cabang JEI';
        const tc = Number(c.trxCount) || 0;
        const pts = Number(c.points) || 0;
        totalTrx += tc;
        totalPts += pts;
        return `
            <tr>
                <td style="text-align:center">${idx + 1}</td>
                <td><strong>${c.name || '-'}</strong><br><small style="color:#4f46e5">${bName}</small></td>
                <td>${c.ktp || '-'}</td>
                <td>${c.phone || '-'}<br><small>${c.bankName ? `${c.bankName}: ${c.bankRek || '-'}` : '-'}</small></td>
                <td>${c.address || '-'}</td>
                <td style="text-align:center;font-weight:bold">${tc}x Transaksi</td>
                <td style="text-align:center;font-weight:bold;color:#b45309">${pts} Point</td>
            </tr>
        `;
    }).join('');

    const w = window.open('', '_blank', 'width=1050,height=800');
    if (!w) { alert('Izinkan pop-up browser untuk mencetak / download PDF Data Pelanggan.'); return; }
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Data Pelanggan ${scopeTitle}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 22px; color: #0f172a; font-size: 11px; }
            h1 { margin: 0 0 4px 0; font-size: 16px; color: #0b132b; }
            .sub { font-size: 11px; color: #475569; margin-bottom: 12px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
            th { background: #0b132b; color: #fff; font-size: 10px; text-transform: uppercase; }
            @media print { @page { size: A4 landscape; margin: 10mm; } }
        </style></head><body>
        <h1>PT JANTUNG EMAS INDONESIA — LAPORAN DATA PELANGGAN (${scopeTitle})</h1>
        <div class="sub">Total Pelanggan: ${list.length} Orang &bull; Total Transaksi: ${totalTrx}x &bull; Total Point: ${totalPts} Point &bull; Dicetak: ${new Date().toLocaleString('id-ID')}</div>
        <table>
            <thead>
                <tr>
                    <th style="width:32px;text-align:center">NO</th>
                    <th>NAMA LENGKAP &amp; CABANG</th>
                    <th>NO. KTP (NIK)</th>
                    <th>NO. HP &amp; REKENING BANK</th>
                    <th>ALAMAT LENGKAP</th>
                    <th style="text-align:center">JUMLAH TRANSAKSI</th>
                    <th style="text-align:center">POINT PELANGGAN</th>
                </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
        </table>
        <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 300); };<\/script>
    </body></html>`);
    w.document.close();
};
if (customerTrxCountInput && customerPointsInput) {
    customerTrxCountInput.addEventListener('input', () => {
        const cnt = parseInt(customerTrxCountInput.value) || 0;
        customerPointsInput.value = cnt * 1;
    });
}

if (addNewCustomerBtn) {
    addNewCustomerBtn.addEventListener('click', () => {
        customerModalTitle.textContent = 'Tambah Data Pelanggan Baru';
        customerEditId.value = '';
        customerNameInput.value = '';
        customerKtpInput.value = '';
        customerPhoneInput.value = '';
        customerAddressInput.value = '';
        if (customerBankNameInput) customerBankNameInput.value = '';
        if (customerBankRekInput) customerBankRekInput.value = '';
        customerTrxCountInput.value = 1;
        customerPointsInput.value = 1;
        populateCustomerDropdowns(getActiveBranchId() || outlets[0]?.id || 1);
        customerModal.classList.remove('hidden');
    });
}

if (closeCustomerModalBtn) {
    closeCustomerModalBtn.addEventListener('click', () => customerModal.classList.add('hidden'));
}

window.editCustomer = function (id) {
    const cust = customers.find(c => String(c.id) === String(id));
    if (!cust) return;
    customerModalTitle.textContent = 'Edit Data Pelanggan';
    customerEditId.value = cust.id;
    customerNameInput.value = cust.name || '';
    customerKtpInput.value = cust.ktp || '';
    customerPhoneInput.value = cust.phone || '';
    customerAddressInput.value = cust.address || '';
    if (customerBankNameInput) customerBankNameInput.value = cust.bankName || '';
    if (customerBankRekInput) customerBankRekInput.value = cust.bankRek || '';
    customerTrxCountInput.value = Number(cust.trxCount) || 0;
    customerPointsInput.value = Number(cust.points) || 0;
    populateCustomerDropdowns(cust.outletId || 1);
    customerModal.classList.remove('hidden');
};

window.deleteCustomer = function (id) {
    const cust = customers.find(c => String(c.id) === String(id));
    if (!cust) return;
    if (confirm(`Apakah Anda yakin ingin menghapus data pelanggan "${cust.name}"?`)) {
        customers = customers.filter(c => String(c.id) !== String(id));
        localStorage.setItem('jantung_emas_customers', JSON.stringify(customers));
        renderAdminCustomers();
    }
};

if (saveCustomerBtn) {
    saveCustomerBtn.addEventListener('click', () => {
        const name = customerNameInput.value.trim().toUpperCase();
        const ktp = customerKtpInput.value.trim();
        const phone = customerPhoneInput.value.trim();
        const outletId = parseInt(customerOutletSelect.value) || 1;
        const address = customerAddressInput.value.trim();
        const bankName = customerBankNameInput ? customerBankNameInput.value.trim().toUpperCase() : '';
        const bankRek = customerBankRekInput ? customerBankRekInput.value.trim() : '';
        const trxCount = Math.max(0, parseInt(customerTrxCountInput.value) || 0);
        const points = Math.max(0, parseInt(customerPointsInput.value) || 0);

        if (!name || !ktp || !phone || !address) {
            alert('Silakan lengkapi Nama Lengkap, No. KTP, No. HP, dan Alamat Pelanggan!');
            return;
        }

        const editId = customerEditId.value;
        if (editId) {
            const idx = customers.findIndex(c => String(c.id) === String(editId));
            if (idx !== -1) {
                customers[idx] = {
                    ...customers[idx],
                    name,
                    ktp,
                    phone,
                    outletId,
                    address,
                    bankName,
                    bankRek,
                    bankAn: name,
                    trxCount,
                    points,
                    manualTrxOverride: true
                };
            }
        } else {
            customers.push({
                id: 'CUST-' + Date.now(),
                name,
                ktp,
                phone,
                outletId,
                address,
                bankName,
                bankRek,
                bankAn: name,
                trxCount,
                points,
                manualTrxOverride: true
            });
        }

        localStorage.setItem('jantung_emas_customers', JSON.stringify(customers));
        renderAdminCustomers();
        customerModal.classList.add('hidden');
        alert(`Data pelanggan "${name}" berhasil disimpan!`);
    });
}

window.deleteAdminTransaction = function (trxId) {
    if (confirm('Hapus riwayat nota transaksi ini?')) {
        let transactions = JSON.parse(localStorage.getItem('jantung_emas_transactions')) || [];
        transactions = transactions.filter(t => String(t.id) !== String(trxId));
        localStorage.setItem('jantung_emas_transactions', JSON.stringify(transactions));
        renderAdminTransactions(globalSearchEl?.value || '');
        if (typeof renderAdminCustomers === 'function') renderAdminCustomers();
        updateAllKpiCards();
        if (typeof renderSuperadminFinanceAll === 'function') renderSuperadminFinanceAll();
    }
};

// --- GENERATOR BROSUR HARGA EMAS (HD / FHD A4 PORTRAIT & LANDSCAPE) ---
const openBrochureGeneratorBtn = document.getElementById('openBrochureGeneratorBtn');
const brochureGeneratorModal = document.getElementById('brochureGeneratorModal');
const closeBrochureGeneratorModalBtn = document.getElementById('closeBrochureGeneratorModalBtn');
const brochureOrientPortraitBtn = document.getElementById('brochureOrientPortraitBtn');
const brochureOrientLandscapeBtn = document.getElementById('brochureOrientLandscapeBtn');
const brochureQualitySelect = document.getElementById('brochureQualitySelect');
const brochureBgFileInput = document.getElementById('brochureBgFileInput');
const resetBrochureBgBtn = document.getElementById('resetBrochureBgBtn');
const brochureBgStatusText = document.getElementById('brochureBgStatusText');
const brochureBgUploadControls = document.getElementById('brochureBgUploadControls');
const brochureBgLockedNotice = document.getElementById('brochureBgLockedNotice');
const brochureDateTextInput = document.getElementById('brochureDateTextInput');
const brochureTitleLine1Input = document.getElementById('brochureTitleLine1Input');
const brochureTitleLine2Input = document.getElementById('brochureTitleLine2Input');
const brochureFooterQuoteInput = document.getElementById('brochureFooterQuoteInput');
const brochureResolutionBadge = document.getElementById('brochureResolutionBadge');
const brochurePreviewCanvas = document.getElementById('brochurePreviewCanvas');
const downloadBrochureJpgBtn = document.getElementById('downloadBrochureJpgBtn');
const downloadBrochurePngBtn = document.getElementById('downloadBrochurePngBtn');
const printBrochureA4Btn = document.getElementById('printBrochureA4Btn');

let brochureOrientation = 'PORTRAIT'; // 'PORTRAIT' | 'LANDSCAPE'
let customBrochureBgDataUrl = localStorage.getItem('jantung_emas_brochure_bg') || null;
let cachedBrochureBgImg = null;
let cachedBrochureBgSrc = '';

function getFormattedIndonesianDateToday() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

function formatBrochurePrice(amount) {
    const val = Math.round(Number(amount) || 0);
    return 'Rp.  ' + Math.abs(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function getActiveBrochureBgSource() {
    if (customBrochureBgDataUrl) return customBrochureBgDataUrl;
    if (window.DEFAULT_BROCHURE_BG_DATA_URL) return window.DEFAULT_BROCHURE_BG_DATA_URL;
    return 'assets/brosur_bg_default.jpg';
}

function updateBrochureRoleUploadAccess() {
    const isSuper = currentRoleMode === 'SUPERADMIN';
    if (brochureBgUploadControls) brochureBgUploadControls.classList.toggle('hidden', !isSuper);
    if (brochureBgLockedNotice) brochureBgLockedNotice.classList.toggle('hidden', isSuper);
    if (brochureBgStatusText) {
        if (customBrochureBgDataUrl) {
            brochureBgStatusText.innerHTML = '<i class="fa-solid fa-circle-check mr-1"></i>Background Custom HD Aktif';
        } else {
            brochureBgStatusText.innerHTML = '<i class="fa-solid fa-circle-check mr-1"></i>Background Default JEI Aktif';
        }
    }
}

function updateOrientationButtonsUI() {
    if (!brochureOrientPortraitBtn || !brochureOrientLandscapeBtn) return;
    if (brochureOrientation === 'PORTRAIT') {
        brochureOrientPortraitBtn.className = 'py-3 px-3 rounded-xl border-2 border-amber-500 bg-amber-50/80 text-slate-900 font-extrabold text-xs flex flex-col items-center justify-center gap-1 transition shadow-sm';
        brochureOrientLandscapeBtn.className = 'py-3 px-3 rounded-xl border-2 border-slate-200 bg-white hover:border-amber-400 text-slate-700 font-extrabold text-xs flex flex-col items-center justify-center gap-1 transition';
    } else {
        brochureOrientLandscapeBtn.className = 'py-3 px-3 rounded-xl border-2 border-amber-500 bg-amber-50/80 text-slate-900 font-extrabold text-xs flex flex-col items-center justify-center gap-1 transition shadow-sm';
        brochureOrientPortraitBtn.className = 'py-3 px-3 rounded-xl border-2 border-slate-200 bg-white hover:border-amber-400 text-slate-700 font-extrabold text-xs flex flex-col items-center justify-center gap-1 transition';
    }

    if (brochureQualitySelect) {
        const isP = brochureOrientation === 'PORTRAIT';
        brochureQualitySelect.options[0].textContent = isP
            ? 'Ultra FHD A4 Cetak Tajam (2480 × 3508 px • 300 DPI)'
            : 'Ultra FHD A4 Cetak Tajam (3508 × 2480 px • 300 DPI)';
        brochureQualitySelect.options[1].textContent = isP
            ? 'HD A4 Standar Digital (1654 × 2339 px • 200 DPI)'
            : 'HD A4 Standar Digital (2339 × 1654 px • 200 DPI)';
    }
}

function drawRoundedRectPath(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function loadBrochureBgImage(callback) {
    const src = getActiveBrochureBgSource();
    if (cachedBrochureBgImg && cachedBrochureBgSrc === src && cachedBrochureBgImg.complete && cachedBrochureBgImg.naturalWidth > 0) {
        callback(cachedBrochureBgImg);
        return;
    }
    const img = new Image();
    img.onload = () => {
        cachedBrochureBgImg = img;
        cachedBrochureBgSrc = src;
        callback(img);
    };
    img.onerror = () => {
        callback(null);
    };
    img.src = src;
}

function renderBrochureCanvas(onComplete) {
    if (!brochurePreviewCanvas) return;
    const quality = brochureQualitySelect ? brochureQualitySelect.value : 'FHD';
    const isPortrait = brochureOrientation === 'PORTRAIT';

    const baseShort = quality === 'FHD' ? 2480 : 1654;
    const baseLong = quality === 'FHD' ? 3508 : 2339;
    const W = isPortrait ? baseShort : baseLong;
    const H = isPortrait ? baseLong : baseShort;

    brochurePreviewCanvas.width = W;
    brochurePreviewCanvas.height = H;

    if (brochureResolutionBadge) {
        brochureResolutionBadge.textContent = `A4 ${isPortrait ? 'Portrait' : 'Landscape'} • ${W} × ${H} px (${quality})`;
    }

    loadBrochureBgImage((bgImg) => {
        const ctx = brochurePreviewCanvas.getContext('2d');
        ctx.save();

        // 1. Render Background (Portrait vs Landscape)
        const gradBg = ctx.createRadialGradient(W * 0.5, H * 0.45, W * 0.05, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
        gradBg.addColorStop(0, '#1c160c');
        gradBg.addColorStop(0.55, '#0b0905');
        gradBg.addColorStop(1, '#020202');
        ctx.fillStyle = gradBg;
        ctx.fillRect(0, 0, W, H);

        if (bgImg && bgImg.naturalWidth > 0) {
            const imgW = bgImg.naturalWidth;
            const imgH = bgImg.naturalHeight;
            const imgIsPortrait = imgH >= imgW;

            if (isPortrait || !imgIsPortrait) {
                // Draw full-bleed background directly
                ctx.drawImage(bgImg, 0, 0, W, H);
            } else {
                // Smart A4 Landscape adaptation from Portrait template so Logo & Gold Bullion are not distorted
                // Top decorative wave & jewelry band
                const topBandSrcH = Math.round(imgH * 0.165);
                const topBandDstH = Math.round(H * 0.195);
                ctx.drawImage(bgImg, 0, 0, imgW, topBandSrcH, 0, 0, W, topBandDstH);

                // Re-draw center logo with natural 1:1 aspect ratio in center top so heart logo is crisp
                const logoSrcX = Math.round(imgW * 0.28);
                const logoSrcW = Math.round(imgW * 0.44);
                const logoSrcH = Math.round(imgH * 0.155);
                const logoScale = (H * 0.175) / logoSrcH;
                const logoDstW = Math.round(logoSrcW * logoScale);
                const logoDstH = Math.round(logoSrcH * logoScale);
                const logoDstX = Math.round((W - logoDstW) / 2);

                // Soft dark radial blend behind center logo
                const logoMask = ctx.createRadialGradient(W / 2, logoDstH * 0.5, logoDstW * 0.1, W / 2, logoDstH * 0.5, logoDstW * 0.75);
                logoMask.addColorStop(0, '#090704');
                logoMask.addColorStop(0.7, 'rgba(9,7,4,0.85)');
                logoMask.addColorStop(1, 'rgba(9,7,4,0)');
                ctx.fillStyle = logoMask;
                ctx.fillRect(logoDstX - logoDstW * 0.3, 0, logoDstW * 1.6, topBandDstH + 10);
                ctx.drawImage(bgImg, logoSrcX, 0, logoSrcW, logoSrcH, logoDstX, Math.round(H * 0.008), logoDstW, logoDstH);

                // Bottom gold bullion & "TERIMA DENGAN SEGALA KONDISI" + Footer bar
                const botSrcY = Math.round(imgH * 0.705);
                const botSrcH = imgH - botSrcY;
                const botDstY = Math.round(H * 0.735);
                const botDstH = H - botDstY;
                ctx.drawImage(bgImg, 0, botSrcY, imgW, botSrcH, 0, botDstY, W, botDstH);
            }
        }

        // 2. Gather Live 20-Karat Data
        const liveBase24k = parseInt(basePriceInput?.value) || base24k || DEFAULT_BASE;
        const leftKarats = karatData.slice(0, 10);
        const rightKarats = karatData.slice(10, 20);

        const title1 = (brochureTitleLine1Input?.value || 'KAMI BAYAR EMAS ANDA').trim();
        const title2 = (brochureTitleLine2Input?.value || 'DENGAN HARGA TERBAIK').trim();
        const dateText = (brochureDateTextInput?.value || getFormattedIndonesianDateToday()).trim();
        const footerQuote = (brochureFooterQuoteInput?.value || '"Setiap transaksi emas Anda, Kami sisihkan untuk kegiatan amal dan sosial"').trim();

        // 3. Layout Coordinates (Portrait vs Landscape)
        const title1Y = isPortrait ? H * 0.193 : H * 0.218;
        const title2Y = isPortrait ? H * 0.232 : H * 0.258;
        const titleFontSize = Math.round(isPortrait ? H * 0.0325 : H * 0.034);

        const tableX = Math.round(isPortrait ? W * 0.075 : W * 0.07);
        const tableW = Math.round(isPortrait ? W * 0.850 : W * 0.86);
        const tableY = Math.round(isPortrait ? H * 0.280 : H * 0.295);
        const tableH = Math.round(isPortrait ? H * 0.408 : H * 0.435);
        const tableRadius = Math.round(Math.min(W, H) * 0.016);

        const dateY = Math.round(tableY - (isPortrait ? H * 0.011 : H * 0.010));
        const quoteY = Math.round(isPortrait ? H * 0.916 : H * 0.918);

        // 4. Draw Gold Titles
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `900 ${titleFontSize}px "Plus Jakarta Sans", "Arial Black", sans-serif`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowBlur = Math.round(H * 0.008);
        ctx.shadowOffsetY = Math.round(H * 0.002);

        const titleGrad = ctx.createLinearGradient(0, title1Y - titleFontSize, 0, title2Y + titleFontSize);
        titleGrad.addColorStop(0, '#ffe566');
        titleGrad.addColorStop(0.5, '#f5c428');
        titleGrad.addColorStop(1, '#d99b16');
        ctx.fillStyle = titleGrad;

        if (title1) ctx.fillText(title1.toUpperCase(), W / 2, title1Y);
        if (title2) ctx.fillText(title2.toUpperCase(), W / 2, title2Y);
        ctx.restore();

        // 5. Draw Date (Right-aligned above Table)
        ctx.save();
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        const dateFontSize = Math.round(isPortrait ? H * 0.0158 : H * 0.018);
        ctx.font = `800 ${dateFontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = Math.round(H * 0.005);
        ctx.fillText(dateText, tableX + tableW - Math.round(W * 0.004), dateY);
        ctx.restore();

        // 6. Draw 20-Karat Rounded Table
        const headerH = Math.round(tableH * 0.120);
        const bodyY = tableY + headerH;
        const bodyH = tableH - headerH;
        const totalRows = 11; // 1 Sub-header row + 10 Data rows
        const rowH = bodyH / totalRows;

        const col1W = Math.round(tableW * 0.195);
        const col2W = Math.round(tableW * 0.305);
        const col3W = Math.round(tableW * 0.195);
        const col4W = tableW - col1W - col2W - col3W;

        const col1X = tableX;
        const col2X = col1X + col1W;
        const col3X = col2X + col2W;
        const col4X = col3X + col3W;

        ctx.save();
        drawRoundedRectPath(ctx, tableX, tableY, tableW, tableH, tableRadius);
        ctx.clip();

        // 6a. Table Body Dark Background
        ctx.fillStyle = 'rgba(5, 5, 5, 0.94)';
        ctx.fillRect(tableX, bodyY, tableW, bodyH);

        // 6b. Top Gold Header Bar ("HARGA HARI INI")
        const hdrGrad = ctx.createLinearGradient(tableX, tableY, tableX + tableW, tableY);
        hdrGrad.addColorStop(0, '#c69328');
        hdrGrad.addColorStop(0.25, '#e2b951');
        hdrGrad.addColorStop(0.5, '#f6d878');
        hdrGrad.addColorStop(0.75, '#e2b951');
        hdrGrad.addColorStop(1, '#c69328');
        ctx.fillStyle = hdrGrad;
        ctx.fillRect(tableX, tableY, tableW, headerH);

        ctx.fillStyle = '#050505';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const hdrFontSize = Math.round(isPortrait ? H * 0.021 : H * 0.024);
        ctx.font = `900 ${hdrFontSize}px "Plus Jakarta Sans", "Arial Black", sans-serif`;
        ctx.fillText('HARGA HARI INI', tableX + tableW / 2, tableY + headerH * 0.53);

        // 6c. Sub-Header Row ("KARAT | HARGA / GR | KARAT | HARGA / GR")
        const subHdrCenterY = bodyY + rowH * 0.5;
        const subHdrFontSize = Math.round(isPortrait ? H * 0.0150 : H * 0.0175);
        ctx.fillStyle = '#ffffff';
        ctx.font = `800 ${subHdrFontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
        ctx.fillText('KARAT', col1X + col1W / 2, subHdrCenterY);
        ctx.fillText('HARGA / GR', col2X + col2W / 2, subHdrCenterY);
        ctx.fillText('KARAT', col3X + col3W / 2, subHdrCenterY);
        ctx.fillText('HARGA / GR', col4X + col4W / 2, subHdrCenterY);

        // 6d. Grid Lines (Horizontal & Vertical)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.lineWidth = Math.max(1.5, Math.round(W * 0.001));

        // Horizontal lines
        for (let r = 0; r <= totalRows; r++) {
            const lineY = Math.round(bodyY + r * rowH);
            ctx.beginPath();
            ctx.moveTo(tableX, lineY);
            ctx.lineTo(tableX + tableW, lineY);
            ctx.stroke();
        }

        // Vertical lines between columns
        [col2X, col3X, col4X].forEach((vx) => {
            ctx.beginPath();
            ctx.moveTo(vx, bodyY);
            ctx.lineTo(vx, tableY + tableH);
            ctx.stroke();
        });

        // 6e. 10 Data Rows (Left: 24K+..16K, Right: 15K..6K)
        const karatFontSize = Math.round(isPortrait ? H * 0.0165 : H * 0.0195);
        const priceFontSize = Math.round(isPortrait ? H * 0.0155 : H * 0.0185);
        const pricePadLeft = Math.round(col2W * 0.17);

        for (let i = 0; i < 10; i++) {
            const rowCenterY = bodyY + (i + 1.5) * rowH;
            const leftItem = leftKarats[i];
            const rightItem = rightKarats[i];

            if (leftItem) {
                const pLeft = calcPrice(liveBase24k, leftItem.percent);
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.font = `900 ${karatFontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
                ctx.fillText(leftItem.name, col1X + col1W / 2, rowCenterY);

                ctx.textAlign = 'left';
                ctx.font = `700 ${priceFontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
                ctx.fillText(formatBrochurePrice(pLeft), col2X + pricePadLeft, rowCenterY);
            }

            if (rightItem) {
                const pRight = calcPrice(liveBase24k, rightItem.percent);
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.font = `900 ${karatFontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
                ctx.fillText(rightItem.name, col3X + col3W / 2, rowCenterY);

                ctx.textAlign = 'left';
                ctx.font = `700 ${priceFontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
                ctx.fillText(formatBrochurePrice(pRight), col4X + pricePadLeft, rowCenterY);
            }
        }

        ctx.restore(); // End clip

        // 6f. Outer Gold Rounded Border
        ctx.save();
        drawRoundedRectPath(ctx, tableX, tableY, tableW, tableH, tableRadius);
        ctx.strokeStyle = '#d4a638';
        ctx.lineWidth = Math.max(2.5, Math.round(W * 0.0022));
        ctx.stroke();
        ctx.restore();

        // 7. Draw Bottom Charity Quote
        if (footerQuote) {
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const quoteFontSize = Math.round(isPortrait ? H * 0.0168 : H * 0.0185);
            ctx.font = `italic 800 ${quoteFontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
            ctx.shadowBlur = Math.round(H * 0.007);
            ctx.shadowOffsetY = Math.round(H * 0.002);
            ctx.fillText(footerQuote, W / 2, quoteY);
            ctx.restore();
        }

        ctx.restore();
        if (typeof onComplete === 'function') onComplete(brochurePreviewCanvas);
    });
}

if (openBrochureGeneratorBtn) {
    openBrochureGeneratorBtn.addEventListener('click', () => {
        if (brochureDateTextInput && !brochureDateTextInput.value.trim()) {
            brochureDateTextInput.value = getFormattedIndonesianDateToday();
        }
        updateBrochureRoleUploadAccess();
        updateOrientationButtonsUI();
        brochureGeneratorModal.classList.remove('hidden');
        renderBrochureCanvas();
    });
}

if (closeBrochureGeneratorModalBtn) {
    closeBrochureGeneratorModalBtn.addEventListener('click', () => {
        brochureGeneratorModal.classList.add('hidden');
    });
}

if (brochureOrientPortraitBtn) {
    brochureOrientPortraitBtn.addEventListener('click', () => {
        brochureOrientation = 'PORTRAIT';
        updateOrientationButtonsUI();
        renderBrochureCanvas();
    });
}

if (brochureOrientLandscapeBtn) {
    brochureOrientLandscapeBtn.addEventListener('click', () => {
        brochureOrientation = 'LANDSCAPE';
        updateOrientationButtonsUI();
        renderBrochureCanvas();
    });
}

if (brochureQualitySelect) {
    brochureQualitySelect.addEventListener('change', () => renderBrochureCanvas());
}

[brochureDateTextInput, brochureTitleLine1Input, brochureTitleLine2Input, brochureFooterQuoteInput].forEach(inp => {
    if (inp) inp.addEventListener('input', () => renderBrochureCanvas());
});

if (brochureBgFileInput) {
    brochureBgFileInput.addEventListener('change', (e) => {
        if (currentRoleMode !== 'SUPERADMIN') {
            alert('Akses Ditolak: Hanya Superadmin yang dapat meng-upload background brosur.');
            return;
        }
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target.result;
            customBrochureBgDataUrl = dataUrl;
            cachedBrochureBgImg = null;
            try {
                localStorage.setItem('jantung_emas_brochure_bg', dataUrl);
            } catch (err) {
                // Compress slightly if raw file exceeds browser localStorage quota
                const tempImg = new Image();
                tempImg.onload = () => {
                    const off = document.createElement('canvas');
                    const maxDim = 2480;
                    const scale = Math.min(1, maxDim / Math.max(tempImg.width, tempImg.height));
                    off.width = Math.round(tempImg.width * scale);
                    off.height = Math.round(tempImg.height * scale);
                    off.getContext('2d').drawImage(tempImg, 0, 0, off.width, off.height);
                    const compressed = off.toDataURL('image/jpeg', 0.9);
                    try { localStorage.setItem('jantung_emas_brochure_bg', compressed); } catch (_) { }
                };
                tempImg.src = dataUrl;
            }
            updateBrochureRoleUploadAccess();
            renderBrochureCanvas();
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    });
}

if (resetBrochureBgBtn) {
    resetBrochureBgBtn.addEventListener('click', () => {
        if (currentRoleMode !== 'SUPERADMIN') return;
        customBrochureBgDataUrl = null;
        cachedBrochureBgImg = null;
        localStorage.removeItem('jantung_emas_brochure_bg');
        updateBrochureRoleUploadAccess();
        renderBrochureCanvas();
    });
}

function triggerBrochureDownload(mimeType, ext) {
    renderBrochureCanvas((canvas) => {
        try {
            const quality = brochureQualitySelect ? brochureQualitySelect.value : 'FHD';
            const orientSlug = brochureOrientation === 'PORTRAIT' ? 'Portrait' : 'Landscape';
            const dateSlug = new Date().toISOString().slice(0, 10);
            const fileName = `Brosur_Harga_Jantung_Emas_A4_${orientSlug}_${quality}_${dateSlug}.${ext}`;
            const dataUrl = mimeType === 'image/png'
                ? canvas.toDataURL('image/png')
                : canvas.toDataURL('image/jpeg', 0.98);

            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (err) {
            alert('Gagal mengekspor gambar brosur: ' + err.message);
        }
    });
}

if (downloadBrochureJpgBtn) {
    downloadBrochureJpgBtn.addEventListener('click', () => triggerBrochureDownload('image/jpeg', 'jpg'));
}

if (downloadBrochurePngBtn) {
    downloadBrochurePngBtn.addEventListener('click', () => triggerBrochureDownload('image/png', 'png'));
}

if (printBrochureA4Btn) {
    printBrochureA4Btn.addEventListener('click', () => {
        renderBrochureCanvas((canvas) => {
            const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
            const isP = brochureOrientation === 'PORTRAIT';
            const pageSizeCss = isP ? 'A4 portrait' : 'A4 landscape';
            const printWin = window.open('', '_blank', 'width=960,height=800');
            if (!printWin) {
                alert('Izinkan pop-up browser untuk mencetak brosur A4.');
                return;
            }
            printWin.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Cetak Brosur Harga A4 - Jantung Emas Indonesia</title>
                    <style>
                        @page { size: ${pageSizeCss}; margin: 0; }
                        html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; }
                        img { width: 100%; height: 100%; object-fit: contain; display: block; }
                    </style>
                </head>
                <body>
                    <img src="${dataUrl}" onload="setTimeout(() => { window.print(); }, 250);" />
                </body>
                </html>
            `);
            printWin.document.close();
        });
    });
}

// Real-time Storage Sync across tabs (Superadmin, Admin Cabang, Keuangan & Kasir)
window.addEventListener('storage', (e) => {
    if (!e.key || e.key.startsWith('jantung_emas_')) {
        outlets = JSON.parse(localStorage.getItem('jantung_emas_outlets')) || DEFAULT_OUTLETS;
        cashiers = JSON.parse(localStorage.getItem('jantung_emas_cashiers')) || DEFAULT_CASHIERS;
        branchAdmins = JSON.parse(localStorage.getItem('jantung_emas_branch_admins')) || DEFAULT_BRANCH_ADMINS;
        financeUsers = JSON.parse(localStorage.getItem('jantung_emas_finance_users')) || DEFAULT_FINANCE_USERS;
        slides = JSON.parse(localStorage.getItem('jantung_emas_slides')) || DEFAULT_SLIDES;
        customers = JSON.parse(localStorage.getItem('jantung_emas_customers')) || customers;
        refreshAllBranchDependentViews();
        if (typeof renderAdminCustomers === 'function') renderAdminCustomers();
    }
});
