class Board {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = 0

        this.h = this.ctx.canvas.height
        this.w = this.ctx.canvas.width

        this.img = new Image()
        this.img.src = './img/LOC_BOARD_FINAL copia.jpg'
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

     collide() {
        // const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        // const collideY = el.y < this.y + this.h && el.y + el.h > this.y
        const collideX = this.player.x + this.player.w > this.ctx.canvas.width

        return collideX
     }
}