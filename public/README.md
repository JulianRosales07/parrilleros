# 🍔 Parrilleros Fast Food - Sistema de Pedidos

## 📋 Descripción del Proyecto

Parrilleros Fast Food es una aplicación web de autoservicio para pedidos de hamburguesas artesanales y comida rápida. La aplicación permite a los usuarios realizar pedidos tanto para entrega a domicilio como para recogida en sede, con un sistema intuitivo de navegación y personalización de productos.

## 👥 Historias de Usuario

### **Épica 1: Exploración del Menú**

#### HU-001: Descubrir productos disponibles

**Como** cliente hambriento que visita por primera vez,  
**Quiero** explorar fácilmente el menú completo de hamburguesas y productos,  
**Para** conocer todas las opciones disponibles y tomar una decisión informada.

**Criterios de aceptación:**

- Puedo ver productos organizados por categorías claras
- Cada producto muestra imagen apetitosa, nombre, descripción y precio
- Puedo navegar entre categorías sin perder mi lugar
- La información se carga rápidamente en mi dispositivo móvil

#### HU-002: Encontrar mi hamburguesa ideal

**Como** cliente con preferencias específicas,  
**Quiero** buscar productos por nombre o ingredientes,  
**Para** encontrar rápidamente lo que se me antoja sin revisar todo el menú.

**Criterios de aceptación:**

- Puedo escribir en un buscador y ver resultados inmediatos
- Los resultados incluyen productos que coincidan con mi búsqueda
- Recibo un mensaje claro cuando no hay coincidencias
- Puedo limpiar la búsqueda y volver al menú completo

#### HU-003: Personalizar mi pedido

**Como** cliente con gustos particulares,  
**Quiero** personalizar mis hamburguesas agregando o quitando ingredientes,  
**Para** obtener exactamente lo que deseo comer.

**Criterios de aceptación:**

- Puedo agregar papas francesas o rústicas a mi hamburguesa
- Puedo añadir ingredientes extra como quesos adicionales o carnes
- Puedo escribir instrucciones especiales para el chef
- Veo el precio actualizado automáticamente con mis personalizaciones

### **Épica 2: Gestión del Pedido**

#### HU-004: Armar mi pedido gradualmente

**Como** cliente indeciso,  
**Quiero** agregar productos a un carrito mientras sigo explorando,  
**Para** construir mi pedido completo sin prisa y sin perder lo que ya elegí.

**Criterios de aceptación:**

- Puedo agregar productos al carrito desde cualquier página
- Veo un contador que me indica cuántos productos llevo
- Puedo modificar cantidades directamente desde el carrito
- El total se actualiza automáticamente con cada cambio

#### HU-005: Revisar antes de confirmar

**Como** cliente cuidadoso con mi dinero,  
**Quiero** ver un resumen detallado de mi pedido antes de enviarlo,  
**Para** asegurarme de que todo esté correcto y conocer el costo total.

**Criterios de aceptación:**

- Veo todos los productos con sus personalizaciones específicas
- El desglose incluye subtotal, impuestos (INC 8%) y total final
- Puedo editar o eliminar productos desde el resumen
- Las instrucciones especiales se muestran claramente

### **Épica 3: Selección de Ubicación**

#### HU-006: Elegir la sede más conveniente

**Como** cliente que conoce las diferentes sedes,  
**Quiero** seleccionar la sede de mi preferencia,  
**Para** hacer mi pedido en la ubicación que me resulte más cómoda.

**Criterios de aceptación:**

- Veo todas las sedes disponibles con sus direcciones
- Puedo ver información de contacto de cada sede
- La selección se mantiene mientras navego por la aplicación
- Puedo cambiar de sede en cualquier momento antes de confirmar

#### HU-007: Acceso directo por ubicación

**Como** cliente que recibe un enlace específico,  
**Quiero** que la aplicación detecte automáticamente la sede desde la URL,  
**Para** no tener que seleccionar manualmente la ubicación.

**Criterios de aceptación:**

