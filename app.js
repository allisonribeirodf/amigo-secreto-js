let amigos = [];

function adicionarAmigo() {
    let inputAmigo = document.getElementById('amigo');
    let listaAmigos = document.getElementById('listaAmigos');
    let errorMessage = document.getElementById('error-message');
    errorMessage.textContent = "";

    if (inputAmigo.value === '') {
        errorMessage.textContent = 'Por favor, insira um nome para adicionar à lista.';
        return;
    }
 
    if (inputAmigo.value.length < 3) {
        errorMessage.textContent = 'O nome deve ter pelo menos 3 caracteres.';
        return;
    }

    const regex = /^[a-zA-Zà-úÀ-Ú\s]*$/;
    if (!regex.test(inputAmigo.value)) {
        errorMessage.textContent = 'Por favor, insira um nome válido sem caracteres especiais.';
        return;
    }

    const nomeLowerCase = inputAmigo.value.toLowerCase();
    if (amigos.some(amigo => amigo.toLowerCase() === nomeLowerCase)) {
        errorMessage.textContent = 'Esse nome já foi adicionado à lista.';
        return;
    }

    amigos.push(inputAmigo.value);
    errorMessage.textContent = ""; // Limpa a mensagem de erro ao adicionar com sucesso

    let li = document.createElement('li');
    let removeImg = document.createElement('img');
    removeImg.src = 'assets/lixeira.png';
    removeImg.alt = 'Remover';
    removeImg.classList.add('remove-icon');

    li.appendChild(removeImg);
    li.appendChild(document.createTextNode(inputAmigo.value));

    listaAmigos.appendChild(li);
    inputAmigo.value = '';

    removeImg.addEventListener('click', function() {
        removerAmigo(li);
    });

    atualizarEstadoBotaoSortear();
}

function removerAmigo(item) {
    let listaAmigos = document.getElementById('listaAmigos');
    let nome = item.textContent.trim();
    amigos = amigos.filter(amigo => amigo !== nome);
    listaAmigos.removeChild(item);
    atualizarEstadoBotaoSortear();
}

function atualizarEstadoBotaoSortear() {
    let botaoSortear = document.querySelector('.button-draw');
    let errorMessage = document.getElementById('error-message');

    if (amigos.length >= 2) {
        botaoSortear.disabled = false;
        errorMessage.textContent = '';
    }
}

function sortearAmigo() {
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (amigos.length === 0) {
        alert('A lista de amigos está vazia. Adicione pelo dois amigos para sortear!');
        return;
    }

    if (amigos.length === 1) {
        alert('É necessário adicionar pelo menos dois amigos para realizar o sorteio!');
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceAleatorio];

    resultado.innerHTML = '<li>Amigo sorteado: 🎉 ' + amigoSorteado + ' 🎉</li>';

    confetti({
        particleCount: 600,
        spread: 360,
        origin: { y: 0.6 },
        colors: ['#ff0', '#0f0', '#00f', '#f00'],
        ticks: 150
    });
}

document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        adicionarAmigo();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    alert("Bem-vindo ao Amigo Secreto! Adicione amigos para começar o sorteio.");
    atualizarEstadoBotaoSortear();
});

function atualizarLista() {
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';

    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement('li');
        let removeImg = document.createElement('img');
        removeImg.src = 'assets/lixeira.png';
        removeImg.alt = 'Remover';
        removeImg.classList.add('remove-icon');
        li.appendChild(removeImg);
        li.appendChild(document.createTextNode(amigos[i]));

        removeImg.addEventListener('click', function() {
            removerAmigo(li);
        });

        listaAmigos.appendChild(li);
    }
}
