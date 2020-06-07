const ctx = document.getElementById('canvas').getContext('2d')

const game = new Game(ctx)

const startbtn = document.querySelector('#start')
const takeReady = document.querySelector('#count-down > p')

startbtn.addEventListener('click', () => {
    const first = setTimeout(() =>{
        takeReady.classList.toggle('ready')
        takeReady.innerText = 'READY...'
      }, 1000)
     
    const second = setTimeout(() => {
        clearInterval(first)
        takeReady.innerText = 'STEADY...'
    }, 2000)
      
    const third = setTimeout(() => {
        clearInterval(second)
        takeReady.innerText = 'GO!!!'
    }, 3000)

    const start = setTimeout(() => {
        clearInterval(third)
        takeReady.innerText = ''
        takeReady.classList.toggle('ready')
        game.start()
        game.gameTimer()
    }, 4000)
    
})

