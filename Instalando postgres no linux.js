//Instalando o node no linux:
//Baixando o nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

//instalando o nvm
. ~/.nvm/nvm.sh

//Baixando a versão mais instavel do node e instalando
nvm install --lts


// instalando o pg no linux, yum é o gerenciador de pacotes 
//sudo yum 

//Instalando Postgress no linux 
// mostra versoes disponiveis do postgre
$ sudo  amazon-linux-extras | grep postgre

//Baixa a versão 14
sudo tee /etc/yum.repos.d/pgdg.repo<<EOF
[pgdg14]
name=PostgreSQL 14 for RHEL/CentOS 7 - x86_64
baseurl=https://download.postgresql.org/pub/repos/yum/14/redhat/rhel-7-x86_64
enabled=1
gpgcheck=0
EOF

//Atualize seu arquivo de índice de pacotes.
sudo yum makecache

//Instalando
sudo yum install postgresql14 postgresql14-server

//iniciando o banco de dados
sudo /usr/pgsql-14/bin/postgresql-14-setup initdb

//toda vez que a maquina iniciar inicializar o pg
sudo systemctl enable --now postgresql-14
// se deu certo 
Created symlink from /etc/systemd/system/multi-user.target.wants/postgresql-14.service to /usr/lib/systemd/system/postgresql-14.service.


//verificar o status do serviço 
systemctl status postgresql-14

//alterar a senha do banco
sudo su - postgres  
psql -c "ALTER USER postgres WITH PASSWORD 'masterkey'" -d postgres

//entrar no postgres
sudo -i -u postgres
//depois
psql


//trocar senha do usuario postgres
//depois de já entrar no postgres
\Password

//agora é possivel torcar criar um banco




comandos postgres
https://www.youtube.com/watch?v=Ft3F7wWA-x8&ab_channel=B%C3%B3sonTreinamentos