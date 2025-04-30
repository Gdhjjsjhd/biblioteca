const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const arquivo = 'livros.json';

if(!fs.existsSync(arquivo)) {
    fs.writeFileSync(arquivo, '[]')
}

const carregarLivro = () => {
    try{
        const dados = fs.readFileSync(arquivo, 'utf8');
        if (dados.trim() === '') return []
        return JSON.parse(dados)
    } catch (erro) {
        console.error('Erro ao ler ou interpretar o arquivo de livros: ', erro.message)
        return [];
    }
};

const salvarLivro = (livros) => {
    try{
        fs.writeFileSync(arquivo, JSON.stringify(livros, null, 2))
    } catch(erro) {
        console.error('Erro ao salvar as livros: ', erro.message)
    }
};

const cadastrarLivro = () => {
    rl.question('Digite o título do livro: ', (titulo) => {
        rl.question('Digite o autor do livro: ', (autor) => {
            rl.question('Digite o ano de publicação: ', (ano) => {
                const novoLivro = {
                    titulo: titulo.trim(),
                    autor: autor.trim(),
                    ano: ano.trim()
                };

                const livros = carregarLivro();
                livros.push(novoLivro);
                salvarLivro(livros);

                console.log('Livro cadastrado com sucesso!\n');
                menu();
            });
        });
    });
};

const pesquisarLivro = () => {
    rl.question('Digite o nome do livro: ', (pesquisa) => {
        const livros = carregarLivro();
        const resultado = livros.filter(livro =>
            livro.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
            livro.autor.toLowerCase().includes(pesquisa.toLowerCase()) ||
            livro.ano.includes(pesquisa)
        );

        if(resultado.length > 0){
            console.log('\nLivros encontrados: ');
            resultado.forEach((livro, index) => {
                console.log(`${index + 1}. Título: ${livro.titulo}`);
                console.log(`   Autor: ${livro.autor}`);
                console.log(`   Ano: ${livro.ano}\n`);
            }); 
        } else {
            console.log('Nenhum livro encontrado. \n');
        }
        menu();
    });
};

const listarLivros = () => {
    const livros = carregarLivro();
    
    if (livros.length === 0) {
        console.log('Não há livros cadastrados.\n');
    } else {
        console.log('\nLista de todos os livros cadastrados:');
        livros.forEach((livro, index) => {
            console.log(`${index + 1}. Título: ${livro.titulo}`);
            console.log(`   Autor: ${livro.autor}`);
            console.log(`   Ano: ${livro.ano}\n`);
        });
    }
    
    menu();
};

const removerLivro = () => {
    const livros = carregarLivro();
    
    if (livros.length === 0) {
        console.log('Não há livros cadastradas para remover.\n');
        menu();
        return;
    }

    console.log('\nLista de livros:');
    livros.forEach((livro, index) => {
        console.log(`${index + 1}. ${livro.nome}`);
    });

    rl.question('Digite o número do livro que deseja remover: ', (numero) => {
        const indice = parseInt(numero) - 1;

        if (isNaN(indice) || indice < 0 || indice >= livros.length) {
            console.log('Número inválido. Tente novamente.\n');
            removerLivro();
            return;
        }

        const livroremovido = livros.splice(indice, 1);
        salvarLivro(livros);
        console.log(`Livro "${livroremovido[0].nome}" removido com sucesso!\n`);
        menu();
    });
};

const menu = () => {
    console.log('Escolha uma opção: \n');
    console.log('1 - Cadastrar livro');
    console.log('2 - Pesquisar livro');
    console.log('3 - Listar todos os livros');  // Nova opção
    console.log('4 - Remover livro');  
    console.log('5 - Sair');           

    rl.question('Opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                cadastrarLivro();
                break;
            case '2':
                pesquisarLivro();
                break;
            case '3':  // Novo caso para listar
                listarLivros();
                break;
            case '4':  
                removerLivro();
                break;
            case '5':  // Sair agora é 5
                console.log('Obrigado por usar o sistema!');
                rl.close();
                break;
            default:
                console.log('Opção inválida. Tente novamente. \n');
                menu();
        }
    });  
};

menu();