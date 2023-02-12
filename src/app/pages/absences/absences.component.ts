import { Component, OnInit } from "@angular/core";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { AbsencesService } from "./absences.service";

@Component({
  selector: 'app-absences-component',
  templateUrl: './absences.component.html',
  providers: [AbsencesService]
})
export class AbsencesComponent implements OnInit {
  public absenceData: any;
  page: number = 1;
  constructor(private absenceSvc: AbsencesService){

  }

  ngOnInit(): void {
    this.absenceSvc.absenceData.subscribe((data) => {
      this.absenceData = data ? data : null;
    })
  }

  public onDateSelect(selectedDate: NgbDate) {
    console.log (selectedDate);
    this.absenceSvc.getAbsencesData(selectedDate);
  }

  handlePageChange(event: any) {
    this.page = event;
  }
  
}
