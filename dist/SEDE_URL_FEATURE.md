# Funcionalidad de Detección de Sede por URL

## Descripción

Esta funcionalidad permite detectar automáticamente la sede desde la URL y pre-seleccionarla para el usuario, facilitando el proceso de pedido.

## Cómo funciona

### 1. Detección desde URL

El sistema detecta el parámetro `sedes` en la URL:

- `?sedes=tamasagra` → Sede Tamasagra
- `?sedes=san%20ignacio` → Sede San Ignacio
- `?sedes=las%20cuadras` → Sede Las Cuadras

### 2. URLs de ejemplo que funcionan:

```
https://parrilleros.vercel.app/?sedes=tamasagra
https://parrilleros.vercel.app/?sedes=san%20ignacio
https://parrilleros.vercel.app/?sedes=las%20cuadras
```

### 3. Comportamiento del sistema:

#### Sede válida detectada:

- ✅ Muestra banner verde con mensaje de confirmación
- ✅ Cambia el título de la página a "Realiza tu pedido en la sede: [Nombre]"
- ✅ Pre-selecciona automáticamente la sede en el formulario de entrega
- ✅ Muestra información especial en el formulario indicando que fue detectada desde enlace

#### Sede no válida:

- ⚠️ Muestra banner amarillo con mensaje de error
- ⚠️ Proporciona ejemplos de URLs válidas
- ⚠️ Permite al usuario continuar y seleccionar sede manualmente

#### Sin parámetro de sede:

- 📱 Funciona normalmente, usuario selecciona sede manualmente

## Componentes implementados:

### 1. `useSedeFromURL` (Hook)

- Detecta y valida el parámetro de sede desde la URL
- Retorna información formateada de la sede

### 2. `SedeBanner` (Componente)

- Muestra banner informativo en la página del menú
- Diferentes estilos para sede válida/inválida

### 3. Modificaciones en `DeliveryForm`

- Pre-selecciona la sede detectada
- Muestra información especial cuando viene de URL
- Salta automáticamente la selección de sede

### 4. Modificaciones en `Layout`

- Cambia el título dinámicamente según la sede detectada

## Validación de productos por sede

El sistema también valida que los productos en el carrito estén disponibles en la sede seleccionada:

- ❌ Bloquea el pedido si hay productos no disponibles
- 🔄 Sugiere cambiar a la sede correcta (especialmente Tamasagra para productos exclusivos)
- 💡 Muestra mensajes informativos sobre disponibilidad

## Casos de uso:

1. **Enlaces de WhatsApp**: Cada sede puede compartir su enlace específico
2. **Códigos QR**: Cada sede puede tener su QR con la URL correspondiente
3. **Marketing dirigido**: Campañas específicas por sede
4. **Experiencia mejorada**: Menos clics para el usuario
