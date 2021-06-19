let texto=""  // Variavel com o nome a ser corrigido
let numero=0  // Variavel com o nome a ser corrigido
let quantidade  // Variavel com o nome a ser corrigido


let fs = require('fs') // File systen para ler o Json
let nomes = new Array() // Vetor com todos os nomes do arquivo
let precos = new Array() // Vetor com todos os preços do arquivo
let quantidades = new Array() // Vetor com todos as quantidades do arquivo

let posicaoDosEletronicos = new Array()// Guarda a posiçao dos elementos da categoria de eletronicos
let posicaoDosAcessorios = new Array()// Guarda a posiçao dos elementos da categoria de acessorios
let posicaoDosEletrodomesticos = new Array()// Guarda a posiçao dos elementos da categoria de eletrodomesticos
let posicaoDasPanelas = new Array()// Guarda a posiçao dos elementos da categoria das panelas

let precototal=0 //Variavel que armazena temporariamente a soma do preço final de cada categoria

let idsAcessorios = new Array()
let idsEletronicos = new Array()
let idsEletrodomesticos = new Array()
let idsPanelas = new Array()

let i=0 //Variavel de indice
let k=0 //Variavel de indice
let p=0 //Variavel de indice
let m=0 //Variavel de indice
let n=0 //Variavel de indice


