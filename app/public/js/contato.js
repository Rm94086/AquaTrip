document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Adiciona animação de entrada aos elementos do formulário
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, (index + 1) * 100);
    });
    
    // Animação do botão de envio
    setTimeout(() => {
        submitBtn.style.opacity = '1';
        submitBtn.style.transform = 'translateY(0)';
    }, 700);
    
    // Validação e envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!nome) {
            showMessage('Por favor, preencha seu nome.', 'error');
            return;
        }
        
        if (!email || !isValidEmail(email)) {
            showMessage('Por favor, preencha um email válido.', 'error');
            return;
        }
        
        // Simula envio do formulário
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            submitBtn.innerHTML = 'Enviar';
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Função para mostrar mensagens
    function showMessage(message, type) {
        // Remove mensagem anterior se existir
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Estilos da mensagem
        messageDiv.style.cssText = `
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            text-align: center;
            font-weight: 500;
            animation: slideInUp 0.3s ease;
            ${type === 'success' 
                ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' 
                : 'background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;'
            }
        `;
        
        form.appendChild(messageDiv);
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOutDown 0.3s ease';
                setTimeout(() => {
                    messageDiv.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Adiciona efeito de foco nos campos
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Adiciona animações CSS adicionais
const additionalStyles = `
    @keyframes slideOutDown {
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    
    .form-group {
        transition: transform 0.2s ease;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);




// Funcionalidade do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    }
});
