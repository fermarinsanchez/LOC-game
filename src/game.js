class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.intervalId = null;
      this.tick = 0
  
      this.bg = new Board(ctx)
      this.player = new Player(ctx)
      this.waste = new Waste(ctx)
      this.wastedEl = []
      this.walls = []

      this._addWaste(this.waste, 20)
    }
  
    start() {
      this.intervalId = setInterval(() => {
        this._clear()
        this._draw()
        this._move()
        this._addWalls()
        this._checkCollisions()
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

    _addWalls() {
      const wallTop = new Wall(ctx, 0, 0, 800, 50, 'top')
      const wallLeft = new Wall(ctx, 0, 0, 50, 800, 'left')
      const wallBottom = new Wall(ctx, 0, 750, 800, 50, 'bottom')
      const wallRightTop = new Wall(ctx, 750, 0, 50, 350, 'right')
      const wallRightBottom = new Wall (ctx, 750, 450, 50, 450, 'right')
      this.walls.push(wallTop)
      this.walls.push(wallBottom)
      this.walls.push(wallLeft)
      this.walls.push(wallRightTop)
      this.walls.push(wallRightBottom)
    }
  
    _draw() {
      this.bg.draw()
      this.walls.forEach(el => el.draw())
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

    _stopPlayer(e) {
      switch(e.side) {
        case 'top':
          this.player.y = e.h 
          this.vy = 0
          break;
        case 'bottom':
          this.player.y = this.ctx.canvas.height - e.h - this.player.h
          this.vy = 0
          break;
        case 'left':
          this.player.x = e.w
          this.xy = 0
          break;
        case 'right':
          this.player.x = this.ctx.canvas.width - e.w - this.player.w
          break;
      }
    }

    _checkCollisions() {
      this.walls.forEach(el => {
<<<<<<< HEAD
        if (el.collide(this.player).colission) {
          this._stopPlayer(el)
=======
        if (el.collide(this.player)) {
          console.log('collide!!!')
>>>>>>> fd0570068862382bc8359b6f3bd832a3782fbb49
        }
      })
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