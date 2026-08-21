# MZLOG

Sistema de logistica migrado para uma arquitetura de microsservicos (Java + Spring Boot) com front-end separado em Angular.

## Estrutura

```
backend/
  api-gateway/          Spring Cloud Gateway - roteia /api/** para os servicos
  auth-service/          Login com usuario fixo (seed)
  clientes-service/      CRUD de clientes (PostgreSQL proprio)
  funcionarios-service/  CRUD de funcionarios (PostgreSQL proprio)
  entregas-service/      CRUD de entregas e veiculos/frota (PostgreSQL proprio)
frontend/                Angular 19 (standalone components)
docker-compose.yml        Orquestra back-end + bancos
```

Cada microsservico tem seu proprio banco PostgreSQL (Database per Service). O `auth-service` nao possui banco: a autenticacao usa um usuario fixo em memoria.

## Credenciais de acesso

```
usuario: muniz
senha:   muniz
```

## Como rodar o back-end

Pre-requisitos: Docker e Docker Compose.

```bash
docker-compose up --build
```

Servicos expostos:

| Servico              | Porta | Swagger UI                                   |
|-----------------------|-------|-----------------------------------------------|
| api-gateway            | 8080  | -                                               |
| auth-service            | 8081  | http://localhost:8081/swagger-ui.html          |
| clientes-service         | 8082  | http://localhost:8082/swagger-ui.html          |
| funcionarios-service      | 8083  | http://localhost:8083/swagger-ui.html          |
| entregas-service         | 8084  | http://localhost:8084/swagger-ui.html          |

O front-end deve consumir as APIs atraves do gateway, em `http://localhost:8080`.

## Como rodar o front-end

Pre-requisitos: Node.js 18+ e Angular CLI (`npm install -g @angular/cli`).

```bash
cd frontend
npm install
ng serve
```

Acesse http://localhost:4200.

Antes de rodar, copie as imagens originais (`logo_mzlog.png`, `frota.png`, `frota_grande.png`, `frota_medio.png`, `frota_van.png`, `funcionarios.png`, `caminhoes_capa.png`) para `frontend/src/assets/img/`.

## Notas de implementacao

- O token de login e um identificador simples (nao um JWT assinado), armazenado no `localStorage` do navegador e usado apenas para liberar as rotas protegidas no Angular (`authGuard`).
- Os dados de clientes, funcionarios, veiculos e entregas sao semeados automaticamente (`DataSeeder`) na primeira inicializacao de cada servico, para facilitar a demonstracao.
- O card de mapa no dashboard e um placeholder, pronto para receber uma integracao futura (ex.: Leaflet ou Google Maps).
