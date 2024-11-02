import { Component } from '@angular/core';
import { CreateItemComponent } from '@root/components/create-item/create-item.component';
import { HomeComponent } from '@root/components/home/home.component';

@Component({
  selector: 'root_vali-test-page',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './vali-test.page.html',
  styleUrl: './vali-test.page.scss',
})
export class ValiTestPage {}
