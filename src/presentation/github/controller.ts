import type { Request, Response } from "express";
import { DiscordService, GitHubService } from "../services";

export class GithubController {

    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService()
    ){}

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const payload = req.body;

        let message: string = '';

        switch (githubEvent) {
            case 'star':
                message = this.githubService.onStart(payload);
                break;

            case 'issues':
                message = this.githubService.onIssue(payload);
                break;

            default:
                message = `Unknown event ${githubEvent}.`;
                break;
        }

        
        this.discordService.notify(message)
            .then(() => res.status(202).send({ message }))
            .catch(() => res.status(500).json({ error: 'Internal server error' }))
    };
}