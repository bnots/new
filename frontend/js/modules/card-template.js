import 'style.sass';

import template from 'templates/card-template.haml';

var main = document.querySelector("main");

main.innerHTML = template;


$('.bookmark').click(function() {
    $(this).toggleClass('bookmark--active');
});