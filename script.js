// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Hambúrguer (Responsividade) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.navigation ul');
    const header = document.querySelector('.main-header');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        header.classList.toggle('menu-open'); // Adiciona classe para ajuste de estilo do header se necessário
    });

    // Fechar menu ao clicar em um link (apenas para mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                header.classList.remove('menu-open');
            }
        });
    });

    // --- Carrossel de Serviços ---
    const carouselContainer = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    const bulletsContainer = document.querySelector(".carousel-bullets");
    const bullets = document.querySelectorAll(".bullet");
    const prevButton = document.querySelector(".prev-slide");
    const nextButton = document.querySelector(".next-slide");

    let currentIndex = 0;
    let autoSlideInterval;

    // Função para mostrar o slide específico
    function showSlide(index) {
        // Garante que o índice esteja dentro dos limites
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }
        currentIndex = index;

        // Move os slides usando CSS transform
        const offset = -currentIndex * 100;
        carouselContainer.querySelector(".carousel-slides").style.transform = `translateX(${offset}%)`;

        // Atualiza os bullets
        bullets.forEach((bullet, i) => {
            if (i === currentIndex) {
                bullet.classList.add("active");
            } else {
                bullet.classList.remove("active");
            }
        });
    }

    // Função para o próximo slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Função para o slide anterior
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Navegação por bullets
    bullets.forEach((bullet, index) => {
        bullet.addEventListener("click", () => {
            showSlide(index);
            resetAutoSlide(); // Reinicia o temporizador ao clicar no bullet
        });
    });

    // Botões de navegação
    prevButton.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide(); // Reinicia o temporizador ao clicar no botão
    });

    nextButton.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide(); // Reinicia o temporizador ao clicar no botão
    });

    // Inicia e reinicia o auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); // Troca automática a cada 3 segundos
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Inicia o carrossel na primeira carga
    showSlide(currentIndex);
    startAutoSlide();

    // Pausar auto-slide ao passar o mouse e retomar ao sair
    carouselContainer.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // --- Scroll Suave para links de navegação ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll para o elemento, com um pequeno offset para o header fixo
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
