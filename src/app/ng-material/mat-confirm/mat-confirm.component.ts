import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Person } from '../../app.component';

@Component({
  selector: 'app-mat-confirm',
  templateUrl: './mat-confirm.component.html',
  styleUrls: ['./mat-confirm.component.scss'],
})
export class MatConfirmComponent implements OnInit {
  message = '';

  constructor(
    private dialogRef: MatDialogRef<MatConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.message = data ? data.message : '';
  }
ngOnInit(): void {
  console.log("ngonit içi confirm");
  //this.initForm();}
}
}
