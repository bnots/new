import 'style.sass';
import template from 'content/search';

var main = document.querySelector("main");
main.innerHTML = template;

var tabsMenu = document.querySelector(".search-results");

import searchProj from 'content/search-projects';

tabsMenu.innerHTML = searchProj;