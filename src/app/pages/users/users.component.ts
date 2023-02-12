import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AbsenceDefinition } from "src/app/models/absenceDefinition.interface";
import { CodelistsService } from "src/app/services/codelists/codelists.service";
import { UsersService } from "./users.service";


@Component({
  selector: 'app-users-component',
  templateUrl: './users.component.html',
  providers: [UsersService],
  styles: [`
    .pagination-controls {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
  `]
  })
export class UsersComponent implements OnInit {
  @ViewChild('modalAbsenceData') modalAbsenceData: any;
  public usersData: any;
  public searchTerm: '' | undefined;
  page: number = 1;
  
  public closeModal: string = '';
  public modalData: string = '';

  public firstName: string | undefined;
  public lastName: string | undefined;
  public email: string | undefined;

  public submitted = false;

  public searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl('')
  });

  public userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]),
    email: new FormControl('', {
      validators:[
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i)
      ],
      // TODO: implement if/when email data should be validated through API (for example: uniquiness)
      // asyncValidators: [this.emailValidator()],
    })
  });
  
  public absenceForm: FormGroup = new FormGroup({
    reason: new FormControl('', [
      Validators.required
    ]),
    userId: new FormControl('x', [
      Validators.required
    ])
  });

  absenceDefinitions: AbsenceDefinition[] = [];
  
  constructor(
    private usersService: UsersService,
    private codelistsSvc: CodelistsService,
    private modalService: NgbModal) {
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  
  ngOnInit(): void {

    this.codelistsSvc.absenceDefinitions.subscribe((data) => {
      this.absenceDefinitions = data;
    });
    
    this.usersService.usersData.subscribe((data) => {
        this.usersData = data ? data : null;
    })

    this.usersService.getUsersData(this.searchTerm);
  }

  handlePageChange(event: any) {
    this.page = event;
  }

  enterAbsence(id: string) {
    console.log('Enter Absence button was clicked', id);
    this.absenceForm.controls['userId'].setValue(id);
    this.openModal(this.modalAbsenceData);
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSearch() {
    if (!this.searchForm.valid) 
      return;
    
    this.searchTerm = this.searchForm.value.searchTerm;
    this.usersService.getUsersData(this.searchTerm);
  }


  addUser() {
    this.submitted = true;

    if (!this.userForm.valid) 
      return;
    // console.log(this.userForm);

    const usr: any = {
      FirstName: this.userForm.value.firstName,
      LastName: this.userForm.value.lastName,
      Email: this.userForm.value.email
    }

    // console.log('user', usr);
    
    this.usersService.addUser(usr).subscribe((data) => {
      this.userForm.reset();
      this.modalService.dismissAll(); //not good solution
    });
    // this.userForm.reset();
  }

  onReset() {
    this.userForm.reset();
  }

  get fa(): { [key: string]: AbstractControl } {
    return this.absenceForm.controls;
  }

  submitAbsence() {
    console.log('absence');
    if (!this.absenceForm.valid) 
      return;

    this.usersService.addUserAbsence(this.absenceForm.value).subscribe((data) => {
      
      this.absenceForm.reset();
      this.modalService.dismissAll(); //not good solution
      alert('Absence added');
    });
  }

  onResetAbsence() {
    this.absenceForm.reset();
  }
}