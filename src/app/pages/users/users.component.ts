import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "src/app/services/api/api.service";

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
  
  constructor(
    private usersService: UsersService,
    private modalService: NgbModal) {
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  
  ngOnInit(): void {

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
  }

  openModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
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
}