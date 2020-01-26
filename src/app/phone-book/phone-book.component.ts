import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss']
})
export class PhoneBookComponent implements OnInit {
  modalRef: BsModalRef;
  modalRefEdit: BsModalRef;
  order: string = 'firstName';
  reverse: boolean = false;
  editFirstName:string;
  editLastName:string;
  editNumber:string;
  arrUsers:Array<any> = [
    {
      id: 1,
      firstName:'Petro',
      lastName:'Sup',
      number: '0631111111'
    },
    {
      id: 2,
      firstName:'Ivan',
      lastName:'Ivanov',
      number: '0631212121'
    },
    {
      id: 3,
      firstName:'Vasia',
      lastName:'Yurkiv',
      number: '0631314151'
    },
    {
      id: 4,
      firstName:'Sasha',
      lastName:'Vaskiv',
      number: '0631313131'
    },
    {
      id: 5,
      firstName:'Toma',
      lastName:'Forest',
      number: '0631111333'
    },
    {
      id: 6,
      firstName:'Oleg',
      lastName:'Petriv',
      number: '0631176011'
    }
  ]
  sortedUsers:any[];
  searchName:string;
  addNewFirstName:string;
  addNewLastName:string;
  addNewNumber:string;
  editIndex:number;
  lastId:number = this.arrUsers.length + 1;

  constructor(private orderPipe: OrderPipe,private modalService: BsModalService) {
    this.sortedUsers = orderPipe.transform(this.arrUsers, 'firstName');
    console.log(this.sortedUsers);
  }

  ngOnInit(){

  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  openModal(template: TemplateRef<any>,findId) {
    this.modalRef = this.modalService.show(template);
    this.editIndex = this.arrUsers.findIndex(user => user.id === findId)
    this.editFirstName = this.arrUsers[this.editIndex].firstName
    this.editLastName = this.arrUsers[this.editIndex].lastName
    this.editNumber = this.arrUsers[this.editIndex].number

  }
  addNewContact():void{
    this.arrUsers.push({
      id: this.lastId++,
      firstName: this.addNewFirstName,
      lastName: this.addNewLastName,
      number: this.addNewNumber
    });
    this.addNewFirstName = '';
    this.addNewLastName = '';
    this.addNewNumber = '';
    console.log(this.arrUsers)
  }
  saveContact(): void {
    this.modalRef.hide();
    this.arrUsers[this.editIndex].firstName = this.editFirstName;
    this.arrUsers[this.editIndex].lastName = this.editLastName;
    this.arrUsers[this.editIndex].number = this.editNumber;
  }
  deleteContact(findId): void {
    this.editIndex = this.arrUsers.findIndex(user => user.id === findId)
    this.arrUsers.splice(this.editIndex,1)
  }
}
  