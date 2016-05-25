/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
//this is where we save messages
var messages = {results: []};
var objectId = 0;

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  //what is the method (GET, POST)
  //we can make a function for POST
  //async 


  // Do some basic logging
  console.log('----------------------------------------------------------')
  // console.log('request: ', request);
  //console.log('response: ', response);
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  console.log('path', request.url)

  //this will check the method of the request
  if (request.method === 'GET' || request.method === 'OPTIONS') {
    //check if path is valid  -> do we need a 404
    //console.log('GETrequest' , request);
    
    response.writeHead(statusCode, headers);
    //this is the section for GET
    //send response
    console.log('messages', messages);
    response.end(JSON.stringify(messages));
  } else if (request.method === 'POST'){
    //the request is a POST
    console.log('this is a POST', request.method);
    //Recieving a Post Request
    statusCodePOST = 201;
    var body = '';
    response.writeHead(statusCodePOST, headers);
      request.on('data', function(chunk) {
        console.log('chunk', chunk);
        body += chunk;
      });
      request.on('end', function() {
        // body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        body.objectId = ++objectId;
        console.log('body: ', body);
        messages.results.push(body);
        console.log('json messages', messages);
        //console.log('json messages.results', JSON.parse(messages.results));

        // messages.results = JSON.parse(messages.results[0]);
        
        response.end(JSON.stringify(messages));
      });

  }

  
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(JSON.stringify({message: "Hello, World!", results: []}));
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
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type':"application/json"
};

module.exports.requestHandler = requestHandler;
module.exports.headers = defaultCorsHeaders;