import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { RootRoutesEnum } from '@root/root-routes.enum';


@Component({
  selector: 'root_home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private _router: Router){

  }
  isHidden: boolean = true

  showGuide(): void {
    this.isHidden = false
    console.log(this.isHidden)
  }

  route():void{
    this._router.navigate([RootRoutesEnum.Create]);
  }
}
