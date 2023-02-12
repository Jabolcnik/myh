import { Injectable } from "@angular/core";
import { AbsenceDefinition } from "src/app/models/absenceDefinition.interface";
import { ApiService } from "../api/api.service";
import { environment as env } from "src/environments/environment";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CodelistsService {
  absenceDefinitions = new Subject<AbsenceDefinition[]>();

  constructor(private api: ApiService) {
    this.loadAbsenceDefinitions();
  }

  private loadAbsenceDefinitions(): void {
    this.api.get(`${env.apis.codelists.absenceDefinition}`).subscribe(definitions => {
      this.absenceDefinitions.next(definitions);
    });
  }
}
