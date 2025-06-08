import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from "../../components/front-navbar/front-navbar.component";

@Component({
  selector: 'app-store-layout',
  imports: [RouterOutlet, FrontNavbarComponent],
  templateUrl: './store-layout.component.html',
})
export class StoreLayoutComponent {

}
