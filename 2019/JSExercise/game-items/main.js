

let items = [];

function createItems(amount) {
    let fakeRandom = '0312041320021403144203001240324111012403102301243012312012430120312031230442410202202021323012031233';
    const names = ['Matador Voraz', 'Dano', 'Elétrico', 'Gelo', 'Fogo'];

    let i = fakeRandom.length;
    while (i--) {
        items.push({
            name: names[fakeRandom.charAt(i)],
            level: 1
        });
    }
}

createItems(10);

console.table(items);
console.log(items);

function upgradeItemLevel(item) {
    // Verificar quanttos items com o mesmo nome e level;
    // Se existirem 2 ou mais iguais o upgrade pode ser feito;
    // Um novo item com o mesmo nome é criado mas com o nivel atual + 1;
    // Os dois itens usados para criar o novo item são removidos;

}