try 
{
    fs.readFile('broken-database.json','utf8',function(err,data)// Função para ler o arquivo JSON
    {
    obj = JSON.parse(data) //Transforma o JSON em um objeto

    //___________________________________________________________________________________
    k=0 //indice = 0               
    for(k=0;obj[k]!=null;k++)                                           
    {                                                                                            
        nomes.push(obj[k].name)             // Adiciona os elementos do nome do obj dentro do vetor nomes
        precos.push(obj[k].price)           // Adiciona os elementos do preço do obj dentro do vetor preço
        quantidades.push(obj[k].quantity)   // Adiciona os elementos das quantidades dentro do vetor quantidades

        numero=precos[k]                    // Carrega a variavel numero o valor do preço correspondente ao indice atual
        correcaoDePrecos()                  // Executa a função de correção de preço com o valor atual do preço
        precos[k]=numero                    // Retorna o valor corrigido do preço ao vetor

        texto=nomes[k]                      // Carrega a variavel texto com um nome correspondente ao indice atual
        correcaoTextual()                   // Executa a função de correção textual                                                 
        nomes[k]=texto                      // Retorna um texto corrigido ao vetor nomes

        quantidade=quantidades[k]           // Carrega a variavel quantidade com um valor do indice atual do vetor quantidades
        correcaoDeQuantidades()             // Executa a função que corrige valores apagados
        quantidades[k]=quantidade           // Retorna um valor corrigido para o vetor quantidades

        obj[k].name=nomes[k]                // Atuliza os nomes do obj com os valores corrigidos do vetor
        obj[k].price=precos[k]              // Atuliza os preços do obj com os valores corrigidos do vetor
        obj[k].quantity=quantidades[k]      // Atuliza as quantidades do obj com os valores corrigidos do vetor
                                                                                             
                                                                   
    }                                                           
    //_____________________________________________________________________________________


    json = JSON.stringify(obj) //retorna o objeto para json

    try 
    {
        fs.writeFile('saida.json', json,function(err) //Gera um arquivo corrigido
        {
            console.log("Arquivo Corrigido")//Imprime que o arquivo foi corrigido
            
            fs.readFile('saida.json','utf8',function(err,data)// Função para ler o arquivo JSON Corrigido
            {
                obj = JSON.parse(data) //Transforma o JSON em um objeto
                p=0 //Indice para separar as categorias
                for(p=0;obj[p]!=null;p++) 
                {
                    if(obj[p].category=="Acessórios")           //Verifica se a categoria observada é de Acessórios
                    {
                        posicaoDosAcessorios.push(p)            //Guarda quais posicoes fazem parte da categoria Acessórios
                    }
                    else if (obj[p].category=="Eletrônicos")    //Verifica se a categoria observada é de Eletrônicos
                    {
                        posicaoDosEletronicos.push(p)           //Guarda quais posicoes fazem parte da categoria Eletrônicos
                    }
                    else if(obj[p].category=="Eletrodomésticos")//Verifica se a categoria observada é de Eletrodomésticos
                    {
                        posicaoDosEletrodomesticos.push(p)      //Guarda quais posicoes fazem parte da categoria Eletrodomésticos
                    }
                    else if(obj[p].category=="Panelas")         //Verifica se a categoria observada é de Panelas
                    {
                        posicaoDasPanelas.push(p)               //Guarda quais posicoes fazem parte da categoria Panelas
                    }
                    
                }
                
                //.................................................................................................................
            
            
                i=0// Indice
                for(i=0;i<posicaoDosAcessorios.length;i++)
                {
                    idsAcessorios.push(obj[posicaoDosAcessorios[i]].id)   
                }
                i=0
                for(i=0;i<posicaoDosEletronicos.length;i++)
                {
                    idsEletronicos.push(obj[posicaoDosEletronicos[i]].id)  
                }
                i=0
                for(i=0;i<posicaoDosEletrodomesticos.length;i++)
                {
                    idsEletrodomesticos.push(obj[posicaoDosEletrodomesticos[i]].id)  
                }
                i=0
                for(i=0;i<posicaoDasPanelas.length;i++)
                {
                    idsPanelas.push(obj[posicaoDasPanelas[i]].id)  
                }

                idsAcessorios=idsAcessorios.sort()  // Ordena em ordem crescente as ids dos acessorios
                idsEletronicos.sort()               // Ordena em ordem crescente as ids dos eletronicos
                idsEletrodomesticos.sort()          // Ordena em ordem crescente as ids dos eletrodomesticos
                idsPanelas.sort()                   // Ordena em ordem crescente as ids das panelas

                // Imprime saida para validação
                n=0 // Indice n
                m=0 // Indice m
                console.log("________________________________________________________________________________")
                console.log("Acessórios")
                

                for(n=0;n<posicaoDosAcessorios.length;n++)
                {
                    while(m<obj.length)
                    {
                        if(idsAcessorios[n]==obj[m].id)
                        {
                            console.log("   Id:"+idsAcessorios[n])
                            console.log("       "+obj[m].name)
                            precototal=precototal+obj[m].price*obj[m].quantity
                        }
                        m++ 
                    }  
                    m=0
                    
                }
                
                console.log("Preço Total da Categoria:"+precototal)
                n=0 // Indice n
                m=0 // Indice m
                precototal=0// Limpa o valor na variavel precototal
                console.log("________________________________________________________________________________")
                console.log("Eletrodomésticos")

                for(n=0;n<posicaoDosEletrodomesticos.length;n++)
                {
                    while(m<obj.length)
                    {
                        if(idsEletrodomesticos[n]==obj[m].id)
                        {
                            console.log("   Id:"+idsEletrodomesticos[n])
                            console.log("       "+obj[m].name)
                            precototal=precototal+obj[m].price*obj[m].quantity
                        }
                        m++
                    }
                    m=0
                    
                }
            
                console.log("Preço Total da Categoria:"+precototal)
                n=0 // Indice n
                m=0 // Indice m
                precototal=0// Limpa o valor na variavel precototal
                console.log("________________________________________________________________________________")
                console.log("Eletronicos")
    

                for(n=0;n<posicaoDosEletronicos.length;n++)
                {
                    while(m<obj.length)
                    {
                        if(idsEletronicos[n]==obj[m].id)
                        {
                            console.log("   Id:"+idsEletronicos[n])
                            console.log("       "+obj[m].name)
                            precototal=precototal+obj[m].price*obj[m].quantity
                        }
                        m++
                    }
                    m=0
                }

                console.log("Preço Total da Categoria:"+precototal)
                n=0 // Indice n
                m=0 // Indice m
                precototal=0// Limpa o valor na variavel precototal
                console.log("________________________________________________________________________________")
                console.log("Panelas")

                for(n=0;n<posicaoDasPanelas.length;n++)
                {
                    while(m<obj.length)
                    {
                        if(idsPanelas[n]==obj[m].id)
                        {
                            console.log("   Id:"+idsPanelas[n])
                            console.log("       "+obj[m].name)
                            precototal=precototal+obj[m].price*obj[m].quantity
                        }
                        m++
                    }
                    m=0
                    n++
                }
                console.log("Preço Total da Categoria:"+precototal)
               
            });  
        })
    }
    catch (e) 
    {
        console.log(">>>ERRO AO GRAVAR ARQUIVO JSON<<<")  
    }

    
    })   
}
catch (e) 
{
    console.log(">>>ERRO AO LER ARQUIVO JSON<<<")   
}




function correcaoTextual() //Função que corrige os textos corrompidos
{
    var tamanhoTexto=texto.length;
    for (var i = 0; i < tamanhoTexto; i++) 
    {
        if (texto[i]== "æ") 
        {
            texto=texto.replace('æ','a')
        } 
        if (texto[i]== "¢") 
        {
            texto=texto.replace('¢','c')
        } 
        if (texto[i]== "ø") 
        {
            texto=texto.replace('ø','o')
        } 
        if (texto[i]== "ß") 
        {
            texto=texto.replace('ß','b')
        }   
     }
    return texto
}

function correcaoDePrecos() //Função que corrige os preços que estão como string
{ 

    try {
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

function correcaoDeQuantidades() //Função que quantidades que foram apagadas
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







