/**
 * Module dependencies.
 */
var express = require('express')
var routes = require('./routes');
var jsdom  = require('jsdom');
var fs     = require('fs');
var jquery = fs.readFileSync("./jquery-1.7.2.min.js").toString();
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
	res.render('index', { title: 'Express' })
});


app.post('/getpage', function(req, res){	
	var sTargetUrl = req.param('sTargetUrl');	
	jsdom.env({  
		html: sTargetUrl,
		src: [
			jquery
		],
		done: function(errors, window) {
			console.log(errors===null);
			res.header('Content-Type', 'text/html');
			res.header('Charset', 'utf-8');
			if(errors===null){
				console.log("success");
				var $ = window.$;				
				var sHtml = $("body").html();
				res.send(sHtml);				
			}else{
				res.send({"sStatus":"error", "sMessage":"Can't Scrape Page! Check Url Address!"});
				console.log("error");
			}
		}
	});
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
