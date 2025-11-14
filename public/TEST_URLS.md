# 🧪 URLs de Prueba para Funcionalidad de Sede

## URLs para probar:

### ✅ Sedes válidas:

1. **Sede Tamasagra:**

   ```
   http://localhost:5174/?sedes=tamasagra
   ```

2. **Sede San Ignacio:**

   ```
   http://localhost:5174/?sedes=san%20ignacio
   ```

3. **Sede Las Cuadras:**
   ```
   http://localhost:5174/?sedes=las%20cuadras
   ```

### ⚠️ Sede inválida (para probar manejo de errores):

```
http://localhost:5174/?sedes=invalida
```

### 📱 Sin parámetro (comportamiento normal):

```
http://localhost:5174/
```

## 🔍 Qué deberías ver:

### Con sede válida:

- ✅ Banner verde con mensaje "Realiza tu pedido en la sede: [Nombre]"
- ✅ Título de la página cambia a incluir la sede
- ✅ En el formulario de entrega, la sede se pre-selecciona automáticamente

### Con sede inválida:

- ⚠️ Banner amarillo con mensaje de error
- ⚠️ Ejemplos de URLs correctas
- ⚠️ Usuario puede continuar y seleccionar sede manualmente

### Sin parámetro:

- 📱 No se muestra banner
- 📱 Funcionalidad normal del sitio

## 🛠️ Debug:

- Abre las herramientas de desarrollador (F12)
- Ve a la consola para ver los logs de debug
- El componente URLDebugger muestra información de la URL actual

## 📝 Notas:

- Los espacios en las URLs se codifican como `%20`
- El sistema maneja tanto espacios normales como codificados
- La validación es case-insensitive (no importan mayúsculas/minúsculas)
