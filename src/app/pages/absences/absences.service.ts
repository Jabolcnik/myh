import { Injectable } from "@angular/core";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { ApiService } from "src/app/services/api/api.service";
import { environment as env } from "src/environments/environment";
import {formatDate} from '@angular/common';

@Injectable()
export class AbsencesService {
  absenceData = new Subject<any[]>();
  constructor(private api: ApiService) {
  }
  
  
  getAbsencesData(date: NgbDate) {

    const q: any = {
      dateFrom: formatDate(new Date(date.year, date.month, date.day), 'yyyy-MM-dd', 'en-US'),
      dateTo: formatDate(new Date(date.year, date.month, date.day+1), 'yyyy-MM-dd', 'en-US'),
    };
    
    const qs = '?' + new URLSearchParams(q).toString();

    this.api.get(`${env.apis.absences.base}${qs}`).subscribe(data => {
      console.log(data);
      this.absenceData.next(data);
    });
  }
}
