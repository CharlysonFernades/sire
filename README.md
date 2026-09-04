# SIRE - Sistema Integrado de Rotas Escolares

> Plataforma web de apoio a gestão logística do transporte escolar, comunicação operacional e acompanhamento de solicitações.

## Visão geral

O **SIRE (Sistema Integrado de Rotas Escolares)** foi criado para atacar dois grupos de problemas do transporte escolar:

1. **Problemas logísticos** - trajetos longos, quilometragem desnecessária, consumo de combustível, dificuldade de visualizar paradas e horários e impacto do tempo de rota na rotina dos estudantes.
2. **Problemas de comunicação** - alunos sem saber se o veículo passou antes do horário, atrasos causados por acidentes, trânsito ou condições da via, e falta de um canal estruturado entre Aluno, Motorista e coordenação/Secretaria de Transportes.

A proposta do SIRE é reunir **rotas, horários, mapas, avisos, atendimento e gestão** em uma única plataforma, com experiências diferentes conforme o perfil autenticado.

## Estado atual do repositório

- **Versão exibida no sistema:** `V5.8.1 Spark`
- **Branch analisada:** `main`
- **Hospedagem prevista:** GitHub Pages
- **Frontend:** aplicação web estática em um único `index.html`
- **Autenticação:** Firebase Authentication (e-mail e senha)
- **Banco de dados:** Cloud Firestore
- **Mapas:** Leaflet + OpenStreetMap
- **Cloud Functions:** não utilizadas na arquitetura atual
- **Perfis atuais:** Aluno, Motorista e Administrador

> Esta documentação foi preparada a partir do estado do repositório em 03/09/2026. As Firestore Security Rules não estão presentes na raiz do repositório analisado, portanto a documentação definitiva de segurança deve ser complementada quando essas regras forem adicionadas ou fornecidas.

## Estrutura documentada do repositório

```text
sire/
|-- index.html
|-- firebase-config.js
|-- appcheck-config.js
|-- README.md
|-- CHANGELOG.md
`-- docs/
    |-- README.md
    |-- arquitetura.md
    |-- funcionalidades.md
    |-- seguranca.md
    |-- roadmap.md
    `-- guias/
        |-- Aluno.md
        |-- Aluno.pdf
        |-- Motorista.md
        |-- Motorista.pdf
        |-- Admin.md
        `-- Admin.pdf
```

### `index.html`

Contém a interface, estilos e lógica principal do SIRE. A versão atual inclui login, dashboards por perfil, rotas, mapa, horários, avisos, atendimento, painel do motorista e painel administrativo.

### `firebase-config.js`

Contém a configuração pública do cliente Web Firebase usada pela aplicação. **Não deve conter senha, Service Account ou credenciais administrativas.**

### `appcheck-config.js`

Contém a configuração cliente do Firebase App Check. O arquivo atual referencia `reCAPTCHA Enterprise`; o estado efetivo do App Check também depende da configuração realizada no Firebase Console.

## Documentação do projeto

A documentação foi separada em páginas menores para facilitar manutenção e consulta:

- [Central de documentação](docs/README.md)
- [Arquitetura do sistema](docs/arquitetura.md)
- [Funcionalidades atuais](docs/funcionalidades.md)
- [Segurança e controle de acesso](docs/seguranca.md)
- [Roadmap e próximas implementações](docs/roadmap.md)
- [Histórico de versões](CHANGELOG.md)

## Arquitetura resumida

```text
Usuário
  |
  v
GitHub Pages / navegador
  |
  +--> Firebase Authentication ----> identifica a conta
  |
  +--> Firestore ------------------> perfis, rotas, avisos e solicitações
  |
  +--> Leaflet / OpenStreetMap ----> visualização das rotas no mapa
  |
  `--> App Check (configurado no cliente; depende do Console)
```

A versão atual foi desenhada para funcionar sem Cloud Functions, mantendo compatibilidade com a arquitetura Spark adotada no projeto.

## Fluxo de autenticação

