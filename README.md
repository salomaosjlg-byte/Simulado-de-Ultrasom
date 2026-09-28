# Simulado de Ultrassom

Projeto de simulado interativo para revisão de conteúdos de ultrassonografia, com perguntas, timer por questão e feedback final.

## Funcionalidades

- Simulado com 10 questões em português
- Tempo por questão de 30 segundos
- Resultado final com percentual de acertos
- Layout responsivo e moderno
- Sem dependências externas de build

## Como executar

1. Abra o arquivo `index.html` no navegador, ou
2. Rode um servidor local na pasta do projeto:

```bash
cd /workspaces/Simulado-de-Ultrasom
python3 -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

## Estrutura do projeto

- `index.html` — estrutura da interface
- `styles.css` — estilos e responsividade
- `script.js` — lógica do simulado e perguntas
- `.gitignore` — arquivos ignorados pelo Git

## Observação

O projeto foi validado com o GitHub e o repositório remoto configurado corretamente para a conta autenticada. O branch principal está sincronizado com o remote.
