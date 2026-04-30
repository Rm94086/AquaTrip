document.addEventListener('DOMContentLoaded', () => {

    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]?\w+)*\.\w+([-.]?\w+)*$/;

    const form           = document.getElementById('form');
    const inputNome      = document.querySelector('input[name="nome"]');
    const inputEmail     = document.querySelector('input[name="email"]');
    const inputSenha     = document.querySelector('input[name="senha"]');
    const inputConfirma  = document.querySelector('input[name="confirma-senha"]');

    if (!form) return; 


    function setError(input) {
        if (!input) return;
        input.style.border = '2px solid var(--color-red)';
        const span = input.parentElement.querySelector('.span-required');
        if (span) span.style.display = 'block';
    }

    function removeError(input) {
        if (!input) return;
        input.style.border = '';
        const span = input.parentElement.querySelector('.span-required');
        if (span) span.style.display = 'none';
    }


    function nameValidate() {
        if (!inputNome) return true; // campo inexistente na página = ignora
        if (inputNome.value.trim().length < 3) {
            setError(inputNome);
            return false;
        }
        removeError(inputNome);
        return true;
    }

    function emailValidate() {
        if (!inputEmail) return true;
        if (!emailRegex.test(inputEmail.value.trim())) {
            setError(inputEmail);
            return false;
        }
        removeError(inputEmail);
        return true;
    }

    function mainPasswordValidate() {
        if (!inputSenha) return true;
        if (inputSenha.value.length < 8) {
            setError(inputSenha);
            return false;
        }
        removeError(inputSenha);
        return true;
    }

    function comparePassword() {
        if (!inputConfirma) return true; // login não tem confirmação = ignora
        if (inputConfirma.value.length < 8 || inputConfirma.value !== inputSenha.value) {
            setError(inputConfirma);
            return false;
        }
        removeError(inputConfirma);
        return true;
    }



    if (inputNome)     inputNome.addEventListener('input', nameValidate);
    if (inputEmail)    inputEmail.addEventListener('input', emailValidate);
    if (inputSenha)    inputSenha.addEventListener('input', () => {
        mainPasswordValidate();
        if (inputConfirma && inputConfirma.value.length > 0) comparePassword();
    });
    if (inputConfirma) inputConfirma.addEventListener('input', comparePassword);


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const ok = [
            nameValidate(),
            emailValidate(),
            mainPasswordValidate(),
            comparePassword()
        ].every(Boolean);

    });

});
