/* ============================================================
   DATOS DE EJEMPLO (SEED) — Helados de Palito
   Basados en el menú oficial de la marca. Las imágenes con URL
   de Google Drive son fotografías reales de producto ya
   entregadas; los productos con imagen:null muestran un
   marcador de posición hasta que subas la foto desde el panel
   Admin → Productos. Todo esto se puede editar, apagar o borrar
   desde el admin sin tocar código.
   ============================================================ */

window.HP_SEED = {
  categorias: [
    { id:"helados",   nombre:"Helados",        orden:1, icono:"popsicle" },
    { id:"paletas",   nombre:"Paletas",        orden:2, icono:"popsicle" },
    { id:"comer",     nombre:"Para Comer",     orden:3, icono:"empanada" },
    { id:"pal_calor", nombre:"Pal Calor",      orden:4, icono:"drink" },
    { id:"frappe",    nombre:"Frappé de Café", orden:5, icono:"frappe" },
    { id:"pal_frio",  nombre:"Pal Frio",       orden:6, icono:"coffee" },
    { id:"endulzar",  nombre:"Para Endulzar",  orden:7, icono:"cake" },
    { id:"malteadas", nombre:"Malteadas",      orden:8, icono:"shake" },
  ],

  productos: [
    // ---------- HELADOS $8.000 ----------
    { id:"hel-coco", categoria:"helados", nombre:"Coco", descripcion:"Helado natural cremoso con sabor natural del coco rayado.", precio:8000, imagen:null, disponible:true },
    { id:"hel-mora-agraz", categoria:"helados", nombre:"Mora y agraz", descripcion:"Sabor natural de mora con las propiedades del agraz.", precio:8000, imagen:null, disponible:true },
    { id:"hel-guanabana", categoria:"helados", nombre:"Guanábana", descripcion:"Cremoso, con sabor y motas naturales de guanábana.", precio:8000, imagen:null, disponible:true },
    { id:"hel-frutos-rojos", categoria:"helados", nombre:"Frutos rojos", descripcion:"Con trocitos de fresa, agraz y mora.", precio:8000, imagen:null, disponible:true },
    { id:"hel-maracuya", categoria:"helados", nombre:"Maracuyá", descripcion:"Cremoso, con mezcla especial de la casa.", precio:8000, imagen:null, disponible:true },
    { id:"hel-limon", categoria:"helados", nombre:"Limón", descripcion:"Sabor natural y refrescante del limón.", precio:8000, imagen:null, disponible:true },
    { id:"hel-mani", categoria:"helados", nombre:"Maní", descripcion:"Con crema de maní y trocitos de maní.", precio:8000, imagen:null, disponible:true },
    { id:"hel-cafe", categoria:"helados", nombre:"Café", descripcion:"Sabor natural del café orgánico del Tolima.", precio:8000, imagen:null, disponible:true },
    { id:"hel-queso-bocadillo", categoria:"helados", nombre:"Queso y bocadillo", descripcion:"Sabor del queso rayado y el bocadillo.", precio:8000, imagen:null, disponible:true },
    { id:"hel-leche-condensada", categoria:"helados", nombre:"Leche condensada", descripcion:"Cremoso, con sabor de la leche condensada.", precio:8000, imagen:null, disponible:true },
    { id:"hel-oreo", categoria:"helados", nombre:"Oreo", descripcion:"Cremoso, con trocitos de galleta Oreo.", precio:8000,
      imagen:"https://drive.google.com/thumbnail?id=141vNJ8uGon3bUR-ueL9SMD7hOvSMdIDZ&sz=w800", destacado:true, disponible:true },
    { id:"hel-chocolate", categoria:"helados", nombre:"Chocolate", descripcion:"Helado natural con mezcla de la casa y sabor a chocolate.", precio:8000, imagen:null, disponible:true },
    { id:"hel-arequipe", categoria:"helados", nombre:"Arequipe", descripcion:"Cremoso, con sabor del arequipe.", precio:8000, imagen:null, disponible:true },
    { id:"hel-milo-masmelos", categoria:"helados", nombre:"Milo y masmelos", descripcion:"Sabor del Milo con mini masmelos.", precio:8000, imagen:null, disponible:true },
    { id:"hel-gomas", categoria:"helados", nombre:"Gomas", descripcion:"Helado natural con gomitas de dulce.", precio:8000, imagen:null, disponible:true },
    { id:"hel-licor-whisky", categoria:"helados", nombre:"LICOR · Crema whisky (Baileys)", descripcion:"Edición con licor, solo para mayores de edad.", precio:10000, imagen:null, disponible:true },

    // ---------- PALETAS $8.000 ----------
    { id:"pal-frutal", categoria:"paletas", nombre:"Frutal (sin azúcar)", descripcion:"Jugo de frutas amarillas con trocitos de fresa, durazno y uva.", precio:8000,
      imagen:"https://drive.google.com/thumbnail?id=1oyEcMHmRD7mBzDEafu_jCYofzzihIUiZ&sz=w800", destacado:true, disponible:true },
    { id:"pal-fit", categoria:"paletas", nombre:"Palito Fit (sin azúcar)", descripcion:"Piña y hierbabuena, fresca y ligera.", precio:8000,
      imagen:"https://drive.google.com/thumbnail?id=1NjGWUkENedQsxM6pThZ17YHtu3_FMSq9&sz=w800", disponible:true },
    { id:"pal-agridulce", categoria:"paletas", nombre:"Agridulce", descripcion:"Guayaba agria, dulce y ácida a la vez.", precio:8000, imagen:null, disponible:true },
    { id:"pal-verde-extremo", categoria:"paletas", nombre:"Verde extremo", descripcion:"Mango biche y sal, para los que aman lo ácido.", precio:8000,
      imagen:"https://drive.google.com/thumbnail?id=1cBNv9Mcpc-Q_r1Gn6Ifv2SjXqBL2n0nF&sz=w800", disponible:true },
    { id:"pal-lulada", categoria:"paletas", nombre:"Lulada", descripcion:"Lulo, maracuyá y limón en una sola paleta.", precio:8000,
      imagen:"https://drive.google.com/thumbnail?id=1KshaZdIAwiEIbLrixMa0T6haEcyYtVVw&sz=w800", disponible:true },
    { id:"pal-licor-mojito", categoria:"paletas", nombre:"LICOR · Mojito", descripcion:"Paleta con licor, solo para mayores de edad.", precio:8500,
      imagen:"https://drive.google.com/thumbnail?id=12YTadeQHqiA4kjZhSmTRBxwJqDImqJd0&sz=w800", disponible:true },
    { id:"pal-licor-aguardiente", categoria:"paletas", nombre:"LICOR · Aguardiente", descripcion:"Paleta con licor, solo para mayores de edad.", precio:8500,
      imagen:"https://drive.google.com/thumbnail?id=1PcSym_t9sn0LXh62GLnLcUJULhNdDkgf&sz=w800", disponible:true },

    // ---------- PARA COMER ----------
    { id:"com-emp-carne", categoria:"comer", nombre:"Empanada · Carne desmechada", descripcion:"Empanada al horno, masa delgada y crujiente.", precio:5500,
      imagen:"https://drive.google.com/thumbnail?id=15xZI2bkx-8S8WM5PRHt91OeACMZgSir-&sz=w800", destacado:true, disponible:true },
    { id:"com-emp-pollo", categoria:"comer", nombre:"Empanada · Pollo y champiñones", descripcion:"Empanada al horno, relleno de pollo y champiñones.", precio:5500, imagen:null, disponible:true },
    { id:"com-emp-ranchera", categoria:"comer", nombre:"Empanada · Ranchera picantica", descripcion:"Carne, maíz y salchicha ranchera.", precio:5500, imagen:null, disponible:true },
    { id:"com-emp-queso", categoria:"comer", nombre:"Empanada · Puro queso", descripcion:"Empanada al horno rellena de queso.", precio:5500, imagen:null, disponible:true },
    { id:"com-emp-hawaiana", categoria:"comer", nombre:"Empanada · Hawaiana", descripcion:"Empanada al horno estilo hawaiana.", precio:5500, imagen:null, disponible:true },
    { id:"com-palito-queso", categoria:"comer", nombre:"Palito al horno · Queso", descripcion:"Palito horneado relleno de queso.", precio:7000, imagen:null, disponible:true },
    { id:"com-palito-napolitano", categoria:"comer", nombre:"Palito al horno · Napolitano", descripcion:"Palito horneado estilo napolitano.", precio:8000, imagen:null, disponible:true },

    // ---------- PAL CALOR ----------
    { id:"cal-milo-frio", categoria:"pal_calor", nombre:"Milo frío", descripcion:"Milo bien frío, ideal para el calor.", precio:10000, imagen:null, disponible:true },
    { id:"cal-latte-chai", categoria:"pal_calor", nombre:"Latte chai frío", descripcion:"Latte chai helado con notas de canela y anís.", precio:13000,
      imagen:"https://drive.google.com/thumbnail?id=1HNFwthNYi8wvSfgumHlxDktKyO6tqI_r&sz=w800", destacado:true, disponible:true },
    { id:"cal-lim-natural", categoria:"pal_calor", nombre:"Limonada natural (agua)", descripcion:"Limonada clásica en agua.", precio:7500, imagen:null, disponible:true },
    { id:"cal-lim-hierbabuena", categoria:"pal_calor", nombre:"Limonada hierbabuena (agua)", descripcion:"Limonada refrescante con hierbabuena.", precio:9000, imagen:null, disponible:true },
    { id:"cal-lim-mango", categoria:"pal_calor", nombre:"Limonada mango biche (agua)", descripcion:"Limonada con mango biche, ácida y refrescante.", precio:8000,
      imagen:"https://drive.google.com/thumbnail?id=1H8jkqSd6vKbK_ukq1RHgT5SBrFlausEn&sz=w800", disponible:true },
    { id:"cal-lim-cerezada", categoria:"pal_calor", nombre:"Limonada cerezada (agua)", descripcion:"Limonada con cereza y toque cítrico.", precio:9000,
      imagen:"https://drive.google.com/thumbnail?id=1r-vSueUdPV5XbygGm8IHqfIIFqOJ0WaF&sz=w800", disponible:true },
    { id:"cal-lim-coco-leche", categoria:"pal_calor", nombre:"Limonada de coco (leche)", descripcion:"Limonada cremosa en leche con coco.", precio:10000, imagen:null, disponible:true },
    { id:"cal-lim-frutosrojos-leche", categoria:"pal_calor", nombre:"Limonada frutos rojos (leche)", descripcion:"Limonada cremosa en leche con frutos rojos.", precio:10000,
      imagen:"https://drive.google.com/thumbnail?id=1XqTciDIO1yk7bp-nM43FDM-MGKo601EU&sz=w800", disponible:true },
    { id:"cal-jugo-maracuya-agua", categoria:"pal_calor", nombre:"Jugo de maracuyá (agua)", descripcion:"Jugo natural de maracuyá en agua.", precio:9000,
      imagen:"https://drive.google.com/thumbnail?id=1tWAE6z9vgxzq9dvoKKMN47-Cf9TvGZzS&sz=w800", disponible:true },
    { id:"cal-jugo-guanabana-agua", categoria:"pal_calor", nombre:"Jugo de guanábana (agua)", descripcion:"Jugo natural de guanábana en agua.", precio:9000, imagen:null, disponible:true },
    { id:"cal-jugo-frutosrojos-agua", categoria:"pal_calor", nombre:"Jugo de frutos rojos (agua)", descripcion:"Jugo natural de frutos rojos en agua.", precio:9000, imagen:null, disponible:true },
    { id:"cal-jugo-maracuya-leche", categoria:"pal_calor", nombre:"Jugo de maracuyá (leche)", descripcion:"Jugo cremoso de maracuyá en leche.", precio:10000, imagen:null, disponible:true },
    { id:"cal-jugo-guanabana-leche", categoria:"pal_calor", nombre:"Jugo de guanábana (leche)", descripcion:"Jugo cremoso de guanábana en leche.", precio:10000, imagen:null, disponible:true },
    { id:"cal-jugo-frutosrojos-leche", categoria:"pal_calor", nombre:"Jugo de frutos rojos (leche)", descripcion:"Jugo cremoso de frutos rojos en leche.", precio:10000, imagen:null, disponible:true },
    { id:"cal-jugo-coco-cocada", categoria:"pal_calor", nombre:"Jugo de coco cocada (leche)", descripcion:"Jugo cremoso de coco tipo cocada.", precio:10000, imagen:null, disponible:true },
    { id:"cal-aromatica", categoria:"pal_calor", nombre:"Aromática de frutas", descripcion:"Infusión caliente endulzada con panela, con fruta fresca.", precio:8000,
      imagen:"https://drive.google.com/thumbnail?id=10eOhm3fzr9qPrVV7gJG4Bpo7ULJlQTyg&sz=w800", disponible:true },

    // ---------- FRAPPÉ DE CAFÉ ----------
    { id:"fra-chocolate", categoria:"frappe", nombre:"Frappé de café · Chocolate", descripcion:"Frappé de café con chocolate y chantilly.", precio:16000, imagen:null, disponible:true },
    { id:"fra-arequipe", categoria:"frappe", nombre:"Frappé de café · Arequipe", descripcion:"Frappé de café con arequipe y chantilly.", precio:16000,
      imagen:"https://drive.google.com/thumbnail?id=1_gIBDIFs3U5BzM3MXS3b-xku3yIJF7I5&sz=w800", destacado:true, disponible:true },

    // ---------- PAL FRIO (bebidas calientes) ----------
    { id:"fri-cafe", categoria:"pal_frio", nombre:"Café", descripcion:"Café negro recién preparado.", precio:7000,
      imagen:"https://drive.google.com/thumbnail?id=15rO8avrEX7AUtsEqQmG3_jPtjCg45FQk&sz=w800", disponible:true },
    { id:"fri-capuchino", categoria:"pal_frio", nombre:"Capuchino", descripcion:"Espresso con leche vaporizada y espuma cremosa.", precio:8500,
      imagen:"https://drive.google.com/thumbnail?id=1JTjZ914nSvGD675pqMBb1a0-MYMyw9sI&sz=w800", destacado:true, disponible:true },
    { id:"fri-capuchino-baileys", categoria:"pal_frio", nombre:"Capuchino con Baileys y amaretto", descripcion:"Capuchino con licor, solo para mayores de edad.", precio:13000, imagen:null, disponible:true },
    { id:"fri-latte", categoria:"pal_frio", nombre:"Latte", descripcion:"Café suave con abundante leche vaporizada.", precio:8000, imagen:null, disponible:true },
    { id:"fri-aromatica-frutas", categoria:"pal_frio", nombre:"Aromática de frutas (caliente)", descripcion:"Infusión caliente de frutas.", precio:8000, imagen:null, disponible:true },
    { id:"fri-milo-caliente", categoria:"pal_frio", nombre:"Milo caliente", descripcion:"Milo bien caliente y espumoso.", precio:8500, imagen:null, disponible:true },
    { id:"fri-te-chai", categoria:"pal_frio", nombre:"Té chai con leche", descripcion:"Té chai especiado con leche.", precio:10000, imagen:null, disponible:true },

    // ---------- PARA ENDULZAR ----------
    { id:"end-fresas-blanca", categoria:"endulzar", nombre:"Fresas con crema blanca", descripcion:"Fresas frescas con crema suave.", precio:18000,
      imagen:"https://drive.google.com/thumbnail?id=1SlseD4Uvk98u1tAWGEoM1mKQtQrkqIdy&sz=w800", destacado:true, disponible:true },
    { id:"end-fresas-mixtas", categoria:"endulzar", nombre:"Fresas con crema mixtas", descripcion:"Fresas con crema y capas de chocolate.", precio:20000,
      imagen:"https://drive.google.com/thumbnail?id=1dvGSxNCAehFCD_pQe37_a7TGrsicGYtb&sz=w800", disponible:true },
    { id:"end-fresas-campesinas", categoria:"endulzar", nombre:"Fresas con crema campesinas", descripcion:"Fresas con crema, receta especial de la casa.", precio:23000, imagen:null, disponible:true },
    { id:"end-fresas-duraznos", categoria:"endulzar", nombre:"Fresas con crema + duraznos", descripcion:"Fresas con crema acompañadas de duraznos.", precio:21000, imagen:null, disponible:true },
    { id:"end-fresas-duraznos-queso", categoria:"endulzar", nombre:"Fresas con crema + duraznos + queso", descripcion:"La combinación completa: fresas, crema, duraznos y queso.", precio:26000, imagen:null, disponible:true },
    { id:"end-copa-duraznos", categoria:"endulzar", nombre:"Copa de duraznos", descripcion:"Duraznos frescos en copa con crema.", precio:18000,
      imagen:"https://drive.google.com/thumbnail?id=108tg8vMmY9AEzM4LJcUc3TspN1b8naPD&sz=w800", disponible:true },
    { id:"end-copa-duraznos-campesinas", categoria:"endulzar", nombre:"Copa de duraznos campesinas", descripcion:"Duraznos en copa, receta especial de la casa.", precio:28000, imagen:null, disponible:true },
    { id:"end-copa-oblea", categoria:"endulzar", nombre:"Copa de oblea", descripcion:"Crema, arequipe y trozos de oblea crujiente.", precio:14000,
      imagen:"https://drive.google.com/thumbnail?id=15PaKe9B7bxxgXw2iaADU-Ax5ORVUYCGf&sz=w800", disponible:true },
    { id:"end-torta-limon", categoria:"endulzar", nombre:"Torta de limón con arándanos", descripcion:"Porción de torta de limón decorada con arándanos frescos.", precio:14000,
      imagen:"https://drive.google.com/thumbnail?id=1135ijEOHnqWyKvjWTrJ8nv-AeBjEsS4d&sz=w800", destacado:true, disponible:true },
    { id:"end-torta-chocolate", categoria:"endulzar", nombre:"Torta de chocolate, arequipe y nutella", descripcion:"Porción de torta de chocolate con arequipe y Nutella.", precio:14000, imagen:null, disponible:true },
    { id:"end-torta-redvelvet", categoria:"endulzar", nombre:"Torta Red Velvet", descripcion:"Porción de Red Velvet con centro de galleta.", precio:15000, imagen:null, disponible:true },
    { id:"end-almojabana", categoria:"endulzar", nombre:"Almojábana", descripcion:"Porción de almojábana casera.", precio:16000, imagen:null, disponible:true },
    { id:"end-almojabana-tresleches", categoria:"endulzar", nombre:"Almojábana en tres leches", descripcion:"Almojábana bañada en tres leches.", precio:17000, imagen:null, disponible:true },

    // ---------- MALTEADAS $17.000 ----------
    { id:"mal-quipitos", categoria:"malteadas", nombre:"Quipitos", descripcion:"Malteada con dulces Quipitos triturados.", precio:17000,
      imagen:"https://drive.google.com/thumbnail?id=1D6gjA-t0baHfiWgag-unV7clLfG-5pWx&sz=w800", disponible:true },
    { id:"mal-chocolate", categoria:"malteadas", nombre:"Chocolate", descripcion:"Malteada cremosa de chocolate.", precio:17000,
      imagen:"https://drive.google.com/thumbnail?id=1kWkExqMWqjEfkYK6cgfbDCEut1qkeBJD&sz=w800", disponible:true },
    { id:"mal-milkyway", categoria:"malteadas", nombre:"Milky Way", descripcion:"Malteada inspirada en la barra Milky Way.", precio:17000, imagen:null, disponible:true },
    { id:"mal-mm", categoria:"malteadas", nombre:"M&M", descripcion:"Malteada decorada con M&M's de colores.", precio:17000,
      imagen:"https://drive.google.com/thumbnail?id=1VAO0Aknqdp3PylxaaJ45-uy_7AASJn9r&sz=w800", destacado:true, disponible:true },
    { id:"mal-brownie", categoria:"malteadas", nombre:"Brownie", descripcion:"Malteada coronada con trozos de brownie.", precio:17000,
      imagen:"https://drive.google.com/thumbnail?id=1AR5oV_-6YSoyCtnSI4T-nAYpx2B5ENFm&sz=w800", disponible:true },
    { id:"mal-maracuya", categoria:"malteadas", nombre:"Maracuyá", descripcion:"Malteada de maracuyá, dulce y ácida.", precio:17000,
      imagen:"https://drive.google.com/thumbnail?id=1odHx3AraRUw44RKEqOIX--TKQT1CmVgl&sz=w800", disponible:true },
    { id:"mal-frutosrojos", categoria:"malteadas", nombre:"Frutos rojos", descripcion:"Malteada de frutos rojos.", precio:17000, imagen:null, disponible:true },
    { id:"mal-guanabana", categoria:"malteadas", nombre:"Guanábana", descripcion:"Malteada cremosa de guanábana.", precio:17000, imagen:null, disponible:true },
    { id:"mal-cafe", categoria:"malteadas", nombre:"Café", descripcion:"Malteada de café bien intensa.", precio:17000, imagen:null, disponible:true },
    { id:"mal-licor-pinacolada", categoria:"malteadas", nombre:"LICOR · Piña colada", descripcion:"Malteada con licor, solo para mayores de edad.", precio:18000, imagen:null, disponible:true },
    { id:"mal-licor-baileys", categoria:"malteadas", nombre:"LICOR · Baileys", descripcion:"Malteada con licor, solo para mayores de edad.", precio:20000, imagen:null, disponible:true },
  ],

  recompensa: {
    nombre:"Por definir",
    descripcion:"El premio de la tarjeta de fidelización se anunciará próximamente. Configúralo desde Admin → Configuración.",
  },

  // Clientes demo para poder ver el flujo de fidelización sin crear uno manualmente
  clientes: [
    { id:"cli-demo-1", nombre:"Cliente de ejemplo", telefono:"3000000000", password:"1234",
      sellos:3, activo:true, fecha:"2026-08-01", historial:[
        {fecha:"2026-08-01", nota:"Compra registrada en tienda"},
        {fecha:"2026-08-10", nota:"Compra registrada en tienda"},
        {fecha:"2026-08-22", nota:"Compra registrada en tienda"},
      ] },
  ],
};
