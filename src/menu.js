function Menu() {
	this.startBg;
	this.startPrompt;
    
    this.menuFontStyle;
    
    this.timer;
    this.autoChangeStateDelay = 15000;
    
    this.firebutton;
    
    this.btnHighscores;
    this.padding = 70;
    
    // FILTER STUFF 
    this.crtFilter;
    
    // STARFIELD
    this.starfield;
};

Menu.prototype.create = function () {
    
    this.starfield = new Starfield(this);
        
    this.menuFontStyle = { font: "bold 28px 'Press Start 2P', cursive", fill: "#ffffff", align: "center" };
    this.startPrompt = this.add.text(this.world.centerX, this.world.centerY + 120, "- Touch to Start -", this.menuFontStyle);
    this.startPrompt.anchor.setTo(0.5, 0.5);
    this.timer = 0;
    
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);    
    
    this.startBg = this.add.sprite(0, 0, 'fondo');
    
    //creamos el sprite del fondo y hacemos que se pueda clicar
    this.startBg.inputEnabled = true;		
    this.startBg.events.onInputDown.addOnce(this.onInputDown, this);
    
    //Botón de acceso directo a la pantalla de highscores
    this.btnHighscores = this.add.sprite(this.world.width - this.padding, this.padding, 'podium');
    this.btnHighscores.anchor.setTo(1, 0);
    this.btnHighscores.inputEnabled = true;	
    this.btnHighscores.events.onInputDown.addOnce(this.onHighscoresClick, this);
    
    this.add.tween(this.btnHighscores).to({y: 40}, 1000, Phaser.Easing.Linear.InOut, true, 0, Number.MAX_VALUE, true);
    
    //Add the CRT Filter    
    this.crtFilter = new Phaser.Filter(this, null, this.cache.getShader('crtFilter'));
    this.crtFilter.setResolution(this.world.width, this.world.height);
    this.stage.filters = [this.crtFilter];
    
    // Returns to the main menu automatically after a pause at the end of the typed leaderboard
    this.time.events.add(this.autoChangeStateDelay, this.onHighscoresClick, this);
};

Menu.prototype.update = function () {
    this.timer += this.time.elapsed;
    if (this.timer >= 700) {
        this.timer %= 700;
        this.startPrompt.visible = !this.startPrompt.visible;
    }
    if (this.fireButton.isDown)
        this.onInputDown();
    
    //STRFIELD
    this.starfield.update();
    
    //FILTERS
    this.crtFilter.update();
};

Menu.prototype.onHighscoresClick = function () {
    this.game.state.start('leaderboard');
};

Menu.prototype.onInputDown = function () {
    if (!this.game.device.desktop) {
        this.scale.startFullScreen ();
    }
    this.game.state.start('game');
};

Menu.prototype.render = function() {
    
    this.game.debug.bodyInfo(this.btnHighscores);
};

module.exports = Menu;
