import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RootRoutesEnum } from '@root/root-routes.enum';
import { BoxModel } from '@root/shared/models/box.model';
import { StateService } from '@root/state/state.service';

@Component({
  selector: 'root_box',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent implements OnInit {
  @Input({ required: true })
  boxId!: number;
  box!: Signal<BoxModel | undefined>;

  constructor(
    private _state: StateService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.box = this._state.getBox(this.boxId);
  }

  clicked() {
    this._router.navigate([RootRoutesEnum.Box, this.boxId]);
  }
}
