'use strict';

$(document).ready(function() {
    $('#configs-form').submit(function(e) {
        e.preventDefault();

        let serverId = $('#server-id').val();

        ConfigController.formClear();

        if ( ! serverId) {
            ConfigController.formError('Server ID cannot be empty!');
        }
        else {
            let validate = DiscordHelper.request(serverId);

            validate.done(function(data) {
                var form = {
                    'serverId': $('#server-id').val()
                };

                ConfigHelper.set(form);

                if (ConfigHelper.get()) {
                    ConfigController.formSuccess(`Extension enabled successfully!<br />Community: <strong>${data.name}</strong>`);
                }
                else {
                    ConfigController.formError('The configuration could not be saved, please try again later!');
                }
            }).fail(function(xhr) {
                let response = xhr.responseJSON;
                let error = `${response.message} (#${response.code})`;

                ConfigController.formError(error);
            });
        }
    });

});

const ConfigController = {

    formClear: function() {
        $('#config-submit').attr('disabled', true);
        $('.success, .error').html('').hide();
    },

    formError: function(message) {
        $('.error').html(message).show();
        $('#config-submit').attr('disabled', false);
    },

    formSuccess: function(message) {
        $('.success').html(message).show();
        $('#config-submit').attr('disabled', false);
    }

}

Twitch.ext.configuration.onChanged(() => {
    let cfg = ConfigHelper.get();

    if (cfg) {
        if (cfg.hasOwnProperty('serverId')) {
            $('#server-id').val(cfg.serverId);
        }
    }
});
