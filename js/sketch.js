"use strict";

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
    }
}


class asteroid {
    constructor() {
        randomSeed(Date.now()); // Set the current seed to the epoch time
        this.d = Math.floor(random(50, 150));

        this.x = random(this.d, width - this.d);
        this.y = random(this.d, height - this.d);

        this.sprite = new Sprite(this.x, this.y, this.d); // Create the asteroid sprite itself
        this.sprite.collider = "k";
        this.resources = this.d; // set the starting resources of the asteroid preportional to its diameter (bigger = more)
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


class corsairShip { // Fighter drone
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 100;
        this.sprite.damage = 20;
        this.sprite.w = 15;
        this.sprite.h = 15;
        this.timer = 0;
    }

    travel() {
        if(timer == 0){

        }
    }

    attack() {
        //Create projectiles
    }

    takeDamage() {
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
    }
}

class miningShip { // Mining drone
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 50;
        this.sprite.damage = 10;
        this.sprite.w = 10;
        this.sprite.h = 10;
        this.sprite.resources = 0;
    }

    move(x, y) {
        //Movement logic for ships
    }

    collectResources() {
        //increases resource count when near asteroid
        //this would be what tells the asteroid to lose health
        //possibly returns to MS when full?
    }

    attack() {
        //Create projectiles
    }

    takeDamage() {
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
    }
}

class destroyerShip {
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 150;
        this.sprite.damage = 25;
        this.sprite.w = 15;
        this.sprite.h = 20;
    }

    move(x, y) {
        //Movement logic for ships
    }

    attack() {
        //Create projectiles
    }

    takeDamage() {
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
    }
}

class cruiserShip {
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 200;
        this.sprite.damage = 35;
        this.sprite.w = 20;
        this.sprite.h = 35;
    }

    move(x, y) {
        //Movement logic for ships
    }

    attack() {
        //Create projectiles
    }

    takeDamage() {
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
    }
}
class battleshipShip {
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 300;
        this.sprite.damage = 75;
        this.sprite.w = 35;
        this.sprite.h = 50;
    }

    move(x, y) {
        //Movement logic for ships
    }

    attack() {
        //Create projectiles
    }

    takeDamage() {
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
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
                this.ownedShips.miningShipsGroup.push(unit.sprite);
                break;

            case "corsair":
                unit = new corsairShip(mothership1.x, mothership1.y);
                this.ownedShips.corsairShipsArr.push(unit);
                this.ownedShips.corsairShipsGroup.push(unit.sprite);
                break;

            case "destroyer":
                unit = new destroyerShip(mothership1.x, mothership1.y);
                this.ownedShips.destroyerShipsArr.push(unit);
                this.ownedShips.destroyerShipsGroup.push(unit.sprite);
                break;
            case "cruiser":
                unit = new cruiserShip(mothership1.x, mothership1.y);
                this.ownedShips.cruiserShipsArr.push(unit);
                this.ownedShips.cruiserShipsGroup.push(unit.sprite);
                break;
            case "battleship":
                unit = new battleshipShip(mothership1.x, mothership1.y);
                this.ownedShips.battleshipShipsArr.push(unit);
                this.ownedShips.battleshipShipsGroup.push(unit.sprite);
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
    if(kb.presses("1")){
        selectedType = "mining";
    }
    if(kb.presses("2")){
        selectedType = "corsair";
    }
    if(kb.presses("3")){
        selectedType = "destroyer";
    }
    if(kb.presses("4")){
        selectedType = "cruiser";
    }
    if(kb.presses("5")){
        selectedType = "battleship";
    }
    if(mouse.presses("left")){
        selectedType = "none";
    }
}

function shipMovement(){
    if(mouse.presses("right")){
    switch (selectedType){
        case "corsair":
            for(let i=0; i<mothership1.ownedShips.corsairShipsArr.length; i++){
                mothership1.ownedShips.corsairShipsArr[i].travel();
            }
            break;
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
