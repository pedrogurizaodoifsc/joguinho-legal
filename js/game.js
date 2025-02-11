const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { default: 'arcade' },
    scene: { preload, create, update }
};

let jogador, movimento;

function preload() {
    this.load.image("fundo", "foresta.png");
    this.load.spritesheet("jogador", "sprites1.png", { frameWidth: 16, frameHeight: 16 }); 
}

function create() {
    this.add.image(0, 0, 'fundo').setOrigin(0, 0).setDisplaySize(window.innerWidth, window.innerHeight);
    jogador = this.physics.add.sprite(200, 200, 'jogador');
    
    const escalaX = 2;  
    const escalaY = 2;  
    jogador.setScale(escalaX, escalaY);  


    this.anims.create({
        key: 'andar_esquerda',
        frames: this.anims.generateFrameNumbers('jogador', { start: 8, end: 11 }), 
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'andar_direita',
        frames: this.anims.generateFrameNumbers('jogador', { start: 12, end: 15 }), 
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'andar_cima',
        frames: this.anims.generateFrameNumbers('jogador', { start: 0, end: 3 }), 
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'andar_baixo',
        frames: this.anims.generateFrameNumbers('jogador', { start: 4, end: 7 }), 
        frameRate: 10,
        repeat: -1
    });

    this.cameras.main.startFollow(jogador);
    movimento = this.input.keyboard.createCursorKeys();

    this.input.on('pointerdown', () => this.sound.context.resume()); 
}

function update() {
    jogador.setVelocity(0);
    
    let movendo = false;

    if (movimento.left.isDown) {
        jogador.setVelocityX(-150);
        jogador.anims.play('andar_esquerda', true);
        movendo = true;
    } else if (movimento.right.isDown) {
        jogador.setVelocityX(150);
        jogador.anims.play('andar_direita', true);
        movendo = true;
    }

    if (movimento.up.isDown) {
        jogador.setVelocityY(-150);
        jogador.anims.play('andar_cima', true);
        movendo = true;
    } else if (movimento.down.isDown) {
        jogador.setVelocityY(150);
        jogador.anims.play('andar_baixo', true);
        movendo = true;
    }

    if (!movendo) jogador.anims.stop();
}

new Phaser.Game(config);

