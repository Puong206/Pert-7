document.addEventListener('DOMContentLoaded', function () {
  const forumList = document.getElementById('forumList');
  const forumForm = document.getElementById('forumForm');

  // Ambil data forum dari localStorage saat halaman dimuat
  const savedForums = JSON.parse(localStorage.getItem('forums')) || [];
  renderForums(savedForums);

  // Tambahkan event listener untuk form
  forumForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Ambil data dari form
    const title = document.getElementById('forumTitle').value;
    const category = document.querySelector('input[name="forumCategory"]:checked')?.value;
    const tags = Array.from(document.querySelectorAll('input[name="forumTags"]:checked')).map(tag => tag.value);

    if (!title || !category) {
      alert('Dimana dan Daop harus diisi!');
      return;
    }

    // Tambahkan forum baru ke array
    const newForum = { title, category, tags };
    savedForums.push(newForum);

    // Simpan ke localStorage
    localStorage.setItem('forums', JSON.stringify(savedForums));

    // Render ulang daftar forum
    renderForums(savedForums);

    // Reset form
    forumForm.reset();
  });

  // Fungsi untuk mereset form
  window.resetForumForm = function () {
    forumForm.reset();
  };

  // Fungsi untuk menampilkan daftar forum
  function renderForums(forums) {
    forumList.innerHTML = ''; // Kosongkan daftar forum
    forums.forEach((forum, index) => {
      const forumDiv = document.createElement('div');
      forumDiv.classList.add('forum-item');
      forumDiv.innerHTML = `
        <h3>${forum.title}</h3>
        <p><strong>Daop:</strong> ${forum.category}</p>
        <p><strong>Tag:</strong> ${forum.tags.join(', ') || 'Tidak ada'}</p>
        <button onclick="deleteForum(${index})">Hapus</button>
      `;
      forumList.appendChild(forumDiv);
    });
  }

  // Fungsi untuk menghapus forum berdasarkan indeks
  window.deleteForum = function (index) {
    savedForums.splice(index, 1); // Hapus forum dari array
    localStorage.setItem('forums', JSON.stringify(savedForums)); // Perbarui localStorage
    renderForums(savedForums); // Render ulang daftar forum
  };
});