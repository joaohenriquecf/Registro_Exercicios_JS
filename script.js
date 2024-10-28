const form = document.getElementById('form-exercicios');
const tabelaExercicios = document.getElementById('tabela-exercicios').getElementsByTagName('tbody')[0];
const tipoPesquisaInput = document.getElementById('pesquisa-tipo-input'); // Novo campo para pesquisa por tipo
const dataPesquisaInput = document.getElementById('pesquisa-data-input'); // Novo campo para pesquisa por data
const pesquisarBtn = document.getElementById('pesquisar-btn');
const exercicios = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const tipo = document.getElementById('tipo').value;
    const duracao = parseInt(document.getElementById('duracao').value);
    const data = document.getElementById('data').value;

    // Validação dos campos
    if (nome === '' || tipo === '' || isNaN(duracao) || duracao <= 0 || !data) {
        console.error('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const exercicio = { nome, tipo, duracao, data };
    exercicios.push(exercicio);
    atualizarTabela(exercicios); // Atualiza a tabela com todos os exercícios
    form.reset();
});

pesquisarBtn.addEventListener('click', function() {
    const tipoPesquisa = tipoPesquisaInput.value.trim().toLowerCase(); // Obtém o valor do tipo
    const dataPesquisa = dataPesquisaInput.value; // Obtém o valor da data

    const resultados = exercicios.filter(exercicio => {
        const tipoValido = !tipoPesquisa || exercicio.tipo.toLowerCase() === tipoPesquisa; // Verifica o tipo
        const dataValida = !dataPesquisa || exercicio.data === dataPesquisa; // Verifica a data

        return tipoValido && dataValida; // Retorna true se ambos os critérios forem válidos
    });

    atualizarTabela(resultados);
});

function atualizarTabela(resultados) {
    tabelaExercicios.innerHTML = ''; // Limpa a tabela antes de adicionar novos resultados
    resultados.forEach(exercicio => {
        const row = tabelaExercicios.insertRow();
        row.insertCell(0).innerText = exercicio.nome;
        row.insertCell(1).innerText = exercicio.tipo;
        row.insertCell(2).innerText = exercicio.duracao;
        row.insertCell(3).innerText = exercicio.data;
    });
}