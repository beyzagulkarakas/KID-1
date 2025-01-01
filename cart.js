function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn === 'false') {
        alert('Lütfen giriş yapın!');
        window.location.href = 'login.html';
    }
}

function addToCart(service, price) {
    checkLogin();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = parseFloat(localStorage.getItem('cartTotal')) || 0;

    cart.push({ service, price });
    total += price;

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTotal', total);

    alert(`${service} sepete eklendi.`);
    updateCart();
}

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = parseFloat(localStorage.getItem('cartTotal')) || 0;

    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${item.service} - $${item.price}`;
            cartItems.appendChild(li);
        });
    }

    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

function proceedToPayment() {
    checkLogin();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
        return;
    }
    window.location.href = 'payment.html';
}
