import { Membro } from './Membro';
import { Livro } from './Livro';
import { Emprestimo } from './Emprestimo';

export class Biblioteca {
    private membros: Membro[] = [];
    private livros: Livro[] = [];
    private emprestimos: Emprestimo[] = [];

    adicionarMembro(nome: string, endereco: string, telefone: number): Membro {
        const matricula = `${this.membros.length + 1}`;
        const membro = new Membro(matricula, nome, endereco, telefone);
        this.membros.push(membro);
        return membro;
    }

    listarMembros(): Membro[] {
        return this.membros;
    }

    adicionarLivro(titulo: string, autor: string, ISBN: string, anoPublicacao: number): Livro {
        const livro = new Livro(titulo, autor, ISBN, anoPublicacao);
        this.livros.push(livro);
        return livro;
    }

    listarLivros(): Livro[] {
        return this.livros;
    }

    listarEmprestimos(): Emprestimo[] {
        return this.emprestimos;
    }

    reservarLivro(ISBN: string, matriculaMembro: string): Emprestimo {
        const livro = this.livros.find(l => l.ISBN === ISBN);
        const membro = this.membros.find(m => m.matricula === matriculaMembro);
        if (!livro || !membro) {
            throw new Error('Livro ou Membro não encontrado');
        }
        const emprestimo = livro.reservar(membro);
        this.emprestimos.push(emprestimo);
        return emprestimo;
    }
   


    devolverLivro(ISBN: string): void {
        const emprestimo = this.emprestimos.find(e => e.ISBNLivro === ISBN && !e.encerrado);
        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado');
        }
        emprestimo.devolver();
    }

    renovarEmprestimo(ISBN: string): void {
        const emprestimo = this.emprestimos.find(e => e.ISBNLivro === ISBN && !e.encerrado);
        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado');
        }
        emprestimo.renovar();
    }

    salvar(): void {
        
    }
        

    sair(): void {
        console.log('Até mais!');
        
    }
}
