"use strict";


let asteroidTypes = [
    ["big", 4],
]
let asteroidImages = [];

let numerals = [];



let gameState = {
    loading: false,
    mainMenu: false,
    game: true,
    endScreen: false,
}

function changeGameState(type) {
    gameState.loading = gameState.mainMenu = gameState.game = gameState.endScreen = false;
    switch (type) {
        case "loading":
            loading = true;
            break;
        case "mainMenu":
            gameState.mainMenu = true;
            break;
        case "game":
            gameState.game = true;
            break;
        case "endScreen":
            gameState.endScreen = true;
            break;
    }
}

function drawLoadingScreen() {
    background("red");
}

function drawMainMenuScreen() {
    background("blue");
}

// ================================================================================================

let initialGameState = true;

let mothership1, mothership2;

let usableHeight;

let shop

let selectedType = "none";

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


    drawInterface() {
        fill(255, 255, 255, 100);
        rect(this.container.x, this.container.y, this.container.w, this.container.h);
        noFill();

        // Draw in the health of the mothership at the bottom right
        let healthDigit1, healthDigit2, healthDigit3;
        healthDigit3 = numerals[Math.floor(mothership1.heath % 10)];
        healthDigit2 = numerals[Math.floor((mothership1.health / 10) % 10)];
        healthDigit1 = numerals[Math.floor((mothership1.health / 100) % 10)];

        image(healthDigit1, width * 0.9, this.h / 2);
    }
}


class asteroid {
    constructor() {
        randomSeed(Date.now()); // Set the current seed to the epoch time
        this.d = Math.floor(random(25, 70));

        this.x = random(this.d, width - this.d);
        this.y = random(this.d, usableHeight - this.d);

        this.sprite = new Sprite(this.x, this.y, this.d); // Create the asteroid sprite itself

        let index = Math.floor(random(0, 1000)) % asteroidImages.length
        this.sprite.img = asteroidImages[index].get(); // <------------ GET COPIES IMAGE INSTEAD OF REFERENCE
        this.sprite.img.resize(this.d, 0); // resize the copied image and sprite hitbox, leaving original intact

        this.resources = this.d * 1.5; // set the starting resources of the asteroid preportional to its diameter (bigger = more)
    }

    consumeResource() {
        // Subtract after set amount of time of drone touching, or whatever
        // Needs logic to destroy asteroid when it hits 0
    }

    drift() {
        //Only if we want the asteroids to have a slight drift to them
        //Needs movement and spin i reckon
        //we'd need to consider collisions if we did this
    }

}

class spawnedShip {
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 100;
        this.sprite.damage = 20;
        this.sprite.w = 15;
        this.sprite.h = 15;
        this.timer = 0;

        this.movingTowardsX = 0;
        this.movingTowardsY = 0;
    }

    setDestination(x, y) {
        this.movingTowardsX = x;
        this.movingTowardsY = y;
    }

    travel() {
        this.sprite.moveTo(this.movingTowardsX, this.movingTowardsY, 3);
        this.sprite.rotation = this.sprite.direction;
    }

    attack() {
        //Create projectiles
    }

    takeDamage() {
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
    }
}

class corsairShip extends spawnedShip { // Fighter drone
    constructor(x, y) {
        super(x, y);
    }
}

class miningShip extends spawnedShip { // Mining drone
    constructor(x, y) {
        super(x, y);
        this.sprite.health = 50;
        this.sprite.damage = 10;
        this.sprite.w = 10;
        this.sprite.h = 10;
        this.sprite.resources = 0;
    }

    attack() {
        return;
    }
}

class destroyerShip extends spawnedShip {
    constructor(x, y) {
        super(x, y);
        this.sprite.health = 150;
        this.sprite.damage = 25;
        this.sprite.w = 15;
        this.sprite.h = 20;
    }
}

class cruiserShip extends spawnedShip {
    constructor(x, y) {
        super(x, y);
        this.sprite.health = 200;
        this.sprite.damage = 35;
        this.sprite.w = 20;
        this.sprite.h = 35;
    }
}
class battleshipShip extends spawnedShip {
    constructor(x, y) {
        super(x, y);
        this.sprite.health = 300;
        this.sprite.damage = 75;
        this.sprite.w = 35;
        this.sprite.h = 50;
    }
}
class mothership {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 75;
        this.h = 75;
        this.health = 500;
        this.shipType = ["mining", "corsair", "destroyer", "cruiser", "battleship"]; //Should hold the types of ship the MS can create - needs to be filled

        this.ownedShips = {
            miningShipsArr: [],
            corsairShipsArr: [],
            destroyerShipsArr: [],
            cruiserShipsArr: [],
            battleshipShipsArr: [],
        };

