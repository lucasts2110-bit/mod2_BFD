// Array de produtos
let products = [];
let editingId = null;

// Mostrar página
function showPage(pageId) {
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    // Mostrar a selecionada
    document.getElementById(pageId).classList.add('active');
    document.querySelector(`[onclick="showPage('${pageId}')"]`).classList.add('active');

    if (pageId === 'lista') {
        renderTable();
    }

    if (pageId !== 'cadastro' && editingId) {
        cancelEdit();
    }
}

// Submit do formulário
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('product-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const product = {
            id: editingId || Date.now().toString(),
            nome: document.getElementById('nome').value,
            preco: parseFloat(document.getElementById('preco').value),
            categoria: document.getElementById('categoria').value,
            origem: document.getElementById('origem').value,
            lote: document.getElementById('lote').value,
            validade: document.getElementById('validade').value
        };

        if (editingId) {
            // Editar
            const index = products.findIndex(p => p.id === editingId);
            products[index] = product;
            editingId = null;
            document.getElementById('form-title').textContent = 'Cadastrar Produto';
            alert('Produto editado!');
        } else {
            // Adicionar
            products.push(product);
            alert('Produto adicionado!');
        }

        this.reset();
        showPage('lista');
    });
});

// Editar produto
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('nome').value = product.nome;
        document.getElementById('preco').value = product.preco;
        document.getElementById('categoria').value = product.categoria;
        document.getElementById('origem').value = product.origem;
        document.getElementById('lote').value = product.lote;
        document.getElementById('validade').value = product.validade;
        
        editingId = id;
        document.getElementById('form-title').textContent = 'Editar Produto';
        showPage('cadastro');
    }
}

// Excluir produto
function deleteProduct(id) {
    if (confirm('Excluir este produto?')) {
        products = products.filter(p => p.id !== id);
        renderTable();
        alert('Produto excluído!');
    }
}

// Cancelar edição
function cancelEdit() {
    document.getElementById('product-form').reset();
    editingId = null;
    document.getElementById('form-title').textContent = 'Cadastrar Produto';
}

// Renderizar tabela
function renderTable() {
    const tbody = document.getElementById('product-tbody');
    const table = document.getElementById('product-table');
    const noProducts = document.getElementById('no-products');

    tbody.innerHTML = '';

    if (products.length === 0) {
        noProducts.style.display = 'block';
        table.style.display = 'none';
    } else {
        noProducts.style.display = 'none';
        table.style.display = 'table';

        products.forEach(product => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${product.nome}</td>
                <td>R$ ${product.preco.toFixed(2)}</td>
                <td>${product.categoria}</td>
                <td>${product.origem}</td>
                <td>${product.lote}</td>
                <td>${product.validade}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editProduct('${product.id}')">Editar</button>
                    <button class="action-btn delete-btn" onclick="deleteProduct('${product.id}')">Excluir</button>
                </td>
            `;
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', renderTable);