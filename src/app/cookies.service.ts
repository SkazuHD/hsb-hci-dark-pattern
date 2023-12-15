import {inject, Injectable} from '@angular/core';
import {DialogCookiesComponent} from "./dialog-cookies/dialog-cookies.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogCookiesSettingsComponent} from "./dialog-cookies-settings/dialog-cookies-settings.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private dialog = inject(MatDialog);
  private cookiesAccepted = false;
  private cookiesAcceptedCount = 0;
  private cookieForm: FormGroup = new FormGroup({});

  constructor() {
    this.cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';

    this.cookiesAcceptedCount = parseInt(localStorage.getItem('cookiesAcceptedCount') || '0');

    this.cookieForm.addControl('Speichern von oder Zugriff auf Informationen auf einem Endgerät',
      new FormControl(false, []));
    this.cookieForm.addControl('Verwendung reduzierter Daten zur Auswahl von Werbeanzeigen',
      new FormControl(false, []));
    this.cookieForm.addControl('Erstellung von Profilen für personalisierte Werbung',
      new FormControl(false, []));
    this.cookieForm.addControl('Verwendung von Profilen zur Auswahl personalisierter Werbung',
      new FormControl(false, []));
    this.cookieForm.addControl('Erstellung von Profilen zur Personalisierung von Inhalten',
      new FormControl(false, []));
    this.cookieForm.addControl('Verwendung von Profilen zur Auswahl personalisierter Inhalte',
      new FormControl(false, []));
    this.cookieForm.addControl('Messung von Werbeanzeigen',
      new FormControl(false, []));
    this.cookieForm.addControl('Messung der Performance von Inhalten',
      new FormControl(false, []));
    this.cookieForm.addControl('Analyse von Zielgruppen durch Statistiken oder Kombinationen von Daten aus verschiedenen Quellen'
      , new FormControl(false, []));
    this.cookieForm.addControl('Entwicklung und Verbesserung der Angebote',
      new FormControl(false, []));
    this.cookieForm.addControl('Verwendung reduzierter Daten zur Auswahl von Inhalten'
      , new FormControl(false, []));
    this.cookieForm.addControl('Technisch notwendig',
      new FormControl(false, [Validators.pattern('true')]));
    this.cookieForm.addControl('Funktional',
      new FormControl(false, []));
    this.cookieForm.addControl('Analyse / Statistiken'
      , new FormControl(false, [Validators.pattern('true')]));
    this.cookieForm.addControl('Marketing',
      new FormControl(false, []));
    this.cookieForm.addControl('Anzeigen / Ads',
      new FormControl(false, [Validators.pattern('true')]));
    this.cookieForm.addControl('Sonstige',
      new FormControl(false, []));
    this.cookieForm.addControl('Drittanbieter',
      new FormControl(false, [Validators.pattern('true')]));
  }
  requestDialog(): void {
    this.openDialog();
  }
  requestSettingDialog(): void {
    this.openSettingDialog();
  }
  private openSettingDialog(): void {
    this.dialog.open(DialogCookiesSettingsComponent, {
      closeOnNavigation: false,
      disableClose: true,
      width: 'min(768px, 100%)',
      data:{
        form: this.cookieForm
      }
    }).afterClosed().subscribe((successful) => {
      //Dont Close all if canceled
      if (successful) {
       this.dialog.closeAll()
      }
    });
  }
  private openDialog(): void {
    if (!
      this.cookiesAccepted && this.dialog.openDialogs.length === 0
    ){
      this.dialog.open(DialogCookiesComponent, {
        closeOnNavigation: false,
        disableClose: true,
        width: 'min(976px, 100%)',
        data:{
          form: this.cookieForm
        }
      }).afterClosed().subscribe(() => {
        //TODO What is the count if the Abo is choosen instead?
        this.cookiesAccepted = true;
        localStorage.setItem('cookiesAccepted', 'true');

        let count = 0;
        for (const control of Object.values(this.cookieForm.controls)) {
          if (control.value === true) {
            count++;
          }
        }
        localStorage.setItem('cookiesAcceptedCount', count.toString());
        console.log('Accepted Cookies: ' + count);
      });
    }
  }
}
