const path = require('path');

const jsonServer = require('json-server');

const PORT = 3000;
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log('JSON server is running on port:', PORT);
});
