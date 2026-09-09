/* ============================================================
   BARRA LATERAL DEL ADMIN — se repite en todas las páginas
   de /admin/. mount(activo) inserta el menú y pinta el link
   correspondiente como activo.
   ============================================================ */
(function(){
  const LINKS = [
    {key:'dashboard', href:'./', icon:'dashboard', label:'Resumen'},
    {key:'productos', href:'productos.html', icon:'box', label:'Productos'},
    {key:'clientes', href:'clientes.html', icon:'users', label:'Clientes y sellos'},
    {key:'pedidos', href:'pedidos.html', icon:'orders', label:'Pedidos'},
    {key:'config', href:'configuracion.html', icon:'settings', label:'Negocio y QR'},
  ];

  function mount(activo){
    const side = document.getElementById('hp-admin-side');
    if(!side) return;
    side.innerHTML = `
      <div class="logo-row">
        <img src="../assets/img/logo.png" alt="Helados de Palito">
        <span style="font-family:var(--font-display);font-weight:800;color:#fff">Panel</span>
      </div>
      ${LINKS.map(l => `
        <a class="admin-link ${l.key===activo?'active':''}" href="${l.href}">
          ${hpIcon(l.icon)}<span>${l.label}</span>
        </a>`).join('')}
      <a class="admin-link" href="#" id="hp-admin-logout" style="margin-top:auto">
        ${hpIcon('logout')}<span>Cerrar sesión</span>
      </a>
    `;
    document.getElementById('hp-admin-logout').addEventListener('click', (e)=>{
      e.preventDefault();
      window.HP_AUTH.logout();
      window.location.href = '../';
    });
  }

  window.HP_ADMIN_NAV = {mount};
})();
