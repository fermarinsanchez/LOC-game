class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.intervalId = null;
      this.tick = 0
  
      this.bg = new Board(ctx)
      this.player = new Player(ctx)
      this.waste = new Waste(ctx)
      this.wastedEl = []
      this.boardLimits = []

      this._addWaste(this.waste, 20)
    }
  
    start() {
      this.intervalId = setInterval(() => {
        this._clear()
        this._draw()
        this._move()
        this._addBoardLimits()
        this.checkBoardBorders()
        // this._addObstacle()
        // this._clearObstacles()
        // this._checkCollisions()
        // if (this.tick++ >= 10000) {
        //   this.tick = 0;
        // }
  
      }, 1000 / 60)
    }
    // _clearObstacles() {
    //   this.obstacles = this.obstacles.filter(b => b.isVisible())
    // }
  
    _clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    _addBoardLimits() {
      const limits = new BoardLimits(ctx)

      this.boardLimits.push(limits)
    }
  
    _draw() {
      this.bg.draw()
      this.boardLimits.forEach(el => el.draw())
      this.wastedEl.forEach(e => e.draw())
      this.player.draw()
      
    }
  
    _move() {
      this.player.move()
    //   this.helicopter.move()
    //   this.obstacles.forEach(e => e.move())
  
    }

    _addWaste(waste,len) {
      for (let i = 0; i < len; i++) {
        this.wastedEl.push(new Waste(ctx))
      }
      return this.wastedEl
    }

   

    checkBoardBorders() {

      for ( let i = 0; i < this.boardLimits.length; i ++) {
        console.log(this.boardLimits[i])
        if (this.player.y + this.player.h < this.boardLimits[i].y1) {
          
          this.player.y = this.boardLimits[i].y1 - this.h -50
        } 
      }
    }
    // _checkCollisions() {
    //   if (this.helicopter.isFloor()) this._gameOver()
    //   this.obstacles.forEach(o => {
    //     const colX = this.helicopter.x + this.helicopter.w > o.x && this.helicopter.x < o.x + o.w
    //     const colY = this.helicopter.y + this.helicopter.h > o.y && this.helicopter.y < o.y + o.h 
    //     if (colX && colY) {
    //       this._gameOver()
    //     }
    //   })
    // }
  
    // _gameOver() {
    //   clearInterval(this.intervalId)
  
    //   this.helicopter.explosion.play()
    //   this.ctx.font = "40px Comic Sans MS";
    //   this.ctx.textAlign = "center";
    //   this.ctx.fillText(
    //     "GAME OVER",
    //     this.ctx.canvas.width / 2,
    //     this.ctx.canvas.height / 2
    //   );
    // }
  }