class Player2 {
    constructor(ctx, playerNum) {
        this.ctx = ctx

        this.x = this.ctx.canvas.width - 50
        this.y = (this.ctx.canvas.height / 2) + 80

        this.w = 80
        this.h = 80
        
        this.vx = 0
        this.vy = 0

        this.img = new Image()
        this.img.src = './img/Player_LOC_28x28.jpg'

        this.score = 0
        this.health = 100

        this.takeWaste = false
        
        this.playerNum = playerNum

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
        this._setListeners()
        
        this.x += this.vx
        this.y += this.vy
    }

    _setListeners() {
        document.addEventListener('keydown', e => {
          switch (e.keyCode) {
            case KEY_UP2:
              this.vy = -3
              break;
            case KEY_LEFT2:
              this.vx = -3
              break;
            case KEY_RIGHT2:
              this.vx = 3
              break;
            case KEY_DOWN2:
              this.vy = 3
              // this.shot.play()
              break;
          }
        })
    
        document.addEventListener('keyup', e => {
            switch (e.keyCode) {
                case KEY_UP2:
                  this.vy = 0
                  break;
                case KEY_LEFT2:
                  this.vx = 0
                  break;
                case KEY_RIGHT2:
                  this.vx = 0
                  break;
                case KEY_DOWN2:
                  this.vy = 0
                  // this.shot.play()
                  break;
              }
        })
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y

        return  collideX && collideY     
    }

}