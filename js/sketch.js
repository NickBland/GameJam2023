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

let mothership1, mothership2;

let ui;

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
        switch (ui.selectedGroup) {
            case 0:
                for (let i = 0; i < data.playerShip.drones.length; i++) {
                    let thisShip = data.playerShip.drones[i];
                    data.playerShip.movementLogic(thisShip);
                }
                break;
            case 1:
                for (let i = 0; i < data.playerShip.corsairs.length; i++) {
                    let thisShip = data.playerShip.corsairs[i];
                    data.playerShip.movementLogic(thisShip);
                }
                break;
            case 2:
                for (let i = 0; i < data.playerShip.destroyers.length; i++) {
                    let thisShip = data.playerShip.destroyers[i];
                    data.playerShip.movementLogic(thisShip);
                }
                break;
            case 3:
                for (let i = 0; i < data.playerShip.cruisers.length; i++) {
                    let thisShip = data.playerShip.cruisers[i];
                    data.playerShip.movementLogic(thisShip);
                }
                break;
            case 4:
                for (let i = 0; i < data.playerShip.battleships.length; i++) {
                    let thisShip = data.playerShip.battleships[i];
                    data.playerShip.movementLogic(thisShip);
                }
                break;
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
