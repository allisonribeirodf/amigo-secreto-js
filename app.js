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

        
        if (amigos.includes(inputAmigo.value)) {
            errorMessage.textContent = 'Esse nome já foi adicionado à lista.';
            return;
        }
       
        amigos.push(inputAmigo.value);
        
        listaAmigos.innerHTML += '<li>' + inputAmigo.value + '</li>';
     
        inputAmigo.value = '';
    }
    
    function sortearAmigo() {
        if (amigos.length < 2) {
            let errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Adicione pelo menos dois amigos para sortear!';
            return;
        }

        let resultado = document.getElementById('resultado'); 
        resultado.innerHTML = ''; 

        console.log(amigos);
        let indiceAleatorio = Math.floor(Math.random() * amigos.length);
        let amigoSorteado = amigos[indiceAleatorio];

       
        resultado.innerHTML = '<li>Amigo sorteado: 🎉' + amigoSorteado + '🎉</li>';
        
        confetti({
            particleCount: 600,
            spread: 360,
            origin: { y: 0.6 },
            colors: ['#ff0', '#0f0', '#00f', '#f00'],
            ticks: 150
        });
    }


