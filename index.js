function adicionarInteresses(){

    const novoInteresseInput = document.getElementById('novoInteresse');
    const novoInteresse = novoInteresseInput.value.trim();

    if(novoInteresse){
        let interesses = localStorage.getItem('meus-interesses');
        interesses = interesses ? JSON.parse (interesses) : []; 

        interesses.push(novoInteresse);

        localStorage.setItem('meus-interesses', JSON.stringify(interesses));

        adicionarInteresses();
        novoInteresseInput.value = '';

    }
}




function carregarInteresses(){

    const interessesJson =  localStorage.getItem('meus-interesses');

    if (interessesJson){
        const interesses = JSON.parse(interessesJson);
    
        const elementoUl = document.querySelector('ul#interesses');

    
        elementoUl.innerHTML = '';

    
        interesses.forEach(interesses =>{

    
            const elementoLi = document.createElement('li');
    
            elementoLi.textContent = interesses;
    
            elementoUl.appendChild(elementoLi);

    });



    }
}

document.addEventListener('DOMContentLoaded', adicionarInteresses);
