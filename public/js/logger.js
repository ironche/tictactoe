function log(val, context) {
	console.log('LOG:', context, val);
	context = context || '';
	if (typeof val == 'object') {
		val = JSON.stringify(val);
	}
	var out = document.getElementById('log');
	if (out) {
		var ret = '<li>';
		ret += '<em>' + new Date().toJSON().slice(11,22) + '</em>';
		ret += '<strong>' + context + '</strong>';
		ret += '<pre>' + val + '</pre>';
		ret += '</li>';
		ret += out.innerHTML;
		out.innerHTML = ret;
	}
}

function clear() {
	Cache.del();
	console.clear();
	document.getElementById('log').innerHTML = '';
}
