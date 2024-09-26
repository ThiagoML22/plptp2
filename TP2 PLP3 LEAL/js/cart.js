document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const productList = document.getElementById('product-list');
    const clearCartButton = document.getElementById('clear-cart');
    const purchaseForm = document.getElementById('purchase-form');

    // Cargar carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para renderizar los productos en el carrito
    function renderCart() {
        cartItems.innerHTML = ''; // Limpiar el carrito

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>El carrito está vacío</p>';
        } else {
            cart.forEach((product, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <img src="${product.img}" alt="${product.name}" width="50">
                    <span>${product.name} - ${product.price}</span>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                `;
                cartItems.appendChild(itemDiv);
            });
        }
        updateProductList();
    }

    // campo de texto con los productos del carrito
    function updateProductList() {
        productList.value = cart.map(product => `${product.name} - ${product.price}`).join('\n');
    }

    // eliminar un producto del carrito
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1); // Eliminar producto del array
            saveCart(); // Guardar el carrito actualizado en localStorage
            renderCart(); // Renderizar de nuevo
        }
    });

    // vaciar el carrito
    clearCartButton.addEventListener('click', () => {
        cart = []; // Vaciar el carrito
        saveCart(); // Actualizar el carrito en localStorage
        renderCart(); // Volver a renderizar el carrito
    });

    // Guardar carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // realizar la compra
    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el envío del formulario

        if (cart.length === 0) {
            alert('El carrito está vacío. No puedes realizar una compra.');
            return;
        }

        const customerName = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const payment = document.getElementById('payment').value;

        // Mostrar resumen de la compra 
        alert(`Compra realizada por: ${customerName}\nDirección: ${address}\nTeléfono: ${phone}\nEmail: ${email}\nPago: ${payment}\nProductos:\n${productList.value}`);

        // Vaciar carrito después de la compra
        cart = [];
        saveCart();
        renderCart();

        // Restablecer el formulario
        purchaseForm.reset();
    });

    // Inicializar renderizado del carrito al cargar la página
    renderCart();
});
