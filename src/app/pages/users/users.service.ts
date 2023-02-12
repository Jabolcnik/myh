import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AbsenceDefinition } from "src/app/models/absenceDefinition.interface";
import { ApiService } from "src/app/services/api/api.service";
import { environment as env } from "src/environments/environment";

@Injectable()
export class UsersService  {

  usersData = new Subject<any[]>();
  constructor(private api: ApiService) { }

  getUsersData(searchString?: string) {

    if (searchString && searchString.length > 0) {
      const q: any = {
        searchTerm: searchString
      };
      const qs = '?' + new URLSearchParams(q).toString()

      this.api.get(`${env.apis.users.query}${qs}`).subscribe(data => {
        this.usersData.next(data);
      });
      
    } else {
      this.api.get(`${env.apis.users.base}`).subscribe(data => {
        this.usersData.next(data);
      });
    }
  }

  addUser(user: any) {
    return this.api.post(`${env.apis.users.base}`, user);
  }

  addUserAbsence(absence: any) {
    const dtNow = new Date();
    const abs: any = {
      userId: absence.userId,
      absenceDefinitionId: absence.reason,
      // TODO: bring this to the form
      partialTimeFrom: dtNow.toISOString(),
      timestamp: dtNow.toISOString(),
    };

    return this.api.post(`${env.apis.absences.base}`, abs);
  }

}