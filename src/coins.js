class Coins extends PowerUp {
    
    constructor(ctx) {
        super(ctx, './img/money_up.png', 35, 35);
    }

    power(el) {
        // this._helpAudio.play();
        el.score += 25
    }

}