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

        this.createUnit("drone", this.playerShip, this.playerMothership)
        this.createUnit("corsair", this.playerShip, this.playerMothership)
        this.createUnit("destroyer", this.playerShip, this.playerMothership)
        this.createUnit("cruiser", this.playerShip, this.playerMothership)
        this.createUnit("battleship", this.playerShip, this.playerMothership)

        this.enemyMothership = this.factory.createMothership(width - 100, height - 200);
        this.enemyShip.ships.push(this.enemyMothership);

        this.createUnit("drone", this.enemyShip, this.enemyMothership)
        this.createUnit("corsair", this.enemyShip, this.enemyMothership)
        this.createUnit("destroyer", this.enemyShip, this.enemyMothership)
        this.createUnit("cruiser", this.enemyShip, this.enemyMothership)
        this.createUnit("battleship", this.enemyShip, this.enemyMothership)

        this.asteroids.push(this.factory.createAsteroid());
    }

    createUnit(type, team, teamMotherShip) {
        switch (type) {
            case "drone":
                team.drones.push(this.factory.createDrone(teamMotherShip.x, teamMotherShip.y));
                break;

            case "corsair":
                team.corsairs.push(this.factory.createCorsair(teamMotherShip.x, teamMotherShip.y));
                break;

            case "destroyer":
                team.destroyers.push(this.factory.createDestroyer(teamMotherShip.x, teamMotherShip.y));
                break;

            case "cruiser":
                team.cruisers.push(this.factory.createCruiser(teamMotherShip.x, teamMotherShip.y));
                break;

            case "battleship":
                team.battleships.push(this.factory.createBattleship(teamMotherShip.x, teamMotherShip.y));
                break;
            default:
        }
    }

    destroyAsteroid(thisAsteroid){
        console.log("Kabloom");
        thisAsteroid.changeAni('explode');
        thisAsteroid.life = 28;
    }

    combatHandling(){
        for(let i = 0; i<this.playerShip.projectiles.length; i++){
            let thisProj = this.playerShip.projectiles[i];
            if(thisProj.collides(this.enemyShip.ships)){
                for(let j = 0; j<this.enemyShip.ships.length;j++){
                    let thisShip = this.enemyShip.ships[j];
                    if(thisShip.collides(thisProj)){
                        if(j != 0){
                            this.enemyShip.takeDamage(thisProj.damage,this.enemyShip.ships[j]);
                        }
                        else{
                            this.enemyMothership.health -= thisProj.damage;
                        }
                        thisProj.remove();
                    }
                }
            }
        }
        
        for(let i = 0; i<this.enemyShip.projectiles.length; i++){
            let thisProj = this.enemyShip.projectiles[i];
            if(thisProj.collides(this.playerShip.ships)){
                for(let j = 0; j<this.playerShip.ships.length;j++){
                    let thisShip = this.playerShip.ships[j];
                    if(thisShip.collides(thisProj)){
                        if(j != 0){
                            this.playerShip.takeDamage(thisProj.damage,this.playerShip.ships[j]);
                        }
                        else{
                            this.playerMothership.health -= thisProj.damage;
                        }
                        
                        thisProj.remove();
                    }
                }
            }
        }
    }
}