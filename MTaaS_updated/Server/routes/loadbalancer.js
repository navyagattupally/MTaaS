/*
 * load Balancer Module.
 */
var url = require( "url" );
var queryString = require( "querystring" );
var fs = require("fs");
var conf = (JSON.parse(fs.readFileSync("./config/conf.json", "utf8")));
var random = require("random-js")(); // uses the nativeMath engine
var value = Math.floor(Math.random() * (5 ) + 0);
var vms = ["1.0.0.0","2.0.0.0","3.0.0.0","4.0.0.0","5.0.0.0"];

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
console.log("chosen vm : " + value);
return res.send(vms[value]);	
}
