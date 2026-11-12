def runCommand(String command) {
    if (isUnix()) {
        sh command
    } else {
        bat command
    }
}

def deployToVercel(boolean production) {
    def command = 'node node_modules/.jenkins-vercel/node_modules/vercel/dist/vc.js deploy --non-interactive --meta githubDeployment=1 --meta githubCommitRef=main'
    if (production) {
        command += ' --prod'
    }
    withCredentials([string(credentialsId: 'portfolio-vercel-token', variable: 'VERCEL_TOKEN')]) {
        runCommand(command)
    }
}

pipeline {
    agent any

    tools {
        nodejs 'NodeJS 24'
    }

    options {
        skipDefaultCheckout()
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        CI = 'true'
        VERCEL_ORG_ID = 'team_6lHOppwQ5Ucd6uyMqwCTr9di'
        VERCEL_PROJECT_ID = 'prj_xA67qhJGnS9GYvUWyMEbOi99ESVA'
    }

    stages {
        stage('Checkout main') {
            steps {
                deleteDir()
                script {
                    def revision = checkout scm
                    if (revision.GIT_BRANCH != 'origin/main') {
                        error("Expected origin/main, checked out ${revision.GIT_BRANCH}")
                    }
                    echo "Building ${revision.GIT_COMMIT}"
                }
            }
        }

        stage('Verify build') {
            steps {
                script {
                    runCommand('node -e "if (process.versions.node.split(\'.\')[0] !== \'24\') throw new Error(\'Node.js 24 is required\')"')
                    runCommand('npm --version')
                    retry(2) {
                        runCommand('npm ci')
                    }
                    runCommand('npm run build')
                    runCommand('npm install --prefix node_modules/.jenkins-vercel --no-save --no-package-lock vercel@65.15.0')
                }
            }
        }

        stage('Deploy preview') {
            when {
                not { triggeredBy 'SCMTrigger' }
            }
            steps {
                script {
                    deployToVercel(false)
                }
            }
        }

        stage('Deploy production') {
            when {
                triggeredBy 'SCMTrigger'
            }
            steps {
                script {
                    deployToVercel(true)
                }
            }
        }
    }
}
