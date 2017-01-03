import 'style.sass';

import indextemplate from 'content/index.haml';

var main = document.querySelector("main");


let moduleName = location.pathname.slice(1, -5);

if(moduleName){
    let route = require('./modules/' + moduleName + '.js');
} else {
    main.innerHTML = indextemplate;
}

