/**
 * @class User Interface class deals with elements at the bottom of the gameplay screen.
 */
class userInterface {
    #groupButtons; // Private buttons so they can't be accessed outside the UI
    constructor() {
        // Draw a container on the bottom of the screen, with a lighter opacity so that the player can see through it
        this.container = {
            w: width,
            h: 125,
            x: 0,
            y: height - 125,
        }

        this.groupTypes = ["drone", "corsair", "destroyer", "cruiser", "battleship", "none"];
        this.selectedGroup = this.groupTypes.indexOf("none"); // Ensure to set starting selection as none (was null before user clicked anything previously)

        this.#groupButtons = this.#setupGroupSelector();

        this.selectionBox;
        this.setupSelectionBox();
    }

    setupSelectionBox() {
        this.selectionBox = new Sprite();
        this.selectionBox.colour = "white";
        this.selectionBox.color.setAlpha(30); // Reduce alpha to something smaller so you can see through it
        this.selectionBox.stroke = "black";
        this.selectionBox.strokeWeight = 3;
        this.selectionBox.overlapping(allSprites);
        this.selectionBox.rotationLock = true;
        this.selectionBox.visible = false;

        this.selectionBoxX = 0;
        this.selectionBoxY = 0;
    }

    /**
     * Function creates the sprites needed for the group selection buttons at the bottom of the screen
     * @returns an array of the sprites correlating to the buttons at the bottom of the screen
     */
    #setupGroupSelector() {
        let buttonArray = []

        let initialSelectorPositionWidth = 25;
        let initialSelectorPositionHeight = initialSelectorPositionWidth;
        let initialSelectorPositionX = initialSelectorPositionWidth*2.5;
        let initialSelectorPositionY = this.container.y + initialSelectorPositionHeight*2.25;

        // To be used as an index of which button is currently selected by the user.

