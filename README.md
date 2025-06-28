# AdoptaEspaña - Plataforma de Adopción de Mascotas

Una moderna plataforma web para conectar refugios de animales con familias que buscan adoptar mascotas en España.

## 🚀 Características

- **Búsqueda Avanzada**: Filtros por especie, edad, tamaño y ubicación
- **Panel para Refugios**: Gestión completa de mascotas y perfil del refugio
- **Diseño Responsivo**: Optimizado para móviles, tablets y escritorio
- **Interfaz Intuitiva**: Experiencia de usuario moderna y accesible
- **Contacto Directo**: WhatsApp y email integrados para facilitar adopciones

## 🛠️ Tecnologías

- **Frontend**: React 18, Vite
- **Estilos**: TailwindCSS con sistema de diseño personalizado
- **Iconos**: Lucide React
- **Routing**: React Router v6
- **Estado**: React Hooks + Local Storage
- **Formularios**: React Hook Form
- **Animaciones**: CSS Animations + Framer Motion

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/adoptaespana.git
   cd adoptaespana
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Edita .env con tus configuraciones
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:4028
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de interfaz
│   ├── AppIcon.jsx     # Componente de iconos
│   ├── AppImage.jsx    # Componente de imágenes
│   └── ErrorBoundary.jsx
├── pages/              # Páginas de la aplicación
│   ├── public-pet-adoption-homepage/
│   ├── authentication-login-register/
│   ├── shelter-dashboard/
│   └── add-edit-pet-form/
├── hooks/              # Custom hooks
├── utils/              # Utilidades y helpers
├── styles/             # Estilos globales
└── Routes.jsx          # Configuración de rutas
```

## 🎨 Sistema de Diseño

### Colores Principales
- **Primary**: `#4A90A4` (Azul mediterráneo)
- **Secondary**: `#7BA05B` (Verde salvia)
- **Accent**: `#E8B86D` (Dorado cálido)

### Tipografía
- **Headings**: Nunito Sans
- **Body**: Inter
- **Monospace**: JetBrains Mono

## 🔐 Autenticación (Demo)

Para probar la funcionalidad de refugios:

- **Email**: `refugio@ejemplo.com`
- **Contraseña**: `refugio123`

## 📱 Funcionalidades

### Para Adoptantes
- Búsqueda y filtrado de mascotas
- Visualización de perfiles detallados
- Contacto directo con refugios
- Interfaz responsiva

### Para Refugios
- Panel de control completo
- Gestión de mascotas (crear, editar, eliminar)
- Subida de múltiples imágenes
- Estadísticas y actividad reciente
- Sistema de borradores

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Previsualización Local
```bash
npm run serve
```

### Variables de Entorno de Producción
Asegúrate de configurar:
- `VITE_APP_URL`: URL de producción
- `VITE_API_BASE_URL`: URL de tu API (cuando esté disponible)
- Analytics y tracking IDs

## 🔧 Configuración Adicional

### SEO
- Meta tags optimizados
- Open Graph y Twitter Cards
- Sitemap.xml incluido
- Structured data (JSON-LD)

### PWA
- Manifest.json configurado
- Service Worker ready
- Iconos para diferentes dispositivos

### Accesibilidad
- Navegación por teclado
- ARIA labels
- Contraste de colores optimizado
- Texto alternativo en imágenes

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Email**: info@adoptaespana.com
- **Teléfono**: +34 900 123 456
- **Website**: https://adoptaespana.com

## 🙏 Agradecimientos

- Imágenes de [Unsplash](https://unsplash.com)
- Iconos de [Lucide](https://lucide.dev)
- Inspiración de refugios reales de España

---

**Hecho con ❤️ para ayudar a las mascotas a encontrar un hogar**