const { createServer } = require("http");

const server = createServer((request, response) => {
  response.writeHead(200);
  response.write("Hello World");
  response.end();
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNINIG :)");
});
