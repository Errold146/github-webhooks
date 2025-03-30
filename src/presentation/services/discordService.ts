import { envs } from "../../config";

export class DiscordService {

    private readonly discordWebHookUrl = envs.DISCORD_WEBHOOK_URL

    constructor(){}

    async notify( message: string ) {
        const body = {
            content: message,
            // embeds: [
            //     {
            //         image: { url: 'https://www.bleepstatic.com/content/hl-images/2024/06/06/GitHub.jpg' }
            //     }
            // ]
        }

        const resp = await fetch( this.discordWebHookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( body ),
        })

        if ( !resp.ok ) {
            console.log('Error sending message to discord')
            return false
        }

        return false
    }
}