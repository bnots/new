import dropdowntmp from 'content/projects-dropdown.haml';

var dropdownContainer = document.querySelector(".projects-dropdown__box");
dropdownContainer.innerHTML = dropdowntmp;

var dropdown = document.querySelector(".projects-dropdown__title");
var dropdownlist = document.querySelector(".projects-dropdown__list");

dropdown.addEventListener( "click" , function() {
    this.classList.toggle( "opened" );
    dropdownlist.classList.toggle( "hidden" )
});


dropdownlist.addEventListener( "click" , function(event) {
    var target = event.target;
console.log(clicked);
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