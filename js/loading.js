/**
 * @Class Class to hold main menu sprites and data.
 */
class loading {
    
    constructor() {
        //this.startButton;
        this.startPosition = 0;
        this.loadingNum = 0;
        this.loadingChar;
        this.startButton;
        this.drawInitialLoadingScreen();
    }
    
    drawInitialLoadingScreen() {
        this.loadingChar = new Sprite(-20, height/2-64, 128);
        this.loadingChar.addAni("loadingAni", loadingAni);
        this.loadingChar.addAni("loadingDone", loadingDone);
        this.loadingChar.anis.scale = 3;
        this.loadingChar.anis.frameDelay = 5;
        this.loadingChar.changeAni("loadingAni")

        this.startButton = new Sprite(width/2, height/2+100, 0.4*width, 0.08*height)
        this.startButton.textFont = myfont;
        this.startButton.textColor = "#ffe7d6";
        this.startButton.textSize = 30;
        this.startButton.text = "Start Game";
        this.startButton.visible=false;

        this.startButton.collider = "k";
    }

    checkMouseOnButtons() {
        if (this.startButton.mouse.hovering()) {
            this.startButton.scale = 1.2;
            this.startButton.color = "#8b4049";
            if (mouse.presses("left")) {
                this.startButtonClicked();
            }
        } else {
            this.startButton.scale = 1;
            this.startButton.color = "#d19f5a";
        }
    }

    startButtonClicked() {
        pressedButton_sound.play();
        this.startButton.remove();
        this.loadingChar.remove();
        
        gameState.loading = false;
        gameState.mainMenu = true;
    }
    /**
     * Sets up the loading screen to display the sprites for buttons
     */
    drawLoadingScreen() {
        background("#253A5E")
        noStroke();
        fill('#8b4049')
        rect(0, height/2, this.startPosition, 10, 10);
        
        if (this.loadingNum<=99) {
            this.loadingChar.x ++;
            this.startPosition ++;
            if (this.startPosition%(width/100) == 0){
                this.loadingNum ++;
            }
            fill('#d19f5a')
            textAlign(CENTER, CENTER)
            textFont(myfont, 36)
            text("Loading: " + this.loadingNum + "%", width/2, height/2+100)

        } else {
            this.loadingChar.x = width/2
            this.loadingChar.changeAni("loadingDone");
            this.loadingChar.anis.frameDelay = 15;

            this.checkMouseOnButtons();
            this.startButton.visible = true;
        }
    }
}