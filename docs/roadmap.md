# Roadmap do SIRE

> Os itens desta página são possibilidades futuras. **Não fazem parte das funcionalidades implementadas na V5.8.1** e não devem ser apresentados como entregues até que haja decisão, implementação, testes e validação de segurança.

## 1. Arquitetura Secretaria de Transportes × Escolas

### Secretaria de Transportes

Possibilidades para uma arquitetura futura:

- visão global das escolas e operações;
- cadastro e gestão de escolas, rotas, veículos e motoristas;
- administração de contas autorizadas;
- relatórios consolidados;
- gestão controlada de rotas e dados operacionais.

### Administração da Escola

Possibilidades para um perfil restrito à própria unidade:

- consultar alunos da escola;
- criar contas permitidas no escopo da unidade;
- visualizar informações operacionais da própria escola;
- consultar dados autorizados do motorista responsável;
- não administrar dados de outras escolas nem motoristas fora do escopo permitido.

A separação Secretaria/Escola precisa ser implementada nas Firestore Security Rules. Restringir telas na interface não é suficiente.

## 2. Segurança e infraestrutura

Evoluções a avaliar:

- obter e versionar a cópia exata das Firestore Security Rules após revisão;
- criar testes automatizados das Rules;
- estruturar ambiente de homologação separado da produção;
- documentar backup e recuperação;
- ampliar registros de testes funcionais e de autorização;
- avaliar automação de tarefas hoje dependentes do Firebase Console, somente com arquitetura e controles adequados.

## 3. Melhorias administrativas

Possibilidades ainda sujeitas a definição:

- validações administrativas mais abrangentes;
- associação mais robusta entre contas e cadastros de motoristas;
- prevenção de duplicidade de dados conforme as regras de negócio;
- aperfeiçoamento de fluxos de ativação e inativação;
- sincronização do estado de leitura de avisos entre dispositivos, caso necessária.

## 4. Estudos logísticos e integrações futuras

Integrações de mapas, trânsito, localização ou análise de trajetos exigem estudo prévio de viabilidade, custo, privacidade, disponibilidade de serviços e necessidade institucional.

**Na V5.8.1, o mapa é uma visualização das paradas cadastradas e de uma linha que conecta os pontos.** Não há rastreamento GPS em tempo real, navegação pelas ruas, otimização automática de trajetos, integração de trânsito em tempo real nem cálculo automático de economia de combustível.

Qualquer iniciativa futura nessas áreas deve ser tratada como projeto separado, com requisitos, avaliação de riscos, autorização e testes próprios. Este roadmap não constitui promessa de entrega nem cronograma aprovado.
