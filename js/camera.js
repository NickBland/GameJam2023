/**
 * @class Camera class to deal with simple player movement of the camera utilising the mouse.
 */
class customCamera {
    constructor() {
        this.cameraX = 0;
        this.cameraY = 0;
    }

    /**
     * Handles the camera Movement
     */
    moveCamera() {

        if ((kb.pressing("arrowUp") || mouse.y < 20) && this.cameraY < 1600) {
            this.moveGame(0, 5);
        }
        if ((kb.pressing("arrowDown") || mouse.y > height - 20) && this.cameraY > -800) {
            this.moveGame(0, -5);
        }
        if ((kb.pressing("arrowLeft") || mouse.x < 20) && this.cameraX < 1600) {
            this.moveGame(5, 0);
        }
        if ((kb.pressing("arrowRight") || mouse.x > width - 20) && this.cameraX > -800) {
            this.moveGame(-5, 0);
        }
    }

    /**
     * Handles the sprite's positioning
     * @param {int} x //X movement
     * @param {int} y //Y movement
     */
    moveGame(x, y) {
        this.cameraX += x;
        this.cameraY += y;
        for (let sprite of data.factory.gameSprites) {
            sprite.x += x;
            sprite.y += y;
            if (sprite.group) {
                sprite.destinationX += x;
                sprite.destinationY += y;
            }
        }
    }
}