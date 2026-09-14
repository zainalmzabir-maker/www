/**
 * SEMEKAR Web App Engine
 * Portal Rasmi SMK Kamarul Ariffin
 */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwtIFAIyiMWOdDJsneV6VGEqRbGnxHr1mpXpv2ihZUYcwSM6BFQvymaw36kIyZ1c3yhSw/exec";
const CACHE_KEY_GURU = "semekar_guru_cache_v2";
const CACHE_KEY_PENTADBIR = "semekar_pentadbir_cache_v2";
const CACHE_KEY_GKMP = "semekar_gkmp_cache_v1";

const DEFAULT_PENTADBIR = {
  pengetua: { id: "pengetua", jawatan: "Pengetua", nama: "Cikgu Abd Hadi bin Adman", gambar: "" },
  gpk1: { id: "gpk1", jawatan: "GPK Pentadbiran", nama: "Cikgu Masnon bin Amat", gambar: "" },
  gpkhem: { id: "gpkhem", jawatan: "GPK Hal Ehwal Murid", nama: "Cikgu Oskasmazila binti Osman", gambar: "" },
  gpkkoku: { id: "gpkkoku", jawatan: "GPK Kokurikulum", nama: "Cikgu Zainal bin Mohd Zabir", gambar: "" }
};

const DEFAULT_GKMP = {
  gkmpsm: { id: "gkmpsm", jawatan: "GKMP Sains & Matematik", nama: "Cikgu Mohd Riduwan bin Mohd Yasan", gambar: "" },
  gkmptv: { id: "gkmptv", jawatan: "GKMP Teknik & Vokasional", nama: "Cikgu Mohd Nizam bin Subani", gambar: "" },
  gmpbahasa: { id: "gmpbahasa", jawatan: "GKMP Bahasa", nama: "Cikgu Rohana binti Jasmin", gambar: "" },
  gkmpsk: { id: "gkmpsk", jawatan: "GKMP Sains Kemasyarakatan", nama: "Cikgu Mohamaad Fadzeli bin Azam", gambar: "" }
};

let pentadbirData = { ...DEFAULT_PENTADBIR };
let gkmpData = { ...DEFAULT_GKMP };

let currentSelectedImageBase64 = "";
let currentSelectedGkmpImageBase64 = "";

try {
  const cachedPentadbir = localStorage.getItem(CACHE_KEY_PENTADBIR);
  if (cachedPentadbir) pentadbirData = JSON.parse(cachedPentadbir);

  const cachedGkmp = localStorage.getItem(CACHE_KEY_GKMP);
  if (cachedGkmp) gkmpData = JSON.parse(cachedGkmp);
} catch (e) {}

