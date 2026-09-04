# Roadmap do SIRE

> Os itens desta página são planejados. Não devem ser apresentados como concluídos até serem implementados, testados e cobertos pelas regras de segurança.

## Arquitetura Secretaria de Transportes × Escolas

### Secretaria de Transportes

Visão global do sistema, com possibilidade futura de:

- cadastrar e administrar escolas;
- cadastrar rotas, veículos e motoristas;
- criar contas administrativas autorizadas;
- consultar alunos e operações de todas as escolas;
- gerar indicadores consolidados;
- editar rotas de forma controlada.

### Administração da Escola

Acesso limitado à própria unidade, com possibilidade futura de:

- consultar apenas alunos da escola;
- criar contas de Aluno e perfis administrativos internos permitidos;
- visualizar dados operacionais da própria escola;
- consultar contato autorizado do motorista responsável;
- não administrar motoristas ou escolas fora do próprio escopo.

## Segurança da nova arquitetura

A separação Secretaria/Escola deve existir nas Firestore Security Rules. A interface não deve ser considerada a fonte de autorização.

Os testes devem incluir tentativas de uma escola acessar alunos, rotas e dados administrativos de outra escola.

## Melhorias administrativas

- edição de rotas com validação de campos permitidos;
- associação mais robusta entre conta de motorista e cadastro existente;
- prevenção de duplicidade por CNH conforme regras de negócio;
- reforço do fluxo de status Ativo/Inativo;
- automação de tarefas operacionais que hoje dependem do Firebase Console, quando houver arquitetura segura para isso.

## Evoluções de infraestrutura

- versionar Firestore Security Rules no repositório;
- criar testes automatizados das Rules;
- estruturar ambiente de homologação separado da produção;
- documentar processo de backup/recuperação;
- sincronizar estado de leitura de avisos entre dispositivos, caso seja necessário.

## Evoluções logísticas

Possíveis integrações futuras podem apoiar análise de rotas, tempo de viagem e condições de trânsito. Essas funções dependem de custo, privacidade, disponibilidade de API e avaliação institucional antes da adoção.