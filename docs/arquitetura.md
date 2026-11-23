# Arquitetura do SIRE

> **Referência funcional:** SIRE V5.8.1 Spark.

## Visão geral

O SIRE é uma aplicação Web estática. A interface, os estilos e a lógica principal estão concentrados em `index.html`. O navegador utiliza diretamente os serviços Firebase configurados para o projeto.

```text
Usuário
  |
  v
Navegador / GitHub Pages
  |
  +--> Firebase Authentication
  |      autenticação por e-mail e senha
  |
  +--> Cloud Firestore
  |      perfis, rotas, paradas, avisos e solicitações
  |
  +--> Leaflet + OpenStreetMap
  |      visualização dos pontos cadastrados
  |
  `--> Firebase App Check
         configuração cliente; depende também do Firebase Console
```

A arquitetura atual não utiliza Cloud Functions.

## Perfis de acesso

### Aluno

A conta possui uma rota vinculada. A interface apresenta a experiência do aluno, com consulta à própria rota, paradas e horários, avisos, atendimento e acompanhamento das próprias solicitações.

### Motorista

A conta possui uma rota vinculada. O perfil consulta informações operacionais dessa rota e pode publicar avisos relacionados a ela. O histórico apresentado ao Motorista se limita aos comunicados ativos e não expirados disponíveis para o perfil.

### Administrador

Possui os módulos administrativos de contas e acessos, solicitações, rotas, paradas, motoristas, notificações e relatórios, conforme as permissões efetivas configuradas no Firestore.

## Autenticação e vínculo do perfil

1. O usuário se autentica por e-mail e senha no Firebase Authentication.
2. O SIRE consulta o documento de perfil associado ao UID.
3. O perfil e os dados vinculados determinam a experiência apresentada.
4. O usuário não escolhe livremente seu papel na tela de login.

Na arquitetura atual, a criação inicial de e-mail e senha ocorre no Firebase Console. O painel do SIRE vincula o UID já existente a um perfil e às informações necessárias, como rota.

## Coleções documentadas

| Coleção | Responsabilidade |
|---|---|
| `users` | Perfil, papel, rota vinculada, situação e dados básicos da conta |
| `routes` | Rotas, escola, situação, paradas e horários |
| `drivers` | Cadastro administrativo do motorista, incluindo dados privados |
| `driverPublic` | Dados reduzidos do motorista utilizados nos fluxos autorizados |
| `feedbacks` | Solicitações, protocolos, situação, respostas e vínculo com o usuário |
| `notifications` | Avisos gerais ou direcionados a rotas, autor, validade e situação |

A tabela descreve a finalidade documental das coleções; os campos e permissões exatos devem ser conferidos no projeto Firebase.

## Separação dos dados de motoristas

O cadastro administrativo fica separado da versão pública reduzida. Dados como telefone e CNH pertencem ao fluxo administrativo de `drivers`; os fluxos comuns devem utilizar apenas os campos necessários disponibilizados em `driverPublic`.

Essa separação reduz a exposição desnecessária de informações pessoais, mas sua efetividade depende das Rules publicadas no Firestore.

## Mapas e coordenadas

A visualização utiliza Leaflet e OpenStreetMap. Quando uma parada possui latitude e longitude válidas, ela pode ser representada no mapa. O mapa apresenta os pontos cadastrados e uma linha que os conecta.

**Limite importante:** o mapa não realiza rastreamento GPS em tempo real, não calcula navegação pelas ruas, não integra trânsito em tempo real e não otimiza automaticamente o trajeto. A linha exibida não deve ser confundida com um percurso rodoviário calculado.

## Firebase e configuração externa

- **Authentication:** responsável por autenticar as contas.
- **Cloud Firestore:** armazena perfis e dados operacionais.
- **App Check:** há configuração cliente no repositório, mas sua aplicação efetiva depende do estado e das políticas configuradas no Firebase Console.
- **Firestore Security Rules:** são a camada essencial de autorização dos dados.

As Firestore Security Rules utilizadas no ambiente publicado não estão versionadas neste repositório. Esta documentação não as reproduz nem presume seu conteúdo. A cópia exata deve ser obtida do Firebase Console antes de revisão ou versionamento.

## Limitações arquiteturais atuais

- Aplicação estática, sem backend próprio com Cloud Functions.
- Criação inicial de usuário e senha feita no Firebase Authentication pelo Console.
- A autorização real depende das Firestore Security Rules.
- O mapa depende das coordenadas cadastradas nas paradas.
- A leitura de avisos fica armazenada localmente no navegador e não é sincronizada entre dispositivos.

## Limite desta documentação

Este documento descreve a arquitetura da versão funcional V5.8.1 e a organização observável do projeto. Não substitui auditoria do código, validação de infraestrutura, revisão das Rules publicadas nem teste de segurança independente.
