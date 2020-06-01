class Waste {
    constructor(ctx) {
        this.ctx = ctx
        
        this.x = Math.floor(Math.random() * 700 ) + 50
        this.y = Math.floor(Math.random() * 700 ) + 50
        
        this.h = 50
        this.w = 50

        this.img = new Image()
        this.img.src = './img/Mat_Radioactivo_28x28.jpg'
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