import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let intentos = 0;
let usuarios = [{username:'admin', password:'1234'}];

const renderLoginForm = (message = '') => {
  return `
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Login</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
      <style>
        body { font-family: Arial; text-align: center; padding-top: 100px; background-image: url('https://media.istockphoto.com/id/1460853312/es/foto/puntos-y-l%C3%ADneas-conectados-abstractos-concepto-de-tecnolog%C3%ADa-de-ia-movimiento-del-flujo-de.jpg?s=2048x2048&w=is&k=20&c=5oD7_mWkshhxxZE469mS2-3C1epY65YuducDilRd_uo='); background-size: cover; color: white; }
        input { margin: 5px; padding: 10px; width: 200px; }
      </style>
    </head>
    <body>
      <div class="row justify-content-center">
        <div class="col-3">
          <h3>Iniciar sesión</h3>
          <form action="login" method="POST" class="mt-5">
            <input type="text" class="form-control" name="username" placeholder="Usuario" required><br>
            <input type="password" class="form-control" name="password" placeholder="Contraseña" required><br>
            <button type="submit" class="btn btn-primary">Ingresar</button>
          </form>
            ${message}
        </div>
      </div>
    </body>
    </html>
  `;
}

const renderRegisterForm = ( message = '' )=>{
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Registro</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
        <style>
          body { font-family: Arial; text-align: center; padding-top: 100px; background-image: url('https://media.istockphoto.com/id/1460853312/es/foto/puntos-y-l%C3%ADneas-conectados-abstractos-concepto-de-tecnolog%C3%ADa-de-ia-movimiento-del-flujo-de.jpg?s=2048x2048&w=is&k=20&c=5oD7_mWkshhxxZE469mS2-3C1epY65YuducDilRd_uo='); background-size: cover; color: white; }
          input { margin: 5px; padding: 10px; width: 200px; }
        </style>
      </head>
      <body>
        <h1>Registro</h1>
        <div class="row justify-content-center">
          <div class="col-3">
            <h3>Crear cuenta</h3>
            <form method="POST" action="/register">
              <input class="form-control" name="username" placeholder="Usuario"/>
              <input class="form-control" name="password" type="password" placeholder="Contraseña"/>
              <button class="btn btn-primary" type="submit">Registrar</button>
            </div>
          </div>
        </form>
        <a href="/">Ir a Login</a>
        ${message}
      </body>
    </html>
  `;
}

app.get('/', (req, res) => {
  res.send(renderLoginForm());
});

app.get('/register', (req, res) =>{
  res.send(renderRegisterForm());
})

app.post('/reset', (req, res) => {
  intentos = 0;
  usuarios = [{username:'admin', password:'1234'}];
  res.send('Intentos reiniciados');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = usuarios.find(u => u.username === username && u.password === password);

  if (user) {
    intentos = 0;
    res.send(renderLoginForm(`<h2 id="success">Bienvenido ${username}</h2>`));
  } else {
    intentos++;
    if (intentos > 3) {
      res.send(renderLoginForm(`<h2 id="blocked">Demasiados intentos fallidos. Inténtalo más tarde.</h2>`));
    } else {
      res.send(renderLoginForm(`<h2 id="error">Credenciales Incorrectas</h2>`));
    }
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const exists = usuarios.some(u => u.username === username);

  if (exists) {
    res.send(renderRegisterForm(`<h2 id="error">Usuario ya registrado</h2>`));
  } else {
    usuarios.push({ username, password });
    res.send(renderRegisterForm(`<h2 id="success">Usuario ${username} registrado correctamente</h2>`));
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
