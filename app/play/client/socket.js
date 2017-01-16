var Socket = (function() {
	'use strict';

	var socket = io('/play');

	function isConnected() {
		return socket.connected;
	}

	function getRoom() {
		return window.location.pathname.slice(6);
	}

	function init() {
		socket.on('connected-user', function(id) {
			if (id == socket.id) {
				// Join room on connect or reconnect
				socket.emit('join-room', getRoom(), Cache.getUser());
			}
			log(id, 'connected-user');
		});

		socket.on('joined-room', function(usr) {
			if (usr.user == socket.id) {
				// Cache current user data on client side
				Cache.setUser(usr);
			}
			log(usr, 'joined-room');
			Game.play();
		});

		socket.on('moved', function(table) {
			Cache.setTable(table);
			GUI.arrayToTable(table);
			log(table, 'moved');
			Game.play();
		});
	}

	function move(tableArray) {
		socket.emit('move', getRoom(), tableArray);
	}

	return {
		init: init,
		isConnected: isConnected,
		move: move
	};

})();
