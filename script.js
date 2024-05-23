document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const bins = document.querySelectorAll('.bin');
    const message = document.getElementById('message');
    const scoreDisplay = document.getElementById('score');
    const finalMessageOverlay = document.getElementById('final-message-overlay');
    const finalMessage = document.getElementById('final-message');
    let score = 0;
    const pointsPerCorrect = 20; // Pontos por acerto
    let attemptCount = 0; // Contagem de tentativas (independentemente do acerto)

    // Carrega os arquivos de áudio
    const audioErro = new Audio('sound/erro.mp3');
    const audioPonto = new Audio('sound/ponto.mp3');
    const audioParabens = new Audio('soun/parabens.mp3');
    const audioTrilha = new Audio('sound/trilha.mp3');

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
            message.style.color = 'white';
            message.style.backgroundColor = 'green';
            message.style.padding = '10px';
            message.style.borderRadius = '10px';
            audioPonto.play();
        } else {
            item.classList.add('incorrect');
            message.textContent = 'Você errou';
            message.style.color = 'white';
            message.style.backgroundColor = 'red';
            message.style.padding = '10px';
            message.style.borderRadius = '10px';
            audioErro.play();
        }

        scoreDisplay.textContent = `Pontuação: ${score}`;

        // Verifica se todas as tentativas foram feitas
        if (attemptCount === items.length) {
            displayFinalMessage();
        }
    }

    function displayFinalMessage() {
        if (score >= 120) {
            finalMessage.textContent = `Parabéns, você fez ${score} pontos e atingiu a pontuação máxima! você esta demais nesse joguinho`;
            audioTrilha.play();
            audioTrilha.addEventListener('ended', () => {
                audioParabens.play();
            });
        } else if(score >= 70) {
            finalMessage.textContent = `Parabéns, você fez ${score} pontos, mas ainda pode melhorar.`;
            audioTrilha.play();
        } else {
            finalMessage.textContent = `Você fez  ${score} pontos abaixo de 70, precisa melhorar.`;
        }
        finalMessageOverlay.classList.remove('hidden');
    }
});
