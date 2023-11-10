class enemyBehaviour {
    constructor() {

    }

    move() {
        for (let thisShip of data.enemyShip.ships) {
            if (thisShip.target != null) {
                thisShip.moveTimer = 10;
            }
            if (thisShip.moveTimer > 0) {
                data.enemyShip.travel(thisShip);
                thisShip.moveTimer--;
            } else if (thisShip.moveTimer === 0) {
                thisShip.speed = 0;
                thisShip.rotationSpeed = 0;
            } else if (thisShip.moveTimer < 0) {
                thisShip.moveTimer = 0;
            }
        }
    }

    collect() {
        for (let thisShip of data.enemyShip.drones) {
            if (thisShip.target == null) {
                data.enemyShip.getNewResourceTarget(data.asteroids[100]);
                data.enemyShip.setDestination(thisShip.target.x, thisShip.target.y, thisShip);
            }

            for (let i = 0; i < data.asteroids.length; i++) {
                let thisAsteroid = data.asteroids[i];
                if (dist(thisShip.x, thisShip.y, thisAsteroid.x, thisAsteroid.y) < (thisAsteroid.radius + 20) && thisShip.group == "drone" && thisShip.resources <= thisShip.resourceCap) {
                    data.enemyShip.harvestResources(thisShip, thisAsteroid);
                }
            }

            //Handles Resource Harvesting
            if (dist(thisShip.x, thisShip.y, data.enemyMothership.x, data.enemyMothership.y) < 65) {
                data.enemyShip.resources += thisShip.resources;
                data.enemyShip.specialResources += thisShip.specialResources;
                thisShip.resources = 0;
                thisShip.specialResources = 0;
                if (thisShip.target != null) {
                    data.enemyShip.setDestination(thisShip.target.x, thisShip.target.y, thisShip);
                }
            }
        }
    }

    explore() {
        for (let thisShip of data.enemyShip.ships) {
            if (thisShip.group != "mothership" && thisShip.group != "drone") {
                if (thisShip.moveTimer <= 0) {
                    data.enemyShip.setDestination(-(random(2000 - camera.cameraX, -1200 - camera.cameraX)), -(random(2000 - camera.cameraY, -1200 - camera.cameraY)), thisShip);
                    thisShip.moveTimer = 10000;
                }

                for (let enemyShip of data.playerShip.ships) {
                    if (dist(thisShip.x, thisShip.y, enemyShip.x, enemyShip.y) < thisShip.range) {
                        thisShip.target = enemyShip;
                    }
                }

                if (thisShip.target != null) {
                    data.enemyShip.setDestination(thisShip.target.x, thisShip.target.y, thisShip);
                    if (dist(thisShip.x, thisShip.y, thisShip.target.x, thisShip.target.y) > thisShip.range) {
                        thisShip.target = null;
                    }
                }
            }
        }
    }

    progression() {
        let thisState = data.enemyShip;
        //Ship construction
        switch (true) {
            case thisState.drones.length < 3 && thisState.resources >= 20:
                this.makePurchase("drone", false, 20);
                break;

            case thisState.corsairs.length < 1 && thisState.resources >= 30 && thisState.drones.length >= 3:
                this.makePurchase("corsair", false, 30);
                break;

            case thisState.drones.length < 5 && thisState.resources >= 20 && thisState.corsairs.length >= 1:
                this.makePurchase("drone", false, 20);
                break;

            case thisState.destroyers.length < 1 && thisState.resources >= 40 && thisState.drones.length >= 5:
                this.makePurchase("destroyer", false, 40);
                break;

            case thisState.drones.length < 7 && thisState.resources >= 20 && thisState.destroyers.length >= 1:
                this.makePurchase("drone", false, 20);
                break;

            case thisState.cruisers.length < 1 && thisState.resources >= 50 && thisState.drones.length >= 7:
                this.makePurchase("cruiser", false, 50);
                break;

            case thisState.drones.length < 9 && thisState.resources >= 20 && thisState.cruisers.length >= 1:
                this.makePurchase("drone", false, 20);
                break;

            case thisState.destroyers.length < 2 && thisState.resources >= 40 && thisState.drones.length >= 9:
                this.makePurchase("destroyer", false, 40);
                break;

            case thisState.corsairs.length < 3 && thisState.resources >= 30 && thisState.destroyers.length >= 2:
                this.makePurchase("corsair", false, 30);
                break;

            case thisState.drones.length < 11 && thisState.resources >= 20 && thisState.corsairs.length >= 3:
                this.makePurchase("drone", false, 20);
                break;

            case thisState.battleships.length < 1 && thisState.resources >= 60 && thisState.drones.length >= 11:
                this.makePurchase("battleship", false, 60);
                break;

            case thisState.cruisers.length < 3 && thisState.resources >= 50 & thisState.battleships.length >= 1:
                this.makePurchase("cruiser", false, 50);
                break;

            case thisState.battleships.length < 2 && thisState.resources >= 60 && thisState.cruisers.length >= 3:
                this.makePurchase("battleship", false, 60);
                break;

            case thisState.destroyers.length < 4 && thisState.resources >= 40 && thisState.battleships.length >= 2:
                this.makePurchase("destroyer", false, 40);
                break;

            case thisState.drones.length < 13 && thisState.resources >= 20 && thisState.destroyers.length >= 4:
                this.makePurchase("drone", false, 20);
                break;

            case thisState.cruisers.length < 4 && thisState.resources >= 50 && thisState.drones.length >= 13:
                this.makePurchase("cruiser", false, 50);
                break;

            case thisState.battleships.length < 20 && thisState.resources >= 60 && thisState.cruisers.length >= 4:
                this.makePurchase("battleship", false, 60);
                break;
        }

        //Researching
        let researchArr = [[1, 1], [0, 3], [1, 2], [1, 3], [0, 2], [0, 4], [2, 3], [2, 2], [1, 4], [0, 1], [3, 1], [3, 2], [4, 1], [4, 2], [2, 1], [3, 3], [2, 4], [1, 5], [5, 1], [4, 3], [3, 4], [2, 5], [5, 2], [4, 4], [3, 5], [5, 3], [4, 5], [5, 4], [5, 5]];
        let research = thisState.ownedUpgrades.length;

        if (data.upgrades[researchArr[research][0]][researchArr[research][1]].cost <= thisState.specialResources) {
            this.makePurchase(false, [researchArr[research]], data.upgrades[research].cost);
        }
    }

    makePurchase(ship, upgrade, cost) {
        let thisState = data.enemyShip;
        if (ship) {
            data.createUnit(ship, thisState, data.enemyMothership);
            thisState.resources -= cost;
        } else {
            thisState.ownedUpgrades.push(upgrade[0]);
            data.upgradeShips(upgrade[0][0], upgrade[0][1], thisState);
            thisState.specialResources -= cost;
        }
    }
}