// Simpan data akun di localStorage
if (!localStorage.getItem('accounts')) {
    localStorage.setItem('accounts', JSON.stringify([]));
}

// Fungsi Register
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Username dan password harus diisi!');
        return;
    }

    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const existingAccount = accounts.find(acc => acc.username === username);

    if (existingAccount) {
        alert('Username sudah digunakan!');
        return;
    }

    accounts.push({ username, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert('Registrasi berhasil! Silakan login.');
    window.location.href = 'login.html';
}

// Fungsi Login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Username dan password harus diisi!');
        return;
    }

    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const validAccount = accounts.find(acc => acc.username === username && acc.password === password);

    if (validAccount) {
        localStorage.setItem('loggedIn', true); // Simpan status login
        alert('Login berhasil!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Username atau password salah!');
    }
}

// Fungsi untuk memeriksa status login
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const loginButton = document.querySelector('.btn-login');

    if (isLoggedIn) {
        loginButton.textContent = 'Logout';
        loginButton.href = '#'; // Hapus link ke halaman login
        loginButton.onclick = function () {
            localStorage.removeItem('loggedIn'); // Hapus status login
            window.location.href = 'index.html'; // Redirect ke halaman utama
        };
    } else {
        loginButton.textContent = 'Login';
        loginButton.href = 'login.html'; // Link ke halaman login
        loginButton.onclick = null; // Hapus event onclick
    }
}

// Panggil fungsi ini di setiap halaman
checkLoginStatus();