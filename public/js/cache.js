var Cache = (function() {
	'use strict';

	return {
		getUser: function() {
			return getCache('user');
		},
		setUser: function(val) {
			return setCache('user', val);
		},
		getTable: function() {
			return getCache('table');
		},
		setTable: function(val) {
			return setCache('table', val);
		},
		del: deleteCache
	};

	function getCache(key) {
		var ret = false;
		if (typeof sessionStorage != 'undefined') {
			ret = JSON.parse(sessionStorage.getItem('tictactoe-' + key));
		}
		// log(ret, 'getCache');
		return ret;
	}

	function setCache(key, val) {
		if (typeof sessionStorage != 'undefined') {
			if (typeof val == 'object') {
				val = JSON.stringify(val);
			}
			sessionStorage.setItem('tictactoe-' + key, val);
		}
		// log(val, 'setCache');
	}

	function deleteCache() {
		if (typeof sessionStorage != 'undefined') {
			sessionStorage.clear();
		}
		// log('', 'deleteCache');
	}
})();
