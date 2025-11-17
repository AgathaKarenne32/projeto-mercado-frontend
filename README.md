# 📦 Frontend – Gerenciamento de Compras MaisPrati

**Versão 1.0 do projeto**

Frontend do sistema de gerenciamento de compras pessoais desenvolvido para o programa MaisPrati.
Este módulo é responsável por toda a interface visual, navegação e comunicação com a API do backend.

## 👥 Contribuidores

- [Agatha Karenne](https://github.com/AgathaKarenne32)
- [Camila Madureira](https://github.com/ca-madureira)
- [Leonam Monteiro](https://github.com/bashln)
- [Leonardo Sales](https://github.com/LRLS-Srl)
- [Samuel Capusesera](https://github.com/SamuelLimaCap)
- [Vinicius Avemaria](https://github.com/ViniAvemaria)

---

## 📑 Tabela de Conteúdos

- [1. Introdução](#1-introdução)
- [2. Tecnologias utilizadas](#2-tecnologias-utilizadas)
- [3. Estrutura do projeto](#3-estrutura-do-projeto)
- [4. Requisitos](#4-requisitos)
- [5. Configuração do ambiente](#5-configuração-do-ambiente)
- [6. Como rodar o projeto](#6-como-rodar-o-projeto)
- [7. Comunicação com o backend](#7-comunicação-com-o-backend)
- [8. Boas práticas para contribuir](#8-boas-práticas-para-contribuir)

---

## 1. Introdução

Este projeto oferece ao usuário uma interface simples e direta para registrar, visualizar e acompanhar suas compras mensais.
Aqui o usuário pode:

- Visualizar notas fiscais cadastradas no backend
- Acompanhar gastos mensais e estatísticas
- Criar rascunhos de compras
- Fazer login e autenticação via API
- Navegar entre dashboards, detalhes de compras e produtos

Toda a lógica pesada fica no backend; o frontend serve como uma ponte elegante e organizada entre o usuário e os dados processados.

---

## 2. Tecnologias utilizadas

O projeto usa uma stack moderna:

- React + Vite
- React Router
- Axios
- React Hook Form
- Redux Toolkit (usado para estados específicos)
- React Toastify
- Material UI (MUI)
- Zod (validação)
- CSS Modules e estilos manuais

---

## 3. Estrutura do projeto

```

src/
├── App.jsx
├── App.css
├── assets/
├── components/
│   ├── ActionButton/
│   ├── BottomNav.jsx
│   ├── CadastroComprasScreen.jsx
│   ├── Drafts/
│   ├── Header/
│   ├── Header-Mobile/
│   ├── HeaderMob.jsx
│   ├── ItemTags/
│   ├── ListaComprasScreen.jsx
│   ├── modal/
│   ├── ModalPurchase/
│   ├── PrivateRoute.jsx
│   ├── PurchaseForm.jsx
│   ├── PurchaseItem/
│   ├── PurchaseList/
│   ├── PurchaseList.jsx
│   ├── RelatoriosGeralScreen.jsx
│   ├── RelatoriosItemScreen.jsx
│   ├── ReportsGeneral.jsx
│   ├── ReportsItem.jsx
│   ├── StatCard.jsx
│   ├── UnitPriceComparatorModal/
│   └── userMenu/
├── context/
│   └── PurchaseContext/
├── contexts/
│   ├── AuthContext.jsx
│   ├── DraftContext.jsx
│   └── ModalContext.jsx
├── ForgotPassword/
├── Signup/
├── ModalItemSelect/
├── pages/
│   ├── ConfirmRegistration/
│   ├── Dashboard/
│   ├── Drafts/
│   ├── GoogleAuth.jsx
│   ├── Login/
│   ├── MyReport.jsx
│   ├── Profile/
│   ├── Purchase/
│   └── Reports.jsx
├── routes/
│   └── AppRoutes.jsx
├── services/
│   ├── api.js
│   ├── nfceService.js
│   └── userService.js
└── utils/
    ├── formatDate.js
    └── formatMoney.js

```

Resumo rápido das principais pastas:

- components/ → blocos de interface reutilizáveis
- pages/ → telas completas
- contexts/ → estados globais (Auth, Draft, Modal)
- services/ → integração com API
- routes/ → roteamento principal
- utils/ → funções utilitárias (formatação, etc.)

---

## 4. Requisitos

Antes de rodar o frontend, você precisa ter:

- **Node.js** (versão 18 ou superior recomendada)
- **NPM** ou **Yarn**
- Backend rodando em `http://localhost:8080`

---

## 5. Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto e coloque:

```
VITE_API_URL=http://localhost:8080
VITE_GOOGLE_OAUTH2_ID=54212427633-321lush0fmhlt0bbkp0us22r258b1fnjapps.googleusercontent.com
```

A variável `VITE_API_URL` é usada pelo Axios para apontar para a API.
A chave `VITE_GOOGLE_OAUTH2_ID` deve coincidir com a utilizada no backend.

---

## 6. Como rodar o projeto

Clone o repositório:

```bash
git clone https://github.com/maisprati-eng/projeto-mercado-frontend.git
cd projeto-mercado-frontend
```

Instale as dependências:

```bash
npm install
```

Se der algum warning ou vulnerabilidade:

```bash
npm audit fix
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```
http://localhost:5173
```

---

## 7. Comunicação com o backend

O frontend utiliza chamadas HTTP para:

- autenticação
- listagem e exibição de notas
- visualização de rascunhos
- consulta de produtos e totais

A base das requisições ocorre por meio do Axios configurado em:

```
src/services/api.js
```

Módulos que usam a API:

- userService.js → login, signup, perfis

- nfceService.js → notas fiscais e compras

- PurchaseContext e DraftContext → organização dos dados em estado global

O backend precisa estar executando:

```bash
mvn spring-boot:run
```

---

## 8. Boas práticas para contribuir

Para manter o projeto organizado:

- Use nomes claros para componentes e funções
- Prefira componentes funcionais e hooks
- Evite lógica de negócio dentro de componentes visuais
- Siga o padrão do projeto (imports, espaçamento, estrutura)
- Teste antes de commitar
- Sempre escreva commits claros
