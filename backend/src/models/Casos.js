export class Casos{
    #id;
    #descricao_caso;

    constructor(pDescricao_caso, pId){
        this.descricao_caso = pDescricao_caso;
        this.id = pId;
    }

    get descricao_caso(){
        return this.#descricao_caso
    }
    set descricao_caso(value){
        this.#validarDescricao_caso(value);
        this.#descricao_caso = value;
    }

    get id(){
        return this.#id;
    }
    set id(value){
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


    static criarCaso(dados){
        return new Casos(dados.descricao_caso, null);
    }
    static editarCaso(dados){
        return new Casos(dados.descricao_caso, dados.id);
    }
}