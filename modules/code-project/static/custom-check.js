$('.ui.checkbox').checkbox();
window.taigaCheckbox = $('input[name=useTaiga]');
window.taigaDescription = $('input[name=description]');

window.taigaCheckbox.change(function changeListener () {
    'use strict';
    window.taigaDescription.prop('required', window.taigaCheckbox.is(':checked'));
});
