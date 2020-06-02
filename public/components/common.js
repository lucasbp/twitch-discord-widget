let token, userId, channelId, theme;
const twitch = window.Twitch.ext;

twitch.onAuthorized((auth) => {
	token = auth.token;
    userId = auth.userId;
    channelId = auth.channelId;
});

twitch.onContext((context) => {
    theme = context.theme;

    if ($('#discord-widget').length > 0 && $('#discord-widget').is(':visible')) {
        let element = $('#discord-widget .widget');

        element.removeClass('widget-theme-dark');
        element.removeClass('widget-theme-light');
        element.addClass('widget-theme-' + theme)
    }
});

var config = {

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
    },

    theme: function() {
        return theme;
    }

}