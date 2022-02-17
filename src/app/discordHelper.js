'use strict';

window.DiscordHelper = {

    request: function(serverId) {
        let discordApi = 'https://discordapp.com/api/guilds/' + serverId + '/widget.json';

        return $.ajax({
            'method': 'GET',
            'url': discordApi
        });
    }

};