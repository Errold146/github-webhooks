import express from 'express'
import { envs } from './config'
import { GithubController, GitHubSha256Middleware } from './presentation'

( () => {
    main()
})()

function main() {

    const app = express()
    const controller = new GithubController()

    app.use( express.json() )
    app.use( GitHubSha256Middleware.verifyGitHubSignature )

    app.post('/api/github', controller.webhookHandler )

    app.listen( envs.PORT, () => console.log(`App running on port: ${ envs.PORT }`) )
}
