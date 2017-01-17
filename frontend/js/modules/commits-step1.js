import template from 'content/commits-step1.haml';

var main = document.querySelector("main");

main.innerHTML = template;

var dropdown = document.querySelector(".branch-select__main");
var dropdownlist = document.querySelector(".branch-select__list");
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
            newli.innerHTML = dropdown.innerHTML;
            newli.className = 'projects-dropdown__item';
            dropdownlist.replaceChild(newli, target);
            dropdown.innerHTML = target.innerHTML

        }
        target = target.parentNode;
    }

});