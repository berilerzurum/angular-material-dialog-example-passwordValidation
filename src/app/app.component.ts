import { DialogModule } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatAlertComponent } from './ng-material/mat-alert/mat-alert.component';
import { MatConfirmComponent } from './ng-material/mat-confirm/mat-confirm.component';
import { MatInputPromptComponent } from './ng-material/mat-input-prompt/mat-input-prompt.component';


export interface Person {
  id: number | null;
  name: string;
  surname: string;
  phone: number;
  password: string;

}

const PERSON_DATA: Person[] = [
  {id:1,  name: 'Hydrogen',  surname: 'aa', phone: 123, password:'' },
  {id:2,  name: 'Helium',    surname: 'bb', phone: 456, password:'' },
  {id:3,  name: 'Lithium',   surname: 'cc', phone: 789, password:'' },
  {id:4,  name: 'Beryllium', surname: 'dd', phone: 101, password:'' },
];



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'matDialog';
  dataFromDialog: any;
  displayedColumns = ['name', 'surname','password', 'phone', 'edit','delete'];
  dataSource = new MatTableDataSource<Person>(PERSON_DATA);
  @ViewChild('myform') form : NgForm;
currentIndex: number=-1;

  constructor(private dialog: MatDialog) {}

  alertDialog() {
    const dialogRef = this.dialog.open(MatAlertComponent, {
      data: {
        message: 'Hello World from Edupala',
      },
    });
  }

  confirmDialog() {
    const ref: MatDialogRef<MatConfirmComponent> = this.dialog.open(
      MatConfirmComponent,
      {
        width: '600px',
        height: '210px',
        data: {
          message: 'Are you sure to cancel without saving the data?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }
  
addnew(): void {
  const dialogRef = this.dialog.open(MatInputPromptComponent, {
    width: '350px',
    height: '400px',
    data: PERSON_DATA[PERSON_DATA.length],
    autoFocus: true,
  });

  dialogRef.componentInstance.mode='ADD';

  dialogRef.afterClosed().subscribe((data) => {

    if (data.clicked === 'submit'&& data.form.name!=''&&data.form.surname!=''&&data.form.phone!='') {
      console.log('Sumbit button clicked');
      PERSON_DATA[PERSON_DATA.length]=data.form;
      this.dataSource=new MatTableDataSource<Person>(PERSON_DATA);
      this.dataFromDialog = data.form;
    }

    else{
      this.dataFromDialog = data.form;
      if (data.clicked === 'close') {
        console.log('Close button clicked');
      }
    }
  });
  
}

delete( index:number): void{

   this.dataSource.data.splice(index, 1);
  this.dataSource._updateChangeSubscription();  

}

  showPrompt(data: Person, index: number): void {
    
      console.log("data-->",data);
    const currentData= {...data};
    this.currentIndex=index;
    const dialogRef = this.dialog.open(MatInputPromptComponent, {
      width: '350px',
      height: '400px',
      data: currentData,
      autoFocus: true,
    });
    
    dialogRef.componentInstance.mode='EDIT';

    dialogRef.afterClosed().subscribe((data) => {

      if (data.clicked === 'submit'&& data.form.name!=''&&data.form.surname!=''&&data.form.phone!='') {
        console.log('Sumbit button clicked');
        PERSON_DATA[this.currentIndex]=data.form;
        this.dataSource=new MatTableDataSource<Person>(PERSON_DATA);
        this.dataFromDialog = data.form;
      }

      else{
        this.dataFromDialog = data.form;
        if (data.clicked === 'close') {
          console.log('Close button clicked');
        }
      }
    });
    
  }


}
