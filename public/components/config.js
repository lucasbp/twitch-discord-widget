twitch.configuration.onChanged(() => {
    let cfg = config.get();

    if (cfg) {
        if (cfg.hasOwnProperty('serverId')) {
            $('#serverId').val(cfg.serverId);
        }
    }
});

$(document).ready(function() {

    $('#configsForm').submit(function(e) {
        e.preventDefault();

        var form = {
            'serverId': $('#serverId').val()
        };

        config.set(form);
    });

});