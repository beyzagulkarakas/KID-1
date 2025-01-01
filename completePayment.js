// completePayment.js

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        alert('Lütfen önce giriş yapınız.');
        window.location.href = 'login.html'; // Giriş sayfasına yönlendir
    }

    renderCart();
    togglePaymentOption();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = parseFloat(localStorage.getItem('cartTotal')) || 0;

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

function completePayment() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Ödeme yapmadan önce giriş yapmanız gerekiyor!');
        window.location.href = 'login.html';
        return;
    }

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
