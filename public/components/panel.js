twitch.configuration.onChanged(() => {
    discordPanel.init();
});

var discordPanel = {
    serverId: null,
    Api: null,

    init: function() {
        let cfg = config.get();

        discordPanel.serverId = cfg.serverId;
        discordPanel.Api = 'https://discordapp.com/api/guilds/' + discordPanel.serverId + '/widget.json';

        discordPanel.call();
    },

    call: function() {
        $.ajax({
            method: 'GET',
            url: discordPanel.Api
        }).done(function(data) {
            console.log(data);
        }).fail(function(xhr) {
            console.log(xhr.responseJSON);
        });
    }
};