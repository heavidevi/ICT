/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset
    
    // Only activate nav highlighting after scroll animation is complete
    // Animation area is ~6000px, so only start nav highlighting after that
    if (scrollY < 5500) {
        // Remove all active links during scroll animation
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active-link');
        });
        return;
    }

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        // Skip the animation container section
        if (sectionId === 'home' && current.classList.contains('animation-container')) {
            return;
        }

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');
            if (navLink) {
                navLink.classList.add('active-link');
            }
        }else{
            const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');
            if (navLink) {
                navLink.classList.remove('active-link');
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__data, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== CREEPY BUTTON FUNCTIONALITY =====*/
class CreepyButton {
    constructor(buttonElement) {
        this.button = buttonElement;
        this.eyesContainer = buttonElement.querySelector('.creepy-btn__eyes');
        this.pupils = buttonElement.querySelectorAll('.creepy-btn__pupil');
        this.eyeCoords = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        // Add mouse/touch move listeners
        this.button.addEventListener('mousemove', (e) => this.updateEyes(e));
        this.button.addEventListener('touchmove', (e) => this.updateEyes(e));
        
        // Handle click for home button
        if (this.button.id === 'home-creepy-btn') {
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        }
    }
    
    updateEyes(e) {
        const userEvent = e.touches ? e.touches[0] : e;
        
        // Get the center of the eyes container and cursor location
        const eyesRect = this.eyesContainer.getBoundingClientRect();
        const eyes = {
            x: eyesRect.left + eyesRect.width / 2,
            y: eyesRect.top + eyesRect.height / 2
        };
        const cursor = {
            x: userEvent.clientX,
            y: userEvent.clientY
        };
        
        // Calculate the eye angle
        const dx = cursor.x - eyes.x;
        const dy = cursor.y - eyes.y;
        const angle = Math.atan2(-dy, dx) + Math.PI / 2;
        
        // Calculate pupil distance from eye center
        const visionRangeX = 180;
        const visionRangeY = 75;
        const distance = Math.hypot(dx, dy);
        const x = Math.sin(angle) * distance / visionRangeX;
        const y = Math.cos(angle) * distance / visionRangeY;
        
        this.eyeCoords = { x, y };
        
        // Apply transform to pupils
        const translateX = `${-50 + this.eyeCoords.x * 50}%`;
        const translateY = `${-50 + this.eyeCoords.y * 50}%`;
        
        this.pupils.forEach(pupil => {
            pupil.style.transform = `translate(${translateX}, ${translateY})`;
        });
    }
}

// Initialize all creepy buttons
document.addEventListener('DOMContentLoaded', () => {
    const creepyButtons = document.querySelectorAll('.creepy-btn');
    creepyButtons.forEach(button => {
        new CreepyButton(button);
    });
});

/*===== PORTFOLIO FILTER FUNCTIONALITY =====*/
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.work__filter-btn');
    const workItems = document.querySelectorAll('.work__item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            workItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

/*===== PORTFOLIO ANIMATIONS =====*/
// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .work__item {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);
