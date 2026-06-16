pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // This pulls your latest code from your GitHub repository automatically
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs your npm packages and the Playwright browsers
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                // Runs cucumber and catches errors so the pipeline doesn't stop before reporting
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'npx cucumber-js'
                }
            }
        }
    }

    post {
        always {
            // 1. This generates your beautiful, visual Cucumber HTML report page
            cucumber buildStatus: 'null', 
                     reportFiles: 'cucumber_report.json', 
                     fileIncludePattern: '**/*.json'
            
            // 2. This pushes your test results automatically back to Jira/Xray
            // Note: Replace 'Your-Jira-Config-Name' with your actual Jenkins Jira instance name
            xrayImportResults fileFormat: 'CUCUMBER', 
                              resultsFile: 'cucumber_report.json', 
                              serverInstance: 'Your-Jira-Config-Name'
        }
    }
}