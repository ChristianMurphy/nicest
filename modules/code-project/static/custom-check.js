$('.ui.checkbox').checkbox();
window.taigaCheckbox = $('input[name=useTaiga]');
window.taigaDescription = $('input[name=description]');

window
    .taigaCheckbox
    .change(function changeListener () {
        'use strict';

        window
            .taigaDescription
            .prop(
                'required',
                window
                    .taigaCheckbox
                    .is(':checked')
            );
    });

window.slackCheckbox = $('input[name=useSlack]');
window.slackAccessToken = $('input[name=accessToken]');

window
    .slackCheckbox
    .change(function changeListener () {
        'use strict';

        window
            .slackAccessToken
            .prop(
                'required',
                window
                    .slackCheckbox
                    .is(':checked')
            );
    });
