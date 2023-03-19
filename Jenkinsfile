def phx_secret
pipeline {
  agent {
    label "backend"
  }
  environment {
    MIX_ENV = "prod"
  }
  stages {
    stage ('Creates PATH echoer file') {
      steps {
        sh '''#!/bin/bash -e
          echo "#!/bin/bash -e" > $HOME/echo_path.sh
          echo "source $HOME/.bashrc > /dev/null" >> $HOME/echo_path.sh
          echo 'echo "$(printenv | grep PATH= | sed s/PATH=//)"' >> $HOME/echo_path.sh
          chmod +x $HOME/echo_path.sh
        '''
      }
    }
    stage ('Set PATH environment variable') {
      steps {
        script {
          env.PATH = sh (
            script: '$HOME/echo_path.sh',
            returnStdout: true
          ).trim()
        }
      }
    }
    stage ('Install Dependencies') {
      steps {
        echo "New PATH: ${env.PATH}"

        sh 'asdf install'

        sh 'mix local.hex --force'
        sh 'mix local.rebar --force'
        sh 'mix deps.get --only prod'
      }
    }
    stage ('Load Secret value') {
      steps {
        script {
          phx_secret = sh (script: "$HOME/pix_secret.sh", returnStdout: true).trim()
          echo "PHX Secret: ${phx_secret}"
        }
      }
    }
    stage ('Load local environment file') {
      steps {
        sh '${HOME}/landing_page_env.sh > .env.prod'
        // Add SECRET_KEY_BASE
        sh "echo 'SECRET_KEY_BASE = ${phx_secret}' >> .env.prod"
      }
    }
    stage ('Stop running process') {
      when { expression { return fileExists('_build/prod/rel/landing_page/bin/landing_page') } }
      steps {
        echo 'Stopping server...'
        script {
          try {
            sh '_build/prod/rel/landing_page/bin/landing_page stop'
          } catch (error) {
            echo "Caugh: ${error}"
          }
        }
      }
    }
    stage ('Build') {
      steps {
        sh 'mix compile'
        sh 'mix assets.deploy'
        sh 'mix phx.gen.release'
        sh 'mix release --overwrite'
      }
    }
    stage ('Run') {
      steps {
        script {
          env.JENKINS_NODE_COOKIE = 'dontKillMe' // this is necessary for the Gradle daemon to be kept alive
        }
        sh '_build/prod/rel/landing_page/bin/landing_page daemon'
      }
    }
  }
}
