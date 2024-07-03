import { Biblioteca } from './src/Biblioteca';
import { Membro } from './src/Membro';
import { Livro } from './src/Livro';
import { Emprestimo } from './src/Emprestimo';
import promptSync from 'prompt-sync';

const prompt = promptSync();
const biblioteca = new Biblioteca();


function exibirMenuPrincipal(): void {
    console.log(`
=========================
Gerenciador de biblioteca
-------------------------
1. Livros
2. Membros
3. Listar Empréstimos
4. Reservar
5. Devolver
6. Renovar
7. Salvar
8. Sair
=========================
    `);
}

function exibirSubMenuLivros(): void {
    console.log(`
=========================
1. Adicionar Livro
2. Listar Livros
=========================
    `);
}

function exibirSubMenuMembros(): void {
    console.log(`
=========================
1. Cadastrar Membro
2. Listar Membros
=========================
    `);
}

function exibirSubMenuReservar(): void {
    console.log(`
=========================
Selecione um Membro ou digite Q para cancelar
-------------------------
`);
    listarMembros();
}

function listarMembros(): void {
    console.log('==============================');
    console.log('Listar Membros');
    console.log('==============================');
    const membros = biblioteca.listarMembros();
    if (membros.length === 0) {
        console.log('Nenhum membro cadastrado.');
    } else {
        membros.forEach((membro) => {
            console.log(`Matricula:${membro.matricula}:`);
            console.log(`Nome: ${membro.nome}`);
            console.log(`Endereço: ${membro.endereco}`);
            console.log(`Telefone: ${membro.telefone}`);
            console.log('==============================');
        });
    }
}
        
    


function adicionarLivro(): void {
    console.log('==============================');
    console.log('Adicionar Livro');
    console.log('==============================');
    const titulo = prompt('Digite o Título: ');
    const autor = prompt('Digite o Autor: ');
    const ISBN = prompt('Digite o ISBN: ');
    const anoPublicacao = parseInt(prompt('Digite o Ano de Publicação: '), 10);

    biblioteca.adicionarLivro(titulo, autor, ISBN, anoPublicacao);
    console.log('Livro adicionado com sucesso');
}

function listarLivros(): void {
    console.log('==============================');
    console.log('Listar Livros');
    console.log('==============================');
    const livros = biblioteca.listarLivros();
    if (livros.length === 0) {
        console.log('Nenhum livro cadastrado.');
    } else {
        livros.forEach((livro) => {
            console.log(`Titulo: ${livro.titulo}`);
            console.log(`Autor: ${livro.autor}`);
            console.log(`ISBN: ${livro.ISBN}`);
            console.log(`Ano de Publicação: ${livro.anoPublicacao}`);
            console.log('==============================');
        });
}
}

function cadastrarMembro(): void {
    console.log('==============================');
    console.log('Cadastrar Membro');
    console.log('==============================');
    const nome = prompt('Nome: ');
    const endereco = prompt('Endereço: ');
    const telefone = parseInt('Telefone: ');

    biblioteca.adicionarMembro(nome, endereco, telefone);
    console.log('Membro cadastrado com sucesso');
}

function listarEmprestimos(): void {
    console.log('==============================');
    console.log('Listar Empréstimos');
    console.log('==============================');
    const emprestimos = biblioteca.listarEmprestimos();
    if (emprestimos.length === 0) {
        console.log('Nenhum empréstimo registrado.');
    } else {
        emprestimos.forEach((emprestimo, index) => {
            const status = emprestimo.encerrado ? 'Fechado' : (emprestimo.atrasado ? 'Atrasado' : 'Aberto');
            const dataEmprestimo = emprestimo.dataEmprestimo.toLocaleDateString();
            const dataDevolucao = emprestimo.encerrado ? emprestimo.dataDevolucao?.toLocaleDateString() : 'N/A';
            const dataExpiracao = emprestimo.dataExpiracao.toLocaleDateString();
            console.log(`${index + 1}. ${status}! Feito em: ${dataEmprestimo}. Devolvido em: ${dataDevolucao}. Data de Expiração: ${dataExpiracao}. Membro: ${emprestimo.membro.nome}. Livro: ${emprestimo.livro.titulo}`);
        });
    }
}


