class playerState {
    constructor() {
        this.resources = 0;
        this.specialResources = 0;
        this.shotgunPellets = 3;

        this.ships; // ALL SHIPS owned by player
        this.drones;
        this.corsairs;
        this.destroyers;
        this.cruisers;
        this.battleships;
        this.projectiles;

        this.ownedUpgrades = [];
    }

    setupData() {
        this.ships = new Group();
        this.drones = new this.ships.Group();
        this.corsairs = new this.ships.Group();
        this.destroyers = new this.ships.Group();
        this.cruisers = new this.ships.Group();
        this.battleships = new this.ships.Group();
        this.projectiles = new Group();
    }

    setDestination(x, y, thisShip) {  //Sets where the ship is moving to
        thisShip.destinationX = x;
        thisShip.destinationY = y;
    }

    movementLogic(thisShip) {
        if (thisShip.moveTimer === 0) {
            thisShip.moveTimer = Math.floor(dist(thisShip.x, thisShip.y, mouse.x, mouse.y)) / thisShip.fastness;
            this.setDestination(mouse.x, mouse.y, thisShip);
        } else {
            thisShip.moveTimer = Math.floor(dist(thisShip.x, thisShip.y, mouse.x, mouse.y)) / thisShip.fastness;
            this.setDestination(mouse.x, mouse.y, thisShip);
        }
    }

    travel(thisShip) {  //Moves the ship to destination
        thisShip.moveTo(thisShip.destinationX, thisShip.destinationY, thisShip.fastness);
        thisShip.rotation = thisShip.direction;
    }

    attack(thisShip, thisEnemy) {
        data.combat.determineWeapon(thisShip, thisEnemy);
    }

    takeDamage(damage, thisShip) {
        thisShip.health -= damage;
        if (thisShip.health <= 0) {
            let number = this.ships.indexOf(thisShip);
            if (thisShip.team == data.playerShip) {
                ui.miniMapSprites.dots[number].remove();
            }
            if (thisShip == thisShip.team.ships[0]) {
                data.gameOver(thisShip.team);
            }
            thisShip.remove();
        }
    }

    harvestResources(thisShip, thisAsteroid) {
        if (frameCount % (thisShip.collectionSpeed*100) == 0) {
            thisShip.resources++;
            thisAsteroid.resources--;
            if(thisShip.collectCrit >= random(101)){
                thisShip.resources++;
                thisAsteroid.resources--;
            }
            if (thisShip.specResChance>= random(101)) {
                thisShip.specialResources++;
            }
        } 
        if (thisAsteroid.resources <= 0) {
            thisAsteroid.collider = "n";
            for (let i = 0; i < this.drones.length; i++) {
                if (this.drones[i].target == thisAsteroid) {
                    this.setDestination(this.ships[0].x, this.ships[0].y, this.drones[i]);
                }
            }
            this.getNewResourceTarget(thisAsteroid);
            return (data.destroyAsteroid(thisAsteroid));
        }
        if (thisShip.resources >= thisShip.resourceCap) {
            this.setDestination(this.ships[0].x, this.ships[0].y, thisShip);
            thisShip.moveTimer = dist(this.ships[0].x, this.ships[0].y, thisShip.x, thisShip.y);
        }
    }

    getNewResourceTarget(thisAsteroid) {
        for (let i = 0; i < this.drones.length; i++) {
            let thisShip = this.drones[i];
            if (thisShip.target == thisAsteroid) {
                let nextTarget;
                if (thisAsteroid == data.asteroids[0]) {
                    nextTarget = data.asteroids[1];
                } else {
                    nextTarget = data.asteroids[0];
                }
                for (let newAsteroid of data.asteroids) {
                    let teamMotherShip = thisShip.team.ships[0];
                    if ((dist(nextTarget.x, nextTarget.y, teamMotherShip.x, teamMotherShip.y) > dist(newAsteroid.x, newAsteroid.y, teamMotherShip.x, teamMotherShip.y)) && thisAsteroid != newAsteroid) {
                        nextTarget = newAsteroid;
                    }
                }
                thisShip.target = nextTarget;
            }
        }
    }
}