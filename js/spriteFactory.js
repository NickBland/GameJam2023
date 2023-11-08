class spriteFactory {
    constructor() {
        this.gameSprites = new Group();
    }

    createObject(x, y) {
        let object = new Sprite(x, y);
        this.gameSprites.push(object);
        return object;
    }

    createShip(x, y, group, team) {
        let ship = this.createObject(x, y);
        ship.group = group;
        ship.team = team;
        ship.origin = { x: x, y: y };
        ship.target = null;
        ship.destinationX = ship.origin.x;
        ship.destinationY = ship.origin.y;
        ship.selected = false;
        ship.moveTimer = 0;

        return ship;
    }

    createMothership(x, y, team) {
        let mothership = this.createShip(x, y, "mothership", team);
        mothership.w = 50;
        mothership.h = 60;
        mothership.health = 500;
        mothership.collider = "s";
        mothership.damage = 10;
        mothership.fastness = 1;

        motherShipImg.resize(mothership.w + 20, mothership.h + 20);
        mothership.img = motherShipImg;
        mothership.range = 300;
        mothership.weaponType = "standard";

        return mothership;
    }

    createDrone(x, y, team) {
        let drone = this.createShip(x, y, "drone", team);

        drone.resources = 0;
        drone.specialResources = 0;
        drone.health = 50;
        drone.damage = 10;
        drone.range = 100;
        drone.weaponType = "standard";
        drone.fastness = 8;

        drone.w = 25;
        drone.h = 25;
        droneShipImg.resize(drone.w + 20, drone.h + 20);
        drone.img = droneShipImg;

        return drone;
    }

    createCorsair(x, y, team) {
        let corsair = this.createShip(x, y, "corsair", team);

        corsair.health = 100;
        corsair.damage = 20;
        corsair.range = 150;
        corsair.weaponType = "standard";
        corsair.fastness = 7;

        corsair.w = 25;
        corsair.h = 25;
        corsairShipImg.resize(corsair.w + 20, corsair.h + 20);
        corsair.img = corsairShipImg;

        return corsair;
    }

    createDestroyer(x, y, team) {
        let destroyer = this.createShip(x, y, "destroyer", team);

        destroyer.health = 150;
        destroyer.damage = 25;
        destroyer.range = 175;
        destroyer.weaponType = "shotgun";
        destroyer.fastness = 5;

        destroyer.w = 30;
        destroyer.h = 30;
        destroyerShipImg.resize(destroyer.w + 20, destroyer.h + 20);
        destroyer.img = destroyerShipImg;

        return destroyer;
    }

    createCruiser(x, y, team) {
        let cruiser = this.createShip(x, y, "cruiser", team);

        cruiser.health = 200;
        cruiser.damage = 35;
        cruiser.range = 200;
        cruiser.weaponType = "heavy";
        cruiser.fastness = 4;

        cruiser.w = 30;
        cruiser.h = 30;
        cruiserShipImg.resize(cruiser.w + 20, cruiser.h + 20)
        cruiser.img = cruiserShipImg;

        return cruiser;

    }

    createBattleship(x, y, team) {
        let battleship = this.createShip(x, y, "battleship", team);

        battleship.health = 300;
        battleship.damage = 75;
        battleship.range = 250;
        battleship.weaponType = "standard";
        battleship.fastness = 3;

        battleship.w = 45;
        battleship.h = 45;
        battleShipImg.resize(battleship.w + 20, battleship.h + 20)
        battleship.img = battleShipImg;

        return battleship;
    }

    createAsteroid() {
        let d = Math.floor(random(25, 70));
        let x = random((camera.cameraX) + 1300, ((camera.cameraX) - 1300));
        let y = random((camera.cameraY) + 1300, ((camera.cameraY) - 1300));

        let asteroid = this.createObject(x, y);

        asteroid.resources = floor(d * 1.5);

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
        // asteroid.debug = true;

        asteroid.ani.scale = d / 45;

        asteroid.d = d;
        asteroid.collider = "k";
        asteroid.rotation = random(0, 360);
        asteroid.rotationSpeed = random(-0.3, 0.3); // Add some spin :)
        asteroid.group = "asteroid";
        return asteroid;
    }

    createProjectile(x, y) {
        let projectile = this.createObject(x, y);
        projectile.w = 5;
        projectile.h = 10;
        
        projectile.life = 100;
        return (projectile);
    }
}