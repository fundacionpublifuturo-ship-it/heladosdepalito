/* ============================================================
   CARRITO — persistente en localStorage entre páginas
   ============================================================ */
(function(){
  const KEY = "hp_cart_v1";

  function read(){ try{ return JSON.parse(localStorage.getItem(KEY))||[]; }catch(e){ return []; } }
  function write(items){ localStorage.setItem(KEY, JSON.stringify(items)); document.dispatchEvent(new CustomEvent('hp:cart-changed',{detail:items})); }

  const Cart = {
    getItems(){ return read(); },
    count(){ return read().reduce((a,i)=>a+i.cantidad,0); },
    subtotal(){ return read().reduce((a,i)=>a+i.cantidad*i.precio,0); },
    add(producto, cantidad=1, nota=""){
      const items = read();
      const existente = items.find(i=>i.id===producto.id && (i.nota||"")===nota);
      if(existente) existente.cantidad += cantidad;
      else items.push({id:producto.id, nombre:producto.nombre, precio:producto.precio, imagen:producto.imagen, cantidad, nota});
      write(items);
    },
    setCantidad(id, nota, cantidad){
      let items = read();
      const it = items.find(i=>i.id===id && (i.nota||"")===nota);
      if(!it) return;
      if(cantidad<=0) items = items.filter(i=>i!==it);
      else it.cantidad = cantidad;
      write(items);
    },
    remove(id, nota){
      write(read().filter(i=>!(i.id===id && (i.nota||"")===nota)));
    },
    clear(){ write([]); },
    formatCOP(n){ return "$" + Math.round(n).toLocaleString('es-CO'); },
    buildWhatsappMessage({folio, cliente, tipoEntrega, metodoPago, notasGenerales}){
      const items = read();
      let msg = `¡Hola *${window.HP_CONFIG.NEGOCIO_NOMBRE}*! 🍦 Quiero confirmar mi pedido *${folio}*:\n\n`;
      items.forEach(i=>{
        msg += `• ${i.cantidad}x ${i.nombre} — ${Cart.formatCOP(i.precio*i.cantidad)}`;
        if(i.nota) msg += ` (${i.nota})`;
        msg += `\n`;
      });
      msg += `\n*Subtotal:* ${Cart.formatCOP(Cart.subtotal())}`;
      msg += `\n*Entrega:* ${tipoEntrega}`;
      msg += `\n*Pago:* ${metodoPago}`;
      if(cliente?.nombre) msg += `\n*Nombre:* ${cliente.nombre}`;
      if(cliente?.telefono) msg += `\n*Teléfono:* ${cliente.telefono}`;
      if(notasGenerales) msg += `\n*Notas:* ${notasGenerales}`;
      msg += `\n\n¡Gracias! 🎉`;
      return msg;
    },
    whatsappLink(text){
      return `https://api.whatsapp.com/send?phone=${window.HP_CONFIG.WHATSAPP_PHONE}&text=${encodeURIComponent(text)}`;
    }
  };

  window.HP_CART = Cart;
})();
