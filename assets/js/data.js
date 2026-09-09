/* ============================================================
   CAPA DE DATOS — Helados de Palito
   Expone window.HP_DATA con funciones async para leer/escribir
   categorías, productos, clientes, tarjetas y pedidos.

   - En MODO DEMO (sin llaves de Supabase en config.js) todo se
     guarda en localStorage, sembrado desde seed.js la primera vez.
   - Con Supabase configurado, las mismas funciones leen/escriben
     directamente en tu proyecto (ver /supabase/schema.sql).

   Así el front-end (menu, carrito, fidelización, admin) nunca
   necesita saber cuál de los dos modos está activo.
   ============================================================ */

(function(){
  const CFG = window.HP_CONFIG;
  const LS_KEY = "hp_db_v1";

  // ---------- utilidades locales ----------
  function loadLocal(){
    let raw = localStorage.getItem(LS_KEY);
    if(!raw){
      const seed = window.HP_SEED;
      const db = {
        categorias: seed.categorias.slice(),
        productos: seed.productos.map(p=>({...p})),
        clientes: seed.clientes.map(c=>({...c})),
        pedidos: [],
        recompensa: {...seed.recompensa},
        contador_folio: 1000,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(db));
      return db;
    }
    return JSON.parse(raw);
  }
  function saveLocal(db){ localStorage.setItem(LS_KEY, JSON.stringify(db)); }
  function uid(prefix){ return prefix + "-" + Math.random().toString(36).slice(2,9); }

  // ---------- cliente Supabase (si está configurado) ----------
  let sb = null;
  function getSupabase(){
    if(CFG.DEMO_MODE) return null;
    if(sb) return sb;
    if(window.supabase && window.supabase.createClient){
      sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
    }
    return sb;
  }

  const API = {
    isDemo(){ return CFG.DEMO_MODE; },

    // ---------- CATEGORÍAS ----------
    async getCategorias(){
      const client = getSupabase();
      if(client){
        const {data,error} = await client.from('categorias').select('*').eq('activo',true).order('orden');
        if(error) throw error;
        return data;
      }
      const db = loadLocal();
      return db.categorias.filter(c=>c.activo!==false).sort((a,b)=>a.orden-b.orden);
    },

    // ---------- PRODUCTOS ----------
    async getProductos({soloDisponibles=true}={}){
      const client = getSupabase();
      if(client){
        let q = client.from('productos').select('*').order('orden',{ascending:true});
        if(soloDisponibles) q = q.eq('disponible', true);
        const {data,error} = await q;
        if(error) throw error;
        return data;
      }
      const db = loadLocal();
      let list = db.productos.slice();
      if(soloDisponibles) list = list.filter(p=>p.disponible!==false);
      return list;
    },
    async upsertProducto(p){
      const client = getSupabase();
      if(client){
        const {data,error} = await client.from('productos').upsert(p).select();
        if(error) throw error;
        return data[0];
      }
      const db = loadLocal();
      if(!p.id) p.id = uid('prod');
      const idx = db.productos.findIndex(x=>x.id===p.id);
      if(idx>=0) db.productos[idx] = {...db.productos[idx], ...p};
      else db.productos.push(p);
      saveLocal(db);
      return p;
    },
    async eliminarProducto(id){
      const client = getSupabase();
      if(client){ const {error} = await client.from('productos').delete().eq('id',id); if(error) throw error; return; }
      const db = loadLocal();
      db.productos = db.productos.filter(p=>p.id!==id);
      saveLocal(db);
    },

    // ---------- CLIENTES / FIDELIZACIÓN ----------
    async getClientes(){
      const client = getSupabase();
      if(client){ const {data,error} = await client.from('clientes').select('*').order('fecha',{ascending:false}); if(error) throw error; return data; }
      const db = loadLocal();
      return db.clientes.slice().sort((a,b)=> (b.fecha||"").localeCompare(a.fecha||""));
    },
    async getClientePorTelefono(telefono){
      const client = getSupabase();
      if(client){ const {data,error} = await client.from('clientes').select('*').eq('telefono',telefono).maybeSingle(); if(error) throw error; return data; }
      const db = loadLocal();
      return db.clientes.find(c=>c.telefono===telefono) || null;
    },
    async crearCliente({nombre, telefono, password}){
      const client = getSupabase();
      const nuevo = { id: uid('cli'), nombre, telefono, password, sellos:0, activo:true,
                       fecha: new Date().toISOString().slice(0,10), historial:[] };
      if(client){ const {data,error} = await client.from('clientes').insert(nuevo).select(); if(error) throw error; return data[0]; }
      const db = loadLocal();
      if(db.clientes.some(c=>c.telefono===telefono)) throw new Error("Ya existe un cliente con ese teléfono.");
      db.clientes.push(nuevo);
      saveLocal(db);
      return nuevo;
    },
    async sumarSello(clienteId, nota){
      const meta = CFG.META_SELLOS;
      const client = getSupabase();
      if(client){
        const {data:cli,error:e1} = await client.from('clientes').select('*').eq('id',clienteId).single();
        if(e1) throw e1;
        const sellos = Math.min(meta, (cli.sellos||0)+1);
        const {data,error} = await client.from('clientes').update({sellos}).eq('id',clienteId).select();
        if(error) throw error;
        await client.from('historial_sellos').insert({cliente_id:clienteId, fecha:new Date().toISOString(), nota:nota||'Compra registrada'});
        return data[0];
      }
      const db = loadLocal();
      const cli = db.clientes.find(c=>c.id===clienteId);
      if(!cli) throw new Error("Cliente no encontrado");
      cli.sellos = Math.min(meta, (cli.sellos||0)+1);
      cli.historial = cli.historial || [];
      cli.historial.unshift({fecha:new Date().toISOString().slice(0,10), nota: nota || 'Compra registrada'});
      saveLocal(db);
      return cli;
    },
    async canjearPremio(clienteId){
      const client = getSupabase();
      if(client){
        const {data,error} = await client.from('clientes').update({sellos:0}).eq('id',clienteId).select();
        if(error) throw error;
        await client.from('historial_sellos').insert({cliente_id:clienteId, fecha:new Date().toISOString(), nota:'🎁 Premio canjeado'});
        return data[0];
      }
      const db = loadLocal();
      const cli = db.clientes.find(c=>c.id===clienteId);
      if(!cli) throw new Error("Cliente no encontrado");
      cli.sellos = 0;
      cli.historial = cli.historial || [];
      cli.historial.unshift({fecha:new Date().toISOString().slice(0,10), nota:'Premio canjeado'});
      saveLocal(db);
      return cli;
    },
    async setClienteActivo(clienteId, activo){
      const client = getSupabase();
      if(client){ const {error} = await client.from('clientes').update({activo}).eq('id',clienteId); if(error) throw error; return; }
      const db = loadLocal();
      const cli = db.clientes.find(c=>c.id===clienteId);
      if(cli) cli.activo = activo;
      saveLocal(db);
    },
    async getRecompensa(){
      const client = getSupabase();
      if(client){ const {data,error} = await client.from('recompensas').select('*').eq('activo',true).limit(1).maybeSingle(); if(error) throw error; return data; }
      const db = loadLocal();
      return db.recompensa;
    },
    async setRecompensa(r){
      const client = getSupabase();
      if(client){ const {error} = await client.from('recompensas').update(r).eq('activo',true); if(error) throw error; return; }
      const db = loadLocal();
      db.recompensa = {...db.recompensa, ...r};
      saveLocal(db);
    },

    // ---------- PEDIDOS ----------
    async crearPedido({items, subtotal, notas, tipoEntrega, metodoPago, cliente}){
      const client = getSupabase();
      if(client){
        const folio = 'HP-' + Date.now().toString().slice(-6);
        const pedido = {folio, items, subtotal, notas, tipo_entrega:tipoEntrega, metodo_pago:metodoPago,
                         cliente_nombre:cliente?.nombre||'', cliente_telefono:cliente?.telefono||'',
                         estado:'pendiente', fecha:new Date().toISOString()};
        const {data,error} = await client.from('pedidos').insert(pedido).select();
        if(error) throw error;
        return data[0];
      }
      const db = loadLocal();
      db.contador_folio = (db.contador_folio||1000)+1;
      const folio = 'HP-' + String(db.contador_folio).padStart(6,'0');
      const pedido = { id: uid('ped'), folio, items, subtotal, notas, tipoEntrega, metodoPago,
                        cliente_nombre:cliente?.nombre||'', cliente_telefono:cliente?.telefono||'',
                        estado:'pendiente', fecha:new Date().toISOString() };
      db.pedidos.unshift(pedido);
      saveLocal(db);
      return pedido;
    },
    async getPedidos(){
      const client = getSupabase();
      if(client){ const {data,error} = await client.from('pedidos').select('*').order('fecha',{ascending:false}); if(error) throw error; return data; }
      const db = loadLocal();
      return db.pedidos.slice();
    },
    async setPedidoEstado(id, estado){
      const client = getSupabase();
      if(client){ const {error} = await client.from('pedidos').update({estado}).eq('id',id); if(error) throw error; return; }
      const db = loadLocal();
      const p = db.pedidos.find(x=>x.id===id);
      if(p) p.estado = estado;
      saveLocal(db);
    },
  };

  window.HP_DATA = API;
})();
