document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const productGrid = document.getElementById('product-grid');
    const cartCountSpan = document.getElementById('cart-count');
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeQuickView = document.getElementById('close-quick-view');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductCategory = document.getElementById('modal-product-category');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
    const backToTopButton = document.getElementById('back-to-top');
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    const loadMoreButton = document.getElementById('load-more-products');

    // More elements
    const currencySwitcher = document.getElementById('currency-switcher');
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmailInput = document.getElementById('newsletter-email');
    const signinLink = document.getElementById('signin-link');
    const registerLink = document.getElementById('register-link');
    // Removed: const liveChatButton = document.getElementById('live-chat');

    const KES_USD_RATE = 130; //  rate: 1 USD = 130 KES
    let currentCurrency = localStorage.getItem('currency') || 'USD';

    // Sample Product Data (Ideally  an API)
    let allProducts = [
        { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'electronics', rating: 4.5, image: 'https://images.pexels.com/photos/8038334/pexels-photo-8038334.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'High-quality wireless headphones with noise cancellation.' },
        { id: 2, name: 'Stylish T-Shirt', price: 24.99, category: 'fashion', rating: 4.2, image: 'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Comfortable and stylish cotton t-shirt.' },
        { id: 3, name: 'Coffee Maker', price: 49.50, category: 'home', rating: 4.7, image: 'https://images.pexels.com/photos/10880486/pexels-photo-10880486.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Programmable coffee maker for your daily brew.' },
        { id: 4, name: 'Smartwatch Series X', price: 199.00, category: 'electronics', rating: 4.8, image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Feature-rich smartwatch with health tracking.' },
        { id: 5, name: 'Designer Jeans', price: 89.00, category: 'fashion', rating: 4.3, image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Premium denim jeans for a perfect fit.' },
        { id: 6, name: 'Bookshelf', price: 120.00, category: 'home', rating: 4.0, image: 'https://images.pexels.com/photos/1125130/pexels-photo-1125130.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Modern and sturdy bookshelf for your collection.' },
        { id: 7, name: 'Bluetooth Speaker', price: 35.99, category: 'electronics', rating: 4.6, image: 'https://images.pexels.com/photos/31961129/pexels-photo-31961129/free-photo-of-portable-speaker-in-lush-greenery-and-daisies.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Portable Bluetooth speaker with great sound.' },
        { id: 8, name: 'Summer Dress', price: 45.00, category: 'fashion', rating: 4.4, image: 'https://images.pexels.com/photos/31971087/pexels-photo-31971087/free-photo-of-serene-beach-portrait-of-woman-in-summer-dress.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Light and airy summer dress.' },
        { id: 9, name: 'Smartphone', price: 799.00, category: 'electronics', rating: 4.9, image: 'https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Latest model with incredible performance and camera.' },
        { id: 10, name: 'Sneakers', price: 59.99, category: 'fashion', rating: 4.5, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Stylish and comfortable sneakers for daily wear.' },
        { id: 11, name: 'Electric Kettle', price: 29.99, category: 'home', rating: 4.1, image: 'https://images.pexels.com/photos/1921673/pexels-photo-1921673.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Quick-boil electric kettle with auto shut-off.' },
        { id: 12, name: 'Gaming Mouse', price: 49.99, category: 'electronics', rating: 4.8, image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'High precision gaming mouse with customizable buttons.' },
        { id: 13, name: 'Casual Shirt', price: 39.00, category: 'fashion', rating: 4.3, image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Perfect for a laid-back look, comfortable and breathable.' },
        { id: 14, name: 'Blender', price: 60.00, category: 'home', rating: 4.2, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Blender', description: 'Smoothie and juice blender with multiple speed settings.' },
        { id: 15, name: 'Laptop Sleeve', price: 19.99, category: 'electronics', rating: 4.0, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Sleeve', description: 'Protective sleeve for 13-inch laptops.' },
        { id: 16, name: 'Handbag', price: 120.00, category: 'fashion', rating: 4.6, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Handbag', description: 'Designer handbag with chic and sleek design.' },
        { id: 17, name: 'Air Purifier', price: 199.99, category: 'home', rating: 4.7, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Purifier', description: 'Keep the air in your home fresh and clean.' },
        { id: 18, name: 'Gaming Chair', price: 299.99, category: 'home', rating: 4.9, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Chair', description: 'Ergonomic gaming chair for ultimate comfort.' },
        { id: 19, name: 'Cordless Vacuum', price: 150.00, category: 'home', rating: 4.3, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Vacuum', description: 'Lightweight cordless vacuum for easy cleaning.' },
        { id: 20, name: 'Backpack', price: 59.99, category: 'fashion', rating: 4.4, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Backpack', description: 'Durable backpack for daily use.' },
        { id: 21, name: 'Smart TV', price: 499.00, category: 'electronics', rating: 4.7, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=TV', description: '4K UHD smart TV with excellent picture quality.' },
        { id: 22, name: 'Kitchen Knife Set', price: 89.99, category: 'home', rating: 4.6, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Knives', description: 'Professional chef knife set for your kitchen.' },
        { id: 23, name: 'Smart Thermostat', price: 129.99, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Thermostat', description: 'Energy-efficient smart thermostat for home comfort.' },
        { id: 24, name: 'Portable Charger', price: 29.99, category: 'electronics', rating: 4.2, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Charger', description: 'Compact portable charger for on-the-go charging.' },
        { id: 25, name: 'Designer Wallet', price: 79.00, category: 'fashion', rating: 4.8, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Wallet', description: 'Luxurious leather wallet for a refined look.' },
        { id: 26, name: '4K Camera', price: 350.00, category: 'electronics', rating: 4.7, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Camera', description: 'Capture breathtaking 4K videos with this camera.' },
        { id: 27, name: 'Men’s Watch', price: 150.00, category: 'fashion', rating: 4.5, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Watch', description: 'Stylish men’s wristwatch with modern design.' },
        { id: 28, name: 'Standing Desk', price: 250.00, category: 'home', rating: 4.6, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Desk', description: 'Adjustable standing desk for healthier working.' },
        { id: 29, name: 'Smart Glasses', price: 199.99, category: 'electronics', rating: 4.4, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Glasses', description: 'Augmented reality glasses for a futuristic experience.' },
        { id: 30, name: 'Sports Bra', price: 39.99, category: 'fashion', rating: 4.6, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Bra', description: 'Comfortable and supportive sports bra.' },
        { id: 31, name: 'Electric Scooter', price: 499.00, category: 'electronics', rating: 4.8, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Scooter', description: 'Eco-friendly electric scooter for urban commuting.' },
        { id: 32, name: 'Wireless Mouse', price: 29.00, category: 'electronics', rating: 4.3, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Wireless+Mouse', description: 'Compact wireless mouse for easy navigation.' },
        { id: 33, name: 'Smart Light Bulb', price: 15.00, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Smart+Light', description: 'Wi-Fi enabled smart bulb for home automation.' },
        { id: 34, name: 'Portable Speaker', price: 65.00, category: 'electronics', rating: 4.4, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Portable+Speaker', description: 'Durable and waterproof portable speaker.' },
        { id: 35, name: 'Luxury Perfume', price: 120.00, category: 'fashion', rating: 4.6, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Perfume', description: 'Elegant fragrance with a floral scent.' },
        { id: 36, name: 'Smartphone Case', price: 19.99, category: 'electronics', rating: 4.2, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Smartphone+Case', description: 'Protective case for smartphones.' },
        { id: 37, name: 'Fitness Tracker', price: 79.99, category: 'electronics', rating: 4.5, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Fitness+Tracker', description: 'Track your steps and workouts with this wearable device.' },
        { id: 38, name: 'Yoga Mat', price: 25.00, category: 'home', rating: 4.3, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Yoga+Mat', description: 'Non-slip mat for your yoga sessions.' },
        { id: 39, name: 'Dress Shoes', price: 89.99, category: 'fashion', rating: 4.7, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Dress+Shoes', description: 'Elegant shoes for formal occasions.' },
        { id: 40, name: 'Smart Home Hub', price: 129.99, category: 'home', rating: 4.6, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Home+Hub', description: 'Central hub for controlling smart devices in your home.' },
        { id: 41, name: 'Leather Jacket', price: 199.00, category: 'fashion', rating: 4.8, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Jacket', description: 'Classic leather jacket for timeless style.' },
        { id: 42, name: 'Robot Vacuum', price: 299.99, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Vacuum', description: 'Robot vacuum for automated floor cleaning.' },
        { id: 43, name: 'Sunglasses', price: 69.99, category: 'fashion', rating: 4.7, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Sunglasses', description: 'Stylish sunglasses for sunny days.' },
        { id: 44, name: 'Smart Door Lock', price: 179.00, category: 'home', rating: 4.8, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Door+Lock', description: 'Keyless entry with a smart door lock system.' },
        { id: 45, name: 'Mini Fridge', price: 100.00, category: 'home', rating: 4.4, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Fridge', description: 'Compact fridge perfect for small spaces.' },
        { id: 46, name: 'Electric Shaver', price: 39.99, category: 'electronics', rating: 4.5, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Shaver', description: 'Rechargeable electric shaver for smooth shaving.' },
        { id: 47, name: 'Wristwatch', price: 120.00, category: 'fashion', rating: 4.3, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Wristwatch', description: 'Sleek wristwatch for a sophisticated look.' },
        { id: 48, name: 'Coffee Table', price: 150.00, category: 'home', rating: 4.6, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Coffee+Table', description: 'Modern coffee table for your living room.' },
        { id: 49, name: 'Digital Camera', price: 299.00, category: 'electronics', rating: 4.8, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Camera', description: 'Capture stunning images with this digital camera.' },
        { id: 50, name: 'Air Fryer', price: 130.00, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Air+Fryer', description: 'Healthy cooking with this air fryer.' },
        { id: 51, name: 'Smartphone Charger', price: 15.99, category: 'electronics', rating: 4.0, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Charger', description: 'Fast charging cable for smartphones.' },
        { id: 52, name: 'Winter Coat', price: 149.00, category: 'fashion', rating: 4.7, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Winter+Coat', description: 'Stay warm and stylish with this winter coat.' },
        { id: 53, name: 'Laptop Stand', price: 39.99, category: 'home', rating: 4.4, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Laptop+Stand', description: 'Ergonomic laptop stand for a comfortable viewing angle.' },
        { id: 54, name: 'Smart Bulb Kit', price: 40.00, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Smart+Bulb', description: 'Complete smart lighting solution for your home.' },
        { id: 55, name: 'Running Shoes', price: 99.99, category: 'fashion', rating: 4.6, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Running+Shoes', description: 'Comfortable and durable running shoes for athletes.' },
        { id: 56, name: 'Smart Mirror', price: 499.99, category: 'electronics', rating: 4.8, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Mirror', description: 'Interactive smart mirror with display features.' },
        { id: 57, name: 'Wooden Bookshelf', price: 120.00, category: 'home', rating: 4.2, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Wooden+Bookshelf', description: 'Sustainable wooden bookshelf for a classic look.' },
        { id: 58, name: 'Gym Shorts', price: 29.99, category: 'fashion', rating: 4.3, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Gym+Shorts', description: 'Comfortable shorts for gym workouts.' },
        { id: 59, name: 'Electric Toothbrush', price: 49.00, category: 'electronics', rating: 4.6, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Toothbrush', description: 'Rechargeable electric toothbrush for superior cleaning.' },
        { id: 60, name: 'Smart Doorbell', price: 129.00, category: 'home', rating: 4.7, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Doorbell', description: 'Video doorbell with smart features for home security.' },
        { id: 61, name: 'Leather Belt', price: 39.99, category: 'fashion', rating: 4.5, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Belt', description: 'High-quality leather belt for everyday use.' },
        { id: 62, name: 'Tablet', price: 299.99, category: 'electronics', rating: 4.7, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Tablet', description: 'Portable tablet with impressive performance.' },
        { id: 63, name: 'Smart Scale', price: 59.99, category: 'home', rating: 4.4, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Smart+Scale', description: 'Track your health with this smart scale.' },
        { id: 64, name: 'Camping Tent', price: 129.00, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Tent', description: 'Durable camping tent for outdoor adventures.' },
        { id: 65, name: 'Hand Mixer', price: 45.00, category: 'home', rating: 4.3, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Hand+Mixer', description: 'Powerful hand mixer for baking and cooking.' },
        { id: 66, name: 'Chinos', price: 59.00, category: 'fashion', rating: 4.6, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Chinos', description: 'Comfortable and stylish chinos for any occasion.' },
        { id: 67, name: 'Electric Grill', price: 99.00, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Grill', description: 'Indoor electric grill for grilling all year round.' },
        { id: 68, name: 'Running Jacket', price: 69.00, category: 'fashion', rating: 4.6, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Running+Jacket', description: 'Lightweight running jacket for outdoor workouts.' },
        { id: 69, name: 'Smart Watch', price: 199.99, category: 'electronics', rating: 4.7, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Smartwatch', description: 'Feature-packed smartwatch with heart rate monitor.' },
        { id: 70, name: 'Dining Table Set', price: 499.00, category: 'home', rating: 4.8, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Dining+Set', description: 'Elegant dining table set with matching chairs.' },
        { id: 71, name: 'Smart Water Bottle', price: 45.00, category: 'electronics', rating: 4.5, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Water+Bottle', description: 'Smart water bottle to track your hydration goals.' },
        { id: 72, name: 'Bean Bag Chair', price: 99.00, category: 'home', rating: 4.3, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Bean+Bag+Chair', description: 'Comfortable and stylish bean bag chair.' },
        { id: 73, name: 'LED Strip Lights', price: 25.00, category: 'home', rating: 4.6, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=LED+Lights', description: 'Color-changing LED strip lights for ambient lighting.' },
        { id: 74, name: 'Winter Gloves', price: 29.99, category: 'fashion', rating: 4.5, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Gloves', description: 'Warm and stylish winter gloves.' },
        { id: 75, name: 'Food Processor', price: 119.00, category: 'home', rating: 4.4, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Food+Processor', description: 'Versatile food processor for all your kitchen needs.' },
        { id: 76, name: 'Trainers', price: 75.00, category: 'fashion', rating: 4.8, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Trainers', description: 'Sporty and comfortable trainers for running and exercise.' },
        { id: 77, name: 'Bluetooth Headset', price: 49.99, category: 'electronics', rating: 4.5, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Bluetooth+Headset', description: 'Clear sound and hands-free communication with this headset.' },
        { id: 78, name: 'Beanie Hat', price: 19.99, category: 'fashion', rating: 4.7, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Beanie', description: 'Keep warm with this soft beanie hat.' },
        { id: 79, name: 'Stand Mixer', price: 199.99, category: 'home', rating: 4.9, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Stand+Mixer', description: 'High-performance stand mixer for your baking needs.' },
        { id: 80, name: 'Smart Speaker', price: 89.99, category: 'electronics', rating: 4.6, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Smart+Speaker', description: 'Voice-controlled smart speaker with rich sound.' },
        { id: 81, name: 'Wireless Keyboard', price: 34.99, category: 'electronics', rating: 4.3, image: 'https://images.pexels.com/photos/3944406/pexels-photo-3944406.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Compact wireless keyboard for easy typing.' },
        { id: 82, name: 'Handheld Vacuum', price: 49.00, category: 'home', rating: 4.2, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Handheld+Vacuum', description: 'Portable vacuum for quick cleaning.' },
        { id: 83, name: 'Classic Sneakers', price: 69.99, category: 'fashion', rating: 4.7, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Sneakers', description: 'Iconic sneakers for everyday wear.' },
        { id: 84, name: 'Cotton Pajamas', price: 39.00, category: 'fashion', rating: 4.6, image: 'https://via.placeholder.com/300x200/B0E0E6/000000?text=Pajamas', description: 'Soft and comfortable cotton pajamas for a good night\'s sleep.' },
        { id: 85, name: 'Smart Plug', price: 19.99, category: 'home', rating: 4.4, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Smart+Plug', description: 'Turn your devices on and off with this smart plug.' },
        { id: 86, name: 'Pillow Set', price: 39.00, category: 'home', rating: 4.6, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Pillow+Set', description: 'Set of two pillows for added comfort.' },
        { id: 87, name: 'Smartphone Holder', price: 25.00, category: 'electronics', rating: 4.3, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Phone+Holder', description: 'Secure smartphone holder for hands-free use.' },
        { id: 88, name: 'Electric Kettle', price: 40.00, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Kettle', description: 'Fast boiling electric kettle for your kitchen.' },
        { id: 89, name: 'Smartphone Case', price: 15.00, category: 'electronics', rating: 4.4, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Smartphone+Case', description: 'Protect your smartphone with this durable case.' },
        { id: 90, name: 'Portable Speaker', price: 79.00, category: 'electronics', rating: 4.7, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Portable+Speaker', description: 'Wireless speaker for on-the-go music.' },
        { id: 91, name: 'Smart Lock Box', price: 89.00, category: 'home', rating: 4.3, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Lock+Box', description: 'Smart lock box for secure storage.' },
        { id: 92, name: 'Electric Blanket', price: 60.00, category: 'home', rating: 4.5, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Electric+Blanket', description: 'Stay warm with this electric blanket.' },
        { id: 93, name: 'Food Storage Containers', price: 29.00, category: 'home', rating: 4.3, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Storage+Containers', description: 'Set of food storage containers for your kitchen.' },
        { id: 94, name: 'Smartphone Stand', price: 18.00, category: 'electronics', rating: 4.5, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Phone+Stand', description: 'Adjustable smartphone stand for your desk.' },
        { id: 95, name: 'Portable Power Bank', price: 29.99, category: 'electronics', rating: 4.6, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Power+Bank', description: 'Compact power bank for charging on the go.' },
        { id: 96, name: 'Smart Thermostat', price: 129.00, category: 'home', rating: 4.8, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Thermostat', description: 'Smart thermostat for energy-efficient home temperature control.' },
        { id: 97, name: 'Smart Glasses', price: 250.00, category: 'electronics', rating: 4.9, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Smart+Glasses', description: 'Wearable smart glasses with augmented reality features.' },
        { id: 98, name: 'Electric Fan', price: 49.00, category: 'home', rating: 4.4, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Electric+Fan', description: 'Electric fan for cooling your room.' },
        { id: 99, name: 'Blender', price: 59.00, category: 'home', rating: 4.6, image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Blender', description: 'High-powered blender for smoothies and shakes.' },
        { id: 100, name: 'Smartphone Holder', price: 18.00, category: 'electronics', rating: 4.5, image: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Phone+Holder', description: 'Portable smartphone holder for hands-free use.' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let displayedProductsCount = 0;
    const productsPerPage = 10;

    // --- Mobile Menu ---
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // --- Currency Formatting ---
    function formatPrice(price, currency) {
        if (currency === 'KES') {
            return `KES ${(price * KES_USD_RATE).toFixed(2)}`;
        }
        return `$${price.toFixed(2)}`; // Default to USD
    }

    // --- Product Display and Filtering ---
    function renderProducts(productsToRender) {
        productGrid.innerHTML = ''; // Clear existing products
        const productsToShow = productsToRender.slice(0, displayedProductsCount);

        productsToShow.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price, currentCurrency)}</p>
                <p class="category">Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p class="rating">Rating: ${product.rating} ★</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
            `;
            productGrid.appendChild(card);
        });

        // Show/hide load more button
        if (displayedProductsCount < productsToRender.length) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }

        addEventListenersToProductButtons();
    }

    function filterAndSortProducts() {
        let filtered = [...allProducts];
        const category = categoryFilter.value;
        const sort = sortFilter.value;
        const searchTerm = searchBar.value.toLowerCase();

        // Update breadcrumb
        breadcrumbCategory.textContent = category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1);

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm));
        }

        // Filter by category
        if (category !== 'all') {
            filtered = filtered.filter(product => product.category === category);
        }

        // Sort products
        switch (sort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
        }
        displayedProductsCount = Math.min(displayedProductsCount, filtered.length);
        renderProducts(filtered);
    }

    // Initial product load
    function initializeApp() {
        if (currencySwitcher) currencySwitcher.value = currentCurrency; // Set dropdown to stored/default currency
        displayedProductsCount = productsPerPage;
        filterAndSortProducts();
        updateCartCount();
    }

    initializeApp();

    categoryFilter.addEventListener('change', filterAndSortProducts);
    sortFilter.addEventListener('change', filterAndSortProducts);
    searchButton.addEventListener('click', filterAndSortProducts);
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterAndSortProducts();
        }
    });

    loadMoreButton.addEventListener('click', () => {
        displayedProductsCount += productsPerPage;
        filterAndSortProducts(); // Re-render with more products
    });

    // --- Main Nav Category Links Filtering ---
    document.querySelectorAll('.main-category-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = link.dataset.category;
            if (category === 'deals') {
                // Deals = price < $100 or rating >= 4.5
                const deals = allProducts.filter(p => p.price < 100 || p.rating >= 4.5);
                displayedProductsCount = Math.min(productsPerPage, deals.length);
                breadcrumbCategory.textContent = 'Deals';
                renderProducts(deals);
            } else if (category === 'collectibles' || category === 'motors') {
                // Show empty or placeholder for unsupported categories
                productGrid.innerHTML = `<div style="padding:30px;text-align:center;">No ${category.charAt(0).toUpperCase() + category.slice(1)} products available yet.</div>`;
                breadcrumbCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            } else {
                // For electronics, fashion, home
                categoryFilter.value = category;
                filterAndSortProducts();
            }
            // Optionally scroll to top of products
            productGrid.scrollIntoView({behavior:'smooth'});
        });
    });

    // --- Cart Functionality ---
    function updateCartCount() {
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(productId) {
        const product = allProducts.find(p => p.id === parseInt(productId));
        if (!product) return;

        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }

    // --- Quick View Modal ---
    function openQuickViewModal(productId) {
        const product = allProducts.find(p => p.id === parseInt(productId));
        if (!product) return;

        modalProductName.textContent = product.name;
        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalProductDescription.textContent = product.description;
        modalProductPrice.textContent = formatPrice(product.price, currentCurrency);
        modalProductCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        modalAddToCartBtn.dataset.id = product.id; // Set product ID for modal's add to cart
        quickViewModal.style.display = 'block';
    }

    closeQuickView.addEventListener('click', () => {
        quickViewModal.style.display = 'none';
    });

    modalAddToCartBtn.addEventListener('click', (e) => {
        addToCart(e.target.dataset.id);
        quickViewModal.style.display = 'none'; // Optionally close modal after adding
    });

    // Close modal if clicked outside of the content
    window.addEventListener('click', (event) => {
        if (event.target === quickViewModal) {
            quickViewModal.style.display = 'none';
        }
    });

    function addEventListenersToProductButtons() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => addToCart(e.target.dataset.id));
        });
        document.querySelectorAll('.quick-view-btn').forEach(button => {
            button.addEventListener('click', (e) => openQuickViewModal(e.target.dataset.id));
        });
    }

    // --- Back to Top Button ---
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Carousel Logic ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(currentSlide); // Show the first slide
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);

        // Auto-rotate carousel
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // --- V2 Features ---

    // Currency Switcher
    if (currencySwitcher) {
        currencySwitcher.addEventListener('change', (e) => {
            currentCurrency = e.target.value;
            localStorage.setItem('currency', currentCurrency);
            filterAndSortProducts(); // Re-render products with new currency
            // If modal is open, update its price too (though it usually closes)
            if (quickViewModal.style.display === 'block') {
                const openProductId = modalAddToCartBtn.dataset.id;
                if (openProductId) {
                    const product = allProducts.find(p => p.id === parseInt(openProductId));
                    if (product) modalProductPrice.textContent = formatPrice(product.price, currentCurrency);
                }
            }
        });
    }

    // Newsletter Signup
    if (newsletterForm && newsletterEmailInput) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterEmailInput.value;
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                newsletterEmailInput.value = ''; // Clear input
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    // End of relevant app logic. Remove all chatbot modal/chat button related duplication and event listeners.
});
