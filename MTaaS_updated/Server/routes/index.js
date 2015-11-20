
/*
 * GET home page.
 */
/* Tilte Updated by Kokil*/
exports.index = function(req, res){
  res.render('index', { title: 'MTaaS Cloud Load Balancer'});
};

exports.ping = function(req, res){
	  res.send('Up and Running');
	};