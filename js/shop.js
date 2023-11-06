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
    }
    
    /**
     * Function creates the sprites needed for shop purchase selection
     */
    setupShopButtons() {
        this.shopButtonBack = new this.shopButtons.Group();
        this.shopButtonImages = new this.shopButtons.Group();

        let requiredAssets = [droneShipImg.get(), corsairShipImg.get(), destroyerShipImg.get(), cruiserShipImg.get(), battleShipImg.get(), mineralImg.get()];

        let initialShopPositionWidth = 32;
        let initialShopPositionHeight = initialShopPositionWidth * 2;
        let initialShopPositionX = width*0.275;
        let initialShopPositionY = this.container.y + initialShopPositionHeight * 1.25;

        for (let i = 0; i < 6; i++) {
            let button = new Sprite();
            button.x = initialShopPositionX + i * (initialShopPositionWidth * 1.5);
            button.y = initialShopPositionY;
            button.d = initialShopPositionWidth;
            //button.h = initialShopPositionHeight;
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

    /**
     * This function should display text above the shop interface on cost/flavour text for each unit
     * @param {Integer} index The index inside the shop buttons to display text for
     */
    displayFlavourText(index) {

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
                if ((this.shopButtonBack[i].mouse.presses() || this.shopButtonImages[i].mouse.presses()) && i !== this.shopButtonBack.length-1) {
                    this.gameData.createUnit(ui.groupTypes[i], this.gameData.playerShip, this.gameData.playerMothership);
                    ui.miniMapSprites.dots.push(ui.createMiniMapSprite());
                }
            } else {
                this.shopButtonBack[i].scale = 1;
                this.shopButtonImages[i].rotationSpeed = 0;
                this.shopButtonImages[i].rotation = -90;
            }
        }
    }
}