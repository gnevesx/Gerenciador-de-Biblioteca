import { Pessoa } from "./Pessoa";
import { randomUUID } from "crypto";

export class Membro {
    protected _matricula: string;
    protected _nome: string;
    protected _endereco: string;
    protected _telefone: number;

    constructor(matricula: string, nome: string, endereco: string, telefone: number) {
        this._matricula = matricula;
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }

    get matricula(): string {
        return this._matricula;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get endereco(): string {
        return this._endereco;
    }

    set endereco(endereco: string) {
        this._endereco = endereco;
    }

    get telefone(): number {
        return this._telefone;
    }

    set telefone(telefone: number) {
        this._telefone = telefone;
    }
}
