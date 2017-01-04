import 'style.sass';


import template from 'content/tags';

var main = document.querySelector("main");
main.innerHTML = template;


import dropdowntmp from 'content/projects-dropdown.haml';

var dropdownContainer = document.querySelector(".tags__projects-dropdown");
dropdownContainer.innerHTML = dropdowntmp;

var dropdown = document.querySelector(".projects-dropdown__title");
var dropdownlist = document.querySelector(".projects-dropdown__list");
dropdown.addEventListener( "click" , function() {
    this.classList.toggle( "opened" );
    dropdownlist.classList.toggle( "hidden" )
});