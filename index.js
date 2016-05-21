'use stricts';
let cottage = require('cottage');
let settings = require('./settings');
let database = require('./utils/database');

let app = cottage();
let status = cottage.Status;

var modules = [];

status.predefine('not_found', { status: 404, msg: 'Resource Not Found' });

app.get('/linebot/callback', function *(request) {
	let body = request.body;

	for (let message of body.result)
		for (let module of modules)
			module.notify(message);
		
	return 200;
});

app.all(function *(request) {
    return status('not_found');
});

app.listen(settings.port_number);

for (let module_path of settings.modules) {
	var module = require(module_path);
	module.initialize(settings);
	modules.add(module);
}