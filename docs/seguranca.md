# Segurança e controle de acesso

## Princípio central

A interface do SIRE separa funcionalidades por perfil, mas **ocultar botões ou páginas no HTML não constitui autorização de segurança**. O controle definitivo precisa ser aplicado no backend, principalmente por meio das Firestore Security Rules.

## Medidas observadas na versão atual

- autenticação por Firebase Authentication;
- perfil obtido do cadastro do usuário, em vez de ser escolhido na tela de login;
- Aluno/Motorista carregam dados associados à própria rota;
- solicitações de usuários não administrativos são consultadas pelo `ownerUid`;
- dados privados de motoristas ficam separados da coleção pública;
- contas possuem status Ativo/Inativo no cadastro do SIRE;
- configuração cliente de Firebase App Check presente no repositório.

## Dados sensíveis

Telefone e CNH de motoristas pertencem ao fluxo administrativo e ficam em `drivers`. A coleção `driverPublic` contém somente os campos necessários para os fluxos autorizados.

## Security Rules

As Firestore Security Rules não estão versionadas no repositório atual. Por isso, este documento **não afirma que o sistema é invulnerável nem que as Rules publicadas estão corretas**.

Antes de uso institucional, as Rules devem ser revisadas e testadas em ambiente controlado.

## Casos recomendados para auditoria

- aluno tentando ler rota de outro aluno;
- aluno tentando alterar `role` ou `routeId`;
- motorista tentando publicar aviso para outra rota;
- motorista tentando modificar rotas/paradas;
- leitura de `drivers` por Aluno/Motorista;
- consulta de solicitações de outro usuário;
- gravação de campos não permitidos;
- exclusão indevida de histórico;
- conta inativa tentando acessar dados;
- tentativa de escalada para Administrador;
- tentativa de criar/alterar documentos diretamente pelo SDK/DevTools.

## Metodologia recomendada

1. congelar uma versão do sistema;
2. executar testes automatizados com Firebase Emulator Suite;
3. testar perfis diferentes e documentos fora do escopo;
4. registrar resultado esperado e obtido;
5. corrigir código/Rules;
6. executar reteste;
7. fazer testes de regressão das funcionalidades legítimas.

## App Check

O repositório possui configuração cliente de App Check. A presença do arquivo não prova, por si só, que a proteção esteja efetivamente aplicada: isso também depende do estado e das políticas configuradas no Firebase Console.

## Segredos

O arquivo de configuração Web Firebase pode ser público. Entretanto, nunca devem ser versionados:

- senha de usuário;
- Service Account;
- chave privada;
- token administrativo;
- segredo de backend.

## Objetivo de segurança

A meta correta não é prometer “100% seguro”, e sim reduzir a superfície de ataque, bloquear acessos fora do escopo e validar os controles com testes reproduzíveis.