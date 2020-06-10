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
            PanelController.call();
        }, interval);
    },

    call: function() {
        let cfg = ConfigHelper.get();
        let discordRequest = DiscordHelper.request(cfg.serverId);

        discordRequest.done(function(data) {
            let membersContent = "";

            /*
            if (data.instant_invite) {
                $('.widgetLogo, .widgetBtnConnect').attr('href', data.instant_invite);
            }
            */

            $('.widgetHeaderCount').html(`<strong>${data.presence_count}</strong> Member${data.presence_count > 1 ? 's' : ''} Online`);

            for (var i in data.members) {
                let member = data.members[i];
                let game = (member.game ? `<span class="widgetMemberGame">${member.game.name}</span>` : '');
                let status = member.status;

                status = (status.charAt(0).toUpperCase() + status.slice(1));

                membersContent += `<div class="widgetMember-s">
                                        <div class="widgetMemberAvatar">
                                            <img alt="" src="${member.avatar_url}">
                                            <span class="widgetMemberStatus widgetMemberStatus${status}"></span>
                                        </div>
                                        <span class="widgetMemberName">${member.username}</span>
                                        ${game}
                                    </div>`;
            }

            if (membersContent != "") {
                $('.widgetMember-s').parent('div').remove();
                $('.widgetBody').append('<div>' + membersContent + '</div>');
            }

        }).fail(function(xhr) {
            let response = xhr.responseJSON;
            let error = `${response.message} (#${response.code})`;
        });

        return discordRequest;
    }
};