# Prueba Técnica Frontend - Bettergy

Este repositorio contiene la solución a la prueba técnica para el puesto de Frontend Developer en Bettergy. La aplicación es un Dashboard de visualización de datos de consumo energético desarrollado con las últimas tecnologías web, enfocado en performance, mantenibilidad y experiencia de usuario.

## 🚀 Tecnologías

El proyecto ha sido construido utilizando un stack moderno y eficiente:

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5) - Utilizando "Runes" para un manejo del estado reactivo, simple y eficiente.
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) - Para un código robusto y tipado.
- **Estilos**: [TailwindCSS](https://tailwindcss.com/) - Para un diseño rápido, responsive y consistente.
- **Gráficos**: [Highcharts](https://www.highcharts.com/) - Librería potente para la visualización de datos de series temporales.
- **Testing**: [Vitest](https://vitest.dev/) - Framework de pruebas unitarias rápido y nativo de Vite.
- **Infraestructura**: [Docker](https://www.docker.com/) - Contenerización para garantizar que la aplicación corra igual en cualquier entorno.

## 🛠️ Instalación y Ejecución

Puedes ejecutar el proyecto de dos formas: usando Docker (recomendado) o en local.

### Opción 1: Docker (Recomendado)
Esta opción no requiere instalar Node.js ni dependencias en tu máquina local, ideal para revisión.

1.  **Clona el repositorio** y entra en la carpeta:
    ```bash
    cd prueba-bettergy
    ```
2.  **Configura las variables de entorno**:
    Crea un archivo `.env` basado en `.env.example`.
    ```bash
    cp .env.example .env
    ```
3.  **Construye y levanta el contenedor**:
    ```bash
    docker-compose up --build
    ```
4.  La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

### Opción 2: Desarrollo Local

1.  Instala las dependencias:
    ```bash
    bun install
    ```
2.  Ejecuta el servidor de desarrollo:
    ```bash
    bun run dev
    ```
3.  Abre el navegador en `http://localhost:5173`.

### 🧪 Ejecutando los Tests

Para verificar que todo funciona correctamente, puedes ejecutar los tests unitarios con Vitest:

```bash
bun run test
```

## ✨ Funcionalidades Implementadas

### Dashboard de Energía
El dashboard principal permite visualizar el consumo energético de un contador específico.

*   **Filtros Temporales Inteligentes**:
    *   Selección de rango personalizado (Inicio - Fin).
    *   Botones de acceso rápido: "Hoy", "Semana", "Mes".
    *   Validaciones automáticas (fechas futuras, rangos incoherentes).
*   **Visualización Gráfica**:
    *   Gráfico de línea interactivo con Highcharts.
    *   Visualización dual de consumo (Importación/Exportación).
    *   Tooltips detallados y Zoom habilitado.
*   **Gestión de Estado Reactiva**:
    *   Implementación de **Svelte 5 Runes** (`$state`, `$effect`) en `energyStore.svelte.ts`.
    *   Sincronización automática entre filtros y gráfica sin prop drilling excesivo.

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular. A continuación se detalla la estructura completa de archivos del entregable:

```
├── prueba-bettergy
│   ├── 📁 .svelte-kit
│   ├── 📁 src
│   │   ├── 📁 lib
│   │   │   ├── 📁 assets
│   │   │   │   └── 🖼️ favicon.svg
│   │   │   ├── 📁 components
│   │   │   │   ├── 📁 chart         # Componentes wrapper de Highcharts
│   │   │   │   │   └── 📄 Chart.svelte
│   │   │   │   └── 📁 dashboard     # Piezas del dashboard (Header, Filtros, Layout)
│   │   │   │       ├── 📄 ChartContainer.svelte
│   │   │   │       ├── 📄 DashboardHeader.svelte
│   │   │   │       ├── 📄 FilterForm.svelte
│   │   │   │       └── 📄 ValidationMessage.svelte
│   │   │   ├── 📁 stores            # Estado global reactivo
│   │   │   │   ├── 📄 energyStore.svelte.ts
│   │   │   │   └── 📄 energyStore.test.ts
│   │   │   ├── 📁 types             # Definiciones TypeScript
│   │   │   │   └── 📄 energy.ts
│   │   │   ├── 📄 api.ts            # Capa de servicio API
│   │   │   └── 📄 index.ts
│   │   ├── 📁 routes                # Páginas (SvelteKit File-based Routing)
│   │   │   ├── 📄 +layout.svelte
│   │   │   └── 📄 +page.svelte
│   │   ├── 🎨 app.css
│   │   ├── 📄 app.d.ts
│   │   └── 🌐 app.html
│   ├── 📁 static
│   │   ├── 🖼️ Logo-Bettergy-White.png
│   │   └── 📄 robots.txt
│   ├── ⚙️ .dockerignore
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── ⚙️ .npmrc
│   ├── 🐳 Dockerfile
│   ├── ⚙️ docker-compose.yml
│   ├── ⚙️ package.json
│   ├── 📄 svelte.config.js
│   ├── 📄 tailwind.config.js
│   ├── ⚙️ tsconfig.json
│   ├── 📄 vite.config.ts

```

## 📝 Notas de Diseño

1.  **Svelte 5**: Se decidió utilizar la última versión para poner en practica el conocimiento adquirido sobre las tendencias actuales y aprovechar la simplicidad de las "Runes" frente a los stores tradicionales.
2.  **Containerización**: El uso de Docker con `adapter-node` asegura que el entorno de evaluación sea idéntico al de desarrollo, eliminando problemas de "en mi máquina funciona".
3.  **Arquitectura**: Se separó la lógica de negocio (Store/API) de la UI para facilitar pruebas unitarias y mantenimiento futuro.
