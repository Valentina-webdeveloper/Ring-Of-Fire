import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  
  name: string = '';

  constructor(
    public dialogRef: DialogRef<DialogAddPlayerComponent>
  ) { }

  ngOnInit(): void {
  }




}
