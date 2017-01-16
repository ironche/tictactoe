// Toggle game statuses
var GUI = (function(status) {
	'use strict';

	// Get all table items and convert DOM NodeList to Array
	function getTable() {
		return [].slice.call(document.querySelectorAll('.run button'));
	}

	// Get single cell
	function getCell(id) {
		return document.getElementById(id);
	}

	// Export table to array
	function tableToArray() {
		return getTable().map(function(el) {
			return el.innerHTML;
		});
	}

	// Draw array to table
	function arrayToTable(arr) {
		getTable().forEach(function(el, i) {
			el.innerHTML = arr[i];
		});
	}

	return {
		// Shows 'Waiting for a second player...' message
		// and dissables input until next turn
		wait: function() {
			getTable().forEach(function(el) {
				el.disabled = true;
			});
			status.className = 'wait';
		},

		// Shows 'Your turn...' message
		// and enables input for next turn
		you: function() {
			getTable().forEach(function(el) {
				// Enable only empty cells
				if (! el.innerHTML.length) {
					el.disabled = false;
				}
			});
			status.className = 'you';
		},

		// Shows 'You can only watch this game' message
		watch: function() {
			status.className = 'watch';
			getTable().forEach(function(el) {
				el.disabled = true;
			});
		},

		// Shows 'You won.' message and button to restart the game
		won: function() {
			status.className = 'won';
			getTable().forEach(function(el) {
				el.disabled = true;
			});
		},

		// Shows 'You lost.' message and button to restart the game
		lost: function() {
			status.className = 'lost';
			getTable().forEach(function(el) {
				el.disabled = true;
			});
		},

		// Shows 'Match is tied.' message and button to restart the game
		tied: function() {
			status.className = 'tied';
			getTable().forEach(function(el) {
				el.disabled = true;
			});
		},

		// Get table cells
		getTable: getTable,

		// Get single cell
		getCell: getCell,

		// Export table to array
		tableToArray: tableToArray,

		// Draw array to table
		arrayToTable: arrayToTable
	};
})(document.getElementById('game-status'));
