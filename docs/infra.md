# Infraestrutura do Projeto

Este documento registra as principais decisões de infraestrutura adotadas no desenvolvimento do Systemic, com foco em estabilidade, simplicidade de implantação e suporte à demonstração remota.

## Decisões Técnicas

- **Ambiente de execução:** Node.js 24.13.1LTS (versão estável), visando previsibilidade e compatibilidade com as bibliotecas utilizadas.
- **Organização do projeto:** Estrutura em monorepo, separando client, server e documentação, facilitando o desenvolvimento integrado e o processo de deploy.
- **Implantação:** Aplicação implantada como Web Service na plataforma Render, permitindo acesso remoto via navegador e suporte nativo a WebSocket.
- **Comunicação em tempo real:** Sincronização entre clientes realizada via WebSocket (Socket.IO), com modelo cliente–servidor autoritativo.

Estas escolhas visam reduzir complexidade operacional e concentrar o foco do trabalho na arquitetura de software, modelagem do estado do jogo e validação das regras cooperativas.