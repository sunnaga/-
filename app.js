let deck_display = document.getElementById('deck')
let container = document.getElementById('container')
let my_card = document.getElementById('my-display')
let enemy_card = document.getElementById('enemy-display')
let THBTN = document.getElementById('THbutton')
let KMBTN = document.getElementById('KMbutton')
let PSBTN = document.getElementById('PSbutton')
let CHBTN = document.getElementById('CHbutton')
let ENBTN = document.getElementById('ENbutton')

let cardContainer1 = document.getElementById('card-contain1')
let cardContainer2 = document.getElementById('card-contain2')

let my_hand = []
let enemy_hand = []

let turn = true

function update_deck() {
    deck_display.innerHTML = 'ไพ่ที่ยังคงเหลือ : ' + deck.length
}
/**
 * Add cards to deck
 * just add cards to the deck
 */
let TH = ['พาย', 'โค่น', 'บ่วง', 'เถา', 'ฉุด', 'ดอน', 'งอกงาม', 'แหนง', 'เหวียง', 'เหย้า', 'Thai']
let KM = ['กระดาน', 'กระจอก', 'กระท่อม', 'สงบ', 'เจริญ', 'ขจี', 'ประจาน', 'เผด็จ', 'ถนน', 'สนุก', 'Khmer']
let PS = ['ปริศนา', 'ราชา', 'ชาติ', 'ศีล', 'ธรรม', 'วิทยา', 'ปัจจัย', 'กวี', 'นาค', 'จิต', 'PaliSanskrit']
let CH = ['เจ๊ก', 'เก๊ก', 'ตะหลิว', 'ตุน', 'เจ', 'เข่ง', 'เก้าอี้', 'ก๋วยเตี๋ยว', 'โต๊ะ', 'เจ๊ง', 'Chinese']
let EN = ['คอมพิวเตอร์', 'ปลั๊ก', 'เมาส์', 'คัตเอาท์', 'เกม', 'กีต้าร์', 'แท๊กซี่', 'เว็บไซต์', 'คอนเท้นต์', 'ชาร์จ', 'English']

let cards = [TH, KM, PS, CH, EN]

let deck = []

function Add_cards_to_Deck() {
    let j_index = -1

    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < cards[i].length - 1; j++) {
            let now = cards[i]
            let card = new Object
            j_index++

            card.id = j_index
            card.type = cards[i][cards[i].length - 1]
            card.vocab = now[j]

            deck.push(card)
        }
    }
}

Add_cards_to_Deck()
console.log(deck)

/**
 * RANDOM
 * for random card for player
*/


function random_card_from_deck_for_me() {

    while (my_hand.length != 5) {
        let random_number = Math.floor(Math.random() * deck.length)

        // ตัดการ์ดจากเด็ค

        // ผลิตการ์ด
        let card = document.createElement('p')
        card.innerHTML = deck[random_number].vocab
        card.className = 'card'
        card.id = deck[random_number].id
        my_card.append(card)
        // 
        my_hand.push(deck[random_number])
        deck.splice(random_number, 1)
        console.log(random_number)

    }
    console.log(my_hand)

    update_deck()
    delete_card()
}

// random_card_from_deck_for_me()
function random_card_from_deck_for_me() {
    while (my_hand.length < 5) {

        let random_index = Math.floor(Math.random() * deck.length);
        let drawn_card = deck.splice(random_index, 1)[0]; // 

        // Add card to hand
        my_hand.push(drawn_card);

        // Display the card
        let card = document.createElement('p');
        card.innerHTML = drawn_card.vocab;
        card.className = 'card me';
        card.id = drawn_card.id;
        my_card.appendChild(card);
    }

    update_deck();
}

function random_card_from_deck_for_enemy() {
    while (enemy_hand.length < 5) {

        let random_index = Math.floor(Math.random() * deck.length);
        let drawn_card = deck.splice(random_index, 1)[0]; // 

        // Add card to hand
        enemy_hand.push(drawn_card);

        // Display the card
        let card = document.createElement('p');
        card.innerHTML = drawn_card.vocab;
        card.className = 'card enemy';
        card.id = drawn_card.id;
        enemy_card.appendChild(card);
    }

    update_deck();
}

/**
 * SELECT CARD
 * for play
 */
let arr = []
let arr2 = []

