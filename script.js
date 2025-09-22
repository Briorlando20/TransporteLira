// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Hambúrguer (Responsividade) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.navigation'); // AQUI: Seleciona a navegação inteira
    const header = document.querySelector('.main-header');

    if (hamburger && navLinks && header) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // header.classList.toggle('menu-open'); // Removido, pois não é necessário com o novo CSS
        });

        // Fechar menu ao clicar em um link (apenas para mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // --- Carrossel de Serviços ---
    const carouselWrapper = document.querySelector(".carousel-wrapper");

    if (carouselWrapper) {
        const carouselContainer = carouselWrapper.querySelector(".carousel-container");
        const slides = carouselWrapper.querySelectorAll(".carousel-slide");
        const bullets = carouselWrapper.querySelectorAll(".bullet");
        const prevButton = carouselWrapper.querySelector(".prev-slide");
        const nextButton = carouselWrapper.querySelector(".next-slide");

        let currentIndex = 0;
        let autoSlideInterval;

        function showSlide(index) {
            if (index >= slides.length) {
                index = 0;
            } else if (index < 0) {
                index = slides.length - 1;
            }
            currentIndex = index;

            const offset = -currentIndex * 100;
            carouselContainer.querySelector(".carousel-slides").style.transform = `translateX(${offset}%)`;

            bullets.forEach((bullet, i) => {
                bullet.classList.toggle("active", i === currentIndex);
            });
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        bullets.forEach((bullet, index) => {
            bullet.addEventListener("click", () => {
                showSlide(index);
                resetAutoSlide();
            });
        });

        prevButton.addEventListener("click", () => {
            prevSlide();
            resetAutoSlide();
        });

        nextButton.addEventListener("click", () => {
            nextSlide();
            resetAutoSlide();
        });

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 3000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        showSlide(currentIndex);
        startAutoSlide();

        carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    }


    // --- Scroll Suave para links de navegação ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const offsetTop = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
