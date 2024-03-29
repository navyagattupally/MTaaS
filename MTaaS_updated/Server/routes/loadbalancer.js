/*
 * load Balancer Module.
 */
var url = require( "url" );
var queryString = require( "querystring" );
var fs = require("fs");
var conf = (JSON.parse(fs.readFileSync("./config/conf.json", "utf8")));

//commented by Kokil , to pick algo from UI rather than conf file.
//var loadBal=conf.loadBalanceAlgo;
//var algo = require("../loadbalancers/"+loadBal);

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mtaasservice@gmail.com',
        pass: 'cmpe295b'
    }
});


// send mail with defined transport object
exports.sendEmail = function(req,res){
var random = require("random-js")(); // uses the nativeMath engine
var value = Math.floor(Math.random() * (5 ) + 0);
var vms = ["54.213.167.25","54.213.242.223","54.213.166.160","54.213.229.89","54.213.167.25"];
console.log("chosen vm : " + value);
	var request = require('request');
    var email=req.params.email;

  console.log(email);      // your JSON
	
	var mailOptions = {
    from: 'MTaaS Service ✔ <service@mtaas.com>', // sender address
    to:email, // list of receivers
    subject: 'Your VM details ✔', // Subject line
    text: 'Hi! Thanks for Choosing us. ✔', // plaintext body
    html: '<b>Your VM IP address:' + vms[value] +'</b> <br></br> Pls use your terminal to SSH into the VM with the attached Key.<br></br> The key is protected by a password',
    attachments:[{   // file on disk as an attachment
            filename: 'testkey.pem.docx',
            path: 'testkey.pem.docx' // stream this file
        }] // html body
};
	transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    res.send("Message Sent");

});
};


exports.ping = function(req, res){
  res.send('Up and Running');
};

exports.resourceip = function(req, res){
	
var random = require("random-js")(); // uses the nativeMath engine
var value = Math.floor(Math.random() * (5 ) + 0);
var vms = ["54.213.229.89","54.213.166.160","54.213.167.25","54.213.242.223","54.213.229.89"];
console.log("chosen vm : " + value);
return res.send(vms[value]);
}

exports.resourcelist = function(req, res){
	
var random = require("random-js")(); // uses the nativeMath engine
var value = Math.floor(Math.random() * (5 ) + 0);
var vms = [{"IP":"54.213.229.89","Region":"N.California","Memory":"256GB","VMType":"Ubuntu","State":"Running"},{"IP":"54.213.166.160","Region":"Oregon","Memory":"500GB","VMType":"Linux","State":"Running"},{"IP":"54.213.167.25","Region":"N.California","Memory":"512GB","VMType":"Ubuntu","State":"Running"},{"IP":"54.213.242.223","Region":"Oregon","Memory":"256GB","VMType":"Ubuntu","State":"Running"},{"IP":"54.213.229.89","Region":"Virginia","Memory":"512GB","VMType":"Linux","State":"Running"}];
console.log("chosen vm : " + vms);
return res.send(vms);
}


exports.resourceRequest = function(req, res){
		
	if (req.body.hasOwnProperty('algo'))
	{
		console.log(" ********algo is : *********" + req.param('algo'));
	}

	var loadBal=req.param('algo');
	var algo = require("../loadbalancers/"+loadBal);
	
	
	
	/** for(var i = 0 ; i< conf.loadBalanceAlgo.AlgoType.length ; i++)
	 {
	   if ( (req.param('algo')) == conf.loadBalanceAlgo.AlgoType[i]) 
	   {
	   loadBal = req.param('algo');
	   break;
	   }
	 }**/
	
		if(conf.role == "loadbalancer")
		  {
		  	algo.allocateServer(function(allocatedServer,err){
		  		if(err)
					console.log(err);
				else
					{
					console.log(req.body);
					console.log(allocatedServer);
					for(node in conf.server.serverNodes)
					  {
					  	var server=conf.server.serverNodes[node];
					  	if(server.nodeId==allocatedServer)
					  		{
					  			url="http://" + server.host + ":" + server.port + req.path;
					  			/**
					  			 *------- TO DO ---------
					  			 * 1) Ping the server to see if its running
					  			 * 2) Only in the case its running rediret the request
					  			 * 3) Call the loadbalancer again to allocate new server
					  			 *    incase the one allocated is not running
					  			 */
					  			console.log(url);
					  			res.location(url);
					  			return res.redirect(307, url);
					  		}
					  }
					}
		  	},conf,req);
		  }
	  else if (conf.role== "server")
		  {
		  	console.log('role : server');
		  	if(req.body.hasOwnProperty('quantity') && req.body.hasOwnProperty('duration') && req.body.hasOwnProperty('mobile_os') && req.body.hasOwnProperty('ram') && req.body.hasOwnProperty('disk') && req.body.hasOwnProperty('CPU')) 
		  	{
			  if(conf.loadBalanceAlgo=="ant")
			  {
				  var slength=conf.server.serverNodes.length;
				  var prize=function random(slength) 
				  {
					  var x = Math.cos(slength) * 10000;
					  return x - Math.floor(x);
				  }
				  incrementPheromoneBySid(conf.nodeId,prize);
			  }
			  /**
	  			 *------- TO DO ---------
	  			 * 1) Each parameter has an associated cost
	  			 * 2) Store and retrieve cost for each parameter in the DB (eg 1 ghz cpu -> 5 $, 2 gb RAM -> $ 10 etc
	  			 * 3) Limited resources, so maintain resource count in DB and decline requests when resources not available
	  			 * 4) Compute and return cost according to resources requested.
	  			 */
				console.log("****** Request For Resource recieved with the following Configuration");
				console.log("** CPU --> " + req.body.CPU  + "**");
				console.log("** DISK --> " + req.body.disk  + "**");
				console.log("** RAM --> " + req.body.ram  + "**");
				console.log("** MOBILE OS --> " + req.body.mobile_os  + "**");
				console.log("** DURATION --> " + req.body.duration  + "**");
				console.log("** QUANTITY --> " + req.body.quantity  + "**");
				console.log("** LATITUDE --> " + req.body.latitude  + "**");
				console.log("** LONGITUDE --> " + req.body.longitude  + "**");
				
				console.log("\n\n **##### TOTAL COMPUTED COST -->> $50.00  #####**");
				return res.send('Total Cost : $50');
				
			}
		  else
		  	{
		  		console.log('Has no parameters');
		  		console.log(req.body);
		  		return res.send('No post parameters');
		  	}
		  }
	};

