/* Smooth scroll */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

    });
});


/* Navbar shadow on scroll */

window.addEventListener("scroll", function () {

    let navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }

});

var slider = document.querySelector('#bannerSlider');

var carousel = new bootstrap.Carousel(slider, {
  interval: 3000,
  ride: 'carousel'
});