function reservarLivro(): void {
    console.log('==============================');
    console.log('Reservar Livro');
    console.log('==============================');
    console.log('Selecione um Membro:');
    listarMembros();
    const opcao = prompt('Escolha uma opção ou digite Q para cancelar: ');
    if (opcao.toUpperCase() === 'Q') return;

    const indexMembro = parseInt(opcao, 10) - 1;
    if (isNaN(indexMembro) || indexMembro < 0 || indexMembro >= biblioteca.listarMembros().length) {
        console.log('Opção inválida.');
        return;
    }

    const matriculaMembro = biblioteca.listarMembros()[indexMembro].matricula;
    console.log('Selecione qual livro será reservado:');
    listarLivros();
    const opcaoLivro = prompt('Escolha uma opção ou digite Q para cancelar: ');
    if (opcaoLivro.toUpperCase() === 'Q') return;

    const indexLivro = parseInt(opcaoLivro, 10) - 1;
    if (isNaN(indexLivro) || indexLivro < 0 || indexLivro >= biblioteca.listarLivros().length) {
        console.log('Opção inválida.');
        return;
    }

    const ISBN = biblioteca.listarLivros()[indexLivro].ISBN;
    try {
        biblioteca.reservarLivro(ISBN, matriculaMembro);
        console.log('Livro reservado com sucesso');
    } catch (error) {
        console.error(error);
    }
}

function devolverLivro(): void {
    console.log('==============================');
    console.log('Devolver Livro');
    console.log('==============================');
    console.log('Selecione qual Empréstimo será devolvido:');
    listarEmprestimos();
    const opcao = prompt('Escolha uma opção ou digite Q para cancelar: ');
    if (opcao.toUpperCase() === 'Q') return;

    const indexEmprestimo = parseInt(opcao, 10) - 1;
    if (isNaN(indexEmprestimo) || indexEmprestimo < 0 || indexEmprestimo >= biblioteca.listarEmprestimos().length) {
        console.log('Opção inválida.');
        return;
    }

    const ISBN = biblioteca.listarEmprestimos()[indexEmprestimo].ISBNLivro;
    try {
        biblioteca.devolverLivro(ISBN);
        console.log('Livro devolvido com sucesso');
    } catch (error) {
        console.error(error);
    }
}

function renovarEmprestimo(): void {
    console.log('==============================');
    console.log('Renovar Empréstimo');
    console.log('==============================');
    console.log('Selecione qual Empréstimo será renovado:');
    listarEmprestimos();
    const opcao = prompt('Escolha uma opção ou digite Q para cancelar: ');
    if (opcao.toUpperCase() === 'Q') return;

    const indexEmprestimo = parseInt(opcao, 10) - 1;
    if (isNaN(indexEmprestimo) || indexEmprestimo < 0 || indexEmprestimo >= biblioteca.listarEmprestimos().length) {
        console.log('Opção inválida.');
        return;
    }

    const ISBN = biblioteca.listarEmprestimos()[indexEmprestimo].ISBNLivro;
    try {
        biblioteca.renovarEmprestimo(ISBN);
        console.log('Empréstimo renovado com sucesso');
    } catch (error) {
        console.error(error);
    }
}

function salvarDados(): void {
    console.log('==============================');
    console.log('Salvar Dados');
    console.log('==============================');
    biblioteca.salvar();
    console.log('Dados salvos com sucesso');
}

function sair(): void {
    console.log('==============================');
    console.log('Saindo do sistema...');
    console.log('==============================');
    biblioteca.sair();
}


function iniciarSistema(): void {
    let executando = true;
    while (executando) {
        exibirMenuPrincipal();
        const opcao = prompt('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                exibirSubMenuLivros();
                const opcaoLivros = prompt('Escolha uma opção: ');
                if (opcaoLivros === '1') {
                    adicionarLivro();
                } else if (opcaoLivros === '2') {
                    listarLivros();
                } else {
                    console.log('Opção inválida.');
                }
                break;
            case '2':
                exibirSubMenuMembros();
                const opcaoMembros = prompt('Escolha uma opção: ');
                if (opcaoMembros === '1') {
                    cadastrarMembro();
                } else if (opcaoMembros === '2') {
                    listarMembros();
                } else {
                    console.log('Opção inválida.');
                }
                break;
            case '3':
                listarEmprestimos();
                break;
            case '4':
                reservarLivro();
                break;
            case '5':
                devolverLivro();
                break;
            case '6':
                renovarEmprestimo();
                break;
            case '7':
                salvarDados();
                break;
            case '8':
                sair();
                executando = false;
                break;
            default:
                console.log('Opção inválida.');
        }
    }
}

// Iniciar o sistema
iniciarSistema();