const FALLBACK_TEACHERS = [
  { no: 1, nama: "En. Abd Hadi bin Adman", jawatan: "Pengetua" },
  { no: 2, nama: "En. Masnon bin Amat", jawatan: "GPK Pentadbiran" },
  { no: 3, nama: "Pn. Oskasmazila binti Osman", jawatan: "GPK Hal Ehwal Murid" },
  { no: 4, nama: "En. Mohd Zainal bin Mohd Zabir", jawatan: "GPK Kokurikulum" },
  { no: 5, nama: "En. Mohd Nizam bin Subani", jawatan: "GKMP Teknik & Vokasional" },
  { no: 6, nama: "Pn. Rohana binti Jasmin", jawatan: "GKMP Bahasa" },
  { no: 7, nama: "En. Mohamaad Fadzeli bin Azam", jawatan: "GKMP Sains Kemasyarakatan" },
  { no: 8, nama: "En. Mohd Riduwan bin Mohd Yasan", jawatan: "GKMP Sains & Matematik" },
  { no: 9, nama: "Pn. Norul Hafidzah binti Hassan", jawatan: "Guru Kaunseling (GBK)" },
  { no: 10, nama: "Cik Vasugi A/P Sinniah", jawatan: "Guru Penolong" },
  { no: 11, nama: "Hjh Norhayati bt. Md Zain", jawatan: "Guru Penolong / S/U HEM" },
  { no: 12, nama: "Pn. Zaimah binti Samad", jawatan: "Guru Perpustakaan & Media (GPM)" },
  { no: 13, nama: "Pn. Tanty binti Ramli", jawatan: "Guru Penolong" },
  { no: 14, nama: "En. Zainal bin Mohamad Zain", jawatan: "Guru Penolong / S/U Peperiksaan" },
  { no: 15, nama: "Pn. Siti Norhafizah binti Mohd Safie", jawatan: "Guru Penolong / KP Seni Visual" },
  { no: 16, nama: "Pn. Norihan binti Yusof", jawatan: "Guru Penolong / KP Tasawwur" },
  { no: 17, nama: "Pn. Tan Bee Kean", jawatan: "Guru Penolong / KP Bahasa Cina" },
  { no: 18, nama: "Cik Norfaizah binti Ismail", jawatan: "Guru ICT & Data" },
  { no: 19, nama: "Pn. Jessica Chan Lai Peng", jawatan: "Guru Penolong / S/U Kokurikulum" },
  { no: 20, nama: "Cik Lavanya A/P Vejayan", jawatan: "Guru Penolong / S/U Kurikulum" },
  { no: 21, nama: "Pn. Siti Nur Hakimah binti Mohd Noor", jawatan: "Guru Penolong / SPBT" },
  { no: 22, nama: "Pn. Norhamizah binti Shafie", jawatan: "Guru Penolong / KP BM" },
  { no: 23, nama: "Pn. Nurul Hamizah binti Md Said", jawatan: "Guru Penolong" },
  { no: 24, nama: "Pn. Tamilvani A/P Krishnan", jawatan: "Guru Penolong" },
  { no: 25, nama: "En. Muhammad Syadza bin Yusof", jawatan: "Guru Penolong" },
  { no: 26, nama: "En. Muhammad Amirul Aiman bin Zakaria", jawatan: "Guru Penolong / S/U Sukan" },
  { no: 27, nama: "Cik Nur Aina Najwa binti Mohd Nor", jawatan: "Guru Penolong" },
  { no: 28, nama: "Cik Nur Fatin Nazirah binti Rashidi", jawatan: "Guru Penolong" },
  { no: 29, nama: "Cik Siti Haniza binti Imran", jawatan: "Guru Penolong" },
  { no: 30, nama: "Pn. Zarina Meriam binti Othman", jawatan: "Pembantu Tadbir (Kewangan)" }
];

const FALLBACK_ANNOUNCEMENTS = [
  {
    tajuk: "Pendaftaran Sesi Persekolahan 2026",
    tarikh: "10 Januari 2026",
    kategori: "Penting",
    kandungan: "Pendaftaran Tingkatan 1 dan pengesahan semula Tingkatan 2 hingga 5 di Dewan Semekar Hebat."
  },
  {
    tajuk: "Kejohanan Olahraga Tahunan Kali Ke-27",
    tarikh: "13 Februari 2026",
    kategori: "Kokurikulum",
    kandungan: "Melibatkan Rumah Hatiora, Browalia, Kekwa, dan Mawar. Warga sekolah dijemput hadir memeriahkan kejohanan."
  },
  {
    tajuk: "Program Transformasi Sekolah (TS25)",
    tarikh: "Sesi 2026",
    kategori: "Akademik",
    kandungan: "Pembudayaan amalan PAK21 dan kemahiran berfikir aras tinggi (KBAT) untuk seluruh warga pelajar."
  }
];

const FALLBACK_TAKWIM = [
  { tarikh: "12.01.2026", aktiviti: "Hari Pertama Persekolahan Sesi 2026", kategori: "Pengurusan", tindakan: "Semua Guru" },
  { tarikh: "15.01.2026", aktiviti: "Kejohanan Merentas Desa Sekolah", kategori: "Kokurikulum", tindakan: "Unit Kokurikulum" },
  { tarikh: "13.02.2026", aktiviti: "Kejohanan Sukan Tahunan Ke-27", kategori: "Kokurikulum", tindakan: "Majlis Sukan" },
  { tarikh: "21.03.2026 - 29.03.2026", aktiviti: "Cuti Penggal 1 & Hari Raya Aidilfitri", kategori: "Cuti", tindakan: "Semua Murid" },
  { tarikh: "04.05.2026", aktiviti: "Peperiksaan Pertengahan Tahun Bermula", kategori: "Kurikulum", tindakan: "S/U Peperiksaan" }
];

let allTeachersData = [...FALLBACK_TEACHERS];
try {
  const cachedGuru = localStorage.getItem(CACHE_KEY_GURU);
  if (cachedGuru) {
    const parsed = JSON.parse(cachedGuru);
    if (Array.isArray(parsed) && parsed.length > 0) allTeachersData = parsed;
  }
} catch (e) {}

