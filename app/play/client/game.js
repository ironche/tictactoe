// Game logic
var Game = (function() {
	'use strict';

	// All 8 winning combinations
	var winning = [
		['1-1', '1-2', '1-3'],
		['2-1', '2-2', '2-3'],
		['3-1', '3-2', '3-3'],
		['1-1', '2-1', '3-1'],
		['1-2', '2-2', '3-2'],
		['1-3', '2-3', '3-3'],
		['1-1', '2-2', '3-3'],
		['3-1', '2-2', '1-3']
	];

	// How many moves can be played
	function leftMoves() {
		var table = GUI.getTable();
		var count = 0;
		for (var i = 0, len = table.length; i < len; i++) {
			count += table[i].innerHTML.length;
		}
		return table.length - count;
	}

	// Is there a winning combination and who won, O or X
	function whoWon() {
		for (var i = 0; i < 8; i++) {
			var combination = '';
			for (var j = 0; j < 3; j++) {
				combination += GUI.getCell(winning[i][j]).innerHTML || '-';
			}
			if (combination.match(/^(O{3}|X{3})$/gi)) {
				return combination[0];
			}
		}
		return false;
	}

	// Is game finished (any moves left to play)
	function isFinished() {
		return (leftMoves() === 0) || whoWon();
	}

	// Who plays next
	function whoPlaysNext() {
		return leftMoves() % 2 === 1 ? 'O' : 'X';
	}

	// Run game, check state and update GUI
	function playGame() {
		var tpm = Cache.getUser();
		var next = whoPlaysNext();

		if (tpm.role != 'watch') {
			if (! isFinished()) {
				if (tpm.roomSize > 1 && (next == tpm.role)) {
					GUI.you();
				} else {
					GUI.wait();
				}
			} else {
				var didSomebodyWin = whoWon();
				if (didSomebodyWin) {
					if (didSomebodyWin == tpm.role) {
						GUI.won();
					} else {
						GUI.lost();
					}
				} else {
					GUI.tied();
				}
			}
		} else {
			GUI.watch();
		}
	}

	return {
		// Who plays next
		next: whoPlaysNext,
		// Run game, check state and update GUI
		play: playGame
	};
})();
