gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.custom_cursor');
const ripple = document.querySelector('.ripple');
const mag_btns = document.querySelectorAll('.magnet_btn');

// Ripple effect forcustom cursor
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.3,
        ease: "power4.out"
    });
});

document.addEventListener('click', () => {
    gsap.fromTo(ripple,
        { scale: 0, opacity: 0.6 },
        { scale: 2.5, opacity: 0, duration: 0.5, ease: "power1.out" }
    );
});

// loading hero section svg
fetch("assets/media/images/4diwari.svg")
    .then(res => res.text())
    .then(data => {
        document.querySelector(".svg_cont").innerHTML = data;
    });

// text stagger-in / hero title
window.addEventListener("DOMContentLoaded", () => {
    gsap.fromTo(".line",
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.2,
            delay: 1
        }
    );
});

// fade-in for album_sec 
gsap.to(".album_sec", {
    scrollTrigger: {
        trigger: ".album_sec",
        scroller: "body",
        start: "top 67%",
        end: "bottom center-=20",
        scrub: true,
        markers: false
    },
    opacity: 1,
    duration: 1,
    ease: "power1.out",
    y: -100
})

function home() {
    window.location.href = "index.html"
}