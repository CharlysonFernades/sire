# Funcionalidades do SIRE

> **Versão de referência: V5.8.1 Spark.** Esta página descreve os recursos considerados implementados na versão atual. Itens futuros estão separados no [roadmap](roadmap.md).

## 1. Autenticação e perfis

- Login com e-mail e senha pelo Firebase Authentication.
- Perfil carregado a partir do cadastro associado ao UID.
- Experiências distintas para Aluno, Motorista e Administrador.
- Recuperação de senha pelo fluxo do Firebase Authentication.
- O usuário não escolhe seu próprio papel na tela de login.

A criação inicial de contas ocorre no Firebase Console; o painel SIRE vincula o UID a um perfil.

## 2. Aluno

- Consulta da rota vinculada à própria conta.
- Visualização de paradas, horários previstos e informações disponíveis do motorista/veículo.
- Visualização dos avisos destinados ao usuário/rota.
- Registro de reclamação, sugestão, elogio ou dúvida na Central de Ajuda.
- Geração de protocolo e acompanhamento das próprias solicitações.

O Aluno não possui, pela experiência prevista, gestão global de rotas nem acesso aos módulos administrativos.

## 3. Motorista

- Consulta da rota designada.
- Visualização da sequência de paradas e dos horários previstos.
- Consulta de avisos relacionados à operação.
- Publicação de avisos vinculados à própria rota.
- Consulta do histórico de avisos ativos e não expirados disponibilizados ao perfil.
- Acesso à Central de Ajuda.

**Uso seguro:** consultar ou operar o sistema somente com o veículo parado e em local seguro. O sistema não deve exigir interação com o celular durante a condução.

## 4. Administrador

### Dashboard

Apresenta indicadores gerais e solicitações recentes para apoiar o acompanhamento da operação.

### Contas e acessos

Vincula um UID previamente criado no Firebase Authentication a um perfil do SIRE e às informações correspondentes. A criação da senha não é feita pelo formulário do SIRE.

### Solicitações

Permite consultar solicitações, responder e atualizar sua situação. Os tipos disponíveis são reclamação, sugestão, elogio e dúvida. Cada solicitação utiliza um protocolo.

### Rotas

Permite cadastrar e editar informações como número, nome e escola, controlar a situação da rota e evitar a duplicação de números conforme a validação da interface.

### Paradas

Permite adicionar, editar e remover paradas, ajustar informações e horários, cadastrar coordenadas opcionais e reorganizar a sequência. Para exibição no mapa, latitude e longitude devem estar preenchidas em conjunto.

### Motoristas

Permite administrar o cadastro do motorista e manter os dados necessários aos fluxos públicos separados dos dados administrativos.

### Notificações

Permite publicar avisos gerais ou direcionados a uma rota, definir validade, filtrar o histórico e desativar/reativar comunicados. O histórico administrativo contempla os registros conforme seus estados, inclusive inativos ou expirados.

### Relatórios

Permite filtrar solicitações por rota, tipo, situação e período. Apresenta totais e distribuições operacionais, incluindo indicadores de solicitações abertas/resolvidas e distribuição por tipo e rota. Há também relatório de alunos por rota, distinguindo ativos e inativos.

## 5. Mapa

A visualização utiliza Leaflet e OpenStreetMap, com pontos baseados nas coordenadas cadastradas para as paradas e uma linha conectando esses pontos.

O mapa é apenas uma visualização dos dados cadastrados. **Não é rastreamento GPS em tempo real, não calcula trajetos por ruas, não otimiza automaticamente rotas e não fornece previsão de trânsito.**

## 6. Limitações conhecidas

- A criação inicial de contas ocorre no Firebase Console.
- A arquitetura atual não utiliza Cloud Functions.
- As Firestore Security Rules de produção não estão versionadas neste repositório.
- A leitura de avisos é armazenada localmente no navegador e não sincroniza entre dispositivos.
- A visualização de mapa depende de coordenadas válidas informadas nas paradas.
- Não há comprovação de cálculo automático de economia de combustível ou de tempo.

## 7. O que é planejado, não implementado

Possíveis evoluções de arquitetura, integração externa e análise logística estão descritas no [roadmap](roadmap.md). Não devem ser apresentadas como recursos disponíveis na V5.8.1.
