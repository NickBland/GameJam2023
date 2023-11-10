class gameData {
    constructor() {
        this.factory = new spriteFactory();
        this.combat = new combatHandler();
        this.enemy = new enemyBehaviour();

        this.asteroids; // ALL asteroids on the map

        this.playerShip = new playerState();
        this.enemyShip = new playerState();

        this.asteroidDensity = 100;

        this.upgrades;
    }

    setupGame() {
        this.asteroids = new Group();

        this.playerShip.setupData();
        this.enemyShip.setupData();

        this.playerMothership = this.factory.createMothership(-1400, -1400, this.playerShip);
        this.playerShip.ships.push(this.playerMothership);

        this.createUnit("drone", this.playerShip, this.playerMothership)
        this.createUnit("corsair", this.playerShip, this.playerMothership)
        this.createUnit("destroyer", this.playerShip, this.playerMothership)
        this.createUnit("cruiser", this.playerShip, this.playerMothership)
        this.createUnit("battleship", this.playerShip, this.playerMothership)

        this.enemyMothership = this.factory.createMothership(width + 600, height + 500, this.enemyShip);
        this.enemyShip.ships.push(this.enemyMothership);

        this.createUnit("drone", this.enemyShip, this.enemyMothership)
        // this.createUnit("corsair", this.enemyShip, this.enemyMothership)
        // this.createUnit("destroyer", this.enemyShip, this.enemyMothership)
        // this.createUnit("cruiser", this.enemyShip, this.enemyMothership)
        // this.createUnit("battleship", this.enemyShip, this.enemyMothership)

        for (let i = 0; i < this.asteroidDensity; i++) {
            this.createAsteroid();
        }

        this.borderSprites = new Group();
        for (let i = 0; i < 4; i++) {
            this.borderSprites.push(new Sprite());
            this.borderSprites[i].collider = "s";
        }

        this.createUpgradesData();
    }

    createUnit(type, team, teamMotherShip) {
        switch (type) {
            case "drone":
                team.drones.push(this.factory.createDrone(teamMotherShip.x, teamMotherShip.y, team));
                break;

            case "corsair":
                team.corsairs.push(this.factory.createCorsair(teamMotherShip.x, teamMotherShip.y, team));
                break;

            case "destroyer":
                team.destroyers.push(this.factory.createDestroyer(teamMotherShip.x, teamMotherShip.y, team));
                break;

            case "cruiser":
                team.cruisers.push(this.factory.createCruiser(teamMotherShip.x, teamMotherShip.y, team));
                break;

            case "battleship":
                team.battleships.push(this.factory.createBattleship(teamMotherShip.x, teamMotherShip.y, team));
                break;
            default:
        }
    }

    handleBorders() {
        this.borderSprites[0].y = ((camera.cameraY) + 1610);
        this.borderSprites[1].x = ((camera.cameraX) + 1610);
        this.borderSprites[2].y = ((camera.cameraY) - 1610);
        this.borderSprites[3].x = ((camera.cameraX) - 1610);

        this.borderSprites[0].x = ((camera.cameraX + 400));
        this.borderSprites[1].y = ((camera.cameraY + 400));
        this.borderSprites[2].x = ((camera.cameraX - 400));
        this.borderSprites[3].y = ((camera.cameraY + 400));

        this.borderSprites[0].w = 4000;
        this.borderSprites[0].h = 10;
        this.borderSprites[1].w = 10;
        this.borderSprites[1].h = 4000;
        this.borderSprites[2].w = 4000;
        this.borderSprites[2].h = 10;
        this.borderSprites[3].w = 10;
        this.borderSprites[3].h = 4000;
    }

    createAsteroid() {
        this.asteroids.push(this.factory.createAsteroid());
    }

    destroyAsteroid(thisAsteroid) {
        thisAsteroid.changeAni('explode');
        thisAsteroid.collider = "n";
        thisAsteroid.life = 28;
    }

    combatHandling() {
        for (let i = 0; i < this.playerShip.projectiles.length; i++) {
            let thisProj = this.playerShip.projectiles[i];
            if (thisProj.collides(this.enemyShip.ships)) {
                for (let j = 0; j < this.enemyShip.ships.length; j++) {
                    let thisShip = this.enemyShip.ships[j];
                    if (thisShip.collides(thisProj)) {
                        this.enemyShip.takeDamage(thisProj.damage, this.enemyShip.ships[j]);
                        this.enemyMothership.health -= thisProj.damage;
                        thisProj.remove();
                    }
                }
            }
        }

        for (let i = 0; i < this.enemyShip.projectiles.length; i++) {
            let thisProj = this.enemyShip.projectiles[i];
            if (thisProj.collides(this.playerShip.ships)) {
                for (let j = 0; j < this.playerShip.ships.length; j++) {
                    let thisShip = this.playerShip.ships[j];
                    if (thisShip.collides(thisProj)) {
                        if (j != 0) {
                            this.playerShip.takeDamage(thisProj.damage, this.playerShip.ships[j]);
                        }
                        else {
                            this.playerMothership.health -= thisProj.damage;
                        }
                        thisProj.remove();
                    }
                }
            }
        }
    }

    fogOfWar() {
        let thisEnemyVisible;
        for (let thisEnemy of this.enemyShip.ships) {
            thisEnemyVisible = false;
            for (let thisShip of this.playerShip.ships) {
                if (dist(thisShip.x, thisShip.y, thisEnemy.x, thisEnemy.y) <= thisShip.range) {
                    thisEnemyVisible = true;
                }
            }
            thisEnemy.visible = thisEnemyVisible;
        }
    }

    gameOver(losingTeam) {
        gameState.game = false;
        gameState.endScreen = true;

        if (losingTeam == data.playerShip) {
            console.log("Game Over, You Lose");
            winGame = false;
        }
        if (losingTeam == data.enemyShip) {
            console.log("Game Over, You Win");
            winGame = true;
        }
    }

    upgradeShips(x, y, team) {
        let thisUpgrade = this.upgrades[x][y];
        let thisAttribute = thisUpgrade.attribute;
        let thisType = thisUpgrade.type;
        let thisGrowth = thisUpgrade.upgrade;

        switch (x) {
            case 0:
                for (let thisShip of team.ships) {
                    if (thisType == "percent") {
                        thisShip[thisAttribute] *= thisGrowth;
                    }
                    else if (thisType == "static") {
                        thisShip[thisAttribute] += thisGrowth;
                    }
                    else {
                        this.specialUpgrade(thisUpgrade, thisShip);
                    }
                }
                break;

            case 1:
                for (let thisShip of team.drones) {
                    if (thisType == "percent") {
                        thisShip[thisAttribute] *= thisGrowth;
                    }
                    else if (thisType == "static") {
                        thisShip[thisAttribute] += thisGrowth;
                    }
                    else {
                        this.specialUpgrade(thisUpgrade, thisShip);
                    }
                }
                break;

            case 2:
                for (let thisShip of team.corsairs) {
                    if (thisType == "percent") {
                        thisShip[thisAttribute] *= thisGrowth;
                    }
                    else if (thisType == "static") {
                        thisShip[thisAttribute] += thisGrowth;
                    }
                    else {
                        this.specialUpgrade(thisUpgrade, thisShip);
                    }
                }
                break;

            case 3:
                for (let thisShip of team.destroyers) {
                    if (thisType == "percent") {
                        thisShip[thisAttribute] *= thisGrowth;
                    }
                    else if (thisType == "static") {
                        thisShip[thisAttribute] += thisGrowth;
                    }
                    else {
                        this.specialUpgrade(thisUpgrade, thisShip);
                    }
                }
                break;

            case 4:
                for (let thisShip of team.cruisers) {
                    if (thisType == "percent") {
                        thisShip[thisAttribute] *= thisGrowth;
                    }
                    else if (thisType == "static") {
                        thisShip[thisAttribute] += thisGrowth;
                    }
                    else {
                        this.specialUpgrade(thisUpgrade, thisShip);
                    }
                }
                break;

            case 5:
                for (let thisShip of team.battleships) {
                    if (thisType == "percent") {
                        thisShip[thisAttribute] *= thisGrowth;
                    }
                    else if (thisType == "static") {
                        thisShip[thisAttribute] += thisGrowth;
                    }
                    else {
                        this.specialUpgrade(thisUpgrade, thisShip);
                    }
                }
                break;
            default:
        }
    }

    specialUpgrade(thisUpgrade, thisShip) {
        switch (thisUpgrade.type) {
            case "nick":

                break;
            case "thien":

                break;
            case "jesse":

                break;
            default:
        }
    }

    /**
     * All data for the upgrades is stored here
     */
    createUpgradesData() {
        this.upgrades = [
            [
                "All Ships",
                {
                    name: "Better Sensors",
                    effectText: "Vision Range of all Ships +20%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "range",
                    type: "percent",
                    upgrade: 1.2
                },
                {
                    name: "Denser Hulls",
                    effectText: "All Ship Hitpoints +10%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "health",
                    type: "percent",
                    upgrade: 1.1
                },
                {
                    name: "Larger Reactors",
                    effectText: "Speed of all Ships +1.5 U/s",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fastness",
                    type: "static",
                    upgrade: 1.5
                },
                {
                    name: "Powerful Lasers",
                    effectText: "Damage Dealt by all Ships +5%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "damage",
                    type: "percent",
                    upgrade: 1.05
                },
            ],
            [
                "Drones",
                {
                    name: "Efficient Equipment",
                    effectText: "Collection Speed of Drones 15%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "collectionSpeed",
                    type: "percent",
                    upgrade: 1.15
                },
                {
                    name: "Precision Scanner",
                    effectText: "Special Resource Chance +5%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "specResChance",
                    type: "percent",
                    upgrade: 1.05
                },
                {
                    name: "Larger Hold",
                    effectText: "Carrying Capacity of Drones +10%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "resourceCap",
                    type: "percent",
                    upgrade: 1.1
                },
                {
                    name: "Lightweight Materials",
                    effectText: "Movement Speed of Drones +3.5 U/s",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fastness",
                    type: "static",
                    upgrade: 3.5
                },
                {
                    name: "Enrichment Processing",
                    effectText: "Chance of Double Resource Collection +1%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "collectCrit",
                    type: "percent",
                    upgrade: 1.01
                },
            ],
            [
                "Corsairs",
                {
                    name: "Optimised Engine Controls",
                    effectText: "Movement Speed of Corsairs +2.5 U/s",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fastness",
                    type: "static",
                    upgrade: 2.5
                },
                {
                    name: "More Guns",
                    effectText: "Damage Dealt by Corsairs +5%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "damage",
                    type: "percent",
                    upgrade: 1.05
                },
                {
                    name: "Insulated Padding",
                    effectText: "Corsair Hitpoints +10%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "health",
                    type: "percent",
                    upgrade: 1.1
                },
                {
                    name: "Advanced Ordnances",
                    effectText: "Corsair Rate of Fire +20%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fireRate",
                    type: "percent",
                    upgrade: 0.8
                },
                {
                    name: "Advanced Targetting System",
                    effectText: "Corsair Accuracy +20%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "accuracy",
                    type: "percent",
                    upgrade: 0.8
                },
            ],
            [
                "Destroyers",
                {
                    name: "Dark Matter Reactor",
                    effectText: "Movement Speed of Destroyers +2.0 U/s",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fastness",
                    type: "static",
                    upgrade: 2
                },
                {
                    name: "Heavy Slugs",
                    effectText: "Destroyer Damage +5%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "damage",
                    type: "percent",
                    upgrade: 1.05
                },
                {
                    name: "Composite Armour",
                    effectText: "Destroyer Hitpoints +10%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fastness",
                    type: "percent",
                    upgrade: 1.1
                },
                {
                    name: "Nick's Meds",
                    effectText: "Shoot 2 More Pellets",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "shotgunPellets",
                    type: "nick",
                    upgrade: 2
                },
                {
                    name: "Shell Ejectors",
                    effectText: "Destroyer Rate of Fire +10%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fireRate",
                    type: "percent",
                    upgrade: 0.9
                },
            ],
            [
                "Cruisers",
                {
                    name: "Antimatter Reactor",
                    effectText: "Movement Speed of Cruisers +1.5 U/s",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fastness",
                    type: "static",
                    upgrade: 1.5
                },
                {
                    name: "Explosive-Infused Alloys",
                    effectText: "Cruiser Damage +5%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "damage",
                    type: "percent",
                    upgrade: 1.05
                },
                {
                    name: "Reinforced Weakpoints",
                    effectText: "Cruiser Hitpoints +10%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "health",
                    type: "percent",
                    upgrade: 1.1
                },
                {
                    name: "Thien's Optimiser",
                    effectText: "Chance of Double Shot +5%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "doubleShot",
                    type: "thien",
                    upgrade: 1.05
                },
                {
                    name: "Weapon Heatsinks",
                    effectText: "Cruiser Rate of Fire +15%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fireRate",
                    type: "percent",
                    upgrade: 1.15
                },
            ],
            [
                "Battleships",
                {
                    name: "Strange Matter Reactor",
                    effectText: "Movement Speed of Battleships +1.0 U/s",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "fastness",
                    type: "static",
                    upgrade: 1
                },
                {
                    name: "Lead-Tipped Projectiles",
                    effectText: "Battleship Damage +10%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "damage",
                    type: "percent",
                    upgrade: 1.1
                },
                {
                    name: "Shock Absorbing Insulation",
                    effectText: "Battleship Hitpoints +20%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "health",
                    type: "percent",
                    upgrade: 1.2
                },
                {
                    name: "Barrel Compensators",
                    effectText: "Battleship Accuracy +20%",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "accuracy",
                    type: "percent",
                    upgrade: 0.8
                },
                {
                    name: "Jesse's Jest",
                    effectText: "No More",
                    cost: 10,
                    playerOwned: false,
                    enemyOwned: false,
                    attribute: "weaponType",
                    type: "jesse",
                    upgrade: 0
                },
            ]
        ];
    }
}