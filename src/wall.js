class Wall {
    constructor(ctx, x, y, w, h, side) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.side = side
    }
    
    draw() {
        this.ctx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.ctx.fillStyle = "rgba(255, 255, 255, 0)";
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y

        return { 
            colission: collideX && collideY,
            side: this.side
        }
    }
}