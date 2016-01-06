$('select#course').dropdown({
    action: function changeSearch (text, value) {
        'use strict';
        var current = window.location.search;
        var currentType = (/type=[0-9a-z]+/).exec(current);

        if (currentType) {
            window.location.search = '?' + currentType + '&course=' + value;
        } else {
            window.location.search = '?type=individual&course=' + value;
        }
    }
});
