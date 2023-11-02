class playerState {
    constructor() {
        this.resources = 0;

        this.ships; // ALL SHIPS owned by player
        this.drones;
        this.corsairs;
        this.destroyers;
        this.cruisers;
        this.battleships;
        this.projectiles;
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
            thisShip.moveTimer = Math.floor(dist(thisShip.x, thisShip.y, mouse.x, mouse.y)) / 3;
            this.setDestination(mouse.x, mouse.y,thisShip);
        } else {
            thisShip.moveTimer = Math.floor(dist(thisShip.x, thisShip.y, mouse.x, mouse.y)) / 3;
            this.setDestination(mouse.x, mouse.y,thisShip);
        }
    }

    travel(thisShip) {  //Moves the ship to destination
        thisShip.moveTo(thisShip.destinationX, thisShip.destinationY, 3);
        thisShip.rotation = thisShip.direction;
    }

    attack(thisShip, thisEnemy) {
        if(frameCount%10 == 0){
            let projectile = data.factory.createProjectile(thisShip.x,thisShip.y);
            this.projectiles.push(projectile);
            projectile.damage = thisShip.damage;
            projectile.target = thisEnemy;
            projectile.overlaps(allSprites);
            projectile.moveTowards(thisEnemy,0.1);
        }
    }

    takeDamage(damage, thisShip) {
        thisShip.health -= damage;
        if(thisShip.health <= 0){
            console.log("Very Dead");
        }
    }

    harvestResources(thisShip, thisAsteroid){
        if(frameCount%10 == 0){
            thisShip.resources++;
            thisAsteroid.resources--;
            if(thisAsteroid.resources<=0){
                return(data.destroyAsteroid(thisAsteroid));
            }
        }
        if(thisShip.resources>= 10){
            this.setDestination(this.ships[0].x,this.ships[0].y, thisShip);
            thisShip.moveTimer = dist(this.ships[0].x,this.ships[0].y, thisShip.x, thisShip.y);
        }
    }
}