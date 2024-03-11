const fs = require('fs');

// O código que você deseja adicionar ao arquivo .js
const scriptCode = `
function helloWorld() {
    console.log("Hello, world!");
}

helloWorld();
`;

// Nome do arquivo onde o script será adicionado
const fileName = 'meuScript.js';

// Adicionando o script ao arquivo
fs.appendFile(fileName, scriptCode, (err) => {
    if (err) throw err;
    console.log('Script adicionado ao arquivo com sucesso!');
});
