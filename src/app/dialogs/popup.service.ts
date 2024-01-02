import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { DialogPopupComponent } from './dialog-popup/dialog-popup.component';

@Injectable({
  providedIn: 'root'
})

export class PopupService {

    private dialog = inject(MatDialog)
    private readonly interval: any;
    private request_count = 0;

    
  
    constructor() {
      this.interval = setInterval(() => {
        if (this.request_count > 0) {
          this.openDialog();
          //Can be changed to queue all requests instead of resetting
          this.request_count = 0;
        }
      }, 1000)
    }
  
    requestDialog() {
      this.request_count++;
    }
  
    private openDialog() {
      if (this.dialog.openDialogs.length === 0) {
        this.dialog.open(DialogPopupComponent, {
          width: 'min(800px,100%)',
          autoFocus: true,
          closeOnNavigation: false,
          disableClose: true
        }).beforeClosed().subscribe((value) => {
          if (value) {

            clearInterval(this.interval);
          }
        });
      }
    }
}

