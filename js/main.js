// Initialize AOS Animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Generate 22 Images for Gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.row.g-3.gallery-container');
    if (galleryGrid) {
        let galleryHTML = '';
        for (let i = 1; i <= 22; i++) {
            galleryHTML += `
            <div class="col-6 col-md-3 col-lg-2" data-aos="zoom-in" data-aos-delay="${(i % 6) * 50}">
                <div class="gallery-card shadow-sm h-100 border-0" data-bs-toggle="modal" data-bs-target="#imageModal" onclick="document.getElementById('modalImage').src='Css/${i}.jpeg'">
                    <img src="Css/${i}.jpeg" alt="نقل عفش بالدمام والخبر صورة ${i}" class="img-fluid w-100 object-fit-cover" style="height: 140px;">
                    <div class="gallery-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
            </div>`;
        }
        galleryGrid.innerHTML = galleryHTML;
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to trigger counter
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // WhatsApp Form Handler
    const form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const currentLocation = document.getElementById('currentLocation').value;
            const destination = document.getElementById('destination').value;
            const date = document.getElementById('date').value;
            const details = document.getElementById('details').value;
            
            // Format WhatsApp Message
            let message = `*طلب حجز جديد - شركة مثلث القمة* 🚚📦\n\n`;
            message += `*الاسم:* ${name}\n`;
            message += `*رقم الجوال:* ${phone}\n`;
            message += `*موقعك الحالي:* ${currentLocation}\n`;
            message += `*الوجهة المقصودة:* ${destination}\n`;
            message += `*تاريخ النقل المقترح:* ${date}\n`;
            
            if (details.trim() !== '') {
                message += `*تفاصيل إضافية:* ${details}\n`;
            }
            
            message += `\n*بانتظار تواصلكم، شكراً لكم.*`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Open WhatsApp
            window.open(`https://wa.me/966534557375?text=${encodedMessage}`, '_blank');
        });
    }

    // Typewriter Effect
    const typeText = document.querySelector('.type-text');
    if (typeText) {
        const words = ['خدمات فك، تركيب، وتغليف شاملة.', 'بأعلى معايير الأمان والجودة.', 'أسطول شاحنات مجهز بالكامل.', 'راحة بالك مضمونة معنا.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typeText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect after a short delay
        setTimeout(type, 1000);
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollToTopBtn');
    
    // Navbar Shrink & Scroll to top visibility
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll("section, header");
    const navLi = document.querySelectorAll(".navbar-nav .nav-link");
    
    window.addEventListener("scroll", () => {
        // Sticky Navbar active state on scroll
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href").includes(current)) {
                li.classList.add("active");
            }
        });

        // Navbar Shrink effect
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Scroll To Top visibility
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });

    // Scroll To Top click action
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
