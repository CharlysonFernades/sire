# Registro de testes manuais — SIRE V5.8.1

> Registro organizado em 22/11/2026 para a revisão pré-apresentação. Os resultados abaixo foram informados pelo responsável pelo projeto durante os testes; não representam uma execução independente feita por este documento.

## Resultado dos testes reportados

| Área | Verificação | Resultado informado |
|---|---|---|
| Autenticação | Login com as contas de teste/perfis | Aprovado |
| Administração | Edição de rotas e paradas | Aprovado |
| Navegação do Motorista | Atalhos Horários, Publicar aviso e Histórico posicionam as caixas corretamente | Aprovado |
| Controle de acesso | Tentativa de ação/acesso não autorizado pelas ferramentas do navegador (F12) | Bloqueada; o sistema retornou permissão negada |
| Regressão | Responsável informou que todos os testes planejados foram concluídos com aprovação | Aprovado, conforme relato |

## Limites deste registro

- São testes manuais reportados pelo responsável do projeto.
- Não há evidência de execução do Firebase Emulator Suite nesta revisão.
- As Firestore Security Rules efetivamente publicadas ainda não estão versionadas neste repositório; não foram reconstruídas a partir de descrições ou lembranças.
- A verificação automatizada adicionada na candidata V5.8.2 valida apenas a sintaxe do JavaScript inline do `index.html`. Ela não testa login real, Firestore, App Check ou autorização.

## Checklist recomendado para a demonstração

- [ ] Entrar com uma conta de Aluno e mostrar apenas a rota vinculada.
- [ ] Entrar com uma conta de Motorista e mostrar horários, paradas e avisos da própria rota.
- [ ] Demonstrar que o Motorista não precisa operar o sistema enquanto dirige; qualquer aviso deve ser publicado somente com o veículo parado em local seguro.
- [ ] Entrar com Administrador e demonstrar edição de rotas/paradas e relatórios.
- [ ] Demonstrar o fluxo de envio e acompanhamento de uma solicitação.
- [ ] Repetir a tentativa de acesso fora do escopo e confirmar a negativa de permissão.
- [ ] Conferir a versão e o carregamento do site publicado antes de iniciar.

## Próximas evidências técnicas recomendadas

1. Exportar do Firebase Console a cópia exata das Firestore Security Rules atualmente publicadas.
2. Versionar essa cópia no repositório após conferência.
3. Criar testes automatizados das Rules com Firebase Emulator Suite.
4. Registrar navegador, perfil utilizado, ação executada, resultado esperado e resultado observado em cada rodada futura.
