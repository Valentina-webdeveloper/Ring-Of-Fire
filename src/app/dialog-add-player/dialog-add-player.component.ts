import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  name: string;

  constructor(
    public dialogRef: DialogRef<DialogAddPlayerComponent>,
    private overlayRef: OverlayRef
  ) { }


  ngOnInit(): void {
    this.overlayRef.backdropClick().subscribe(() => {
      this.dialogRef.close();
    })
  }


}
