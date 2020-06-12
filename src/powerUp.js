class PowerUp {
    constructor(ctx, src, w, h) {
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = src;
        
        this.w = w;
        this.h = h;
        this.x = Math.floor(Math.random() * 650 ) + 55
        this.y = Math.floor(Math.random() * 650 ) + 55
        // this._helpAudio = document.getElementById('help');
    }

    draw() {
        this.ctx.drawImage(
            this.img, 
            this.x, 
            this.y, 
            this.w, 
            this.h
        );
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y
        return  collideX && collideY     
    }
}