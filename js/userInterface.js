class userInterface {
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
    }


    #drawHealth() {
        // Draw health of the mothership at the bottom right of the interface

        // This next block determines what each digit is using modulus. The digits will be 0 if it is less than its number (eg. third digit at 99 will be 0)
        let healthDigit1, healthDigit2, healthDigit3;
        healthDigit3 = numerals[Math.floor(mothership1.health % 10)];
        healthDigit2 = numerals[Math.floor((mothership1.health / 10) % 10)];
        healthDigit1 = numerals[Math.floor((mothership1.health / 100) % 10)];
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
        let mothership1HealthPercentage = mothership1.health / 500
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

    #drawSelected() {
        // Draw which group the user has selected. Also give the user the ability to change what group is selected via the MOUSE.
        // This will be drawn as boxes on the left hand side of the interface. 

        let initialSelectorPositionWidth = 25;
        let initialSelectorPositionHeight = initialSelectorPositionWidth;
        let initialSelectorPositionX = initialSelectorPositionWidth;
        let initialSelectorPositionY = this.container.y + initialSelectorPositionHeight * 1.5;

        fill("white")
        text("Selected Group", initialSelectorPositionX + initialSelectorPositionWidth * 2.25, initialSelectorPositionY - initialSelectorPositionHeight * 0.75);

        // To be used as an index of which button is currently selected by the user.

        for (let i = 0; i < 5; i++) {
            let offsetY = 0; // Important for the bottom row buttons
            // Determine the offset for the staggered buttons. This should be every second button
            if (i % 2 !== 0) {
                offsetY = initialSelectorPositionHeight * 1.25;
            }

            fill(128); // Set unselected colour to something you can see on top of the overlay
            if (i === this.selectedGroup) {
                fill("red");
            }


            // Draw a rectangle in a 3 top row, 2 bottom row, staggered layout. 
            rect(initialSelectorPositionX + i * (initialSelectorPositionWidth * 0.75), initialSelectorPositionY + offsetY, initialSelectorPositionWidth, initialSelectorPositionHeight);

            fill("white"); // Text colour
            text(i + 1, initialSelectorPositionX + i * (initialSelectorPositionWidth * 0.75) + initialSelectorPositionWidth / 2, initialSelectorPositionY + offsetY + initialSelectorPositionHeight / 2)
        }
    }

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
        if (mouse.presses("left")) {
            this.selectedGroup = this.groupTypes.indexOf("none");
        }
    }

    drawInterface() {
        fill(255, 255, 255, 150);
        rect(this.container.x, this.container.y, this.container.w, this.container.h);
        noFill();

        // In the future, the camera.off() function should be invoked here, as these elements are to be STATIC at the bottom of the screen.

        this.#drawHealth();
        this.#drawSelected();

        // In addition, the camera.on() function should be invoked here, after all static elements have been drawn on screen.

    }
}