1. Ao abrir o site, **somente a tela de login** aparece.
2. O usuário informa **e-mail e senha**.
3. O Firebase Authentication autentica a conta.
4. O SIRE consulta o documento do usuário no Firestore.
5. O **perfil não é escolhido pelo usuário no navegador**; ele vem do cadastro protegido da conta.
6. O sistema carrega apenas as funções e os dados correspondentes ao perfil.
7. Depois do login, o SIRE abre automaticamente os **avisos ainda não lidos** visíveis para a conta.
8. A página inicial apresenta os atalhos de acesso rápido e o contexto da rota/perfil.

A tela de login também possui **Mostrar/Ocultar senha** e **Esqueci minha senha**.

## Perfis de acesso

| Perfil | Acesso principal | Restrições principais |
|---|---|---|
| **Aluno** | Própria rota, mapa, paradas, horários, motorista/veículo, avisos, atendimento e próprios protocolos | Não pesquisa outras rotas e não acessa funções administrativas |
| **Motorista** | Rota designada, mapa, horários, publicação de avisos da própria rota, histórico e ajuda | Não acessa gestão global, outras rotas ou painel Admin |
| **Administrador** | Dashboard, contas, solicitações, rotas, paradas, motoristas, notificações e relatórios | Acesso global conforme as regras de segurança do backend |

> Importante: esconder botões no frontend não é suficiente para segurança. A autorização real precisa ser garantida pelas **Firestore Security Rules**.

## Funcionalidades principais

### Login institucional

- Acesso por e-mail e senha.
- Perfil carregado do Firestore.
- Botão Mostrar/Ocultar senha.
- Recuperação de senha pelo Firebase Authentication.
- Contas com status Ativo/Inativo no perfil do SIRE.

### Dashboard por perfil

A página inicial muda conforme o usuário:

- **Aluno:** Rotas, Atendimento, Acompanhar e Avisos.
- **Motorista:** Rotas, Horários, Publicar aviso, Histórico de avisos e Ajuda.
- **Administrador:** atalhos operacionais e acesso ao Painel Administrativo.

Os cards de acesso rápido aparecem antes das informações gerais do perfil.

### Rotas, paradas e horários

- Aluno e Motorista veem apenas a rota vinculada à conta.
- Administrador pode pesquisar e selecionar rotas.
- Exibição de número, nome, escola, situação, motorista e veículo.
- Tabela com ordem das paradas e horário previsto.
- Mapa via Leaflet/OpenStreetMap quando existem coordenadas válidas.
- Administrador pode cadastrar/editar rotas e gerenciar paradas.
- Latitude e longitude são opcionais, mas precisam ser preenchidas juntas para a parada aparecer no mapa.
- O código atual limita uma rota a até 100 paradas.

### Avisos e notificações

- Contador de avisos não lidos no sino.
- Depois do login, o painel abre automaticamente apenas os avisos ainda não lidos.
- Aviso resumido em popup; clique no título abre o conteúdo completo.
- Exibição de tipo, data/hora, responsável e rota/destino.
- Avisos gerais e avisos por rota.
- Motorista publica comunicados apenas da própria rota.
- Administrador pode publicar aviso geral ou por rota, definir validade e filtrar o histórico.
- Administrador pode desativar e reativar comunicados sem apagar o histórico.

**Limitação atual:** o estado de leitura é armazenado localmente no navegador por usuário. A leitura não é sincronizada entre dispositivos.

### Atendimento e protocolos

A Central de Ajuda aceita:

- Reclamação
- Sugestão
- Elogio
- Dúvida

O Firestore gera um documento da solicitação e o SIRE cria um protocolo no formato:

```text
SIRE-ANO-CÓDIGO
```

Os usuários não administrativos veem apenas as solicitações vinculadas à própria conta. O fluxo de status é:

```text
Recebido -> Em análise -> Respondido -> Resolvido
```

### Painel do Motorista

O painel operacional do Motorista concentra:

