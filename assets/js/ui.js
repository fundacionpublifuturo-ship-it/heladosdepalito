/* ============================================================
   UI COMPARTIDA — header, footer, toast, drawer de carrito,
   modal de producto y reveal-on-scroll. Se monta en cada página
   llamando a HP_UI.mount({root:'/', activo:'menu'})
   ============================================================ */
(function(){

  function toast(msg, type){
    let el = document.getElementById('hp-toast');
    if(!el){
      el = document.createElement('div');
      el.id = 'hp-toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.className = 'toast show ' + (type||'');
    el.innerHTML = (type==='ok'?hpIcon('check'):'') + `<span>${msg}</span>`;
    clearTimeout(el._t);
    el._t = setTimeout(()=> el.classList.remove('show'), 2600);
  }

  function header(root){
    return `
    <header class="site-header">
      <div class="container bar">
        <a class="brand" href="${root}menu/">
          <img src="${root}assets/img/logo.png" alt="Helados de Palito">
          <span class="brand-name">Helados de Palito<small>Menú digital</small></span>
        </a>
        <div class="search">
          ${hpIcon('search')}
          <input id="hp-search" type="text" placeholder="Buscar helados, paletas, cafés…">
        </div>
        <button class="cart-fab" id="hp-cart-btn" aria-label="Ver carrito">
          ${hpIcon('cart')}
          <span class="cart-badge" id="hp-cart-count">0</span>
        </button>
      </div>
    </header>`;
  }

  function footer(root){
    const c = window.HP_CONFIG;
    return `
    <footer class="site-footer">
      <div class="container cols">
        <div>
          <div class="brand" style="margin-bottom:10px">
            <img src="${root}assets/img/logo.png" alt="Helados de Palito" style="height:36px">
          </div>
          <p>"Más que un helado, es una historia"</p>
        </div>
        <div>
          <h5>Contacto</h5>
          <p>${c.NEGOCIO_DIRECCION}</p>
          <p>${c.NEGOCIO_HORARIO}</p>
        </div>
        <div>
          <h5>Tu tarjeta</h5>
          <p><a href="${root}fidelizacion/">Ver mi fidelización →</a></p>
          <p><a href="${root}login/">Iniciar sesión →</a></p>
        </div>
      </div>
    </footer>
    <a class="wa-float" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=${c.WHATSAPP_PHONE}" aria-label="Escríbenos por WhatsApp">
      ${hpIcon('whatsapp')}
    </a>`;
  }

  function cartDrawer(root){
    return `
    <div class="overlay" id="hp-overlay"></div>
    <aside class="drawer" id="hp-drawer" aria-label="Carrito de compras">
      <div class="drawer-head">
        <h3 style="margin:0;font-size:1.2rem">Tu pedido</h3>
        <button class="drawer-close" id="hp-drawer-close" aria-label="Cerrar carrito">${hpIcon('close')}</button>
      </div>
      <div class="drawer-body" id="hp-drawer-body"></div>
      <div class="drawer-foot" id="hp-drawer-foot"></div>
    </aside>`;
  }

  function renderDrawer(){
    const items = window.HP_CART.getItems();
    const body = document.getElementById('hp-drawer-body');
    const foot = document.getElementById('hp-drawer-foot');
    if(!body) return;
    if(items.length===0){
      body.innerHTML = `<div class="empty-state">${hpIcon('empty')}<p>Tu carrito está vacío.<br>Agrega algo delicioso del menú.</p></div>`;
      foot.innerHTML = `<a class="btn btn-p btn-block" href="${window.HP_ROOT}menu/">Ver el menú</a>`;
      return;
    }
    body.innerHTML = items.map(i=>`
      <div class="cart-item">
        ${i.imagen ? `<img src="${i.imagen}" alt="${i.nombre}">` : `<div class="thumb placeholder" style="width:64px;height:64px;border-radius:10px;flex:none">${hpIcon('popsicle')}</div>`}
        <div class="info">
          <h5>${i.nombre}</h5>
          <div class="meta">${window.HP_CART.formatCOP(i.precio)} c/u${i.nota?` · ${i.nota}`:''}</div>
          <div class="qty">
            <button data-act="dec" data-id="${i.id}" data-nota="${i.nota||''}">−</button>
            <span>${i.cantidad}</span>
            <button data-act="inc" data-id="${i.id}" data-nota="${i.nota||''}">+</button>
          </div>
        </div>
        <button class="remove-x" data-act="del" data-id="${i.id}" data-nota="${i.nota||''}">Quitar</button>
      </div>
    `).join('');
    foot.innerHTML = `
      <div class="row" style="display:flex;justify-content:space-between;margin-bottom:14px">
        <strong>Subtotal</strong><span class="price">${window.HP_CART.formatCOP(window.HP_CART.subtotal())}</span>
      </div>
      <a class="btn btn-p btn-block" href="${window.HP_ROOT}menu/checkout.html">Continuar pedido</a>`;
    body.querySelectorAll('button[data-act]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id, nota = b.dataset.nota;
        const items = window.HP_CART.getItems();
        const it = items.find(i=>i.id===id && (i.nota||"")===nota);
        if(b.dataset.act==='inc') window.HP_CART.setCantidad(id,nota, it.cantidad+1);
        if(b.dataset.act==='dec') window.HP_CART.setCantidad(id,nota, it.cantidad-1);
        if(b.dataset.act==='del') window.HP_CART.remove(id,nota);
      });
    });
  }

  function updateCartCount(){
    const el = document.getElementById('hp-cart-count');
    if(el) el.textContent = window.HP_CART.count();
  }

  function openDrawer(){
    document.getElementById('hp-overlay').classList.add('open');
    document.getElementById('hp-drawer').classList.add('open');
    document.documentElement.classList.add('no-scroll');
    renderDrawer();
  }
  function closeDrawer(){
    document.getElementById('hp-overlay').classList.remove('open');
    document.getElementById('hp-drawer').classList.remove('open');
    document.documentElement.classList.remove('no-scroll');
  }

  function mountReveal(){
    const els = document.querySelectorAll('.rv');
    if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.12});
    els.forEach(e=>io.observe(e));
  }

  const UI = {
    toast,
    mount({root='/', showCart=true} = {}){
      window.HP_ROOT = root;
      const headerMount = document.getElementById('hp-header');
      const footerMount = document.getElementById('hp-footer');
      if(headerMount) headerMount.outerHTML = header(root);
      if(footerMount) footerMount.outerHTML = footer(root);
      if(showCart){
        document.body.insertAdjacentHTML('beforeend', cartDrawer(root));
        document.getElementById('hp-cart-btn')?.addEventListener('click', openDrawer);
        document.getElementById('hp-overlay')?.addEventListener('click', closeDrawer);
        document.getElementById('hp-drawer-close')?.addEventListener('click', closeDrawer);
        document.addEventListener('hp:cart-changed', ()=>{ updateCartCount(); renderDrawer(); });
        updateCartCount();
      }
      mountReveal();
    },
    openDrawer, closeDrawer, renderDrawer, updateCartCount, mountReveal,
  };

  window.HP_UI = UI;
})();
