const ctx = document.getElementById('canvas').getContext('2d')

const game = new Game(ctx)

const startbtn = document.querySelector('#start')

startbtn.addEventListener('click', () => {
    console.log('Start!!')
    game.start()
})

