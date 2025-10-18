const transactions = [
  {id:'T-001', date:'2025-10-01', name:'Mariana Silva', ticket:'Mergulho Básico', type:'Entrada Única', amount: 120.00, fee: 6.00, status:'paid', method:'cartao'},
  {id:'T-002', date:'2025-10-03', name:'Lucas Pereira', ticket:'Tour Aquário', type:'VIP', amount: 220.00, fee: 11.00, status:'paid', method:'pix'},
  {id:'T-003', date:'2025-10-05', name:'Ana Oliveira', ticket:'Mergulho Básico', type:'Entrada Única', amount: 120.00, fee: 6.00, status:'refunded', method:'cartao'},
  {id:'T-004', date:'2025-10-07', name:'Rafael Costa', ticket:'Passeio Barco', type:'Grupo', amount: 80.00, fee: 4.00, status:'paid', method:'cartao'},
  {id:'T-005', date:'2025-10-10', name:'Sofia Lima', ticket:'Tour Aquário', type:'VIP', amount: 220.00, fee: 11.00, status:'pending', method:'boleto'},
];

let filtered = transactions.slice();
const tbody = document.getElementById('tbody');

function moneyBR(value){ return value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

function calcSummary(list){
  const gross = list.reduce((s,x)=> s + x.amount,0);
  const fees = list.reduce((s,x)=> s + x.fee,0);
  const net = gross - fees;
  document.getElementById('grossSales').innerText = moneyBR(gross);
  document.getElementById('fees').innerText = moneyBR(fees);
  document.getElementById('netRevenue').innerText = moneyBR(net);
  document.getElementById('ticketsCount').innerText = list.length;
  document.getElementById('quickSales').innerText = moneyBR(gross);
  document.getElementById('quickFees').innerText = moneyBR(fees);
  document.getElementById('quickNet').innerText = moneyBR(net);
}

function renderTable(){
  const q = document.getElementById('q').value.toLowerCase();
  const status = document.getElementById('filterStatus').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  filtered = transactions.filter(t=>{
    if(status && t.status !== status) return false;
    if(q){
      const joined = [t.id,t.name,t.ticket,t.type].join(' ').toLowerCase();
      if(!joined.includes(q)) return false;
    }
    if(from && t.date < from) return false;
    if(to && t.date > to) return false;
    return true;
  });

  tbody.innerHTML = '';
  for(const t of filtered){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="muted">${t.date}</td>
      <td><section style="font-weight:700">${t.name}</section><section class="muted">${t.ticket} • ${t.id}</section></td>
      <td class="muted">${t.type}</td>
      <td class="amount">${moneyBR(t.amount)}</td>
      <td class="muted">${moneyBR(t.fee)}</td>
      <td class="amount">${moneyBR(t.amount - t.fee)}</td>
      <td class="status ${t.status}">${t.status === 'paid' ? 'Pago' : t.status === 'refunded' ? 'Reembolsado' : 'Pendente'}</td>
    `;
    tbody.appendChild(tr);
  }
  calcSummary(filtered);
  renderMiniChart(filtered);
}

function applyDates(){
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const label = document.getElementById('periodLabel');
  if(from || to){
    label.innerText = `${from || '-'} → ${to || '-'}`;
    document.getElementById('periodShort').innerText = 'personalizado';
  } else {
    label.innerText = 'últimos 30 dias';
    document.getElementById('periodShort').innerText = '30d';
  }
  renderTable();
}

function groupByType(list){
  const map = {};
  for(const t of list){ map[t.ticket] = (map[t.ticket] || 0) + (t.amount - t.fee); }
  return map;
}

function renderMiniChart(list){
  const map = groupByType(list);
  const svg = document.getElementById('miniChart');
  svg.innerHTML = '';
  const keys = Object.keys(map);
  if(keys.length === 0){
    svg.innerHTML = `<text x="10" y="70" class="muted">Sem dados</text>`;
    document.getElementById('topType').innerText = '—';
    return;
  }
  const values = keys.map(k=>map[k]);
  const total = values.reduce((a,b) => a+b,0);
  const barH = 18;
  let y = 10;
  keys.forEach((k,i)=>{
    const w = Math.max(8, (map[k]/total) * 180);
    const rect = `<rect x="10" y="${y}" width="${w}" height="${barH}" rx="6" ry="6" fill="${i%2===0? '#c7f6f4' : '#8fe0dd'}" />`;
    const label = `<text x="${12+w}" y="${y+barH/1.6}" font-size="10" fill="#0f172a">${k} (${((map[k]/total)*100).toFixed(0)}%)</text>`;
    svg.innerHTML += rect + label;
    y += barH + 10;
  });
  const topKey = keys.reduce((a,b)=> map[a] > map[b] ? a : b, keys[0]);
  document.getElementById('topType').innerText = `${topKey}`;
}

function exportCSV(){
  const rows = [
    ['id','date','name','ticket','type','amount','fee','net','status','method'],
    ...filtered.map(t=>[t.id,t.date,t.name,t.ticket,t.type,t.amount.toFixed(2),t.fee.toFixed(2),(t.amount - t.fee).toFixed(2),t.status,t.method])
  ];
  const csv = rows.map(r=> r.map(cell => {
    if(typeof cell === 'string' && (cell.includes(',')||cell.includes('"'))) return `"${cell.replace(/"/g,'""')}"`;
    return cell;
  }).join(',')).join('\n');

  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'faturamento-aquatrip.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

function downloadReceiptSample(){
  const blob = new Blob([`Recibo de amostra - Aquatrip\nRecibo #: ${document.getElementById('sampleReceiptId').innerText}`], {type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `recibo-${document.getElementById('sampleReceiptId').innerText}.txt`;
  a.click();
}

function openPayouts(){ alert('Abrir página de pagamentos/payouts (implemente rota real).'); }

function fillSample(){
  const sample = transactions[0];
  if(!sample) return;
  document.getElementById('sampleReceiptId').innerText = sample.id;
  document.getElementById('sampleDate').innerText = sample.date;
}

fillSample();
renderTable();

window.exportCSV = exportCSV;
window.downloadReceiptSample = downloadReceiptSample;
window.openPayouts = openPayouts;

