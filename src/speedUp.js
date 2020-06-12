class SpeedUp extends PowerUp {
    
    constructor(ctx) {
        super(ctx, './img/speed_up.png', 25, 32);
    }

    power(el) {
        
        const SpeedOfLight = setInterval(() => {
            el.v = 5
        }, 0);

        // A los 2 segundos cancelo ejecucion 
        setTimeout(function(){ 
            clearInterval(SpeedOfLight); 
            el.v = 3 
        }, 4000);

       
    }
}