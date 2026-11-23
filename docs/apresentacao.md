# SIRE — Resumo para apresentação

> **Versão funcional documentada: V5.8.1 Spark.** Esta página organiza o que já existe no sistema para apresentação. Ela não anuncia uma nova versão funcional.

## 1. O que é o SIRE

O **Sistema Integrado de Rotas Escolares (SIRE)** é uma plataforma Web de apoio à gestão do transporte escolar. Reúne informações de rotas, paradas e horários, avisos operacionais, atendimento por solicitações e ferramentas administrativas em uma interface com permissões diferentes para Aluno, Motorista e Administrador.

A proposta é melhorar a organização das informações e a comunicação entre os envolvidos na operação. O sistema oferece apoio à gestão; não substitui a operação de transporte nem a avaliação humana dos trajetos.

## 2. Perfis e principais recursos implementados

| Perfil | Recursos disponíveis na V5.8.1 |
|---|---|
| **Aluno** | Consulta a própria rota, paradas e horários previstos; visualiza avisos; registra reclamações, sugestões, elogios ou dúvidas; acompanha os próprios protocolos. |
| **Motorista** | Consulta a rota vinculada, paradas e horários; visualiza avisos da operação; publica comunicados relacionados à própria rota; consulta os avisos ativos e não expirados disponíveis no histórico do perfil. |
| **Administrador** | Gerencia rotas e paradas; administra contas e cadastros de motoristas; acompanha e responde solicitações; publica e administra avisos; consulta relatórios operacionais e alunos por rota. |

### Gestão de rotas e paradas

O Administrador pode cadastrar e editar rotas, controlar sua situação e administrar as paradas associadas. Nas paradas, pode cadastrar e alterar informações, horários e coordenadas, além de remover e reorganizar a ordem dos pontos.

### Avisos operacionais

Os avisos podem ser direcionados a uma rota ou ao conjunto de usuários previsto para avisos gerais. O Administrador dispõe de validade, filtros e histórico, incluindo controle de ativação. O Motorista publica avisos relacionados à própria rota.

### Atendimento e relatórios

As solicitações são organizadas por tipo e recebem protocolo. O painel administrativo permite acompanhar o andamento e responder. Os relatórios oferecem filtros por rota, tipo de solicitação, situação e período, além de indicadores e distribuição dos registros. Há também consulta de alunos por rota, distinguindo ativos e inativos.

## 3. Como o sistema funciona

- **Frontend:** aplicação Web estática, com a interface e a lógica principal concentradas em index.html.
- **Autenticação:** Firebase Authentication por e-mail e senha.
- **Persistência:** Cloud Firestore.
- **Mapa:** Leaflet e OpenStreetMap, usando as coordenadas cadastradas nas paradas.
- **Backend próprio:** a arquitetura atual não utiliza Cloud Functions.

Na arquitetura atual, a conta e a senha são criadas no Firebase Authentication; o painel do SIRE vincula o UID a um perfil. A autorização dos dados depende das Firestore Security Rules publicadas no Firebase.

## 4. Limites que precisam ser explicados corretamente

O mapa é uma **visualização das paradas cadastradas e de uma linha que conecta os pontos**. A V5.8.1 não oferece:

- rastreamento GPS ou localização do veículo em tempo real;
- cálculo de navegação pelas ruas;
- otimização automática de trajetos;
- integração de trânsito em tempo real;
- cálculo automático de economia de combustível ou de tempo.

Esses itens não devem ser apresentados como funcionalidades prontas. Qualquer evolução nessa direção exige estudo, implementação, avaliação de custos e testes próprios.

Outras limitações relevantes:

- a criação inicial de contas ocorre pelo Firebase Console;
- não há Cloud Functions na arquitetura atual;
- as Firestore Security Rules não estão versionadas neste repositório;
- a leitura de avisos é armazenada localmente no navegador e não é sincronizada entre dispositivos.

## 5. Roteiro sugerido para demonstração

1. **Apresentar o login:** mostrar a autenticação e explicar que o perfil vem do cadastro associado ao UID.
2. **Entrar como Administrador:** mostrar o painel e os principais módulos.
3. **Demonstrar rotas e paradas:** abrir uma rota, consultar as paradas e demonstrar a gestão de dados em uma base de teste.
4. **Demonstrar avisos:** mostrar um comunicado por rota, sua validade e o histórico administrativo.
5. **Demonstrar relatórios:** aplicar filtros e explicar os indicadores sem tratar os dados de demonstração como estatística oficial da rede.
6. **Entrar com uma conta de Aluno:** mostrar que a experiência exibe a rota vinculada e os recursos de atendimento.
7. **Entrar com uma conta de Motorista:** mostrar consulta de horários e o fluxo de avisos, sem operar o celular durante a condução.

Use contas e registros de demonstração preparados previamente. Evite criar, desativar ou apagar registros reais durante a apresentação.

## 6. Segurança e evidências

A documentação de segurança explica a diferença entre restrições visuais da interface e autorização efetiva no Firestore. Há testes manuais relatados pelo responsável do projeto, organizados em [Registro de testes manuais](testes-manuais.md).

Esses resultados são evidências de verificações específicas; não equivalem a uma auditoria independente, a uma suíte automatizada completa ou a uma garantia de segurança. A cópia exata das Rules em produção precisa ser obtida do Firebase Console para revisão e versionamento.

## 7. Mensagem central

O SIRE centraliza informações que hoje podem estar dispersas entre rotas, horários, avisos e solicitações. A plataforma oferece uma base digital para melhorar a comunicação e apoiar o acompanhamento administrativo do transporte escolar, mantendo claros os limites do que está implementado na versão atual.
