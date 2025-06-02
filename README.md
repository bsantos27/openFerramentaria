# 🧪 Testes E2E - OpenFerramentaria

Este projeto contém testes automatizados end-to-end (E2E) usando [Cypress](https://www.cypress.io/) e [Cucumber](https://cucumber.io/) para validar o funcionamento do sistema [OpenFerramentaria](https://openferramentaria.openmobile.com.br/).

---

## ✅ Tecnologias Utilizadas

| Ferramenta                                                                 | Versão     | Descrição                                                         |
|----------------------------------------------------------------------------|------------|-------------------------------------------------------------------|
| [Cypress](https://www.cypress.io/)                                         | ^13.8.1    | Framework de testes E2E moderno e rápido                         |
| [Cucumber BDD](https://cucumber.io/)                                       | Gherkin    | Linguagem natural para definição de testes                       |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | ^22.0.1 | Plugin oficial BDD para Cypress                                 |
| [@cypress/webpack-preprocessor](https://github.com/cypress-io/cypress-webpack-preprocessor) | ^6.0.4     | Pré-processador para arquivos feature com Webpack               |

---

## 📁 Estrutura esperada do projeto

```
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

## 🚀 Como configurar e rodar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/bsantos27/openFerramentaria.git
cd openFerramentaria
```

### 2. Instalar dependências

```bash
npm ci
```

### 3. Rodar os testes

```bash
npm run test
```

Ou com a interface visual:

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


## 🤖 Integração com Jenkins (CI/CD)

Este projeto está preparado para rodar os testes automaticamente no Jenkins via Docker.

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

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 👨‍💻 Autor

**Bruno Costa Santos**  
Analista de Requisitos e Testes  
[GitHub](https://github.com/bsantos27)