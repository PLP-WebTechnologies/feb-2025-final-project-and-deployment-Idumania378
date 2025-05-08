document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSubtotalSpan = document.getElementById('cart-subtotal');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartSummaryDiv = document.getElementById('cart-summary');

    const KES_USD_RATE = 130; // Should be consistent with script.js
    let currentCurrency = localStorage.getItem('currency') || 'USD';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function formatPrice(price, currency) {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) return 'N/A';

        if (currency === 'KES') {
            return `KES ${(numericPrice * KES_USD_RATE).toFixed(2)}`;
        }
        return `$${numericPrice.toFixed(2)}`; // Default to USD
    }

    function renderCartItems() {
        cartItemsList.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (cartSummaryDiv) cartSummaryDiv.style.display = 'none';
            if (cartItemsList) cartItemsList.innerHTML = '<p class="empty-cart-message">Your cart is currently empty. <a href="index.html">Continue shopping</a>.</p>';

            return;
        }

        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (cartSummaryDiv) cartSummaryDiv.style.display = 'block';

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            // Ensure item.price is treated as a number for calculations
            const itemPriceInUSD = parseFloat(item.price);

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">Price: ${formatPrice(itemPriceInUSD, currentCurrency)}</p>
                    <p class="cart-item-id">ID: ${item.id}</p>
                </div>
                <div class="cart-item-actions">
                    <label for="quantity-${item.id}">Qty:</label>
                    <input type="number" id="quantity-${item.id}" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                </div>
                <div class="cart-item-total-price">
                    Subtotal: ${formatPrice(itemPriceInUSD * item.quantity, currentCurrency)}
                </div>
            `;
            cartItemsList.appendChild(itemElement);
        });

        addCartActionListeners();
        updateCartSummary();
    }

    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
        // For now, shipping is free, so total is the same as subtotal.
        const total = subtotal;

        if (cartSubtotalSpan) cartSubtotalSpan.textContent = formatPrice(subtotal, currentCurrency);
        if (cartTotalSpan) cartTotalSpan.textContent = formatPrice(total, currentCurrency);
    }

    function updateQuantity(productId, quantity) {
        const item = cart.find(p => p.id === parseInt(productId));
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity < 1) {
                item.quantity = 1; // Prevent quantity less than 1
            }
            saveCart();
            renderCartItems();
        }
    }

    function removeItem(productId) {
        cart = cart.filter(p => p.id !== parseInt(productId));
        saveCart();
        renderCartItems();
        // Also update the cart count in the main page's header if it were visible/synced
        // For this standalone cart page, this is mainly for consistency.
        updateMainPageCartCount();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // This function is a placeholder as cart.js doesn't directly update index.html's header.
    // However, it demonstrates what would be needed if the header was a shared component.
    function updateMainPageCartCount() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        // If we could access the main page's cart count span, we'd update it here.
        // For now, this logic primarily ensures the cart data is correct for when the user navigates back.
        console.log("Total quantity for main page header (if accessible):", totalQuantity);
    }


    function addCartActionListeners() {
        document.querySelectorAll('.item-quantity').forEach(input => {
            input.addEventListener('change', (e) => {
                updateQuantity(e.target.dataset.id, e.target.value);
            });
        });

        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                removeItem(e.target.dataset.id);
            });
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'checkout.html'; // Navigate to checkout page
            } else {
                alert('Your cart is empty. Please add items before proceeding to checkout.');
            }
        });
    }

    // Initial render
    renderCartItems();
});
