class Nucleus {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = this.ctx.canvas.heigth * 0.5
    
        this.w = 70
        this.h = 300
    }

    draw() {
        strokeRect(
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
   
}