- rota designada;
- mapa da rota;
- ordem das paradas;
- horários previstos;
- publicação de avisos;
- histórico de comunicados da rota.

Tipos de aviso disponíveis incluem atraso, mudança de parada, condições da via, veículo em manutenção, aviso importante e atualização operacional.

### Painel Administrativo

O menu administrativo atual possui:

- **Dashboard** - indicadores e solicitações recentes;
- **Contas e acessos** - vínculo entre UID do Firebase Authentication e perfil do SIRE;
- **Solicitações** - consulta, resposta e atualização de status;
- **Rotas** - cadastro e edição de número, nome e escola;
- **Paradas** - cadastro, edição, remoção e organização de paradas/horários;
- **Motoristas** - cadastro administrativo e sincronização de dados públicos;
- **Notificações** - publicação, validade, filtros, desativação e reativação;
- **Relatórios** - indicadores operacionais e quantidade de alunos por rota.

## Criação de contas na arquitetura Spark atual

A versão atual **não cria a senha do usuário diretamente pelo painel SIRE**. O fluxo é:

1. Firebase Console -> Authentication -> Users -> Add user.
2. Criar e-mail e senha inicial.
3. Copiar o **UID** gerado pelo Firebase.
4. No SIRE, abrir **Painel Administrativo -> Contas e acessos**.
5. Colar o UID, informar nome, e-mail e perfil.
6. Para Aluno e Motorista, selecionar a rota.
7. Para Motorista, informar também telefone e CNH.
8. Vincular o perfil.

O status **Inativo** no documento do SIRE deve ser respeitado pelas Security Rules. Para impedir também a autenticação no Firebase, a conta precisa ser desativada no **Firebase Authentication**.

## Coleções Firestore utilizadas

| Coleção | Finalidade |
|---|---|
| `users` | Perfil, role, rota vinculada, status e dados básicos de acesso |
| `routes` | Rotas, escola, status e array de paradas/horários |
| `drivers` | Cadastro administrativo do motorista, incluindo dados sensíveis |
| `driverPublic` | Versão não sensível do motorista para consulta por usuários autorizados |
| `feedbacks` | Solicitações, protocolos, status e respostas |
| `notifications` | Avisos gerais ou por rota, autor, validade e status |

### Privacidade dos motoristas

O projeto separa o cadastro em duas coleções:

- `drivers`: dados administrativos, incluindo telefone e CNH;
- `driverPublic`: somente campos necessários para a experiência do usuário, como nome, veículo, rota e status.

Essa separação reduz a exposição desnecessária de dados pessoais no fluxo de Aluno/Motorista.

## Configuração do Firebase

Antes de usar o projeto com dados reais:

1. Crie ou selecione um projeto Firebase.
2. Ative **Authentication por e-mail e senha**.
3. Configure o **Cloud Firestore**.
4. Aplique Firestore Security Rules adequadas ao modelo de perfis.
5. Atualize `firebase-config.js` com a configuração Web do projeto.
6. Configure `appcheck-config.js` somente se o App Check estiver efetivamente habilitado no Firebase Console.
7. Crie a primeira conta Administrador no Authentication e o documento correspondente em `users`.
8. Use o painel administrativo para cadastrar/validar rotas, paradas, motoristas e demais contas.

> Não use dados de produção em testes locais sem um ambiente separado.

## Executando localmente

Por ser uma aplicação estática, o projeto pode ser servido por qualquer servidor HTTP local. Exemplos:

```bash
# Python
python3 -m http.server 8000
```

Depois, abra:

```text
http://localhost:8000
```

Também é possível usar um servidor estático do editor, como a extensão Live Server do VS Code.

## Publicação no GitHub Pages

Fluxo sugerido:

1. Suba `index.html`, `firebase-config.js` e `appcheck-config.js` para a branch de publicação.
2. Em GitHub -> Settings -> Pages, escolha a branch/pasta usada pelo projeto.
3. Aguarde a publicação.
4. Teste login, rotas, avisos e permissão de cada perfil em contas de teste.
5. Antes de uso institucional, execute uma auditoria das Firestore Security Rules.

