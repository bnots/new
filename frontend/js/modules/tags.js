import 'style.sass';


import template from 'content/tags';
import dropdowntmp from 'content/projects-dropdown.haml';

var main = document.querySelector("main");
main.innerHTML = template;

var dropdownContainer = document.querySelector(".projects-dropdown__box");

dropdownContainer.innerHTML = dropdowntmp;

var dropdown = document.querySelector(".projects-dropdown__title");
var dropdownlist = document.querySelector(".projects-dropdown__list");

dropdown.addEventListener( "click" , function() {
    this.classList.toggle( "opened" );
    dropdownlist.classList.toggle( "hidden" )
});