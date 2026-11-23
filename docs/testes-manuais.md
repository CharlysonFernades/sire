# Registro de testes manuais — SIRE V5.8.1

> **Natureza do registro:** consolidação documental de verificações relatadas pelo responsável pelo projeto. Os resultados abaixo não foram executados novamente por esta branch e não representam auditoria independente.

**Versão de referência:** V5.8.1 Spark  
**Registro consolidado:** informações relatadas até 22/11/2026  
**Tipo de teste:** manual, com contas/perfis e tentativas de acesso no Firebase/SIRE, conforme os relatos disponíveis.

## 1. Resultados relatados

| ID | Cenário verificado | Resultado relatado |
|---|---|---|
| T01 | Login com conta válida e carregamento do perfil correspondente | **Aprovado** |
| T02 | Isolamento de rota: usuário tentando acessar a rota de outra conta | **Negado**, enquanto o acesso à própria rota foi permitido |
| T03 | Leitura direta de aviso marcado como inativo | **Negada**; retorno relatado: permission-denied |
| T04 | Leitura direta de registro inativo em driverPublic | **Negada**; retorno relatado: permission-denied |
| T05 | Acesso de perfil Aluno à coleção privada drivers | **Negado**, conforme relato do teste |
| T06 | Tentativa de elevar o próprio perfil de Aluno para Administrador alterando o documento em users | **Negada**, conforme relato do teste |
| T07 | Edição administrativa de rotas e paradas pela interface | **Aprovada** |
| T08 | Exibição e funcionamento visual dos atalhos do perfil Motorista | **Aprovado** |

## 2. Como interpretar esses resultados

- “Aprovado” significa que o comportamento esperado foi observado nos testes manuais relatados pelo responsável.
- Os retornos permission-denied em T03 e T04 indicam que as leituras específicas tentadas foram recusadas.
- T02 verifica o limite de acesso entre rotas no cenário descrito; não prova, isoladamente, que todas as operações de leitura e escrita estejam cobertas.
- T05 e T06 registram verificações importantes de privacidade e de prevenção de escalada de privilégios, mas não substituem uma revisão integral das Rules.
- T07 e T08 são verificações funcionais da interface, não testes de segurança.

## 3. O que este registro não comprova

Este documento não afirma que:

- todas as combinações de perfil, coleção, operação e campo foram testadas;
- existe uma suíte automatizada completa ou execução do Firebase Emulator Suite;
- as Firestore Security Rules passaram por auditoria independente;
- a configuração do App Check está efetivamente aplicada em todos os ambientes;
- não existem vulnerabilidades ou caminhos de acesso não cobertos pelos cenários acima.

As Firestore Security Rules utilizadas em produção não estão versionadas neste repositório. A revisão definitiva exige obter a cópia exata publicada no Firebase Console; não se deve reconstruir Rules por aproximação.

## 4. Retestes recomendados antes de uso institucional

| Prioridade | Cenário adicional | Objetivo |
|---|---|---|
| Alta | Aluno tentando alterar role ou routeId no próprio documento | Confirmar que campos de autorização não podem ser modificados pelo usuário |
| Alta | Motorista tentando ler ou escrever dados de outra rota | Confirmar o isolamento também nas operações de escrita |
| Alta | Aluno tentando consultar solicitações de outra conta | Confirmar a proteção por proprietário da solicitação |
| Alta | Usuário inativo tentando autenticar e consultar dados | Confirmar o comportamento combinado do Authentication, perfil e Rules |
| Média | Tentativas de gravar campos não permitidos em rotas, paradas e avisos | Confirmar validação no backend |
| Média | Exclusão ou alteração indevida de histórico | Confirmar a integridade dos registros |
| Média | Repetição dos fluxos legítimos após os testes de bloqueio | Verificar regressões funcionais |

## 5. Procedimento para atualizar este registro

Para cada novo teste, registrar:

1. versão e ambiente usados;
2. perfil e conta de teste;
3. coleção/documento e operação tentada, sem registrar senhas ou segredos;
4. resultado esperado;
5. resultado observado e mensagem de erro, quando houver;
6. data do teste e responsável;
7. evidência sem dados pessoais desnecessários.

Não marcar cenários como aprovados apenas porque a interface escondeu um botão. Para validar autorização, testar a operação no backend/Firestore com a identidade e o contexto adequados.
