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

        let requiredAssets = [droneShipImg, corsairShipImg, destroyerShipImg, cruiserShipImg, battleShipImg, mineralImg];

        let initialShopPositionWidth = 30;
        let initialShopPositionHeight = initialShopPositionWidth * 2;
        let initialShopPositionX = initialShopPositionWidth * 7.5;
        let initialShopPositionY = this.container.y + initialShopPositionHeight * 1.25;

        for (let i = 0; i < 6; i++) {
            let button = new Sprite();
            button.x = initialShopPositionX + i * (initialShopPositionWidth * 1.5);
            button.y = initialShopPositionY;
            button.w = initialShopPositionWidth;
            button.h = initialShopPositionHeight;
            button.color = '#d19f5a'
            button.strokeWeight = 2
            button.stroke = 'black'
            button.collider = "k";
            button.overlaps(data.playerShip.ships)
            this.shopButtonBack.push(button);

            let buttonImage = new Sprite();
            buttonImage.x = initialShopPositionX + i * (initialShopPositionWidth * 1.5);
            buttonImage.y = initialShopPositionY;
            buttonImage.rotation = -90;
            requiredAssets[i].resize(initialShopPositionWidth, initialShopPositionWidth);
            buttonImage.img = requiredAssets[i];
            buttonImage.collider = "k";
            buttonImage.overlaps(data.playerShip.ships);
            this.shopButtonImages.push(buttonImage);
        }
    }
    
    drawShopButtons() {

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

        for (let i = 0; i < this.shopButtons.length; i++) {
            if (this.shopButtons[i].mouse.hovering()) {
                this.shopButtonBack[i].scale = 1.2;
                this.shopbuttonImages[i].rotationSpeed = 1;
            } else {
                this.shopButtonBack[i].scale = 1;
                this.shopbuttonImages[i].rotationSpeed = 0;
                this.shopbuttonImages[i].rotation = -90;
            }
        }
    }
}