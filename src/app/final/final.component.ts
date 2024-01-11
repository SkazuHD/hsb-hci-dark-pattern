import {Component, inject} from '@angular/core';
import {UserService, Warenkorb, WarenkorbPosition} from "../user.service";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
  } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import {StarRatingComponent} from "../products/star-rating/star-rating.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import { NgFor } from '@angular/common';
@Component({
    selector: 'app-final',
    standalone: true,
    imports: [
        CurrencyPipe,
        StarRatingComponent,
        MatFormFieldModule,  
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        NgFor

    ],
    templateUrl: './final.component.html',
    styleUrl: './final.component.css'
})
export class FinalComponent {
    private userService: UserService = inject(UserService);
    warenkorb: Warenkorb;
    private warenkorbPositionen: WarenkorbPosition[] = [];
    warenkorbFormGroup: FormGroup = new FormGroup({});
    
    get name(): string {
        return this.userService.getName();
    }

    get email(): string {
        return this.userService.getMail();
    }

    get adresse(): string {
        return this.userService.getAdresse();
    }

    get WarenKorbGesamtPreis(): number {
        return this.userService.getGesamtPreis();
    }

    get username(): string {
        return this.userService.getUsername();
    }

    ngOnInit(): void {
        this.warenkorb = this.userService.getCart();
        this.warenkorbPositionen = this.warenkorb.positionen;
        this.warenkorbPositionen.forEach((pos) => {
          this.warenkorbFormGroup.addControl(pos.produkt.id.toString(), new FormControl(pos.anzahl));
        });
        
    
    
        this.warenkorbFormGroup.valueChanges.subscribe((value) => {
          this.warenkorbPositionen.forEach((pos) => {
            //Set formgroup to 0 if value is negative
            if (value[pos.produkt.id] < 1) {
              this.getFormControl(pos.produkt.id.toString()).setValue(1);
              value[pos.produkt.id] = 1;
            }
            pos.anzahl = value[pos.produkt.id];
            this.warenkorb.gesamtPreis = this.userService.getGesamtPreis()
            this.userService.updateCart(this.warenkorb);
          });
    
        });
    
    
      }

      getFormControl(id: string): FormControl {
        return this.warenkorbFormGroup.get(id) as FormControl;
      }
}
