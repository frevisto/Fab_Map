PROJETO DE MAPA INTERATIVO 
-------------------------

Neste projeto, o objetivo é, utilizando do framework Leaflet.js e Shape Files disponibilizados pelo Instituto Brasileiro de Geografia e Estatística (IBGE),
que, ao se clicar em um estado brasileiro, que se faça a requisição ao Banco de Dados com as coordenadas e o retorno seja o nome daquela Unidade Federativa.


Requisitos para o projeto
-------------------------
Navegador Web para servir o front (indica-se que se faça uso da extensão Live Server, integrada à IDE Visual Studio Code).\
PostgreSQL e extensão PostGIS instalada no banco específico (neste projeto, nome sugerido: Estados_Fabricio)\


Passos para a Instalação
------------------------

1-) Clone o repositório.

2-) Instale as dependências do server  './server/' > npm i 

3-) Crie o banco de dados com o nome sugerido, ou outro, e rode a query "create extension postgis"\
Rode a query "select postgis_version()", o retorno positivo confirma a instalação.\
Caso use outro nome no banco, não se esqueça de alterar o arquivo './server/bd/index.ts'. Este é a configuração do pool.

4-) Importe o arquivo './db/BR_UF_2022.shp'\
Existem algumas formas de realizar a importação e estas variam de acordo com o sistema operacional da máquina.\
Para usuários de distribuições Linux, indico o uso do programa ogr2ogr, ferramenta da Biblioteca de Abstração de Dados Geospaciais (GDAL),
através da linha: '~/db $ ogr2ogr -f "PostgreSQL" PG:"host=localhost dbname=seu_banco user=seu_usuario password=sua_senha" BR_UF_2022.shp -nln estados -append'.\
(Detalhes na seção Adendos).\
Para usuários do sistema Windows, indica-se utilizar o PostGIS Bundle, instalável através do Stack Builder.

5-) Em './server' > npm start \
A porta padrão neste projeto para o backend é a 3000, conforme './server/src/index.ts'; Altere à escolha ou necessidade.

6-) Sirva o front através do Live Server.\
A porta padrão para o frontend neste projeto é a 5500.\
Certifique-se que o endereço na barra de pesquisa não seja seu IP, mas sim 'http://localhost:5500/'.

Nesse ponto, a aplicação deve estar funcional.
----------------------------------------------

Caso, no DevTools de seu navegador, retorne erros de Cross-Origin, estes erros estão relacionados ao endereçamento e às portas.\
Certifique-se do passo 6.\
Tente seguir o padrão (front:5500, back:3000) ou altere a linha 7 de './server/index.ts' para 'app.use(cors());' e reinicie o servidor.


Happy Mapping!
-------------

\
Adendos
--------

~/bd $ ogr2ogr -f "PostgreSQL" PG:"host=localhost dbname=seu_banco user=seu_usuario password=sua_senha" brasil_estados.shp -nln estados -append\
\
~/bd $ : Indica o diretório onde o script deve ser executado. \
-f "PostgreSQL": Especifica que a saída será um banco de dados PostgreSQL.\
PG:"...": Detalhes de conexão com o banco de dados.\
-nln estados: Define o nome da tabela de destino.\
-append: Adiciona dados à tabela existente (caso ela já exista).\
