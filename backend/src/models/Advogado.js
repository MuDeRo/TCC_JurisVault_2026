export class Advogado {
    #id;
    #nome_advogado;
    #email_advogado;
    #senha_advogado;
    #status_advogado;
    #cpf_advogado;
    #registro_oab;
    #telefone_advogado;
    #uf_oab;

    constructor(pNome_advogado, pEmail_advogado, pSenha_advogado, pId, pStatus_advogado, pCpf_advogado, pRegistro_oab, pTelefone_advogado, pUf_oab) {
        // Removida a hashtag '#' para forçar a passagem pelos Setters!
        this.id = pId;
        this.nome_advogado = pNome_advogado;
        this.email_advogado = pEmail_advogado;
        this.senha_advogado = pSenha_advogado;
        this.status_advogado = pStatus_advogado;
        this.cpf_advogado = pCpf_advogado;
        this.registro_oab = pRegistro_oab;
        this.telefone_advogado = pTelefone_advogado;
        this.uf_oab = pUf_oab;
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
        return this.#uf_oab; 
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
        // Ignora a validação de 7 caracteres se for a hash gigante do bcrypt
        if (value && value.length > 20) {
            this.#senha_advogado = value;
        } else {
            this.#validarSenha(value);
            this.#senha_advogado = value;
        }
    }

    set status_advogado(value) {
        this.#validarStatus(value);
        this.#status_advogado = value;
    }

    set cpf_advogado(value) {
        // O setter agora recebe o valor limpo devolvido pelo validador
        this.#cpf_advogado = this.#validarCPF(value);
    }

    set registro_oab(value) {
        this.#validarOAB(value);
        this.#registro_oab = value.toUpperCase();
    }

    set telefone_advogado(value) {
        // O setter agora recebe o valor limpo devolvido pelo validador
        this.#telefone_advogado = this.#validarTelefone(value);
    }

    set uf_oab(value) {
        this.#validarUF(value);
        this.#uf_oab = value.toUpperCase();
    }

    #validarId(value) {
        if (value !== null && value !== undefined && value < 0) {
            throw new Error('ID inválido');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('Nome do advogado é obrigatório e deve conter entre 3 e 100 caracteres');
        }
    }

    #validarEmail(value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !regex.test(value)) {
            throw new Error('Email do advogado é obrigatório e deve ser válido');
        }
    }

    #validarSenha(value) {
        // Caso a senha já chegue como hash, o tamanho será maior que 7. Ajustado para tratar a senha original.
        if (!value || value.length < 7) {
            throw new Error('Senha do advogado é obrigatória e deve conter no mínimo 7 caracteres');
        }
    }

    #validarStatus(value) {
        const statusValidos = ['ativo', 'inativo', 'validando', 'aprovado', 'negado'];
        if (!statusValidos.includes(value.toLowerCase())) {
            throw new Error(`Status inválido. Permitidos: ${statusValidos.join(', ')}`);
        }
    }

    #validarCPF(value) {
        if (!value) throw new Error('CPF é obrigatório');
        
        let cpf = value.replace(/[^\d]/g, ''); 

        if (cpf.length !== 11) throw new Error('CPF deve ter 11 dígitos numéricos');
        if (/^(\d)\1+$/.test(cpf)) throw new Error('CPF inválido');

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) throw new Error('Dígito verificador do CPF inválido');

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) throw new Error('Dígito verificador do CPF inválido');

        // Retorna o CPF LIMPO para o setter salvar no banco
        return cpf; 
    }

    #validarOAB(oab) {
        const regex = /^\d{1,6}[\/-]?[A-Z]{2}$/i;
        if (!oab || !regex.test(oab)) {
            throw new Error('Registro OAB é obrigatório e deve ser válido (ex: 123456/SP)');
        }
    }

    #validarTelefone(telefone) {
        if (!telefone) throw new Error('Telefone é obrigatório');
        const apenasNumeros = telefone.replace(/\D/g, '');

        if (!(apenasNumeros.length >= 10 && apenasNumeros.length <= 11)) {
            throw new Error('Telefone deve conter o DDD e o número válido');
        }
        
        // Retorna o Telefone LIMPO para o setter salvar no banco
        return apenasNumeros;
    }

    #validarUF(uf) {
        const regex = /^[A-Z]{2}$/i;
        if (!uf || !regex.test(uf)) {
            throw new Error('UF inválida. Use a sigla do estado (ex: SP)');
        }
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