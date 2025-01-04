// Giriş Kontrolü
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        localStorage.setItem('redirectAfterLogin', 'payment.html');
        alert('Lütfen önce giriş yapın.');
        window.location.href = 'login.html';
        return; // Giriş yapılmadıysa geri kalan kod çalışmayacak
    }

    renderCart();
    togglePaymentOption();
});

// Sepeti Görüntüleyecek burası
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const total = parseFloat(localStorage.getItem('cartTotal')) || 0;

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item.service} - $${item.price}`;
        cartItemsContainer.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Ödeme Seçeneklerini Kontrol Ediyo
function togglePaymentOption() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const ibanSection = document.querySelector('.iban-section');
    const creditCardSection = document.querySelector('.credit-card-section');

    if (selectedMethod === 'iban') {
        ibanSection.style.display = 'block';
        creditCardSection.style.display = 'none';
    } else if (selectedMethod === 'credit-card') {
        ibanSection.style.display = 'none';
        creditCardSection.style.display = 'block';
    }
}

// Ödeme Tamamlamandı
function completePayment() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (paymentMethod === 'iban') {
        const receipt = document.getElementById('iban-receipt').files[0];
        if (!receipt) {
            alert('Lütfen dekont yükleyiniz!');
            return;
        }
        alert('IBAN ile ödemeniz tamamlandı.');
    } else if (paymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value;
        const cardHolder = document.getElementById('card-holder').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
            alert('Lütfen kredi kartı bilgilerini eksiksiz giriniz!');
            return;
        }
        alert('Kredi kartı ile ödeme tamamlandı.');
    }

    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');
    window.location.href = 'index.html';
}
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'Misafir';
    const payments = JSON.parse(localStorage.getItem('userPayments')) || {};
    const userPayments = payments[username] || [];

    const paymentHistoryContainer = document.getElementById('payment-history');
    paymentHistoryContainer.innerHTML = '';

    if (userPayments.length === 0) {
        paymentHistoryContainer.textContent = 'Henüz bir ödeme yapılmadı.';
    } else {
        const ul = document.createElement('ul');
        userPayments.forEach((payment, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. Yöntem: ${payment.method}, Tutar: $${payment.amount}, Tarih: ${payment.date}`;
            ul.appendChild(li);
        });
        paymentHistoryContainer.appendChild(ul);
    }
});
