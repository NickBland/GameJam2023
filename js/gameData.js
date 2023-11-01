class gameData {
    constructor() {
        this.factory = new spriteFactory();

        this.asteroids; // ALL asteroids on the map

        this.playerShip = new playerState();
        this.enemyShip = new playerState();
    }

    setupGame() {
        this.asteroids = new Group();

        this.playerShip.setupData();
        this.enemyShip.setupData();


        this.playerMothership = this.factory.createMothership(100,100);
        this.playerShip.ships.push(this.playerMothership);
        this.playerShip.drones.push(this.factory.createDrone(this.playerMothership.x, this.playerMothership.y));
        this.playerShip.drones.push(this.factory.createDrone(this.playerMothership.x, this.playerMothership.y));


        this.enemyMothership = this.factory.createMothership(width - 100, height - 100);
        this.enemyShip.ships.push(this.enemyMothership);
        this.enemyShip.drones.push(this.factory.createDrone(this.enemyMothership.x, this.enemyMothership.y));
        this.enemyShip.drones.push(this.factory.createDrone(this.enemyMothership.x, this.enemyMothership.y));
    }
}