- Al abrir un enlace con parámetro de sede, esta se selecciona automáticamente
- Puedo cambiar la sede si lo deseo
- Los productos mostrados corresponden a la sede seleccionada

### **Épica 4: Modalidades de Entrega**

#### HU-008: Recibir mi pedido en casa

**Como** cliente que prefiere comodidad,  
**Quiero** solicitar entrega a domicilio,  
**Para** disfrutar mi comida sin salir de casa.

**Criterios de aceptación:**

- Puedo ingresar mi dirección completa y datos de contacto
- Selecciono mi método de pago preferido (efectivo, Bancolombia, Nequi)
- Recibo un número de pedido para hacer seguimiento
- El pedido se envía automáticamente por WhatsApp a la sede

#### HU-009: Recoger en sede para ahorrar

**Como** cliente que quiere evitar costo de domicilio,  
**Quiero** recoger mi pedido directamente en la sede,  
**Para** ahorrar dinero y obtener mi comida más rápido.

**Criterios de aceptación:**

- Puedo seleccionar la sede donde quiero recoger
- Solo necesito proporcionar datos básicos de contacto
- Recibo un código de recogida único
- Obtengo confirmación por WhatsApp con los detalles

### **Épica 5: Facturación y Pagos**

#### HU-010: Obtener factura para mi empresa

**Como** cliente empresarial,  
**Quiero** solicitar factura con mis datos tributarios,  
**Para** poder deducir el gasto o presentar comprobantes contables.

**Criterios de aceptación:**

- Puedo marcar la opción de facturación durante el pedido
- Ingreso mi cédula y email para recibir la factura
- La factura se genera en formato PDF profesional
- Puedo descargar e imprimir la factura inmediatamente

### **Épica 6: Comunicación y Seguimiento**

#### HU-011: Confirmar mi pedido fácilmente

**Como** cliente que completa su pedido,  
**Quiero** que el sistema envíe automáticamente mi orden por WhatsApp,  
**Para** confirmar rápidamente sin tener que escribir todo manualmente.

**Criterios de aceptación:**

- El mensaje incluye todos los detalles de mi pedido
- Se abre WhatsApp automáticamente con el mensaje pre-escrito
- Puedo revisar y modificar el mensaje antes de enviarlo
- El mensaje llega al WhatsApp correcto de la sede seleccionada

### **Épica 7: Experiencia de Usuario**

#### HU-012: Aprender a usar la aplicación

**Como** cliente nuevo en la plataforma,  
**Quiero** recibir orientación sobre cómo hacer mi pedido,  
**Para** completar mi orden sin confusiones ni errores.

**Criterios de aceptación:**

- Se me ofrece un tour guiado en mi primera visita
- Puedo activar ayuda contextual cuando la necesite
- Los tours son específicos para cada sección de la aplicación
- Puedo saltar o repetir el tour según mi preferencia

#### HU-013: Usar desde cualquier dispositivo

**Como** cliente moderno,  
**Quiero** hacer pedidos desde mi celular, tablet o computadora,  
**Para** tener flexibilidad total sin importar dónde esté.

**Criterios de aceptación:**

- La aplicación funciona perfectamente en mi dispositivo móvil
- Todas las funciones están disponibles en pantallas pequeñas
- La navegación es intuitiva con gestos táctiles
- Los botones son suficientemente grandes para tocar fácilmente

## 🎯 Requerimientos Funcionales

### 1. **Gestión de Menú y Productos**

#### RF-001: Visualización de Menú

- **Como** cliente, **quiero** ver el menú completo de productos **para** poder elegir lo que deseo ordenar
- **Criterios de aceptación:**
  - El sistema DEBE mostrar productos organizados por categorías (Hamburguesas Clásicas, Deluxe, Burger Master, Perros Calientes, Papas, Acompañamientos, Bebidas)
  - El sistema DEBE mostrar imagen, nombre, descripción y precio de cada producto
  - El sistema DEBE permitir filtrar productos por categoría
  - El sistema DEBE mostrar subcategorías para bebidas (gaseosas, limonadas, jugos naturales, malteadas, cervezas)

