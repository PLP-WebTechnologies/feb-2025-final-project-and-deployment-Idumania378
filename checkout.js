document.addEventListener('DOMContentLoaded', () => {
    const orderSummaryDiv = document.getElementById('checkout-order-summary');
    const totalAmountSpan = document.getElementById('checkout-total-amount');
    const placeOrderButton = document.getElementById('place-order-button');
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    const emptyCartMessage = orderSummaryDiv ? orderSummaryDiv.querySelector('.empty-cart-message') : null;

    const KES_USD_RATE = 130; // Consistent rate
    let currentCurrency = localStorage.getItem('currency') || 'USD';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function formatPrice(price, currency) {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) return 'N/A';
        if (currency === 'KES') {
            return `KES ${(numericPrice * KES_USD_RATE).toFixed(2)}`;
        }
        return `$${numericPrice.toFixed(2)}`;
    }

    function displayOrderSummary() {
        if (!orderSummaryDiv || !totalAmountSpan) return;

        orderSummaryDiv.innerHTML = ''; // Clear previous summary items

        if (cart.length === 0) {
            if (emptyCartMessage) {
                orderSummaryDiv.appendChild(emptyCartMessage);
                emptyCartMessage.style.display = 'block';
            }
            totalAmountSpan.textContent = formatPrice(0, currentCurrency);
            if (placeOrderButton) placeOrderButton.disabled = true; // Disable button if cart is empty
            return;
        }

        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (placeOrderButton) placeOrderButton.disabled = false;

        let subtotal = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('checkout-summary-item');
            const itemPriceInUSD = parseFloat(item.price);
            const itemTotal = itemPriceInUSD * item.quantity;
            subtotal += itemTotal;
            itemElement.innerHTML = `
                <span class="summary-item-name">${item.name} (x${item.quantity})</span>
                <span class="summary-item-price">${formatPrice(itemTotal, currentCurrency)}</span>
            `;
            orderSummaryDiv.appendChild(itemElement);
        });

        totalAmountSpan.textContent = formatPrice(subtotal, currentCurrency);
    }

    function validateForm(form) {
        if (!form) return false;
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('input-error');
                // You could add a message next to the input
            } else {
                input.classList.remove('input-error');
            }

            // Basic email validation (if an email field exists and is required)
            if (input.type === 'email' && input.value.trim() && !/\S+@\S+\.\S+/.test(input.value)) {
                isValid = false;
                input.classList.add('input-error');
            }
        });
        return isValid;
    }

    function handlePlaceOrder() {
        const isShippingValid = validateForm(shippingForm);
        const isPaymentValid = validateForm(paymentForm);

        if (isShippingValid && isPaymentValid) {
            alert('Order Placed Successfully! Thank you for your purchase.');
            // Clear cart
            localStorage.removeItem('cart');
            cart = [];
            // Update cart count in header if it exists (e.g. if header was a global component)
            // localStorage.setItem('cart', JSON.stringify(cart));
            // To reflect changes immediately for other parts of the site relying on cart data

            // Redirect to a thank you page or homepage
            window.location.href = 'index.html';
        } else {
            alert('Please fill in all required fields correctly.');
        }
    }

    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', handlePlaceOrder);
    }

    // Initial display
    displayOrderSummary();
});
