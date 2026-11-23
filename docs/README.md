# Documentação do SIRE

Esta pasta reúne a documentação técnica, os materiais de apresentação, os registros de testes e os guias de utilização do **SIRE — Sistema Integrado de Rotas Escolares**.

> **Versão funcional documentada: V5.8.1 Spark.** A revisão documental desta branch não cria uma nova versão funcional nem altera o site.

## Visão geral e apresentação

- [Resumo para apresentação e roteiro de demonstração](apresentacao.md)
- [Funcionalidades implementadas](funcionalidades.md)
- [Registro de testes manuais relatados](testes-manuais.md)

## Documentação técnica

- [Arquitetura do sistema](arquitetura.md)
- [Segurança e controle de acesso](seguranca.md)
- [Roadmap e itens planejados](roadmap.md)

## Guias de utilização

- [Guia rápido do Aluno](guias/Aluno.md) · [Manual em PDF](guias/Aluno.pdf)
- [Guia rápido do Motorista](guias/Motorista.md) · [Manual em PDF](guias/Motorista.pdf)
- [Guia rápido do Administrador](guias/Admin.md) · [Manual em PDF](guias/Admin.pdf)

## Histórico

- [Histórico de versões do sistema e alterações documentais](../CHANGELOG.md)

## Critério de leitura

Os documentos distinguem:

- **Implementado:** funcionalidade descrita para a V5.8.1;
- **Planejado:** possibilidade futura que ainda não deve ser apresentada como entregue;
- **Dependente de configuração externa:** comportamento que também depende do Firebase Console, das Firestore Security Rules ou de serviços externos;
- **Teste manual relatado:** cenário informado pelo responsável do projeto, sem sugerir que foi reexecutado ou auditado de forma independente nesta revisão documental.

A existência de uma funcionalidade na interface não comprova, por si só, que a autorização correspondente está corretamente configurada no backend. A documentação de segurança explicita essa diferença.
