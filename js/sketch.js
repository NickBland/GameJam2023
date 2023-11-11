"use strict";

let myfont, myfontB;

let loadingAni, loadingDone;

let mainMenuBgImg;
let offset_menuX = 0;
let tutorialAni;

let gameBgImg, miniFOV;
let motherShipImg, droneShipImg, destroyerShipImg, cruiserShipImg, corsairShipImg, battleShipImg;
let asteroidInitial, asteroidExplode, mineralImg, specialmineralImg;
let missileImg, bulletImg, flameshotImg, explosionEffect, bigexplosionEffect, smallexplosionEffect;
let harvestImg, upgradeImg, purchaseImg, generalUpgradeImg;

let s_allships, s_drones, s_corsairs, s_destroyers, s_cruisers, s_battleships;
let health;

let winGame;
let wonImg, lostImg;

let cursorImg, pressedButton_sound;

let menuMusic, gameMusic, wonMusic, lostMusic;

let gameState = {
    loading: true,
    mainMenu: false,
    game: false,
    endScreen: false,
}

function changeGameState(type) {
    gameState.loading = gameState.mainMenu = gameState.game = gameState.endScreen = false;
    switch (type) {
        case "loading":
            gameState.loading = true;
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

// ========================================= LOADING =======================================================
let loadingScreen;
let initialLoadingState = true;

function drawInitialLoadingScreen() {
    loadingScreen = new loading();
    loadingScreen.drawLoadingScreen();
}

function drawLoadingScreen() {
    if (initialLoadingState) {
        drawInitialLoadingScreen();
        initialLoadingState = false;
    }
    loadingScreen.drawLoadingScreen();
}

// ========================================= MAIN MENU =======================================================

let menuScreen;
let initialMenuState = true;

function drawInitialMenuScreen() {
    menuScreen = new mainMenu();

    initialMenuState = false;
}

function drawMainMenuScreen() {
    if (initialMenuState) {
        drawInitialMenuScreen();
    }
    menuScreen.drawMainMenuScreen();
}

// ============================================ GAME ========================================================

let initialGameState = true;

let camera;

let data;

let ui;

let selectionBox;

function drawInitialGameState() {
    camera = new customCamera;

    data = new gameData();
    data.setupGame();

    ui = new userInterface;

    ui.miniMap(); // Render the Minimap

    for (let i = 0; i < 16; i++) {
        camera.moveGame(100, 100);
    }
    initialEndState = true;
    initialGameState = false;
}

function shipMovement() {
    // Handle player input for ship movement
    if (mouse.pressing("right") && ui.miniMapSprites[1].mouse.pressing("right") == false) {
        for (let i = 0; i < data.playerShip.ships.length; i++) {
            let thisShip = data.playerShip.ships[i];
            if (thisShip.selected == true) {
                data.playerShip.movementLogic(thisShip);
            }
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
        for (let j = 0; j < playerShips.length; j++) {
            if (dist(playerShips[j].x, playerShips[j].y, thisShip.x, thisShip.y) < 50 && playerShips[j] != thisShip) {
                playerShips[j].attractTo(thisShip, -2);
            }
        }
        if (thisShip.target != null) {
            thisShip.moveTimer = 10;
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
            if (dist(thisShip.x, thisShip.y, thisEnemy.x, thisEnemy.y) <= thisShip.range) {
                data.playerShip.attack(thisShip, thisEnemy);
            }
            if (dist(thisShip.x, thisShip.y, thisEnemy.x, thisEnemy.y) <= thisEnemy.range) {
                data.enemyShip.attack(thisEnemy, thisShip);
                thisEnemy.visible = true;
            }
        }

        //Checks if a drone can harvest resources
        for (let i = 0; i < data.asteroids.length; i++) {
            let thisAsteroid = data.asteroids[i];
            if (dist(thisShip.x, thisShip.y, thisAsteroid.x, thisAsteroid.y) < (thisAsteroid.radius + 20) && thisShip.group == "drone" && thisShip.resources <= thisShip.resourceCap) {
                data.playerShip.harvestResources(thisShip, thisAsteroid);
            }
        }

        //Handles Resource Harvesting
        if (thisShip.group == "drone") {
            if (dist(thisShip.x, thisShip.y, data.playerMothership.x, data.playerMothership.y) < 65) {
                data.playerShip.resources += thisShip.resources;
                data.playerShip.specialResources += thisShip.specialResources;
                //Resource notification when receive special resources
                if (thisShip.specialResources == 1) {
                    ui.resourceNoti();
                }
                thisShip.resources = 0;
                thisShip.specialResources = 0;
                if (thisShip.target != null) {
                    data.playerShip.setDestination(thisShip.target.x, thisShip.target.y, thisShip);
                }
            }
        }
    }
}

function shipTarget() {
    for (let i = 0; i < data.playerShip.ships.length; i++) {
        let thisShip = data.playerShip.ships[i];
        if (thisShip.selected && mouse.presses("right")) {
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
    if (initialGameState) {
        drawInitialGameState();
    }
    else {
        ui.miniMapSprites.overlaps(data.asteroids);
    }

    gameBgImg.resize(width, height);
    image(gameBgImg, camera.cameraX, camera.cameraY, width * 4, height * 4);

    ui.drawInterface();
    ui.groupSelection(); // Handle user interaction with group selected (keyboard or otherwise)
    ui.clickDrag();
    ui.drawSelectedCircles();
    ui.drawTeamCircles();

    camera.moveCamera();
    ui.miniMapUpdate(camera);

    data.fogOfWar();
    data.handleBorders();

    shipMovement();
    shipAction();
    shipTarget();

    data.enemy.collect();
    data.enemy.move();
    data.enemy.explore();
    data.enemy.progression();

    data.combatHandling();

    //Respawning asteroid mechanics
    if (data.asteroids.length < 100) {
        data.createAsteroid();
    }

    //Selecting asteroid
    cursor(ARROW);
    for (let i=0; i<data.asteroids.length; i++) {
        if (data.asteroids[i].mouse.hovering()) {
            cursor(CROSS);
        }
    }
}

// =======  ===================================== END ========================================================
let endScreen;
let initialEndState = true;
function drawInitialEndScreen() {
    allSprites.remove();
    endScreen = new end();
    endScreen.drawEndScreen();
}

function drawEndScreen() {
    if (initialEndState) {
        drawInitialEndScreen();
        initialEndState = false;
        initialGameState = true;
        initialMenuState = true;
    }
    endScreen.drawEndScreen();
}


function preload() {
    //font
    myfont = loadFont('assets/font/PixeloidMono.ttf');
    myfontB = loadFont('assets/font/PixeloidSans-Bold.ttf');

    //sound effect
    pressedButton_sound = loadSound('assets/sound/button/vgmenuhighlight.wav');

    //background music
    menuMusic = loadSound('assets/music/menuMusic.wav');
    gameMusic = loadSound('assets/music/gameMusic.mp3');
    wonMusic = loadSound('assets/music/wonMusic.ogg');
    lostMusic = loadSound('assets/music/lostMusic.wav');
    
    //cursor
    cursorImg = loadImage('assets/cursor/cursor.png');

    //Loading img
    loadingAni = loadAni("assets/myassets/background/loading/loading1.png", { frameSize: [64, 64], frames: 4 });
    loadingDone = loadAni("assets/myassets/background/loading/loading2.png", { frameSize: [64, 64], frames: 2 });

    //Main Menu img
    mainMenuBgImg = loadImage("assets/myassets/background/mainmenu/mainmenu.png");
    tutorialAni = loadAni("assets/myassets/background/mainmenu/tutorialAni.png", { frameSize: [64, 64], frames: 4 });

    //Game img
    gameBgImg = loadImage("assets/myassets/background/game/game.png");
    miniFOV = loadImage("assets/myassets/background/minimap/clear.png");

    //Ships img
    battleShipImg = loadImage("assets/myassets/ships/battleship.png");
    corsairShipImg = loadImage("assets/myassets/ships/corsairship.png");
    cruiserShipImg = loadImage("assets/myassets/ships/cruisership.png");
    destroyerShipImg = loadImage("assets/myassets/ships/destroyership.png");
    droneShipImg = loadImage("assets/myassets/ships/droneship.png");
    motherShipImg = loadImage("assets/myassets/ships/mothership.png");

    //Projectiles Img
    missileImg = loadAni("assets/myassets/projectile/Missile-Spritesheet.png", { frameSize: [8, 8], frames: 3 });
    bulletImg = loadAni("assets/myassets/projectile/Bullets-Spritesheet.png", { frameSize: [8, 8], frames: 2 });
    flameshotImg = loadAni("assets/myassets/projectile/Flameshot-Spritesheet.png", { frameSize: [8, 8], frames: 2 });
    explosionEffect = loadAni("assets/myassets/projectile/Explosion-Spritesheet.png", { frameSize: [16, 16], frames: 8 });
    bigexplosionEffect = loadAni("assets/myassets/projectile/Big_Explosion.png", { frameSize: [32, 32], frames: 8 });
    smallexplosionEffect = loadAni("assets/myassets/projectile/Small_Explosion.png", { frameSize: [16, 16], frames: 2 });

    //Asteroid img
    asteroidInitial = loadAni('assets/myassets/asteroids/asteroidInitial.png', { frameSize: [96, 96], frames: 1 });
    asteroidExplode = loadAni('assets/myassets/asteroids/asteroidExplode.png', { frameSize: [96, 96], frames: 8 });
    mineralImg = loadImage('assets/myassets/asteroids/mineral.png');
    specialmineralImg = loadImage('assets/myassets/asteroids/specialmineral.png');

    //Shop UI
    harvestImg = loadImage('assets/myassets/shop/harvest.png');
    upgradeImg = loadImage('assets/myassets/shop/upgrade.png');
    purchaseImg = loadImage('assets/myassets/shop/purchase.png');
    generalUpgradeImg = loadImage('assets/myassets/shop/generalUpgrade.png');

    //Upgrade UI
    s_allships = loadAnimation("assets/myassets/upgrade/allships/allships1.png", 4);
    s_drones = loadAnimation("assets/myassets/upgrade/drones/drones1.png", 5);
    s_corsairs = loadAnimation("assets/myassets/upgrade/corsairs/corsairs1.png", 5);
    s_destroyers = loadAnimation("assets/myassets/upgrade/destroyers/destroyers1.png", 5);
    s_cruisers = loadAnimation("assets/myassets/upgrade/cruisers/cruisers1.png", 5);
    s_battleships = loadAnimation("assets/myassets/upgrade/battleships/battleships1.png", 5);

    //Health status img
    health = loadAnimation("assets/myassets/health/heart0.png", 4);
    // Load as an animation which is effectively an array. HOWEVER, the ordering is not messed up due to the async nature of preload
    // Previously, a for loop like asteroids would put the digits in all sorts of orders. Not great when you need to display the corresponding number to the asset name..

    //End Game
    wonImg = loadImage("assets/myassets/background/end/won/won.png");
    lostImg = loadAni("assets/myassets/background/end/lost/lost.png", { frameSize: [64, 64], frames: 4 });
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