require('dotenv').config();

var express = require('express'),
  path = require('path'),
  hidePoweredBy = require('hide-powered-by'),
	bodyParser = require('body-parser'),
  _ = require('lodash');


var PORT = 8000;


// App
var app = express();
app.use(hidePoweredBy());
//for parsing application/json & parsing application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.set('trust proxy', true);

var routes = require('./routes');


app.get('/v1/test/route', routes.test.test_route);
app.post('/v1/test/route', routes.test.test_route_post);
app.get('/ack', routes.test.ack_get);
app.post('/ack', routes.test.ack_post);

app.get('/server/time', routes.test.get_server_time);
app.get('/point/:distance/:theta/:phi', routes.test.point_get);


app.get('/robots.txt', function (req, res, next) {
  res.set('Content-Type', 'text/plain');
  return res.send('User-agent: *\nDisallow: /')
});

app.all('*', function(req, res) {
  return res.status(410).json({ success: false, message: 'There is no content here for you to view' });
});


app.use(function (err, req, res, next) {
   console.error(err, 'the error');
   console.error(err.stack, ' the stack');
   console.error(err.message, ' the message');
   if (err.code == 11000) res.status(400).send(err.message);
   else res.status(err.status || 500).send(err.message || 'Internal server error.');
});

console.log('Running app on port: ' + PORT);
app.listen(PORT);