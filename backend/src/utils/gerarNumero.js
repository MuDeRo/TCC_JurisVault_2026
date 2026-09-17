//Função criada para gerar automaticamente um identificador com 20 números aleatórios, que será usado para identificar os casos após sua criação
export function gerarNumerosAleatorios() {
    const numeros = [];

    for (let i = 0; i < 20; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 9) + 1; //Sorteia um decimal até 0.9, multiplica por 9, corta a vírgula e soma 1 (Gera de 1 a 9)
        numeros.push(numeroAleatorio);
    }

    return numeros;
}

// Teste da função gerador
//console.log(gerarNumerosAleatorios());