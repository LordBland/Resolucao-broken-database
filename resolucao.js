let precototal=0 //Variavel que armazena temporariamente a soma do preço final de cada categoria
let fs = require('fs') // File systen para ler o Json
let posicaoDosEletronicos = new Array()// Guarda a posiçao dos elementos da categoria de eletronicos
let posicaoDosAcessorios = new Array()// Guarda a posiçao dos elementos da categoria de acessorios
let posicaoDosEletrodomesticos = new Array()// Guarda a posiçao dos elementos da categoria de eletrodomesticos
let posicaoDasPanelas = new Array()// Guarda a posiçao dos elementos da categoria das panelas
let idsAcessorios = new Array()        // Armazena ids de categorias separadamente
let idsEletronicos = new Array()       // Armazena ids de categorias separadamente
let idsEletrodomesticos = new Array()  // Armazena ids de categorias separadamente
let idsPanelas = new Array()           // Armazena ids de categorias separadamente
let i=0 //Variavel de indice
let k=0 //Variavel de indice
let p=0 //Variavel de indice
let m=0 //Variavel de indice
let n=0 //Variavel de indice
let v=0 //Variavel de indice
let obId = new Array() // Armazena valores das ids do objeto
let obNome = new Array() // Armazena valores dos nomes do objeto
let obPreco = new Array() // Armazena valores dos precos do objeto
let obQuantidade = new Array() // Armazena valores das quantidades do objeto
let obCategoria = new Array() // Armazena valores das categorias do objeto

arquivo=ler('./broken-database')//Le o arquivo Broken-database
executarCorrecao(arquivo)
escrever('saida.json',arquivo)// Escreve o arquivo corrigido e chama a função de validaçao

