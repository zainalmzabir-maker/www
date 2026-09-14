// =================== FUNGSI PEMBANTU TARIKH MALAYSIA ===================
function formatTarikhMalaysia(tarikhStr) {
  if (!tarikhStr) return "-";
  
  // Cuba tukar terus kepada objek Tarikh
  const date = new Date(tarikhStr);
  
  // Jika ia adalah tarikh yang sah (valid date)
  if (!isNaN(date.getTime())) {
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
  
  // Jika gagal, kekalkan teks asal
  return tarikhStr;
}