#### RF-002: Búsqueda de Productos

- **Como** cliente, **quiero** buscar productos específicos **para** encontrar rápidamente lo que deseo
- **Criterios de aceptación:**
  - El sistema DEBE permitir búsqueda por nombre de producto
  - El sistema DEBE permitir búsqueda por descripción
  - El sistema DEBE mostrar resultados en tiempo real
  - El sistema DEBE mostrar mensaje cuando no hay resultados

#### RF-003: Personalización de Productos

- **Como** cliente, **quiero** personalizar mis productos **para** adaptarlos a mis preferencias
- **Criterios de aceptación:**
  - El sistema DEBE permitir agregar papas francesas o rústicas a hamburguesas
  - El sistema DEBE permitir agregar ingredientes adicionales (quesos, carnes, vegetales)
  - El sistema DEBE permitir agregar instrucciones especiales
  - El sistema DEBE calcular automáticamente el precio con personalizaciones

### 2. **Gestión de Carrito de Compras**

#### RF-004: Administración del Carrito

- **Como** cliente, **quiero** gestionar mi carrito de compras **para** controlar mi pedido antes de enviarlo
- **Criterios de aceptación:**
  - El sistema DEBE permitir agregar productos al carrito
  - El sistema DEBE permitir modificar cantidades de productos
  - El sistema DEBE permitir eliminar productos del carrito
  - El sistema DEBE mostrar el total actualizado en tiempo real
  - El sistema DEBE mostrar contador de productos en el botón flotante del carrito

#### RF-005: Resumen de Pedido

- **Como** cliente, **quiero** ver un resumen detallado de mi pedido **para** verificar antes de enviarlo
- **Criterios de aceptación:**
  - El sistema DEBE mostrar todos los productos con sus personalizaciones
  - El sistema DEBE mostrar subtotal, impuestos (INC 8%) y total
  - El sistema DEBE mostrar instrucciones especiales por producto
  - El sistema DEBE permitir editar el pedido desde el resumen

### 3. **Gestión de Sedes y Ubicaciones**

#### RF-006: Selección de Sede

- **Como** cliente, **quiero** seleccionar la sede de mi preferencia **para** realizar mi pedido
- **Criterios de aceptación:**
  - El sistema DEBE mostrar todas las sedes disponibles (Tamasagra, San Ignacio, Las Cuadras)
  - El sistema DEBE mostrar información de cada sede (dirección, teléfono, WhatsApp)
  - El sistema DEBE permitir selección manual de sede
  - El sistema DEBE detectar automáticamente sede desde URL con parámetro `?sedes=`

#### RF-007: Validación de Productos por Sede

- **Como** cliente, **quiero** que el sistema valide la disponibilidad de productos **para** evitar pedidos incorrectos
- **Criterios de aceptación:**
  - El sistema DEBE validar que todos los productos del carrito estén disponibles en la sede seleccionada
  - El sistema DEBE mostrar alerta si hay productos no disponibles
  - El sistema DEBE sugerir sede alternativa para productos exclusivos
  - El sistema DEBE bloquear el envío del pedido si hay incompatibilidades

### 4. **Modalidades de Entrega**

#### RF-008: Pedido a Domicilio

- **Como** cliente, **quiero** solicitar entrega a domicilio **para** recibir mi pedido en casa
- **Criterios de aceptación:**
  - El sistema DEBE solicitar datos completos del cliente (nombre, teléfono, dirección, barrio)
  - El sistema DEBE permitir seleccionar método de pago (efectivo, Bancolombia, Nequi)
  - El sistema DEBE permitir solicitar factura con datos tributarios
  - El sistema DEBE generar número de pedido único
  - El sistema DEBE enviar pedido por WhatsApp a la sede correspondiente

#### RF-009: Recogida en Sede

- **Como** cliente, **quiero** recoger mi pedido en sede **para** evitar costos de domicilio
- **Criterios de aceptación:**
  - El sistema DEBE permitir seleccionar sede para recogida
  - El sistema DEBE solicitar datos básicos del cliente
  - El sistema DEBE generar código de recogida
  - El sistema DEBE enviar confirmación por WhatsApp

