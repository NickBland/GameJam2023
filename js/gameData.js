class gameData {
    constructor() {
        this.factory = new spriteFactory();
        this.combat = new combatHandler();
        this.enemy = new enemyBehaviour();

        this.asteroids; // ALL asteroids on the map

        this.playerShip = new playerState();
        this.enemyShip = new playerState();

        this.asteroidDensity = 100;
    }

    setupGame() {
        this.asteroids = new Group();

        this.playerShip.setupData();
        this.enemyShip.setupData();

        this.playerMothership = this.factory.createMothership(-1400, -1400, this.playerShip);
        this.playerShip.ships.push(this.playerMothership);

        this.createUnit("drone", this.playerShip, this.playerMothership)
        this.createUnit("corsair", this.playerShip, this.playerMothership)
        this.createUnit("destroyer", this.playerShip, this.playerMothership)
        this.createUnit("cruiser", this.playerShip, this.playerMothership)
        this.createUnit("battleship", this.playerShip, this.playerMothership)

        this.enemyMothership = this.factory.createMothership(width + 600, height + 500, this.enemyShip);
        this.enemyShip.ships.push(this.enemyMothership);

        this.createUnit("drone", this.enemyShip, this.enemyMothership)
        this.createUnit("corsair", this.enemyShip, this.enemyMothership)
        this.createUnit("destroyer", this.enemyShip, this.enemyMothership)
        this.createUnit("cruiser", this.enemyShip, this.enemyMothership)
        this.createUnit("battleship", this.enemyShip, this.enemyMothership)

        for (let i = 0; i < this.asteroidDensity; i++) {
            this.createAsteroid();
        }

        this.borderSprites = new Group();
        for (let i = 0; i < 4; i++) {
            this.borderSprites.push(new Sprite());
            this.borderSprites[i].collider = "s";
        }
    }

    createUnit(type, team, teamMotherShip) {
        switch (type) {
            case "drone":
                team.drones.push(this.factory.createDrone(teamMotherShip.x, teamMotherShip.y, team));
                break;

            case "corsair":
                team.corsairs.push(this.factory.createCorsair(teamMotherShip.x, teamMotherShip.y, team));
                break;

            case "destroyer":
                team.destroyers.push(this.factory.createDestroyer(teamMotherShip.x, teamMotherShip.y, team));
                break;

            case "cruiser":
                team.cruisers.push(this.factory.createCruiser(teamMotherShip.x, teamMotherShip.y, team));
                break;

            case "battleship":
                team.battleships.push(this.factory.createBattleship(teamMotherShip.x, teamMotherShip.y, team));
                break;
            default:
        }
    }

    handleBorders() {
        this.borderSprites[0].y = ((camera.cameraY + 410) + 1200);
        this.borderSprites[1].x = ((camera.cameraX + 410) + 1200);
        this.borderSprites[2].y = ((camera.cameraY - 410) - 1200);
        this.borderSprites[3].x = ((camera.cameraX - 410) - 1200);

        this.borderSprites[0].x = ((camera.cameraX + 400));
        this.borderSprites[1].y = ((camera.cameraY + 400));
        this.borderSprites[2].x = ((camera.cameraX - 400));
        this.borderSprites[3].y = ((camera.cameraY + 400));

        this.borderSprites[0].w = 4000;
        this.borderSprites[0].h = 10;
        this.borderSprites[1].w = 10;
        this.borderSprites[1].h = 4000;
        this.borderSprites[2].w = 4000;
        this.borderSprites[2].h = 10;
        this.borderSprites[3].w = 10;
        this.borderSprites[3].h = 4000;
    }

    createAsteroid() {
        this.asteroids.push(this.factory.createAsteroid());
    }

    destroyAsteroid(thisAsteroid) {
        thisAsteroid.changeAni('explode');
        thisAsteroid.collider = "n";
        thisAsteroid.life = 28;
    }

    combatHandling() {
        for (let i = 0; i < this.playerShip.projectiles.length; i++) {
            let thisProj = this.playerShip.projectiles[i];
            if (thisProj.collides(this.enemyShip.ships)) {
                for (let j = 0; j < this.enemyShip.ships.length; j++) {
                    let thisShip = this.enemyShip.ships[j];
                    if (thisShip.collides(thisProj)) {
                        if (j != 0) {
                            this.enemyShip.takeDamage(thisProj.damage, this.enemyShip.ships[j]);
                        }
                        else {
                            this.enemyMothership.health -= thisProj.damage;
                        }
                        thisProj.remove();
                    }
                }
            }
        }

        for (let i = 0; i < this.enemyShip.projectiles.length; i++) {
            let thisProj = this.enemyShip.projectiles[i];
            if (thisProj.collides(this.playerShip.ships)) {
                for (let j = 0; j < this.playerShip.ships.length; j++) {
                    let thisShip = this.playerShip.ships[j];
                    if (thisShip.collides(thisProj)) {
                        if (j != 0) {
                            this.playerShip.takeDamage(thisProj.damage, this.playerShip.ships[j]);
                        }
                        else {
                            this.playerMothership.health -= thisProj.damage;
                        }

                        thisProj.remove();
                    }
                }
            }
        }
    }

    fogOfWar() {
        let thisEnemyVisible;
        for (let thisEnemy of this.enemyShip.ships) {
            thisEnemyVisible = false;
            for (let thisShip of this.playerShip.ships) {
                if (dist(thisShip.x, thisShip.y, thisEnemy.x, thisEnemy.y) <= thisShip.range) {
                    thisEnemyVisible = true;
                }
            }
            thisEnemy.visible = thisEnemyVisible;
        }
    }
}