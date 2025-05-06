document.addEventListener('DOMContentLoaded', function () {
  // Ambil data dari localStorage saat halaman dimuat
  const savedData = JSON.parse(localStorage.getItem('biodata'));
  if (savedData) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
      <p><strong>Nama:</strong> ${savedData.nama}</p>
      <p><strong>NIM:</strong> ${savedData.nim}</p>
      <p><strong>Jenis Kelamin:</strong> ${savedData.jk || 'Tidak dipilih'}</p>
    `;
  }
});

document.getElementById('biodataForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Ambil data dari form
  const nama = document.getElementById('nama').value;
  const nim = document.getElementById('nim').value;
  const jk = document.querySelector('input[name="jk"]:checked')?.value;

  // Simpan data ke localStorage
  const biodata = { nama, nim, jk };
  localStorage.setItem('biodata', JSON.stringify(biodata));

  // Tampilkan data di div output
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>NIM:</strong> ${nim}</p>
    <p><strong>Jenis Kelamin:</strong> ${jk || 'Tidak dipilih'}</p>
  `;
});