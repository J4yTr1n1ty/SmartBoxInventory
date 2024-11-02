import { Component, Signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StateService } from '@root/state/state.service';
import { BoxModel } from '@root/shared/models/box.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'root_create-item',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss',
})
export class CreateItemComponent {
  boxes: Signal<BoxModel[]>;

  constructor(stateService: StateService) {
    this.boxes = stateService.getAllBoxes();
  }
}
