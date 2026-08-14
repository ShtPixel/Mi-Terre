# Mi Terre

Mi Terre es una aplicación web estática tipo SPA para consultar eventos, noticias y favoritos de una comunidad. La navegación se maneja con rutas hash, los datos se cargan desde archivos JSON locales y la interfaz se construye con JavaScript modular, CSS propio y Bootstrap desde CDN.

## Funcionalidades

- Inicio con banner de eventos recientes y noticias recientes.
- Vista de eventos con listado completo, filtros y calendario.
- Vista de noticias con banner y listado completo.
- Sistema de favoritos guardado en `localStorage`.
- Modal de detalle para eventos y noticias.
- Botones reutilizables para favoritos, compartir y Google Calendar.
- Mapa interactivo con Leaflet cuando los datos incluyen coordenadas.
- Diseño responsive para escritorio y dispositivos moviles.

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript ES Modules
- Bootstrap 5.3.3 por CDN
- Leaflet 1.9.4 por CDN
- JSON como fuente de datos estatica
- `localStorage` para persistir favoritos

## Como ejecutar el proyecto

Este proyecto usa modulos JavaScript y `fetch()` para cargar archivos JSON, por eso debe abrirse desde un servidor local y no directamente con doble clic sobre `index.html`.

Desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Luego abre en el navegador:

```text
http://127.0.0.1:8000/
```

Si el puerto `8000` esta ocupado, puedes usar otro:

```bash
python -m http.server 8080
```

## Rutas disponibles

La app usa rutas hash:

```text
#/            Inicio
#/eventos     Eventos
#/noticias    Noticias
#/favoritos   Favoritos
#/acerca-de   Acerca de
```

## Estructura del proyecto

```text
MiTerre0.2/
├── index.html
├── README.md
├── assets/
│   └── icons/
├── css/
│   ├── main.css
│   ├── components.css
│   └── newsBanner.css
├── data/
│   ├── events.json
│   └── news.json
└── js/
    ├── app.js
    ├── router.js
    ├── components/
    │   ├── calendarWidget.js
    │   ├── eventCard.js
    │   ├── filterView.js
    │   ├── navbar.js
    │   ├── proximosBanner.js
    │   ├── global/
    │   └── noticias/
    ├── store/
    │   ├── eventsStore.js
    │   ├── newsStore.js
    │   └── favorites/
    └── views/
        ├── aboutView.js
        ├── eventsView.js
        ├── favoritesView.js
        ├── homeView.js
        └── newsView.js
```

## Datos

Los eventos se editan en:

```text
data/events.json
```

Las noticias se editan en:

```text
data/news.json
```

Formato recomendado para eventos:

```json
{
  "id": "evt-101",
  "titulo": "Nombre del evento",
  "descripcion": "Descripcion del evento",
  "fecha": "2026-08-15T18:00:00",
  "lugar": "Lugar del evento",
  "categoria": "Categoria",
  "imagen": "https://example.com/imagen.jpg",
  "lat": 1.126685,
  "lng": -77.853676
}
```

Formato recomendado para noticias:

```json
{
  "id": "nw-001",
  "titulo": "Titulo de la noticia",
  "categoria": "Categoria",
  "fecha": "2026-10-15T18:00:00",
  "descripcion": "Descripcion de la noticia",
  "lugar": "Lugar relacionado",
  "imagen": "https://example.com/imagen.jpg"
}
```

Notas sobre los datos:

- El campo `id` debe ser unico.
- El campo `fecha` debe usar formato ISO compatible con `Date`.
- Los eventos y noticias con fecha pasada se filtran automaticamente.
- `lat` y `lng` son opcionales, pero necesarios para mostrar ubicacion en el mapa.

## Archivos principales

- `index.html`: estructura base, enlaces CSS/CDN y punto de montaje de la SPA.
- `js/app.js`: inicializa navbar, stores y router.
- `js/router.js`: resuelve las rutas hash y monta cada vista.
- `js/store/eventsStore.js`: carga, filtra y ordena eventos.
- `js/store/newsStore.js`: carga, filtra y ordena noticias.
- `js/store/favorites/favoritesStore.js`: guarda y consulta favoritos en `localStorage`.
- `css/main.css`: variables globales, reset y layout base.
- `css/components.css`: estilos principales de navbar, cards, banners, calendario, filtros, modal y botones.
- `css/newsBanner.css`: estilos especificos relacionados con cards de noticias.

## Consideraciones de desarrollo

- Mantener los componentes reutilizables dentro de `js/components/`.
- Mantener las vistas de pagina dentro de `js/views/`.
- Evitar editar datos directamente en los componentes; usar los stores de `js/store/`.
- Probar cambios responsive en escritorio y movil.
- Al modificar banners o cards, revisar que no se afecten las grillas de listados completos.
