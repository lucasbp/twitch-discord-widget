let token, userId, config, theme;
const twitch = window.Twitch.ext;

twitch.onContext((context) => {
    twitch.rig.log(context);
    theme = context.theme;
});

twitch.onAuthorized((auth) => {
	token = auth.token;
    userId = auth.userId;
    config = Config.get();
});

$(document).ready(function() {
    //Config.init();
});

var Config = {
    init: function() {
        var config = {
			'serverId': '714271377594777640'
        };

        Config.set(config);
        console.log(twitch.configuration.broadcaster);
    },

    get: function() {
        var configs;

        if (typeof twitch.configuration.broadcaster == "undefined") {
            configs = {};
        }
        else {
            configs = twitch.configuration.broadcaster.content;
        }

        return JSON.parse(configs);
    },

    set: function(data) {
        twitch.configuration.set('broadcaster', '', JSON.stringify(data));
    }
}