export class Pessoa {
    private _nome: string;
    private _endereco: string;
    private _telefone: string;

    constructor (nome: string, endereco: string, telefone: string){
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }
}