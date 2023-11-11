/**
 * @class holds all the buying buttons for creation of new ships!
 */
class shop {
    constructor(container) {
        this.container = container;
        this.shopButtons = new Group();
        this.shopButtonBack;
        this.shopButtonImages;

        this.gameData = data;

        this.setupShopButtons();

        this.price = new Group();
        this.displayFlavourText();

        this.upgradeBoard;
        this.setupUpgradeBoard();

        this.upgradeButtons = new Group();
        this.upgradeTypes = ["all ships", "drone", "corsair", "destroyer", "cruiser", "battleship"];
        this.upgradeSkills = [s_allships, s_drones, s_corsairs, s_destroyers, s_cruisers, s_battleships];
        this.selectedUpgrade = this.upgradeTypes.indexOf("all ships"); // Ensure to set starting selection as "general upgrade"

        this.upgradeNameImage = new this.upgradeButtons.Group();
        this.upgradeNameBack = new this.upgradeButtons.Group();
        this.upgradeContent = new this.upgradeButtons.Group();
        this.upgradeText = new this.upgradeButtons.Group();

        this.upgrades = this.gameData.upgrades;

        this.setupUpgradeButtons();
        this.upgradeText.layer = 100000;

        this.buttonValue = [20, 30, 40, 50, 60, "UPGRADE"];
    }

    /**
     * Function creates the sprites needed for shop purchase selection
     */
    setupShopButtons() {
        this.shopButtonBack = new this.shopButtons.Group();
        this.shopButtonImages = new this.shopButtons.Group();

        let requiredAssets = [droneShipImg.get(), corsairShipImg.get(), destroyerShipImg.get(), cruiserShipImg.get(), battleShipImg.get(), upgradeImg.get()];

        let initialShopPositionWidth = 32;
        let initialShopPositionX = width * 0.275;
        let initialShopPositionY = this.container.y + initialShopPositionWidth * 2.5;

        for (let i = 0; i < 6; i++) {
            let button = new Sprite();
            button.x = initialShopPositionX + i * (initialShopPositionWidth * 1.5);
            button.y = initialShopPositionY;
            button.d = initialShopPositionWidth;
            button.color = '#8ea091';
            button.strokeWeight = 2;
            button.stroke = 'black';
            button.collider = "k";
            button.overlaps(allSprites);
            this.shopButtonBack.push(button);

            let buttonImage = new Sprite();
            buttonImage.x = initialShopPositionX + i * (initialShopPositionWidth * 1.5);
            buttonImage.y = initialShopPositionY;
            requiredAssets[i].resize(30, 0);
            requiredAssets[5].resize(25, 0);
            buttonImage.img = requiredAssets[i];
            buttonImage.collider = "k";
            buttonImage.overlaps(allSprites);
            this.shopButtonImages.push(buttonImage);
        }
    }

    /**
     * Similar to setting up shop buttons, this function should set up all the buttons for purchasing upgrades.
     */
    setupUpgradeButtons() {
        let initialButtonX = 120;
        let initialButtonY = height * 0.425;
        let initialButtonW = 32;

        let requiredAssets = [generalUpgradeImg.get(), droneShipImg.get(), corsairShipImg.get(), destroyerShipImg.get(), cruiserShipImg.get(), battleShipImg.get()];
        requiredAssets[0].resize(30, 0);
        requiredAssets[1].resize(75, 0);
        requiredAssets[2].resize(70, 0);


        for (let i = 0; i < this.upgrades.length; i++) {
            let column = this.upgrades[i];
            let column_skill = this.upgradeSkills[i];

            let buttons = new this.upgradeContent.Group();
            let textContent = new this.upgradeText.Group();
            for (let j = 1; j < column.length; j++) {
                let icon = specialmineralImg.get();
                icon.resize(20, 0);
                let button = new Sprite();
                button.x = initialButtonX + 4.75 * (width * 0.8 / 5.75);  // Set Column
                button.y = initialButtonY + 30 + (j - 1) * (height * 0.4 / 5.5); //Set Row

                button.w = initialButtonW * 2.5;
                button.h = initialButtonW;
                button.color = '#8ea091';
                button.strokeWeight = 2;
                button.stroke = 'black';
                button.collider = "k";
                button.cost = column[j].cost;
                button.indexX = i;
                button.indexY = j;
                buttons.push(button);


                // GENERATE FLAVOUR TEXT FOR THIS UPGRADE
                let flavour = new Sprite(initialButtonX + initialButtonW * 1.5, button.y);
                flavour.w = 1;
                flavour.h = 1;
                flavour.collider = "n";
                flavour.draw = () => {
                    noStroke();
                    textSize(16);
                    textAlign(LEFT, CENTER);

                    fill('black');
                    text(column[j].cost, button.x - flavour.x, 0);
                    let icon = specialmineralImg.get();
                    icon.resize(20, 0);
                    image(icon, button.x - flavour.x - 15, 0);

                    image(column_skill[j - 1], -1.5 * initialButtonW, 0);

                    fill("#d19f5a");
                    text(column[j].name, 0, -10);

                    fill('#ffe7d6')
                    text(column[j].effectText, 0, 10);

                };
                textContent.push(flavour);
            }

            let columnBack = new Sprite(initialButtonX + i * (width * 0.8 / 5.75), initialButtonY - (height * 0.06), 50);
            columnBack.draw = () => {
                stroke('#d19f5a');
                line(-20, 25, 20, 25);
            }
            columnBack.collider = "k";
            columnBack.overlaps(allSprites);
            this.upgradeNameBack.push(columnBack);

            let columnImage = new Sprite();
            columnImage.x = initialButtonX + i * (width * 0.8 / 5.75);
            columnImage.y = initialButtonY - (height * 0.06);
            columnImage.collider = "k";
            requiredAssets[i].resize(50, 0);
            requiredAssets[0].resize(30, 0);
            requiredAssets[1].resize(60,0);
            requiredAssets[2].resize(60,0);
            

            columnImage.img = requiredAssets[i];

            columnImage.overlaps(allSprites);
            this.upgradeNameImage.push(columnImage);
        }

        this.upgradeButtons.visible = false;
        this.upgradeNameImage.overlaps(allSprites);
        this.upgradeNameBack.overlaps(allSprites);
        this.upgradeText.overlaps(allSprites);
        this.upgradeContent.overlaps(allSprites); // Final adjustments
        this.upgradeNameImage[0].rotation = -90;
    }

