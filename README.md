# Proyecto: Test de Login y Registro con Selenium y Mocha

Este proyecto implementa un sistema de **Login y Registro de Usuarios** en Node.js con **Express**,  
junto con **tests automatizados** usando **Selenium WebDriver**, **Mocha**, y **Mochawesome** para reportes.

Incluye:
- Login con validación
- Bloqueo tras 3 intentos fallidos
- Registro de nuevos usuarios
- Registro bloqueado si el usuario ya existe
- Suite de tests automatizados (login, registro, bloqueo)
- Generación de reportes HTML/JSON con Mochawesome
- Capturas de pantalla automáticas al final de cada test

---

## 📂 Estructura del proyecto
```bash
project/
├─ src/
│ ├─ app.js # Backend con login + registro
│ └─ tests/
│ └─ auth.test.js # Suite unificada de tests
├─ reports/
│ ├─ report.html # Reporte Mochawesome
│ └─ screenshots/ # Capturas de pantalla por test
├─ package.json
└─ README.md

```
---

## ⚡ Requisitos previos

- [Node.js](https://nodejs.org) v18+  
- [Google Chrome](https://www.google.com/chrome/) 
- NPM o Yarn

---

## 🔹 Instalación

1. Clonar el repositorio:

```bash
git clone <URL-del-repo>
cd project 
```

2. Instalar dependencias
```bash
npm install
```

Incluye:

express (backend)

body-parser (parseo de formularios)

selenium-webdriver (tests E2E)

mocha (framework de testing)

mochawesome (reportes HTML/JSON)

🔹 Ejecución del backend
Antes de correr los tests, inicia el servidor:

```bash
node src/server.js
```

El servidor correrá en:

```bash
http://localhost:3000
```

Endpoints principales:

```bash
/ → Login

/register → Registro de usuarios

/reset → Reset de intentos y usuarios (para tests)

```

🔹 Ejecución de los tests
En otro terminal, ejecuta:

```bash
npm test
```

Esto ejecutará:

Login correcto

Login incorrecto

Bloqueo tras 3 intentos fallidos

Registro de usuario nuevo

Registro de usuario existente


🔹 Reporte Mochawesome
El reporte se genera en:

```bash
reports/report.html
```

Para abrirlo:

Windows: start reports/report.html

Linux: xdg-open reports/report.html

MacOS: open reports/report.html

También se genera el JSON para integraciones CI/CD.


🔹 Capturas de pantalla
Cada test genera un screenshot en:

```bash
reports/screenshots/<nombre_del_test>.png
```

Ejemplo:

```bash
reports/screenshots/login_bloqueo_tras_3_intentos_fallidos.png
```

🔹 Scripts disponibles
En package.json:

```json
"scripts": {
  "test": "npx mocha ./src/tests/auth.test.js --timeout 1200000 --reporter mochawesome --reporter-options reportDir=reports,reportFilename=report,overwrite=true,html=true,json=true"
}
```

Ejecuta todos los tests

Genera reporte unificado

Captura screenshots

✅ Recomendaciones
Asegúrate que Chrome y Chromedriver estén actualizados.


# Autor: Dennis Alberto Torres Martínez
## Proyecto de fin de módulo 4 - Bootcamp Automatización de Pruebas