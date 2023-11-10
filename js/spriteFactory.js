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
        mothership.damage = 5;
        mothership.fastness = 1;

        motherShipImg.resize(mothership.w + 20, mothership.h + 20);
        mothership.img = motherShipImg;
        mothership.range = 300;
        mothership.weaponType = "standard";

        data.newShipUpgrade(team, mothership);

        return mothership;
    }

    createDrone(x, y, team) {
        let drone = this.createShip(x, y, "drone", team);

        drone.resources = 0;
        drone.collectionSpeed = 1;
        drone.resourceCap = 10;
        drone.specialResources = 0;
        drone.specResChance = 15;
        drone.collectCrit = 2;
        drone.health = 25;
        drone.damage = 1;
        drone.range = 50;
        drone.weaponType = "standard";
        drone.fireRate = 1;
        drone.accuracy = 15;
        drone.fastness = 3;

        drone.w = 25;
        drone.h = 25;
        droneShipImg.resize(drone.w + 20, drone.h + 20);
        drone.img = droneShipImg;

        data.newShipUpgrade(team, drone);

        return drone;
    }

    createCorsair(x, y, team) {
        let corsair = this.createShip(x, y, "corsair", team);

        corsair.health = 50;
        corsair.damage = 5;
        corsair.range = 100;
        corsair.weaponType = "standard";
        corsair.fastness = 2;
        corsair.fireRate = 1;
        corsair.accuracy = 15;

        corsair.w = 25;
        corsair.h = 25;
        corsairShipImg.resize(corsair.w + 20, corsair.h + 20);
        corsair.img = corsairShipImg;

        data.newShipUpgrade(team, corsair);

        return corsair;
    }

    createDestroyer(x, y, team) {
        let destroyer = this.createShip(x, y, "destroyer", team);

        destroyer.health = 100;
        destroyer.damage = 10;
        destroyer.range = 125;
        destroyer.weaponType = "shotgun";
        destroyer.fastness = 2;
        destroyer.fireRate = 1.5;
        destroyer.accuracy = 45;

        destroyer.w = 30;
        destroyer.h = 30;
        destroyerShipImg.resize(destroyer.w + 20, destroyer.h + 20);
        destroyer.img = destroyerShipImg;

        data.newShipUpgrade(team, destroyer);

        return destroyer;
    }

    createCruiser(x, y, team) {
        let cruiser = this.createShip(x, y, "cruiser", team);

        cruiser.health = 150;
        cruiser.damage = 15;
        cruiser.range = 150;
        cruiser.weaponType = "heavy";
        cruiser.fastness = 2;
        cruiser.fireRate = 1.5;
        cruiser.accuracy = 10;
        cruiser.doubleShot = 10;

        cruiser.w = 30;
        cruiser.h = 30;
        cruiserShipImg.resize(cruiser.w + 20, cruiser.h + 20)
        cruiser.img = cruiserShipImg;

        data.newShipUpgrade(team, cruiser);

        return cruiser;

    }

    createBattleship(x, y, team) {
        let battleship = this.createShip(x, y, "battleship", team);

        battleship.health = 200;
        battleship.damage = 30;
        battleship.range = 200;
        battleship.weaponType = "rapid";
        battleship.fastness = 1;
        battleship.fireRate = 0.5;
        battleship.accuracy = 10;

        battleship.w = 45;
        battleship.h = 45;
        battleShipImg.resize(battleship.w + 20, battleship.h + 20)
        battleship.img = battleShipImg;

        data.newShipUpgrade(team, battleship);

        return battleship;
    }

    createAsteroid() {
        let d = Math.floor(random(25, 70));
        let x = random((camera.cameraX) + 1300, ((camera.cameraX) - 1300));
        let y = random((camera.cameraY) + 1300, ((camera.cameraY) - 1300));

        let asteroid = this.createObject(x, y);

        asteroid.resources = floor(d * 1.5);

        asteroid.addAni('initial', asteroidInitial);
        asteroid.addAni('explode', asteroidExplode);
        asteroid.changeAni('initial');

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
        projectile.d = 16

        projectile.addAni('missile', missileImg);
        projectile.addAni('bullet', bulletImg);
        projectile.addAni('flameshot', flameshotImg);
        projectile.addAni('explosion', explosionEffect);
        projectile.addAni('small explosion', smallexplosionEffect);
        projectile.addAni('big explosion', bigexplosionEffect);

        projectile.changeAni('flameshot');
        projectile.anis.rotation = 90;
        projectile.anis.scale=2;
        projectile.life = 60;
        return (projectile);
    }
}