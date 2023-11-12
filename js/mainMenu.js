/**
 * @Class Class to hold main menu sprites and data.
 */
class mainMenu {

    constructor() {
        this.tutorialShow = false;
        this.creditsShow = false;
        this.playButton, this.tutorialButton, this.creditsButton;

        this.drawInitialMainMenuScreen();
    }

    /**
     * Sets up the main menu screen to display the sprites for buttons
     */
    drawInitialMainMenuScreen() {
        this.playButton = new Sprite();
        this.playButton.w = 0.3 * width;
        this.playButton.h = 0.06 * height;
        this.playButton.y = 0.55 * height;

        this.playButton.textColor = "#ffe7d6";
        this.playButton.textSize = 22;
        this.playButton.text = "Play Game";

        this.playButton.collider = "k";

        this.tutorialButton = new Sprite();
        this.tutorialButton.w = this.playButton.w;
        this.tutorialButton.h = this.playButton.h;
        this.tutorialButton.y = 0.65 * height;

        this.tutorialButton.textColor = "#ffe7d6";
        this.tutorialButton.textSize = 22;
        this.tutorialButton.text = "Tutorial";

        this.playButton.collider = "k";

        this.creditsButton = new Sprite();
        this.creditsButton.w = this.playButton.w;
        this.creditsButton.h = this.playButton.h;
        this.creditsButton.y = 0.75 * height;

        this.creditsButton.textColor = "#ffe7d6";
        this.creditsButton.textSize = 22;
        this.creditsButton.text = "Credits";

        this.playButton.collider = "k";

    }

    /**
     * Show all sprite-buttons on the screen
     */
    showMenuButton() {
        this.playButton.visible = true;
        this.tutorialButton.visible = true;
        this.creditsButton.visible = true;
    }

    /**
     * Hide all the sprite-buttons from the screen
     */
    hideMenuButton() {
        this.playButton.visible = false;
        this.tutorialButton.visible = false;
        this.creditsButton.visible = false;
    }

    /**
     * Hide all the sprite-buttons, and then destroy them. Changes game state to game
     */
    playButtonClicked() {
        pressedButton_sound.play();
        menuMusic.stop();
        gameMusic.loop();

        this.hideMenuButton();

        this.playButton.remove(); // Destroy the sprites
        this.tutorialButton.remove();
        this.creditsButton.remove();

        gameState.mainMenu = false;
        gameState.game = true;
    }

    /**
     * Opens up the tutorial pane
     */
    tutorialButtonClicked() {
        pressedButton_sound.play();

        this.hideMenuButton();
        this.tutorialShow = true;
    }

    /**
     * Shows text on the screen for the tutorial
     */
    showTutorial() {
        textAlign(CENTER, TOP)
        fill('#d19f5a');
        textFont(myfontB, 27);
        text("GOAL: DEFEAT THE ENEMY MOTHERSHIP", width / 2, height / 10);
        textAlign(LEFT, TOP);
        textFont(myfont, 20);
        text("Control:", width / 10, (height / 10) * 6.25)

        fill('#ffe7d6');
        text("Step 1: Harvest resources with mining drones \n(Group 1)", width / 10, (height / 10) * 2);
        text("Step 2: Make more drones, and fighter ships", width /10, (height / 10) * 3);
        text("Step 3: Purchase upgrades to get stronger", width /10, (height / 10) * 3.75);
        text("Step 4: Get the coveted `Jesse's Jest` Upgrade", width /10, (height / 10) * 4.5);
        text("Step 5: KILL THOSE XENOS", width / 10, (height / 10) * 5.25);

        textSize(18);
        text("* The Player's view will follow the Mouse movement", width/10, (height / 10) * 7);
        text("* The ships can be selected by click-to-drag \nselection / specified key for each ship", width / 10, (height / 10) * 7.75)
        text("* Right Click to control the ship's position", width / 10, (height / 10) * 8.75);

        tutorialAni.scale = 4;
        scale(-1, 1)
        animation(tutorialAni, -0.8 * width, (height / 10) * 5.75)
    }

