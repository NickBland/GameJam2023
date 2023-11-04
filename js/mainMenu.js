class mainMenu {
    
    constructor() {
        this.tutorialShow = false;
        this.creditsShow = false;
        this.playButton, this.tutorialButton, this.creditsButton;

        this.drawInitialMainMenuScreen();
    }
    
    drawInitialMainMenuScreen() {
        this.playButton = new Sprite();
        this.playButton.w = 0.3 * width;
        this.playButton.h = 0.06 * height;
        this.playButton.y = 0.55 * height;
        this.playButton.color = "#d19f5a";

        this.playButton.textColor = "#ffe7d6";
        this.playButton.textSize = 22;
        this.playButton.textFont = myfont;
        this.playButton.text = "Play Game"

        this.playButton.collider = "k";

        this.tutorialButton = new Sprite();
        this.tutorialButton.w = this.playButton.w;
        this.tutorialButton.h = this.playButton.h;
        this.tutorialButton.y = 0.65 * height;
        this.tutorialButton.color = "#d19f5a";

        this.tutorialButton.textColor = "#ffe7d6";
        this.tutorialButton.textSize = 22;
        this.tutorialButton.textFont = myfont;
        this.tutorialButton.text = "Tutorial";

        this.playButton.collider = "k";

        this.creditsButton = new Sprite();
        this.creditsButton.w = this.playButton.w;
        this.creditsButton.h = this.playButton.h;
        this.creditsButton.y = 0.75 * height;
        this.creditsButton.color = "#d19f5a";

        this.creditsButton.textColor = "#ffe7d6";
        this.creditsButton.textSize = 22;
        this.creditsButton.textFont = myfont;
        this.creditsButton.text = "Credits";

        this.playButton.collider = "k";

    }
    
    showMenuButton() {
        this.playButton.visible = true;
        this.tutorialButton.visible = true;
        this.creditsButton.visible = true;
    }

    hideMenuButton() {
        this.playButton.visible = false;
        this.tutorialButton.visible = false;
        this.creditsButton.visible = false;
    }
    
    playButtonClicked() {
        this.hideMenuButton();

        this.playButton.remove(); // Destroy the sprites
        this.tutorialButton.remove();
        this.creditsButton.remove();

        gameState.mainMenu = false;
        gameState.game = true;
    }

    tutorialButtonClicked() {
        this.hideMenuButton();
        this.tutorialShow = true;
    }

    creditsButtonClicked() {
        this.hideMenuButton()
        this.creditsShow = true;
    }

    checkMouseOnButtons() {
        if (this.playButton.mouse.hovering()) {
            this.playButton.scale = 1.2;
            this.playButton.color = "#8b4049";
            if (mouse.presses("left")) {
                this.playButtonClicked();
            }
        } else {
            this.playButton.scale = 1;
            this.playButton.color = "#d19f5a";
        }

        if (this.tutorialButton.mouse.hovering()) {
            this.tutorialButton.scale = 1.2;
            this.tutorialButton.color = "#8b4049";
            if (mouse.presses("left")) {
                this.tutorialButtonClicked();
            }
        } else {
            this.tutorialButton.scale = 1;
            this.tutorialButton.color = "#d19f5a";
        }

        if (this.creditsButton.mouse.hovering()) {
            this.creditsButton.scale = 1.2;
            this.creditsButton.color = "#8b4049";
            if (mouse.presses("left")) {
                this.creditsButtonClicked();
            }
        } else {
            this.creditsButton.scale = 1;
            this.creditsButton.color = "#d19f5a";
        }
    }
    
    drawMainMenuScreen() {
        mainMenuBgImg.resize(0, height);
        image(mainMenuBgImg, offset_menuX, 0)
        image(mainMenuBgImg, offset_menuX + mainMenuBgImg.width, 0);
        offset_menuX -= 1
        if (offset_menuX <= -mainMenuBgImg.width) {
            offset_menuX = 0;
        }
        stroke('#d19f5a')
        strokeWeight(5)
        noFill()
        rect(0.2 * canvas.w, 0.3 * canvas.h, 0.6 * canvas.w, 0.11 * canvas.h, 20);
        fill('#ffe7d6')
        stroke('#8b4049')
        textAlign(CENTER, CENTER)
        textFont(myfontB, 40)
        text("Xeno Hunters", canvas.w / 2, 0.35 * canvas.h)
        strokeWeight(1);
    
        if (this.tutorialShow || this.creditsShow) {
            image(mainMenuBgImg, offset_menuX, 0)
            image(mainMenuBgImg, offset_menuX + mainMenuBgImg.width, 0);
    
            noStroke();
            fill(0, 150);
            rect(width / 20, height / 20, 0.9 * width, 0.9 * height);
            if (kb.presses("escape")) {
                this.tutorialShow = false;
                this.creditsShow = false;
                this.showMenuButton();
            }
        }
        this.checkMouseOnButtons();
    }
}