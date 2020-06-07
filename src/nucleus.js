class Nucleus {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = this.ctx.canvas.height * 0.27
    
        this.w = 70
        this.h = 300
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
        return  collideX && collideY
            
     }
    
   
}