const kontainer = document.querySelector('.kontainer');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    kontainer.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    kontainer.classList.remove('active');
});

// Giriş Yapma İşlemi
const loginForm = document.querySelector('.login form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Formun varsayılan gönderimini engelle
    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (username && password) {
        if (verifyUser(username, password)) {
            localStorage.setItem('isLoggedIn', 'true'); // Giriş durumunu kaydet
            localStorage.setItem('username', username); // Kullanıcı adını kaydet
            alert('Başarıyla giriş yaptınız!');
            window.location.href = 'index.html'; // Ana sayfaya yönlendir
        } else {
            alert('Kullanıcı adı veya şifre hatalı!');
        }
    } else {
        alert('Lütfen tüm alanları doldurun!');
    }
});

// Kayıt Olma İşlemi
const registerForm = document.querySelector('.register form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    if (username && email && password) {
        localStorage.setItem(`user_${username}`, JSON.stringify({ email, password })); // Kullanıcı bilgilerini sakla
        alert(`Başarıyla kayıt oldunuz, ${username}! Lütfen giriş yapın.`);
        kontainer.classList.remove('active'); // Giriş yap ekranına geçiş
    } else {
        alert('Lütfen tüm alanları doldurun!');
    }
});

// Oturum Kontrolü
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Lütfen önce giriş yapınız!');
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const username = localStorage.getItem('username');
        alert(`Hoşgeldiniz, ${username}!`);
    }
});

// Çıkış Yapma İşlemi
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    alert('Başarıyla çıkış yaptınız!');
    window.location.href = 'login.html';
}

// Şifre Doğrulama ve Yönlendirme
function verifyUser(username, password) {
    const userData = localStorage.getItem(`user_${username}`);
    if (userData) {
        const user = JSON.parse(userData);
        return user.password === password;
    }
    return false;
}

// Ödeme sayfasına erişim kontrolü
if (window.location.pathname.includes('payment.html')) {
    checkLoginStatus();
}

// Kullanıcı Profili Yükleme
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        const profileData = localStorage.getItem(`user_${username}`);
        if (profileData) {
            const { email } = JSON.parse(profileData);
            console.log(`Profil yüklendi: ${username}, ${email}`);
        }
    }
});
