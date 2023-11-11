/**
 * @Class Class to hold main menu sprites and data.
 */
class end {
    
    constructor() {
        this.backgroundSprite;
        this.restartButton;
        this.drawInitialEndScreen();
    }
    
    drawInitialEndScreen() {
        this.backgroundSprite = new Sprite(width/2, height/2, width, height);
        this.backgroundSprite.draw = () => {
            fill('#253A5E');
            rect(0, 0, width, height);
            textFont(myfontB, 36);
            textAlign(CENTER, CENTER);
            if (winGame) {
                fill('#d19f5a');
                text("Game Over! You Won", 0, -150);
                wonImg.resize(254, 0);
                image(wonImg, 0, 0);
                
                fill('#ffe7d6');
                rect(110, -50, 180, 40, 10);
                fill('black');
                textSize(14);
                text("Dead...", 110, -50);
            } else {
                fill("#8b4049");
                text("Game Over! You Lost", 0, -150);
                lostImg.scale = 4;
                lostImg.frameDelay = 7;
                animation(lostImg, 0 ,0);

                fill('#ffe7d6');
                rect(110, -50, 180, 40, 10);
                fill('black');
                textSize(14);
                text("Haha Losers !!!", 110, -50);
            }
        }
        this.backgroundSprite.collider = 'n';

        textFont(myfont);
        this.restartButton = new Sprite(width/2, height/2+150, 0.3*width, 0.08*height);
        this.restartButton.textFont = myfont;
        this.restartButton.textColor = "#ffe7d6";
        this.restartButton.textSize = 24;
        this.restartButton.text = "Restart";
        this.restartButton.collider = "k";
    }

    checkMouseOnButtons() {
        if (this.restartButton.mouse.hovering()) {
            this.restartButton.scale = 1.2;
            this.restartButton.color = "#8b4049";
            if (mouse.presses("left")) {
                this.restartButtonClicked();
            }
        } else {
            this.restartButton.scale = 1;
            this.restartButton.color = "#d19f5a";
        }
    }

    restartButtonClicked() {
        pressedButton_sound.play();
        wonMusic.stop();
        lostMusic.stop();
        menuMusic.loop();        

        this.restartButton.remove();
        this.backgroundSprite.remove();

        gameState.end = false;
        gameState.mainMenu = true;
    }

    /**
     * Sets up the end screen to display the sprites for replay button
     */
    drawEndScreen() {
        this.checkMouseOnButtons()
    }
}