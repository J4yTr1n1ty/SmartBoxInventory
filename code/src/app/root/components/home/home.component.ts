import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'root_home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isHidden: boolean = true

  showGuide(): void {
    this.isHidden = false
    console.log(this.isHidden)
  }
}
