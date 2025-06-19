gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.custom_cursor');
const ripple = document.querySelector('.ripple');
const mag_btns = document.querySelectorAll('.magnet_btn');

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

// slide in animation for album text
gsap.from(".stagr", {
    y: 100,
    opacity: 0,
    duration: 0.6,
    stagger: 0.5,
})

// magnetic effect for buttons
document.addEventListener('mousemove', (e) => {
    let attracted = false;

    mag_btns.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const btnCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        const distx = e.clientX - btnCenter.x;
        const disty = e.clientY - btnCenter.y;
        const distance = Math.sqrt(distx ** 2 + disty ** 2);

        if (distance < 100) {
            attracted = true;
            gsap.to(cursor, {
                x: btnCenter.x,
                y: btnCenter.y,
                scale: 1.5,
                borderColor: "#c85223",
                duration: 0.3,
                ease: "power2.out"
            });
        }

        if (!attracted) {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                scale: 1,
                duration: 0.2,
                borderColor: "#fff",
                ease: "power2.out"
            });
        }
    });
})

// fade in/out for tracklist section
gsap.to(".tracklist_sec", {
    scrollTrigger: {
        trigger: ".tracklist_sec",
        scroller: "body",
        start: "top 70%",
        end: "top 10%",
        scrub: true,
    },
    opacity: 1,
    y: 0,
    duration: 3,
    ease: "power4.out"
});

// rotating vinyl on scrolling tracklist
let last_scroll_top = 0;
let current_rot = 0;

document.querySelector(".right .list").addEventListener('scroll', function (e) {
    let scroll_top = this.scrollTop;
    let scroll_dir = scroll_top > last_scroll_top ? 1 : -1;

    current_rot += 10 * scroll_dir;

    gsap.to(".vinyl", {
        rotation: current_rot,
        duration: 0.3,
        ease: "power1.out",
    })

    last_scroll_top = scroll_top;
})

// opening tracks and album in spotify web
document.addEventListener('DOMContentLoaded', () => {
    const play_btns = document.querySelectorAll('.play');

    play_btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-url');
            window.open(url, '_blank');
        })
    })
});

function home() {
    window.location.href = "index.html"
}