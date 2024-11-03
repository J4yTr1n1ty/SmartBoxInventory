import { Component } from '@angular/core';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'root_vali-test-page',
  standalone: true,
  imports: [HomePage],
  templateUrl: './vali-test.page.html',
  styleUrl: './vali-test.page.scss',
})
export class ValiTestPage {}
