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

        this.resources = this.d; // set the starting resources of the asteroid preportional to its diameter (bigger = more)
    }

    consumeResource() {
        // Subtract after set amount of time of drone touching, or whatever
        // Needs logic to destroy asteroid when it hits 0
    }

    drift(){
        //Only if we want the asteroids to have a slight drift to them
        //Needs movement and spin i reckon
        //we'd need to consider collisions if we did this
    }

}


class corsairShip { // Fighter drone
    constructor(x, y) {
        this.x = x;
        this.y = y
        this.health = 100;
    }
}

class miningShip { // Mining drone
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 50;
    }    
}

class mothership {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.w = 75;
        this.h = 75;
        this.health = 500;
        this.shipType = ["type1","type2","type3"]; //Should hold the types of ship the MS can create - needs to be filled

        this.ownedShips = [];

        this.sprite = new Sprite(this.x, this.y, this.w, this.h); //creates the mothership sprite
    }

    //Creates the child units - needs to be fed the argument for unit type
    createUnit(type) {
        let unit = new Sprite(this.x, this.y);  //Creates the unit

        switch (type) {
            case "type1":
                unit.w = 20;
                unit.h = 20;
                unit.health = 10;
                break;

                case "type2":
                unit.w = 30;
                unit.h = 30;
                unit.health = 30;
                break;

                case "type3":
                unit.w = 40;
                unit.h = 40;
                unit.health = 50;
                break;
            default:
        }

        this.ownedShips.push(unit);
    }

    takeDamage(){
        //subtract health upon fire from enemies
        //Needs logic for when health hits zero - Game Over
    }

    move(){
        //only for if mothership will need to move
        //will need to move to the location specified by the user
    }

    attack(){
        //only for if the mothership can defend itself
        //needs logic to detect enemies and deal damage/create projectiles
    }
}

function drawInitialGameState() {
    shop = new userInterface;
    usableHeight = height - shop.container.h;
    let asteroid1 = new asteroid;
    mothership1 = new mothership(100,100);
    mothership2 = new mothership(width-100,usableHeight-100);
    initialGameState = false;
}

function drawGameScreen() {
    background("green");
    if (initialGameState) {
        drawInitialGameState();
    }

    shop.drawInterface()

}

function drawEndScreen() {
    background("black");
}

function preload() {

}

function setup() {
    new Canvas(800, 800);
    //Works
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
