import { Component } from '@angular/core';
import { FindPage } from '@root/pages/find/find.page';


@Component({
  selector: 'root_cup-test-page',
  standalone: true,
  imports: [FindPage],
  templateUrl: './cup-test.page.html',
  styleUrl: './cup-test.page.scss',
})
export class CupTestPage {}
