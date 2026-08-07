mi-spa-comunitaria/
├── index.html                   <-- HTML único (Layout Shell y punto de montaje)
│
├── css/
│   ├── main.css                 <-- Variables global CSS, reset, tipografía y utilidades  base
│   └── components.css           <-- Estilos de componentes (Navbar, Tarjetas, Tabs, Botones)
│
├── data/
│   └── events.json              <-- Base de datos estática ligera (JSON de eventos)
│
└── js/
    ├── app.js                   <-- Punto de entrada de la aplicación (Bootstrapping)
    ├── router.js                <-- Router por Hash (mapea URLs a vistas)
    │
    ├── store/
    │   ├── eventsStore.js       <-- Servicio/Gestor de eventos (fetch, filtro de expirados, orden)
    │   └── userStore.js         <-- Servicio/Gestor de usuarios (localStorage, Auth básica)
    │
    ├── components/              <-- Componentes de UI reutilizables
    │   ├── navbar.js            <-- Componente de navegación global
    │   └── eventCard.js         <-- Tarjeta de evento reutilizable (Inicio y Eventos)
    │
    └── views/                   <-- Páginas/Vistas principales de la SPA
        ├── homeView.js          <-- Vista 'Inicio' (Hero section + Próximos eventos)
        └── eventsView.js        <-- Vista 'Eventos' (Gestor de tabs: Próximos, Calendario, Todos)