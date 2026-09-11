<div align="center">

# 🚚 MZLOG

### Sistema de Logística — Arquitetura de Microsserviços

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular_19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

![Status](https://img.shields.io/badge/status-em%20evolução-yellow?style=flat-square)
![Licença](https://img.shields.io/badge/uso-estudo%2Fportfólio-blue?style=flat-square)

</div>

---

## 📖 Sobre

Sistema de logística migrado para uma arquitetura de **microsserviços** (Java + Spring Boot), com front-end separado em **Angular**. Cada domínio de negócio (clientes, funcionários, entregas) roda como serviço independente, com seu próprio banco de dados — o clássico padrão **Database per Service**.

> 🤖 **Projeto assistido por IA.** Construído com apoio de Cursor + Claude, como parte do meu aprendizado em desenvolvimento orientado por IA — revisando cada sugestão antes de aceitar, em vez de apenas confiar cegamente no código gerado.

---

## ✅ Status atual

| Módulo | Status |
|---|---|
| 🔧 Backend (microsserviços) | ✅ Funcional — CRUD completo de clientes, funcionários, entregas e veículos |
| 🔐 Autenticação | ✅ Funcional (simplificada) — usuário fixo, sem JWT assinado |
| 🛣️ Rotas (CRUD) | ✅ Funcional (`/api/rotas/**`) |
| 🗺️ **Mapas** | ✅ **Funcional** — visualização de rotas integrada ao dashboard |
| 💻 Frontend (Angular) | ✅ Funcional — dashboard, listagens e formulários |
| 🚀 Integração Contínua (CI) | ✅ **Funcional** — Pipeline automatizado via GitHub Actions validando multi-serviços |
| 🐳 Entrega Contínua (CD) | ✅ **Funcional** — Orquestração e build de containers via Docker Compose validado em automação |
| 🧪 Testes automatizados | 🚧 Em desenvolvimento |
| ☁️ Deploy em nuvem | 🚧 Planejado |

---

## 🏗️ Arquitetura

```
                              ┌──────────────────┐
                              │   🌐 Frontend      │
                              │   Angular 19        │
                              │   (localhost:4200)   │
                              └─────────┬────────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │  🚪 API Gateway     │
                              │  Spring Cloud Gateway │
                              │  (localhost:8080)     │
                              └─────────┬────────┘
                    ┌───────────┬───────┼───────┬───────────┐
                    ▼           ▼       ▼       ▼           ▼
             ┌───────────┐ ┌────────┐ ┌────────┐ ┌────────────────┐
             │ 🔐 auth    │ │ 👥 clientes│ │ 🧑‍💼 funcionarios│ │ 📦 entregas       │
             │  -service  │ │ -service │ │  -service  │ │ -service          │
             │  :8081     │ │  :8082   │ │  :8083     │ │  :8084             │
             └───────────┘ └────┬───┘ └────┬───┘ └────────┬────────┘
                                  │           │              │  (também cobre
                                  ▼           ▼              │   veículos, frota
                            ┌────────┐  ┌────────┐          │   e 🗺️ rotas)
                            │ 🐘 Postgres│ │ 🐘 Postgres│          ▼
                            │ clientes_db│ │funcionarios│    ┌────────────┐
                            └────────┘  │    _db     │    │ 🐘 Postgres  │
                                        └────────┘    │ entregas_db  │
                                                        └────────────┘
```

```
📁 .github/workflows/       🚀 Automação de CI/CD baseada em esteiras virtuais

📁 backend/
 ┣ 📂 api-gateway/          🚪 Spring Cloud Gateway — roteia /api/** para os serviços
 ┣ 📂 auth-service/         🔐 Login com usuário fixo (seed)
 ┣ 📂 clientes-service/     👥 CRUD de clientes (PostgreSQL próprio)
 ┣ 📂 funcionarios-service/ 🧑‍💼 CRUD de funcionários (PostgreSQL próprio)
 ┗ 📂 entregas-service/     📦 CRUD de entregas, veículos/frota e 🗺️ rotas (PostgreSQL próprio)

📁 frontend/                💻 Angular 19 (standalone components)
📄 docker-compose.yml       🐳 Orquestra back-end + bancos
```

---

## 🚀 Pipeline de CI/CD (GitHub Actions)

O projeto conta com uma esteira automatizada de **Integração Contínua e Entrega Contínua** rodando a cada `push` ou `pull request` na branch `main`:

- **Compilação Multi-Serviço:** a automação cria um ambiente Linux virtual isolado, instala o **Java 21 (Temurin)** e gerencia o build via Maven paralelamente para todas as pastas de microsserviços.
- **Validação de Infraestrutura:** a esteira simula o ambiente produtivo real disparando o ecossistema completo de containers e redes do Docker Compose de forma agnóstica na nuvem do GitHub, garantindo que o código integrado não gerará quebras no ambiente local dos desenvolvedores.

---

## 🔑 Credenciais de acesso (ambiente de demonstração)

```
usuario: muniz
senha:   muniz
```

> ⚠️ Credenciais fixas para fins de estudo/demonstração local. Não representam dados reais nem devem ser usadas como referência de segurança para produção.

---

## 🚀 Como rodar

### 🐳 Back-end

Pré-requisitos: **Docker** e **Docker Compose**.

```bash
docker compose up --build
```

| Serviço | 🔌 Porta | 📘 Swagger UI |
|---|---|---|
| 🚪 api-gateway | `8080` | — |
| 🔐 auth-service | `8081` | http://localhost:8081/swagger-ui.html |
| 👥 clientes-service | `8082` | http://localhost:8082/swagger-ui.html |
| 🧑‍💼 funcionarios-service | `8083` | http://localhost:8083/swagger-ui.html |
| 📦 entregas-service | `8084` | http://localhost:8084/swagger-ui.html |

O front-end consome as APIs através do gateway, em `http://localhost:8080`.

### 💻 Front-end

Pré-requisitos: **Node.js 18+** e **Angular CLI** (`npm install -g @angular/cli`).

```bash
cd frontend
npm install
ng serve
```

Acesse **http://localhost:4200** 🎉

Antes de rodar, copie as imagens originais (`logo_mzlog.png`, `frota.png`, `frota_grande.png`, `frota_medio.png`, `frota_van.png`, `funcionarios.png`, `caminhoes_capa.png`) para `frontend/src/assets/img/`.

---

## 📝 Notas de implementação

- 🔐 O token de login é um identificador simples (não um JWT assinado), armazenado no `localStorage` do navegador e usado apenas para liberar as rotas protegidas no Angular (`authGuard`).
- 🌱 Os dados de clientes, funcionários, veículos e entregas são semeados automaticamente (`DataSeeder`) na primeira inicialização de cada serviço, para facilitar a demonstração.
- 🗺️ O card de mapa no dashboard **já está funcional**, com visualização de rotas integrada.

---

## 🗺️ Próximos passos

- [x] ~~Integração real de mapa (Leaflet/Google Maps)~~ ✅ concluído
- [x] ~~Pipeline de CI/CD automatizado multi-serviços via GitHub Actions e Docker Compose~~ ✅ concluído
- [ ] 🔐 Autenticação com JWT assinado
- [ ] 🧪 Testes automatizados (Unitários com JUnit 5)
- [ ] ☁️ Deploy em ambiente de nuvem

---

## 🎓 Aprendizado

Este é meu primeiro sistema desenvolvido com apoio de ferramentas de IA (**Cursor**, **Claude Code**), como parte do meu processo de aprendizado prático em:

- 🏗️ Arquitetura de microsserviços com Spring Boot e Java 21
- 💻 Angular com componentes standalone
- 🐳 Engenharia de Plataformas com Docker, Docker Compose e Automação de Pipelines (CI/CD)
- 🔍 Revisão crítica de código gerado por IA — todo código sugerido é analisado antes de ser aceito, buscando entender o que foi implementado e por quê.

---

<div align="center">

Feito com 🚛 + ☕ + 🤖

</div>
