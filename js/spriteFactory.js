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
        ship.destinationX = ship.origin.x;
        ship.destinationY = ship.origin.y;
        ship.selected = false;
        ship.moveTimer = 0;
        return ship;
    }

    createMothership(x, y) {
        let mothership = this.createShip(x, y, "mothership");
        mothership.w = 50;
        mothership.h = 60;
        mothership.health = 500;
        mothership.collider = "s";
        mothership.damage = 10;
        motherShipImg.resize(mothership.w + 20, mothership.h + 20);
        mothership.img = motherShipImg;

        return mothership;
    }

    createDrone(x, y) {
        let drone = this.createShip(x, y, "drone");

        drone.resources = 0;
        drone.health = 50;
        drone.damage = 10;
        
        drone.w = 25;
        drone.h = 25;
        droneShipImg.resize(drone.w + 20, drone.h + 20);
        drone.img = droneShipImg;

        return drone;
    }

    createCorsair(x, y, owner) {
        let corsair = this.createShip(x, y, "corsair");

        corsair.health = 100;
        corsair.damage = 20;

        corsair.w = 25;
        corsair.h = 25;
        corsairShipImg.resize(corsair.w + 20, corsair.h + 20);
        corsair.img = corsairShipImg;

        return corsair;
    }

    createDestroyer(x, y, owner) {
        let destroyer = this.createShip(x, y, "destroyer");

        destroyer.health = 150;
        destroyer.damage = 25;

        destroyer.w = 30;
        destroyer.h = 30;
        destroyerShipImg.resize(destroyer.w + 20, destroyer.h + 20);
        destroyer.img = destroyerShipImg;

        return destroyer;
    }

    createCruiser(x, y, owner) {
        let cruiser = this.createShip(x, y, "cruiser");

        cruiser.health = 200;
        cruiser.damage = 35;

        cruiser.w = 30;
        cruiser.h = 30;
        cruiserShipImg.resize(cruiser.w + 20, cruiser.h + 20)
        cruiser.img = cruiserShipImg;

        return cruiser;

    }

    createBattleship(x, y, owner) {
        let battleship = this.createShip(x, y, "battleship");

        // battleship.image = ;

        battleship.health = 300;
        battleship.damage = 75;

        battleship.w = 45;
        battleship.h = 45;
        battleShipImg.resize(battleship.w + 20, battleship.h + 20)
        battleship.img = battleShipImg;

        return battleship;
    }

    createAsteroid(){
        randomSeed(Date.now()); // Set the current seed to the epoch time

        let d = Math.floor(random(25, 70));
        let x = random(d, width - d);
        let y = random(d, height - d - 120);

        let asteroid = this.createObject(x, y);

        asteroid.resources = floor(d*1.5);

        /*let index = Math.floor(random(0, 1000)) % asteroidImages.length;
        asteroid.img = asteroidImages[index].get(); // <------------ GET COPIES IMAGE INSTEAD OF REFERENCE
        asteroid.img.resize(d, 0); // resize the copied image and sprite hitbox, leaving original intact*/

        //Option1 asteroid 
        /*let index = Math.floor(random(0, 1000)) % asteroidImgs.length;
        this.sprite.img = asteroidImg[index].get();
        this.sprite.img.resize(this.d, 0); // resize the copied image and sprite hitbox, leaving original intact
        this.sprite.rotation = random(0, 360);*/

        //Option2 asteroid
        asteroid.addAni('initial', asteroidInitial);
        asteroid.addAni('explode', asteroidExplode);
        asteroid.changeAni('initial');
        asteroid.debug = true;

        asteroid.ani.scale = d/45;

        asteroid.d = d;
        asteroid.collider = "k";
        asteroid.rotation = random(0, 360);
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