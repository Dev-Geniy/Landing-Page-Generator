// Переключение темы для интерфейса генератора
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('.icon');

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';

// Обработчик переключения
toggleButton.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    icon.textContent = newTheme === 'light' ? '☀️' : '🌙';
});

// Динамическое создание полей для продуктов, отзывов и FAQ
const productCountInput = document.getElementById('product-count');
const productsContainer = document.getElementById('products-container');
const reviewCountInput = document.getElementById('review-count');
const reviewsContainer = document.getElementById('reviews-container');
const faqCountInput = document.getElementById('faq-count');
const faqContainer = document.getElementById('faq-container');

function createProductFields(count) {
    productsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        productsContainer.innerHTML += `
            <div class="product-group">
                <h3>Product/Service ${i + 1}</h3>
                <label for="product-name-${i}">Name:</label>
                <input type="text" id="product-name-${i}" placeholder="Product Name" required>
                <label for="product-image-${i}">Image URL:</label>
                <input type="url" id="product-image-${i}" placeholder="https://example.com/image.jpg" required>
                <label for="product-price-${i}">Price:</label>
                <input type="number" id="product-price-${i}" min="0" step="0.01" placeholder="99.99" required>
                <label for="product-discount-${i}">Discount (%):</label>
                <input type="number" id="product-discount-${i}" min="0" max="100" placeholder="10">
                <label for="product-desc-${i}">Description:</label>
                <textarea id="product-desc-${i}" placeholder="Product description" required></textarea>
                <label for="product-contact-${i}">Contact Link:</label>
                <input type="url" id="product-contact-${i}" placeholder="https://t.me/seller" required>
            </div>
        `;
    }
}

function createReviewFields(count) {
    reviewsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        reviewsContainer.innerHTML += `
            <div class="review-group">
                <h3>Review ${i + 1}</h3>
                <label for="review-name-${i}">Reviewer Name:</label>
                <input type="text" id="review-name-${i}" placeholder="John Doe" required>
                <label for="review-text-${i}">Review Text:</label>
                <textarea id="review-text-${i}" placeholder="Great product!" required></textarea>
            </div>
        `;
    }
}

function createFaqFields(count) {
    faqContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        faqContainer.innerHTML += `
            <div class="faq-group">
                <h3>FAQ ${i + 1}</h3>
                <label for="faq-question-${i}">Question:</label>
                <input type="text" id="faq-question-${i}" placeholder="What is the delivery time?" required>
                <label for="faq-answer-${i}">Answer:</label>
                <textarea id="faq-answer-${i}" placeholder="Usually 3-5 days." required></textarea>
            </div>
        `;
    }
}

productCountInput.addEventListener('change', () => createProductFields(productCountInput.value));
reviewCountInput.addEventListener('change', () => createReviewFields(reviewCountInput.value));
faqCountInput.addEventListener('change', () => createFaqFields(faqCountInput.value));

// Инициализация с одним продуктом
createProductFields(1);

