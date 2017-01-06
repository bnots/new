import 'style.sass';
import template from 'content/search';

var main = document.querySelector("main");
main.innerHTML = template;

var tabsMenu = document.querySelector(".search-results");

import search from 'content/search-direct-messages';

tabsMenu.innerHTML = search;