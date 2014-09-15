var alfredo = require('alfredo');

var CONFIG_FILE = 'config.json';

if (!require.parent) {
    var key = process.argv[2];
    var value = process.argv[3];

    var config = alfredo.readJSONSync(CONFIG_FILE);
    config[key] = value;
    alfredo.writeJSONSync(CONFIG_FILE, config);

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
