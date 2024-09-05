# CRUD de clientes, produtos, e pedidos
Projeto de PHP, parte do curso de Desenvolvimento Front-End da Newtab Academy.
CRUD de clientes, produtos, e pedidos utilizando HTML, CSS, Javascript, PHP, e MySQL.

## Sobre o SQL
Os dados para a conexão com o MySQL devem ficar no arquivo ```config/.env```. Esse arquivo possui informações sensíveis de segurança e, portanto, está listado no arquivo ```.gitignore```. O arquivo deve conter o seguinte código:
```
<?php
define('HOST', '[nome do host]');
define('DATABASE', '[nome do banco de dados]');
define('USERNAME', '[nome do usuário]');
define('PASSWORD', '[senha do usuário]');
```

A pasta ```sql``` possui scripts SQL para criar e popular as tabelas com mock de dados.

### Scripts para criar as tabelas
Para criar as tabelas, execute os scripts na seguinte ordem: ```tabela_clientes.sql``` &rarr; ```tabela_produtos.sql``` &rarr; ```tabela_pedidos.sql```. O script ```tabela_pedidos.sql``` deve ser o último pois contém referências às duas outras tabelas.

Criar as tabelas é obrigatório para o funcionamento do programa.

### Scripts para popular as tabelas
Caso queira popular as tabelas com mock de dados, execute os scripts na seguinte ordem: ```mock_clientes.sql``` &rarr; ```mock_produtos.sql``` &rarr; ```mock_pedidos.sql```. Assim como na criação de tabelas, o script ```mock_pedidos.sql``` deve ser o último a ser executado porque contém referências às outras duas tabelas.

Popular as tabelas é um passo opcional. As tabelas podem ser populadas manualmente.


## Utilizando
<img height="50" src="https://github.com/user-attachments/assets/6364c31a-da0f-4ee8-a69f-f33ad1f7c921" alt="HTML" title="HTML"/>
<img height="50" src="https://github.com/user-attachments/assets/7c59f579-8108-4064-b758-5aa207f23e81" alt="CSS" title="CSS"/>
<img height="50" src="https://github.com/user-attachments/assets/d8dcb273-05ed-4ba4-86b1-9bf6f882bd5e" alt="JavaScript" title="JavaScript"/>
<img height="50" src="https://github.com/user-attachments/assets/872e6619-e721-4f48-81e0-8454d43380f9" alt="PHP" title="PHP"/>
<img height="50" src="https://github.com/user-attachments/assets/c1640d19-49ff-40f3-9cca-51e8799d6583" alt="MySQL" title="MySQL"/>
