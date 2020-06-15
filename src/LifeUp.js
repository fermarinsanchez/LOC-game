class LifeUp extends PowerUp {
    
    constructor(ctx) {
        super(ctx, './img/life_up.png', 25, 25);
    }

    power(el) {
        
        if (el.health >= 100) {
            el.health = 100
        }

        if (el.health <= 90) {
            el.health += 10;
        } else {
            el.health += 10;
        }
    }

}