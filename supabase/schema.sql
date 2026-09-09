-- ============================================================
-- HELADOS DE PALITO — Esquema Supabase (Postgres)
-- Refleja exactamente la forma de datos que usa assets/js/data.js
-- Ejecuta este archivo completo en Supabase → SQL Editor.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- CATEGORÍAS ----------
create table if not exists categorias (
  id text primary key,
  nombre text not null,
  orden int not null default 0,
  icono text default 'popsicle',
  activo boolean not null default true
);

-- ---------- PRODUCTOS ----------
create table if not exists productos (
  id text primary key default ('prod-' || substr(gen_random_uuid()::text,1,8)),
  categoria text references categorias(id) on delete set null,
  nombre text not null,
  descripcion text,
  precio numeric(10,0) not null default 0,
  imagen text,
  disponible boolean not null default true,
  destacado boolean not null default false,
  orden int default 0
);

-- ---------- CLIENTES / TARJETA DE FIDELIZACIÓN ----------
-- Nota: por simplicidad los sellos viven en la propia fila del
-- cliente (sellos int) en vez de una tabla aparte tarjetas_fidelizacion;
-- el detalle sello-a-sello queda en historial_sellos.
create table if not exists clientes (
  id text primary key default ('cli-' || substr(gen_random_uuid()::text,1,8)),
  nombre text not null,
  telefono text not null unique,
  password text not null, -- código simple de acceso; ver README para pasar a Supabase Auth real
  sellos int not null default 0,
  activo boolean not null default true,
  fecha date not null default current_date
);

create table if not exists historial_sellos (
  id bigint generated always as identity primary key,
  cliente_id text references clientes(id) on delete cascade,
  fecha timestamptz not null default now(),
  nota text
);

-- ---------- RECOMPENSA ----------
create table if not exists recompensas (
  id bigint generated always as identity primary key,
  nombre text not null default 'Por definir',
  descripcion text,
  activo boolean not null default true
);

-- ---------- PEDIDOS ----------
create table if not exists pedidos (
  id text primary key default ('ped-' || substr(gen_random_uuid()::text,1,8)),
  folio text not null unique,
  items jsonb not null,
  subtotal numeric(10,0) not null default 0,
  notas text,
  tipo_entrega text,
  metodo_pago text,
  cliente_nombre text,
  cliente_telefono text,
  estado text not null default 'pendiente',
  fecha timestamptz not null default now()
);

-- ---------- ADMINS ----------
-- En modo demo la contraseña de admin vive en config.js (DEMO_ADMIN_PASSWORD).
-- Para producción real, usa Supabase Auth (auth.users) y esta tabla solo
-- para marcar qué usuarios de auth.users son administradores.
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nombre text
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Lectura pública del catálogo (categorías/productos/recompensa
-- activa), pero escritura solo para administradores autenticados.
-- Clientes y pedidos: lectura/escritura solo vía RPC/admin en este
-- esquema simple (ajusta según tu capa de autenticación real).
-- ============================================================

alter table categorias enable row level security;
alter table productos enable row level security;
alter table clientes enable row level security;
alter table historial_sellos enable row level security;
alter table recompensas enable row level security;
alter table pedidos enable row level security;
alter table admins enable row level security;

-- Catálogo: lectura pública
create policy "categorias_lectura_publica" on categorias for select using (true);
create policy "productos_lectura_publica" on productos for select using (true);
create policy "recompensa_lectura_publica" on recompensas for select using (activo = true);

-- Catálogo: escritura solo admins
create policy "categorias_admin_escribe" on categorias for all
  using (exists (select 1 from admins where user_id = auth.uid()))
  with check (exists (select 1 from admins where user_id = auth.uid()));
create policy "productos_admin_escribe" on productos for all
  using (exists (select 1 from admins where user_id = auth.uid()))
  with check (exists (select 1 from admins where user_id = auth.uid()));
create policy "recompensa_admin_escribe" on recompensas for all
  using (exists (select 1 from admins where user_id = auth.uid()))
  with check (exists (select 1 from admins where user_id = auth.uid()));

-- Pedidos: cualquiera puede crear uno (checkout público), solo admin lee/edita
create policy "pedidos_insert_publico" on pedidos for insert with check (true);
create policy "pedidos_admin_lee_edita" on pedidos for select
  using (exists (select 1 from admins where user_id = auth.uid()));
create policy "pedidos_admin_actualiza" on pedidos for update
  using (exists (select 1 from admins where user_id = auth.uid()));

-- Clientes / historial: solo admin (el cliente consulta su propia
-- tarjeta a través de una función segura o de tu backend, nunca
-- con acceso directo de escritura)
create policy "clientes_admin_todo" on clientes for all
  using (exists (select 1 from admins where user_id = auth.uid()))
  with check (exists (select 1 from admins where user_id = auth.uid()));
create policy "historial_admin_todo" on historial_sellos for all
  using (exists (select 1 from admins where user_id = auth.uid()))
  with check (exists (select 1 from admins where user_id = auth.uid()));
create policy "admins_solo_admin" on admins for all
  using (exists (select 1 from admins a2 where a2.user_id = auth.uid()));

-- ============================================================
-- SEED inicial de categorías y recompensa (los productos se
-- cargan mejor desde el panel /admin/productos.html una vez
-- publicado, o adaptando assets/js/seed.js a un INSERT masivo).
-- ============================================================
insert into categorias (id, nombre, orden, icono) values
  ('helados','Helados',1,'popsicle'),
  ('paletas','Paletas',2,'popsicle'),
  ('comer','Para comer',3,'empanada'),
  ('pal_calor','Para el calor',4,'drink'),
  ('frappe','Frappés',5,'frappe'),
  ('pal_frio','Para el frío',6,'coffee'),
  ('endulzar','Para endulzar',7,'cake'),
  ('malteadas','Malteadas',8,'shake')
on conflict (id) do nothing;

insert into recompensas (nombre, descripcion, activo) values
  ('Por definir', 'Se entrega al completar 8 sellos.', true)
on conflict do nothing;
