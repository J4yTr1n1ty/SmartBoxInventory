import { Component } from '@angular/core';
import { CreateBoxDialog } from '@root/dialogs/create-box/create-box.dialog';


@Component({
  selector: 'root_cup-test-page',
  standalone: true,
  imports: [CreateBoxDialog],
  templateUrl: './cup-test.page.html',
  styleUrl: './cup-test.page.scss',
})
export class CupTestPage {}
