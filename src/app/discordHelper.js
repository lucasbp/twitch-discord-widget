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