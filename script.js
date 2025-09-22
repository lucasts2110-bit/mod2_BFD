// Array para armazenar os itens da lista
let listaDeCompras = [];

// Referências aos elementos do DOM
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const listaDeItensUl = document.getElementById('listaDeItens');

// Função para adicionar um item à lista
function adicionarItem(event) {
    // Impede o envio do formulário, que recarregaria a página
    event.preventDefault();

    const novoItem = itemInput.value.trim();

    if (novoItem) {
        listaDeCompras.push(novoItem);
        renderizarLista();
        itemInput.value = ''; // Limpa o campo de entrada
        itemInput.focus(); // Coloca o foco de volta no campo
    }
}

// Função para remover um item da lista
function removerItem(indice) {
    listaDeCompras.splice(indice, 1);
    renderizarLista();
}

// Função para exibir os itens na tela
function renderizarLista() {
    // Limpa a lista antes de renderizar novamente
    listaDeItensUl.innerHTML = '';

    // Cria um item de lista (<li>) para cada item no array
    listaDeCompras.forEach((item, indice) => {
        const li = document.createElement('li');
        li.textContent = item;

        // Cria o botão de remoção para cada item
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.className = 'removerBtn';
        removerBtn.onclick = () => removerItem(indice);

        li.appendChild(removerBtn);
        listaDeItensUl.appendChild(li);
    });
}

// Adiciona os event listeners aos botões
itemForm.addEventListener('submit', adicionarItem);
limparBtn.addEventListener('click', limparLista);