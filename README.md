
# Cake Shop Management System

## 📝 Descrição do Projeto
Este projeto é um sistema de gerenciamento para uma doceria, desenvolvido com **Java** no back-end e **React** no front-end. Ele oferece ferramentas para gerenciar clientes, pedidos, produtos, estoque, funcionários e vendas, garantindo uma operação eficiente e centralizada.

---

## 🚀 Funcionalidades
- **Clientes:** Listar, adicionar, editar e excluir.
- **Pedidos:** Gerenciar pedidos, status de produção e exibição dos itens de cada pedido.
- **Produtos e Estoque:** Controle detalhado do catálogo de produtos e níveis de estoque.
- **Funcionários:** Gerenciamento do cadastro de funcionários.
- **Dashboard:** Fornece uma dashboard com diversos dados e gráficos para poder acompanhar o andamento do negócio.

---

## 🛠️ Tecnologias Utilizadas

### Back-End:
- **Java**
- **Spring Boot**
- **JDBC**
- **MySQL**

### Front-End:
- **React**
- **HTML5**
- **CSS3**

### Ferramentas:
- **Maven** (gerenciador de dependências)
- **npm** (para o front-end)

---

## 🗂️ Estrutura do Projeto

```
cakeShop/
├── src/                      # Código do back-end
├── cakeShop-frontend/        # Código do front-end
├── pom.xml                   # Configuração do Maven
├── README.md                 # Documentação do projeto
├── .gitignore                # Arquivos ignorados pelo Git
└── mvnw/                     # Wrapper Maven
```

---

## ⚙️ Configuração do Ambiente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/Victorgalves/cakeShop.git
```

### 2️⃣ Configuração do Back-End
1. Certifique-se de ter o MySQL instalado e rodando.
2. Crie um banco de dados chamado `cake_shopDB` ou outro nome à sua escolha.
3. Rode o seguinte script SQL no seu banco para criar as tabelas e as triggers:

<details>
<summary>Clique para ver o script completo</summary>

```sql
CREATE DATABASE cake_shopDB;

USE cake_shopDB;

CREATE TABLE Funcionario (
    cpf VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(100),
    cargo VARCHAR(100),
    salario FLOAT,
    dtContratacao DATE,
    gerente CHAR(3) CHECK (gerente IN ('Sim', 'Nao')),
    status VARCHAR(10) DEFAULT 'Ativo'
);

CREATE TABLE Cliente(
    cpf VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(40),
    telefone VARCHAR(20),
    telefone2 VARCHAR(20),
    rua VARCHAR(30),
    bairro VARCHAR(30),
    numero VARCHAR(20),
    status VARCHAR(10) DEFAULT 'Ativo'
);

CREATE TABLE Produtos(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(20),
    preco FLOAT,
    categoria VARCHAR(40),
    descricao VARCHAR(100),
    status VARCHAR(10) DEFAULT 'Ativo'
);

CREATE TABLE Pedidos (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    funcionario_cpf VARCHAR(11),
    cliente_cpf VARCHAR(11),
    dataHora DATETIME,
    FOREIGN KEY (funcionario_cpf) REFERENCES Funcionario(cpf),
    FOREIGN KEY (cliente_cpf) REFERENCES Cliente(cpf)
);

CREATE TABLE ItensPedido (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    pedido_id INTEGER,
    produto_id INTEGER,
    quantidade INTEGER NOT NULL,
    preco_unitario FLOAT NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES Produtos(id)
);

CREATE TABLE Producao_pedido (
    idProducao INT AUTO_INCREMENT PRIMARY KEY,
    funcionario_cpf VARCHAR(11),
    pedido_id INTEGER,
    produto_id INTEGER,
    dataHora DATETIME,
    status VARCHAR(20) CHECK (status IN ('Pendente', 'Em andamento', 'Concluído', 'Cancelado')),
    quantidade INT,
    FOREIGN KEY (funcionario_cpf) REFERENCES Funcionario(cpf),
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES Produtos(id)
);

CREATE TABLE Avaliacao (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    data DATETIME,
    nota FLOAT,
    mensagem VARCHAR(255),
    tipo_avaliacao VARCHAR(50)
);

CREATE TABLE Estoque (
    produto_id INTEGER PRIMARY KEY,
    dt_atualizacao DATE NOT NULL,
    quantidade_produto INTEGER NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES Produtos(id)
);

CREATE TRIGGER set_quantidade_producao
BEFORE INSERT ON Producao_pedido
FOR EACH ROW
BEGIN
    DECLARE item_quantidade INT;
    SELECT quantidade INTO item_quantidade
    FROM ItensPedido
    WHERE pedido_id = NEW.pedido_id AND produto_id = NEW.produto_id;
    SET NEW.quantidade = item_quantidade;
END;

CREATE TRIGGER update_stock_on_item_insert
AFTER INSERT ON ItensPedido
FOR EACH ROW
BEGIN
    UPDATE Estoque
    SET quantidade_produto = quantidade_produto - NEW.quantidade,
        dt_atualizacao = CURDATE() 
    WHERE produto_id = NEW.produto_id;
END;

CREATE TRIGGER add_to_stock_after_product_insert
AFTER INSERT ON Produtos
FOR EACH ROW
BEGIN
    INSERT INTO Estoque (produto_id, dt_atualizacao, quantidade_produto)
    VALUES (NEW.id, CURDATE(), 1);
END;
```

</details>

4. Configure o arquivo `application.properties` dentro da aplicação:
   ```properties
   # Configurações do Banco de Dados
   spring.datasource.url=jdbc:mysql://localhost:3306/cake_shopDB
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   ```

5. Inicie o servidor:
   ```bash
   ./mvnw spring-boot:run
   ```

### 3️⃣ Configuração do Front-End
1. Abra outro terminal e navegue até a pasta `cakeShop-frontend/`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

---

## 🌟 Como Usar
Acesse a aplicação no endereço: `http://localhost:3000/empoloyee/new` faça o cadastro e comece a gerenciar seu negócio!
```
