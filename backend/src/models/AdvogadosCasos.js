export class AdvogadosCasos {
    #id;
    #id_advogado_fk;
    #id_caso_fk;
    #cep_caso;
    #rua_caso;

    constructor(pIdAdvogado, pIdCaso, pCepCaso, pRuaCaso, pId) {
        this.id_advogado_fk = pIdAdvogado;
        this.id_caso_fk = pIdCaso;
        this.cep_caso = pCepCaso;
        this.rua_caso = pRuaCaso;
        this.id = pId;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get id_advogado_fk() {
        return this.#id_advogado_fk;
    }
    set id_advogado_fk(value) {
        this.#id_advogado_fk = value;
    }

    get id_caso_fk() {
        return this.#id_caso_fk;
    }
    set id_caso_fk(value) {
        this.#id_caso_fk = value;
    }

    get cep_caso() {
        return this.#cep_caso;
    }
    set cep_caso(value) {
        this.#cep_caso = value;
    }

    get rua_caso() {
        return this.#rua_caso;
    }
    set rua_caso(value) {
        this.#rua_caso = value;
    }

    #validarId(value) {
        if (value && value < 0) {
            throw new Error('O valor do ID não corresponde ao esperado');
        }
    }

    static criarAdvogadoCaso(dados) {
        return new AdvogadosCasos(
            dados.id_advogado_fk,
            dados.id_caso_fk,
            dados.cep_caso,
            dados.rua_caso,
            null
        );
    }

    static editarAdvogadoCaso(dados) {
        return new AdvogadosCasos(
            dados.id_advogado_fk,
            dados.id_caso_fk,
            dados.cep_caso,
            dados.rua_caso,
            dados.id
        );
    }
}