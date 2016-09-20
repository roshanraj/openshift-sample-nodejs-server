//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    morgan  = require('morgan'),
    bodyParser = require('body-parser');


// To allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.text()); // for parsing text/plain
//app.use(bodyParser.json()); // for parsing application/json
// For more https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('combined'))
// Static file location
app.use(express.static('webapp'));


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 9090,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


// Simple get
app.get('/', function (req, res) {
     res.sendfile('./webapp/index.html');
});

// Simple post
app.post('/post/v1/send', function (req, res) {
	var body = req.body;
	var listOfMeasure = body.split('\n');
	for (metric in listOfMeasure) 
		console.log(metric.split(':'));
      //[name, value] = metric.split(':')
	
     console.log(listOfMeasure);
});



// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;