    /**
     * Draws some text above the shop buttons
     */
    displayShopName() {
        fill("#ffe7d6");
        text("Assets", this.shopButtonBack[2].x + this.shopButtonBack[2].d, 731.25 * 0.95);
    }

    /**
     * This function should display text above the shop interface on cost/flavour text for each unit
     */
    displayFlavourText() {
        for (let i = 0; i < this.shopButtonBack.length; i++) {
            let priceBox = new Sprite(this.shopButtonBack[i].x, this.shopButtonBack[i].y - this.shopButtonBack[i].d);
            priceBox.collider = "k";
            priceBox.overlaps(allSprites);
            priceBox.draw = () => {
                fill('#ffe7d6');
                strokeWeight(2);
                rect(0, 0, 60, 20);
                noStroke();
                fill('black');
                if (i < this.shopButtonBack.length - 1) {
                    textSize(12);
                    textAlign(LEFT, CENTER);
                    text(this.buttonValue[i], 5, 0);
                    let icon = mineralImg.get();
                    icon.resize(15, 0);
                    image(icon, 0 - 10, 0);
                } else {
                    textSize(10);
                    textAlign(CENTER, CENTER);
                    text(this.buttonValue[i], 0, 0);
                }
            };
            priceBox.visible = false;

            this.price.push(priceBox);
        }
    }

    /**
     * Create the sprite used to display upgrades inside of a new pane
     */
    setupUpgradeBoard() {
        this.upgradeBoard = new Sprite();
        this.upgradeBoard.draw = () => {
            fill(0, 150);
            rect(0, 62.5, width * 0.8, height * 0.5);
        }
        this.upgradeBoard.collider = 'n';
        this.upgradeBoard.visible = false;
    }

    /**
     * Create the sprite used to display an error notification when the user 
     */
    setupNotEnoughNoti() {
        let notEnoughNoti = new Sprite();
        notEnoughNoti.collider = 'n';
        notEnoughNoti.draw = () => {
            strokeWeight(2);
            fill('#8b4049');
            rect(-width / 2 + 200, -height / 2 + 45, 360, 50, 5);

            image(purchaseImg, -width / 2 + 35, -height / 2 + 35);
            textFont("myFont", 14);
            textAlign(LEFT, CENTER);
            fill('#d19f5a');
            text("Purchase Failed", -width / 2 + 50, -height / 2 + 35);
            noStroke();
            fill('black');
            text("Not enough resources / Not available", -width / 2 + 30, -height / 2 + 55);
        }
        notEnoughNoti.life = 45;
    }

