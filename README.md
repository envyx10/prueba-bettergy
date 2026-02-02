# Prueba Técnica Bettergy

Dashboard de visualización de consumo energético desarrollado con SvelteKit 5.

## 🚀 Requisitos Previos

- **Bun** >= 1.3.8 (gestor de paquetes y runtime JavaScript)
- **Node.js** >= 18 (alternativa a Bun si prefieres usar npm/pnpm)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd prueba-bettergy
```

2. Instala las dependencias:
```bash
bun install
```

## ⚙️ Configuración

1. Copia el archivo de variables de entorno de ejemplo:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` y configura las variables necesarias:
```env
# URL de la API de Bettergy para obtener datos del contador
PUBLIC_API_URL=https://tu-api-url.com/v2/datalog/

# ID del contador (meter) del que se quieren obtener los datos
PUBLIC_METER_ID=tu-meter-id
```

## 🏃‍♂️ Ejecución

### Modo desarrollo
```bash
bun dev
```

La aplicación estará disponible en `http://localhost:5173`

### Modo producción
```bash
bun run build
bun run preview
```

## 🛠️ Stack Tecnológico

- **SvelteKit 5** - Framework web
- **TypeScript** - Tipado estático
- **Tailwind CSS 3** - Estilos
- **Bun** - Runtime y gestor de paquetes

## 🚧 Estado Actual

✅ Integración con API de Bettergy  
✅ Gestión de estado con stores reactivos  
✅ Configuración de estilos con Tailwind CSS  
🔄 Dashboard visual (en desarrollo)  
🔄 Gráficos interactivos (en desarrollo)

