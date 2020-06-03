const twitch = window.Twitch.ext;

const ConfigHelper = {

    get: function() {
        if (typeof twitch.configuration.broadcaster == "undefined") {
            return {};
        }
        else {
            return JSON.parse(twitch.configuration.broadcaster.content);
        }
    },

    set: function(data) {
        twitch.configuration.set('broadcaster', '1', JSON.stringify(data));
    }

}

const DiscordHelper = {

    request: function() {
        let cfg = ConfigHelper.get();
        let discordApi = 'https://discordapp.com/api/guilds/' + cfg.serverId + '/widget.json';

        return $.ajax({
            method: 'GET',
            url: discordApi
        });
    }

}