    #checkCost(button, ship) {
        if (ship) {
            return (data.playerShip.resources >= this.buttonValue[button]);
        } else {
            return (data.playerShip.specialResources >= this.upgradeContent[button].cost);
        }
    }

    makePurchase(button, ship) {
        if (ship) {
            if (this.#checkCost(button, ship)) {
                this.gameData.createUnit(ui.groupTypes[button], this.gameData.playerShip, this.gameData.playerMothership);
                ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
                data.playerShip.resources -= this.buttonValue[button];
            } else {
                this.setupNotEnoughNoti();
            }
        } else {
            let boughtCheck = this.upgrades[this.upgradeContent[button].indexX][this.upgradeContent[button].indexY].playerOwned;
            if (this.#checkCost(button) && boughtCheck == false) {
                this.upgrades[this.upgradeContent[button].indexX][this.upgradeContent[button].indexY].playerOwned = true;
                this.gameData.playerShip.ownedUpgrades.push([this.upgradeContent[button].indexX, this.upgradeContent[button].indexY]);
                data.playerShip.specialResources -= this.upgradeContent[button].cost;
                for (let thisShip of data.playerShip.ships) {
                    data.upgradeShips(this.upgradeContent[button].indexX, this.upgradeContent[button].indexY, thisShip);
                }
            } else {
                this.setupNotEnoughNoti();
            }
        }
    }

    changeColour() {
        for (let i = 0; i < this.shopButtonBack.length - 1; i++) {
            if (!this.#checkCost(i, true)) {
                this.shopButtonBack[i].color = "#8b4049";
            } else {
                this.shopButtonBack[i].color = "#8ea091";
            }
        }

        if (this.upgradeBoard.visible) {
            for (let i = 0; i < this.upgradeContent.length; i++) {
                if (this.upgrades[this.upgradeContent[i].indexX][this.upgradeContent[i].indexY].playerOwned) {
                    this.upgradeContent[i].color = "#515262";
                } else {
                    if (!this.#checkCost(i, false)) {
                        this.upgradeContent[i].color = "#8b4049";
                    } else {
                        this.upgradeContent[i].color = "#8ea091";
                    }
                }
            }
        }
    }

    checkHover() {
        if (kb.presses("a")) {
            this.makePurchase(0, true);
        }
        if (kb.presses("s")) {
            this.makePurchase(1, true);
        }
        if (kb.presses("d")) {
            this.makePurchase(2, true);
        }
        if (kb.presses("f")) {
            this.makePurchase(3, true);
        }
        if (kb.presses("g")) {
            this.makePurchase(4, true);
        }
        if (kb.presses("h")) {
            this.upgradeBoard.visible = true;
        }

        // Shop Buttons
        for (let i = 0; i < this.shopButtonBack.length; i++) {
            if (this.shopButtonBack[i].mouse.hovering() || this.shopButtonImages[i].mouse.hovering()) {
                this.shopButtonBack[i].scale = 1.2;
                this.shopButtonImages[i].rotationSpeed = 1;
                this.price[i].visible = true;

                if (this.shopButtonBack[i].mouse.presses() || this.shopButtonImages[i].mouse.presses()) {
                    if (i < this.shopButtonBack.length - 1) {
                        this.makePurchase(i, true);
                    } else {
                        this.upgradeBoard.visible = !this.upgradeBoard.visible;
                    }
                }
            } else {
                this.shopButtonBack[i].scale = 1;
                this.shopButtonImages[i].rotationSpeed = 0;
                this.shopButtonImages[i].rotation = -90;
                this.price[i].visible = false;
                if (kb.presses("escape")) {
                    this.upgradeBoard.visible = false;
                    this.upgradeContent.visible = false;
                    this.upgradeNameImage.visible = false;
                    this.upgradeNameBack.visible = false;
                    this.upgradeText.visible = false;
                }
            }
        }

        //Upgrade Buttons
        if (this.upgradeBoard.visible) {
            this.upgradeNameImage.visible = true;
            this.updateUpgradeStates();
        } else {
            this.upgradeNameImage.visible = false;
            this.upgradeNameBack.visible = false;
            this.upgradeText.visible = false;
            this.upgradeContent.visible = false;
        }
    }

    updateUpgradeStates() {
        for (let i = 0; i < this.upgradeNameImage.length; i++) {
            if (this.upgradeNameImage[i].mouse.hovering()) {
                this.upgradeNameImage[i].scale = 1.2;

                if (this.upgradeNameImage[i].mouse.presses()) {
                    this.selectedUpgrade = i;
                }
            } else {
                this.upgradeNameImage[i].scale = 1;
            }

            if (i === this.selectedUpgrade) {
                this.upgradeText.subgroups[i].visible = true;
                this.upgradeNameBack[i].visible = true;
                this.upgradeContent.subgroups[i].visible = true;
                this.upgradeText.subgroups[i].layer = 100000;
                this.upgradeContent.subgroups[i].layer = 100000;
                this.upgrade
            } 
            if (i != this.selectedUpgrade) {
                this.upgradeText.subgroups[i].visible = false;
                this.upgradeNameBack[i].visible = false;
                this.upgradeContent.subgroups[i].visible = false;
                this.upgradeText.subgroups[i].layer = 99999;
                this.upgradeContent.subgroups[i].layer = 99999;
            }
        }

        for (let i = 0; i < this.upgradeContent.length; i++) {
            if (this.upgradeContent[i].mouse.hovering()) {
                this.upgradeContent[i].scale = 1.2;
                if (this.upgradeContent[i].mouse.presses()) {
                    this.makePurchase(i, false);
                }
            } else {
                this.upgradeContent[i].scale = 1;
            }
        }
    }
}