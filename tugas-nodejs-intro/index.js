const fs = require('fs');
const http = require('http');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

const server = http.createServer((req, res) => {
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
  }, 1000);
});

server.listen(3000, () => {
  console.log('Server running at <http://localhost:3000/>');
});