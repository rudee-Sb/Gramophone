
// GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.custom_cursor');
const ripple = document.querySelector('.ripple');



let wave_step = 0;
let animate = false;

const footer_canvas = document.querySelector('.footer_wave');
const footerCtx = footer_canvas.getContext('2d');
let footer_wave_step = 0;

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
        end: "bottom center-=20",
        scrub: true,
    },
    opacity: 0,
    y: -150,
    ease: "none"
});

function animateFooterWave() {
    drawFooterWaves(footer_wave_step);
    footer_wave_step += 1.6; 
    requestAnimationFrame(animateFooterWave);
}
animateFooterWave();

// Set canvas size
function resizeFooterCanvas() {
    footer_canvas.width = footer_canvas.offsetWidth;
    footer_canvas.height = footer_canvas.offsetHeight;
}
resizeFooterCanvas();
window.addEventListener('resize', resizeFooterCanvas);

// Footer wave drawing
function drawFooterWaves(step) {
    footerCtx.clearRect(0, 0, footer_canvas.width, footer_canvas.height);
    footerCtx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    footerCtx.lineWidth = 1;

    const lineCount = 10;
    const width = footer_canvas.width;
    const height = footer_canvas.height;

    for (let i = 0; i < lineCount; i++) {
        footerCtx.beginPath();
        for (let x = 0; x < width; x++) {
            let y = Math.sin((x + step + i * 15) * 0.05) * 5 + i * (height / lineCount);
            footerCtx.lineTo(x, y);
        }
        footerCtx.stroke();
    }
}

// horizontal scroll animation
const scrollText = document.querySelector(".scroll_wrapper");
const textWidth = scrollText.scrollWidth;

gsap.to(".scroll_wrapper", {
    x: -textWidth + window.innerWidth,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".scroll_sec",
        start: "top top",
        end: "+=" + textWidth,
        scrub: 2,
        pin: true,
    }
});

const overlays = [
    { id: "#album1", rotation: 180, x: 100, y: -80, scrub: 1.5 },
    { id: "#album2", rotation: -270, x: -120, y: 100, scrub: 2 },
    { id: "#album3", rotation: 360, x: 60, y: -100, scrub: 3 },
    { id: "#album4", rotation: -180, x: -80, y: 60, scrub: 1 }
];

overlays.forEach(({ id, rotation, x, y, scrub }) => {
    gsap.to(id, {
        rotation,
        x,
        y,
        opacity: 0.01,
        scrollTrigger: {
            trigger: ".scroll_sec",
            start: "top top",
            end: "+=" + textWidth,
            scrub,
        }
    });

    gsap.fromTo(id,
        { opacity: 0 },
        {
            opacity: 1,
            scrollTrigger: {
                trigger: ".scroll_sec",
                start: "top center",
                end: "center center",
                scrub: true,
            }
        }
    );
});

// fade-in for card section
gsap.set(".cards", {
    opacity: 0,
    y: 100
});

gsap.to(".cards", {
    scrollTrigger: {
        trigger: ".cards_sec",
        scroller: "body",
        start: "top 50%",
        end: "top 10%",
        scrub: true,
    },
    opacity: 1,
    y: 0,
    ease: "power4.out"
});


// rotate vinyl on card mouseenter and stop on leave
document.querySelectorAll('.cards').forEach(card => {
    const img = card.querySelector('img');

    card.addEventListener('mouseenter', () => {
        gsap.to(img, {
            rotate: 360,
            duration: 2,
            repeat: -1,
            ease: "power1.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(img, {
            rotate: 0,
            duration: 1,
            ease: "power1.inOut"
        });
    });
})