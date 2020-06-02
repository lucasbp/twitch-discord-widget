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
            let membersContent = "";

            if (data.instant_invite) {
                $('.widgetLogo, .widgetBtnConnect').attr('href', data.instant_invite);
            }

            $('.widgetHeaderCount').html(`<strong>${data.presence_count}</strong> Members Online`);

            for (var i in data.members) {
                let status = data.members[i].status;

                status = (status.charAt(0).toUpperCase() + status.slice(1));

                membersContent += `<div class="widgetMember-s">
                                        <div class="widgetMemberAvatar">
                                            <img alt="" src="${data.members[i].avatar_url}">
                                            <span class="widgetMemberStatus widgetMemberStatus${status}"></span>
                                        </div>
                                        <span class="widgetMemberName">${data.members[i].username}</span>
                                        <span class="widgetMemberGame">VALORANT</span>
                                    </div>`;
            }

            if (membersContent != "") {
                $('.widgetBody').append('<div>' + membersContent + '</div>');
            }

        }).fail(function(xhr) {
            console.log(xhr.responseJSON);
        });
    }
};