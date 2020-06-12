class LifeUpBig extends PowerUp {
    
    constructor(ctx) {
        super(ctx, './img/life_up_big.png', 35, 35);
    }

    power(el) {
        // this._helpAudio.play();
        if (el.health >= 100) {
            el.health = 100
        }

        if (el.health <= 70) {
            el.health += 30;
        } else {
            el.health += 30;
        }
    }

}