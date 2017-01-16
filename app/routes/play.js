module.exports = function(router, io, appPath) {
	'use strict';

	// Set module path
	appPath += '/play';

	// Load socket controller
	require(appPath + '/server/socket.js')(io);

	// Handle GET /play/:roomId
	router.route('/:roomId')
		.get(function(req, res) {
			res.sendFile(appPath + '/client/index.html');
			// req.params.roomId
		});
};
