import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataDialog } from '../../models/shared.interfaces';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DataDialog) { }

}
