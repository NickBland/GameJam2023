class playerState {
    constructor() {
        this.resources = 0;

        this.ships; // ALL SHIPS owned by player
        this.drones;
        this.corsairs;
        this.destroyers;
        this.cruisers;
        this.battleships;
    }

    setupData() {
        this.ships = new Group();
        this.drones = new this.ships.Group();
        this.corsairs = new this.ships.Group();
        this.destroyers = new this.ships.Group();
        this.cruisers = new this.ships.Group();
        this.battleships = new this.ships.Group();
    }
}