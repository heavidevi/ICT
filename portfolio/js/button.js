/**
 * ROBUST Creepy Button with Eye-tracking Animation
 * Creates an interactive button with eyes that follow the cursor
 */

class CreepyButton {
    constructor(element) {
        if (!element) {
            console.warn('CreepyButton: No element provided');
            return;
        }
        
        this.button = element;
        this.eyesContainer = null;
        this.pupils = [];
        this.isActive = true;
        
        try {
            this.init();
        } catch (error) {
            console.error('CreepyButton initialization error:', error);
            this.fallbackButton();
        }
    }

    init() {
        // Create button structure
        this.createButtonStructure();
        this.bindEvents();
    }
    
    fallbackButton() {
        // Simple fallback if advanced features fail
        this.button.classList.add('simple-button');
        console.log('CreepyButton: Using fallback mode');
    }

    createButtonStructure() {
        // Get the original button text
        const originalText = this.button.textContent || this.button.innerHTML;
        
        // Clear the button and add our structure
        this.button.innerHTML = '';
        this.button.classList.add('creepy-button');

        // Create eyes container
        this.eyesContainer = document.createElement('span');
        this.eyesContainer.className = 'creepy-button__eyes';

        // Create two eyes
        for (let i = 0; i < 2; i++) {
            const eye = document.createElement('span');
            eye.className = 'creepy-button__eye';

            const pupil = document.createElement('span');
            pupil.className = 'creepy-button__pupil';
            
            eye.appendChild(pupil);
            this.eyesContainer.appendChild(eye);
            this.pupils.push(pupil);
        }

        // Create cover with text
        const cover = document.createElement('span');
        cover.className = 'creepy-button__cover';
        cover.innerHTML = originalText;

        // Add elements to button
        this.button.appendChild(this.eyesContainer);
        this.button.appendChild(cover);
    }

    bindEvents() {
        // Bind mouse and touch events
        this.button.addEventListener('mousemove', (e) => this.updateEyes(e));
        this.button.addEventListener('touchmove', (e) => this.updateEyes(e));
        
        // Optional: Add click effect
        this.button.addEventListener('click', () => this.clickEffect());
    }

    updateEyes(event) {
        // Handle both mouse and touch events
        const userEvent = event.touches ? event.touches[0] : event;
        
        // Get the center of the eyes container and cursor location
        const eyesRect = this.eyesContainer.getBoundingClientRect();
        const eyesCenter = {
            x: eyesRect.left + eyesRect.width / 2,
            y: eyesRect.top + eyesRect.height / 2
        };
        
        const cursor = {
            x: userEvent.clientX,
            y: userEvent.clientY
        };

        // Calculate the eye angle and distance
        const dx = cursor.x - eyesCenter.x;
        const dy = cursor.y - eyesCenter.y;
        const angle = Math.atan2(-dy, dx) + Math.PI / 2;
        
        // Control the vision range
        const visionRangeX = 180;
        const visionRangeY = 75;
        const distance = Math.hypot(dx, dy);
        
        // Calculate pupil position
        const x = Math.sin(angle) * distance / visionRangeX;
        const y = Math.cos(angle) * distance / visionRangeY;
        
        // Clamp the values to prevent pupils from going too far
        const clampedX = Math.max(-0.5, Math.min(0.5, x));
        const clampedY = Math.max(-0.5, Math.min(0.5, y));
        
        // Apply transform to both pupils
        const translateX = -50 + clampedX * 50;
        const translateY = -50 + clampedY * 50;
        
        this.pupils.forEach(pupil => {
            pupil.style.transform = `translate(${translateX}%, ${translateY}%)`;
        });
    }

    clickEffect() {
        // Add a subtle click animation
        this.button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.button.style.transform = '';
        }, 150);
    }

    // Method to destroy the button (cleanup)
    destroy() {
        this.button.removeEventListener('mousemove', this.updateEyes);
        this.button.removeEventListener('touchmove', this.updateEyes);
        this.button.removeEventListener('click', this.clickEffect);
    }
}

/**
 * Initialize all creepy buttons on the page
 * Call this function after DOM is loaded
 */
function initCreepyButtons() {
    const buttons = document.querySelectorAll('.creepy-button-trigger');
    const creepyButtons = [];
    
    buttons.forEach(button => {
        const creepyBtn = new CreepyButton(button);
        creepyButtons.push(creepyBtn);
    });
    
    return creepyButtons;
}

/**
 * Auto-initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', initCreepyButtons);

// Export for manual initialization if needed
window.CreepyButton = CreepyButton;
window.initCreepyButtons = initCreepyButtons;
