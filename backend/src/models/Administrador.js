export class Administrador{
    #id;
    #nome_admin;
    #email_admin;
    #senha_admin;
    #data_cad;

    constructor(pNome_admin, pEmail_admin, pSenha_admin, pId){
        this.#nome_admin = pNome_admin;
        this.#email_admin = pEmail_admin;
        this.#senha_admin = pSenha_admin;
        this.#id = pId;
        this.#data_cad = new Date();
    }

    get id(){
        return this.#id;
    }
    get nome_admin(){
        return this.#nome_admin;
    }
    get email_admin(){
        return this.#email_admin;
    }
    get senha_admin(){
        return this.#senha_admin;
    }

    //Setters
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }
    set nome_admin(value){
        this.#validarNome(value);
        this.#nome_admin = value;
    }
    set email_admin(value){
        this.#validarEmail(value);
        this.#email_admin = value;
    }
    set senha_admin(value){
        this.#validarSenha(value);
        this.#senha_admin = value;
    }


    #validarId(value){
        if(value && value < 0){
            throw new Error('ID inválido');
        }
    }
    #validarNome(value){
        if(!value || value.trim().length < 3 || value.trim().length > 100){
            throw new Error('Nome do administrador é obrigatório e deve conter entre 3 e 100 caracteres');
        }
    }
    #validarEmail(value){
        if(!value || this.#email_admin(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            throw new Error('Email do administrador é obrigatório e deve ser válido');
        }
    }
    #validarSenha(value){
        if(!value || value.length != 7){
            throw new Error('Senha do administrador é obrigatória e deve conter exatamente 7 caracteres');
        }
    }

    static criar(nome_admin, email_admin, senha_admin, id){
        return new Administrador(
            nome_admin, 
            email_admin, 
            senha_admin, 
            id
        );
    }
    static 
}