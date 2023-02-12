import { AfterViewInit, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SettingsModel } from "./settings.model";
import { SettingsService } from "./settings.service";

@Component({
  selector: 'app-settings-component',
  templateUrl: './settings.component.html',
  providers: [SettingsService]
})
export class SettingsComponent implements AfterViewInit {
  private dataInStorage?: SettingsModel;
  constructor(
    private settingsSvc: SettingsService,
    private router: Router) {

    }
  
  public settingsForm: FormGroup = new FormGroup({
    clientId: new FormControl(this.dataInStorage?.clientId),
    clientSecret: new FormControl(this.dataInStorage?.clientSecret),
    authUrl: new FormControl(this.dataInStorage?.authUrl),
    baseUrl: new FormControl(this.dataInStorage?.baseUrl)
  });

  ngAfterViewInit(): void {
    if (this.settingsSvc.isSettingsSet()) {
      this.dataInStorage = this.settingsSvc.getData();
      this.settingsForm.controls['clientId'].setValue(this.dataInStorage.clientId);
      this.settingsForm.controls['clientSecret'].setValue(this.dataInStorage.clientSecret);
      this.settingsForm.controls['authUrl'].setValue(this.dataInStorage.authUrl);
      this.settingsForm.controls['baseUrl'].setValue(this.dataInStorage.baseUrl);
    }
  }

  submitForm() {
    if (!this.settingsForm.valid) {
      return;
    }
    const val = this.settingsForm.value;
    console.log(this.settingsForm.controls['clientSecret'].value);
    console.log(val);
    const settingsData = new SettingsModel(
      val.clientId, 
      val.clientSecret, 
      val.authUrl,
      val.baseUrl
    );

    this.settingsSvc.saveData(settingsData);

    this.router.navigate(['users']);
  }
}
