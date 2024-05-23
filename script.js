document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const bins = document.querySelectorAll('.bin');
    const message = document.getElementById('message');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    const pointsPerCorrect = 20; // Pontos por acerto
    let attemptCount = 0; // Contagem de tentativas (independentemente do acerto)

    items.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    bins.forEach(bin => {
        bin.addEventListener('dragover', dragOver);
        bin.addEventListener('drop', drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.dataset.type);
        event.dataTransfer.setData('id', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const itemType = event.dataTransfer.getData('text');
        const itemId = event.dataTransfer.getData('id');
        const binType = event.currentTarget.dataset.type;

        const item = document.getElementById(itemId);
        item.classList.add('disabled');
        item.setAttribute('draggable', 'false');
        attemptCount++;

        if (itemType === binType) {
            score += pointsPerCorrect;
            item.classList.add('correct');
            message.textContent = 'Parabéns você acertou';
            message.style.color = 'green';
        } else {
            item.classList.add('incorrect');
            message.textContent = 'Você errou';
            message.style.color = 'red';
        }

        scoreDisplay.textContent = `Pontuação: ${score}`;

        // Verifica se todas as tentativas foram feitas
        if (attemptCount === items.length) {
            displayFinalMessage();
        }
    }

    function displayFinalMessage() {
        if (score >= 90) {
            message.textContent = 'Parabéns, você é uma pessoa incrível!';
        } else if (score >= 70) {
            message.textContent = `Parabéns você fez ${score} pontos, está indo bem mas pode melhorar`;
        } else {
            message.textContent = `Você fez abaixo de 70 pontos, precisa melhorar`;
        }
    }
});
