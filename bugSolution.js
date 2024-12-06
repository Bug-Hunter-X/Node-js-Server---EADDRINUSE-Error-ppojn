const http = require('http');
const net = require('net');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify({ message: 'Hello from Node.js!' }));
};

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer().once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(true);
      }
    }).once('listening', () => {
      tester.close();
      resolve(true);
    }).listen(port);
  });
}

async function startServer(port) {
  if (!await isPortAvailable(port)) {
    console.log(`Port ${port} is in use. Waiting before trying again...`);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return startServer(port); 
  }
  const server = http.createServer(requestListener);
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

const port = 8080;
startServer(port); 
