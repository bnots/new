import 'style.sass';


import template from 'content/search';

var main = document.querySelector("main");
main.innerHTML = template;


import searchProjTemp from 'content/search-projects';

var tabsMenu = document.querySelector(".search-results");
tabsMenu.innerHTML = searchProjTemp;