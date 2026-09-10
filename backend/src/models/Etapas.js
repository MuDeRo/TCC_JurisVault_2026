export class Etapas{
    #id;
    #id_caso_fk;
    #etapa;
    #descricao;

    constructor(pCasoId, pEtapa, pDescricao, pId){
        this.id_caso_fk = pCasoId;
        this.etapa = pEtapa;
        this.descricao = pDescricao;
        this.#id = pId;
    }

    get id(){
        return this.#id
    }
    set id(value){
        this.#validarId(value)
        this.#id = value
    }

    get casoId(){
        return this.#id_caso_fk
    }
    set casoId(value){
        this.#validarCasoId(value)
        this.#id_caso_fk = value
    }

    get etapa(){
        return this.#etapa
    }
    set etapa(value){
        this.#etapa = value
    }

    get descricao(){
        return this.#descricao
    }
    set descricao(value){
        this.#descricao = value
    }
    
    #validarId(value){
        if (value && value <= 0) {
            throw new Error("Verifique o ID informado");
        }
    }
    #validarCasoId(value){
        if (value && value <= 0) {
            throw new Error("Verifique o ID do caso");
        }
    }

    static criar(dados){
        return new Etapas(dados.id_caso_fk, dados.etapa, dados.descricao, null);
    }

    static editar(dados){
        return new Etapas(dados.id_caso_fk, dados.etapa, dados.descricao, id)
    }
}