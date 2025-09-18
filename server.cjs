// server.cjs
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Activation du middleware d'authentification
server.db = router.db;

// Utilisez le middleware d'authentification AVANT le routeur
server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server with Auth is running');
});