/**
 * SEMEKAR Web App Engine
 * Portal Rasmi SMK Kamarul Ariffin
 */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwtIFAIyiMWOdDJsneV6VGEqRbGnxHr1mpXpv2ihZUYcwSM6BFQvymaw36kIyZ1c3yhSw/exec";

// Data Sandaran Sesi 2026 (Nama Terkini & Tanpa Gred)
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

// =================== POST DATA KE GOOGLE SHEET ===================
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

// =================== PENGAMBILAN DATA (GET) ===================
async function fetchGoogleData() {
  const statusEl = document.getElementById("cms-status");
  const lastUpdatedEl = document.getElementById("last-updated");

  try {
    const res = await fetch(APPS_SCRIPT_URL);
    if (!res.ok) throw new Error("Sambungan pelayan gagal");

    const data = await res.json();
    if (data.status === "success") {
      renderAnnouncements(data.pengumuman && data.pengumuman.length ? data.pengumuman : FALLBACK_ANNOUNCEMENTS);
      allTeachersData = data.guru && data.guru.length ? data.guru : FALLBACK_TEACHERS;
      renderTeachers(allTeachersData);
      renderTakwim(data.takwim && data.takwim.length ? data.takwim : FALLBACK_TAKWIM);

      if (statusEl) {
        statusEl.innerHTML = `<span class='text-emerald-700 font-semibold'><i class='fa-solid fa-circle-check text-emerald-500 mr-1'></i> Diselaraskan terus dari Google Sheets</span>`;
      }
      if (lastUpdatedEl) {
        const d = new Date();
        lastUpdatedEl.textContent = `Disemak: ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    renderAnnouncements(FALLBACK_ANNOUNCEMENTS);
    renderTeachers(FALLBACK_TEACHERS);
    renderTakwim(FALLBACK_TAKWIM);
    if (statusEl) {
      statusEl.innerHTML = `<span class='text-amber-700 font-semibold'><i class='fa-solid fa-triangle-exclamation text-amber-500 mr-1'></i> Mod Sandaran: Memaparkan Data Pratetap 2026</span>`;
    }
  }
}

function renderAnnouncements(items) {
  const c = document.getElementById("announcement-container");
  if (!c) return;
  c.innerHTML = items.map(item => `
    <div class="bg-white p-6 rounded-xl shadow-sm border-t-4 border-red-900 border-x border-b border-gray-100 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span><i class="fa-regular fa-calendar mr-1"></i> ${item.tarikh || "-"}</span>
          <span class="bg-red-100 text-red-900 font-semibold px-2 py-0.5 rounded">${item.kategori || "Hebahan"}</span>
        </div>
        <h4 class="font-bold text-base text-gray-800 mb-2">${item.tajuk || "Pengumuman"}</h4>
        <p class="text-xs text-gray-600 leading-relaxed">${item.kandungan || ""}</p>
      </div>
    </div>
  `).join("");
}

function renderTeachers(teachers) {
  const tbody = document.getElementById("teachers-table-body");
  if (!tbody) return;
  tbody.innerHTML = teachers.map((t, idx) => `
    <tr class="hover:bg-red-50/40 transition">
      <td class="p-3 font-medium text-gray-500">${t.no || idx + 1}</td>
      <td class="p-3 font-semibold text-gray-900">${t.nama || "-"}</td>
      <td class="p-3 text-red-900 font-medium">${t.jawatan || "-"}</td>
    </tr>
  `).join("");
}

function renderTakwim(events) {
  const tbody = document.getElementById("takwim-table-body");
  if (!tbody) return;
  tbody.innerHTML = events.map(e => `
    <tr class="hover:bg-gray-50 transition">
      <td class="p-3 font-bold text-red-950 whitespace-nowrap">${e.tarikh || "-"}</td>
      <td class="p-3 font-medium text-gray-800">${e.aktiviti || "-"}</td>
      <td class="p-3"><span class="bg-yellow-100 text-yellow-900 font-semibold px-2 py-0.5 rounded text-[11px]">${e.kategori || "Program"}</span></td>
      <td class="p-3 text-gray-600">${e.tindakan || "-"}</td>
    </tr>
  `).join("");
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
  setupSearch();
  fetchGoogleData();
});
