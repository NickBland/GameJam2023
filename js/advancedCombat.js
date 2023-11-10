class combatHandler {
    /**
     * Weapon types, I wanna make these interchangeable between ships
     */
    determineWeapon(thisShip, thisEnemy) {
        switch (thisShip.weaponType) {
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

    standard(thisShip, thisEnemy) {
        if (frameCount % (thisShip.fireRate * 100) == 0) {
            let projectile = data.factory.createProjectile(thisShip.x, thisShip.y);
            projectile.damage = thisShip.damage;
            projectile.target = thisEnemy;
            projectile.overlaps(allSprites);

            projectile.moveTowards(thisEnemy.x + random(-thisShip.accuracy, thisShip.accuracy), thisEnemy.y + random(-thisShip.accuracy, thisShip.accuracy), 0.1);
            projectile.rotation = projectile.direction;
            thisShip.team.projectiles.push(projectile);
        }
    }

    shotgun(thisShip, thisEnemy) {
        if (frameCount % (thisShip.fireRate * 100) == 0) {
            for (let i = 0; i < thisShip.team.shotgunPellets; i++) {
                let projectile = data.factory.createProjectile(thisShip.x, thisShip.y);
                projectile.damage = thisShip.damage;
                projectile.target = thisEnemy;
                projectile.overlaps(allSprites);

                projectile.moveTowards(thisEnemy.x + random(-thisShip.accuracy, thisShip.accuracy), thisEnemy.y + random(-thisShip.accuracy, thisShip.accuracy), 0.1);
                projectile.rotation = projectile.direction;
                thisShip.team.projectiles.push(projectile);
            }
        }
    }

    heavyShot(thisShip, thisEnemy) {
        if (frameCount % (thisShip.fireRate * 100) == 0) {
            let projectile = data.factory.createProjectile(thisShip.x, thisShip.y);
            projectile.damage = thisShip.damage;
            projectile.target = thisEnemy;
            projectile.scale = 2;
            projectile.overlaps(allSprites);

            projectile.moveTowards(thisEnemy.x + random(-thisShip.accuracy, thisShip.accuracy), thisEnemy.y + random(-thisShip.accuracy, thisShip.accuracy), 0.1);
            projectile.rotation = projectile.direction;
            thisShip.team.projectiles.push(projectile);

            if (thisShip.doubleShot >= floor(random(0, 101))) {
                this.heavyShot(thisShip, thisEnemy);
            }
        }
    }

    rapid(thisShip, thisEnemy) {
        if (frameCount % (thisShip.fireRate * 100) == 0) {
            let projectile = data.factory.createProjectile(thisShip.x, thisShip.y);
            projectile.damage = thisShip.damage;
            projectile.target = thisEnemy;
            projectile.overlaps(allSprites);

            projectile.moveTowards(thisEnemy.x + random(-thisShip.accuracy, thisShip.accuracy), thisEnemy.y + random(-thisShip.accuracy, thisShip.accuracy), 0.1);
            projectile.rotation = projectile.direction;
            thisShip.team.projectiles.push(projectile);
        }
    }
}