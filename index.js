//Importa o Módulo File System do NodeJS utilizado para leitura e Exportação de Arquivos
const fs = require('fs');
try {
    transformarArquivo();
} catch (error) {
    console.log("Não foi possível transformar os arquivos");
}
//Função para retorno  do arquivo consertado
function transformarArquivo(){
    try {
    if(fs.existsSync('broken_database_1.json') && fs.existsSync('broken_database_2.json')){
        // Método JSON.parse para retorno  do arquivo Broken Database 1 e Broken Database2 em um Array de Objetos
        let arquivoCorrompido1 = JSON.parse(fs.readFileSync("broken_database_1.json"));
        let arquivoCorrompido2 = JSON.parse(fs.readFileSync("broken_database_2.json"));
        //Chamada da Função de Conserto dos Arquivos
        let arquivosCorrigidos = consertarArquivos(arquivoCorrompido1, arquivoCorrompido2);
        exportarArquivosCorrigidos(arquivosCorrigidos);
    } else {
        throw error;
    }
    } catch (error) {
        console.log("Arquivos Faltando ou vazios, Certifique-se que ambos arquivos estão juntos e possuem os conteúdos corretos!!");     
    }
}
//Função para percorrer os Arquivos Quebrados alterando os valores corrompidos
function consertarArquivos(arquivoQuebrado1, arquivoQuebrado2) {
    try {
        if(arquivoQuebrado1 != null && arquivoQuebrado2 != null) {
            arquivoQuebrado1.forEach(element => {
                //Armaneza os valores originais da database corrompida
                let nome = element.nome;
                let vendas = element.vendas;
                //Verifica se o nome de cada elemento possui o caractere Quebrado
                if(nome.includes("ø")) {
                    //Faz a substituição do caractere quebrado
                    nome = nome.replaceAll("ø", "o");
                } 
                if(nome.includes("æ")) {
                    nome = nome.replaceAll("æ", "a");
                }
                //Verifica se o numero do elemento contido em "vendas" trata-se de uma String
                if(typeof vendas == "string") {
                    //Transforma em inteiro
                    vendas = parseInt(vendas);
                }
                //Reatribui os valores (após correção) ao elemento
                element.nome = nome;
                element.vendas = vendas;
            });
            arquivoQuebrado2.forEach(element => {
                let marca = element.marca;
                if(marca.includes("ø")) {
                    marca = marca.replaceAll("ø", "o");
                } 
                if(marca.includes("æ")) {
                    marca = marca.replaceAll("æ", "a");
                } 
                element.marca = marca;     
            });
            //Criação de Array para armazenar ambos arquivos corrigidos para retorna-los
            let arrayArquivosCorrigidos = [arquivoQuebrado1, arquivoQuebrado2];
            return arrayArquivosCorrigidos;
        } else {
            throw error;
        }
    } catch (error) {
        console.log("Ocorreu um problema ao corrigir arquivos!");
    }
}
//Função para exportar os arquivos após a correção 
function exportarArquivosCorrigidos(arquivos) {
    //Transforma o array de Objetos do primeiro arquivo de volta em texto para criação do novo arquivo corrigido
    let exportarArquivo1 = JSON.stringify(arquivos[0]);
    let exportarArquivo2 = JSON.stringify(arquivos[1]);
    try {
        //Verifica se o arquivo corrigido já existe, se o arquivo não existir, cria um novo arquivo com os valores corrigidos
        if(fs.existsSync('fixed_database_1.json') && fs.existsSync('fixed_database_2.json')) {
            throw error;
        }
        fs.writeFileSync('fixed_database_1.json', exportarArquivo1);
        fs.writeFileSync('fixed_database_2.json', exportarArquivo2);
        console.log("Arquivos corrigios exportados com Sucesso!!")
    } catch (error) {
        console.log("Arquivos Corrigidos já existem!!");
    }      
}
