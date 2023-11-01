/**
 * @class User Interface class deals with elements at the bottom of the gameplay screen.
 */

class userInterface {
    #groupButtons; // Private buttons so they can't be accessed outside the UI
    constructor() {
        // Draw a container on the bottom of the screen, with a lighter opacity so that the player can see through it
        this.container = {
            w: width,
            h: 100,
            x: 0,
            y: height - 100,
        }

        this.groupTypes = ["mining", "corsair", "destroyer", "cruiser", "battleship", "none"];
        this.selectedGroup;

        this.#groupButtons = this.#setupGroupSelector();
    }

    /**
     * Function creates the sprites needed for the group selection buttons at the bottom of the screen
     * @returns an array of the sprites correlating to the buttons at the bottom of the screen
     */
    #setupGroupSelector() {
        let buttonArray = []

        let initialSelectorPositionWidth = 25;
        let initialSelectorPositionHeight = initialSelectorPositionWidth;
        let initialSelectorPositionX = initialSelectorPositionWidth*1.5;
        let initialSelectorPositionY = this.container.y + initialSelectorPositionHeight * 1.75;

        // To be used as an index of which button is currently selected by the user.

        for (let i = 0; i < 5; i++) {
            let button = new Sprite();

            let offsetY = 0; // Important for the bottom row buttons
            // Determine the offset for the staggered buttons. This should be every second button
            if (i % 2 !== 0) {
                offsetY = initialSelectorPositionHeight * 1.25;
            }

            button.color = 128; // Set unselected colour to something you can see on top of the overlay
            

            button.x = initialSelectorPositionX + i * (initialSelectorPositionWidth * 0.75);
            button.y = initialSelectorPositionY + offsetY;
            button.w = initialSelectorPositionWidth;
            button.h = initialSelectorPositionHeight;
            button.textSize = 20;
            button.text = i + 1;
            button.collider = "k";

            buttonArray.push(button);
        }
        return buttonArray;
    }

    /**
     * Draws the health of the mothership at the bottom right of the interface
     */
    #drawHealth() {
        // This next block determines what each digit is using modulus. The digits will be 0 if it is less than its number (eg. third digit at 99 will be 0)
        let healthDigit1, healthDigit2, healthDigit3;
        healthDigit3 = numerals[Math.floor(data.playerMothership.health % 10)];
        healthDigit2 = numerals[Math.floor((data.playerMothership.health / 10) % 10)];
        healthDigit1 = numerals[Math.floor((data.playerMothership.health / 100) % 10)];
        imageMode(CENTER);
        image(healthDigit1, width * 0.85, this.container.y + healthDigit1.h * 2.5);
        image(healthDigit2, width * 0.85 + healthDigit1.w, this.container.y + healthDigit1.h * 2.5);
        image(healthDigit3, width * 0.85 + healthDigit1.w * 2, this.container.y + healthDigit1.h * 2.5);
        imageMode(CORNER);

        fill("white");
        textAlign(CENTER, CENTER);
        textSize(20);
        text("Mothership Health", width * 0.85 + healthDigit1.w, this.container.y + healthDigit1.h * 1.25);

        // Next, draw a small bar beneath the numbers for added ~~flavour~~
        let mothership1HealthBarX = width * 0.85 - healthDigit1.w;
        let mothership1HealthBarY = this.container.y + healthDigit1.h * 3.5;
        let mothership1HealthBarWidth = healthDigit1.w * 4;
        let mothership1HealthBarHeight = 10;
        let mothership1HealthPercentage = data.playerMothership.health / 500
        let mothership1HealthBarFill = mothership1HealthBarWidth * mothership1HealthPercentage; // Calculate % to fill bar

        fill("white");
        rect(mothership1HealthBarX, mothership1HealthBarY, mothership1HealthBarWidth, mothership1HealthBarHeight);
        if (mothership1HealthPercentage > 0.75) {
            fill("green");
        } else if (mothership1HealthPercentage > 0.5) {
            fill("yellow");
        } else if (mothership1HealthPercentage > 0.25) {
            fill("orange");
        } else {
            fill("red");
        }
        rect(mothership1HealthBarX, mothership1HealthBarY, mothership1HealthBarFill, mothership1HealthBarHeight)
    }

    /**
     * Draws the amount of resources the user has on the right side of the screen
     */
    #drawResources() {
        
    }

    /**
     * Updates the state of the group selection buttons by adjusting the appearance of the stroke and internal colour depending on hover/selection
     */
    #updateGroupButtonStates() {

        fill("white")
        text("Selected Group", this.#groupButtons[0].x + this.#groupButtons[0].w * 1.75, this.#groupButtons[0].y - this.#groupButtons[0].h);

        for (let i = 0; i < this.#groupButtons.length; i++) {
            // Stroke
            if (this.#groupButtons[i].mouse.hovering()) {
                this.#groupButtons[i].strokeWeight = 3;
                this.#groupButtons[i].stroke = "white"
            } else {
                this.#groupButtons[i].strokeWeight = 1;
                this.#groupButtons[i].stroke = "black"
            }
            
            // Internal Colour
            if (i === this.selectedGroup) {
                this.#groupButtons[i].color = "red";
            } else {
                this.#groupButtons[i].color = 128;
            }
        }
    }

    /**
     * Handles selection of a group of ships from the user's input
     * Keyboard numbers 1-5 correspond to "mining", "corsair", "destroyer", "cruiser", and "battleship" groups
     * Left Mouse clicks correspond to no group selected, unless the user is hovering over one of the button on the UI
     */
    groupSelection() {
        if (kb.presses("1")) {
            this.selectedGroup = this.groupTypes.indexOf("mining");
        }
        if (kb.presses("2")) {
            this.selectedGroup = this.groupTypes.indexOf("corsair");
        }
        if (kb.presses("3")) {
            this.selectedGroup = this.groupTypes.indexOf("destroyer");
        }
        if (kb.presses("4")) {
            this.selectedGroup = this.groupTypes.indexOf("cruiser");
        }
        if (kb.presses("5")) {
            this.selectedGroup = this.groupTypes.indexOf("battleship");
        }

        // Now handle the mouse!
        if (mouse.presses("left")) { // DEFAULT BEHAVIOUR
            this.selectedGroup = this.groupTypes.indexOf("none");
        }

        for (let i = 0; i < this.#groupButtons.length; i++) {
            if (this.#groupButtons[i].mouse.hovering() && mouse.presses("left")) {
                this.selectedGroup = i;
            }
        }
    }

    /**
     * Handles drawing the user interface on to the screen.
     */
    drawInterface() {
        fill(255, 255, 255, 150);
        rect(this.container.x, this.container.y, this.container.w, this.container.h);
        noFill();

        // In the future, the camera.off() function should be invoked here, as these elements are to be STATIC at the bottom of the screen.

        this.#drawHealth();
        this.#updateGroupButtonStates();

        // In addition, the camera.on() function should be invoked here, after all static elements have been drawn on screen.

    }
}