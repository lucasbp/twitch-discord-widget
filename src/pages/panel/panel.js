'use strict';

Twitch.ext.onContext((context) => {
    let theme = context.theme;

    if ($('#discord-widget').length > 0 && $('#discord-widget').is(':visible')) {
        let element = $('#discord-widget .widget');

        element.removeClass('widget-theme-dark');
        element.removeClass('widget-theme-light');
        element.addClass('widget-theme-' + theme);
    }
});

Twitch.ext.configuration.onChanged(() => {
    PanelController.init();
});

const PanelController = {

    init: function() {
        PanelController.call();
        PanelController.timer();
    },

    timer: function() {
        let interval = 15 * (1000 * 60);

        setInterval(function() {
            PanelController.loader('show');
            PanelController.call();
        }, interval);
    },

    loader: function(event) {
        if (event == 'show') {
            if ( ! $('.widgetBody').hasClass('widgetLoading')) {
                $('.widgetBody').addClass('widgetLoading');
            }

            if ($('.widgetBody').find('.spinner').length == 0) {
                $('.widgetBody').append(`<span class="spinner">
                                            <span class="inner">
                                                <span class="wanderingCubesItem"></span>
                                                <span class="wanderingCubesItem"></span>
                                            </span>
                                        </span>`);
            }
        }
        else if (event == 'hide') {
            $('.widgetBody').removeClass('widgetLoading');
            $('.widgetBody .spinner').remove();
        }
    },

    error: function(message) {
        $('.widgetBody').append(`<div class="widgetError">${message}</div>`);
    },

    call: function() {
        let cfg = ConfigHelper.get();
        let discordRequest = DiscordHelper.request(cfg.serverId);

        //$('.widgetFooter').fadeOut();
        //$('.widgetLogo, .widgetBtnConnect').removeAttr('href');
        $('.widgetError, .widgetTitle, .widgetMember-s').remove();

        discordRequest.done(function(data) {
            let community = `<div class="widgetTitle">${data.name}</div>`;

            /* Disable by policy 4.6.1 [https://dev.twitch.tv/docs/extensions/guidelines-and-policies]
            if (data.instant_invite) {
                $('.widgetLogo, .widgetBtnConnect').attr('href', data.instant_invite);
                $('.widgetFooter').fadeIn();
            }
            */

            $('.widgetHeaderCount').html(`<strong>${data.presence_count}</strong> Member${data.presence_count > 1 ? 's' : ''} Online`);

            for (var i in data.members) {
                let member = data.members[i];
                let userGame = (member.game ? `<span class="widgetMemberGame">${member.game.name}</span>` : '');
                let userStatus = member.status;

                userStatus = (userStatus.charAt(0).toUpperCase() + userStatus.slice(1));

                community += `<div class="widgetMember-s">
                                    <div class="widgetMemberAvatar">
                                        <img alt="" src="${member.avatar_url}">
                                        <span class="widgetMemberStatus widgetMemberStatus${userStatus}"></span>
                                    </div>
                                    <span class="widgetMemberName">${member.username}</span>
                                    ${userGame}
                                </div>`;
            }

            if (community != "") {
                $('.widgetBody').append(community);
            }
        }).fail(function(xhr) {
            let response = xhr.responseJSON;
            let error = (response && response.hasOwnProperty('message') ? `${response.message} (#${response.code})` : 'Unknown error!');
            PanelController.error(error);
        }).always(function() {
            PanelController.loader('hide');
        });

        return discordRequest;
    }
};