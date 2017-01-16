module.exports = {
	protocol: 'http',
	host: '127.0.0.1',
	port: process.env.PORT || process.env.NODE_PORT || 8080,
	domain: '$(protocol)://$(host):$(port)'
};
