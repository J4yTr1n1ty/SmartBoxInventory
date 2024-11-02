import { Component } from '@angular/core';
import { BoxDetiailPage } from '@root/pages/box-detiail/box-detiail.page';


@Component({
  selector: 'root_cup-test-page',
  standalone: true,
  imports: [
    BoxDetiailPage,
  ],
  templateUrl: './cup-test.page.html',
  styleUrl: './cup-test.page.scss',
})
export class CupTestPage {}
