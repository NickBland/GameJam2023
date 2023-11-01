class spriteFactory {
    constructor() {

    }

    createObject(x, y) {
        let object = new Sprite(x, y);
        return object;
    }

    createShip(x, y, group) {
        let ship = this.createObject(x, y);
        ship.group = group;
        return ship;
    }

    createMothership(x, y) {
        let mothership = this.createShip(x, y, "mothership");
        mothership.w = 75;
        mothership.h = 75;
        mothership.health = 500;

        return mothership;
    }

    createDrone(x, y) {
        let drone = this.createShip(x, y, "drone");
        drone.origin = {x: x, y: y};
        drone.target = null;
        drone.selected = false;
        drone.moveTimer = 0;


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
        corsair.origin = {x: x, y: y};
        corsair.selected = false;
        // corsair.image = 

        // corsair.health = 100;
        // corsair.damage = 20;

        corsair.w = 15;
        corsair.h = 15;

        return corsair;
    }

    createDestroyer(x, y, owner) {
        let destroyer = this.createShip(x, y, "destroyer");
        destroyer.origin = {x: x, y: y};
        destroyer.selected = false;
        // destroyer.image = ;

        destroyer.health = 150;
        destroyer.damage = 25;

        destroyer.w = 15;
        destroyer.h = 20;

        return destroyer;
    }

    createCruiser(x, y, owner) {
        let cruiser = this.createShip(x, y, "cruiser");
        cruiser.origin = {x: x, y: y};
        cruiser.selected = false;
        // cruiser.image = ;

        cruiser.health = 200;
        cruiser.damage = 35;

        cruiser.w = 20;
        cruiser.h = 35;

        return cruiser;

    }

    createBattleship(x, y, owner) {
        let battleship = this.createShip(x, y, "battleship");
        battleship.origin = {x: x, y: y};
        battleship.selected = false;
        // battleship.image = ;

        battleship.health = 300;
        battleship.damage = 75;

        battleship.w = 35;
        battleship.h = 50;
    }

}