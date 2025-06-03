# 🧪 Testes E2E - OpenFerramentaria

Este repositório contém testes automatizados end-to-end (E2E) utilizando [Cypress](https://www.cypress.io/) e [Cucumber](https://cucumber.io/) para validar o comportamento da aplicação [OpenFerramentaria](https://openferramentaria.openmobile.com.br/).

---

## ✅ Tecnologias Utilizadas

| Ferramenta                                                                 | Versão     | Descrição                                                      |
|----------------------------------------------------------------------------|------------|----------------------------------------------------------------|
| [Cypress](https://www.cypress.io/)                                         | ^13.8.1    | Framework moderno e rápido para testes E2E                    |
| [Cucumber BDD](https://cucumber.io/)                                       | Gherkin    | Linguagem de escrita de cenários de teste em formato natural |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | ^22.0.1 | Integração do Cucumber com o Cypress                          |
| [@cypress/webpack-preprocessor](https://github.com/cypress-io/cypress-webpack-preprocessor) | ^6.0.4     | Pré-processador de arquivos `.feature` com Webpack           |

---

## 📁 Estrutura do Projeto

```bash
openFerramentaria/
├── cypress/
│   ├── downloads/
│   ├── e2e/
│   │   ├── elements/
│   │   │   └── loginElements.js
│   │   ├── features/
│   │   │   └── login.feature
│   │   ├── pages/
│   │   │   └── loginPage.js
│   │   └── steps/
│   │       └── loginStep.js
│   ├── fixtures/
│   ├── screenshots/
│   └── support/
│       └── e2e.js
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Como Configurar e Executar Localmente

### 1. Clonar o Repositório

```bash
git clone https://github.com/bsantos27/openFerramentaria.git
cd openFerramentaria
```

### 2. Instalar as Dependências

Você pode instalar manualmente:

```bash
npm install --save-dev cypress@^13.8.1
npm install --save-dev @badeball/cypress-cucumber-preprocessor@^22.0.1
npm install --save-dev @cypress/webpack-preprocessor@^6.0.4
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
npm install --save-dev @badeball/cypress-cucumber-preprocessor/esbuild
```

Ou, se já estiver tudo listado no `package-lock.json`:

```bash
npm ci
```

### 3. Executar os Testes

Via terminal:

```bash
npm run test
```

Ou usando a interface visual do Cypress:

```bash
npx cypress open
```

---

## ⚙️ Configuração do Cypress

### `cypress.config.js`

```js
const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://openferramentaria.openmobile.com.br/",
    defaultCommandTimeout: 10000,
    specPattern: "cypress/e2e/**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
  },
});
```

---

## 🤖 Integração com Jenkins (CI/CD)

Este projeto está configurado para ser executado em pipelines Jenkins com ambiente Docker.

### `Jenkinsfile`

```groovy
pipeline {
    agent {
        docker {
            image 'cypress/included:13.8.1'
            args '-u 0:0'
        }
    }

    environment {
        CYPRESS_CACHE_FOLDER = './cache/Cypress'
    }

    stages {
        stage('Clonar repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/bsantos27/openFerramentaria.git'
            }
        }

        stage('Instalar dependências') {
            steps {
                sh 'npm ci'
                sh 'npx cypress verify'
            }
        }

        stage('Executar testes') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Salvar artefatos') {
            steps {
                archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
        failure {
            echo 'Falha nos testes!'
        }
    }
}
```

---

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

## 👨‍💻 Autor

**Bruno Costa Santos**  
Analista de Requisitos e Testes  
[GitHub: bsantos27](https://github.com/bsantos27)