const menu = document.getElementById('mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    
    menuLinks.classList.toggle('active');
});

function goToPagePadel() {
    window.location.href = "teachers.html";
}

function goToPageTennis(){
    window.location.href = "teachers.html";
}