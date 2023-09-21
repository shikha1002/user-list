import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { book } from '../user/model/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  bookForm: FormGroup;
  minDate = new Date();

  constructor(private fb: FormBuilder, private dialoRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) data: book) {
    this.bookForm = this.fb.group({
      imageUrl: [data.imageUrl],
      title: [data.title],
      purchaseLink: [data.purchaseLink],
      PublishDate: [data.PublishDate]
    })
  }
  save() {
    this.dialoRef.close(this.bookForm.value)
  }
}
