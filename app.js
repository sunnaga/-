let deck_display = document.getElementById('deck')
let container = document.getElementById('container')
let my_card = document.getElementById('my-display')
let enemy_card = document.getElementById('enemy-display')
let THBTN = document.getElementById('THbutton')
let KMBTN = document.getElementById('KMbutton')
let PSBTN = document.getElementById('PSbutton')
let CHBTN = document.getElementById('CHbutton')
let ENBTN = document.getElementById('ENbutton')


let my_hand = []
let enemy_hand = []


function update_deck() {
    deck_display.innerHTML = 'ไพ่ที่ยังคงเหลือ : ' + deck.length
}
/**
 * Add cards to deck
 * just add cards to the deck
 */
let TH = ['พาย', 'เพิง', 'โค่น', 'บ่วง', 'เถา', 'ฉุด', 'ดอน', 'คบไฟ', 'งอกงาม', 'แหนง', 'เหวียง', 'เหย้า', 'ไผท', 'Thai']
let KM = ['กัน', 'กระดาน', 'กระจอก', 'ผสม', 'กระท่อม', 'สงบ', 'เจริญ', 'ขจี', 'ประจาน', 'เผด็จ', 'ถนน', 'สนุก', 'สรร', 'Khmer']
let PS = ['ปริศนา', 'ราชา', 'ชาติ', 'ศีล', 'สุข', 'สัตว์', 'ธรรม', 'วิทยา', 'ปัจจัย', 'กวี', 'นาค', 'จิต', 'ชล', 'PaliSanskrit']
let CH = ['เจ๊ก', 'เก๊ก', 'ตะหลิว', 'ตุน', 'เจ', 'เข่ง', 'เก้าอี้', 'ก๋วยเตี๋ยว', 'โต๊ะ', 'ก๊ก', 'ก๊ง', 'เก๊', 'เจ๊ง', 'Chinese']
let EN = ['ฟุตบอล', 'คอมพิวเตอร์', 'ปลั๊ก', 'เมาส์', 'คัตเอาท์', 'เกม', 'กีต้าร์', 'แท๊กซี่', 'เว็บไซต์', 'คอนเท้นต์', 'ชาร์จ', 'แก๊ส', 'แฮคเกอร์', 'English']

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

container.addEventListener('click', (event) => {
    if (event.target.classList.contains('card')) {
        event.target.classList.toggle('red-border')
    }
})

/**
 * SUBMIT CARD
 */
function submitCard(value) {

    let card_from_doc = document.querySelectorAll('.card')

    card_from_doc.forEach((card) => {
        let mycardindex = my_hand.findIndex(c => c.id == card.id)
        let enemycardindex = enemy_hand.findIndex(c => c.id == card.id)
        if (card.classList.contains('red-border') && (my_hand[mycardindex].type == value)) {
            if (card.classList.contains('me')) {
                let index = my_hand.findIndex(c => c.id == card.id)

                my_hand.splice(index, 1)
                card.remove()
                console.log(index)
                if (deck.length != 0) {
                    random_card_from_deck_for_me()
                }
            }
            else if (card.classList.contains('enemy')) {
                let index = my_hand.findIndex(c => c.id == card.id)

                enemy_hand.splice(index, 1)
                card.remove()
                console.log(index)
                if (deck.length != 0) {
                    random_card_from_deck_for_enemy()
                }
            }

        }
    })
};


// button.addEventListener('click', () => {})

// container.addEventListener('click', (event)=>{
//     if(event.target.classList.contains('card')){

//     }
// })

random_card_from_deck_for_enemy()
random_card_from_deck_for_me()

console.log(deck.length)
console.log(my_hand)