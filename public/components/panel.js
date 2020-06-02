let token, channelId, config, theme;
const twitch = window.Twitch.ext;

twitch.onContext((context) => {
    twitch.rig.log(context);
    theme = context.theme;
});

twitch.onAuthorized((auth) => {
    token = auth.token;
    channelId = auth.channelId;

    if (typeof twitch.configuration.broadcaster == "undefined") {
        config = {};
    }
    else {
        config = JSON.parse(twitch.configuration.broadcaster.content);
        DiscordPanel.init();
    }
});

var DiscordPanel = {
    serverId: null,
    discordApi: null,

    init: function() {
        DiscordPanel.serverId = config.serverId;
        DiscordPanel.discordApi = 'https://discordapp.com/api/guilds/' + DiscordPanel.serverId + '/widget.json';
    },

    request: function() {
        $.ajax({
            method: 'GET',
            url: DiscordPanel.discordApi
        }).done(function(data) {
            twitch.rig.log(data);
        });
    }
};