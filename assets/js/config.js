/* ============================================================
   CONFIGURACIÓN — Helados de Palito
   Completa estos valores cuando tengas tu proyecto de Supabase
   (Project Settings → API). Mientras estén vacíos, el sitio
   funciona en MODO DEMO: todo se guarda en localStorage del
   navegador, así el admin puede ver y probar el diseño completo
   sin backend. Al llenar SUPABASE_URL y SUPABASE_ANON_KEY, el
   sitio empieza a leer/escribir en tu base de datos real
   automáticamente (ver /supabase/schema.sql para crear las tablas).
   ============================================================ */

window.HP_CONFIG = {
  SUPABASE_URL: "",       // ej: "https://xxxxxxxx.supabase.co"
  SUPABASE_ANON_KEY: "",  // la "anon public" key del proyecto (NUNCA la service_role)

  WHATSAPP_PHONE: "573202401152", // número oficial de pedidos
  NEGOCIO_NOMBRE: "Helados De Palito",
  NEGOCIO_DIRECCION: "Calle 6 # 10-01, Belén, Ibagué, Tolima",
  NEGOCIO_HORARIO: "Lun–Vie y Dom 2:00pm–9:00pm · Sáb 2:00pm–5:00pm",

  META_SELLOS: 8, // sellos necesarios para el premio de fidelización

  // Contraseña de acceso admin en MODO DEMO únicamente.
  // En producción con Supabase Auth esto se reemplaza por login real (ver README).
  DEMO_ADMIN_PASSWORD: "palito2026"
};

window.HP_CONFIG.DEMO_MODE = !(window.HP_CONFIG.SUPABASE_URL && window.HP_CONFIG.SUPABASE_ANON_KEY);
