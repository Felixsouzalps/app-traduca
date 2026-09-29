# Traduca App

Aplicativo mobile do **Traduca Idiomas**, desenvolvido com React Native e Expo para apoiar a experiência dos alunos no acompanhamento de aulas, atividades, agenda, curso e materiais.

O projeto faz parte do sistema Traduca Idiomas e está preparado para consumir a API do backend Laravel do projeto.

## 📱 Sobre o aplicativo

O Traduca App centraliza recursos acadêmicos e de acompanhamento do aluno em uma interface mobile.

Principais áreas do aplicativo:

* **Início** — acesso rápido às principais funcionalidades.
* **Aulas** — acesso às aulas e recursos relacionados ao curso.
* **Agenda** — visualização dos compromissos e aulas agendadas.
* **Atividades** — acompanhamento das atividades disponibilizadas pelo professor.
* **Curso** — informações relacionadas ao curso e idioma estudado.
* **Materiais** — acesso aos materiais de apoio.
* **IA** — integração com os recursos de inteligência artificial do Traduca.
* **Progresso** — acompanhamento do desempenho e evolução do aluno.
* **Perfil** — informações e configurações da conta.
* **Notificações** — comunicação de atualizações importantes para o aluno.
* **Reagendamento** — solicitação de alteração de aula com comunicação ao professor.

## 🛠️ Tecnologias

* React Native
* Expo SDK 57
* TypeScript
* Expo Router
* React Native Reanimated
* React Native Gesture Handler
* React Native SVG
* Expo Image
* API REST em Laravel

## 📂 Estrutura do projeto

A aplicação utiliza o **Expo Router** para navegação baseada em arquivos.

```text
traduca-app/
├── app/              # Telas e rotas da aplicação
├── components/       # Componentes reutilizáveis
├── styles/           # Estilos e variáveis visuais
├── assets/           # Imagens, ícones e recursos
├── app.json          # Configurações do Expo
├── package.json      # Dependências e scripts
└── tsconfig.json     # Configuração do TypeScript
```

## 🚀 Como executar

### Pré-requisitos

Tenha instalado:

* Node.js
* npm
* Expo
* Android Studio ou um dispositivo Android, caso queira executar no Android

### Instalação

Clone o repositório:

```bash
git clone https://github.com/Felixsouzalps/app-traduca.git
```

Entre na pasta:

```bash
cd app-traduca
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npx expo start
```

Depois, escolha uma das opções apresentadas pelo Expo para executar o aplicativo.

## 🔌 Integração com a API

O aplicativo foi desenvolvido para trabalhar em conjunto com o backend do **Traduca Idiomas**.

A comunicação com a API permite centralizar dados como:

* autenticação do aluno;
* aulas e agenda;
* atividades e respostas;
* curso e idioma;
* materiais;
* progresso;
* notificações;
* recursos de inteligência artificial.

A URL da API deve ser configurada de acordo com o ambiente em que o aplicativo estiver sendo executado.

> Não coloque credenciais, senhas ou chaves privadas diretamente no código-fonte.

## 🎨 Interface

O aplicativo utiliza uma identidade visual própria do Traduca Idiomas, com componentes reutilizáveis, ícones e animações para tornar a navegação mais fluida.

As transições e interações são desenvolvidas principalmente com recursos do **React Native Reanimated** e componentes de interação do React Native.

## 📚 Funcionalidades

O aplicativo está sendo desenvolvido para oferecer uma experiência completa ao aluno, incluindo:

* acompanhamento das aulas;
* calendário e agenda;
* reagendamento de aulas;
* atividades;
* materiais de estudo;
* conteúdos em áudio;
* materiais de leitura;
* acompanhamento do curso;
* notificações;
* progresso acadêmico;
* integração com inteligência artificial;
* comunicação com o backend Laravel.

## 📌 Status do projeto

Projeto acadêmico em desenvolvimento para o **Traduca Idiomas**.

Novas funcionalidades, integrações com o backend e melhorias de interface continuam sendo implementadas durante o desenvolvimento.

## 👥 Projeto

**Traduca Idiomas**

Aplicativo desenvolvido como parte do projeto acadêmico do **Senac**.

---

## 📄 Licença

Este projeto possui um arquivo de licença no repositório. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.