        for (let i = 0; i < 5; i++) {
            let button = new Sprite();

            let offsetY = 0; // Important for the bottom row buttons
            // Determine the offset for the staggered buttons. This should be every second button
            if (i % 2 !== 0) {
                offsetY = initialSelectorPositionHeight * 1.5;
            }

            button.x = initialSelectorPositionX + i * (initialSelectorPositionWidth * 0.75);
            button.y = initialSelectorPositionY + offsetY;
            button.w = initialSelectorPositionWidth;
            button.h = initialSelectorPositionHeight;
            button.color = '#d19f5a'
            button.strokeWeight = 2
            button.stroke = 'black'
            button.textColor = '#ffe7d6'
            button.textSize = 14
            button.text = i+1
            button.collider = "k";

            buttonArray.push(button);
            
        }
        return buttonArray;
    }

    /**
     * Determines the length of digits, given an integer
     * @param {int} integer The integer who's digits need to be counted! 
     */
    #determingDigitCount(integer) {
        let count = 0;
        if (integer >= 1) {
            ++count; // Preincrement the count before the next step
        } else {
            return 1;
        }
        while (integer / 10 >= 1) {
            integer /= 10;
            ++count; // Preincrement before next while step.
        }
        return count;
    }

    /**
     * Draws the health of the mothership at the bottom right of the interface
     */
    #drawHealth() {
        let initialDigitX = width*0.9;
        let initialDigitY = this.#groupButtons[2].y;
        //let digitCount = this.#determingDigitCount(data.playerMothership.health);
        fill("#ffe7d6");
        textFont(myfont)
        textAlign(CENTER, CENTER);
        textSize(18);
        text("Health", initialDigitX, initialDigitY*0.95);
        textSize(16)
        textFont(myfontB)
        fill("#8c2d38")
        stroke('black')
        text(data.playerMothership.health, initialDigitX, initialDigitY)

        for (let i=0; i<5; i++) {
            let healthIcon = 100*i
            let healthValue
            if (data.playerMothership.health>= 100*(i+1)) {
                healthValue = 0
            } else {
                if ((data.playerMothership.health-healthIcon) == 75) {
                    healthValue = 1
                } else if ((data.playerMothership.health-healthIcon) == 50) {
                    healthValue = 2
                } else if ((data.playerMothership.health-healthIcon) == 25) {
                    healthValue = 3
                } else {
                    healthValue = 4
                }
            } 
            image(health[healthValue], width*(0.84 + 0.03*i), this.#groupButtons[1].y)
        }


        /*imageMode(CENTER);
        for (let i = digitCount; i > 0; i--) {
            let digit = numerals[Math.floor((data.playerMothership.health / (10 ** (digitCount - i))) % 10)];
            image(digit, initialDigitX + (digit.w * i), initialDigitY);
        }
        imageMode(CORNER);*/

        // Next, draw a small bar beneath the numbers for added ~~flavour~~
        /*let mothership1HealthBarX = width * 0.85 - numerals[0].w;
        let mothership1HealthBarY = this.container.y + numerals[0].h * 3.5;
        let mothership1HealthBarWidth = numerals[0].w * 4;
        let mothership1HealthBarHeight = 10;
        let mothership1HealthPercentage = data.playerMothership.health / 500
        let mothership1HealthBarFill = mothership1HealthBarWidth * mothership1HealthPercentage; // Calculate % to fill bar

        noStroke();
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
        rect(mothership1HealthBarX, mothership1HealthBarY, mothership1HealthBarFill, mothership1HealthBarHeight)*/
    }

    /**
     * Draws the amount of resources the user has on the right side of the screen
     */
    #drawResources() {
        let initialDigitX = width * 0.75;
        let initialDigitY = this.#groupButtons[2].y;
        //let digitCount = this.#determingDigitCount(data.playerShip.resources);
        fill("#ffe7d6");
        textAlign(RIGHT, CENTER);
        textSize(18);
        text("Minerals", initialDigitX, initialDigitY*0.95)
        fill('#d19f5a');
        textFont(myfontB)
        text(data.playerShip.resources, initialDigitX, initialDigitY)
        imageMode(CENTER);
        image(mineralImg, initialDigitX*0.85, initialDigitY)

        /*imageMode(CENTER);
        for (let i = 0; i < digitCount; i++) {
            let digit = numerals[Math.floor((data.playerShip.resources / (10 ** (i))) % 10)];
            image(digit, initialDigitX - digit.w * i, initialDigitY);
        }
        imageMode(CORNER);*/
    }

    /**
     * Updates the state of the group selection buttons by adjusting the appearance of the stroke and internal colour depending on hover/selection
     */
    #updateGroupButtonStates() {
        textFont(myfont)
        textAlign(CENTER, CENTER);
        fill("#ffe7d6")
        text("Selected Group", this.#groupButtons[2].x, this.#groupButtons[2].y*0.95);

        for (let i = 0; i < this.#groupButtons.length; i++) {
            // Stroke
            if (this.#groupButtons[i].mouse.hovering()) {
                //this.#groupButtons[i].strokeWeight = 3;
                //this.#groupButtons[i].stroke = "white"
                this.#groupButtons[i].scale = 1.2
            } else {
                //this.#groupButtons[i].strokeWeight = 1;
                //this.#groupButtons[i].stroke = "black"
                this.#groupButtons[i].scale = 1
            }

            // Internal Colour
            if (i === this.selectedGroup) {
                this.#groupButtons[i].color = "#8b4049";
            } else {
                this.#groupButtons[i].color = '#d19f5a';
            }
        }
    }

    /**
     * Handles selection of a group of ships from the user's input
     * Keyboard numbers 1-5 correspond to "drone", "corsair", "destroyer", "cruiser", and "battleship" groups
     * Left Mouse clicks correspond to no group selected, unless the user is hovering over one of the button on the UI
     */
    groupSelection() {
        if (kb.presses("1")) {
            this.selectedGroup = this.groupTypes.indexOf("drone");
            this.updateSelection();
        }
        if (kb.presses("2")) {
            this.selectedGroup = this.groupTypes.indexOf("corsair");
            this.updateSelection();
        }
        if (kb.presses("3")) {
            this.selectedGroup = this.groupTypes.indexOf("destroyer");
            this.updateSelection();
        }
        if (kb.presses("4")) {
            this.selectedGroup = this.groupTypes.indexOf("cruiser");
            this.updateSelection();
        }
        if (kb.presses("5")) {
            this.selectedGroup = this.groupTypes.indexOf("battleship");
            this.updateSelection();
        }

        // Now handle the mouse!
        if (mouse.presses("left")) { // DEFAULT BEHAVIOUR
            this.selectedGroup = this.groupTypes.indexOf("none");
            this.updateSelection();
        }

        for (let i = 0; i < this.#groupButtons.length; i++) {
            if (this.#groupButtons[i].mouse.hovering() && mouse.presses("left")) {
                this.selectedGroup = i;
                this.updateSelection();
            }
        }
    }

    updateSelection(){
        for(let i = 0; i<data.playerShip.ships.length; i++){
            let thisShip = data.playerShip.ships[i];
            if(thisShip.group == this.groupTypes[this.selectedGroup]){
                thisShip.selected = true;
                thisShip.stroke = "white"
                thisShip.strokeWeight = 2;
            } else{
                thisShip.selected = false;
                thisShip.stroke = "black";
                thisShip.strokeWeight = 1;
            }
        }
    }

    /**
     * Defines usage of the click-to-drag selection mechanism
     */
    clickDrag() {
        if (mouse.pressing()) {
            if (mouseX > this.selectionBoxX) {
                this.selectionBox.w = (mouseX - this.selectionBoxX) + 1;
                this.selectionBox.x = (this.selectionBoxX + mouseX) / 2;
            }
            if (mouseY > this.selectionBoxY) {
                this.selectionBox.h = (mouseY - this.selectionBoxY) + 1;
                this.selectionBox.y = (this.selectionBoxY + mouseY) / 2;
            }
            if (mouseX < this.selectionBoxX) {
                this.selectionBox.w = (this.selectionBoxX - mouseX) + 1;
                this.selectionBox.x = mouseX + this.selectionBox.w / 2;
            }
            if (mouseY < this.selectionBoxY) {
                this.selectionBox.h = (this.selectionBoxY - mouseY) + 1;
                this.selectionBox.y = mouseY + this.selectionBox.h / 2;
            }
            this.selectionBox.visible = true;
        }
        else {
            this.selectionBox.visible = false;
            this.selectionBox.x = -50;
            this.selectionBox.y = -50;
            this.selectionBox.w = 10;
            this.selectionBox.h = 10;
    
            this.selectionBoxX = mouseX;
            this.selectionBoxY = mouseY;
        }
    
        if (mouse.presses()) {
            this.selectionBoxX = mouseX;
            this.selectionBoxY = mouseY;
        }
    
        if (mouse.released()) {
            for (let i = 0; i < data.playerShip.ships.length; i++) {
                let selectedShip = data.playerShip.ships[i];
                if (this.selectionBox.overlapping(selectedShip)) {
                    selectedShip.selected = true;
                    selectedShip.stroke = "white"
                    selectedShip.strokeWeight = 2;
                }
            }
        }
    }

    /**
     * Handles drawing the user interface on to the screen.
     */
    drawInterface() {
        fill(120, 120, 120, 150);
        rect(this.container.x, this.container.y, this.container.w, this.container.h);
        noFill();

        // In the future, the camera.off() function should be invoked here, as these elements are to be STATIC at the bottom of the screen.

        this.#drawHealth();
        this.#drawResources();
        this.#updateGroupButtonStates();

        // In addition, the camera.on() function should be invoked here, after all static elements have been drawn on screen.

    }
}