import 'style.sass';

import indextemplate from 'content/index.haml';

var main = document.querySelector("main");


let moduleName = location.pathname.slice(1, -5);

if(moduleName){
    let route = require('./modules/' + moduleName + '.js');
} else {
    main.innerHTML = indextemplate;
}

function getRandomNum() {
    return Math.round( Math.random() * (100 - 2) + 1 );
}
const userPickContainers = document.querySelectorAll( 'img' );
for(let img of userPickContainers) {
    let gender = getRandomNum() % 2 ? 'women' : 'men';
    let imgUrl = `https://randomuser.me/api/portraits/${gender}/${getRandomNum()}.jpg`;
    img.setAttribute('src', imgUrl);
}