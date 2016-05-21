'use stricts';
let cottage = require('cottage');
let settings = require('./settings');

let app = cottage();
let status = cottage.Status;

var features = [];

status.predefine('not_found', { status: 404, msg: 'Resource Not Found' });

app.post('/', function *(request) {
    console.log("API Called");
    let body = request.body;
    console.log(body);

    for (let message of body.result)
        for (let feature of features)
            feature.notify(message);
        
    return 200;
});

app.listen(settings.port_number);

for (let module_path of settings.features) {
    var feature = require(module_path);
    feature.initialize(settings);
    features.push(feature);
}