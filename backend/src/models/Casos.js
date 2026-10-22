import { validarPadraoCnj } from "../utils/padraoCnj.js";

export class Casos {
    #id;
    #descricao_caso;
    #numero_cnj;
    #data_prazo;

    constructor(pDescricao_caso, pNumeroCnj, pDataPrazo, pId) {
        this.descricao_caso = pDescricao_caso;
        this.numero_cnj = pNumeroCnj;
        this.#data_prazo = pDataPrazo;
        this.id = pId;
    }

    get descricao_caso() {
        return this.#descricao_caso;
    }
    
    set descricao_caso(value) {
        this.#validarDescricao_caso(value);
        this.#descricao_caso = value;
    }

    get numero_cnj() {
        return this.#numero_cnj;
    }
    
    set numero_cnj(value) {
        // O setter recebe o CNJ limpo (apenas números) retornado pelo validador
        this.#numero_cnj = this.#validarNumeroCnj(value);
        return this.#numero_cnj;
    }

    get data_prazo() {
        return this.#data_prazo
    }
    set data_prazo(value) {
        this.#data_prazo = this.#validarPrazo(value);
        return this.#data_prazo;
    }

    get id() {
        return this.#id;
    }
    
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    #validarDescricao_caso(value) {
        
        if (!value || value.trim().length < 5 || value.trim().length > 250) {
            throw new Error('O campo descrição deve ter entre 5 e 250 caracteres');
        }
    }

    #validarId(value) {
        if (value !== null && value !== undefined && value < 0) {
            throw new Error('O valor do ID não corresponde ao esperado');
        }
    }

    #validarNumeroCnj(value) {
        if (!value) {
            throw new Error('O número do CNJ é obrigatório.');
        }

        // 1. Remove tudo que não for número IMEDIATAMENTE
        const cnjLimpo = value.replace(/[^\d]/g, '');

        

        // 3. Valida se, sem a máscara, ele possui os 20 dígitos exigidos
        if (cnjLimpo.length !== 20) {
            throw new Error(`O número do CNJ deve conter exatamente 20 dígitos numéricos. Recebidos: ${cnjLimpo.length}`);
        }

        
        if (!validarPadraoCnj(value)) {
             throw new Error('O formato matemático/validador do CNJ reprovou o número.');
        }

        // 5. Retorna o CNJ limpo para salvar no banco (que espera CHAR/VARCHAR de 20)
        return cnjLimpo;
    }

    #validarPrazo(value) {
        if (value && isNaN(new Date(value).getTime())) {
            throw new Error('O prazo deve ser uma data válida');
        }
    }

    

    static criarCaso(dados) {
        return new Casos(dados.descricao_caso, dados.numero_cnj, dados.data_prazo, null);
    }
    
    static editarCaso(dados) {
        return new Casos(dados.descricao_caso, dados.numero_cnj, dados.data_prazo, dados.id);
    }
}