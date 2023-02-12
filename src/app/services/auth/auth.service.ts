import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService } from 'src/app/pages/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private clientId: string;
  private clientSecret: string;
  private tokenUrl: string;

  private accessToken: string | undefined;

  constructor(
    private http: HttpClient,
    private settingsSvc: SettingsService) { 
      const settings = this.settingsSvc.getData();
      this.clientId = settings.clientId;
      this.clientSecret = settings.clientSecret;
      this.tokenUrl = settings.authUrl;
  }

  getAccessToken(): Observable<any> {

    if (this.accessToken && !this.isTokenExpired()) {
      return new Observable(observer => {
        observer.next(this.accessToken);
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  public isTokenExpired(): boolean {
    // TODO: either internal logic check token expiry time
    // or API call to check if token is stil valid
    return false;
  }
}
