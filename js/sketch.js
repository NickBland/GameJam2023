"use strict";


/*let asteroidTypes = [
    ["big", 4],
]*/
//let asteroidImages = [];

let asteroidArr = [];

let myfont, myfontB;
let mainMenuBgImage, gameBgImage;
let motherShipImage, miningShipImage, destroyerShipImage, cruiserShipImage, corsairShipImage, battleShipImage; 
//let asteroid1
let asteroidImgs = [];
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
    mainMenuBgImage.resize(width, height);
    image(mainMenuBgImage, 0, 0);

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

let mothership1, mothership2;

let usableHeight;

let ui;


class asteroid {
    constructor() {
        randomSeed(Date.now()); // Set the current seed to the epoch time
        this.d = Math.floor(random(25, 70));

        this.x = random(this.d, width - this.d);
        this.y = random(this.d, usableHeight - this.d);

        this.sprite = new Sprite(this.x, this.y, this.d); // Create the asteroid sprite itself

        //let index = Math.floor(random(0, 1000)) % asteroidImages.length
        //this.sprite.img = asteroidImages[index].get(); // <------------ GET COPIES IMAGE INSTEAD OF REFERENCE

        //Option1 asteroid 
        /*let index = Math.floor(random(0, 1000)) % asteroidImgs.length;
        this.sprite.img = asteroidImg[index].get();
        this.sprite.img.resize(this.d, 0); // resize the copied image and sprite hitbox, leaving original intact
        this.sprite.rotation = random(0, 360);*/

        //Option2 asteroid
        this.sprite.addAni('initial', 'assets/images/myassets/asteroids/asteroidInitial.png', {frameSize: [96, 96], frames: 1})
        this.sprite.addAni('explode', 'assets/images/myassets/asteroids/asteroidExplode.png', {frameSize: [96, 96], frames: 8})
        this.sprite.changeAni('initial');
        //this.sprite.debug = true;
        this.resources = this.d * 1.5; // set the starting resources of the asteroid preportional to its diameter (bigger = more)

        asteroidArr.push(this)
    }

    consumeResource() {
        if (this.resources === 0) {
            this.sprite.changeAni('explode');
        }
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
        this.sprite = new Sprite(); //creates a new ship at the mothership
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.health = 100;
        this.sprite.damage = 20;
        this.sprite.w = 30;
        this.sprite.h = 30;
        //Default attributes match the Corsair ship type

        this.timer = 0;

        this.movingTowardsX = 0;
        this.movingTowardsY = 0;
    }

    setDestination(x, y) {  //Sets where the ship is moving to
        this.movingTowardsX = x;
        this.movingTowardsY = y;
    }

    movementLogic(thisShip) {
        if (thisShip.timer === 0) {
            thisShip.timer = Math.floor(dist(thisShip.sprite.x, thisShip.sprite.y, mouse.x, mouse.y)) / 3;
            thisShip.setDestination(mouse.x, mouse.y);
        } else {
            thisShip.timer = Math.floor(dist(thisShip.sprite.x, thisShip.sprite.y, mouse.x, mouse.y)) / 3;
            thisShip.setDestination(mouse.x, mouse.y);
        }
    }

    travel() {  //Moves the ship to destination
        this.sprite.moveTo(this.movingTowardsX, this.movingTowardsY, 3);
        this.sprite.rotation = this.sprite.direction;
    }

    attack(thisEnemy) {
        //createProjectile(thisEnemy, this.damage);
        console.log("Pow")
    }

    takeDamage(damage) {
        this.health -= damage;
    }
}

class corsairShip extends spawnedShip { // Fighter drone
    constructor(x, y) {
        super(x, y);
        this.sprite.img = corsairShipImage.get()
        this.sprite.img.resize(this.sprite.w, this.sprite.h)
    }
}

class miningShip extends spawnedShip { // Mining drone
    constructor(x, y) {
        super(x, y);
        this.sprite.health = 50;
        this.sprite.damage = 10;
        this.sprite.w = 20;
        this.sprite.h = 20;
        this.sprite.img = miningShipImage.get()
        this.sprite.img.resize(this.sprite.w, this.sprite.h)
        this.sprite.resources = 0;
    }

    attack(thisEnemy) {
        this.sprite.attractTo(thisEnemy.sprite, -20);
    }

    harvestResources(thisAsteroid) {
        //createProjectile(thisAsteroid);
        console.log("Kerpow");
        if (this.sprite.resources < 5) {
            if (frameCount % 10 == 0) {
                this.sprite.resources++;
            }
        }
        else {
            this.setDestination(mothership1.x, mothership1.y);
            this.timer = (mothership1.x, mothership1.y, this.sprite.x, this.sprite.y);

        }
    }
}