container.addEventListener('click', (event) => {
    if (turn == true) {
        if (event.target.classList.contains('me')) {
            event.target.classList.toggle('red-border')
        }
    }
    if (turn == false) {
        if (event.target.classList.contains('enemy')) {
            event.target.classList.toggle('red-border')
        }
    }

})

/**
 * SUBMIT CARD
 */

let convertScore = {
    'Thai': 3,
    'Khmer': 3,
    'PaliSanskrit': 3,
    'Chinese': 2,
    'English': 1
}

let myScoreDisplay = document.getElementById('my_score')
let enemyScoreDisplay = document.getElementById('enemy_score')

let player1_Score = 0
let player2_Score = 0


function submitCard(value) {
    let card_from_doc = document.querySelectorAll('.card')

    arr = []
    arr2 = []

    card_from_doc.forEach((card) => {
        let mycardindex = my_hand.findIndex(c => c.id == card.id)
        let enemycardindex = enemy_hand.findIndex(c => c.id == card.id)

        if (card.classList.contains('me') && card.classList.contains('red-border')) {
            arr.push(my_hand[mycardindex].type)
        }
        if (card.classList.contains('red-border') && card.classList.contains('enemy')) {
            arr2.push(enemy_hand[enemycardindex].type)
        }


        console.log(arr + " is ARRAY")
        /**
         * จะทำarrayไว้ ลูปใส่ใบที่เลือกลง arr แล้วเอาไปเช๊ค
         * 
         */

    });
    // เช๊คว่าเหมือนกันไหม
    console.log(arr)
    console.log(arr2)

    if (arr.every(element => element === arr[0])) {
        card_from_doc.forEach((card) => {
            let mycardindex = my_hand.findIndex(c => c.id == card.id)

            if (card.classList.contains('red-border')) {
                if (card.classList.contains('me') && my_hand[mycardindex].type == value) {

                    player1_Score += convertScore[value]
                    my_hand.splice(mycardindex, 1)
                    card.remove()
                    if (deck.length != 0) {
                        random_card_from_deck_for_me()
                    }
                }
                else if (card.classList.contains('me') && my_hand[mycardindex].type != value) {
                    card.classList.remove('red-border')
                    hurtBlink()
                }
            }
        })
    }
    else if (arr.some(element => element !== arr[0])) {
        card_from_doc.forEach((card) => {
            card.classList.remove('red-border')
            hurtBlink()
        })
    }
    // else if(arr.length == 1){
    //     card_from_doc.forEach((card) => {
    //         card.classList.remove('red-border')
    //         hurtBlink()
    //     })
    // }
        
    
    //********************************************* */
    if (arr2.every(element => element === arr2[0])) {
        card_from_doc.forEach((card) => {
            let enemycardindex = enemy_hand.findIndex(c => c.id == card.id)

            if (card.classList.contains('red-border')) {

                if (card.classList.contains('enemy') && enemy_hand[enemycardindex].type == value) {

                    player2_Score += convertScore[value]
                    enemy_hand.splice(enemycardindex, 1)
                    card.remove()
                    if (deck.length != 0) {
                        random_card_from_deck_for_enemy()
                    }
                }
                else if (card.classList.contains('enemy') && enemy_hand[enemycardindex].type != value) {
                    card.classList.remove('red-border')
                    hurtBlink()
                }

            }
        })
    }
    else if (arr2.some(element => element !== arr2[0])) {
        card_from_doc.forEach((card) => {
            card.classList.remove('red-border')
            hurtBlink()
        })
    }




    myScoreDisplay.innerHTML = 'คะแนน : ' + player1_Score
    enemyScoreDisplay.innerHTML = 'คะแนน : ' + player2_Score

    turn = !turn
    swapTurn()
};
let card_from_doc_out = document.querySelectorAll('.card')
function swapTurn() {
    // card_from_doc_out.forEach((card)=>{
    //     card.classList.remove('red-border')
    //     alert(card.innerHTML)
    // })
    if (turn == true) {
        cardContainer2.classList.remove('turn')
        cardContainer1.classList.add('turn')
    }
    else if (turn == false) {
        cardContainer1.classList.remove('turn')
        cardContainer2.classList.add('turn')
    }
}

let body = document.querySelector('body')

function hurtBlink() {

    body.classList.add('hurt')
    setTimeout(() => {
        body.classList.remove('hurt')
    }, 100)

}

swapTurn()
random_card_from_deck_for_enemy()
random_card_from_deck_for_me()

console.log(deck.length)
console.log(my_hand)