        this.sprite = new Sprite(this.x, this.y, this.w, this.h, "k"); //creates the mothership sprite
    }

    //Creates the child units - needs to be fed the argument for unit type
    createUnit(type) {
        let unit;
        switch (type) {
            case "mining":
                unit = new miningShip(mothership1.x, mothership1.y);
                this.ownedShips.miningShipsArr.push(unit);
                break;

            case "corsair":
                unit = new corsairShip(mothership1.x, mothership1.y);
                this.ownedShips.corsairShipsArr.push(unit);
                break;

            case "destroyer":
                unit = new destroyerShip(mothership1.x, mothership1.y);
                this.ownedShips.destroyerShipsArr.push(unit);
                break;
            case "cruiser":
                unit = new cruiserShip(mothership1.x, mothership1.y);
                this.ownedShips.cruiserShipsArr.push(unit);
                break;
            case "battleship":
                unit = new battleshipShip(mothership1.x, mothership1.y);
                this.ownedShips.battleshipShipsArr.push(unit);
                break;
            default:
        }


    }

    takeDamage() {
        //subtract health upon fire from enemies
        //Needs logic for when health hits zero - Game Over
    }

    move() {
        //only for if mothership will need to move
        //will need to move to the location specified by the user
    }

    attack() {
        //only for if the mothership can defend itself
        //needs logic to detect enemies and deal damage/create projectiles
    }
}

function drawInitialGameState() {
    shop = new userInterface;
    usableHeight = height - shop.container.h;
    let asteroid1 = new asteroid;
    mothership1 = new mothership(100, 100);
    mothership2 = new mothership(width - 100, usableHeight - 100);
    initialGameState = false;

    //Temporary - this spawns one of eac htype on startup for testing
    for (let i = 0; i < mothership1.shipType.length; i++) {
        mothership1.createUnit(mothership1.shipType[i])
    }
}

function shipSelection() {
    if (kb.presses("1")) {
        selectedType = "mining";
    }
    if (kb.presses("2")) {
        selectedType = "corsair";
    }
    if (kb.presses("3")) {
        selectedType = "destroyer";
    }
    if (kb.presses("4")) {
        selectedType = "cruiser";
    }
    if (kb.presses("5")) {
        selectedType = "battleship";
    }
    if (mouse.presses("left")) {
        selectedType = "none";
    }
}

function shipMovement() {
    // Handle player input for ship movement
    if (mouse.pressing("right")) {
        switch (selectedType) {
            case "corsair":
                for (let i = 0; i < mothership1.ownedShips.corsairShipsArr.length; i++) {
                    let thisShip = mothership1.ownedShips.corsairShipsArr[i];
                    if (thisShip.timer === 0) {
                        thisShip.timer = Math.floor(dist(thisShip.sprite.x, thisShip.sprite.y, mouse.x, mouse.y)) / 3;
                        thisShip.setDestination(mouse.x, mouse.y);
                    } else {
                        thisShip.timer = Math.floor(dist(thisShip.sprite.x, thisShip.sprite.y, mouse.x, mouse.y)) / 3;
                        thisShip.setDestination(mouse.x, mouse.y);
                    }
                }
                break;
        }
    }

    // Handle Corsair Movement when in motion
    for (let i = 0; i < mothership1.ownedShips.corsairShipsArr.length; i++) {
        let thisShip = mothership1.ownedShips.corsairShipsArr[i]
        if (thisShip.timer > 0) {
            thisShip.travel();
            thisShip.timer--;
        } else if (thisShip.timer === 0) {
            thisShip.sprite.speed = 0;
        } else if (thisShip.timer < 0) {
            thisShip.timer = 0;
        }
    }
}

function drawGameScreen() {
    background("green");
    if (initialGameState) {
        drawInitialGameState();
    }

    shop.drawInterface()

    shipSelection();
    shipMovement();

}

function drawEndScreen() {
    background("black");
}

function preload() {
    for (let i = 0; i < asteroidTypes.length; i++) {
        for (let j = 1; j < asteroidTypes[i][1] + 1; j++) {
            let assetName = asteroidTypes[i][0] + j + ".png";
            loadImage("assets/images/asteroids/" + assetName, asset => asteroidImages.push(asset));
        }
    }

    for (let i = 0; i < 10; i++) {
        let assetName = "numeral" + i + ".png";
        loadImage("assets/images/typography/" + assetName, asset => numerals.push(asset));
    }
}

function setup() {
    new Canvas(800, 800);

}

function draw() {
    switch (true) {
        case gameState.loading:
            drawLoadingScreen();
            break;
        case gameState.mainMenu:
            drawMainMenuScreen();
            break;
        case gameState.game:
            drawGameScreen();
            break;
        case gameState.endScreen:
            drawEndScreen();
            break;
    }


}
