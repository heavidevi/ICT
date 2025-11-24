gsap.registerPlugin(ScrollTrigger);

let speed = 100;
let height = document.querySelector("svg").getBBox().height;
//let svgCord = screenToSVG(document.querySelector("svg"), window.innerWidth / 2, window.innerHeight / 2);

gsap.set("#h2-1", { opacity: 0 });
gsap.set("#bg_grad", { attr: { cy: "-50" } });
gsap.set(["#dinoL", "#dinoR"], { y: 80 });
gsap.set("#dinoL", { x: -10 });

const mm = gsap.matchMedia();
mm.add("(max-width: 1922px)", () => {
    gsap.set(["#cloudStart-L", "#cloudStart-R"], { x: 10, opacity: 1 });
});

/*  SCENE 1 */
let scene1 = gsap.timeline();
ScrollTrigger.create({
    animation: scene1,
    trigger: ".scrollElement",
    start: "top top",
    end: "45% 100%",
    scrub: 3
});

// hills animation
scene1.to("#h1-1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in" }, 0);
scene1.to("#h1-2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in" }, 0);
scene1.to("#h1-3", { y: 1.7 * speed, x: 1.2 * speed }, 0.03);
scene1.to("#h1-4", { y: 3 * speed, x: 1 * speed }, 0.03);
scene1.to("#h1-5", { y: 2 * speed, x: 1 * speed }, 0.03);
scene1.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed }, 0);
scene1.to("#h1-7", { y: 5 * speed, x: 1.6 * speed }, 0);
scene1.to("#h1-8", { y: 3.5 * speed, x: 0.2 * speed }, 0);
scene1.to("#h1-9", { y: 3.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudsBig-L", { y: 4.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudsBig-R", { y: 4.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudStart-L", { x: -300 }, 0);
scene1.to("#cloudStart-R", { x: 300 }, 0);

//animate text
scene1.to("#info", { y: 8 * speed }, 0);

// Hello text fade up animation
gsap.to("#info-text", {
    opacity: 0,
    y: -50,
    scrollTrigger: {
        trigger: ".scrollElement",
        start: "top top",
        end: "500 top",
        scrub: 2
    }
});

/*   about me  */
gsap.fromTo(
    "#aboutme",
    { opacity: 1, x: 700, y: 350 }, // start near mid-bottom right
    {
        x: 700,                      // keep x constant for a straight vertical line
        y: -150,                     // end near top middle-right
        ease: "none",                // no easing -> tight straight motion
        scrollTrigger: {
            trigger: ".scrollElement",
            start: "15% top",
            end: "60% 100%",
            scrub: 4,
            onEnter: function () {
                gsap.set("#aboutme", { rotation: 0, scaleX: 1 });
            },
            onLeave: function () {
                gsap.set("#aboutme", { rotation: 0, scaleX: 1 });
            }
        }
    }
);

/* Clouds  */
let clouds = gsap.timeline();
ScrollTrigger.create({
    animation: clouds,
    trigger: ".scrollElement",
    start: "top top",
    end: "70% 100%",
    scrub: 1
});

clouds.to("#cloud1", { x: 500 }, 0);
clouds.to("#cloud2", { x: 1000 }, 0);
clouds.to("#cloud3", { x: -1000 }, 0);
clouds.to("#cloud4", { x: -700, y: 25 }, 0);




/*   SCENE 2  */
let scene2 = gsap.timeline();
ScrollTrigger.create({
    animation: scene2,
    trigger: ".scrollElement",
    start: "15% top",
    end: "40% 100%",
    scrub: 3
});

scene2.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0);
scene2.fromTo("#h2-2", { y: 500 }, { y: 0 }, 0.1);
scene2.fromTo("#h2-3", { y: 700 }, { y: 0 }, 0.1);
scene2.fromTo("#h2-4", { y: 700 }, { y: 0 }, 0.2);
scene2.fromTo("#h2-5", { y: 800 }, { y: 0 }, 0.3);
scene2.fromTo("#h2-6", { y: 900 }, { y: 0 }, 0.3);




/* Transition (from Scene2 to Scene3) */
gsap.set("#scene3", { y: height - 40, visibility: "visible" });
let sceneTransition = gsap.timeline();
ScrollTrigger.create({
    animation: sceneTransition,
    trigger: ".scrollElement",
    start: "60% top",
    end: "bottom 100%",
    scrub: 3
});

sceneTransition.to("#h2-1", { y: -height - 100, scale: 1.5, transformOrigin: "50% 50%" }, 0);
sceneTransition.to("#bg_grad", { attr: { cy: "-80" } }, 0.0);
sceneTransition.to("#bg2", { y: 0 }, 0);

/* Scene 3 */
let scene3 = gsap.timeline();
ScrollTrigger.create({
    animation: scene3,
    trigger: ".scrollElement",
    start: "70% 50%",
    end: "bottom 100%",
    scrub: 3
});

//Hills motion
scene3.fromTo("#h3-1", { y: 300 }, { y: -550 }, 0);
scene3.fromTo("#h3-2", { y: 800 }, { y: -550 }, 0.03);
scene3.fromTo("#h3-3", { y: 600 }, { y: -550 }, 0.06);
scene3.fromTo("#h3-4", { y: 800 }, { y: -550 }, 0.09);
scene3.fromTo("#h3-5", { y: 1000 }, { y: -550 }, 0.12);

//stars
scene3.fromTo("#stars", { opacity: 0 }, { opacity: 0.5, y: -500 }, 0);

// Scroll Back text
scene3.fromTo("#arrow2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.25);
scene3.fromTo("#text2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.3);
scene3.to("footer", { opacity: 1 }, 0.3);

//gradient value change
scene3.to("#bg2-grad", { attr: { cy: 600 } }, 0);
scene3.to("#bg2-grad", { attr: { r: 500 } }, 0);

/*   falling star   */
gsap.set("#fstar", { y: -400 });
let fstarTL = gsap.timeline();
ScrollTrigger.create({
    animation: fstarTL,
    trigger: ".scrollElement",
    start: "4200 top",
    end: "6000 bottom",
    scrub: 2,
    onEnter: function () {
        gsap.set("#fstar", { opacity: 1 });
    },
    onLeave: function () {
        gsap.set("#fstar", { opacity: 0 });
    }
});
fstarTL.to("#fstar", { x: -700, y: -250, ease: "power2.out" }, 0);

/* Hide SVG when animation is complete */
ScrollTrigger.create({
    trigger: ".animation-container",
    start: "bottom bottom",
    onEnter: function() {
        gsap.to(".animation-svg", { opacity: 0, duration: 1, ease: "power2.out" });
        gsap.set(".animation-svg", { pointerEvents: "none" });
    },
    onLeaveBack: function() {
        gsap.to(".animation-svg", { opacity: 1, duration: 1, ease: "power2.out" });
        gsap.set(".animation-svg", { pointerEvents: "auto" });
    }
});

gsap.fromTo("#stars path:nth-of-type(1)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.8 });
gsap.fromTo("#stars path:nth-of-type(3)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.8 });
gsap.fromTo("#stars path:nth-of-type(5)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1 });
gsap.fromTo("#stars path:nth-of-type(8)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.2 });
gsap.fromTo("#stars path:nth-of-type(11)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.5 });
gsap.fromTo("#stars path:nth-of-type(15)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 2 });
gsap.fromTo("#stars path:nth-of-type(17)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.1 });
gsap.fromTo("#stars path:nth-of-type(18)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.4 });
gsap.fromTo("#stars path:nth-of-type(25)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.1 });
gsap.fromTo("#stars path:nth-of-type(28)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.9 });
gsap.fromTo("#stars path:nth-of-type(30)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.3 });
gsap.fromTo("#stars path:nth-of-type(35)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 2 });
gsap.fromTo("#stars path:nth-of-type(40)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.8 });
gsap.fromTo("#stars path:nth-of-type(45)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.8 });
gsap.fromTo("#stars path:nth-of-type(48)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1 });

/* Content Sections Animation - appear after scroll animation */
// Set initial state for content sections
gsap.set(".content-section", { 
    opacity: 1,
    visibility: "visible"
});

// Individual content section animations
gsap.set("#about-section .skill-item", { opacity: 0, scale: 0.8, y: 30 });
gsap.set("#projects-section .project-card", { opacity: 0, scale: 0.9, y: 50 });

ScrollTrigger.create({
    trigger: "#about-section",
    start: "top 80%",
    toggleActions: "play none none reverse",
    animation: gsap.to("#about-section .skill-item", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.7)"
    })
});

ScrollTrigger.create({
    trigger: "#projects-section",
    start: "top 80%",
    toggleActions: "play none none reverse", 
    animation: gsap.to("#projects-section .project-card", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
    })
});

//reset scrollbar position after refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// function screenToSVG(svg, x, y) {
//     var pt = svg.createSVGPoint();
//     pt.x = x;
//     pt.y = y;
//     var cursorPt = pt.matrixTransform(svg.getScreenCTM().inverse());
//     return { x: Math.floor(cursorPt.x), y: Math.floor(cursorPt.y) }
// }

/* Custom Cursor Animation */
const cursor = document.querySelector('.cursor');
let cursorX = 0;
let cursorY = 0;
let cursorOpacity = 0;

// Initialize cursor position and opacity
gsap.set(cursor, { 
    xPercent: -50, 
    yPercent: -50,
    opacity: 0
});

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorOpacity = 1;
    
    // Smooth cursor animation with GSAP
    gsap.to(cursor, {
        left: cursorX,
        top: cursorY,
        opacity: cursorOpacity,
        duration: 0.05,
        ease: "power2.out"
    });
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Show cursor when mouse enters window
document.addEventListener('mouseenter', () => {
    gsap.to(cursor, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Hover effects for interactive elements
const hoverElements = document.querySelectorAll('a, button, .nav__link, .home__social-icon, .about__social-icon, .work__img, .contact__input, .contact__button, .skills__name, .project-card, .skill-item');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        gsap.to(cursor, {
            scale: 1.5,
            duration: 0.15,
            ease: "back.out(2)"
        });
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        gsap.to(cursor, {
            scale: 1,
            duration: 0.15,
            ease: "back.out(2)"
        });
    });
});

// Handle clicks with cursor animation
document.addEventListener('click', () => {
    gsap.to(cursor, {
        scale: 0.8,
        duration: 0.05,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });
});