class destroyerShip extends spawnedShip {   // Medium-Fighter Drone
    constructor(x, y) {
        super(x, y);
        this.sprite.health = 150;
        this.sprite.damage = 25;
        this.sprite.w = 40;
        this.sprite.h = 40;
        this.sprite.img = destroyerShipImage.get()
        this.sprite.img.resize(this.sprite.w, this.sprite.h)
    }
}

class cruiserShip extends spawnedShip { // Heavy-Fighter Drone
    constructor(x, y) {
        super(x, y);
        this.sprite.health = 200;
        this.sprite.damage = 35;
        this.sprite.w = 45;
        this.sprite.h = 45;
        this.sprite.img = cruiserShipImage.get()
        this.sprite.img.resize(this.sprite.w, this.sprite.h)
    }
}

class battleshipShip extends spawnedShip {  //Super-Fighter Drone
    constructor(x, y) {
        super(x, y);
        this.sprite.health = 300;
        this.sprite.damage = 75;
        this.sprite.w = 50;
        this.sprite.h = 50;
        this.sprite.img = battleShipImage.get()
        this.sprite.img.resize(this.sprite.w, this.sprite.h)
    }
}
class mothershipTwo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 80;
        this.h = 80;
        this.health = 500;
        this.shipType = ["mining", "corsair", "destroyer", "cruiser", "battleship"]; //Should hold the types of ship the MS can create - needs to be filled

        this.ownedShips = {
            miningShipsArr: [],
            corsairShipsArr: [],
            destroyerShipsArr: [],
            cruiserShipsArr: [],
            battleshipShipsArr: [],
        };

        this.shipGroup = [];

        this.sprite = new Sprite(this.x, this.y, this.w, this.h, "k"); //creates the mothership sprite
        this.sprite.img = motherShipImage.get()
        this.sprite.img.resize(this.sprite.w, this.sprite.h)
    }

    //Creates the child units - needs to be fed the argument for unit type
    createUnit(type) {
        let unit;
        switch (type) {
            case "mining":
                unit = new miningShip(this.x, this.y);
                this.ownedShips.miningShipsArr.push(unit);
                this.shipGroup.push(unit);
                break;

            case "corsair":
                unit = new corsairShip(this.x, this.y);
                this.ownedShips.corsairShipsArr.push(unit);
                this.shipGroup.push(unit);
                break;

            case "destroyer":
                unit = new destroyerShip(this.x, this.y);
                this.ownedShips.destroyerShipsArr.push(unit);
                this.shipGroup.push(unit);
                break;

            case "cruiser":
                unit = new cruiserShip(this.x, this.y);
                this.ownedShips.cruiserShipsArr.push(unit);
                this.shipGroup.push(unit);
                break;

            case "battleship":
                unit = new battleshipShip(this.x, this.y);
                this.ownedShips.battleshipShipsArr.push(unit);
                this.shipGroup.push(unit);
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
    // ui = new userInterface;
    // usableHeight = height - ui.container.h;
    let asteroid1 = new asteroid;
    asteroid1.sprite.ani.scale = asteroid1.d/45;
    // mothership1 = new mothership(100, 100);
    // mothership2 = new mothership(width - 100, usableHeight - 100);
    

    // //Temporary - this spawns one of eac htype on startup for testing
    // for (let i = 0; i < mothership1.shipType.length; i++) {
    //     mothership1.createUnit(mothership1.shipType[i])
    // }
    // for (let i = 0; i < mothership2.shipType.length; i++) {
    //     mothership2.createUnit(mothership2.shipType[i])
    // }

    data = new gameData();
    data.setupGame();

    
    initialGameState = false;
}

function shipMovement() {
    // Handle player input for ship movement
    if (mouse.pressing("right")) {
        switch (ui.selectedGroup) {
            case 0:
                for (let i = 0; i < mothership1.ownedShips.miningShipsArr.length; i++) {
                    let thisShip = mothership1.ownedShips.miningShipsArr[i];
                    thisShip.movementLogic(thisShip);
                }
                break;
            case 1:
                for (let i = 0; i < mothership1.ownedShips.corsairShipsArr.length; i++) {
                    let thisShip = mothership1.ownedShips.corsairShipsArr[i];
                    thisShip.movementLogic(thisShip);
                }
                break;
            case 2:
                for (let i = 0; i < mothership1.ownedShips.destroyerShipsArr.length; i++) {
                    let thisShip = mothership1.ownedShips.destroyerShipsArr[i];
                    thisShip.movementLogic(thisShip);
                }
                break;
            case 3:
                for (let i = 0; i < mothership1.ownedShips.cruiserShipsArr.length; i++) {
                    let thisShip = mothership1.ownedShips.cruiserShipsArr[i];
                    thisShip.movementLogic(thisShip);
                }
                break;
            case 4:
                for (let i = 0; i < mothership1.ownedShips.battleshipShipsArr.length; i++) {
                    let thisShip = mothership1.ownedShips.battleshipShipsArr[i];
                    thisShip.movementLogic(thisShip);
                }
                break;
        }
    }

    // Handle Ship Movement when in motion
    let ownedShipsKeys = Object.keys(mothership1.ownedShips);   //Turns the ownedShip Object into an array to access it using index not.
    for (let j = 0; j < Object.keys(mothership1.ownedShips).length; j++) {  //Iterates through each type of ship
        for (let i = 0; i < mothership1.ownedShips[ownedShipsKeys[j]].length; i++) {    //Iterates through each ship in a type
            let thisShip = mothership1.ownedShips[ownedShipsKeys[j]][i];
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
}

function shipCombat() {
    for (let i = 0; i < mothership1.shipGroup.length; i++) {
        let thisShip = mothership1.shipGroup[i];
        for (let j = 0; j < mothership2.shipGroup.length; j++) {
            let thisEnemy = mothership2.shipGroup[j];
            if (dist(thisShip.sprite.x, thisShip.sprite.y, thisEnemy.sprite.x, thisEnemy.sprite.y) <= 50) {
                thisShip.attack(thisEnemy);
            }
        }
    }
}

function resourceCollection() {
    for (let i = 0; i < mothership1.ownedShips.miningShipsArr.length; i++) {
        let thisShip = mothership1.ownedShips.miningShipsArr[i];
        for (let j = 0; j < asteroidArr.length; j++) {
            let thisAsteroid = asteroidArr[j];
            if (dist(thisShip.sprite.x, thisShip.sprite.y, thisAsteroid.sprite.x, thisAsteroid.sprite.y) < 50) {
                thisShip.harvestResources(thisAsteroid);
            }
        }
    }
}

function drawGameScreen() {
    //background("red");
    gameBgImage.resize(width, height);
    image(gameBgImage, 0, 0);
    if (initialGameState) {
        drawInitialGameState();
    }

    // ui.drawInterface();
    // ui.groupSelection(); // Handle user interaction with group selected (keyboard or otherwise)

    // shipMovement();
    // shipCombat();

    // resourceCollection();
}

function drawEndScreen() {
    background("black");
}

function preload() {
    //font
    myfont = loadFont('assets/font/PixeloidMono.ttf')
    myfontB = loadFont('assets/font/PixeloidSans-Bold.ttf')

    //Background img
    mainMenuBgImage = loadImage("assets/images/myassets/background/mainMenu.png")
    gameBgImage = loadImage("assets/images/myassets/background/game.png")

    //Ships img
    battleShipImage = loadImage("assets/images/myassets/ships/battleship.png")
    corsairShipImage = loadImage("assets/images/myassets/ships/corsairship.png")
    cruiserShipImage = loadImage("assets/images/myassets/ships/cruisership.png")
    destroyerShipImage = loadImage("assets/images/myassets/ships/destroyership.png")
    miningShipImage = loadImage("assets/images/myassets/ships/miningship.png")
    motherShipImage = loadImage("assets/images/myassets/ships/mothership.png")

    //Asteroid img (option1)
    loadImage("assets/images/myassets/asteroids/asteroid1.png", asset => asteroidImgs.push(asset));
    loadImage("assets/images/myassets/asteroids/asteroid2.png", asset => asteroidImgs.push(asset));
    //Asteroid img (option2 - addAni)
    //Asteroid img (option3)
    /*for (let i = 0; i < asteroidTypes.length; i++) {
        for (let j = 1; j < asteroidTypes[i][1] + 1; j++) {
            let assetName = asteroidTypes[i][0] + j + ".png";
            loadImage("assets/images/asteroids/" + assetName, asset => asteroidImages.push(asset));
        }
    }*/

    numerals = loadAnimation("assets/images/typography/numeral0.png", 9); // Load as an animation which is effectively an array. HOWEVER, the ordering is not messed up due to the async nature of preload
    // Previously, a for loop like asteroids would put the digits in all sorts of orders. Not great when you need to display the corresponding number to the asset name...
}

function setup() {
    1
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
