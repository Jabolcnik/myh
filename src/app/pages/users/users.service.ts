import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApiService } from "src/app/services/api/api.service";
import { environment as env } from "src/environments/environment";

@Injectable()
export class UsersService  {

  usersData = new Subject<any[]>();
  constructor(private api: ApiService) {
    
  }

  getUsersData(searchString?: string) {

    if (searchString && searchString.length > 0) {
      const q: any = {
        searchTerm: searchString
      };
      const qs = '?' + new URLSearchParams(q).toString()

      this.api.get(`${env.apis.users.query}${qs}`).subscribe(data => {
        console.log(data);
        this.usersData.next(data);
      });
      
    } else {
      this.api.get(`${env.apis.users.base}`).subscribe(data => {
        console.log(data);
        this.usersData.next(data);
      });
    }
  }

  addUser(user: any) {
    return this.api.post(`${env.apis.users.base}`, user);
  }

}