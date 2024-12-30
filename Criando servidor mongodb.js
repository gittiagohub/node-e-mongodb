Configurando o banco mongoDB:

download do mongo 
https://www.mongodb.com/try/download/community-kubernetes-operator --baixar em zip

extrair a pasta em algum lugar, recomendado que seja em  arquivos de programas
depois renomerar para mongodb-versão exemplo mongodb-6.0.2

Criando o servidor mongo
vá ate o caminho da pasta bin, e execute mongod --dbpath  e o diretorio onde vai ficar os dados
cd C:\Program Files\mongodb-6.0.2\bin>  .\mongod --dbpath "C:\Users\Tiago\Documents\GitHub\Node-mongoDB\cinema-microservice\api-gateway\data" --port 27017

depois baixe o shell 
https://www.mongodb.com/try/download/shell
apenas pegue os arquivos mongosh.exe e mongosh_crypt_v1.dll que esta na pasta bin desse arquivo,
 e coloque na pasta bin C:\Program Files\mongodb-6.0.2\bin  esses arquivos poderiam estar em outra pasta mas por organização é melhor ficar aqui
 
 
 depois vá ate a pasta bin C:\Program Files\mongodb-6.0.2\bin  e digite ./mongosh
 Pronto, agora ele esta disponivel para ser usado via terminal
 
 
 
 
 
 
 
 
 
 
 
 
 cd "C:\Program Files\mongodb-6.0.2\bin"  .\mongod --dbpath "C:\Users\Tiago\Documents\GitHub\Node  e mongoDB\cinema-microservice\movies-service\data"


 {[
    {
        "email": "tiago@hotmail.com",
        "password": "$2a$12$zKTfMmvrrIKKw8ygM7RkluTBwptD8QabEf8yX9xJ./DTrXesRRwvC",
        "profileId": 1
    },
    {

        "email": "tiago@gmail.com",
         "password": "$2a$12$RUWAiEXoIByUs5FgwE465uxxUPiGeyz2WYPeyFAcZDV919/yP.CiW",
        "profileId": 2
    }
 ]}
 
 B5FE540