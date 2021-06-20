# Resolucao-broken-database
Este código tem como objetivo principal recuperar e retornar os dados corrompidos de um banco de dados ao formato esperado pelo sistema, uma vez que existem 3 tipos de irregularidade nesses dados.
A primeira irregularidade detectada nos dados foi a alteração de caracteres que compõem os nomes de produtos específicos, todos os caracteres “a” foram substituídos por “æ”, os “c” se tornaram “¢”, os caracteres “o” por “ø” e por fim todos os “b” foram substituídos por “ß”.
Como segunda irregularidade nos dados temos algumas alterações nos tipos da propriedade de preço, sendo ele trocado do tipo *number para o formato de uma **string.
O último problema acarretado pelo corrompimento do banco de dados é o desaparecimento de algumas propriedades “quantity” onde o valor atribuído era 0.

