import { OAuth2Client } from "google-auth-library";


export default class GoogleService {
    private client: OAuth2Client;

    constructor() {
        this.client = new OAuth2Client(process.env.GOOGLE_ANDROID_CLIENT_ID);
    }

    async verifyGoogleToken(token: string) {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ANDROID_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        return payload;
    }
}