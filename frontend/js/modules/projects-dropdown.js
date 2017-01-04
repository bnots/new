import 'style.sass';


import template from 'content/projects-dropdown';

var main = document.querySelector("main");
main.innerHTML = template;

var dropdown = document.querySelector(".projects-dropdown__title");
var dropdownlist = document.querySelector(".projects-dropdown__list");
dropdown.addEventListener( "click" , function() {
    this.classList.toggle( "opened" );
    dropdownlist.classList.toggle( "hidden" )
});