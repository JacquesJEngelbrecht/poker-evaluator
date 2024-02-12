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

        const values = hand.map(card => card.value);
        const suits = hand.map(card => card.suit);

        const countOccurrences = (arr) => arr.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});

        const hasFlush = () => new Set(suits).size === 1;
        const hasStraight = () => {
            const ranks = values.map(value => "A23456789TJQKA".indexOf(value)).sort((a, b) => a - b);
            const uniqueRanks = [...new Set(ranks)];

            let isStraight = uniqueRanks.every((rank, index, arr) => index === 0 || rank - arr[index - 1] === 1);

            if (!isStraight && values.includes('A') && values.includes('2')) {
                const lowAceRanks = values.map(value => "123456789TJQKA".indexOf(value)).sort((a, b) => a - b);
                const lowAceUniqueRanks = [...new Set(lowAceRanks)];
                isStraight = lowAceUniqueRanks.slice(0, 5).every((rank, index, arr) => index === 0 || rank - arr[index - 1] === 1);
            }
            return isStraight;
        };


        const valuesCount = countOccurrences(values);
        const duplicates = Object.values(valuesCount).sort((a, b) => b - a);


        if (hasFlush() && hasStraight()) {
            resultMessage = "Straight Flush";
        } else if (duplicates[0] === 4) {
            resultMessage = "Four of a Kind";
        } else if (duplicates[0] === 3 && duplicates[1] === 2) {
            resultMessage = "Full House";
        } else if (hasFlush()) {
            resultMessage = "Flush";
        } else if (hasStraight()) {
            resultMessage = "Straight";
        } else if (duplicates[0] === 3) {
            resultMessage = "Three of a Kind";
        } else if (duplicates[0] === 2 && duplicates[1] === 2) {
            resultMessage = "Two Pair";
        } else if (duplicates[0] === 2) {
            resultMessage = "One Pair";
        } else {
            resultMessage = "High Card";
        }

        displayResult(resultMessage);
    }

    displayDeck();

    function displayResult(result) {
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.textContent = `Hand Result: ${result}`;
        } else {
            console.log("Result element not found");
        }
    }

    submitHandButton.addEventListener('click', submitHand);
});
