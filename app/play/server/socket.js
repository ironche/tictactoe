module.exports = function(io) {
	'use strict';

	var sio = io.of('/play');

	sio.on('connect', function(socket) {
		var sid = socket.id.slice(6);
		console.log(sid + ' connected');

		// confirm that user is connected
		sio.emit('connected-user', sid);

		socket.on('disconnect', function() {
			console.log(sid + ' disconnected');
		});

		socket.on('join-room', function(room, userCache) {

			// Add user to room
			socket.join(room);
			var roomSize = sio.adapter.rooms[room].length;

			// Set user role and prevent user to change role if server restarts
			var userRole;
			if (userCache) {
				userRole = userCache.role;
			} else {
				switch (roomSize) {
					case 1:
						// Plays first
						userRole = 'O';
						break;
					case 2:
						// Plays second
						userRole = 'X';
						break;
					default:
						// Everyone else may only watch
						userRole = 'watch';
						break;
				}
			}

			// Notify whole room about new user who joined
			sio.to(room).emit('joined-room', {
				user: sid,
				room: room,
				role: userRole,
				roomSize: roomSize
			});

			console.log(sid + ' has joined room ' + room + ' as ' + userRole);
		});

		socket.on('move', function(room, tableArray) {
			socket.broadcast.to(room).emit('moved', tableArray);
		});
	});
};
