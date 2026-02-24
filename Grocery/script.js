document.addEventListener("DOMContentLoaded", function () {

    let cartItems = [];

   const products = [
    // 🥛 Dairy
    { id: 1, name: "Milk", price: 40, image: "Images/milk.jpg" },
    { id: 2, name: "Butter", price: 55, image: "Images/butter.jpg" },
    { id: 3, name: "Cheese", price: 110, image: "Images/cheese.jpg" },
    { id: 4, name: "Paneer", price: 90, image: "Images/paneer.jpg" },
    { id: 5, name: "Curd", price: 35, image: "Images/curd.jpg" },

    // 🥦 Vegetables
    { id: 6, name: "Tomato", price: 20, image: "Images/tomato.jpg" },
    { id: 7, name: "Potato", price: 22, image: "Images/potato.jpg" },
    { id: 8, name: "Onion", price: 18, image: "Images/onion.jpg" },
    { id: 9, name: "Carrot", price: 25, image: "Images/carrot.jpg" },
    { id: 10, name: "Cabbage", price: 30, image: "Images/cabbage.jpg" },
    { id: 11, name: "Spinach", price: 15, image: "Images/spinach.jpg" },

    // 🍎 Fruits
    { id: 12, name: "Apple", price: 120, image: "Images/apple.jpg" },
    { id: 13, name: "Banana", price: 60, image: "Images/banana.jpg" },
    { id: 14, name: "Orange", price: 80, image: "Images/orange.jpg" },
    { id: 15, name: "Mango", price: 150, image: "Images/mango.jpg" },
    { id: 16, name: "Grapes", price: 90, image: "Images/grapes.jpg" },

    // 🍞 Bakery
    { id: 17, name: "Bread", price: 30, image: "Images/bread.jpg" },
    { id: 18, name: "Buns", price: 25, image: "Images/buns.jpg" },
    { id: 19, name: "Cake", price: 250, image: "Images/cake.jpg" },
    { id: 20, name: "Cookies", price: 40, image: "Images/cookies.jpg" },

    // 🍚 Grocery
    { id: 21, name: "Rice", price: 70, image: "Images/rice.jpg" },
    { id: 22, name: "Wheat Flour", price: 65, image: "Images/flour.jpg" },
    { id: 23, name: "Sugar", price: 35, image: "Images/sugar.jpg" },
    { id: 24, name: "Salt", price: 20, image: "Images/salt.jpg" },
    { id: 25, name: "Tea", price: 120, image: "Images/tea.jpg" },
    { id: 26, name: "Coffee", price: 150, image: "Images/coffee.jpg" },

    // 🥤 Beverages
    { id: 27, name: "Cold Drink", price: 45, image: "Images/colddrink.jpg" },
    { id: 28, name: "Juice", price: 60, image: "Images/juice.jpg" },
    { id: 29, name: "Mineral Water", price: 20, image: "Images/water.jpg" },

    // 🥚 Others
    { id: 30, name: "Eggs", price: 75, image: "Images/eggs.jpg" }
];

    const recommendationMap = {
    "Milk": ["Bread", "Butter", "Tea"],
    "Butter": ["Bread", "Jam"],
    "Cheese": ["Bread", "Tomato"],
    "Paneer": ["Tomato", "Onion"],

    "Tomato": ["Onion", "Potato"],
    "Potato": ["Onion", "Cabbage"],
    "Onion": ["Tomato", "Potato"],
    "Carrot": ["Cabbage", "Spinach"],

    "Apple": ["Banana", "Orange"],
    "Banana": ["Milk", "Apple"],
    "Orange": ["Apple", "Juice"],
    "Mango": ["Grapes", "Juice"],

    "Bread": ["Butter", "Jam"],
    "Cake": ["Cold Drink"],
    "Cookies": ["Tea", "Coffee"],

    "Rice": ["Wheat Flour", "Salt"],
    "Wheat Flour": ["Rice", "Salt"],
    "Sugar": ["Tea", "Coffee"],
    "Tea": ["Sugar", "Cookies"],
    "Coffee": ["Sugar", "Cookies"],

    "Eggs": ["Bread", "Butter"],
    "Cold Drink": ["Chips"],
    "Juice": ["Apple", "Orange"]
};

    const productsContainer = document.querySelector(".products");
    const recommendContainer = document.querySelector(".recommendations");
    const searchInput = document.querySelector(".search-box");
    const cartDropdown = document.getElementById("cart-dropdown");
    const cartCount = document.getElementById("cart-count");

    /* ================= DISPLAY PRODUCTS ================= */

    function displayProducts(list) {
        productsContainer.innerHTML = "";

        list.forEach(product => {
            productsContainer.innerHTML += `
                <div class="card">
                    <img src="${product.image}">
                    <h4>${product.name}</h4>
                    <p>₹ ${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        });
    }

    /* ================= ADD TO CART ================= */

    window.addToCart = function (id) {
        const item = products.find(p => p.id === id);
        const existing = cartItems.find(p => p.id === id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cartItems.push({ ...item, quantity: 1 });
        }

        showRecommendations(item.name);
        renderCart();
    };

    /* ================= RENDER CART ================= */

    function renderCart() {
        cartDropdown.innerHTML = "";

        if (cartItems.length === 0) {
            cartDropdown.innerHTML = "<p class='empty-cart'>Your cart is empty</p>";
            cartCount.innerText = 0;
            return;
        }

        let total = 0;
        let count = 0;

        cartItems.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            cartDropdown.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" class="cart-img">

                    <div class="cart-details">
                        <span class="cart-name">${item.name}</span>
                        <div class="cart-qty">
                            <button onclick="decreaseQty(${item.id})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="increaseQty(${item.id})">+</button>
                        </div>
                        <span class="remove" onclick="removeItem(${item.id})">Remove</span>
                    </div>

                    <div class="cart-price">₹${item.price * item.quantity}</div>
                </div>
            `;
        });

        cartDropdown.innerHTML += `
            <div class="cart-footer">
                <div class="cart-total">Total: ₹${total}</div>
                <button class="checkout-btn" onclick="checkout()">Checkout</button>
            </div>
        `;

        cartCount.innerText = count;
    }

    /* ================= CART OPERATIONS ================= */

    window.increaseQty = function (id) {
        const item = cartItems.find(p => p.id === id);
        item.quantity += 1;
        renderCart();
    };

    window.decreaseQty = function (id) {
        const item = cartItems.find(p => p.id === id);

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cartItems = cartItems.filter(p => p.id !== id);
        }

        renderCart();
    };

    window.removeItem = function (id) {
        cartItems = cartItems.filter(p => p.id !== id);
        renderCart();
    };

    window.checkout = function () {
        alert("Order placed successfully! 🎉");
        cartItems = [];
        renderCart();
    };

    /* ================= RECOMMENDATIONS ================= */

    function showRecommendations(productName) {
        recommendContainer.innerHTML = "";

        if (!recommendationMap[productName]) return;

        recommendationMap[productName].forEach(name => {
            const item = products.find(p => p.name === name);
            if (!item) return;

            recommendContainer.innerHTML += `
                <div class="card">
                    <img src="${item.image}">
                    <h4>${item.name}</h4>
                    <p>₹ ${item.price}</p>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            `;
        });
    }

    /* ================= SEARCH ================= */

    searchInput.addEventListener("keyup", () => {
        const value = searchInput.value.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(value)
        );
        displayProducts(filtered);
    });

    displayProducts(products);

    /* ================= TOGGLE CART ================= */

    window.toggleCart = function () {
        cartDropdown.style.display =
            cartDropdown.style.display === "block" ? "none" : "block";
    };

});