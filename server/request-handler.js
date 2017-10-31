/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var http = require('http');
var handleRequest = require('./request-handler.js');
var fs = require('fs');
var path = require('path');

var dataArr = [];
var idCounter = 0;

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);


  // The outgoing status.
  //var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  
  
  

  // if (request.method === "POST") {
  //   dataArr.push(request.data);
  //   console.log(request.client.HTTPParser);
  // }

  var qs = require('querystring');
  if (request.url === '/') {
    request.url = '/classes/messages';
  }
  if (request.url !== '/classes/messages' && !request.url.includes('-createdAt')) {
    response.writeHead(404, headers);
    //response.write();
    response.end(JSON.stringify({results: dataArr}));
  } else if (request.method === 'POST') {
    response.writeHead(201, headers);
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      if (!body.includes('&')) {
        var POST = JSON.parse(body);
      } else {
        var POST = qs.parse(body);
      }
      console.log(POST);
      POST.createdAt = new Date();
      POST.objectId = idCounter;
      idCounter++;
      dataArr.unshift(POST);
      console.log(dataArr);
      var endPoint = {results: dataArr};
      //response.write();
      response.end(JSON.stringify(endPoint));
    });

  } else if (request.method === 'GET') {
    response.writeHead(200, headers);
    //response.write();
    console.log(JSON.stringify({results: dataArr}));
    response.end(JSON.stringify({results: dataArr}));

  } else if (request.method === 'PUT') {
    response.writeHead(200, headers);
    response.write(JSON.stringify({results: dataArr}));
    response.end();

  } else if (request.method === 'DELETE') {
    response.writeHead(200, headers);
    response.write(JSON.stringify({results: dataArr}));
    response.end();

  } else if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    //response.write();
    response.end(JSON.stringify({results: dataArr}));
  } else {
  
    response.writeHead(200, headers);
    response.write(JSON.stringify({results: dataArr}));
    response.end();
  }
  
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;





















  // //fs.open('./data.js', 'r+', function(err, data) { err ? console.log('err') : console.log(data.arr); } );
  
  // fs.readFile('./data.js', 'utf8', function (err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   var result = data.replace("hello world", 'goodbye');

  //   fs.writeFile('./data.js', result, 'utf8', function (err) {
  //      if (err) { return console.log(err); }
  //   });
  // });

