$(document).ready(function() {
    Config.init();
});

var Config = {
    init: function() {
        Config.set('broadcaster', 'teste', '1');
        console.log(Config.get('broadcaster'));
    },

    get: function(segment) {
        var configs = Twitch.ext.configuration[segment];
        return configs;
    },

    set: function(segment, key, value) {
        return Twitch.ext.configuration.set(segment, '0.0.1', `{"${key}": "${value}"}`);
    }
}