pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Changed from sh to bat because your Jenkins runs on Windows
                bat 'npm install'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    // Changed from sh to bat because your Jenkins runs on Windows
                    bat 'npx cucumber-js'
                }
            }
        }
    }

    post {
        always {
            // This builds your visual charts report webpage inside Jenkins
            cucumber fileIncludePattern: 'cucumber_report.json',
                     jsonReportDirectory: '.'
        }
    }
}