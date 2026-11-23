# Roadmap do SIRE

> Este documento registra ideias e propostas para possíveis evoluções. **Nenhum item abaixo está autorizado para desenvolvimento nesta etapa.** O objetivo é documentar possibilidades, não iniciar implementação, testes ou uma nova versão. A versão funcional estável permanece **V5.8.1 Spark**.

## 1. Propostas aprovadas para constar no planejamento

A aprovação nesta seção significa apenas que a proposta deve permanecer documentada como possibilidade futura. Não significa aprovação de execução, prazo ou compromisso de entrega.

### 1.1 Exportação de relatórios em CSV

Proposta de oferecer exportação dos dados apresentados nos relatórios administrativos:
- exportar solicitações em arquivo CSV;
- exportar a relação de alunos por rota em arquivo CSV;
- respeitar os filtros aplicados na tela;
- definir previamente as colunas e os dados incluídos em cada arquivo;
- respeitar o perfil de acesso e as permissões aplicáveis aos dados exportados.

### 1.2 Horários independentes para sábado

Na V5.8.1, a tela de rotas permite selecionar “Dia útil” ou “Sábado”, mas as paradas utilizam um único campo de horário (time). Assim, a seleção do dia altera o texto apresentado, mas não consulta um horário separado para sábado.

Proposta futura:
- permitir um horário de dia útil e outro de sábado para cada parada;
- permitir que a Administração cadastre e edite os dois horários;
- exibir o horário correspondente ao dia selecionado;
- definir como representar paradas sem operação ou sem horário aos sábados;
- preservar os horários já cadastrados durante eventual migração do modelo de dados.

### 1.3 Acessibilidade dos cards interativos

A V5.8.1 já possui melhorias de acessibilidade, mas a inspeção do código de referência identificou que os cards de acesso rápido implementados pela função homeCard() possuem acionamento por Enter, sem tratamento equivalente explícito para a tecla Espaço.

Proposta futura:
- permitir acionamento por teclado com Enter e Espaço;
- manter indicação visual clara de foco;
- preservar semântica e identificação adequadas para tecnologias assistivas;
- evitar que elementos apenas informativos sejam anunciados como controles interativos.

## 2. Propostas em análise

Os itens abaixo foram mantidos para estudo conceitual. Ainda não há decisão de execução nem definição técnica fechada.

### 2.1 GPS e localização do veículo em tempo real

Possibilidade de apresentar a localização atual dos veículos em um mapa, com atualização periódica.

Pontos que exigem estudo:
- quais perfis poderiam consultar a localização;
- como obter a posição do veículo e em qual dispositivo;
- permissões de localização, privacidade e segurança;
- conectividade, consumo de bateria e frequência de atualização;
- custos e limitações dos serviços envolvidos;
- responsabilidade operacional e uso seguro pelo motorista.

O mapa da V5.8.1 não possui rastreamento GPS em tempo real.

### 2.2 Otimização automática de trajetos

Possibilidade de estudar mecanismos que analisem a sequência das paradas e proponham trajetos mais eficientes.

Pontos que exigem estudo:
- dados de ruas, sentidos de circulação e restrições;
- distâncias e tempos reais de deslocamento;
- critérios de prioridade e necessidades dos estudantes;
- integração e custos de serviços de mapas;
- validação humana das sugestões e controle de alterações.

Uma sequência de pontos no mapa não equivale a uma rota rodoviária otimizada. A V5.8.1 não realiza esse cálculo.

### 2.3 Estimativa de economia de combustível e tempo

Possibilidade de produzir indicadores comparativos de eficiência operacional.

Pontos que exigem estudo:
- distância percorrida e metodologia de medição;
- consumo médio dos veículos;
- preço do combustível e período de referência;
- tempos estimados ou dados reais de deslocamento;
- critérios de comparação antes/depois;
- identificação explícita de estimativas, evitando apresentá-las como economia comprovada.

Essa proposta depende de dados confiáveis de deslocamento e pode se relacionar a uma futura solução de localização ou planejamento de trajetos.

### 2.4 Arquitetura Secretaria de Transportes × Escolas

Possibilidade de evoluir a estrutura atual para atender uma Secretaria com visão geral e várias unidades escolares com administração restrita.

**Secretaria de Transportes / Administração central:**
- visão global das escolas e operações;
- cadastro e gestão de escolas, rotas, veículos e motoristas;
- administração de contas autorizadas;
- relatórios consolidados;
- gestão global conforme as atribuições institucionais.

**Administração da Escola:**
- acesso restrito à própria unidade;
- consulta e gestão de alunos autorizados da escola;
- visualização de informações operacionais permitidas;
- acesso somente aos dados de motoristas e rotas autorizados;
- ausência de acesso administrativo a outras escolas.

Pontos que exigem estudo:
- modelo de vínculo entre usuários, escolas, rotas e veículos;
- definição de responsabilidades de cada perfil;
- isolamento de dados entre unidades;
- regras de autorização no Firestore;
- testes específicos de acesso indevido entre escolas;
- adaptação das telas e relatórios.

A separação deve ser garantida no backend, especialmente nas Firestore Security Rules, e não apenas pela ocultação de elementos da interface.

## 3. Melhorias não mantidas no planejamento atual

A proposta de ampliar o histórico do perfil Motorista para incluir avisos inativos e expirados foi analisada e **descartada para o planejamento atual**. Não deve ser tratada como item pendente ou compromisso futuro.

## 4. Dependências técnicas e cuidados transversais

Independentemente de qualquer decisão futura, possíveis evoluções devem considerar:
- obter a cópia exata das Firestore Security Rules publicadas antes de qualquer versionamento;
- não reconstruir regras de produção por aproximação;
- avaliar testes automatizados das Rules e uso do Firebase Emulator Suite;
- separar ambientes de desenvolvimento/homologação e produção quando aplicável;
- avaliar privacidade, segurança, custos e manutenção;
- documentar requisitos e critérios de aceite antes de qualquer implementação.

Esses pontos são recomendações de planejamento, não atividades iniciadas por este documento.

## 5. Situação da versão estável

A versão funcional de referência permanece **V5.8.1 Spark**. O roadmap não altera o código, a configuração Firebase, as Firestore Security Rules nem o site publicado.

Nenhuma proposta deste documento deve ser apresentada como funcionalidade disponível. Qualquer decisão futura de desenvolvimento deverá ser independente, autorizada, implementada e testada antes de ser anunciada como entregue.