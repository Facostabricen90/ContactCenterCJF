import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent { }
