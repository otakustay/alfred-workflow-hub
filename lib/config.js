var alfredo = require('alfredo');

var CONFIG_FILE = 'config.json';

if (!require.parent) {
    var key = process.argv[2];
    var value = process.argv[3];

    var config = alfredo.readJSONSync(CONFIG_FILE) || {};

    if (value) {
        var item = {
            title: 'Set config',
            subtitle: 'Set ' + key + ' to ' + value,
            uid: 'set-' + key,
            valid: true,
            icon: 'setting.png',
            arg: 'Set ' + key + ' to ' + value
        };
        alfredo.feedback([new alfredo.Item(item)]);
    }
    else {
        var item = {
            title: 'View config',
            subtitle: config[key] ? key + ' is now ' + config[key] : key + ' has no value',
            uid: 'view-' + key,
            valid: true,
            icon: 'setting.png',
            arg: ''
        };
        alfredo.feedback([new alfredo.Item(item)]);
    }
}
