// Aguarda o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const menuBtn = document.querySelector('.menu-btn');
    const searchBtn = document.querySelector('.search-btn');
    const loginBtn = document.querySelector('.login-btn');
    const backBtn = document.querySelector('.back-btn');
    const aquariumCards = document.querySelectorAll('.aquarium-card');
    const featuredCards = document.querySelectorAll('.featured-card');

    // Animação do menu hamburger
    let menuOpen = false;
    
    menuBtn.addEventListener('click', function() {
        menuOpen = !menuOpen;
        const hamburgers = this.querySelectorAll('.hamburger');
        
        if (menuOpen) {
            hamburgers[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgers[1].style.opacity = '0';
            hamburgers[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburgers[0].style.transform = 'none';
            hamburgers[1].style.opacity = '1';
            hamburgers[2].style.transform = 'none';
        }
        
        // Simula abertura de menu (pode ser expandido para mostrar menu real)
        console.log('Menu ' + (menuOpen ? 'aberto' : 'fechado'));
    });

    // Funcionalidade do botão de busca
    searchBtn.addEventListener('click', function() {
        // Simula abertura de busca
        const searchTerm = prompt('O que você está procurando?');
        if (searchTerm) {
            console.log('Buscando por: ' + searchTerm);
            // Aqui você pode implementar a lógica de busca real
            alert('Buscando por: ' + searchTerm);
        }
    });

    // Funcionalidade do botão de login
    loginBtn.addEventListener('click', function() {
        // Simula processo de login
        console.log('Abrindo tela de login');
        alert('Redirecionando para a página de login...');
    });

    // Funcionalidade do botão voltar
    backBtn.addEventListener('click', function() {
        // Simula navegação para trás
        console.log('Voltando para a página anterior');
        if (window.history.length > 1) {
            window.history.back();
        } else {
            alert('Não há página anterior para voltar');
        }
    });

    // Interatividade dos cards de aquários
    aquariumCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            console.log('Card clicado: ' + title);
            
            // Simula navegação para página do aquário
            alert(`Abrindo detalhes do ${title}...`);
        });

        // Adiciona efeito de hover programático para dispositivos touch
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Interatividade dos cards em destaque
    featuredCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log('Card em destaque clicado: ' + index);
            alert('Abrindo galeria do Sea Life Bangkok Ocean World...');
        });

        // Efeito de hover para dispositivos touch
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.02)';
        });

        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos para animação de entrada
    const animatedElements = document.querySelectorAll('.aquarium-card, .featured-card, .hero-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll para links internos (se houver)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Funcionalidade de avaliação (estrelas)
    const stars = document.querySelectorAll('.stars');
    stars.forEach(starContainer => {
        const starElements = starContainer.querySelectorAll('.star');
        
        starElements.forEach((star, index) => {
            star.addEventListener('click', function() {
                // Remove todas as classes 'filled'
                starElements.forEach(s => s.classList.remove('filled'));
                
                // Adiciona 'filled' até a estrela clicada
                for (let i = 0; i <= index; i++) {
                    starElements[i].classList.add('filled');
                }
                
                console.log(`Avaliação: ${index + 1} estrelas`);
                alert(`Você avaliou com ${index + 1} estrela${index > 0 ? 's' : ''}!`);
            });
        });
    });

    // Lazy loading para imagens (melhora performance)
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Adiciona feedback visual para todos os botões
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Console log para debug
    console.log('Aqua Trip - Site carregado com sucesso!');
    console.log('Elementos interativos inicializados:', {
        menuBtn: !!menuBtn,
        searchBtn: !!searchBtn,
        loginBtn: !!loginBtn,
        backBtn: !!backBtn,
        aquariumCards: aquariumCards.length,
        featuredCards: featuredCards.length
    });
});

// Função utilitária para mostrar notificações (pode ser expandida)
function showNotification(message, type = 'info') {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Anima entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para simular carregamento
function simulateLoading(element, duration = 1000) {
    const originalText = element.textContent;
    element.textContent = 'Carregando...';
    element.disabled = true;
    
    setTimeout(() => {
        element.textContent = originalText;
        element.disabled = false;
    }, duration);
}

