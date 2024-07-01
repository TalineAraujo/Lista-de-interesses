document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#interesses'); 
    const adicionarBtn = document.querySelector('#adicionar'); 
    const limparBtn = document.querySelector('.button-clear');
    const ul = document.querySelector('ul'); 
    const noticiaDiv = document.querySelector('.title-news-today'); 

    // Função para recuperar os interesses e atualizar a lista <ul>
    function recuperarInteresses() {
        const interesses = localStorage.getItem('meus-interesses');
        ul.innerHTML = ''; 
        if (interesses) {
            const listaInteresses = JSON.parse(interesses);
            listaInteresses.forEach(interesse => {
                const li = document.createElement('li');
                li.textContent = interesse;
                ul.appendChild(li);
            });
        }
    }

    setInterval(recuperarInteresses, 1000);

    // Evento de clique para o botão "Adicionar"
    adicionarBtn.addEventListener('click', () => {
        const novoInteresse = input.value.trim();
        if (novoInteresse) {
            let listaInteresses = localStorage.getItem('meus-interesses');
            listaInteresses = listaInteresses ? JSON.parse(listaInteresses) : [];

            listaInteresses.push(novoInteresse);

            localStorage.setItem('meus-interesses', JSON.stringify(listaInteresses));

            const li = document.createElement('li');
            li.textContent = novoInteresse;
            ul.appendChild(li);

            input.value = ''; 
        }
    });
  

    // Evento de clique para o botão "Limpar Lista"
    limparBtn.addEventListener('click', () => {
        localStorage.removeItem('meus-interesses');
        ul.innerHTML = ''; 
    });

    // Função para obter a notícia do IBGE
    async function obterNoticia() {
        try {
            const url = 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release';
            const response = await fetch(url);
            const data = await response.json();

            // Acessa o primeiro item na propriedade items
            const primeiraNoticia = data.items[0];
            const titulo = primeiraNoticia.titulo;

            // Exibe o título da notícia no elemento com a classe .title-news-today
            noticiaDiv.textContent = titulo;
        } catch (error) {
            console.error('Erro ao obter a notícia:', error);
        }
    }

    
    recuperarInteresses();
    obterNoticia();

    
    
});
