# 🛍️ My E-commerce Demo API

<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /></a>
</p>

## 📌 Sobre o Projeto

Esta API faz parte do projeto **My E-commerce Demo**, servindo como backend para a aplicação mobile [My Demo App](https://github.com/ClebyFrancisco/my_ecommerce_demo_app.git).

O projeto foi desenvolvido utilizando:
- [NestJS](https://nestjs.com/) - Framework para aplicações Node.js
- [Yarn](https://yarnpkg.com/) - Gerenciador de pacotes
- [Prisma](https://www.prisma.io/) - ORM para banco de dados
- [SQLite](https://www.sqlite.org/) - Banco de dados local

## 🚀 Como Rodar o Projeto

### 📥 Clonar o Repositório

```bash
$ git clone https://github.com/ClebyFrancisco/my_ecommerce_demo_api.git
$ cd my_ecommerce_demo_api
```

### 📦 Instalar Dependências

```bash
$ yarn install
```

### ⚙️ Configurar o Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável:

```
DATABASE_URL="file:./dev.db"
```

### 🔧 Gerar o Banco de Dados

```bash
$ yarn prisma migrate dev
```

### ▶️ Rodar a API

```bash
# Modo desenvolvimento
$ yarn start:dev
```

A API estará disponível em `http://localhost:3000`.

## 🔗 Links Importantes

- **Frontend:** [My Demo App](https://github.com/ClebyFrancisco/my_ecommerce_demo_app.git)
- **Backend:** [My E-commerce Demo API](https://github.com/ClebyFrancisco/my_ecommerce_demo_api.git)
- **NestJS:** [Documentação Oficial](https://docs.nestjs.com/)
- **Prisma:** [Documentação Oficial](https://www.prisma.io/docs/)

---

📌 Projeto desenvolvido por **Cleby Francisco** 🚀

