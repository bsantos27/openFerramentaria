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
                echo 'Instalando dependências do Cypress com Cucumber...'
                sh 'npm ci'
                sh 'npx cypress verify'
                sh 'npx cypress info'
            }
        }

        stage('Executar testes E2E') {
            steps {
                echo 'Executando testes com Cypress e Cucumber...'
                sh 'npm run test'
            }
        }
    }

    post {
        always {
            echo 'Finalizando pipeline...'
        }
        failure {
            echo 'O pipeline falhou. Verifique os testes.'
        }
    }
}
