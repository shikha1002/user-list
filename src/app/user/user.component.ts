import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { UserService } from './service/user.service';
import { book, initialValue, user } from './model/user.model';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userDetail!: user;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }

  //---- Get data from user service---------------
  getUser() {
    this.userService.getData().subscribe(res => {
      this.userDetail = res;
    })
  }

  //---sort the books details as per title------------
  sort() {
    this.userDetail.books.sort((a, b) => {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    })
  }

  //-------delete Book detail from the user detail list
  deleteBook(title: string) {
    this.userDetail.books = this.userDetail.books.filter(book => book.title !== title);
  }

  addBook() {
    this.openDialog(initialValue);  
  }

  openDialog(bookDetail?: book) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: bookDetail,
      height: '400px',
      width: '400px',
    })

    dialogRef.afterClosed().subscribe(
        data => {
          console.log(data)
          this.userDetail.books.unshift({...data})
          // this.userDetail.books.splice(this.userDetail.books.findIndex(v => v.title === data.title),1, data)
        }
    );  

  }

  update(title: string) {
    this.openDialog(this.userDetail.books.filter(v => v.title === title)[0]);
  }

}
