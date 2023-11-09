/**
 * @Class Class to hold main menu sprites and data.
 */
class end {
    
    constructor() {
        this.backgroundSprite
        this.endChar
        this.drawInitialEndScreen();
    }
    
    drawInitialEndScreen() {
        this.backgroundSprite = new Sprite(width/2, height/2, width, height)
        this.backgroundSprite.color = 'black';
        this.backgroundSprite.collider = 'n';
        this.backgroundSprite.textColor = "red"

        this.endChar = new Sprite(width/2, 2/3*height);
        this.endChar.collider = 'n';
    }

    /**
     * Sets up the end screen to display the sprites for replay button
     */
    drawEndScreen() {

        textFont(myfontB, 36)
        if (winGame) {
            this.endChar.color = 'blue'
            this.backgroundSprite.text = "Game Over, You Win"
        } else {
            this.endChar.color = 'green'
            this.backgroundSprite.text = "Game Over, You Lose"
        }
    }
}