### 5. **Sistema de Facturación**

#### RF-010: Generación de Facturas

- **Como** cliente, **quiero** obtener factura de mi pedido **para** mis registros contables
- **Criterios de aceptación:**
  - El sistema DEBE permitir solicitar factura opcional
  - El sistema DEBE solicitar cédula y email para facturación
  - El sistema DEBE generar PDF con formato profesional
  - El sistema DEBE incluir desglose de impuestos (INC 8%)
  - El sistema DEBE permitir descargar e imprimir factura

### 6. **Sistema de Comunicación**

#### RF-011: Integración con WhatsApp

- **Como** negocio, **quiero** recibir pedidos por WhatsApp **para** procesarlos eficientemente
- **Criterios de aceptación:**
  - El sistema DEBE generar mensaje estructurado con todos los datos del pedido
  - El sistema DEBE enviar a WhatsApp de la sede correspondiente
  - El sistema DEBE incluir número de pedido, productos, totales y datos del cliente
  - El sistema DEBE abrir WhatsApp automáticamente tras confirmar pedido

### 7. **Sistema de Navegación y UX**

#### RF-012: Tours Guiados

- **Como** cliente nuevo, **quiero** recibir orientación sobre cómo usar la aplicación **para** realizar pedidos fácilmente
- **Criterios de aceptación:**
  - El sistema DEBE ofrecer tour guiado en primera visita
  - El sistema DEBE mostrar tours específicos por página (bienvenida, menú, formularios)
  - El sistema DEBE permitir activar tour manualmente
  - El sistema DEBE recordar si el usuario ya vio el tour

#### RF-013: Navegación Responsiva

- **Como** cliente, **quiero** usar la aplicación en cualquier dispositivo **para** hacer pedidos desde donde esté
- **Criterios de aceptación:**
  - El sistema DEBE funcionar correctamente en móviles, tablets y desktop
  - El sistema DEBE mantener funcionalidad completa en todos los tamaños de pantalla
  - El sistema DEBE adaptar la interfaz según el dispositivo

## 🔧 Requerimientos No Funcionales

### 1. **Rendimiento**

#### RNF-001: Tiempo de Respuesta

- La aplicación DEBE cargar la página principal en menos de 3 segundos
- Las transiciones entre páginas DEBEN completarse en menos de 1 segundo
- La búsqueda de productos DEBE mostrar resultados en menos de 500ms

#### RNF-002: Optimización de Recursos

- Las imágenes DEBEN estar optimizadas para web (WebP cuando sea posible)
- El bundle de JavaScript DEBE ser menor a 2MB
- La aplicación DEBE implementar lazy loading para imágenes

### 2. **Usabilidad**

#### RNF-003: Experiencia de Usuario

- La interfaz DEBE ser intuitiva para usuarios sin experiencia técnica
- Los botones y elementos interactivos DEBEN tener un tamaño mínimo de 44px
- La aplicación DEBE proporcionar feedback visual para todas las acciones del usuario
- Los formularios DEBEN mostrar validación en tiempo real

#### RNF-004: Accesibilidad

- La aplicación DEBE cumplir con estándares WCAG 2.1 nivel AA
- Todos los elementos interactivos DEBEN ser navegables por teclado
- Las imágenes DEBEN tener texto alternativo descriptivo
- Los contrastes de color DEBEN cumplir con ratios mínimos de accesibilidad

### 3. **Compatibilidad**

#### RNF-005: Navegadores Soportados

- La aplicación DEBE funcionar en Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- La aplicación DEBE mantener funcionalidad básica en navegadores más antiguos
- La aplicación DEBE detectar y manejar navegadores no compatibles

#### RNF-006: Dispositivos Móviles

- La aplicación DEBE funcionar en iOS 12+ y Android 8+
- La aplicación DEBE adaptarse a pantallas desde 320px hasta 2560px de ancho
- La aplicación DEBE funcionar sin conexión para funciones básicas (PWA)

