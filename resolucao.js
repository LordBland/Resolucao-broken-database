let texto=""  // Variavel com o nome a ser corrigido
let numero=0  // Variavel com o nome a ser corrigido
let quantidade  // Variavel com o nome a ser corrigido
let precototal=0 //Variavel que armazena temporariamente a soma do preço final de cada categoria

let fs = require('fs') // File systen para ler o Json

let posicaoDosEletronicos = new Array()// Guarda a posiçao dos elementos da categoria de eletronicos
let posicaoDosAcessorios = new Array()// Guarda a posiçao dos elementos da categoria de acessorios
let posicaoDosEletrodomesticos = new Array()// Guarda a posiçao dos elementos da categoria de eletrodomesticos
let posicaoDasPanelas = new Array()// Guarda a posiçao dos elementos da categoria das panelas

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

        obj[k].price=correcaoDePrecos(obj[k].price)                   // Retorna o valor corrigido do preço ao objeto
                                                                    
        obj[k].name=correcaoTextual(obj[k].name )                     // Retorna um texto corrigido ao objeto
   
        obj[k].quantity=correcaoDeQuantidades(obj[k].quantity)        // Retorna um valor corrigido para oobjeto                                                                       
                                                                   
    }                                                           
    //_____________________________________________________________________________________


    json = JSON.stringify(obj) //retorna o objeto para json

    try  // tentativa de escrever e reler o json
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
                            somaDePreco(obj[m].price,obj[m].quantity)
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
                            somaDePreco(obj[m].price,obj[m].quantity)
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
                            somaDePreco(obj[m].price,obj[m].quantity)
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
                            somaDePreco(obj[m].price,obj[m].quantity)
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


function correcaoTextual(texto) //Função que corrige os textos corrompidos
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

function correcaoDePrecos(numero) //Função que corrige os preços que estão como string
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

function correcaoDeQuantidades(quantidade) //Função que quantidades que foram apagadas
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






