'use strict';

const twitch = window.Twitch.ext;

window.ConfigHelper = {

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

};