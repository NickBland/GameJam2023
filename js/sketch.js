"use strict";


let asteroidTypes = [
    ["big", 4],
]
let asteroidImages = [];

let numerals= [];



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
        
        // Draw in the health of the mothership at the bottom right
        let healthDigit1, healthDigit2, healthDigit3;
        healthDigit3 = numerals[Math.floor(mothership1.heath % 10)];
        healthDigit2 = numerals[Math.floor((mothership1.health / 10) % 10)];
        healthDigit1 = numerals[Math.floor((mothership1.health / 100) % 10)];

        image(healthDigit1, width*0.9, this.h/2);
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


class corsairShip { // Fighter drone
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 100;
        this.sprite.damage = 20;
        this.sprite.w = 15;
        this.sprite.h = 15;
    }

    move(x,y){
        //Movement logic for ships
    }

    attack(){
        //Create projectiles
    }

    takeDamage(){
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

    move(x,y){
        //Movement logic for ships
    }

    collectResources(){
        //increases resource count when near asteroid
        //this would be what tells the asteroid to lose health
        //possibly returns to MS when full?
    }

    attack(){
        //Create projectiles
    }

    takeDamage(){
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
    }
}

class destroyerShip{
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 150;
        this.sprite.damage = 25;
        this.sprite.w = 15;
        this.sprite.h = 20;
    }

    move(x,y){
        //Movement logic for ships
    }

    attack(){
        //Create projectiles
    }

    takeDamage(){
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
    }
}

class cruiserShip{
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 200;
        this.sprite.damage = 35;
        this.sprite.w = 20;
        this.sprite.h = 35;
    }

    move(x,y){
        //Movement logic for ships
    }

    attack(){
        //Create projectiles
    }

    takeDamage(){
        //subtract health when hit by enemy projectiles
        //logic to die when 0 health
    }
}
class battleshipShip{
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 300;
        this.sprite.damage = 75;
        this.sprite.w = 35;
        this.sprite.h = 50;
    }

    move(x,y){
        //Movement logic for ships
    }

    attack(){
        //Create projectiles
    }

    takeDamage(){
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

        this.ownedShips = [];

        this.sprite = new Sprite(this.x, this.y, this.w, this.h, "k"); //creates the mothership sprite
    }

    //Creates the child units - needs to be fed the argument for unit type
    createUnit(type) {
        switch (type) {
            case "mining":
                
                break;

            case "corsair":
                
                break;

            case "destroyer":
                
                break;
            default:
        }

        this.ownedShips.push(unit);
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
