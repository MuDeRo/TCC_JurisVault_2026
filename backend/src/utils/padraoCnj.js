export function validarPadraoCnj(numeroCnj) {
    const padrao = numeroCnj.replace(/^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/,"$1-$2.$3.$4.$5.$6");

    return padrao;
}

//TESTE DA VALIDAÇÃO
// const teste = "12345678901236789090";

// const teste_formatado = validarPadraoCnj(teste);

// console.log(teste_formatado);