function executarCorrecao(arquivo)
{
    for(k=0;arquivo[k]!=null;k++)                                           
    {      
        arquivo[k].price=correcaoDePrecos(arquivo[k].price)                   // Retorna o valor corrigido do preço ao objeto                                                         
        arquivo[k].name=correcaoTextual(arquivo[k].name )                     // Retorna um texto corrigido ao objeto
        arquivo[k].quantity=correcaoDeQuantidades(arquivo[k].quantity)        // Retorna um valor corrigido para oobjeto                                                                                                                               
    }  
}
function correcaoTextual(texto) //Função que corrige os textos corrompidos
{
    var tamanhoTexto=texto.length;
    for (var i = 0; i < tamanhoTexto; i++) 
    {
        if (texto[i]== "æ") 
        {
            texto=texto.replace('æ','a')
        } 
        else if (texto[i]== "¢") 
        {
            texto=texto.replace('¢','c')
        } 
        else if (texto[i]== "ø") 
        {
            texto=texto.replace('ø','o')
        } 
        else if (texto[i]== "ß") 
        {
            texto=texto.replace('ß','b')
        }   
     }
    return texto
}
function ler(nomeArquivo) //Função para ler arquivo
{ 
    try 
    {
        var obj=require(nomeArquivo)
        return obj
    }
    catch (e) 
    {
        console.log("ERRO AO LER ARQUIVO JSON") 
    }
}
function escrever(arquivoNome,conteudo) //Função para escrever arquivo e validar
{ 
    try 
    {
        json = JSON.stringify(conteudo) //retorna o para json  
        fs.writeFile(arquivoNome, json,function(err) //Escreve um arquivo
        {
            console.log("Arquivo Corrigido")//Imprime que o arquivo foi corrigido
            imprimir()//Chama Validaçao
            
        })
    }
    catch (e) 
    {
        console.log("ERRO AO ESCREVER ARQUIVO JSON") 
    }
}
function imprimir()
{  
    try
    {
        arquivo=ler('./saida.json')
        for(p=0;arquivo[p]!=null;p++) 
            {
                if(arquivo[p].category=="Acessórios")           //Verifica se a categoria observada é de Acessórios
                    {
                        posicaoDosAcessorios.push(p)            //Guarda quais posicoes fazem parte da categoria Acessórios
                    }
                else if (arquivo[p].category=="Eletrônicos")    //Verifica se a categoria observada é de Eletrônicos
                    {
                        posicaoDosEletronicos.push(p)           //Guarda quais posicoes fazem parte da categoria Eletrônicos
                    }
                else if(arquivo[p].category=="Eletrodomésticos")//Verifica se a categoria observada é de Eletrodomésticos
                    {
                        posicaoDosEletrodomesticos.push(p)      //Guarda quais posicoes fazem parte da categoria Eletrodomésticos
                    }
                else if(arquivo[p].category=="Panelas")         //Verifica se a categoria observada é de Panelas
                    {
                        posicaoDasPanelas.push(p)               //Guarda quais posicoes fazem parte da categoria Panelas
                    }
            }
        i=0// Reset de Indice
        for(i=0;i<posicaoDosAcessorios.length;i++)
            {
                idsAcessorios.push(arquivo[posicaoDosAcessorios[i]].id)   //armazena os ids de uma categoria especifica
            }
        i=0// Reset de Indice
        for(i=0;i<posicaoDosEletronicos.length;i++)
            {
                idsEletronicos.push(arquivo[posicaoDosEletronicos[i]].id)  //armazena os ids de uma categoria especifica
            }
                i=0// Reset de Indice
        for(i=0;i<posicaoDosEletrodomesticos.length;i++)
            {
                idsEletrodomesticos.push(arquivo[posicaoDosEletrodomesticos[i]].id)  //armazena os ids de uma categoria especifica
            }
        i=0// Reset de Indice
        for(i=0;i<posicaoDasPanelas.length;i++)
            {
                idsPanelas.push(arquivo[posicaoDasPanelas[i]].id)  //armazena os ids de uma categoria especifica
            }
        idsAcessorios=idsAcessorios.sort()  // Ordena em ordem crescente as ids dos acessorios
        idsEletronicos.sort()               // Ordena em ordem crescente as ids dos eletronicos
        idsEletrodomesticos.sort()          // Ordena em ordem crescente as ids dos eletrodomesticos
        idsPanelas.sort()                   // Ordena em ordem crescente as ids das panelas

        for(v=0;arquivo[v]!=null;v++) // Armazena valores do objeto
            {
                obId.push(arquivo[v].id)                
                obNome.push(arquivo[v].name)
                obPreco.push(arquivo[v].price)
                obQuantidade.push(arquivo[v].quantity)
                obCategoria.push(arquivo[v].category)
            }

        validacao(0,0,"Acessórios",posicaoDosAcessorios,arquivo,idsAcessorios,obId,obNome,obPreco,obQuantidade)                      //Imprime categoria acessórios
        validacao(0,0,"Eletrodomésticos",posicaoDosEletrodomesticos,arquivo,idsEletrodomesticos,obId,obNome,obPreco,obQuantidade)    //Imprime categoria eletrodomésticos
        validacao(0,0,"Eletronicos",posicaoDosEletronicos,arquivo,idsEletronicos,obId,obNome,obPreco,obQuantidade)                   //Imprime categoria eletronicos
        validacao(0,0,"Panelas",posicaoDasPanelas,arquivo,idsPanelas,obId,obNome,obPreco,obQuantidade)                               //Imprime categoria panelas

    }
    catch
    {
        console.log("ERRO AO IMPRIMIR VALIDAÇÃO") 
    }
}
function correcaoDePrecos(numero) //Função que corrige os preços que estão como string
{ 
    try 
    {
        if (numero!=Number)
        {
            numero= parseFloat(numero)
        }
        else
        {
            numero=numero
        }
        return numero
    }
    catch (e) 
    {
        console.log("ERRO AO CORRIGIR VALORES DE STRING PARA NUMBER") 
    }
}
function correcaoDeQuantidades(quantidade) //Função que corrige quantidades que foram apagadas
{ 
   if (quantidade==undefined)
   {
        quantidade= 0
   }
   else
   {
    quantidade=quantidade
   }
    return quantidade
}
function somaDePreco(numero,quantidade)//Função que soma todos o valor total de produtos de uma categoria
{
    try 
    {
        precototal=precototal+numero*quantidade
    }
    catch (e) 
    {
        console.log("ERRO AO CALCULAR PREÇO TOTAL DE CATEGORIA") 
    }
    return precototal
}
function validacao(n,m,catI,posicao,objL,idsCat,obId,oNome,oPreco,oQuantidade)// Função que imprime log de validação 
{
    try 
    {
        console.log("________________________________________________________________________________")
        console.log(catI)
        for(n=0;n<posicao.length;n++)
        {
            while(m<objL.length)
            {
                if(idsCat[n]==obId[m])
                {
                    console.log("   Id:"+idsCat[n])
                    console.log("       "+oNome[m])
                    somaDePreco(oPreco[m],oQuantidade[m])
                }
                m++
            }
            m=0   
        }
        console.log("Preço Total da Categoria:"+precototal)
        precototal=0
    }  
    catch (e) 
    {
        console.log("ERRO AO IMPRIMIR VALIDAÇÂO") 
    }
}





