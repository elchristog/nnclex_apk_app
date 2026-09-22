# Guía de Ejecución y Testing: RNN CLEX Mobile App

Este documento resume cómo ejecutar la aplicación en dispositivos móviles (Android/iOS) con la versión actual del proyecto (**Expo SDK 57**).

---

## 1. Comando Rápido (Recomendado para Móvil)

Para iniciar el servidor de desarrollo y generar el código QR con conexión por túnel a Expo Go:

```bash
npm run dev:tunnel
```
*(O de forma equivalente: `npx expo start --tunnel -c`)*

---

## 2. Pasos en tu Teléfono

1. **Abre la app Expo Go** en tu dispositivo Android o iPhone.
2. **Escanea el Código QR** que aparece en la terminal.
3. La aplicación se compilará e iniciará automáticamente en tu dispositivo.

---

## 3. Resoluciones a Problemas Frecuentes

### A. Incompatibilidad de versión de Expo Go
- **Causa**: La app Expo Go en la App Store / Play Store se actualiza automáticamente a la versión más reciente (ej. **SDK 57**). Si el `package.json` tiene una versión anterior (ej. SDK 51), la app rechaza la conexión.
- **Solución**: El proyecto ya está actualizado a **SDK 57**. Si en el futuro requieres sincronizar dependencias de Expo, ejecuta:
  ```bash
  npx expo install expo@latest -- --legacy-peer-deps
  npx expo install --fix -- --legacy-peer-deps
  ```

### B. Error `TypeError: Cannot read properties of undefined (reading 'body')` al hacer tunnel
- **Causa**: Ocurre si la variable de entorno `NODE_TLS_REJECT_UNAUTHORIZED` está en `0` en la consola local.
- **Solución**: Asegúrate de ejecutar `NODE_TLS_REJECT_UNAUTHORIZED=1` antes del comando o simplemente usa:
  ```bash
  npm run dev:tunnel
  ```

### C. Probar en Navegador Web
Si deseas previsualizar rápidamente componentes o pantallas en tu computadora:
```bash
npm run web
```
