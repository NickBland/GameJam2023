"use strict";

let asteroidTypes = [
    ["big", 4],
]
let asteroidImages = [];

let numerals;

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

let data;

let ui;

let selectionBox;
let selectionBoxX = 0;
let selectionBoxY = 0;

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

//MotherShip:
// takeDamage() {
//     //subtract health upon fire from enemies
//     //Needs logic for when health hits zero - Game Over
// }

// move() {
//     //only for if mothership will need to move
//     //will need to move to the location specified by the user
// }

// attack() {
//     //only for if the mothership can defend itself
//     //needs logic to detect enemies and deal damage/create projectiles
// }

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
        } else if (thisShip.moveTimer < 0) {
            thisShip.moveTimer = 0;
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
            if (dist(thisShip.x, thisShip.y, thisEnemy.x, thisEnemy.y) <= 50) {
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
    background("green");
    if (initialGameState) {
        drawInitialGameState();
    }

    ui.drawInterface();
    ui.groupSelection(); // Handle user interaction with group selected (keyboard or otherwise)

    shipMovement();
    shipAction();
    shipTarget();
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

    numerals = loadAnimation("assets/images/typography/numeral0.png", 9); // Load as an animation which is effectively an array. HOWEVER, the ordering is not messed up due to the async nature of preload
    // Previously, a for loop like asteroids would put the digits in all sorts of orders. Not great when you need to display the corresponding number to the asset name...
}


function setup() {
    new Canvas(800, 800);

    selectionBox = new Sprite();
    selectionBox.overlapping(allSprites);
    selectionBox.rotationLock = true;
    selectionBox.visible = false;
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

    clickDrag();
}

function clickDrag() {
    if (mouse.pressing()) {
        if (mouseX > selectionBoxX) {
            selectionBox.w = (mouseX - selectionBoxX) + 1;
            selectionBox.x = (selectionBoxX + mouseX) / 2;
        }
        if (mouseY > selectionBoxY) {
            selectionBox.h = (mouseY - selectionBoxY) + 1;
            selectionBox.y = (selectionBoxY + mouseY) / 2;
        }
        if (mouseX < selectionBoxX) {
            selectionBox.w = (selectionBoxX - mouseX) + 1;
            selectionBox.x = mouseX + selectionBox.w / 2;
        }
        if (mouseY < selectionBoxY) {
            selectionBox.h = (selectionBoxY - mouseY) + 1;
            selectionBox.y = mouseY + selectionBox.h / 2;
        }
        selectionBox.visible = true;
    }
    else {
        selectionBox.visible = false;
        selectionBox.x = -50;
        selectionBox.y = -50;
        selectionBox.w = 10;
        selectionBox.h = 10;

        selectionBoxX = mouseX;
        selectionBoxY = mouseY;
    }

    if (mouse.presses()) {
        selectionBoxX = mouseX;
        selectionBoxY = mouseY;
    }

    if (mouse.released()) {
        for (let i = 0; i < data.playerShip.ships.length; i++) {
            let thisShip = data.playerShip.ships[i];
            if (selectionBox.overlapping(thisShip)) {
                thisShip.selected = true;
            }
        }
    }
}