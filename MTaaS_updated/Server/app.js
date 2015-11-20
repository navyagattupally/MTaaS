
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var url = require("url");
var loadbalancer = require("./routes/loadbalancer");
var http = require('http');
var path = require('path');
var fs = require("fs");
var port = process.argv[2] || 8000;

/**
 * -------TO DO----------- 
 * 
 * 1) Validate conf FIlE NOT FOUND
 * 2) Validate JSON FILE. 
 * 
 */
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', '*');

    next();
}
//update conf1 to conf by Kokil
var conf = (JSON.parse(fs.readFileSync("./config/conf.json", "utf8")));

var app = express();

// all environments
app.set('port', process.env.PORT || conf.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable('etag');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(allowCrossDomain);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//// ** GET REQUESTS
app.get('/', routes.index);
app.get('/ping', loadbalancer.ping);

//// ** POST REQUESTS
app.post('/resourceRequest', loadbalancer.resourceRequest);

/*fs.readFile('./requestGenerator2.html', "binary", function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html, "binary");  
        response.end();  
    }).listen(8000);
});*/

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/requestGenerator2.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

http.createServer(app).listen(app.get('port'), function(){
  
  console.log("Starting " + conf.role + " " + conf.nodeName + " listening on port " + conf.port);
  for(node in conf.server.serverNodes)
	  {
	  	var server=conf.server.serverNodes[node];
	  	console.log("Server " + server.nodeName + " for handling requests at port " + server.port );
	  }
  for(node in conf.loadBalancer.loadBalancerNodes)
  {
  	var loadBalancer=conf.loadBalancer.loadBalancerNodes[node];
  	console.log("LoadBalancer " + loadBalancer.nodeName + " for balancing request load at port " + loadBalancer.port );
  }
  console.log("Implementing the " + conf.loadBalanceAlgo + " algorithm for Load Balancing");
});
