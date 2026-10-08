import { validarPadraoCnj } from "../utils/padraoCnj.js";
export class Casos {
    #id;
    #descricao_caso;
    #numero_cnj;
    #data_prazo

    constructor(pDescricao_caso, pNumeroCnj, pDataPrazo, pId) {
        this.descricao_caso = pDescricao_caso;
        this.numero_cnj = pNumeroCnj;
        this.data_prazo = pDataPrazo;
        this.id = pId;
    }

    get descricao_caso() {
        return this.#descricao_caso
    }
    set descricao_caso(value) {
        this.#validarDescricao_caso(value);
        this.#descricao_caso = value;
    }

    get numero_cnj() {
        return this.#numero_cnj
    }
    set numero_cnj(value) {
        this.#numero_cnj = this.#validarNumeroCnj(value);
    }

    get data_prazo(){
        return this.#data_prazo
    }
    set data_prazo(value){
        this.#data_prazo = value
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    #validarDescricao_caso(value) {
        if (value && value.trim().length < 5 || value.trim().length > 100) {
            throw new Error('O campo descrição deve ter entre 5 e 100 caracteres')
        }
    }

    #validarId(value) {
        if (value && value < 0) {
            throw new Error('O valor do ID não corresponde ao esperado')
        }
    }

    #validarNumeroCnj(value) {
        if (value.length != 20) {
            throw new Error('O número do CNJ não corresponde ao padrão esperado');
        }
        return validarPadraoCnj(value);
    }
    #validarPrazo(value){
        if (value && value < 0) {
            throw new Error('O prazo não corresponde ao esperado')
        }
    }

    static criarCaso(dados) {
        return new Casos(dados.descricao_caso, dados.numero_cnj, dados.data_prazo, null);
    }
    static editarCaso(dados) {
        return new Casos(dados.descricao_caso, dados.numero_cnj, dados.data_prazo, dados.id);
    }
}