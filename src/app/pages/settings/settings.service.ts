import { Injectable } from "@angular/core";
import { SettingsModel } from "./settings.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() {}

  saveData(data: SettingsModel) {
    localStorage.setItem("clientId", data.clientId);
    localStorage.setItem("clientSecret", data.clientSecret);
    localStorage.setItem("authUrl", data.authUrl);
    localStorage.setItem("baseUrl", data.baseUrl);
  }

  getData(): SettingsModel {
    const s = new SettingsModel(
      localStorage.getItem('clientId') || '',
      localStorage.getItem('clientSecret') || '',
      localStorage.getItem('authUrl') || '',
      localStorage.getItem('baseUrl') || ''
    );

    return s;
  }

  isSettingsSet(): boolean {
    const data = this.getData();
    if (data.authUrl && data.authUrl.length
      && data.baseUrl && data.baseUrl.length
      && data.clientSecret && data.clientSecret.length
      && data.clientId && data.clientId.length ) {
      return true;
    }
    return false;
  }
}