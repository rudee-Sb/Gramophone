// GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.custom_cursor');
const ripple = document.querySelector('.ripple');
const slider = document.querySelector('.slider');
const list = document.querySelector('.list');
const albums = document.querySelectorAll('.list .albums');
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let count = albums.length;
let active = 1;
let left_transform = 0;
let width_item = albums[active].offsetWidth;
const canvas = document.querySelector('.btn_bg');
const ctx = canvas.getContext("2d");
const containers = document.querySelector('.btn_cont');
let width = canvas.width = containers.offsetWidth;
let height = canvas.height = containers.offsetHeight;

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

// slider logic
next.onclick = () => {
    active = active >= count - 1 ? count - 1 : active + 1;
    run_carousel();
}

prev.onclick = () => {
    active = active <= 0 ? 0 : active - 1;
    run_carousel();
}

function run_carousel() {
    prev.style.display = active == 0 ? 'none' : 'block';
    next.style.display = active == count - 1 ? 'none' : 'block';

    let old_active = document.querySelector('.albums.active');
    if (old_active) old_active.classList.remove('active');

    albums[active].classList.add('active');
    left_transform = width_item * (active - 1) * - 1;

    list.style.transform = `translateX(${left_transform}px)`;
}
run_carousel();

// btn wave logic
width = canvas.width = containers.offsetWidth;
height = canvas.height = containers.offsetHeight;

window.addEventListener('resize', () => {
    width = canvas.width = containers.offsetWidth;
    height = canvas.height = containers.offsetHeight;
});

function draw_waves(step) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 1;

    const line_count = 10;

    for (let i = 0; i < line_count; i++) {
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
            let y = Math.sin((x + step + i * 15) * 0.05) * 5 + i * (height / line_count);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
}

function animate_waves() {
    wave_step += 1.3;
    if (animate) draw_waves(wave_step);
    requestAnimationFrame(animate_waves); // Always call
}
animate_waves();

containers.addEventListener('mouseenter', () => {
    animate = true;
    gsap.to(".btn_bg", {
        opacity: 1,
        duration: 0.5
    });
    animate_waves();
});

containers.addEventListener('mouseleave', () => {
    animate = false;
    gsap.to(".btn_bg", {
        opacity: 0,
        duration: 0.5
    });
});

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

// Animation loop
function animateFooterWaves() {
    footer_wave_step += 2;
    drawFooterWaves(footer_wave_step);
    requestAnimationFrame(animateFooterWaves);
}

animateFooterWaves();
