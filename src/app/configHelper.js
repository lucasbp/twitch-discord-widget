'use strict';

window.ConfigHelper = {

    get: function() {
        if (typeof Twitch.ext.configuration.broadcaster == "undefined") {
            return {};
        }
        else {
            return JSON.parse(Twitch.ext.configuration.broadcaster.content);
        }
    },

    set: function(data) {
        Twitch.ext.configuration.set('broadcaster', '1', JSON.stringify(data));
    }

};