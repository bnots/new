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

//var dropdownli = document.querySelectorAll(".projects-dropdown__item");


dropdownlist.addEventListener( "click" , function(event) {
    var target = event.target;
    // if (target.tagName === 'LI') {
    //     console.log(target);
    // } else {
    //     target = target.parentNode;
    //     console.log(target);
    // }

    while (target != dropdownlist) {
        if (target.tagName === 'LI') {
            console.log(target);
            var newli = document.createElement('li');
            newli.innerHTML = dropdown.innerHTML;
            newli.className = 'projects-dropdown__item';
            dropdownlist.replaceChild(newli, target);
            dropdown.innerHTML = target.innerHTML

        }
        target = target.parentNode;
    }

});