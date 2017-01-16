// Respond to user actions
var Handler = (function() {
	'use strict';

	return {
		// Add event listeners in GUI
		gui: function() {
			GUI.getTable().forEach(function(el) {
				el.onclick = function() {
					this.disabled = true;
					this.innerHTML = Game.next();
					Game.play();
					Socket.move(GUI.tableToArray());
				};
			});
		},
		reset: function() {
			document.getElementById('repeat').onclick = function() {
				GUI.getTable().forEach(function(el) {
					el.innerHTML = '';
					el.disabled = true;
				});
				window.location.reload();
			};
		}
	};
})();
