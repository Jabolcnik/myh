export class SettingsModel {
  clientId: string;
  clientSecret: string;
  authUrl: string;
  baseUrl: string;

  constructor(client_id: string, client_secret: string, auth_url: string, base_url: string) {
    this.clientId = client_id;
    this.clientSecret = client_secret;
    this.authUrl = auth_url;
    this.baseUrl = base_url
  }
}
