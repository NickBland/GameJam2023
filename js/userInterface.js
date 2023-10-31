class userInterface {
    constructor() {
        // Draw a container on the bottom of the screen, with a lighter opacity so that the player can see through it
        this.container = {
            w: width,
            h: 100,
            x: 0,
            y: height - 100,
        }
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

    drawInterface() {
        fill(255, 255, 255, 150);
        rect(this.container.x, this.container.y, this.container.w, this.container.h);
        noFill();

        this.#drawHealth();
        
    }
}