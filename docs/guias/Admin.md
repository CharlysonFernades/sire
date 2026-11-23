# Guia rápido — Administrador

O manual completo está disponível em [Admin.pdf](Admin.pdf).

## Módulos principais

- **Dashboard:** indicadores gerais e solicitações recentes.
- **Contas e acessos:** vínculo entre UID do Firebase Authentication e perfil SIRE.
- **Solicitações:** consulta, resposta e atualização de status.
- **Rotas:** cadastro e edição de número, nome e escola, com controle de situação.
- **Paradas:** cadastro, edição, remoção, horários, coordenadas opcionais e organização da sequência.
- **Motoristas:** cadastro administrativo e sincronização dos dados necessários aos fluxos públicos.
- **Notificações:** publicação geral ou por rota, validade, filtros, ativação e histórico.
- **Relatórios:** filtros por rota, tipo de solicitação, situação e período; indicadores operacionais e alunos por rota, incluindo ativos/inativos.

## Criação de conta na arquitetura atual

1. Crie o usuário no Firebase Authentication pelo Firebase Console.
2. Copie o UID gerado.
3. No SIRE, abra **Contas e acessos**.
4. Informe UID, nome, e-mail, perfil e rota quando aplicável.
5. Para Motorista, informe os dados administrativos solicitados pelo cadastro.
6. Vincule o perfil.

A criação da senha ocorre no Firebase Authentication, não no formulário do SIRE. O vínculo do perfil no painel não substitui a configuração das permissões nas Firestore Security Rules.
