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
        PanelController.timer();
    },

    timer: function() {
        let interval = 15 * (1000 * 60);

        setInterval(() => {
            PanelController.call();
        }, interval);
    },

    call: function() {
        let discordRequest = DiscordHelper.request();

        discordRequest.done(function(data) {
            let membersContent = "";

            if (data.instant_invite) {
                $('.widgetLogo, .widgetBtnConnect').attr('href', data.instant_invite);
            }

            $('.widgetHeaderCount').html(`<strong>${data.presence_count}</strong> Members Online`);

            for (var i in data.members) {
                let member = data.members[i];
                let status = member.status;

                status = (status.charAt(0).toUpperCase() + status.slice(1));

                membersContent += `<div class="widgetMember-s">
                                        <div class="widgetMemberAvatar">
                                            <img alt="" src="${member.avatar_url}">
                                            <span class="widgetMemberStatus widgetMemberStatus${status}"></span>
                                        </div>
                                        <span class="widgetMemberName">${member.username}</span>
                                        <!--<span class="widgetMemberGame">VALORANT</span>-->
                                    </div>`;
            }

            if (membersContent != "") {
                $('.widgetBody').append('<div>' + membersContent + '</div>');
            }

        }).fail(function(xhr) {
            console.log(xhr.responseJSON);
        });

        return discordRequest;
    }
};