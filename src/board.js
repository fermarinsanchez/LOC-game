class Board {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = 0

        this.h = this.ctx.canvas.height
        this.w = this.ctx.canvas.width

        this.img = new Image()
        this.img.src = './img/Tablero_LOC_800_X_800.jpg'
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
}