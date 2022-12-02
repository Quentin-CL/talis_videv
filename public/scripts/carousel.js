// Fonction permettant de créér le carrousel avec Slick
function activateCarousel(classes) {
    for (const c of classes) {
        $(c).slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
}

// Fonction permettant d'afficher les informations des series au passage de la souris
function tvShowHover() {
    const carouselContents = document.querySelectorAll(".carousel-content");
    const carouselContentsHover = document.querySelectorAll(".carousel-content-hover")
    const slickSliders = document.querySelectorAll('.slick-slider')
    carouselContents.forEach((carouselContent, i) => {
        carouselContent.addEventListener('mouseenter', () => {
            carouselContentsHover[i].classList.remove("display-none")
        });
        carouselContent.addEventListener('mouseleave', () => {
            carouselContentsHover[i].classList.add("display-none")
        });
    })
    slickSliders.forEach((slickSlider, i) => {
        slickSlider.style.zIndex = slickSliders.length - i
    })

}
activateCarousel([".carousel"])
tvShowHover()