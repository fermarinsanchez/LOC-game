class ChemicalPeople {
    constructor(ctx) {
        this.ctx = ctx
        
        this.x = Math.floor(Math.random() * (this.ctx.canvas.width - 200)) 
        console.log(this.x)
        this.y = 100

        this.w = 90
        this.h = 150

        this.vx = 0
        this.vy = 5 

        this.img = new Image()
        this.img.src = './img/creeper.png'
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

    move() {
        this.y += this.vy
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y

        return  collideX && collideY     
    }
}