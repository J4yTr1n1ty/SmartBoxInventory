import { Component } from '@angular/core';
import { ItemComponent } from '@root/components/item/item.component';


@Component({
  selector: 'root_vali-test-page',
  standalone: true,
  imports: [
ItemComponent
  ],
  templateUrl: './vali-test.page.html',
  styleUrl: './vali-test.page.scss',
})

export class ValiTestPage {

}


