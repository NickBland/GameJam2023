/**
 * @class holds all the buying buttons for creation of new ships!
 */
class shop {
    constructor(container) {
        this.container = container;
        this.shopButtons = new Group();
        this.shopButtonBack;
        this.shopButtonImages;


        this.setupShopButtons();
    }
    
    /**
     * Function creates the sprites needed for shop purchase selection
     */
    setupShopButtons() {
        this.shopButtonBack = new this.shopButtons.Group();
        this.shopButtonImages = new this.shopButtons.Group();

        let requiredAssets = [droneShipImg, corsairShipImg, destroyerShipImg, cruiserShipImg, battleShipImg, upgradeImg];

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
     * TODO: This function should display text above the shop interface on cost/flavour text for each unit
     * @param {Integer} index The index inside the shop buttons to display text for
     */
    displayFlavourText(index) {

    }

    checkHover() {
        if (kb.presses("a")) {
            // TODO: add implementation
        }
        if (kb.presses("s")) {
            // TODO: add implementation
        }
        if (kb.presses("d")) {
            // TODO: add implementation
        }
        if (kb.presses("f")) {
            // TODO: add implementation
        }
        if (kb.presses("g")) {
            // TODO: add implementation
        }

        for (let i = 0; i < this.shopButtonBack.length; i++) {
            if (this.shopButtonBack[i].mouse.hovering() || this.shopButtonImages[i].mouse.hovering()) {
                this.shopButtonBack[i].scale = 1.2;
                this.shopButtonImages[i].rotationSpeed = 1;
            } else {
                this.shopButtonBack[i].scale = 1;
                this.shopButtonImages[i].rotationSpeed = 0;
                this.shopButtonImages[i].rotation = -90;
            }
        }
    }
}