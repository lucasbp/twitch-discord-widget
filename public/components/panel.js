$(document).ready(function() {
    console.log(`Running ${Twitch.ext.version} on ${Twitch.ext.environment}`);

    Panel.init();
    Panel.request();
});

var Panel = {
    serverId: null,
    discordApi: null,

    init: function() {
        var serverId = Panel.getConfig('serverId');

        Panel.serverId = serverId;
        Panel.discordApi = 'https://discordapp.com/api/guilds/' + Panel.serverId + '/widget.json';

        if (Twitch.ext) {
            Twitch.ext.onAuthorized(function() {

            });

            Twitch.ext.onContext((context) => {
                if (context && context.theme) {
                    //actions.setTheme(context.theme);
                }
            });

            Twitch.ext.configuration.onChanged(function() {

            });

            Twitch.ext.onError((error) => console.log(error));
        }
    },

    getConfig: function(name) {
        var configs = Twitch.ext.configuration.global;

        return configs;
    },

    request: function() {
        $.ajax({
            method: 'GET',
            url: Panel.discordApi,
            cache: false
        }).done(function(data) {
            console.log(data);
        });
    }
}