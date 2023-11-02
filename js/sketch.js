"use strict";

let myfont, myfontB;
let mainMenuBgImg, gameBgImg;
let motherShipImg, droneShipImg, destroyerShipImg, cruiserShipImg, corsairShipImg, battleShipImg; 
let asteroidInitial, asteroidExplode, mineralImg;
let health;

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
    mainMenuBgImg.resize(width, height);
    image(mainMenuBgImg, 0, 0);

    stroke('#d19f5a')
    strokeWeight(5)
    noFill()
    rect(0.2*canvas.w, 0.3*canvas.h, 0.6*canvas.w, 0.11*canvas.h, 20);
    fill('#ffe7d6')
    stroke('#8b4049')
    textAlign(CENTER, CENTER)
    textFont(myfontB, 40)
    text("Game Title", canvas.w/2, 0.35*canvas.h)
}

// ================================================================================================

let initialGameState = true;

let data;

let ui;

let selectionBox;

//TODO Functions lost in refactoring
//Asteroid:
// consumeResource() {
//     // Subtract after set amount of time of drone touching, or whatever
//     // Needs logic to destroy asteroid when it hits 0
// }

// drift() {
//     //Only if we want the asteroids to have a slight drift to them
//     //Needs movement and spin i reckon
//     //we'd need to consider collisions if we did this

function drawInitialGameState() {
    data = new gameData();
    data.setupGame();

    ui = new userInterface;

    initialGameState = false;
}

function shipMovement() {
    // Handle player input for ship movement
    if (mouse.pressing("right")) {
        for (let i = 0; i < data.playerShip.ships.length; i++) {
            let thisShip = data.playerShip.ships[i];
            if (thisShip.selected == true) {
                data.playerShip.movementLogic(thisShip);
            }
        }
    }

    //Unselects all ships when mouse is clicked
    if (mouse.presses() && mouseY <height-100) {
        for (let i = 0; i < data.playerShip.ships.length; i++) {
            data.playerShip.ships[i].selected = false;
        }
    }
    // Handle Ship Movement when in motion
    let playerShips = data.playerShip.ships;   //Turns the ownedShip Object into an array to access it using index not.
    for (let i = 0; i < playerShips.length; i++) {  //Iterates through each type of ship
        let thisShip = playerShips[i];
        if (thisShip.moveTimer > 0) {
            data.playerShip.travel(thisShip);
            thisShip.moveTimer--;
        } else if (thisShip.moveTimer === 0) {
            thisShip.speed = 0;
            thisShip.rotationSpeed = 0;
        } else if (thisShip.moveTimer < 0) {
            thisShip.moveTimer = 0;
        }
        for(let j = 0; j<playerShips.length; j++){
            if(dist(playerShips[j].x, playerShips[j].y, thisShip.x, thisShip.y)<50 && playerShips[j] != thisShip){
                playerShips[j].attractTo(thisShip,-2);
            }
        }
    }
}

//Handles ship combat call and resource collection calls
function shipAction() {
    for (let i = 0; i < data.playerShip.ships.length; i++) {
        let thisShip = data.playerShip.ships[i];

        //Checks if a ship can attack
        for (let j = 0; j < data.enemyShip.ships.length; j++) {
            let thisEnemy = data.enemyShip.ships[j];
            if (dist(thisShip.x, thisShip.y, thisEnemy.x, thisEnemy.y) <= 150) {
                data.playerShip.attack(thisShip, thisEnemy);
                data.enemyShip.attack(thisEnemy, thisShip);
            }
        }

        //Checks if a drone can harvest resources
        for (let i = 0; i < data.asteroids.length; i++) {
            let thisAsteroid = data.asteroids[i];
            if (dist(thisShip.x, thisShip.y, thisAsteroid.x, thisAsteroid.y) < 50 && thisShip.group == "drone") {
                data.playerShip.harvestResources(thisShip, thisAsteroid);
            }
        }

        //Handles Resource Harvesting
        if(thisShip.group == "drone"){
            if(dist(thisShip.x,thisShip.y,data.playerMothership.x,data.playerMothership.y)<65){
                data.playerShip.resources += thisShip.resources;
                thisShip.resources = 0;
                if(thisShip.target != null){
                    data.playerShip.setDestination(thisShip.target.x,thisShip.target.y,thisShip);
                    thisShip.timer = dist((thisShip.target.x,thisShip.target.y,thisShip.x,thisShip.y));
                }
            }
        }
    }
}

function shipTarget() {
    for (let i = 0; i < data.playerShip.ships.length; i++) {
        let thisShip = data.playerShip.ships[i];
        if(thisShip.selected&&mouse.presses("right")){
            thisShip.target = null;
        }
        for (let j = 0; j < data.enemyShip.ships.length; j++) {
            let thisEnemy = data.enemyShip.ships[j];
            if (thisShip.selected == true && thisEnemy.mouse.presses("right")) {
                thisShip.target = thisEnemy;
            }
        }
        for (let j = 0; j < data.asteroids.length; j++) {
            let thisAsteroid = data.asteroids[j];
            if (thisShip.selected == true && thisAsteroid.mouse.presses("right") && thisShip.group == "drone") {
                thisShip.target = thisAsteroid;
            }
        }
    }
}

function drawGameScreen() {
    //background("red");
    gameBgImg.resize(width, height);
    image(gameBgImg, width/2, height/2);
    if (initialGameState) {
        drawInitialGameState();
    }

    ui.drawInterface();
    ui.groupSelection(); // Handle user interaction with group selected (keyboard or otherwise)
    ui.clickDrag();

    shipMovement();
    shipAction();
    shipTarget();

    data.combatHandling();
}

function drawEndScreen() {
    background("black");
}

function preload() {
    //font
    myfont = loadFont('assets/font/PixeloidMono.ttf')
    myfontB = loadFont('assets/font/PixeloidSans-Bold.ttf')

    //Background img
    mainMenuBgImg = loadImage("assets/images/myassets/background/mainMenu.png")
    gameBgImg = loadImage("assets/images/myassets/background/game2.png")

    //Ships img
    battleShipImg = loadImage("assets/images/myassets/ships/battleship.png")
    corsairShipImg = loadImage("assets/images/myassets/ships/corsairship.png")
    cruiserShipImg = loadImage("assets/images/myassets/ships/cruisership.png")
    destroyerShipImg = loadImage("assets/images/myassets/ships/destroyership.png")
    droneShipImg = loadImage("assets/images/myassets/ships/droneship.png")
    motherShipImg = loadImage("assets/images/myassets/ships/mothership.png")

    //Asteroid img
    asteroidInitial = loadAni('assets/images/myassets/asteroids/asteroidInitial.png', {frameSize: [96, 96], frames: 1});
    asteroidExplode = loadAni('assets/images/myassets/asteroids/asteroidExplode.png', {frameSize: [96, 96], frames: 8});
    mineralImg = loadImage('assets/images/myassets/asteroids/mineral.png');

    health = loadAnimation("assets/images/myassets/health/heart0.png", 4);

    numerals = loadAnimation("assets/images/typography/numeral0.png", 9); // Load as an animation which is effectively an array. HOWEVER, the ordering is not messed up due to the async nature of preload
    // Previously, a for loop like asteroids would put the digits in all sorts of orders. Not great when you need to display the corresponding number to the asset name...
}

function setup() {
    new Canvas(800, 800);
}

function draw() {
    clear();
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