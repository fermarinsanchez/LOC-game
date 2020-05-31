class Player {
    constructor(ctx) {
        this.ctx = ctx

        this.x = this.ctx.canvas.width - 80
        this.y = this.ctx.canvas.height / 2

        this.w = 56
        this.h = 56
        
        this.vx = 0
        this.vy = 0

        this.img = new Image()
        this.img.src = './img/Player_LOC_28x28.jpg'

        this.actions = {
            right: false,
            left: false,
            up: false,
            down: false
        }
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

    checkBoardBorders() {
        if (this.y + this.h > this.ctx.canvas.height - 100) {
            this.y = this.ctx.canvas.height - this.h -100
        }
    }

    move() {
        this._setListeners()
        
        this.x += this.vx
        this.y += this.vy

        this.checkBoardBorders()
    }

    _setListeners() {
        document.addEventListener('keydown', e => {
          switch (e.keyCode) {
            case KEY_UP:
              this.vy = -3
              break;
            case KEY_LEFT:
              this.vx = -3
              break;
            case KEY_RIGHT:
              this.vx = 3
              break;
            case KEY_DOWN:
              this.vy = 3
              // this.shot.play()
              break;
          }
        })
    
        document.addEventListener('keyup', e => {
            switch (e.keyCode) {
                case KEY_UP:
                  console.log('up!')
                  this.vy = 0
                  break;
                case KEY_LEFT:
                  this.vx = 0
                  break;
                case KEY_RIGHT:
                  this.vx = 0
                  break;
                case KEY_DOWN:
                  this.vy = 0
                  // this.shot.play()
                  break;
              }
        })
    }

}