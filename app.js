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
    } else {
        botaoSortear.disabled = true;
    }
}

function sortearAmigo() {
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (amigos.length === 0) {
        alert('A lista de amigos está vazia. Adicione pelo menos um amigo para sortear!');
        resultado.innerHTML = '<p class="erro">⚠️ Adicione amigos à lista para iniciar o sorteio! ⚠️</p>';
        return;
    }

    if (amigos.length === 1) {
        alert('É necessário adicionar pelo menos dois amigos para realizar o sorteio!');
        resultado.innerHTML = '<p class="erro">⚠️ É necessário pelo menos dois amigos para sortear! ⚠️</p>';
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

// Atualizar a lista sempre que necessário
function atualizarLista() {
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpa a lista antes de adicionar novos elementos

    // Percorre o array 'amigos' e adiciona cada nome na lista HTML
    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement('li');

        // Adicionar ícone de remoção antes do nome
        let removeImg = document.createElement('img');
        removeImg.src = 'assets/lixeira.png';
        removeImg.alt = 'Remover';
        removeImg.classList.add('remove-icon');
        li.appendChild(removeImg);  // Coloca o ícone de remoção à esquerda

        // Adiciona o nome do amigo depois do ícone
        li.appendChild(document.createTextNode(amigos[i]));

        // Evento para remover o amigo da lista
        removeImg.addEventListener('click', function() {
            removerAmigo(li);
        });

        listaAmigos.appendChild(li);
    }
}
