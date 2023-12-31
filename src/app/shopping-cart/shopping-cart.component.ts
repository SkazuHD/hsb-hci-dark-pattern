import {Component, inject, OnInit} from '@angular/core';
import {Nutzer, UserService, Warenkorb, WarenkorbPosition} from "../user.service";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {StarRatingComponent} from "../products/star-rating/star-rating.component";
import {MatInputModule} from "@angular/material/input";
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../product.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingSpinnerComponent} from "../standalone-components/loading-spinner/loading-spinner.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PopupService } from '../dialogs/popup.service';
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
    FormsModule,
    MatProgressSpinnerModule,
    NgClass,
    LoadingSpinnerComponent,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  warenkorbFormGroup: FormGroup = new FormGroup({});
  warenkorb: Warenkorb;
  addedCosts : FormGroup;
  handleWithCare : boolean = false;
  expressDelivery: boolean = false;
  kaufschutz: boolean = false;
  weilWirsKoennen: boolean = false;
  public showLoading: boolean = false;
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



  onRemoveFromCart(product: Product) {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
      this.userService.removeFromCart(product);
      this.warenkorb.gesamtPreis = this.userService.getGesamtPreis()
    }, 2000);


  }


  get name() : string{
    return this.userService.getName();
  }

  get email() : string{
    return this.userService.getMail();
  }

  get adresse(): string{
    return this.userService.getAdresse();
  }

  getFormControl(id: string): FormControl {
    return this.warenkorbFormGroup.get(id) as FormControl;
  }

  navigateToPurchase() {
    this.router.navigate(['/purchase']);
  }
}
 