// Генерация лендинга
const form = document.getElementById('landing-form');
const downloadButtons = document.getElementById('download-buttons');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const slogan = document.getElementById('slogan').value;
    const logo = document.getElementById('logo').value;
    const productCount = parseInt(productCountInput.value);
    const reviewCount = parseInt(reviewCountInput.value);
    const faqCount = parseInt(faqCountInput.value);
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    let products = [];
    for (let i = 0; i < productCount; i++) {
        products.push({
            name: document.getElementById(`product-name-${i}`).value,
            image: document.getElementById(`product-image-${i}`).value,
            price: parseFloat(document.getElementById(`product-price-${i}`).value),
            discount: document.getElementById(`product-discount-${i}`).value ? parseInt(document.getElementById(`product-discount-${i}`).value) : null,
            desc: document.getElementById(`product-desc-${i}`).value,
            contact: document.getElementById(`product-contact-${i}`).value
        });
    }

    let reviews = [];
    for (let i = 0; i < reviewCount; i++) {
        reviews.push({
            name: document.getElementById(`review-name-${i}`).value,
            text: document.getElementById(`review-text-${i}`).value
        });
    }

    let faqs = [];
    for (let i = 0; i < faqCount; i++) {
        faqs.push({
            question: document.getElementById(`faq-question-${i}`).value,
            answer: document.getElementById(`faq-answer-${i}`).value
        });
    }

    const landingHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        :root {
            --bg-color: #f9f9f9;
            --text-color: #333;
            --card-bg: #fff;
            --accent-color: #007bff;
            --shadow: 0 4px 15px rgba(0,0,0,0.1);
            --gradient: linear-gradient(135deg, #007bff, #00ddeb);
        }
        [data-theme="dark"] {
            --bg-color: #1a1a1a;
            --text-color: #e0e0e0;
            --card-bg: #2b2b2b;
            --accent-color: #ff4444;
            --shadow: 0 4px 15px rgba(0,0,0,0.3);
            --gradient: linear-gradient(135deg, #ff4444, #ff8787);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: var(--bg-color); color: var(--text-color); line-height: 1.6; transition: all 0.3s ease; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        
        /* Header */
        header { background: var(--card-bg); padding: 20px; position: sticky; top: 0; z-index: 1000; box-shadow: var(--shadow); }
        .header-content { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; }
        .logo-title { display: flex; align-items: center; gap: 15px; }
        header img { max-width: 120px; max-height: 80px; transition: transform 0.3s; }
        header img:hover { transform: scale(1.05); }
        h1 { font-size: 2.5rem; background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .slogan { font-size: 1.2rem; color: #888; margin-top: 5px; animation: fadeIn 1s ease-in; }
        .theme-toggle { background: none; color: var(--accent-color); border: none; padding: 10px; cursor: pointer; font-size: 18px; transition: transform 0.3s; }
        .theme-toggle:hover { transform: scale(1.1); }

        /* Burger Menu */
        .burger { display: none; font-size: 24px; cursor: pointer; color: var(--text-color); transition: transform 0.3s; }
        .burger:hover { transform: scale(1.1); }
        nav { display: flex; gap: 20px; transition: all 0.3s ease; }
        nav a { color: var(--text-color); text-decoration: none; font-size: 1.1rem; padding: 10px; transition: color 0.3s; }
        nav a:hover { color: var(--accent-color); }
        nav.active { 
            display: flex; 
            flex-direction: column; 
            position: fixed; 
            top: 0; 
            left: 0; 
            right: 0; 
            bottom: 0; 
            background: rgba(0, 0, 0, 0.85); 
            box-shadow: var(--shadow); 
            padding: 80px 20px 20px; 
            height: 100vh; 
            z-index: 999; 
            align-items: center; 
        }
        nav.active a { font-size: 1.5rem; color: #fff; }

        /* Sections */
        section { margin: 60px 0; }
        h2 { font-size: 2rem; text-align: center; margin-bottom: 30px; background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .products { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
        .product { background: var(--card-bg); border-radius: 12px; padding: 20px; text-align: center; box-shadow: var(--shadow); transition: transform 0.3s, box-shadow 0.3s; animation: slideUp 0.5s ease forwards; }
        .product:hover { transform: translateY(-10px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
        .product img { max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px; }
        .product h3 { font-size: 1.4rem; margin-bottom: 10px; }
        .price { font-size: 1.2rem; color: var(--accent-color); font-weight: bold; }
        .discount { color: #dc3545; font-style: italic; margin-left: 5px; }
        .product p { margin: 15px 0; color: #666; }
        [data-theme="dark"] .product p { color: #bbb; }
        .contact-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--gradient); color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; transition: transform 0.3s; }
        .contact-btn:hover { transform: scale(1.05); }

        .reviews, .faq { margin: 60px 0; }
        .review, .faq-item { background: var(--card-bg); border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: var(--shadow); animation: fadeIn 0.5s ease forwards; }
        .review h3, .faq-item h3 { font-size: 1.3rem; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .review i, .faq-item i { color: var(--accent-color); }

        /* Footer */
        footer { background: var(--card-bg); padding: 30px; text-align: center; box-shadow: 0 -4px 15px rgba(0,0,0,0.1); }
        footer p { margin: 10px 0; display: flex; align-items: center; justify-content: center; gap: 10px; }
        footer a { color: var(--accent-color); text-decoration: none; transition: color 0.3s; }
        footer a:hover { color: #0056b3; }
        [data-theme="dark"] footer a:hover { color: #ff8787; }

        /* Animations */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* Media Queries */
        @media (max-width: 768px) {
            h1 { font-size: 2rem; }
            .slogan { font-size: 1rem; }
            .products { grid-template-columns: 1fr; }
            .burger { display: block; }
            nav { 
                display: none; 
                height: 0; 
                overflow: hidden; 
                transition: height 0.3s ease; 
            }
            nav.active { 
                display: flex; 
                height: 100vh; 
            }
            .header-content { flex-direction: column; gap: 15px; }
        }
        @media (max-width: 480px) {
            h1 { font-size: 1.5rem; }
            h2 { font-size: 1.8rem; }
            .product { padding: 15px; }
            .contact-btn { padding: 10px 20px; }
            nav.active a { font-size: 1.3rem; }
        }
    </style>
</head>
<body data-theme="${savedTheme}">
    <header id="top">
        <div class="header-content">
            <div class="logo-title">
                ${logo ? `<img src="${logo}" alt="Logo">` : ''}
                <div>
                    <h1>${title}</h1>
                    <p class="slogan">${slogan}</p>
                </div>
            </div>
            <div class="burger"><i class="fas fa-bars"></i></div>
            <nav>
                <a href="#top" class="nav-link">Home</a>
                <a href="#products" class="nav-link">Products</a>
                ${reviewCount > 0 ? `<a href="#reviews" class="nav-link">Reviews</a>` : ''}
                ${faqCount > 0 ? `<a href="#faq" class="nav-link">FAQ</a>` : ''}
                <button class="theme-toggle" aria-label="Toggle Theme"><i class="fas ${savedTheme === 'light' ? 'fa-moon' : 'fa-sun'}"></i></button>
            </nav>
        </div>
    </header>
    <div class="container">
        <section class="products" id="products">
            <h2>Our Products</h2>
            ${products.map(p => `
                <div class="product">
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p class="price">$${p.price.toFixed(2)}${p.discount ? ` <span class="discount">(-${p.discount}%)</span>` : ''}</p>
                    <p>${p.desc}</p>
                    <a href="${p.contact}" class="contact-btn" target="_blank"><i class="fas fa-envelope"></i> Contact Seller</a>
                </div>
            `).join('')}
        </section>
        ${reviewCount > 0 ? `
            <section class="reviews" id="reviews">
                <h2>Customer Reviews</h2>
                ${reviews.map(r => `
                    <div class="review">
                        <h3><i class="fas fa-user"></i> ${r.name}</h3>
                        <p>${r.text}</p>
                    </div>
                `).join('')}
            </section>
        ` : ''}
        ${faqCount > 0 ? `
            <section class="faq" id="faq">
                <h2>Frequently Asked Questions</h2>
                ${faqs.map(f => `
                    <div class="faq-item">
                        <h3><i class="fas fa-question-circle"></i> ${f.question}</h3>
                        <p>${f.answer}</p>
                    </div>
                `).join('')}
            </section>
        ` : ''}
    </div>
    <footer>
        ${phone ? `<p><i class="fas fa-phone"></i> <a href="tel:${phone}">${phone}</a></p>` : ''}
        ${address ? `<p><i class="fas fa-map-marker-alt"></i> ${address}</p>` : ''}
    </footer>
    <script>
        const toggleButton = document.querySelector('.theme-toggle');
        const body = document.body;
        toggleButton.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggleButton.innerHTML = '<i class="fas ' + (newTheme === 'light' ? 'fa-moon' : 'fa-sun') + '"></i>';
        });
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-link');
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                if (targetId === 'top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                }
                nav.classList.remove('active');
            });
        });
    </script>
</body>
</html>
    `;

    downloadButtons.style.display = 'flex';
    document.getElementById('download-html').onclick = () => {
        const blob = new Blob([landingHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'landing-page.html';
        a.click();
        URL.revokeObjectURL(url);
    };
});

// Копирование Bitcoin-адреса
const copyBtcButton = document.querySelector('.btc-address .copy-btn');
copyBtcButton.addEventListener('click', () => {
    const btcCode = document.getElementById('btc-code').textContent;
    navigator.clipboard.writeText(btcCode).then(() => {
        copyBtcButton.textContent = 'Copied!';
        setTimeout(() => {
            copyBtcButton.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
