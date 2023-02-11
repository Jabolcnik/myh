import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = environment.auth.clientId;
  private clientSecret = environment.auth.clientSecret;
  private tokenUrl = environment.auth.authServerUrl;

  private accessToken: string | undefined;

  constructor(private http: HttpClient) { }

  getAccessToken(): Observable<any> {

    if (this.accessToken && !this.isTokenExpired()) {
      return new Observable(observer => {
        observer.next(this.accessToken);
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
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
