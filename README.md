# MoviMarket

Pequeña y sencilla SPA en React para listar y ver detalles de dispositivos móviles, con búsqueda, caché cliente y carrito persistente.

## Características
- **Listado**: muestra hasta 4 ítems por fila, filtrado en tiempo real por marca/modelo.  
- **Detalle**: dos columnas (imagen + especificaciones y acciones) y breadcrumbs.  
- **Carrito**: añade productos vía API, contador persistente en `localStorage` y actualizado en el header.  
- **Caché**: resultados de API almacenados en `localStorage` con TTL configurable (por defecto 1 h).

## Tech Stack
- Node 18.13.0
- npm 9.3.0
- React 18 + Vite  
- React Router v7  
- Axios para llamadas HTTP  
- ESLint + Prettier  
- Vite + Testing Library  

## Instalación

```bash
git clone <repo-url>
npm install
npm run start   # desarrollo en http://localhost:3000

Scripts
npm run start – servidor de desarrollo

npm run build – compilación para producción

npm run test – tests en watch mode

npm run lint – chequeo de estilo (ESLint)
