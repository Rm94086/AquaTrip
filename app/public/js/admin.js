/* ============================================================
   AQUA TRIP — ADMIN PANEL — app.js
   ============================================================ */

'use strict';

/* ---------- Navegação entre seções ---------- */
const sectionTitles = {
  dashboard:    'Dashboard',
  usuarios:     'Usuários',
  pacotes:      'Pacotes',
  faturamento:  'Faturamento',
};

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.remove('active');
      n.removeAttribute('aria-current');
    });
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    item.classList.add('active');
    item.setAttribute('aria-current', 'page');

    const sec = item.dataset.section;
    document.getElementById('section-' + sec).classList.add('active');
    document.getElementById('page-title').textContent = sectionTitles[sec] ?? sec;
  });
});

/* ============================================================
   USUÁRIOS
   ============================================================ */
const usersData = [
  { id: 1, nome: 'Camila Mendes',   email: 'camila@email.com',  cadastro: '10 jan 2026', reservas: 4, status: 'Ativo'    },
  { id: 2, nome: 'Rafael Torres',   email: 'rafael@email.com',  cadastro: '22 fev 2026', reservas: 2, status: 'Ativo'    },
  { id: 3, nome: 'Beatriz Lima',    email: 'bia@email.com',     cadastro: '05 mar 2026', reservas: 6, status: 'Ativo'    },
  { id: 4, nome: 'Lucas Araujo',    email: 'lucas@email.com',   cadastro: '18 mar 2026', reservas: 1, status: 'Inativo'  },
  { id: 5, nome: 'Fernanda Costa',  email: 'ferna@email.com',   cadastro: '02 abr 2026', reservas: 3, status: 'Ativo'    },
  { id: 6, nome: 'Thiago Souza',    email: 'thiago@email.com',  cadastro: '14 abr 2026', reservas: 0, status: 'Pendente' },
  { id: 7, nome: 'Ana Paula Reis',  email: 'anareis@email.com', cadastro: '29 abr 2026', reservas: 2, status: 'Ativo'    },
  { id: 8, nome: 'Carlos Henrique', email: 'carlos@email.com',  cadastro: '08 mai 2026', reservas: 1, status: 'Ativo'    },
];

const statusBadgeMap = {
  Ativo:    'badge-success',
  Inativo:  'badge-danger',
  Pendente: 'badge-warning',
};

function statusBadge(status) {
  const cls = statusBadgeMap[status] ?? 'badge-info';
  return `<span class="badge ${cls}">${status}</span>`;
}

