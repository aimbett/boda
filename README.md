# Ale & Pri 🐾💍 — Invitación Digital

**Una invitación de boda digital elegante, personalizada y completamente gratuita, construida con GitHub Pages y Google Drive.**

![Preview](https://img.shields.io/badge/Status-Listo%20para%20Deployment-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Stack](https://img.shields.io/badge/Stack-GitHub%20Pages%20%2B%20Google%20Drive-informational)

---

## 🎯 ¿Qué es?

Una página de invitación de boda moderna que:

✅ **Personaliza invitaciones** para cada grupo de invitados  
✅ **Recopila RSVPs** con restricciones dietarias  
✅ **Almacena respuestas** en Google Sheets (no requiere base de datos)  
✅ **Maneja todo gratis** con GitHub Pages + Google Drive  
✅ **Funciona desde móvil, tablet, desktop** (totalmente responsive)  
✅ **Permite personalización de colores** a través de panel admin  

---

## 🚀 Quick Start (5 minutos)

### Paso 1: Preparación

- Necesitas: GitHub account + Google account (ambos gratis)
- Clona o haz fork de este repo

### Paso 2: Google Sheets + Apps Script

1. Crea una Google Sheet nueva
2. Añade columnas: `id, nombre, asiste, dieta, grupo, timestamp, mensaje`
3. Crea un Google Apps Script que procese las respuestas
4. Despliega el Apps Script como "web app"
5. Copia la URL del Apps Script

**→ Guía completa en `docs/GOOGLE_DRIVE_SETUP.md`**

### Paso 3: Configuración del Código

Edita `index.html`:
- **Línea 491**: Reemplaza `SHEET_URL` con tu URL de Apps Script
- **Línea 490**: Genera nuevo `PASS_HASH` para admin (ver `docs/SECURITY.md`)
- **Línea 492**: Cambia `SECRET` a un valor único

### Paso 4: GitHub Pages

1. Sube a GitHub
2. Ve a Settings → Pages
3. Habilita GitHub Pages en `main` branch
4. Espera 30 segundos
5. Tu sitio está en vivo: `https://tuusuario.github.io/boda/`

**→ Guía detallada en `docs/DEPLOYMENT.md`**

### Paso 5: Añade Invitados

Edita `invitados.js`:

```javascript
{
  grupo: "Familia-Garcia",
  personas: ["María García", "Carlos García"],
  mesa: "Familia"
}
```

Luego, abre la consola del navegador (F12) y ejecuta:
```javascript
generarLinks()
```

Copia los URLs y envía a tus invitados.

---

## 📚 Documentación Completa

Toda la documentación está en la carpeta `docs/`:

| Documento | Para quién | Qué explica |
|-----------|-----------|-----------|
| `CLAUDE.md` | Desarrolladores | Guía técnica completa (30+ páginas) |
| `docs/DEPLOYMENT.md` | Todos | Cómo deployar a GitHub Pages |
| `docs/GOOGLE_DRIVE_SETUP.md` | Admin técnico | Google Sheets + Apps Script con CORS |
| `docs/SECURITY.md` | Admin técnico | Generación de contraseñas y secretos |
| `docs/INFRASTRUCTURE.md` | Técnicos | Por qué GitHub Pages + Google Drive |
| `docs/DESIGN_GUIDE.md` | Diseñadores | Personalización visual completa |
| `docs/TROUBLESHOOTING.md` | Todos | Solución de problemas comunes |

---

## 🎨 Características

### Para Invitados

- 📱 Invitación personalizada con sus nombres
- ✅ Sistema RSVP intuitivo
- 🥗 Selección de restricciones dietarias
- 💬 Opción de mensaje personalizado
- 🌈 Diseño elegante, totalmente responsive
- 🎬 Animaciones suaves

### Para Novios/Admin

- 📊 Panel de admin privado (protegido por contraseña)
- 👥 Ver todas las respuestas en tiempo real
- 🎨 Personalizar colores sin editar código
- 📋 Copiar/eliminar respuestas
- 📊 Estadísticas de asistencia
- 💾 Generar links de invitación

---

## 💻 Stack Tecnológico

**Frontend:**
- HTML5 + CSS3 (todo en un archivo)
- Vanilla JavaScript (sin dependencias)
- Google Fonts (Fredoka One, Cormorant Garamond, Montserrat)

**Backend:**
- Google Apps Script (gratuito, serverless)
- Google Sheets (base de datos)

**Hosting:**
- GitHub Pages (gratuito, automático)

**Costo Total: $0** (salvo dominio personalizado)

---

## 🔧 Personalización

### Cambiar Colores

**Opción 1:** Edita variables CSS en `index.html`
```css
:root {
  --cream: #F5F0E8;
  --dark: #1A1A18;
  --gold: #C9A84C;
  --mid: #6B6860;
}
```

**Opción 2:** Admin panel → "Personalizar colores"
- Usa los color pickers
- Cambios se guardan localmente
- No requiere editar código

### Cambiar Contenido

- **Lugar:** Línea 358-360
- **Fecha:** Línea 311, 335, 489
- **Hora:** Línea 345
- **Código hotel:** Línea 398
- **Opciones dietarias:** Línea 493

**→ Guía completa en `docs/DESIGN_GUIDE.md`**

---

## 🔒 Seguridad

✅ **Contraseña:** Hasheada con SHA-256 (no es plaintext)  
✅ **CORS:** Configurado para GitHub Pages  
✅ **HTTPS:** Incluido automáticamente  
✅ **Datos:** Controlados por ustedes (en Google Drive)  

**→ Detalles en `docs/SECURITY.md`**

---

## 📱 Responsive

- ✅ Móvil (320px - 480px)
- ✅ Tablet (480px - 768px)
- ✅ Desktop (768px+)
- ✅ Accesibilidad (contraste WCAG AA)
- ✅ Toque amigable (botones 44px+)

---

## 🐛 Troubleshooting

**El RSVP no se guarda:**
- Verifica que `SHEET_URL` sea correcto
- Asegúrate que Google Apps Script esté desplegado
- Consulta `docs/GOOGLE_DRIVE_SETUP.md`

**El panel admin no carga respuestas:**
- Google Apps Script necesita CORS headers
- Ver `docs/GOOGLE_DRIVE_SETUP.md` para template

**Las invitaciones personalizadas no aparecen:**
- Verifica que `grupo` y `personas` sean correctos en `invitados.js`
- Los URLs deben tener `?grupo=...&personas=...`

**Más problemas:**
- Consulta `docs/TROUBLESHOOTING.md`

---

## 📂 Estructura de Archivos

```
boda/
├── index.html              ← Archivo principal (todo aquí)
├── invitados.js            ← Lista de invitados
├── CLAUDE.md               ← Guía técnica
├── README.md               ← Este archivo
├── .gitignore              ← Git configuration
└── docs/                   ← Documentación detallada
    ├── DEPLOYMENT.md
    ├── GOOGLE_DRIVE_SETUP.md
    ├── SECURITY.md
    ├── INFRASTRUCTURE.md
    ├── DESIGN_GUIDE.md
    └── TROUBLESHOOTING.md
```

---

## 🎯 Roadmap

**Versión actual:** 1.0 (Producción)

Futuras ideas (sin over-engineering):
- [ ] Actualización en vivo el día de la boda
- [ ] Galería de fotos
- [ ] Contador de tiempo personalizado
- [ ] Exportar estadísticas

---

## ❤️ Créditos

Diseñado con amor para **Alejandro & Priscila** 🐾

Toronto el perro corre feliz por sus invitaciones.

---

## 📄 Licencia

MIT License — Libre de usar, modificar y compartir.

---

## 📞 ¿Preguntas?

- Lee la documentación en `docs/`
- Consulta `CLAUDE.md` para detalles técnicos
- Revisa `docs/TROUBLESHOOTING.md` para problemas comunes

---

**¡Feliz boda! 💍✨**
