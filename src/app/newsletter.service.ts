import {inject, Injectable} from '@angular/core';
import {DialogNewsletterComponent} from "./dialog-newsletter/dialog-newsletter.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private dialog = inject(MatDialog)
  private readonly interval: any;
  private request_count = 0;
  private NewsLeterAccepted = false;

  constructor() {
    this.interval = setInterval(() => {
      if (this.request_count > 0 && !this.NewsLeterAccepted) {
        this.openDialog();
        //Can be changed to queue all requests instead of resetting
        this.request_count = 0;
      }
    }, 15000)
  }

  requestDialog() {
    this.request_count++;
  }

  private openDialog() {
      if (this.dialog.openDialogs.length === 0) {
        this.dialog.open(DialogNewsletterComponent, {
          width: 'min(640px,100%)',
          autoFocus: true,
          closeOnNavigation: false,
          disableClose: true
        }).beforeClosed().subscribe((value) => {
          if (value) {
            this.NewsLeterAccepted = true;
            clearInterval(this.interval);
          }
        });
      }
    }
}
