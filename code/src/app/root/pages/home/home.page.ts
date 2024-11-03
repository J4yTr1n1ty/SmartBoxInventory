import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { RootRoutesEnum } from '@root/root-routes.enum';

@Component({
  selector: 'root_home-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  isHidden: boolean = true;

  constructor(private _router: Router) {}
  showGuide(): void {
    this.isHidden = false;
  }

  route() {
    this._router.navigate([RootRoutesEnum.Create]);
  }
}
