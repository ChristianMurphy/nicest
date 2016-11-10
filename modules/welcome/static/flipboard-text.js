document.addEventListener('DOMContentLoaded', function onPageLoad () {
    'use strict';

    $('.shape').shape('flip up');

    setInterval(function displayNextText () {
        $('.shape').shape('flip up');
    }, 10000);
});
