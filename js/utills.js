// EVENT LISTENERS

const gameTimeBtns = document.querySelectorAll('.game-time-btns')
    gameTimeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            let btnId = btn.getAttribute('id')
            gMinutes = btnId
            setTime(gMinutes)
            console.log('click');
        })
    })


//ELEMENTS
const elGameTimeWhite = document.querySelector('.game-time.p-white')
const elGameTimeBlack = document.querySelector('.game-time.p-black')
const elWinnerMsg = document.querySelector('.winner-msg')
const elGameOverModal = document.querySelector('.game-over-modal')
const elEatenPiecesBlack = document.querySelector('.eaten-pieces-black')
const elEatenPiecesWhite = document.querySelector('.eaten-pieces-white')