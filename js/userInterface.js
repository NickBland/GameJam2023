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

        this.miniMapSprites = new Group();
        this.miniMapSprites.dots = new Group();

        this.shopUI = new shop(this.container);
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
     * @returns a group containing all of the sprites correlating to the buttons at the bottom of the screen
     */
    #setupGroupSelector() {
        let buttonArray = new Group();

        let initialSelectorPositionWidth = 25;
        let initialSelectorPositionHeight = initialSelectorPositionWidth;
        let initialSelectorPositionX = initialSelectorPositionWidth * 2.5;
        let initialSelectorPositionY = this.container.y + initialSelectorPositionHeight * 2.25;

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
            button.text = i + 1
            button.collider = "k";
            button.overlaps(allSprites)
            buttonArray.push(button);

        }
        return buttonArray;
    }



    /**
     * Draws the health of the mothership at the bottom right of the interface
     */
    #drawHealth() {
        let initialDigitX = width * 0.9;
        let initialDigitY = this.#groupButtons[2].y;
        fill("#ffe7d6");
        textFont(myfont)
        textAlign(CENTER, CENTER);
        textSize(18);
        text("Health", initialDigitX, initialDigitY * 0.95);
        textSize(16)
        textFont(myfontB)
        fill("#8ea091")
        stroke('black')
        text(data.playerMothership.health, initialDigitX, initialDigitY)

        for (let i = 0; i < 5; i++) {
            let healthIcon = 100 * i
            let healthValue
            if (data.playerMothership.health >= 100 * (i + 1)) {
                healthValue = 0
            } else {
                if ((data.playerMothership.health - healthIcon) == 75) {
                    healthValue = 1
                } else if ((data.playerMothership.health - healthIcon) == 50) {
                    healthValue = 2
                } else if ((data.playerMothership.health - healthIcon) == 25) {
                    healthValue = 3
                } else {
                    healthValue = 4
                }
            }
            image(health[healthValue], width * (0.84 + 0.03 * i), this.#groupButtons[1].y)
        }
    }

    /**
     * Draws the amount of resources the user has on the right side of the screen
     */
    #drawResources() {
        let initialDigitX = width * 0.75;
        let initialDigitY = this.#groupButtons[2].y;
        fill("#ffe7d6");
        textAlign(RIGHT, CENTER);
        textSize(18);
        textFont(myfont)
        text("Minerals", initialDigitX, initialDigitY * 0.95)
        fill('#d19f5a');
        textFont(myfontB)
        text(data.playerShip.resources, initialDigitX, initialDigitY)
        text(data.playerShip.specialResources, initialDigitX, this.#groupButtons[1].y)
        imageMode(CENTER);
        image(mineralImg, initialDigitX * 0.85, initialDigitY)
        image(specialmineralImg, initialDigitX * 0.85, this.#groupButtons[1].y)
    }

    /**
     * Updates the state of the group selection buttons by adjusting the appearance of the stroke and internal colour depending on hover/selection
     */
    #updateGroupButtonStates() {
        textFont(myfont)
        textAlign(CENTER, CENTER);
        fill("#ffe7d6")
        text("Selected Group", this.#groupButtons[2].x, this.#groupButtons[2].y * 0.95);

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
        if (mouse.presses("left")&& this.miniMapSprites[1].mouse.presses() == false) { // DEFAULT BEHAVIOUR
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

    updateSelection() {
        for (let i = 0; i < data.playerShip.ships.length; i++) {
            let thisShip = data.playerShip.ships[i];
            if (thisShip.group == this.groupTypes[this.selectedGroup]) {
                thisShip.selected = true;
            } else {
                thisShip.selected = false;
            }
        }
    }

    drawSelectedCircles() {
        //Draws circles around all non-mothership ships + Travel lines
        for (let i = 1; i < data.playerShip.ships.length; i++) {
            let thisShip = data.playerShip.ships[i];
            let miniMapDot = this.miniMapSprites.dots[i];

            if (thisShip.selected) {
                fill(255, 128); // Set fill to white with a 50% opacity
                noStroke(); // And of course, no stroke
                circle(thisShip.x, thisShip.y, thisShip.h * 1.25); // Draw a translucent circle around selected ship

                miniMapDot.color = "white";

                if (thisShip.moveTimer !== 0) {
                    // Now draw a dotted line for their path
                    stroke(255);
                    drawingContext.setLineDash([10, 20]); // Length of line, Spacing
                    drawingContext.lineDashOffset = 5;
                    line(thisShip.x, thisShip.y, thisShip.destinationX, thisShip.destinationY);
                    fill(255);
                    circle(thisShip.destinationX, thisShip.destinationY, 7.5);
                }

                // Reset the styling back to nothing.
                drawingContext.setLineDash([]);
                drawingContext.lineDashOffset = 0;
                noFill();
                stroke(0);
            } else {
                miniMapDot.color = "lime";
            }
        }
        //Draws the circle around the mothership
        if (data.playerShip.ships[0].selected) {
            let thisShip = data.playerShip.ships[0];
            fill(255, 128); // Set fill to white with a 50% opacity
            noStroke(); // And of course, no stroke
            circle(thisShip.x, thisShip.y, thisShip.h * 1.25);
        }
    }

    drawTeamCircles() {
        for (let i = 0; i < data.playerShip.ships.length; i++) {
            let thisShip = data.playerShip.ships[i];
            noFill();
            stroke("#89a257");
            strokeWeight(3);
            circle(thisShip.x, thisShip.y, thisShip.h * 1.25);
        }
        for (let i = 0; i < data.enemyShip.ships.length; i++) {
            let thisShip = data.enemyShip.ships[i];
            noFill();
            stroke("#941434");
            strokeWeight(3);
            if (thisShip.visible) {
                circle(thisShip.x, thisShip.y, thisShip.h * 1.25);
            }
        }

        noFill();
        stroke(0);
    }

    /**
     * Defines usage of the click-to-drag selection mechanism
     */
    clickDrag() {
        if (mouse.pressing() && this.miniMapSprites[1].mouse.pressing() == false) {
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

        this.#drawHealth();
        this.#drawResources();
        this.#updateGroupButtonStates();

        this.shopUI.checkHover();
        this.shopUI.displayShopName();
    }


    ///Notification for special resource
    resourceNoti() {
        let timer = 60;
        timer --;
        if (timer >= 0) {
            fill('#ffe7d6')
            rect(20, 20, 250, 50, 5)

            image(harvestImg, 35, 35)
            textFont("myFont", 14)
            textAlign(LEFT, CENTER)
            fill('#d19f5a')
            text("MINERALS", 50, 35)
            noStroke()
            fill('black')
            text("Special Resource Found!!!", 30, 55)
        }
    }

    //Initialises the miniMap
    miniMap() {
        let miniMapBorder = new Sprite();
        miniMapBorder.collider = "n";
        miniMapBorder.color = "#8b4049";
        miniMapBorder.stroke = 'black';
        miniMapBorder.x = width - 100;
        miniMapBorder.y = 100;
        miniMapBorder.w = 180;
        miniMapBorder.h = 180;

        let miniMap = new Sprite();
        miniMap.collider = "s";
        miniMap.overlaps(allSprites);
        miniMap.img = gameBgImg;
        miniMap.scale = 0.2;
        miniMap.x = width - 100;
        miniMap.y = 100;

        let miniMapFov = new Sprite();
        miniMapFov.collider = "n";
        miniMapFov.img = miniFOV;

        this.miniMapSprites.push(miniMapBorder);
        this.miniMapSprites.push(miniMap);
        this.miniMapSprites.push(miniMapFov);

        for (let i = 0; i < data.playerShip.ships.length; i++) {
            this.miniMapSprites.dots.push(this.createMiniMapSprite());
        }
    }

    //Adds a new sprite to the miniMap, this should correspond to the appropriate ship
    createMiniMapSprite() {
        let miniShip = new Sprite();
        miniShip.collider = "n";
        miniShip.d = 6;
        miniShip.strokeWeight = 0;
        miniShip.color = "lime";
        return (miniShip);
    }

    //Updates the minimap each draw frame
    miniMapUpdate(cameraObject) {
        let fovLerpX = lerp(764, 636, (cameraObject.cameraX + 800) / 2400);
        let fovLerpY = lerp(164, 36, (cameraObject.cameraY + 800) / 2400);
        this.miniMapSprites[2].x = fovLerpX;
        this.miniMapSprites[2].y = fovLerpY;
        for (let i = 0; i < this.miniMapSprites.dots.length; i++) {
            let thisDot = this.miniMapSprites.dots[i];
            let thisShip = data.playerShip.ships[i];
            let dotLerpX = lerp(620, 780, (thisShip.x - cameraObject.cameraX + 1600) / 3200);
            let dotLerpY = lerp(20, 180, (thisShip.y - cameraObject.cameraY + 1600) / 3200);

            thisDot.x = dotLerpX;
            thisDot.y = dotLerpY;
        }

        if (this.miniMapSprites[1].mouse.pressing()) {
            let moveLerpX = lerp(1600, -800, (mouse.x - 636) / 128);
            let moveLerpY = lerp(1600, -800, (mouse.y - 36) / 128);

            if (moveLerpX > 1600) {
                moveLerpX = 1600;
            }
            if (moveLerpX < -800) {
                moveLerpX = -800;
            }
            if (moveLerpY > 1600) {
                moveLerpY = 1600;
            }
            if (moveLerpY < -800) {
                moveLerpY = -800;
            }
            let x = -cameraObject.cameraX+moveLerpX;
            let y = -cameraObject.cameraY+moveLerpY;

            cameraObject.moveGame(x, y)
        }

        if (this.miniMapSprites[1].mouse.pressing("right")) {
            let moveLerpX = lerp(2000, -1200, (mouse.x - 620) / 160);
            let moveLerpY = lerp(2000, -1200, (mouse.y - 20) / 160);
            for (let i = 0; i < data.playerShip.ships.length; i++) {
                let thisShip = data.playerShip.ships[i];
                if (thisShip.selected == true) {
                    let x = -((-400 - cameraObject.cameraX)+(moveLerpX)) ;
                    let y = -((-400 - cameraObject.cameraY)+(moveLerpY));

                    if (thisShip.moveTimer === 0) {
                        thisShip.moveTimer = Math.floor(dist(thisShip.x, thisShip.y, x, y)) / 3;
                        data.playerShip.setDestination(x, y, thisShip);
                    } else {
                        thisShip.moveTimer = Math.floor(dist(thisShip.x, thisShip.y, x, y)) / 3;
                        data.playerShip.setDestination(x, y, thisShip);
                    }
                }
            }
        }
    }
}