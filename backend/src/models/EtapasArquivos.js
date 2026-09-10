
export class EtapasArquivos {
    #id;
    #id_etapa_fk;
    #id_arquivo_fk;

    constructor(pIdEtapa, pIdArquivo, pId) {
        this.id_etapa_fk = pIdEtapa;
        this.id_arquivo_fk = pIdArquivo;
        this.id = pId;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get id_etapa_fk() {
        return this.#id_etapa_fk;
    }
    set id_etapa_fk(value) {
        this.#validarIdEtapa(value);
        this.#id_etapa_fk = value;
    }

    get id_arquivo_fk() {
        return this.#id_arquivo_fk;
    }
    set id_arquivo_fk(value) {
        this.#validarIdArquivo(value);
        this.#id_arquivo_fk = value;
    }
    

    #validarId(value) {
        if (value && value < 0) {
            throw new Error('O valor do ID não corresponde ao esperado');
        }
    }

    #validarIdEtapa(value) {
        if (value && value < 0) {
            throw new Error('O valor do ID da etapa não corresponde ao esperado');
        }
    }

    #validarIdArquivo(value) {
        if (value && value < 0) {
            throw new Error('O valor do ID do arquivo não corresponde ao esperado');
        }
    }

    static criarEtapasArquivos(dados) {
        return new EtapasArquivos(
            dados.id_etapa_fk,
            dados.id_arquivo_fk,
            null
        );
    }

    static editarEtapasArquivos(dados) {
        return new EtapasArquivos(
            dados.id_etapa_fk,
            dados.id_arquivo_fk,
            dados.id
        );
    }
}
     