    /**
     * Opens the credits pane
     */
    creditsButtonClicked() {
        pressedButton_sound.play();

        this.hideMenuButton();
        this.creditsShow = true;
    }

    /**
     * Shows the credits on top of the pane 
     */
    showCredits() {
        textAlign(CENTER, TOP);
        fill('#d19f5a');
        textFont(myfontB, 32);
        text("ATTRIBUTION", width / 2, 0.25 * height);

        textAlign(LEFT, TOP);
        textFont(myfontB, 25);
        //Categories
        text("FONT", width/10, 0.35 * height);
        text("BACKGROUND", width/10, 0.5 * height);
        text("BACKGROUND MUSIC", width/10, 0.7 * height);
        text("SOUND EFFECT", 0.6 * width, 0.35 * height);
        text("GAME ASSETS", 0.6 * width, 0.5 * height);

        fill('#ffe7d6');
        textFont(myfont, 20);
        //Font 
        text("GGBotNet", width/10, 0.4 * height);
        
        //Game assets
        text("Deep-Fold", width/10, 0.55 * height);
        text("kayillustrations", width/10, 0.6 * height);
        
        //Background music
        text("TinyWorlds", width/10, 0.75 * height);
        text("nene", width/10, 0.8 * height);
        text("Wolfgang_", width/10, 0.85 * height);

        //Sound effect
        text("Fupi", 0.6 * width, 0.4 * height);
        
        //Game assets
        text("FoozleCC", 0.6 * width, 0.55 * height);
        text("Craftpix", 0.6 * width, 0.6 * height);
        text("duckive", 0.6 * width, 0.65 * height);
        text("Pixelsnorf", 0.6 * width, 0.7 * height);
        text("alphawaves", 0.6 * width, 0.75 * height);
        text("MattWalkden", 0.6 * width, 0.8 * height);
        text("brullov", 0.6 * width, 0.85 * height);

        //fill('#8b4049')
        textFont(myfont, 25);
        text("This game is created by ... ASSHOLES", width/10, 0.1* height);
        text("Assholes: Thien, Nick and Jesse", width/10, 0.15* height);
    }

    /**
     * Checks for player interactivity with the sprite-buttons
     * Determines first if hovering over a button, changing the background and size of the sprite.
     * Then, if the user clicks the mouse while hovering, opens the corresponding pane.
     */
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

    /**
     * Draw non p5play elements on the screen with each draw cycle -- Text at top, etc.
     * Additionally, handles scrolling background.
     */
    drawMainMenuScreen() {
        textFont(myfont);
        imageMode(CORNER);
        mainMenuBgImg.resize(0, height);
        image(mainMenuBgImg, offset_menuX, 0);
        image(mainMenuBgImg, offset_menuX + mainMenuBgImg.width, 0);
        offset_menuX -= 1;
        if (offset_menuX <= -mainMenuBgImg.width) {
            offset_menuX = 0;
        }
        stroke('#d19f5a');
        strokeWeight(5);
        noFill();
        rect(0.2 * canvas.w, 0.3 * canvas.h, 0.6 * canvas.w, 0.11 * canvas.h, 20);
        fill('#ffe7d6');
        stroke('#8b4049');
        textAlign(CENTER, CENTER);
        textFont(myfontB, 40);
        text("Xeno Hunters", canvas.w / 2, 0.35 * canvas.h);
        strokeWeight(1);
        textFont(myfont);

        if (this.tutorialShow || this.creditsShow) {
            image(mainMenuBgImg, offset_menuX, 0);
            image(mainMenuBgImg, offset_menuX + mainMenuBgImg.width, 0);

            noStroke();
            fill(0, 150);
            rect(width / 20, height / 20, 0.9 * width, 0.9 * height);
            if (kb.presses("escape")) {
                this.tutorialShow = false;
                this.creditsShow = false;
                this.showMenuButton();
            }

            if (this.tutorialShow) {
                this.showTutorial();
            } else {
                this.showCredits();
            }
        }
        this.checkMouseOnButtons();
    }
}