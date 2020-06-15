class Game {
    constructor(ctx, wasteNum, time) {
      this.ctx = ctx;
      this.intervalId = null;
      this.tick = 0
  
      this.bg = new Board(ctx)
      this.nucleus = new Nucleus(ctx)
      this.players = []
      this.enemiesOne = new ChemicalPeople(ctx)
      this.enemiesTwo = new SpiderRad(ctx)
      this.waste = new Waste(ctx)
      this.wastedEl = []
      this.wasteNum = wasteNum
      this.walls = []
      this.enemiesOneArr = []
      this.enemiesTwoArr = []
      this.skullsArr = []
      this.powerUpsArr = []


      this.score = 0
      this.time = time
      this.stillAlive = 2

      this.round = 0
      
      this._addWaste(this.waste, this.wasteNum)
    }
  
    start() {

      this.intervalId = setInterval(() => {
        this._clear()
        this._draw()
        this._move()
        this._logicWinOrLose()
        this._addWalls()
        this._checkCollisions()
        this._pickOrStepWaste()
        this._wasteInNucleus()
        this._addEnemies()
        this._addPowerUps()
  
      }, 1000 / 60)
    }
  
    _clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

  
    _draw() {
      if (this.tick++ > 2000) {
        this.tick = 0
      }
      this.bg.draw()
      this.walls.forEach(el => el.draw())
      this.wastedEl.forEach(el => el.draw())
      this.enemiesOneArr.forEach(el => el.draw())
      this.enemiesTwoArr.forEach(el => el.draw())
      this.powerUpsArr.forEach(el => el.draw())
      this.players.forEach(player => {
        if (player.itsAlive) {
          setTimeout(player.draw(), 5000)
        } else { null }
      })
      this.nucleus.draw()
      
    }

    
  
    _move() {
      this.players.forEach(player => player.health > 0 ? player.move() : null)
      this.enemiesOneArr.forEach(el => el.move())
      this.enemiesTwoArr.forEach(el => el.move())
    }

    _addWalls() {
      const wallTop = new Wall(ctx, 0, 0, 800, 50, 'top')
      const wallLeft = new Wall(ctx, 0, 0, 50, 800, 'left')
      const wallBottom = new Wall(ctx, 0, 750, 800, 50, 'bottom')
      const wallRightTop = new Wall(ctx, 750, 0, 50, 300, 'right')
      const wallRightBottom = new Wall (ctx, 750, 500, 50, 450, 'right')
      this.walls.push(wallTop)
      this.walls.push(wallBottom)
      this.walls.push(wallLeft)
      this.walls.push(wallRightTop)
      this.walls.push(wallRightBottom)
    }
  
    
    _addOnePlayer() {
      this.players.push(new Player(ctx, 1))
      // const healthRounded1 = Math.floor(this.players[0].health)
      // healthOne.value =  `${healthRounded1}`
    }

    _addTwoPlayers() {
      this.players.push(new Player(ctx,1), new Player2(ctx, 2))
      // const healthRounded1 = Math.floor(this.players[0].health)
      // const healthRounded2 = Math.floor(this.players[1].health)
      // healthOne.value =  `${healthRounded1}`
      // healthTwo.value =  `${healthRounded2}`

    }

    _addWaste(waste,len) {
      for (let i = 0; i < len; i++) {
        this.wastedEl.push(new Waste(ctx))
      }
      wasteCounter.innerHTML = `WASTE REMAINS   X    ${this.wastedEl.length}`
      return this.wastedEl
    }

    _addEnemies() {
      if (this.tick % 350 === 0) {
        const newEnemy = new ChemicalPeople(this.ctx)
        this.enemiesOneArr.push(newEnemy)
        zombieMp3.play()
      }

      if (this.tick % 250 === 0) {
        const newEnemy2 = new SpiderRad(this.ctx)
        this.enemiesTwoArr.push(newEnemy2)
        spiderMp3.play()
      }

      this.enemiesOneArr.forEach(el => {
        if (el.y > 1000) {
          const index = this.enemiesOneArr.indexOf(el)
          if (index > -1) { this.enemiesOneArr.splice(index, 1) }
        }
      })

      this.enemiesTwoArr.forEach(el => {
        if (el.x < 0) {
          const index = this.enemiesTwoArr.indexOf(el)
          if (index > -1) { this.enemiesTwoArr.splice(index, 1) }

        }
      })
    }

    _addPowerUps() {
      
      if (this.tick % 1000 === 0) {
        const lifeUpItem = new LifeUp(ctx)
        this.powerUpsArr.push(lifeUpItem)
        powerUpMp3.play()
      }

      if (this.tick % 2000 === 0) {
        const lifeUpBigItem = new LifeUpBig(ctx)
        this.powerUpsArr.push(lifeUpBigItem)
        powerUpMp3.play()
      }

      if (this.tick % 800 === 0) {
        const coinItem = new Coins(ctx)
        this.powerUpsArr.push(coinItem)
        powerUpMp3.play()
      }

      if (this.tick % 800 === 0) {
        const speedItem = new SpeedUp(ctx)
        this.powerUpsArr.push(speedItem)
        powerUpMp3.play()
        this.tick = 0
        console.log(this.tick)

      }
    }

    _stopPlayer(player, wall) {
 
        switch(wall.side) {
          case 'top':
            player.y = wall.h 
            this.vy = 0
            break;
          case 'bottom':
            player.y = this.ctx.canvas.height - wall.h - player.h
            this.vy = 0
            break;
          case 'left':
            player.x = wall.w
            this.xy = 0
            break;
          case 'right':
            player.x = this.ctx.canvas.width - wall.w - player.w
            break;
        }

      
    }

    _checkCollisions() {
      this.players.some(player => {
        this.walls.forEach(wall => {
          if (wall.collide(player).colission) {
            this._stopPlayer(player, wall)
          }
        })
        if (player.x + player.w > this.ctx.canvas.width) {
          player.x = this.ctx.canvas.width - player.w
        }
      })
      this.players.some(player => {
        return this.enemiesOneArr.some(el => {
          if (el.collide(player)) {
            player.health -= 0.5
            ouchMp3.play()
            const healthProgress = Array.from(HEALTHS)
            healthProgress[player.playerNum -1].value = player.health
            
            return true
          }
        })
      })
      this.players.some(player => {
        return this.enemiesTwoArr.some(el => {
          if (el.collide(player)) {
            player.health -= 0.5
            ouchMp3.play()
            const healthProgress = Array.from(HEALTHS)
            healthProgress[player.playerNum -1].value = player.health
            
            return true
          }
        })
      })
      this.players.forEach(player => {
        this.powerUpsArr.forEach(powerUp =>{
          if(powerUp.collide(player)) {
            powerUp.power(player)
            coinsMp3.play()
            const healthProgress = Array.from(HEALTHS)
            healthProgress[player.playerNum -1].value = player.health
            const scoresParagraphs = Array.from(SCORES)
            scoresParagraphs[player.playerNum -1].innerHTML = player.score
            const index = this.powerUpsArr.indexOf(powerUp)
            if (index > -1) {this.powerUpsArr.splice(index, 1)}
          }
        })
      })
    }

   
    
    _pickOrStepWaste() {
      
      this.players.forEach(player => {
        this.wastedEl.forEach(el => {
          if (el.collide(player)) {
            if(!player.takeWaste) {
              const index = this.wastedEl.indexOf(el)
              if (index > -1) { this.wastedEl.splice(index, 1) }
              digMp3.play()
              player.takeWaste = true
            }

            if (player.takeWaste && (player.playerNum === 1)) {
              player.img.src = './img/Spritesheet_P1_Con.png'
              
            }
            if (player.takeWaste && (player.playerNum === 2)) {
              player.img.src = './img/Spritesheet_P2_Con.png'
              
            }
  
            if (player.takeWaste) {
              player.health -= 0.1
              geigerMp3.play()
              
              const healthProgress = Array.from(HEALTHS)
              healthProgress[player.playerNum -1].value = player.health
              return true
              
            }
          }
        })
      })
    }

      
    _wasteInNucleus() {
      
      this.players.forEach(player => {
        if (this.nucleus.collide(player) && player.takeWaste) {
          player.score += 50
          wasteCounter.innerHTML = `WASTE REMAINS   X    ${this.wastedEl.length}`
          const scoresParagraphs = Array.from(SCORES)
          scoresParagraphs[player.playerNum -1].innerHTML = player.score
          player.takeWaste = false
          player.wasteClear += 1
          if (!player.takeWaste && (player.playerNum === 1)) {
            player.img.src = './img/Spritesheet_P1_Sin.png'
            leaveWasteMp3.play()
          }
          if (!player.takeWaste && (player.playerNum === 2)) {
            player.img.src = './img/Spritesheet_P2_Sin.png'
            leaveWasteMp3.play()
          }
          if (!this.wastedEl.length) {
            returnSafeMp3.play()
          }
          return true
        }
      })
      
    }

    gameTimer() {
      
      let countdownTimer = setInterval(() => {
        this.time -= 1
        document.querySelector('#timer').textContent = this.time
        if(this.time <= 0) {
          clearInterval(countdownTimer)
        }  

        if (this.players.length === 1) {
          if ( healthOne.value <= 0) {
            clearInterval(countdownTimer)
            setInterval(this._gameOver(), 5000)
          }
         
        }

        if ( this.players.length === 2) {
          if((healthOne.value <= 0 && healthTwo.value <= 0)) {
            clearInterval(countdownTimer)
            setInterval(this._gameOver(), 5000)
          }
        }

        this.players.some(player => {

          const safeZone = (player.x + player.w ) >= this.ctx.canvas.width
          if( !this.wastedEl.length && safeZone) {
            clearInterval(countdownTimer)
          }
        })

        if (this.time === 15) {
          const timeOut = setInterval(() => {
            redAlert.classList.toggle('red-alert')
          }, 1000)

          setTimeout(() => {
            clearInterval(timeOut)
          },15000);
          returnSafeMp3.play()
          return timeOut
          
        }

        if (this.time === 0) {
         
          this._gameOver()
        }
       
      },1000);
        
    }

    _logicWinOrLose() {
      
      this.players.some(player => {
        const safeZone = (player.x + player.w ) >= this.ctx.canvas.width

        if (player.health <= 0)  {
          
          setInterval(() => {
            player.itsAlive = false
            }, 3000)
        }

        if(!this.wastedEl.length && safeZone && !player.takeWaste) {
          console.log('enter')
          this._gameOver()
          this.time = this.time
        }  
      })
     
    }
  
    _gameOver() {
      
      const gameOver = document.querySelector('#game-over')
      const winLose = document.querySelector('#win-lose')
      const p1Score = document.querySelector('#p1-score')
      const wasteP1Done = document.querySelector('#waste-p1-done')
      const p2Score = document.querySelector('#p2-score')
      const wasteP2Done = document.querySelector('#waste-p2-done')
      const finalWaste = document.querySelector('#waste-final')
      const hiddenP2 = document.querySelector('.p2')
      const restButton = document.querySelector('.restart')

      winLose.innerText = 'GAME OVER'
      gameOverMp3.play()
      bgMusic.pause()

      if (this.players.length === 1) {
        p1Score.innerText = `Player 1 Score: ${this.players[0].score}`
        wasteP1Done.innerText = `wastes removed: ${this.players[0].wasteClear}`
        finalWaste.innerHTML =  `remains ${this.wastedEl.length} wastes in MASHA`
        restButton.addEventListener('click', () => {
          window.location.reload()
        })
        gameOver.classList.toggle('is-hidden')
        
        this.players.some(player => {
          const safeZone = (player.x + player.w ) >= this.ctx.canvas.width
  
          if(!this.wastedEl.length && safeZone && !player.takeWaste) {
            P1WinMp3.play()
            winLose.innerText = `YOU WIN!!!`
            document.querySelector('#timer').textContent = '0'
          }  
    
        })
      }

      if (this.players.length === 2) {
        p1Score.innerText = `Player 1 Score: ${this.players[0].score}`
        wasteP1Done.innerText = `wastes removed: ${this.players[0].wasteClear}`
        p2Score.innerText = `Player 2 Score: ${this.players[1].score}`
        wasteP2Done.innerText = `wastes removed: ${this.players[1].wasteClear}`
        finalWaste.innerHTML =  `remains ${this.wastedEl.length} wastes in MASHA`
        restButton.addEventListener('click', () => {
          window.location.reload()
        })
        gameOver.classList.toggle('is-hidden')
        hiddenP2.classList.toggle('is-hidden')
        

        const logicWin1 = (this.players[0].score) > (this.players[1].score)
        const logicWin2 = (this.players[1].score) > (this.players[0].score)
        const logicDraw = (this.players[0].score) === (this.players[1].score)


        if( this.wastedEl && this.time === 0) {
          winLose.innerText = `GAME OVER`
          
        } else if(logicWin2) {
          P2WinMp3.play()
          winLose.innerText = `PLAYER 2 WIN!!!` 
          document.querySelector('#timer').textContent = '0'
        } else if (logicDraw){ 
          drawMp3.play()
          winLose.innerText = `DRAW!!!`
          document.querySelector('#timer').textContent = '0'
        } else if (logicWin1) {
          P1WinMp3.play()
          winLose.innerText = `PLAYER 1 WIN!!!`
          document.querySelector('#timer').textContent = '0'
        }
    
      }

       clearInterval(this.intervalId)
    }
  }