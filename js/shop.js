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
        let initialShopPositionX = width*0.275;
        let initialShopPositionY = this.container.y + initialShopPositionWidth * 2.5;

        for (let i = 0; i < 6; i++) {
            let button = new Sprite();
            button.x = initialShopPositionX + i * (initialShopPositionWidth * 1.5);
            button.y = initialShopPositionY;
            button.d = initialShopPositionWidth;
            button.color = '#8ea091'
            button.strokeWeight = 2
            button.stroke = 'black'
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

    displayShopName() {
        fill("#ffe7d6")
        text("Assets", this.shopButtonBack[2].x + this.shopButtonBack[2].d, 731.25*0.95)
    }
    /**
     * This function should display text above the shop interface on cost/flavour text for each unit
     * @param {Integer} index The index inside the shop buttons to display text for
     */
    displayFlavourText() {
        for (let i = 0; i < this.shopButtonBack.length; i++) {
            let priceBox = new Sprite(this.shopButtonBack[i].x, this.shopButtonBack[i].y-this.shopButtonBack[i].d);
            priceBox.collider = "k";
            priceBox.draw = () => {
                fill('#ffe7d6');
                strokeWeight(2);
                rect(0, 0, 60, 20);
                noStroke();
                fill('black');
                if (i < this.shopButtonBack.length-1) {
                    textSize(12);
                    textAlign(LEFT, CENTER);
                    text(this.buttonValue[i], 5, 0);
                    let icon = mineralImg.get();
                    icon.resize(15,0);
                    image(icon, 0-10, 0);
                } else {
                    textSize(10);
                    textAlign(CENTER, CENTER);
                    text(this.buttonValue[i], 0, 0);
                }
            }
            priceBox.visible=false;

            this.price.push(priceBox);
        }
    }

    setupUpgradeBoard() {
        this.upgradeBoard = new Sprite();
        this.upgradeBoard.draw = () => {
            fill(0, 150);
            rect(0, 62.5, width*0.8, height*0.5);
        }
        this.upgradeBoard.collider = 'n';
        this.upgradeBoard.visible = false;
    }

    setupNotEnoughNoti() {
        let notEnoughNoti = new Sprite();
        notEnoughNoti.collider = 'n'
        notEnoughNoti.draw = () => {
            strokeWeight(2);
            fill('#8b4049');
            rect(-width/2+145, -height/2+45, 250, 50, 5);

            image(purchaseImg, -width/2+35, -height/2+35);
            textFont("myFont", 14);
            textAlign(LEFT, CENTER);
            fill('#d19f5a');
            text("Purchase Failed", -width/2 + 50, -height/2 + 35);
            noStroke();
            fill('black');
            text("Not enough resources", -width/2 + 30, -height/2 + 55);
        }
        notEnoughNoti.life = 45;  
    }

    checkHover() {
        if (kb.presses("a")) {
            this.gameData.createUnit("drone", this.gameData.playerShip, this.gameData.playerMothership);
            ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
        }
        if (kb.presses("s")) {
            this.gameData.createUnit("corsair", this.gameData.playerShip, this.gameData.playerMothership);
            ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
        }
        if (kb.presses("d")) {
            this.gameData.createUnit("destroyer", this.gameData.playerShip, this.gameData.playerMothership);
            ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
        }
        if (kb.presses("f")) {
            this.gameData.createUnit("cruiser", this.gameData.playerShip, this.gameData.playerMothership);
            ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
        }
        if (kb.presses("g")) {
            this.gameData.createUnit("battleship", this.gameData.playerShip, this.gameData.playerMothership);
            ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
        }

        for (let i = 0; i < this.shopButtonBack.length; i++) {
            if (this.shopButtonBack[i].mouse.hovering() || this.shopButtonImages[i].mouse.hovering()) {
                this.shopButtonBack[i].scale = 1.2;
                this.shopButtonImages[i].rotationSpeed = 1;
                this.price[i].visible = true;
                
                if (this.shopButtonBack[i].mouse.presses() || this.shopButtonImages[i].mouse.presses()) {
                    if (i < this.shopButtonBack.length-1) {
                        if (data.playerShip.resources >= this.buttonValue[i]) {
                            this.gameData.createUnit(ui.groupTypes[i], this.gameData.playerShip, this.gameData.playerMothership);
                            ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
                            data.playerShip.resources -= this.buttonValue[i]
                        } else if (data.playerShip.resources < this.buttonValue[i]){
                            this.setupNotEnoughNoti();
                        } 
                    } else {
                        this.upgradeBoard.visible = true;
                    }
                }
            } else {
                this.shopButtonBack[i].scale = 1;
                this.shopButtonImages[i].rotationSpeed = 0;
                this.shopButtonImages[i].rotation = -90;
                this.price[i].visible = false;
                if (kb.presses("escape")) {
                    this.upgradeBoard.visible = false;
                }
            }
        }
    }
}