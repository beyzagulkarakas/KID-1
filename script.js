// Kontainer ve butonlar
const kontainer = document.querySelector('.kontainer');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Buton tıklama olayları
if (registerBtn && kontainer) {
    registerBtn.addEventListener('click', () => {
        kontainer.classList.add('active');
    });
}

if (loginBtn && kontainer) {
    loginBtn.addEventListener('click', () => {
        kontainer.classList.remove('active');
    });
}

// Giriş Yapma İşlemi
const loginForm = document.querySelector('.login form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Formun varsayılan gönderimini engelle
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        if (username && password) {
            if (verifyUser(username, password)) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                alert('Başarıyla giriş yaptınız!');
                window.location.href = 'index.html';
            } else {
                alert('Kullanıcı adı veya şifre hatalı!');
            }
        } else {
            alert('Lütfen tüm alanları doldurun!');
        }
    });
}

// Kayıt Olma İşlemi
const registerForm = document.querySelector('.register form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

<<<<<<< HEAD
    if (username && email && password) {
        const userExists = localStorage.getItem(`user_${username}`);
        if (userExists) {
            alert('Bu kullanıcı adı zaten mevcut. Farklı bir kullanıcı adı seçin.');
        } else {
            localStorage.setItem(`user_${username}`, JSON.stringify({ email, password })); // Kullanıcı bilgilerini sakla
            alert(`Başarıyla kayıt oldunuz, ${username}! Lütfen giriş yapın.`);
            kontainer.classList.remove('active'); // Giriş yap ekranına geçiş
        }
    } else {
        alert('Lütfen tüm alanları doldurun!');
    }
});
=======
        if (username && email && password) {
            localStorage.setItem(`user_${username}`, JSON.stringify({ email, password }));
            alert(`Başarıyla kayıt oldunuz, ${username}! Lütfen giriş yapın.`);
            kontainer.classList.remove('active'); // Giriş yap ekranına geçiş
        } else {
            alert('Lütfen tüm alanları doldurun!');
        }
    });
}
>>>>>>> f20a39c7a64c5d6a55209ed2ceeca2eaf4590f3a

// Oturum Kontrolü
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Lütfen önce giriş yapınız!');
        window.location.href = 'login.html';
    }
}

<<<<<<< HEAD
=======
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const username = localStorage.getItem('username');
        alert(`Hoşgeldiniz, ${username}!`);
    }
});

>>>>>>> f20a39c7a64c5d6a55209ed2ceeca2eaf4590f3a
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
document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    if (username) {
        const profileData = localStorage.getItem(`user_${username}`);
        if (profileData) {
            const { email } = JSON.parse(profileData);
            console.log(`Profil yüklendi: ${username}, ${email}`);
        }
    }
});

// Swiper Başlatma
document.addEventListener('DOMContentLoaded', function () {
    const swiperContainer = document.querySelector('.swiper-container');
    if (swiperContainer) {
        const swiper = new Swiper('.swiper-container', {
            loop: true, // Sonsuz döngü
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            slidesPerView: 3, // Aynı anda 3 duyuru göster
            spaceBetween: 20, // Kartlar arasında boşluk
            breakpoints: {
                1024: {
                    slidesPerView: 3, // Geniş ekranlarda 3 duyuru
                },
                768: {
                    slidesPerView: 2, // Orta ekranlarda 2 duyuru
                },
                480: {
                    slidesPerView: 1, // Küçük ekranlarda 1 duyuru
                }
            }
        });
    }
});
