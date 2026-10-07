export class Tarefas{
    #id;
    #id_etapa;
    #tarefa;
    #descricao_tarefa;
    #status;

    constructor(pEtapaId, pTarefa, pDescricaoTarefa, pStatus, pId){
        this.id_etapa = pEtapaId;
        this.tarefa = pTarefa;
        this.descricao_tarefa = pDescricaoTarefa;
        this.#status = pStatus;
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
        this.#validarDescricao_tarefa(value)
        this.#descricao_tarefa = value
    }

    get status(){
        return this.#status
    }
    set status(value){
        this.#validarStatus(value)
        this.#status = value
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
    #validarDescricao_tarefa(value){
        if (!value || value.trim().length < 5 || value.trim().length > 250) {
            throw new Error('O campo descrição deve ter entre 5 e 250 caracteres');
        }
    }

    #validarStatus(value){
        const statusValidos = ['nao_iniciado', 'em_andamento', 'concluido'];

        if (!statusValidos.includes(value)) {
            throw new Error(`Status inválido. Os status válidos são: ${statusValidos.join(', ')}`);
        }
    }


    static criar(dados){
        return new Tarefas(dados.id_etapa, dados.tarefa, dados.descricao_tarefa, dados.status, null);
    }

    static editar(dados){
        return new Tarefas(dados.id_etapa, dados.tarefa, dados.descricao_tarefa, dados.status, dados.id)
    }
}