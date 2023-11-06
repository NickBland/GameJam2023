class combatHandler{
    /**
     * Weapon types, I wanna make these interchangeable between ships
     */
    determineWeapon(thisShip, thisEnemy){
        switch (thisShip.weaponType){
            case "standard":
                this.standard(thisShip, thisEnemy);
                break;
                case "shotgun":
                this.shotgun(thisShip, thisEnemy);
                break;
                case "heavy":
                this.heavyShot(thisShip, thisEnemy);
                break;
                case "rapid":
                this.rapid(thisShip, thisEnemy);
                break;
        }
    }
    
    standard(thisShip, thisEnemy){
        if (frameCount % 10 == 0) {
        let projectile = data.factory.createProjectile(thisShip.x, thisShip.y);
        projectile.damage = thisShip.damage;
        projectile.target = thisEnemy;
        projectile.overlaps(allSprites);
        projectile.moveTowards(thisEnemy, 0.1);
        thisShip.team.projectiles.push(projectile);
        }
    }

    shotgun(thisShip, thisEnemy){
        console.log("fires shotgun");
        // if (frameCount % 10 == 0) {
        // let projectile = data.factory.createProjectile(thisShip.x, thisShip.y);
        // this.projectiles.push(projectile);
        // projectile.damage = thisShip.damage;
        // projectile.target = thisEnemy;
        // projectile.overlaps(allSprites);
        // projectile.moveTowards(thisEnemy, 0.1);
        // }
    }

    heavyShot(thisShip, thisEnemy){
        console.log("fires heavy");
        // if (frameCount % 10 == 0) {
        // let projectile = data.factory.createProjectile(thisShip.x, thisShip.y);
        // this.projectiles.push(projectile);
        // projectile.damage = thisShip.damage;
        // projectile.target = thisEnemy;
        // projectile.overlaps(allSprites);
        // projectile.moveTowards(thisEnemy, 0.1);
        // }
    }
    
    rapid(thisShip, thisEnemy){
        console.log("fires rapid");
        // if (frameCount % 10 == 0) {
        // let projectile = data.factory.createProjectile(thisShip.x, thisShip.y);
        // this.projectiles.push(projectile);
        // projectile.damage = thisShip.damage;
        // projectile.target = thisEnemy;
        // projectile.overlaps(allSprites);
        // projectile.moveTowards(thisEnemy, 0.1);
        // }
    }


    /**
     * Combat movements, Not sure how this'll work but they'll be here
     */
    determineType(){
        switch (thisShip.group){
            case "corsair":
                this.corsair(thisShip, thisEnemy);
                break;
                case "destroyer":
                this.destroyer(thisShip, thisEnemy);
                break;
                case "cruiser":
                this.cruiser(thisShip, thisEnemy);
                break;
                case "battleship":
                this.battleship(thisShip, thisEnemy);
                break;
        }
    }

    corsair(){

    }

    destroyer(){

    }

    cruiser(){

    }

    battleship(){

    }
}