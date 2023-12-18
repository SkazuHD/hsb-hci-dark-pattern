import {Component, inject, OnInit} from '@angular/core';
import {UserService, Warenkorb, WarenkorbPosition} from "../user.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButtonModule,
    MatIconModule,
    StarRatingComponent,
    MatInputModule,
    CurrencyPipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  warenkorbFormGroup: FormGroup = new FormGroup({});
  warenkorb: Warenkorb;
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  private warenkorbPositionen: WarenkorbPosition[] = [];

  ngOnInit(): void {
    this.warenkorb = this.userService.getCart();
    this.warenkorbPositionen = this.warenkorb.positionen;
    this.warenkorbPositionen.forEach((pos) => {
      this.warenkorbFormGroup.addControl(pos.produkt.id.toString(), new FormControl(pos.anzahl));
    });

    this.warenkorbFormGroup.valueChanges.subscribe((value) => {
      this.warenkorbPositionen.forEach((pos) => {
        //Set formgroup to 0 if value is negative
        if (value[pos.produkt.id] < 0) {
          this.getFormControl(pos.produkt.id.toString()).setValue(0);
          value[pos.produkt.id] = 0;
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

  navigateToPurchase() {
    this.router.navigate(['/purchase']);
  }
}
