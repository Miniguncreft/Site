
// Configurações de contato
const WHATSAPP_NUM = "5533984011050";
const TEL1 = "(33) 9 8401-1050";
const TEL2 = "(33) 3331-1050";
const ENDERECO = "Av José Augusto Pereira, 47 - Pouso Alegre, Manhuaçu-MG";

// Catálogo de equipamentos
const CATALOGO = [
  { id:"betoneira", nome:"Betoneira 400 L", categoria:"Betoneiras", preco:120, tags:["Menegotti","Elétrica"], img:"assets/equipamentos/betoneira.png" },
  { id:"compactador", nome:"Compactador de Solo (Sapo 4T)", categoria:"Compactação", preco:160, tags:["4 tempos","Gasolina"], img:"assets/equipamentos/compactador.png" },
  { id:"gerador", nome:"Gerador 25 kVA", categoria:"Energia", preco:320, tags:["Silenciado","Diesel"], img:"assets/equipamentos/gerador.png" },
  { id:"andaime1x1", nome:"Andaime tubular 1x1", categoria:"Andaimes", preco:0.6, tags:["Módulo"], img:"assets/equipamentos/andaime1x1.png" },
  { id:"andaime1x150", nome:"Andaime tubular 1x1,50", categoria:"Andaimes", preco:0.6, tags:["Módulo"], img:"assets/equipamentos/andaime1x150.png" },
  { id:"piso", nome:"Piso plataforma", categoria:"Andaimes", preco:1.0, tags:["Plataforma"], img:"assets/equipamentos/piso.png" },
  { id:"sapata", nome:"Sapata ajustável", categoria:"Andaimes", preco:0.6, tags:["Ajustável"], img:"assets/equipamentos/sapata.png" },
  { id:"rompedor", nome:"Rompedor 10kg", categoria:"Demolição", preco:130, tags:["Elétrico"], img:"assets/equipamentos/rompedor.png" },
  { id:"motobomba", nome:"Motobomba 2\"", categoria:"Energia", preco:110, tags:["Gasolina"], img:"assets/equipamentos/motobomba.png" },
  { id:"torre", nome:"Torre de Iluminação", categoria:"Eventos", preco:260, tags:["Diesel"], img:"assets/equipamentos/torre.png" }
];

function formatPreco(v){
  const f = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  return v < 1 ? `${f}` : `${f}/dia`;
}

function renderCatalogo(lista) {
  const el = document.getElementById('lista');
  if(!el) return;
  el.innerHTML = '';
  lista.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="media"><img alt="${item.nome}" src="${item.img}"/></div>
      <div class="body">
        <div class="meta">
          <span class="tag">${item.categoria}</span>
          ${item.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
        <b>${item.nome}</b>
        <div class="price">${formatPreco(item.preco)}</div>
        <div class="actions">
          <a class="btn" href="equipamentos.html#${item.id}">Detalhes</a>
          <a class="btn primary" href="orcamento.html?item=${encodeURIComponent(item.nome)}">Alugar</a>
        </div>
      </div>`;
    el.appendChild(card);
  });
}

function filtrar() {
  const cat = document.getElementById('fCategoria')?.value || '';
  const q = (document.getElementById('fBusca')?.value || '').toLowerCase();
  let lista = CATALOGO.filter(i => (!cat || i.categoria===cat) && (!q || i.nome.toLowerCase().includes(q)));
  renderCatalogo(lista);
}

function preencherItemOrcamento() {
  const params = new URLSearchParams(location.search);
  const item = params.get('item');
  const campo = document.getElementById('campoEquip');
  if(item && campo) campo.value = decodeURIComponent(item);
}

function enviarOrcamento(ev){
  ev.preventDefault();
  const fd = new FormData(ev.target);
  const txt = `*Pedido de orçamento*%0A`
    + `Nome: ${fd.get('nome')}%0A`
    + `Fone: ${fd.get('fone')}%0A`
    + `Equipamento: ${fd.get('equipamento')}%0A`
    + `Período: ${fd.get('periodo')}%0A`
    + `Início: ${fd.get('inicio')}%0A`
    + `Cidade: ${fd.get('cidade')}%0A`
    + `Obs: ${fd.get('obs')}`;
  const url = `https://wa.me/${WHATSAPP_NUM}?text=${txt}`;
  window.open(url, '_blank');
  return false;
}

function enviarContato(ev){
  ev.preventDefault();
  const fd = new FormData(ev.target);
  const txt = `*Contato via site*%0A`
    + `Nome: ${fd.get('nome')}%0A`
    + `E-mail: ${fd.get('email')}%0A`
    + `Fone: ${fd.get('fone')}%0A`
    + `Assunto: ${fd.get('assunto')}%0A`
    + `Mensagem: ${fd.get('mensagem')}`;
  const url = `https://wa.me/${WHATSAPP_NUM}?text=${txt}`;
  window.open(url, '_blank');
  return false;
}

  document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('lista')){
    renderCatalogo(CATALOGO);
    document.getElementById('fCategoria')?.addEventListener('change', filtrar);
    document.getElementById('fBusca')?.addEventListener('input', filtrar);
    document.getElementById('btnLimpar')?.addEventListener('click', ()=>{
      const c = document.getElementById('fCategoria'); if(c) c.value='';
      const b = document.getElementById('fBusca'); if(b) b.value='';
      filtrar();
    });
  }
    preencherItemOrcamento();
    // Atualiza links e textos de contato
    document.querySelectorAll('.whatsapp-link').forEach(el=>{
      el.href = `https://wa.me/${WHATSAPP_NUM}`;
    });
    document.querySelectorAll('.tel1').forEach(el=>{ el.textContent = TEL1; });
    document.querySelectorAll('.tel2').forEach(el=>{ el.textContent = TEL2; });
    document.querySelectorAll('.endereco').forEach(el=>{ el.textContent = ENDERECO; });
  });
