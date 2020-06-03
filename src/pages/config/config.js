$(document).ready(function() {
    $('#configs-form').submit(function(e) {
        e.preventDefault();

        $('#config-submit').attr('disabled', true);
        $('.success, .error').html('').hide();

        let status = {
            error: false,
            errorMessage: null
        };

        if ( ! $('#server-id').val()) {
            status.error = true;
            status.errorMessage = "Server ID cannot be empty!";
        }

        if (status.error) {
            $('.error').html(status.errorMessage).show();
            $('#config-submit').attr('disabled', false);
        }
        else {
            var form = {
                'serverId': $('#server-id').val()
            };

            ConfigHelper.set(form);

            if (ConfigHelper.get()) {
                $('.success').html('Extension enabled successfully!').show();
                $('#config-submit').attr('disabled', false);
            }
            else {
                $('.error').html('The configuration could not be saved, please try again later!').show();
            }
        }
    });

});

Twitch.ext.configuration.onChanged(() => {
    let cfg = ConfigHelper.get();

    if (cfg) {
        if (cfg.hasOwnProperty('serverId')) {
            $('#server-id').val(cfg.serverId);
        }
    }
});
