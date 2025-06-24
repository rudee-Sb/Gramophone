// GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.custom_cursor');
const ripple = document.querySelector('.ripple');

// Ripple effect for custom cursor
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

function home() {
    window.location.href = "index.html"
}

// slide in for list items
window.addEventListener("DOMContentLoaded", () => {
    gsap.fromTo(".item",
        { x: 100, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.2
        }
    );
});

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            x: 15,
            duration: 0.1,
            ease: "power1.out"
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            x: 0,
            duration: 0.1,
            ease: "power1.out"
        });
    });
});

// left right movement of leftbg based on cursor movement
const innerImg = document.querySelector('.inner_img');

window.addEventListener("mousemove", (e) => {
    const xRatio = e.clientX / window.innerWidth;
    const maxShift = 30; 

    const moveX = (xRatio - 0.5) * 2 * maxShift;

    innerImg.style.transform = `translateX(calc(-50% + ${moveX}px))`;
});