// =================== FUNGSI PEMBANTU TARIKH MALAYSIA ===================
function formatTarikhMalaysia(tarikhStr) {
  if (!tarikhStr) return "-";
  
  // Jika string mengandungi format ISO (ada 'T' atau 'Z' dari Google Sheets)
  const date = new Date(tarikhStr);
  if (!isNaN(date.getTime()) && (String(tarikhStr).includes("T") || String(tarikhStr).includes("Z"))) {
    try {
      return date.toLocaleDateString('ms-MY', {
        timeZone: 'Asia/Kuala_Lumpur',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return tarikhStr;
    }
  }
  
  // Jika ia sudah berupa teks biasa (cth: "10 Januari 2026"), kekalkan
  return tarikhStr;
}

// =================== PAPARAN PENGURUSAN ===================
function renderPentadbirUI() {
  const roles = ["pengetua", "gpk1", "gpkhem", "gpkkoku"];
  roles.forEach(role => {
    const data = pentadbirData[role];
    if (!data) return;

    const nameEl = document.getElementById("admin-name-" + role);
    const photoEl = document.getElementById("admin-photo-" + role);
    const iconEl = document.getElementById("admin-icon-" + role);

    if (nameEl) nameEl.textContent = data.nama;

    if (photoEl && iconEl) {
      if (data.gambar && data.gambar.trim() !== "") {
        photoEl.src = data.gambar;
        photoEl.classList.remove("hidden");
        iconEl.classList.add("hidden");
      } else {
        photoEl.classList.add("hidden");
        iconEl.classList.remove("hidden");
      }
    }
  });
}

function renderGkmpUI() {
  const roles = ["gkmpsm", "gkmptv", "gmpbahasa", "gkmpsk"];
  roles.forEach(role => {
    const data = gkmpData[role];
    if (!data) return;

    const nameEl = document.getElementById("admin-name-" + role);
    const photoEl = document.getElementById("admin-photo-" + role);
    const iconEl = document.getElementById("admin-icon-" + role);

    if (nameEl) nameEl.textContent = data.nama;

    if (photoEl && iconEl) {
      if (data.gambar && data.gambar.trim() !== "") {
        photoEl.src = data.gambar;
        photoEl.classList.remove("hidden");
        iconEl.classList.add("hidden");
      } else {
        photoEl.classList.add("hidden");
        iconEl.classList.remove("hidden");
      }
    }
  });
}

// Handler Borang Pentadbir
function onPentadbirRoleSelect() {
  const roleSelect = document.getElementById("pentadbir-role");
  const nameInput = document.getElementById("pentadbir-name");
  const fileInput = document.getElementById("pentadbir-file");
  const previewImg = document.getElementById("pentadbir-preview-img");
  const previewIcon = document.getElementById("pentadbir-preview-icon");

  if (!roleSelect || !nameInput) return;
  const role = roleSelect.value;
  const current = pentadbirData[role] || DEFAULT_PENTADBIR[role];

  nameInput.value = current.nama;
  currentSelectedImageBase64 = current.gambar || "";
  if (fileInput) fileInput.value = "";

  if (currentSelectedImageBase64) {
    previewImg.src = currentSelectedImageBase64;
    previewImg.classList.remove("hidden");
    previewIcon.classList.add("hidden");
  } else {
    previewImg.classList.add("hidden");
    previewIcon.classList.remove("hidden");
  }
}

function previewPentadbirImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      const MAX = 400;
      let w = img.width, h = img.height;
      if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
      else { if (h > MAX) { w *= MAX / h; h = MAX; } }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      currentSelectedImageBase64 = canvas.toDataURL("image/jpeg", 0.7);

      document.getElementById("pentadbir-preview-img").src = currentSelectedImageBase64;
      document.getElementById("pentadbir-preview-img").classList.remove("hidden");
      document.getElementById("pentadbir-preview-icon").classList.add("hidden");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function submitPentadbirUpdate() {
  const role = document.getElementById("pentadbir-role").value;
  const name = document.getElementById("pentadbir-name").value.trim();
  if (!name) { alert("Sila masukkan nama."); return; }

  const payload = { id: role, jawatan: DEFAULT_PENTADBIR[role].jawatan, nama: name, gambar: currentSelectedImageBase64 };
  pentadbirData[role] = payload;
  try { localStorage.setItem(CACHE_KEY_PENTADBIR, JSON.stringify(pentadbirData)); } catch(e){}
  renderPentadbirUI();

  postDataToScript("updatePentadbir", payload, "btn-submit-pentadbir").then(() => {
    alert("Maklumat Pentadbir berjaya dikemas kini!");
  });
}

// Handler Borang GKMP
function onGkmpRoleSelect() {
  const roleSelect = document.getElementById("gkmp-role");
  const nameInput = document.getElementById("gkmp-name");
  const fileInput = document.getElementById("gkmp-file");
  const previewImg = document.getElementById("gkmp-preview-img");
  const previewIcon = document.getElementById("gkmp-preview-icon");

  if (!roleSelect || !nameInput) return;
  const role = roleSelect.value;
  const current = gkmpData[role] || DEFAULT_GKMP[role];

  nameInput.value = current.nama;
  currentSelectedGkmpImageBase64 = current.gambar || "";
  if (fileInput) fileInput.value = "";

  if (currentSelectedGkmpImageBase64) {
    previewImg.src = currentSelectedGkmpImageBase64;
    previewImg.classList.remove("hidden");
    previewIcon.classList.add("hidden");
  } else {
    previewImg.classList.add("hidden");
    previewIcon.classList.remove("hidden");
  }
}

function previewGkmpImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      const MAX = 400;
      let w = img.width, h = img.height;
      if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
      else { if (h > MAX) { w *= MAX / h; h = MAX; } }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      currentSelectedGkmpImageBase64 = canvas.toDataURL("image/jpeg", 0.7);

      document.getElementById("gkmp-preview-img").src = currentSelectedGkmpImageBase64;
      document.getElementById("gkmp-preview-img").classList.remove("hidden");
      document.getElementById("gkmp-preview-icon").classList.add("hidden");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function submitGkmpUpdate() {
  const role = document.getElementById("gkmp-role").value;
  const name = document.getElementById("gkmp-name").value.trim();
  if (!name) { alert("Sila masukkan nama."); return; }

  const payload = { id: role, jawatan: DEFAULT_GKMP[role].jawatan, nama: name, gambar: currentSelectedGkmpImageBase64 };
  gkmpData[role] = payload;
  try { localStorage.setItem(CACHE_KEY_GKMP, JSON.stringify(gkmpData)); } catch(e){}
  renderGkmpUI();

  postDataToScript("updateGkmp", payload, "btn-submit-gkmp").then(() => {
    alert("Maklumat GKMP berjaya dikemas kini!");
  });
}

// =================== JADUAL GURU ===================
function renderTeachers(teachers) {
  const tbody = document.getElementById("teachers-table-body");
  if (!tbody) return;

  if (!teachers || teachers.length === 0) teachers = FALLBACK_TEACHERS;

  tbody.innerHTML = teachers.map((t, idx) => {
    const no = t.no || (idx + 1);
    let nama = t.nama || t["nama guru"] || t.Nama || "-";
    let jawatan = t.jawatan || t.Jawatan || "-";

    nama = String(nama).replace(/\b(DG\d+|N\d+|C\d+|H\d+)\b/gi, "").trim();
    jawatan = String(jawatan).replace(/\b(DG\d+|N\d+|C\d+|H\d+)\b/gi, "").trim();

    return `
      <tr class="hover:bg-red-50/40 transition">
        <td class="p-3 font-medium text-gray-500 text-center w-16">${no}</td>
        <td class="p-3 font-semibold text-gray-900 text-left pl-6">${nama}</td>
        <td class="p-3 text-red-900 font-medium text-left pl-4">${jawatan}</td>
      </tr>
    `;
  }).join("");
}

// =================== PENGUMUMAN (DENGAN FORMAT TARIKH MALAYSIA & SUSUNAN BILANGAN) ===================
function renderAnnouncements(items) {
  const c = document.getElementById("announcement-container");
  if (!c) return;

  if (!items || items.length === 0) {
    c.className = "flex justify-center";
    c.innerHTML = `
      <div class="col-span-full text-center py-10 text-gray-400 text-xs">
        <p>Tiada pengumuman semasa.</p>
      </div>
    `;
    return;
  }

  const count = items.length;

  // Syarat susunan mengikut bilangan pengumuman:
  // 1 = Tengah
  // 2 = Sebelah-menyebelah berpusat di tengah
  // 3 atau lebih = Grid biasa bermula dari kiri (terkini di kiri)
  if (count === 1) {
    c.className = "flex justify-center";
  } else if (count === 2) {
    c.className = "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto";
  } else {
    c.className = "grid grid-cols-1 md:grid-cols-3 gap-6";
  }

  c.innerHTML = items.map((item) => {
    const cardWidthClass = (count === 1) ? "w-full max-w-md" : "w-full";
    const formattedTarikh = formatTarikhMalaysia(item.tarikh);

    return `
      <div class="bg-white p-6 rounded-xl shadow-sm border-t-4 border-red-900 border-x border-b border-gray-100 flex flex-col justify-between hover:shadow-md transition ${cardWidthClass}">
        <div>
          <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span><i class="fa-regular fa-calendar mr-1"></i> ${formattedTarikh}</span>
            <span class="bg-red-100 text-red-900 font-semibold px-2 py-0.5 rounded">${item.kategori || "Hebahan"}</span>
          </div>
          <h4 class="font-bold text-base text-gray-800 mb-2">${item.tajuk || "Pengumuman"}</h4>
          <p class="text-xs text-gray-600 leading-relaxed">${item.kandungan || ""}</p>
        </div>
      </div>
    `;
  }).join("");
}

function renderTakwim(events) {
  const tbody = document.getElementById("takwim-table-body");
  if (!tbody) return;
  tbody.innerHTML = events.map(e => `
    <tr class="hover:bg-gray-50 transition">
      <td class="p-3 font-bold text-red-950 whitespace-nowrap text-center">${formatTarikhMalaysia(e.tarikh) || "-"}</td>
      <td class="p-3 font-medium text-gray-800 text-center">${e.aktiviti || "-"}</td>
      <td class="p-3 text-center"><span class="bg-yellow-100 text-yellow-900 font-semibold px-2 py-0.5 rounded text-[11px]">${e.kategori || "Program"}</span></td>
      <td class="p-3 text-gray-600 text-center">${e.tindakan || "-"}</td>
    </tr>
  `).join("");
}

// =================== AMBIL DATA (GET) ===================
async function fetchGoogleData() {
  const statusEl = document.getElementById("cms-status");
  const lastUpdatedEl = document.getElementById("last-updated");

  try {
    const res = await fetch(APPS_SCRIPT_URL);
    if (!res.ok) throw new Error("Sambungan pelayan gagal");

    const data = await res.json();
    if (data.status === "success") {
      // Pentadbir
      if (data.pentadbir && Array.isArray(data.pentadbir) && data.pentadbir.length > 0) {
        data.pentadbir.forEach(p => {
          if (p.id && pentadbirData[p.id]) {
            pentadbirData[p.id].nama = p.nama || pentadbirData[p.id].nama;
            if (p.gambar) pentadbirData[p.id].gambar = p.gambar;
          }
        });
        try { localStorage.setItem(CACHE_KEY_PENTADBIR, JSON.stringify(pentadbirData)); } catch(e){}
        renderPentadbirUI();
      }

      // GKMP
      if (data.gkmp && Array.isArray(data.gkmp) && data.gkmp.length > 0) {
        data.gkmp.forEach(g => {
          if (g.id && gkmpData[g.id]) {
            gkmpData[g.id].nama = g.nama || gkmpData[g.id].nama;
            if (g.gambar) gkmpData[g.id].gambar = g.gambar;
          }
        });
        try { localStorage.setItem(CACHE_KEY_GKMP, JSON.stringify(gkmpData)); } catch(e){}
        renderGkmpUI();
      }

      if (data.pengumuman && data.pengumuman.length > 0) {
        renderAnnouncements(data.pengumuman);
      }

      if (data.guru && Array.isArray(data.guru) && data.guru.length > 0) {
        const validTeachers = data.guru.map((t, idx) => ({
          no: t.no || (idx + 1),
          nama: (t.nama || t.Nama || t["nama guru"] || "").replace(/\b(DG\d+|N\d+|C\d+|H\d+)\b/gi, "").trim(),
          jawatan: (t.jawatan || t.Jawatan || "").replace(/\b(DG\d+|N\d+|C\d+|H\d+)\b/gi, "").trim()
        })).filter(t => t.nama !== "");

        if (validTeachers.length > 0) {
          allTeachersData = validTeachers;
          try { localStorage.setItem(CACHE_KEY_GURU, JSON.stringify(allTeachersData)); } catch(e){}
          renderTeachers(allTeachersData);
        }
      }

      if (data.takwim && data.takwim.length > 0) {
        renderTakwim(data.takwim);
      }

      if (statusEl) {
        statusEl.innerHTML = `<span class='text-emerald-700 font-semibold'><i class='fa-solid fa-circle-check text-emerald-500 mr-1'></i> Diselaraskan terus dari Google Sheets</span>`;
      }
      if (lastUpdatedEl) {
        const d = new Date();
        lastUpdatedEl.textContent = `Disemak: ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
    }
  } catch (err) {
    if (statusEl) {
      statusEl.innerHTML = `<span class='text-emerald-700 font-semibold'><i class='fa-solid fa-circle-check text-emerald-500 mr-1'></i> Pangkalan Data Aktif (Tersimpan Secara Kekal)</span>`;
    }
  }
}

// =================== POST DATA ===================
async function postDataToScript(action, data, submitBtnId) {
  const statusEl = document.getElementById("admin-action-status");
  const btn = document.getElementById(submitBtnId);

  if (btn) {
    btn.disabled = true;
    btn.dataset.origText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Menyimpan...`;
  }

  if (statusEl) {
    statusEl.className = "mt-4 text-xs font-semibold text-blue-600 block";
    statusEl.textContent = "Menghantar maklumat ke Google Sheet...";
    statusEl.classList.remove("hidden");
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: action, data: data })
    });

    const result = await res.json();
    if (result.status === "success") {
      if (statusEl) {
        statusEl.className = "mt-4 text-xs font-semibold text-emerald-600 block";
        statusEl.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Maklumat berjaya disimpan ke Google Sheet!`;
      }
      fetchGoogleData();
    } else {
      throw new Error(result.message || "Gagal menyimpan");
    }
  } catch (err) {
    if (statusEl) {
      statusEl.className = "mt-4 text-xs font-semibold text-red-600 block";
      statusEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1"></i> Ralat: ${err.message}`;
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = btn.dataset.origText || "Simpan";
    }
  }
}

function submitNewPengumuman() {
  const payload = {
    tajuk: document.getElementById("ann-title").value.trim(),
    tarikh: document.getElementById("ann-date").value.trim(),
    kategori: document.getElementById("ann-cat").value.trim(),
    kandungan: document.getElementById("ann-desc").value.trim()
  };
  if (!payload.tajuk || !payload.kandungan) {
    alert("Sila isi tajuk dan kandungan pengumuman.");
    return;
  }
  postDataToScript("addPengumuman", payload, "btn-submit-ann").then(() => {
    document.getElementById("ann-title").value = "";
    document.getElementById("ann-date").value = "";
    document.getElementById("ann-cat").value = "";
    document.getElementById("ann-desc").value = "";
  });
}

function submitNewTakwim() {
  const payload = {
    tarikh: document.getElementById("takwim-date").value.trim(),
    aktiviti: document.getElementById("takwim-act").value.trim(),
    kategori: document.getElementById("takwim-cat").value.trim(),
    tindakan: document.getElementById("takwim-action").value.trim()
  };
  if (!payload.tarikh || !payload.aktiviti) {
    alert("Sila isi tarikh dan aktiviti program.");
    return;
  }
  postDataToScript("addTakwim", payload, "btn-submit-takwim").then(() => {
    document.getElementById("takwim-date").value = "";
    document.getElementById("takwim-act").value = "";
    document.getElementById("takwim-cat").value = "";
    document.getElementById("takwim-action").value = "";
  });
}

function submitNewGuru() {
  const payload = {
    no: document.getElementById("guru-no").value.trim(),
    nama: document.getElementById("guru-nama").value.trim(),
    jawatan: document.getElementById("guru-jawatan").value.trim()
  };
  if (!payload.nama || !payload.jawatan) {
    alert("Sila isi nama dan jawatan guru.");
    return;
  }
  postDataToScript("addGuru", payload, "btn-submit-guru").then(() => {
    document.getElementById("guru-no").value = "";
    document.getElementById("guru-nama").value = "";
    document.getElementById("guru-jawatan").value = "";
  });
}

function setupSearch() {
  const s = document.getElementById("teacher-search");
  if (!s) return;
  s.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    const filtered = allTeachersData.filter(t => 
      (t.nama && t.nama.toLowerCase().includes(val)) || 
      (t.jawatan && t.jawatan.toLowerCase().includes(val))
    );
    renderTeachers(filtered);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPentadbirUI();
  renderGkmpUI();
  renderTeachers(allTeachersData);
  renderAnnouncements(FALLBACK_ANNOUNCEMENTS);
  renderTakwim(FALLBACK_TAKWIM);
  setupSearch();
  fetchGoogleData();
});
