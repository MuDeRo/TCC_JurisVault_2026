export class Tarefas{
    #id;
    #id_etapa;
    #tarefa;
    #descricao_tarefa;

    constructor(pEtapaId, pTarefa, pDescricaoTarefa, pId){
        this.id_etapa = pEtapaId;
        this.tarefa = pTarefa;
        this.descricao_tarefa = pDescricaoTarefa;
        this.#id = pId;
    }

    //
    get id(){
        return this.#id
    }
    set id(value){
        this.#validarId(value)
        this.#id = value
    }

    //
    get EtapaID(){
        return this.#id_etapa
    }
    set EtapaId(value){
        this.#validarEtapaId(value)
        this.#id_etapa = value
    }

    //
    get tarefa(){
        return this.#tarefa
    }
    set tarefa(value){
        this.#tarefa = value
    }

    //
    get descricao_tarefa(){
        return this.#descricao_tarefa
    }
    set descricao_tarefa(value){
        this.#descricao_tarefa = value
    }


    #validarId(value){
        if (value && value <= 0) {
            throw new Error("Verifique o ID informado");
        }
    }
    #validarEtapaId(value){
        if (value && value <= 0) {
            throw new Error("Verifique se o ID da etapa está correto");
        }
    }


    static criar(dados){
        return new Tarefas(dados.id_etapa, dados.tarefa, dados.descricao_tarefa, null);
    }

    static editar(dados){
        return new Tarefas(dados.id_etapa, dados.tarefa, dados.descricao_tarefa, dados.id)
    }
}