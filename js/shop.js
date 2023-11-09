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
        this.upgradeButtonsBack = new this.upgradeButtons.Group();
        this.upgradeButtonsText = new this.upgradeButtons.Group();
        this.upgradeButtonsImage = new this.upgradeButtons.Group();
        this.upgrades = this.gameData.upgrades;
        this.setupUpgradeButtons();
        this.upgradeButtonsText.layer = 10000;

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

        let requiredAssets = [upgradeImg.get(), droneShipImg.get(), corsairShipImg.get(), destroyerShipImg.get(), cruiserShipImg.get(), battleShipImg.get()];
        requiredAssets[0].resize(30, 0);

        for (let i = 0; i < this.upgrades.length; i++) {
            let column = this.upgrades[i];
            for (let j = 1; j < column.length; j++) {
                let button = new Sprite();
                button.x = initialButtonX + i * (width * 0.8 / 5.75);  // Set Column
                button.y = initialButtonY + ((j - 1)) * (height * 0.5 / 5.5); //Set Row
                button.d = initialButtonW;
                button.color = '#8ea091';
                button.strokeWeight = 2;
                button.stroke = 'black';
                button.collider = "k";
                button.text = j;
                button.cost = column[j].cost;
                button.indexX = i;
                button.indexY = j;
                this.upgradeButtonsBack.push(button);


                // GENERATE FLAVOUR TEXT FOR THIS UPGRADE
                let x;
                if (i === 0) {
                    x = button.x + button.d;
                } else if (i === this.upgrades.length - 1) {
                    x = button.x - button.d;
                } else {
                    x = button.x;
                }
                let flavour = new Sprite(x, button.y - button.d * 2);
                flavour.w = 1;
                flavour.h = 1;
                flavour.collider = "k";
                flavour.draw = () => {
                    let width;

                    if (column[j].name.length > column[j].effectText.length) {
                        width = column[j].name.length;
                    } else {
                        width = column[j].effectText.length;
                    }

                    fill('#ffe7d6');
                    strokeWeight(2);
                    rect(0, 0, width * 10, 80);
                    noStroke();
                    fill('black');

                    textSize(14);
                    textAlign(LEFT, CENTER);
                    text(column[j].cost, -(width * 4.5) + 20, -20);
                    let icon = specialmineralImg.get();
                    icon.resize(20, 0);
                    image(icon, -(width * 4.5), -20);
                    text(column[j].name, -(width * 4.5), -6);
                    text(column[j].effectText, -(width * 4.5), 8);

                };
                this.upgradeButtonsText.push(flavour);
            }

            let columnImage = new Sprite();
            columnImage.x = initialButtonX + i * (width * 0.8 / 5.75);
            columnImage.y = initialButtonY - (height * 0.06);
            columnImage.collider = "k";
            columnImage.img = requiredAssets[i];
            columnImage.overlaps(allSprites);
            this.upgradeButtonsImage.push(columnImage);
        }
        this.upgradeButtons.visible = false;

        this.upgradeButtonsBack.overlaps(allSprites); // Final adjustments
        this.upgradeButtonsImage[0].rotation = -90;
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

            strokeWeight(3);
            line(-225, -(height * 0.15), -225, (height * 0.3));
            line(-110, -(height * 0.15), -110, (height * 0.3));
            line(0, -(height * 0.15), 0, (height * 0.3));
            line(110, -(height * 0.15), 110, (height * 0.3));
            line(225, -(height * 0.15), 225, (height * 0.3));
        }
        this.upgradeBoard.collider = 'n';
        this.upgradeBoard.visible = false;
    }

    /**
     * Create the sprite used to display an error notification when the user 
     */
    setupNotEnoughNoti() {
        let notEnoughNoti = new Sprite();
        notEnoughNoti.collider = 'n'
        notEnoughNoti.draw = () => {
            strokeWeight(2);
            fill('#8b4049');
            rect(-width / 2 + 145, -height / 2 + 45, 250, 50, 5);

            image(purchaseImg, -width / 2 + 35, -height / 2 + 35);
            textFont("myFont", 14);
            textAlign(LEFT, CENTER);
            fill('#d19f5a');
            text("Purchase Failed", -width / 2 + 50, -height / 2 + 35);
            noStroke();
            fill('black');
            text("Not enough resources", -width / 2 + 30, -height / 2 + 55);
        }
        notEnoughNoti.life = 45;
    }

    #checkCost(button, ship) {
        if (ship) {
            return (data.playerShip.resources >= this.buttonValue[button]);
        } else {
            return (data.playerShip.specialResources >= this.upgradeButtonsBack[button].cost);
        }
    }

    makePurchase(button, ship) {
        if (ship) {
            if (this.#checkCost(button, ship)) {
                this.gameData.createUnit(ui.groupTypes[button], this.gameData.playerShip, this.gameData.playerMothership);
                ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
                data.playerShip.resources -= this.buttonValue[button]
            } else {
                this.setupNotEnoughNoti();
            }
        } else {
            if (this.#checkCost(button)) {
                this.upgrades[this.upgradeButtonsBack[button].indexX][this.upgradeButtonsBack[button].indexY].playerOwned = true;
                this.gameData.playerShip.ownedUpgrades.push([this.upgradeButtonsBack[button].indexX, this.upgradeButtonsBack[button].indexY]);
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
            for (let i = 0; i < this.upgradeButtonsBack.length; i++) {
                if (this.upgrades[this.upgradeButtonsBack[i].indexX][this.upgradeButtonsBack[i].indexY].playerOwned) {
                    this.upgradeButtonsBack[i].color = "#515262";
                } else {
                    if (!this.#checkCost(i, false)) {
                        this.upgradeButtonsBack[i].color = "#8b4049";
                    } else {
                        this.upgradeButtonsBack[i].color = "#8ea091";
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
                        this.upgradeButtonsBack.visible = !this.upgradeButtonsBack.visible;
                        this.upgradeButtonsImage.visible = !this.upgradeButtonsImage.visible;

                    }
                }
            } else {
                this.shopButtonBack[i].scale = 1;
                this.shopButtonImages[i].rotationSpeed = 0;
                this.shopButtonImages[i].rotation = -90;
                this.price[i].visible = false;
                if (kb.presses("escape")) {
                    this.upgradeBoard.visible = false;
                    this.upgradeButtonsBack.visible = false;
                    this.upgradeButtonsImage.visible = false;
                }
            }
        }

        if (this.upgradeBoard.visible) {
            for (let i = 0; i < this.upgradeButtonsBack.length; i++) {
                if (this.upgradeButtonsBack[i].mouse.hovering()) {
                    this.upgradeButtonsBack[i].scale = 1.2;
                    this.upgradeButtonsText[i].visible = true;
                    if (this.upgradeButtonsBack[i].mouse.presses()) {
                        this.makePurchase(i, false);
                    }
                } else {
                    this.upgradeButtonsBack[i].scale = 1;
                    this.upgradeButtonsText[i].visible = false;
                }
            }
        }
    }
}