## Segurança - estado documentado

O código atual apresenta algumas decisões importantes:

- o perfil não é escolhido pelo usuário na interface;
- Aluno/Motorista carregam apenas dados relacionados à própria rota e próprias solicitações;
- dados sensíveis de motoristas são separados em `drivers` e `driverPublic`;
- há status Ativo/Inativo para perfis;
- o repositório contém configuração cliente de App Check.

Entretanto, **as Firestore Security Rules não estão no repositório analisado**. Portanto, este README não afirma que o sistema está "100% seguro" nem reproduz regras que não foram fornecidas. A autorização deve ser validada em auditoria separada.

## Limitações atuais conhecidas

- Leitura de avisos é armazenada no navegador e não sincronizada entre dispositivos.
- O painel Spark vincula perfis a UIDs já criados; a criação de usuário/senha ocorre no Firebase Console.
- Inativar o perfil no SIRE não desativa automaticamente a conta no Firebase Authentication.
- Aplicação sem Cloud Functions: algumas operações administrativas permanecem dependentes do Console Firebase.
- Firestore Security Rules não estão versionadas no repositório atual.
- O mapa depende de coordenadas válidas cadastradas nas paradas.

## Roadmap planejado

> Os itens abaixo **não fazem parte da V5.8.1 atual**. Devem permanecer identificados como planejados até serem implementados e testados.

### Arquitetura Secretaria x Escolas

- **Secretaria de Transportes / Administração geral**
  - visão agregada de todas as escolas;
  - cadastro/gestão de escolas, rotas, veículos e motoristas;
  - criação de contas administrativas autorizadas;
  - gestão global e relatórios consolidados.

- **Administração de Escola**
  - acesso restrito à própria escola;
  - gestão dos alunos da unidade;
  - criação de contas de Aluno/Administração da escola dentro do escopo permitido;
  - sem acesso global a alunos de outras escolas;
  - sem permissão para administrar motoristas fora do escopo definido.

A autorização dessa arquitetura deve ser feita nas **Firestore Security Rules**, e não apenas escondendo telas no HTML.

## Histórico de evolução visível no código/repositório

- **V5.4** - esquema de campos mais restrito, histórico protegido, status Ativo/Inativo e configuração de App Check no repositório.
- **V5.6** - horários visíveis em Rotas e filtro administrativo de alunos por rota.
- **V5.6.1** - navegação Início/Voltar dinâmica e ajustes no fluxo do Motorista.
- **V5.8 / V5.8.1** - gestão ampliada de rotas/paradas, avisos avançados, acessibilidade e centralização dos atalhos do Motorista.

Os commits do repositório também registram evoluções como aprimoramento do cadastro de motoristas, testes com Google Maps posteriormente removidos e atualizações sucessivas do `index.html`.

## Manuais de uso

A documentação de uso foi separada por perfil:

- [Guia do Aluno](docs/guias/Aluno.pdf)
- [Guia do Motorista](docs/guias/Motorista.pdf)
- [Guia do Administrador](docs/guias/Admin.pdf)

## Propósito institucional

O SIRE não pretende apenas digitalizar telas. O objetivo é apoiar uma operação de transporte escolar mais previsível e organizada, reduzindo falhas de comunicação e fornecendo dados que possam ajudar a Secretaria de Transportes a revisar rotas, horários e ocorrências.

Do ponto de vista do estudante, uma rota mais eficiente pode significar menos tempo em deslocamento e mais tempo para estudo, descanso, convivência familiar e vida pessoal. Do ponto de vista da gestão, informações centralizadas podem reduzir retrabalho e facilitar a identificação de problemas recorrentes.

## Repositório

- GitHub: `CharlysonFernades/sire`
- Branch principal: `main`

---

**SIRE - Sistema Integrado de Rotas Escolares**  
Documentação preparada para a versão V5.8.1 Spark.