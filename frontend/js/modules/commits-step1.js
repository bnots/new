import template from 'content/commits-step1.haml';

var main = document.querySelector("main");

main.innerHTML = template;

var dropdown = document.querySelector(".branch-select");
var dropdownlist = document.querySelector(".branch-select__list");
var dropdownmain = document.querySelector(".branch-select__main");
dropdown.addEventListener( "click" , function() {
    this.classList.toggle( "opened" );
    dropdownlist.classList.toggle( "hidden" )
});


dropdownlist.addEventListener( "click" , function(event) {
    var target = event.target;

    while (target != dropdownlist) {
        if (target.tagName === 'LI') {
            console.log(target);
            var newli = document.createElement('li');
            newli.innerHTML = dropdownmain.innerHTML;
            newli.className = 'branch-select__item';
            dropdownlist.replaceChild(newli, target);
            dropdownmain.innerHTML = target.innerHTML

        }
        target = target.parentNode;
    }

});