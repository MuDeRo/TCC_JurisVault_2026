export class Arquivos {
    #id;
    #vinculo_arquivo;
    #descricao_arquivo;

    constructor(pDescricao_arquivo, pVinculo_arquivo, pId) {
        this.descricao_arquivo = pDescricao_arquivo;
        this.vinculo_arquivo = pVinculo_arquivo;
        this.id = pId;
    }

    get vinculo_arquivo(){
        return this.#vinculo_arquivo;
    }
    set vinculo_arquivo(value){
        this.#validarVinculo_arquivo(value);
        this.#vinculo_arquivo = value;
    }

    get descricao_arquivo(){
        return this.#descricao_arquivo;
    }

    set descricao_arquivo(value){
        
        this.#validarDescricao_arquivo(value);
        this.#descricao_arquivo = value;
    }

    get id(){
        return this.#id;
    }
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    #validarVinculo_arquivo(value) {
        if (value && value.trim().length < 5) {
            throw new Error('O caminho da imagem deve ter pelo menos 5 caracteres');
        }
    }

    #validarDescricao_arquivo(value) {
        if (value && value.trim().length < 5 || value.trim().length > 150) {
            throw new Error('O campo descrição deve ter entre 5 e 150 caracteres')
        }
    }

    #validarId(value) {
        if (value && value < 0) {
            throw new Error('O valor do ID não corresponde ao esperado')
        }
    }

    static criarArquivo(dados){
        return new Arquivos(dados.vinculo_arquivo, dados.descricao_arquivo, null);

    }

    static editarArquivo(dados, id){
        return new Arquivos(dados.vinculo_arquivo, dados.descricao_arquivo, id);
    }

}