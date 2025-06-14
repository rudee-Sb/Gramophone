// GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.custom_cursor');
const ripple = document.querySelector('.ripple');

// Ripple effect forcustom cursor
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.15,
        ease: "power2.out"
    });
});

document.addEventListener('click', () => {
    gsap.fromTo(ripple,
        { scale: 0, opacity: 0.6 },
        { scale: 2.5, opacity: 0, duration: 0.5, ease: "power1.out" }
    );
});


// Turbulence animation
let noise = 0;
function animateDistortion() {
    noise += 0.02;
    const freq = 0.03 + Math.abs(Math.sin(noise)) * 0.03;
    document.querySelector('feTurbulence').setAttribute('baseFrequency', freq.toFixed(4));
    requestAnimationFrame(animateDistortion);
}
animateDistortion();

// FADE IN for hero
gsap.to(".hero_sec", {
    scrollTrigger: {
        trigger: ".hero_sec",
        start: "top top",
        end: "bottom center",
        scrub: true,
    },
    opacity: 0,
    y: -150,
    ease: "none"
});
