export class Advogado {
    #id;
    #nome_advogado;
    #email_advogado;
    #senha_advogado;
    #status_advogado;
    #cpf_advogado;
    #registro_oab;
    #telefone_advogado;
    #uf_aob;

    constructor(pNome_advogado, pEmail_advogado, pSenha_advogado, pId, pStatus_advogado, pCpf_advogado, pRegistro_oab, pTelefone_advogado, pUf_oab) {
        this.#nome_advogado = pNome_advogado;
        this.#email_advogado = pEmail_advogado;
        this.#senha_advogado = pSenha_advogado;
        this.#id = pId;
        this.#status_advogado = pStatus_advogado;
        this.#cpf_advogado = pCpf_advogado;
        this.#registro_oab = pRegistro_oab;
        this.#telefone_advogado = pTelefone_advogado;
        this.#uf_aob = pUf_oab;
    }

    get id() {
        return this.#id;
    }

    get nome_advogado() {
        return this.#nome_advogado;
    }

    get email_advogado() {
        return this.#email_advogado;
    }

    get senha_advogado() {
        return this.#senha_advogado;
    }

    get status_advogado() {
        return this.#status_advogado;
    }

    get cpf_advogado() {
        return this.#cpf_advogado;
    }

    get registro_oab() {
        return this.#registro_oab;
    }

    get telefone_advogado() {
        return this.#telefone_advogado;
    }

    get uf_oab() {
        return this.#uf_aob;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    set nome_advogado(value) {
        this.#validarNome(value);
        this.#nome_advogado = value;
    }

    set email_advogado(value) {
        this.#validarEmail(value);
        this.#email_advogado = value;
    }

    set senha_advogado(value) {
        this.#validarSenha(value);
        this.#senha_advogado = value;
    }

    set status_advogado(value) {
        this.#validarStatus(value);
        this.#status_advogado = value;
    }

    set cpf_advogado(value) {
        this.#validarCPF(value);
        this.#cpf_advogado = value;
    }

    set registro_oab(value) {
        this.#validarOAB(value);
        this.#registro_oab = value;
    }

    set telefone_advogado(value) {
        this.#validarTelefone(value);
        this.#telefone_advogado = value;
    }

    set uf_oab(value) {
        this.#validarUF(value);
        this.#uf_aob = value;
    }

    #validarId(value) {
        if (value && value < 0) {
            throw new Error('ID inválido');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('Nome do administrador é obrigatório e deve conter entre 3 e 100 caracteres');
        }
    }

    #validarEmail(value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value || !regex.test(value)) {
            throw new Error('Email do advogado é obrigatório e deve ser válido');
        }
    }

    #validarSenha(value) {
        if (!value || value.length != 7) {
            throw new Error('Senha do administrador é obrigatória e deve conter exatamente 7 caracteres');
        }
    }

    #validarStatus(value) {
        if (value !== 'ativo' && value !== 'inativo') {
            throw new Error('Status do advogado deve ser "ativo" ou "inativo"');
        }
    }

    #validarCPF(cpf) {

        cpf = cpf.replace(/[^\d]/g, '');

        if (cpf.length !== 11) {
            return false;
        }

        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let soma = 0;

        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.charAt(9))) {
            return false;
        }

        soma = 0;

        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.charAt(10))) {
            return false;
        }

        return true;
    }

    #validarOAB(oab) {
        const regex = /^\d{1,6}[\/-]?[A-Z]{2}$/;

        return regex.test(oab.toUpperCase());
    }

    #validarTelefone(telefone) {

        const apenasNumeros = telefone.replace(/\D/g, '');

        if (!(apenasNumeros.length >= 10 && apenasNumeros.length <= 11)) {
            return false;
        }

        return true;
    }

    #validarUF(uf) {
        const regex = /^[A-Z]{2}$/i;

        return regex.test(uf);
    }

    static criar(nome_advogado, email_advogado, senha_advogado, id, status_advogado, cpf_advogado, registro_oab, telefone_advogado, uf_oab) {

        return new Advogado(
            nome_advogado,
            email_advogado,
            senha_advogado,
            id,
            status_advogado,
            cpf_advogado,
            registro_oab,
            telefone_advogado,
            uf_oab
        );
    }
}