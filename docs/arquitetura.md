# Arquitetura do SIRE

## Visão geral

A versão atual do SIRE é uma aplicação Web estática hospedável no GitHub Pages. O frontend concentra interface, estilos e lógica principal no arquivo `index.html` e utiliza Firebase para autenticação e persistência de dados.

```text
Usuário
  |
  v
Navegador / GitHub Pages
  |
  +--> Firebase Authentication
  |
  +--> Cloud Firestore
  |
  +--> Leaflet + OpenStreetMap
  |
  `--> Firebase App Check (configuração cliente presente)
```

## Perfis atuais

### Aluno

O aluno recebe uma rota vinculada à sua conta. A interface restringe a experiência à própria rota, avisos autorizados, atendimento e solicitações pertencentes ao próprio usuário.

### Motorista

O motorista recebe uma rota vinculada e utiliza um painel operacional voltado à consulta de horários/paradas e publicação de avisos relacionados à sua rota.

### Administrador

O administrador possui visão global do sistema e acesso aos módulos de contas, solicitações, rotas, paradas, motoristas, notificações e relatórios.

## Autenticação

O acesso é realizado com e-mail e senha pelo Firebase Authentication. O usuário não escolhe o próprio perfil na interface. Depois da autenticação, o SIRE consulta o perfil associado ao UID e monta a experiência correspondente.

## Coleções utilizadas

| Coleção | Responsabilidade |
|---|---|
| `users` | Perfil, role, rota vinculada, status e dados básicos da conta |
| `routes` | Rotas, escola, status, paradas e horários |
| `drivers` | Cadastro administrativo de motoristas, incluindo dados privados |
| `driverPublic` | Dados não sensíveis disponibilizados aos fluxos autorizados |
| `feedbacks` | Solicitações, protocolos, status, respostas e proprietário |
| `notifications` | Avisos gerais/por rota, tipo, autor, validade e status |

## Separação de dados de motoristas

O SIRE mantém dados administrativos do motorista em `drivers` e uma versão reduzida em `driverPublic`. O objetivo é impedir que dados como telefone e CNH precisem ser carregados nos fluxos comuns de Aluno e Motorista.

## Mapas

A visualização usa Leaflet e OpenStreetMap. As paradas só aparecem no mapa quando latitude e longitude válidas estão cadastradas.

## Arquitetura Spark

A versão atual foi desenhada sem Cloud Functions. Por isso, algumas tarefas administrativas continuam dependendo do Firebase Console, especialmente a criação inicial da conta no Firebase Authentication.

## Limite da documentação

As Firestore Security Rules não estão versionadas no repositório analisado. Portanto, esta arquitetura descreve o comportamento observado no frontend e no acesso ao Firestore, mas não substitui uma análise das Rules efetivamente publicadas.