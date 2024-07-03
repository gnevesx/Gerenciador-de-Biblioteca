import { Emprestimo } from "./Emprestimo";
import { Membro } from "./Membro";
export class Livro {
    public titulo: string;
    public autor: string;
    public ISBN: string;
    public anoPublicacao: number;
    public reservado: boolean;

    constructor(titulo: string, autor: string, ISBN: string, anoPublicacao: number) {
        this.ISBN = ISBN;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.reservado = false;
    }

    reservar(membro: Membro): Emprestimo {
        if (this.reservado) {
            throw new Error('Livro já está reservado');
        }
        this.reservado = true;
        const dataEmprestimo = new Date();
        const dataExpiracao = new Date();
        dataExpiracao.setMonth(dataExpiracao.getMonth() + 1);
        return new Emprestimo(membro, this, dataEmprestimo, dataExpiracao);
    }

    devolver(): void {
        this.reservado = false;
    }
}