### 4. **Seguridad**

#### RNF-007: Protección de Datos

- Los datos del cliente DEBEN transmitirse únicamente por HTTPS
- La aplicación NO DEBE almacenar información sensible en localStorage
- Los formularios DEBEN implementar validación tanto en cliente como servidor
- La aplicación DEBE sanitizar todas las entradas del usuario

#### RNF-008: Privacidad

- La aplicación DEBE cumplir con regulaciones de protección de datos
- Los datos del cliente DEBEN usarse únicamente para procesar pedidos
- La aplicación DEBE solicitar consentimiento para procesamiento de datos

### 5. **Mantenibilidad**

#### RNF-009: Código y Arquitectura

- El código DEBE seguir estándares de TypeScript y React
- La aplicación DEBE tener cobertura de pruebas mínima del 70%
- El código DEBE estar documentado con comentarios descriptivos
- La arquitectura DEBE permitir fácil adición de nuevas sedes y productos

#### RNF-010: Configuración

- Los datos de sedes DEBEN ser configurables sin cambios de código
- Los precios y productos DEBEN ser actualizables dinámicamente
- La aplicación DEBE soportar múltiples ambientes (desarrollo, staging, producción)

### 6. **Escalabilidad**

#### RNF-011: Capacidad

- La aplicación DEBE soportar hasta 1000 usuarios concurrentes
- El sistema DEBE manejar hasta 500 pedidos por hora
- La base de datos DEBE soportar crecimiento de productos y sedes

#### RNF-012: Disponibilidad

- La aplicación DEBE tener un uptime mínimo del 99.5%
- El sistema DEBE recuperarse automáticamente de errores menores
- La aplicación DEBE mostrar mensajes informativos durante mantenimiento

### 7. **Integración**

#### RNF-013: APIs Externas

- La integración con WhatsApp DEBE manejar errores de conectividad
- La aplicación DEBE funcionar sin dependencias externas críticas
- Las integraciones DEBEN tener timeouts configurables

#### RNF-014: Monitoreo

- La aplicación DEBE registrar errores y eventos importantes
- El sistema DEBE enviar alertas para errores críticos
- La aplicación DEBE proporcionar métricas de uso y rendimiento

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18.3.1** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router DOM** - Navegación
- **GSAP** - Animaciones
- **Leaflet** - Mapas interactivos

### Librerías Adicionales

- **Lucide React** - Iconografía
- **Driver.js** - Tours guiados
- **jsPDF** - Generación de PDFs
- **QRCode** - Generación de códigos QR
- **UUID** - Generación de identificadores únicos

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 🚀 Instalación y Configuración

```bash
# Clonar el repositorio
git clone [repository-url]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 URLs de Ejemplo

### Sedes Específicas

```
https://parrilleros.vercel.app/?sedes=tamasagra
https://parrilleros.vercel.app/?sedes=san%20ignacio
https://parrilleros.vercel.app/?sedes=las%20cuadras
```

### Modalidades de Pedido

```
https://parrilleros.vercel.app/delivery-form?sedes=tamasagra
https://parrilleros.vercel.app/pickup-form?sedes=san%20ignacio
```

## 📞 Información de Contacto

### Sede Tamasagra

- **Dirección:** [Dirección específica]
- **Teléfono:** [Número de teléfono]
- **WhatsApp:** [Número de WhatsApp]

### Sede San Ignacio

- **Dirección:** [Dirección específica]
- **Teléfono:** [Número de teléfono]
- **WhatsApp:** [Número de WhatsApp]

### Sede Las Cuadras

- **Dirección:** [Dirección específica]
- **Teléfono:** [Número de teléfono]
- **WhatsApp:** [Número de WhatsApp]

## 📄 Licencia

Este proyecto es propiedad de Parrilleros Fast Food. Todos los derechos reservados.

---

_Desarrollado con ❤️ para ofrecer la mejor experiencia de pedidos de hamburguesas artesanales_
