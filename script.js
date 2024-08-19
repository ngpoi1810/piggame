'use strict';
//Khai báo các biến select đến các elements
let score0 = document.getElementById('score--0')
let score1 = document.getElementById('score--1')
let diceEl = document.querySelector('.dice')
//Khai báo biến điểm hiện tại của Player 1 và 2
let current0 = document.getElementById('current--0')
let current1 = document.getElementById('current--1')
//Khai báo biến button Roll Dice
let btnRoll = document.querySelector('.btn--roll')

let btnHold = document.querySelector('.btn--hold')
let btnNew = document.querySelector('.btn--new')
// đặt biến người chơi hiện tại để có thể đổi turn khi lắc xx ra 1
//Biến điểm
//Khai báo biến background để đổi màu nên qua lại
let player0 = document.querySelector('.player--0')
let player1 = document.querySelector('.player--1')
//Tạo mảng lưu trữ điểm của hai player
//Tạo biến Boolean để biết khi thắng sẽ dừng game lại
let currentStore, scorePlayer, currentPlayer, playing
// score0.textContent = 0
// score1.textContent = 0
// diceEl.classList.add('hidden')
function init() {
    scorePlayer = [0, 0]
    currentStore = 0
    currentPlayer = 0
    playing = true

    score0.textContent = currentStore
    score1.textContent = currentStore
    current0.textContent = currentStore
    current1.textContent = currentStore

    diceEl.classList.add('hidden')
    document.querySelector(`.player--0`).classList.add('player--active')
    document.querySelector(`.player--1`).classList.remove('player--active')
    document.querySelector(`.player--0`).classList.remove('player--winner')
    document.querySelector(`.player--1`).classList.remove('player--winner')
    document.getElementById(`name--0`).textContent = `PLAYER 1`
    document.getElementById(`name--1`).textContent = `PLAYER 2`
}

init()

function switchPlayer() {
    document.getElementById(`current--${currentPlayer}`).textContent = 0
    currentStore = 0
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        //Thêm biến để tao random số xúc sắc từ 1 đến 6
        /* Đầu tiền dùng hàm random để random số từ 0 -> 0.99 sau đó nhân cho 6 để random từ 0 -> nhỏ hơn 6
        nên để số random bắt đầu từ 1 -> 6 thì phải cộng thêm 1. Rồi dùng hàm Math.trunc() để lấy số nguyên đầu tiên
        */
        let dice = Math.trunc(Math.random() * 6 + 1);
        //Khi click vào button sẽ gỡ class hidden của element ảnh xúc xắc
        diceEl.classList.remove('hidden')
        //Dùng template string rồi gán biến ramdom vào src của element ảnh để khi nhấn vào sẽ hiện ra ảnh xúc xắc ramdom từ 1 - 6
        diceEl.src = `dice-${dice}.png`
        //Kiểm tra nếu khác 1 thì gán điểm cho người chơi hiện tại
        if (dice !== 1) {
            currentStore += dice; //Gán cộng dồn điểm vào currentStore
            document.getElementById(`current--${currentPlayer}`).textContent = currentStore //Hiển thị điểm vào element
        } else {
            //Ngược lại nếu bằng một sẽ đổi người chơi
            switchPlayer()

        }
    }
})
btnHold.addEventListener('click', function () {
    if (playing) {
        scorePlayer[currentPlayer] += currentStore
        document.getElementById(`score--${currentPlayer}`).textContent = scorePlayer[currentPlayer]
        if (scorePlayer[currentPlayer] >= 20) {
            playing = false
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active')
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner')
            document.getElementById(`name--${currentPlayer}`).textContent = 'you win'
        } else {
            switchPlayer()

        }
    }
})
btnNew.addEventListener('click', function () {
    init()
})