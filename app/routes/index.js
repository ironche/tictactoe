var fs = require('fs');

module.exports = function(express, app, io) {
	'use strict';

	var router = express.Router();

	// Get root app folder path
	var appPath = __dirname.slice(0, __dirname.length - 6);

	// Handle all sub-routes (every module has its own route)
	fs.readdir('./app/routes/', 'utf8', function(err, files) {
		files.forEach(function(el) {
			if (el !== 'index.js') {
				var routeName = el.replace('.js', '');

				// Initialise the route to add its functionality to router
				require('./' + routeName)(router, io, appPath);
				
				// Add router to the speficied route name in the app
				app.use('/' + routeName, router);
			}
		});
	});
};
