class Coins extends PowerUp {
    
    constructor(ctx) {
        super(ctx, './img/money_up.png', 35, 35);
    }

    power(el) {
      
        el.score += 25
    }

}