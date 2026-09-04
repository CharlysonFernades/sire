# Funcionalidades do SIRE

## Login institucional

- acesso por e-mail e senha;
- integração com Firebase Authentication;
- mostrar/ocultar senha;
- recuperação de senha;
- perfil carregado após autenticação.

## Página inicial

A página inicial é personalizada conforme o perfil e prioriza atalhos operacionais.

### Aluno

- Rotas;
- Atendimento;
- Acompanhar solicitações;
- Avisos.

### Motorista

- Rotas;
- Horários;
- Publicar aviso;
- Histórico de avisos;
- Ajuda.

### Administrador

- visão geral;
- atalhos administrativos;
- acesso ao painel completo de gestão.

## Rotas e horários

- consulta da rota vinculada para Aluno/Motorista;
- seleção e pesquisa de rotas pelo Administrador;
- exibição de número, nome, escola, motorista e veículo;
- tabela com paradas e horários previstos;
- mapa da rota quando existem coordenadas válidas;
- gestão administrativa de rotas;
- gestão de paradas e horários.

## Avisos

- sino com contador de avisos não lidos;
- abertura automática dos novos avisos depois do login;
- avisos gerais e por rota;
- resumo e conteúdo completo;
- data/hora, tipo, responsável e destino;
- publicação de avisos pelo Motorista para a própria rota;
- central administrativa com validade, filtros, desativação e reativação.

### Limitação atual

O estado de leitura dos avisos é armazenado localmente no navegador e não é sincronizado entre dispositivos.

## Atendimento e protocolos

A Central de Ajuda permite registrar:

- reclamação;
- sugestão;
- elogio;
- dúvida.

Cada solicitação recebe um protocolo no formato `SIRE-ANO-CÓDIGO` e segue um fluxo de status:

```text
Recebido -> Em análise -> Respondido -> Resolvido
```

Usuários não administrativos consultam apenas solicitações vinculadas à própria conta.

## Painel do Motorista

O painel concentra:

- rota designada;
- veículo associado;
- mapa;
- paradas;
- horários previstos;
- publicação de avisos;
- histórico dos comunicados da rota.

## Painel Administrativo

### Dashboard

Indicadores gerais e solicitações recentes.

### Contas e acessos

Vincula um UID já existente no Firebase Authentication a um perfil do SIRE.

### Solicitações

Consulta, resposta e atualização de status.

### Rotas

Cadastro e edição de número, nome e escola.

### Paradas

Cadastro, edição, remoção e organização de paradas e horários. Latitude/longitude são opcionais, mas precisam ser informadas em conjunto para exibição no mapa.

### Motoristas

Cadastro administrativo e sincronização de uma versão pública reduzida dos dados.

### Notificações

Publicação geral ou por rota, definição de validade, filtros de histórico, desativação e reativação sem apagar o registro.

### Relatórios

Indicadores operacionais e quantidade de alunos por rota.