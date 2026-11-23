# Segurança e controle de acesso

> **Escopo:** registro documental da arquitetura e dos testes manuais relatados para a V5.8.1. Este documento não é uma auditoria independente nem uma garantia de segurança.

## Princípio central

A interface pode esconder módulos conforme o perfil, mas **ocultar botões ou páginas no HTML não é controle de autorização**. O acesso efetivo aos dados deve ser validado pelas Firestore Security Rules, aplicadas no backend.

## Controles e decisões observados

- Autenticação por Firebase Authentication.
- Perfil associado ao UID, em vez de o usuário escolher seu papel na tela.
- Separação dos fluxos por perfil Aluno, Motorista e Administrador.
- Vínculo de alunos e motoristas à rota correspondente.
- Separação de dados administrativos de motoristas (`drivers`) e dados reduzidos para fluxos autorizados (`driverPublic`).
- Separação das solicitações por usuário/proprietário nos fluxos não administrativos.
- Situação Ativo/Inativo em cadastros do SIRE.
- Configuração cliente de App Check presente no repositório.

A presença desses elementos não prova, por si só, que todas as operações estão protegidas. A autorização depende das Rules publicadas e de testes que tentem também operações fora da interface.

## Testes manuais relatados

O responsável pelo projeto informou resultados aprovados em cenários específicos, incluindo:

- acesso permitido à própria rota e negado a outra rota;
- leitura direta de aviso inativo recusada com `permission-denied`;
- leitura direta de registro inativo em `driverPublic` recusada com `permission-denied`;
- acesso de Aluno à coleção privada `drivers` negado;
- tentativa de alteração do próprio perfil de Aluno para Administrador negada;
- login, edição administrativa de rotas/paradas e atalhos visuais do Motorista testados com resultado aprovado.

A lista, os limites e a natureza desses resultados estão detalhados em [Registro de testes manuais](testes-manuais.md). Eles são relatos de testes pontuais, não execução independente desta branch.

## Firestore Security Rules

As Rules efetivamente utilizadas no ambiente publicado **não estão versionadas neste repositório**. Não foram incluídas nesta revisão porque a cópia exata publicada no Firebase Console não foi fornecida. Não se deve reconstruí-las por aproximação.

Antes de uso institucional, é necessário:

1. obter a cópia exata das Rules publicadas;
2. revisar o escopo de leitura e escrita de cada perfil e coleção;
3. testar as Rules em ambiente controlado, preferencialmente com Firebase Emulator Suite;
4. registrar resultados esperados e observados;
5. repetir testes de regressão após qualquer alteração;
6. versionar somente o arquivo exato que foi revisado e aprovado.

## App Check

O repositório contém configuração cliente de App Check. A existência desse arquivo não comprova que a aplicação esteja efetivamente protegida em todos os ambientes. É necessário conferir o provedor, o registro do aplicativo e as políticas aplicadas no Firebase Console.

## Contas e dados sensíveis

A criação inicial de e-mail e senha ocorre em Firebase Authentication. O painel do SIRE vincula o UID a um perfil. Dados como telefone e CNH de motoristas devem permanecer restritos ao fluxo administrativo e não devem ser publicados em documentação de apresentação, logs ou exemplos.

Nunca versionar senhas, Service Accounts, chaves privadas, tokens administrativos ou segredos de backend. A configuração pública do cliente Web Firebase não equivale a uma credencial administrativa; ainda assim, a segurança precisa estar nas Rules e nas configurações do projeto.

## Limitações do que foi verificado

- Os testes listados são manuais e foram relatados pelo responsável.
- Não há, neste registro, evidência de uma suíte automatizada completa.
- Não há confirmação de execução integral do Firebase Emulator Suite.
- Não houve auditoria independente das Rules de produção nesta revisão documental.
- Testes pontuais não permitem afirmar que o sistema é “100% seguro” ou livre de vulnerabilidades.

## Objetivo

O objetivo é reduzir acessos indevidos, limitar cada perfil ao escopo necessário e manter evidências reproduzíveis. Qualquer afirmação sobre segurança deve indicar quais Rules, ambientes e cenários foram efetivamente testados.
