class enemyBehaviour {
    constructor() {

    }

    move() {
        for (let thisShip of data.enemyShip.ships) {
            if (thisShip.target != null) {
                thisShip.moveTimer = 10;
            }

            let enemyShips = data.enemyShip.ships;   //Turns the ownedShip Object into an array to access it using index not.
            for (let i = 0; i < enemyShips.length; i++) {  //Iterates through each type of ship
                let thisShip = enemyShips[i];
                if (thisShip.moveTimer > 0) {
                    data.enemyShip.travel(thisShip);
                    thisShip.moveTimer--;
                } else if (thisShip.moveTimer === 0) {
                    thisShip.speed = 0;
                    thisShip.rotationSpeed = 0;
                } else if (thisShip.moveTimer < 0) {
                    thisShip.moveTimer = 0;
                }
                for (let j = 0; j < enemyShips.length; j++) {
                    if (dist(enemyShips[j].x, enemyShips[j].y, thisShip.x, thisShip.y) < 50 && enemyShips[j] != thisShip) {
                        enemyShips[j].attractTo(thisShip, -2);
                    }
                }
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
                if (dist(thisShip.x, thisShip.y, thisAsteroid.x, thisAsteroid.y) < (thisAsteroid.radius + 20) && thisShip.group == "drone" && thisShip.resources < 10) {
                    data.enemyShip.harvestResources(thisShip, thisAsteroid);

                }
            }

            //Handles Resource Harvesting
            if (thisShip.group == "drone") {
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
}