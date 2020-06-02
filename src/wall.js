class Wall {
    constructor(ctx, x, y, w, h) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    
    draw() {
        this.ctx.strokeRect(
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y

        return collideX && collideY
    }
}