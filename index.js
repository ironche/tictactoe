var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('c0nfig');

// Load routes
require('./app/routes/')(express, app, io);

// Set path for static files
app.use(express.static('./public'));
app.use(express.static('./app'));

// Listen for incoming connections
http.listen(config.port, function() {
	console.log('App is running with following configuration');
	console.log(config);
});
