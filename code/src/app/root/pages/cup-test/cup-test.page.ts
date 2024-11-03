import { Component } from '@angular/core';
import { BoxDetailPage } from '@root/pages/box-detail/box-detail.page';

@Component({
  selector: 'root_cup-test-page',
  standalone: true,
  imports: [BoxDetailPage],
  templateUrl: './cup-test.page.html',
  styleUrl: './cup-test.page.scss',
})
export class CupTestPage {}
