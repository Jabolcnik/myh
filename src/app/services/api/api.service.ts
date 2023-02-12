import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { flatMap, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SettingsService } from 'src/app/pages/settings/settings.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private apiUrl = '';
  private token = null;

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private settingsSvc: SettingsService) {
      const settings = this.settingsSvc.getData();
      this.apiUrl = settings.baseUrl;
   }

  get(path: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      flatMap(token => {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token.access_token
        });

        return this.http.get(this.apiUrl + path, { headers });
      })
    );
  }

  post(path: string, data: any): Observable<any> {
    return this.authService.getAccessToken().pipe(
      flatMap(token => {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token.access_token
        });

        return this.http.post(this.apiUrl + path, data, { headers });
      })
    );
  }

  put(path: string, data: any): Observable<any> {
    return this.authService.getAccessToken().pipe(
      flatMap(token => {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token.access_token
        });

        return this.http.put(this.apiUrl + path, data, { headers });
      })
    );
  }

  delete(path: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      flatMap(token => {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token.access_token
        });

        return this.http.delete(this.apiUrl + path, { headers });
      })
    );
  }
}
