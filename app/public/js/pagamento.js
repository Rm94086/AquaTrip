(() => {
  'use strict';

  let companionCount = 1;

  const companionsList = document.getElementById('companions-list');
  const addCompanionBtn = document.getElementById('add-companion');
  const proceedBtn = document.getElementById('proceed-btn');
  const form = document.getElementById('booking-form');

  function createCompanionItem(index) {
    const li = document.createElement('li');
    li.className = 'companion-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'acompanhante[]';
    input.placeholder = `Nome completo do acompanhante ${index}`;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-btn';
    removeBtn.setAttribute('aria-label', 'Remover acompanhante');
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => removeCompanion(li));

    li.appendChild(input);
    li.appendChild(removeBtn);
    return li;
  }

  function removeCompanion(item) {
    if (companionsList.children.length > 1) {
      item.remove();
      updatePlaceholders();
    }
  }

  function updatePlaceholders() {
    const items = companionsList.querySelectorAll('.companion-item input');
    items.forEach((input, i) => {
      input.placeholder = `Nome completo do acompanhante ${i + 1}`;
    });
  }

  function addCompanion() {
    companionCount++;
    const item = createCompanionItem(companionCount);
    companionsList.appendChild(item);
    item.querySelector('input').focus();
  }

  function getRequiredInputs() {
    return form.querySelectorAll('input[required]');
  }

  function validateForm() {
    const inputs = getRequiredInputs();
    let isValid = true;

    inputs.forEach(input => {
      const value = input.value.trim();
      const isEmpty = value === '';
      const isInvalidEmail = input.type === 'email' && value && !isValidEmail(value);

      if (isEmpty || isInvalidEmail) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }
    });

    return isValid;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleProceed() {
    if (!validateForm()) return;
    alert('Redirecionando para o pagamento seguro...');
  }

  function initRemoveButtons() {
    const existing = companionsList.querySelectorAll('.remove-btn');
    existing.forEach(btn => {
      btn.addEventListener('click', () => removeCompanion(btn.closest('.companion-item')));
    });
  }

  function clearErrorOnInput(e) {
    if (e.target.classList.contains('error')) {
      e.target.classList.remove('error');
    }
  }

  addCompanionBtn.addEventListener('click', addCompanion);
  proceedBtn.addEventListener('click', handleProceed);
  form.addEventListener('input', clearErrorOnInput);
  initRemoveButtons();
})();
