// console.log('Halo, kita akan belajar membuat server');
// terminated web server : killall node in CMD/Terminal

const http = require('http');

const requestListener = (request, response) => {
  // response.setHeader('Content-Type', 'text/html');
  // response.statusCode = 200;
  // response.statusMessage = 'OK';
  // response.end('<h1>Halo HTTP Server Sukses!</h1>');
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Powered-By', 'NodeJS');

  const {url, method} = request;

  /**
   *   // if(url === '/'){
  //   if(method === 'GET'){
  //     // response.end('<h1>Request GET berhasil direspons</h1>');
  //     // curl -X GET http://localhost:5000/
  //   }
  //    // curl -X <any> http://localhost:5000/
  // }

  // if(url === '/about'){
  //   if(method === 'GET'){
  //     // curl -X GET http://localhost:5000/about
  //   }

  //   if(method === 'POST'){
  //      // curl -X POST http://localhost:5000/about
  //   }
  //     // curl -X <any> http://localhost:5000/about
  // }
  //   // curl -X <any> http://localhost:5000/<any>

  // if(method === 'GET'){
  //   // response.end('<h1>Request GET berhasil direspons</h1>');
  // }

  // if(method === 'POST'){
  //   // response.end('<h1>Request POST berhasil direspons</h1>');
  //   let body = [];
  //   request.on('data', (chunck) => {
  //     body.push(chunck);
  //   })
  //   request.on('end', () => {
  //     body = Buffer.concat(body).toString();
  //     const {name} = JSON.parse(body);
  //     response.end(`<h1>Hai, ${name} Request POST berhasil direspons</h1>`);
  //   })
  // }

  // if(method === 'PUT'){
  //   response.end('<h1>Request PUT berhasil direspons</h1>');
  // }

  // if(method === 'DELETE'){
  //   response.end('<h1>Request DELETE berhasil direspons</h1>');
  // }
   */

  // Latihan Routing Request
  if(url === '/'){
    if(method === 'GET'){
      // Response bila client menggunakan GET
      response.statusCode = 200;
      // response.end('<h1>Ini adalah homepage</h1>')
      response.end(JSON.stringify({
        message: 'Ini adalah homepage',
      }))
    }else{
      // Respponse bila cliden tidak menggunakan GET
      response.statusCode = 400;
      // response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`)
      response.end(JSON.stringify({
        message: `Halaman tidak dapat diakses dengan ${method}, request`,
      }))
    }
  }else if(url === '/about') {
    if(method === 'GET'){
      response.statusCode = 200;
      // response.end('<h1>Halo! Ini adalah halaman about</h1>')
      response.end(JSON.stringify({
        message: 'Halo! Ini adalah halaman about',
      }))
    }else if(method === 'POST'){
      let body = []
      request.on('data', (chunk) => {
        body.push(chunk);
      })

      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const {name} = JSON.parse(body);
        response.statusCode = 200;
        // response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`)
        response.end(JSON.stringify({
          message: `Halo, ${name}! Ini adalah halaman about`,
        }))
      })
    }else{
      response.statusCode = 400;
      // response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`)
      response.end(JSON.stringify({
        message: `Halaman tidak dapat diakses menggunakan ${method}, request`,
      }))
    }
  }else{
    response.statusCode = 400;
    // response.end('<h1>Halaman tidak ditemukan!</h1>')
    response.end(JSON.stringify({
      message: 'Halaman tidak ditemukan!',
    }))
  }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
})

/*
akses Terminal/CMD
curl -X GET http://localhost:5000/
curl -X GET http://localhost:5000/about
curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dicoding\"}"
curl -X PUT http://localhost:5000/about
curl -X DELETE http://localhost:5000/about
*/