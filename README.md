
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
coffeeShop/
├── src/                      # Código do back-end
├── coffeeshop-frontend/      # Código do front-end
├── pom.xml                   # Configuração do Maven
├── README.md                 # Documentação do projeto
├── .gitignore                # Arquivos ignorados pelo Git
└── mvnw/                     # Wrapper Maven
```

---

## ⚙️ Configuração do Ambiente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/Victorgalves/coffeeShop.git
```

### 2️⃣ Configuração do Back-End
1. Certifique-se de ter o MySQL instalado e rodando.
2. Crie um banco de dados chamado `cake_shopDB` ou outro nome à sua escolha.
3. Configure o arquivo `application.properties`:
   ```properties
   # Configurações do Banco de Dados
   spring.datasource.url=jdbc:mysql://localhost:3306/cake_shopDB
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha

   ```

4. Inicie o servidor:
   ```bash
   run src/main/java/cakeShopApplication
   ```

### 3️⃣ Configuração do Front-End
1. Abra o terminal e navegue até a pasta `coffeeshop-frontend/`.
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
. Acesse a aplicação no endereço: `http://localhost:3000/employee/new ` e faça seu cadastro.
