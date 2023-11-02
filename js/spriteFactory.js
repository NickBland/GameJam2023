class spriteFactory {
    constructor() {

    }

    createObject(x, y, d) {
        let object = new Sprite(x, y);
        return object;
    }

    createShip(x, y, group) {
        let ship = this.createObject(x, y);
        ship.group = group;
        ship.origin = {x:x, y:y};
        ship.target = null;
        ship.destinationX = 0;
        ship.destinationY = 0;
        ship.selected = false;
        ship.moveTimer = 0;
        return ship;
    }

    createMothership(x, y) {
        let mothership = this.createShip(x, y, "mothership");
        mothership.w = 75;
        mothership.h = 75;
        mothership.health = 500;
        mothership.collider = "s";
        mothership.damage = 10;

        return mothership;
    }

    createDrone(x, y) {
        let drone = this.createShip(x, y, "drone");

        drone.resources = 0;
        drone.health = 50;
        drone.damage = 10;
        
        // drone.image = 
        drone.w = 10;
        drone.h = 10;
        return drone;
    }

    createCorsair(x, y, owner) {
        let corsair = this.createShip(x, y, "corsair");

        // corsair.image = 

        corsair.health = 100;
        corsair.damage = 20;

        corsair.w = 15;
        corsair.h = 15;

        return corsair;
    }

    createDestroyer(x, y, owner) {
        let destroyer = this.createShip(x, y, "destroyer");

        // destroyer.image = ;

        destroyer.health = 150;
        destroyer.damage = 25;

        destroyer.w = 15;
        destroyer.h = 20;

        return destroyer;
    }

    createCruiser(x, y, owner) {
        let cruiser = this.createShip(x, y, "cruiser");

        // cruiser.image = ;

        cruiser.health = 200;
        cruiser.damage = 35;

        cruiser.w = 20;
        cruiser.h = 35;

        return cruiser;

    }

    createBattleship(x, y, owner) {
        let battleship = this.createShip(x, y, "battleship");

        // battleship.image = ;

        battleship.health = 300;
        battleship.damage = 75;

        battleship.w = 35;
        battleship.h = 50;

        return battleship;
    }

    createAsteroid(){
        randomSeed(Date.now()); // Set the current seed to the epoch time

        let d = Math.floor(random(25, 70));
        let x = random(d, width - d);
        let y = random(d, height - d);

        let asteroid = this.createObject(x, y);

        asteroid.resources = floor(d*1.5);

        let index = Math.floor(random(0, 1000)) % asteroidImages.length;
        asteroid.img = asteroidImages[index].get(); // <------------ GET COPIES IMAGE INSTEAD OF REFERENCE
        asteroid.img.resize(d, 0); // resize the copied image and sprite hitbox, leaving original intact

        asteroid.d = d;
        asteroid.collider = "k";
        asteroid.group = "asteroid";
        return asteroid;
    }

    createProjectile(x, y){
        let projectile = this.createObject(x,y);
        projectile.w = 5;
        projectile.h = 10;
        projectile.life = 100
        return(projectile);
    }
}