var fs = require("fs");
var Jimp = require("jimp");

// Abre o arquivo HTML e armazena seu conteúdo na variável
var HTML_BASE = fs.readFileSync("./index.html").toString('utf-8');

// Extrai o link das imagens existentes no arquivo para minificação
var regex = /<img.*?src="(.*?)"/mg;
let IMAGES_ARRAY = [];
let i = 0;

// Substitui o diretorio das imagens pelo novo e os salva (anterior) em um array a percorrer e transformar
HTML_BASE = HTML_BASE.replace(regex, function (match, group) {
    IMAGES_ARRAY.push(group);
    i++;
    return match.replace(group, `assets/images/new/newimg_${i}.jpg`);
});

// Biblioteca que transforma todas as imagens para JPG e comprime o tamanho
IMAGES_ARRAY.map((e, i, arr) => {
    Jimp.read(e, function (err, thisImg) {
        if (err) throw err;
        thisImg.quality(60)
            .write(`assets/images/new/newimg_${i+1}.jpg`);
    });
});

// Regex para remover comentarios do codigo
HTML_BASE = HTML_BASE.replace(/<!--[\s\S]*?-->/g, '');

// Regex para minificar o codigo HTML
let HTML_MINIFIED = HTML_BASE.replace(/\s{2,}/g, '').replace(/\'/g, '"');

// Reescreve no novo arquivo HTML pronto para uso
fs.writeFile("regexed.html", HTML_MINIFIED, function(err) {
    // Em caso de erro, mostrar o problema no console
    if(err) {
        return console.log(err);
    }
    // Caso contrário, a escrita ocorreu com sucesso
    console.log("The file was saved!");
});