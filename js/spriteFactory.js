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
        mothership.w = 80;
        mothership.h = 80;
        mothership.health = 500;
        mothership.collider = "s";
        motherShipImg.resize(mothership.w, mothership.h);
        mothership.img = motherShipImg;

        return mothership;
    }

    createDrone(x, y) {
        let drone = this.createShip(x, y, "drone");

        drone.resources = 0;
        drone.health = 50;
        drone.damage = 10;
        
        drone.w = 45;
        drone.h = 45;
        droneShipImg.resize(drone.w, drone.h);
        drone.img = droneShipImg;

        return drone;
    }

    createCorsair(x, y, owner) {
        let corsair = this.createShip(x, y, "corsair");

        corsair.health = 100;
        corsair.damage = 20;

        corsair.w = 45;
        corsair.h = 45;
        corsairShipImg.resize(corsair.w, corsair.h);
        corsair.img = corsairShipImg;

        return corsair;
    }

    createDestroyer(x, y, owner) {
        let destroyer = this.createShip(x, y, "destroyer");

        destroyer.health = 150;
        destroyer.damage = 25;

        destroyer.w = 50;
        destroyer.h = 50;
        destroyerShipImg.resize(destroyer.w, destroyer.h);
        destroyer.img = destroyerShipImg;

        return destroyer;
    }

    createCruiser(x, y, owner) {
        let cruiser = this.createShip(x, y, "cruiser");

        cruiser.health = 200;
        cruiser.damage = 35;

        cruiser.w = 50;
        cruiser.h = 50;
        cruiserShipImg.resize(cruiser.w, cruiser.h)
        cruiser.img = cruiserShipImg;

        return cruiser;

    }

    createBattleship(x, y, owner) {
        let battleship = this.createShip(x, y, "battleship");

        // battleship.image = ;

        battleship.health = 300;
        battleship.damage = 75;

        battleship.w = 65;
        battleship.h = 65;
        battleShipImg.resize(battleship.w, battleship.h)
        battleship.img = battleShipImg;

        return battleship;
    }

    createAsteroid(){
        randomSeed(Date.now()); // Set the current seed to the epoch time

        let d = Math.floor(random(25, 70));
        let x = random(d, width - d);
        let y = random(d, height - d);

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
        asteroid.group = "asteroid";
        return asteroid;
    }
}