function renderUsers(data) {
  const tbody = document.getElementById('user-tbody');
  tbody.innerHTML = data.map(u => `
    <tr>
      <td class="text-muted">${u.id}</td>
      <td><strong style="font-weight:500">${u.nome}</strong></td>
      <td class="text-muted">${u.email}</td>
      <td class="text-muted">${u.cadastro}</td>
      <td><strong style="font-weight:500">${u.reservas}</strong></td>
      <td>${statusBadge(u.status)}</td>
      <td>
        <div class="actions">
          <button class="btn btn-sm" title="Editar usuário" aria-label="Editar ${u.nome}">
            <i class="ti ti-edit" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" title="Excluir usuário" aria-label="Excluir ${u.nome}">
            <i class="ti ti-trash" aria-hidden="true"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

renderUsers(usersData);

document.getElementById('user-search').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  renderUsers(usersData.filter(u =>
    u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  ));
});

/* ============================================================
   PACOTES
   ============================================================ */


let packages = [
  { nome: 'Arraial do Cabo — 5 dias',     preco: '1.890', destino: 'Rio de Janeiro, RJ',       desc: 'Passeios de barco, mergulho e praias paradisíacas.',             img: null, },
  { nome: 'Fernando Noronha — 7 dias',    preco: '4.200', destino: 'Pernambuco, PE',            desc: 'Ecoturismo, mergulho e trilhas na maior ilha do Atlântico Sul.', img: null,  },
  { nome: 'Bonito — 4 dias',              preco: '2.350', destino: 'Mato Grosso do Sul, MS',    desc: 'Flutuação no Rio da Prata e Aquário Natural.',                   img: null, },
  { nome: 'Angra dos Reis — 3 dias',      preco: '1.600', destino: 'Rio de Janeiro, RJ',        desc: 'Passeio de escuna pelas ilhas da Baía de Angra.',                img: null,  },
  { nome: 'Ilhéus — 5 dias',             preco: '1.980', destino: 'Bahia, BA',                 desc: 'Praias de Olivença e cacau na Bahia histórica.',                 img: null,  },
];

let pendingDeleteIndex = null;

function renderPackages() {
  const grid = document.getElementById('pkg-grid');
  grid.innerHTML = packages.map((p, i) => `
    <li class="pkg-card">
      <figure class="pkg-img">
        ${p.img
          ? `<img src="${p.img}" alt="${p.nome}">`
          : `<div class="pkg-img-emoji" aria-hidden="true">${p.emoji}</div>`
        }
      </figure>
      <div class="pkg-body">
        <p class="pkg-name">${p.nome}</p>
        <p class="pkg-price">R$ ${p.preco} · ${p.destino}</p>
        <div class="pkg-actions">
          <button class="btn btn-sm" onclick="editPackage(${i})" aria-label="Editar ${p.nome}">
            <i class="ti ti-edit" aria-hidden="true"></i> Editar
          </button>
          <button class="btn btn-sm btn-danger" onclick="askDeletePackage(${i})" aria-label="Excluir ${p.nome}">
            <i class="ti ti-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </li>
  `).join('');
}

renderPackages();

/* Modal pacote */
const pkgModal       = document.getElementById('pkg-modal');
const imgPreviewBtn  = document.getElementById('img-preview');
const imgFileInput   = document.getElementById('pkg-img-file');

function openPackageModal(resetForm = true) {
  if (resetForm) {
    document.getElementById('pkg-form').reset();
    document.getElementById('pkg-edit-index').value = '';
    document.getElementById('modal-pkg-title').textContent = 'Novo pacote';
    resetImgPreview();
  }
  pkgModal.showModal();
}

function closePackageModal() {
  pkgModal.close();
}

function resetImgPreview() {
  imgPreviewBtn.innerHTML = `
    <i class="ti ti-photo" aria-hidden="true"></i>
    <span>Clique para enviar imagem</span>
  `;
  imgPreviewBtn._imgData = null;
  imgFileInput.value = '';
}

document.getElementById('btn-novo-pacote').addEventListener('click', () => openPackageModal(true));
document.getElementById('btn-close-modal').addEventListener('click', closePackageModal);
document.getElementById('btn-cancel-modal').addEventListener('click', closePackageModal);

imgPreviewBtn.addEventListener('click', () => imgFileInput.click());

imgFileInput.addEventListener('change', function () {
  if (!this.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    imgPreviewBtn.innerHTML = `
      <img src="${e.target.result}" alt="Pré-visualização da imagem">
      <span class="img-preview-label">Trocar imagem</span>
    `;
    imgPreviewBtn._imgData = e.target.result;
  };
  reader.readAsDataURL(this.files[0]);
});

function editPackage(index) {
  const p = packages[index];
  document.getElementById('pkg-nome').value    = p.nome;
  document.getElementById('pkg-preco').value   = p.preco;
  document.getElementById('pkg-destino').value = p.destino;
  document.getElementById('pkg-desc').value    = p.desc;
  document.getElementById('pkg-edit-index').value = index;
  document.getElementById('modal-pkg-title').textContent = 'Editar pacote';

  if (p.img) {
    imgPreviewBtn.innerHTML = `
      <img src="${p.img}" alt="Pré-visualização">
      <span class="img-preview-label">Trocar imagem</span>
    `;
    imgPreviewBtn._imgData = p.img;
  } else {
    imgPreviewBtn.innerHTML = `
      <div style="font-size:36px">${p.emoji}</div>
      <span class="img-preview-label">Clique para trocar</span>
    `;
    imgPreviewBtn._imgData = null;
  }

  openPackageModal(false);
}

document.getElementById('btn-save-pkg').addEventListener('click', savePackage);

function savePackage() {
  const nome    = document.getElementById('pkg-nome').value.trim();
  const preco   = document.getElementById('pkg-preco').value.trim();
  const destino = document.getElementById('pkg-destino').value.trim();
  const desc    = document.getElementById('pkg-desc').value.trim();
  const editIdx = document.getElementById('pkg-edit-index').value;
  const imgData = imgPreviewBtn._imgData ?? null;

  if (!nome || !preco) return;

  const emoji = pkgEmojis[Math.floor(Math.random() * pkgEmojis.length)];
  const pkg   = { nome, preco, destino, desc, img: imgData, emoji };

  if (editIdx !== '') {
    packages[parseInt(editIdx, 10)] = pkg;
  } else {
    packages.push(pkg);
  }

  renderPackages();
  closePackageModal();
}

/* Fechar modal ao clicar no backdrop */
pkgModal.addEventListener('click', e => {
  if (e.target === pkgModal) closePackageModal();
});

/* ---------- Confirmar delete ---------- */
const confirmModal = document.getElementById('confirm-modal');

function askDeletePackage(index) {
  pendingDeleteIndex = index;
  confirmModal.showModal();
}

document.getElementById('btn-cancel-delete').addEventListener('click', () => {
  confirmModal.close();
  pendingDeleteIndex = null;
});

document.getElementById('btn-confirm-delete').addEventListener('click', () => {
  if (pendingDeleteIndex !== null) {
    packages.splice(pendingDeleteIndex, 1);
    renderPackages();
  }
  confirmModal.close();
  pendingDeleteIndex = null;
});

confirmModal.addEventListener('click', e => {
  if (e.target === confirmModal) {
    confirmModal.close();
    pendingDeleteIndex = null;
  }
});

/* ============================================================
   FATURAMENTO
   ============================================================ */
const billingData = [
  { id: '#TXN-0041', cliente: 'Camila Mendes',   pacote: 'Arraial do Cabo',    data: '23 mai 2026', metodo: 'Cartão', valor: 'R$ 1.890', status: 'Pago'       },
  { id: '#TXN-0040', cliente: 'Rafael Torres',   pacote: 'Fernando Noronha',   data: '22 mai 2026', metodo: 'Pix',    valor: 'R$ 4.200', status: 'Pendente'   },
  { id: '#TXN-0039', cliente: 'Beatriz Lima',    pacote: 'Bonito',             data: '21 mai 2026', metodo: 'Cartão', valor: 'R$ 2.350', status: 'Pago'       },
  { id: '#TXN-0038', cliente: 'Lucas Araujo',    pacote: 'Ilhéus',             data: '20 mai 2026', metodo: 'Boleto', valor: 'R$ 1.600', status: 'Cancelado'  },
  { id: '#TXN-0037', cliente: 'Fernanda Costa',  pacote: 'Angra dos Reis',     data: '19 mai 2026', metodo: 'Pix',    valor: 'R$ 1.600', status: 'Pago'       },
  { id: '#TXN-0036', cliente: 'Thiago Souza',    pacote: 'Fernando Noronha',   data: '18 mai 2026', metodo: 'Cartão', valor: 'R$ 4.200', status: 'Reembolso'  },
];

const billBadgeMap = {
  Pago:      'badge-success',
  Pendente:  'badge-warning',
  Cancelado: 'badge-danger',
  Reembolso: 'badge-info',
};

document.getElementById('billing-tbody').innerHTML = billingData.map(b => `
  <tr>
    <td class="text-muted" style="font-size:12px">${b.id}</td>
    <td>${b.cliente}</td>
    <td>${b.pacote}</td>
    <td class="text-muted">${b.data}</td>
    <td class="text-muted">${b.metodo}</td>
    <td><strong style="font-weight:500">${b.valor}</strong></td>
    <td><span class="badge ${billBadgeMap[b.status] ?? 'badge-info'}">${b.status}</span></td>
  </tr>
`).join('');

/* Expor funções chamadas via onclick inline no HTML */
window.editPackage      = editPackage;
window.askDeletePackage = askDeletePackage;