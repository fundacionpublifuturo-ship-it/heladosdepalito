/* ============================================================
   AUTENTICACIÓN
   - MODO DEMO: sesión simple guardada en localStorage.
     Cliente inicia con teléfono + código que le entrega el admin.
     Admin inicia con la contraseña de config.js.
   - Con Supabase configurado, reemplaza esto por Supabase Auth
     (ver README → "Pasar a producción").
   ============================================================ */
(function(){
  const SESSION_KEY = "hp_session_v1";

  const Auth = {
    session(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY)); }catch(e){ return null; } },

    async loginCliente(telefono, password){
      const cliente = await window.HP_DATA.getClientePorTelefono(telefono);
      if(!cliente) throw new Error("No encontramos una tarjeta con ese número. Pídele al negocio que active tu perfil.");
      if(cliente.activo===false) throw new Error("Tu tarjeta está inactiva. Contacta al negocio.");
      if(String(cliente.password) !== String(password)) throw new Error("Código incorrecto.");
      const session = {tipo:"cliente", id:cliente.id, nombre:cliente.nombre, telefono:cliente.telefono};
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    },

    loginAdmin(password){
      if(String(password) !== String(window.HP_CONFIG.DEMO_ADMIN_PASSWORD)){
        throw new Error("Contraseña incorrecta.");
      }
      const session = {tipo:"admin", nombre:"Administrador"};
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    },

    logout(){ localStorage.removeItem(SESSION_KEY); },

    requireCliente(){
      const s = this.session();
      if(!s || s.tipo!=="cliente"){ window.location.href = "/login/"; return null; }
      return s;
    },
    requireAdmin(){
      const s = this.session();
      if(!s || s.tipo!=="admin"){ window.location.href = "/login/?admin=1"; return null; }
      return s;
    },
  };

  window.HP_AUTH = Auth;
})();
