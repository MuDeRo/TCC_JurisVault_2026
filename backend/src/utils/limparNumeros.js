export function limparNumeros(valor) { // Adicione este log para depuração
    return valor.replace(/\D/g, ''); // remove tudo que não for dígito
}