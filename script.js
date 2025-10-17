// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.navigation');
    const mainHeader = document.querySelector('.main-header');

    // 1. Menu Hambúrguer (Responsividade)
    if (hamburger && navLinks && mainHeader) {
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Impede a rolagem do corpo quando o menu está aberto em mobile
            document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
        };

        hamburger.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar em um link (para mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Verifica se a largura da tela é menor que 768px (ou o breakpoint do menu)
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    toggleMenu(); // Reusa a função para fechar
                }
            });
        });
    }

    // 2. Carrossel de Serviços (O código foi mantido, pois estava funcional)
    const carouselWrapper = document.querySelector(".carousel-wrapper");

    if (carouselWrapper) {
        const slides = carouselWrapper.querySelectorAll(".carousel-slide");
        const carouselSlides = carouselWrapper.querySelector(".carousel-slides");
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
            carouselSlides.style.transform = `translateX(${offset}%)`;

            bullets.forEach((bullet, i) => {
                bullet.classList.toggle("active", i === currentIndex);
                bullet.setAttribute('aria-selected', i === currentIndex);
            });
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
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

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 3000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        showSlide(currentIndex);
        startAutoSlide();

        // Pausa no hover
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    }


    // 3. Scroll Suave para links de navegação OTIMIZADO
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
                let offsetTop = targetElement.offsetTop;

                // Se o target for a seção Hero (#home), rola para o topo (0)
                if (targetId === "#home") {
                    offsetTop = 0;
                } else {
                    // Subtrai a altura do cabeçalho fixo
                    offsetTop = targetElement.offsetTop - headerHeight;
                }

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
