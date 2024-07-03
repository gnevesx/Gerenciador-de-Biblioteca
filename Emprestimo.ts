import { Livro } from "./Livro";
import { Membro } from "./Membro";

export class Emprestimo {
  public membro: Membro;
  public livro: Livro
  public dataEmprestimo: Date;
  public dataDevolucao?: Date;
  public dataExpiracao: Date;
  public encerrado: boolean;
  public atrasado: boolean;
  public ISBNLivro: string;

  constructor(membro: Membro, livro: Livro, dataEmprestimo: Date, dataExpiracao: Date) {
      this.membro = membro;
      this.livro = livro;
      this.dataEmprestimo = dataEmprestimo;
      this.dataExpiracao = dataExpiracao;
      this.encerrado = false;
      this.atrasado = false;
      this.ISBNLivro = livro.ISBN;
  }

  devolver(): void {
    this.dataDevolucao = new Date();
    this.encerrado = true;
    this.livro.devolver();
}

renovar(): void {
    this.dataExpiracao.setMonth(this.dataExpiracao.getMonth() + 1);
}
}