document.addEventListener('DOMContentLoaded', () => {
    const suits = ['S', 'H', 'D', 'C'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = document.getElementById('deck');
    const selectedHand = document.getElementById('selectedHand');
    const submitHandButton = document.getElementById('submitHand');
    let hand = [];

    function displayDeck() {
        suits.forEach(suit => {
            values.forEach(value => {
                const cardElement = document.createElement('img');
                cardElement.src = `images/${value}${suit}.png`;
                cardElement.alt = `${value} of ${suit}`;
                cardElement.className = "card";
                cardElement.style = "width: 100px; cursor: pointer; margin: 5px;";
                cardElement.onclick = () => selectCard(value, suit, cardElement);
                deck.appendChild(cardElement);
            });
        });
    }

    function selectCard(value, suit, cardElement) {
        if (hand.length < 5 && !hand.some(card => card.value === value && card.suit === suit)) {
            hand.push({ value, suit });
            const selectedCardElement = cardElement.cloneNode(true);
            selectedHand.appendChild(selectedCardElement);
            if(hand.length === 5) {
                submitHandButton.style.display = 'block';
            }
        }
    }

    function submitHand() {
        console.log("Selected Hand:", hand);
        // Here you can add logic to evaluate the hand or move to the next phase of your game
    }

    displayDeck();
});
