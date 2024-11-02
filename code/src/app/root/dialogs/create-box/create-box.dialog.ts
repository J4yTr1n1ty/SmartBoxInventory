import { Component, inject, Signal, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { StateService } from '@root/state/state.service';
import { BoxModel } from '@root/shared/models/box.model';
import { FormControl, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'root_create-box-dialog',
  templateUrl: './create-box.dialog.html',
  styleUrl: './create-box.dialog.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckbox,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    NgIf,
    MatCardModule,
    MatDialogClose
  ],
})


export class CreateBoxDialog {
  nameInput:FormControl<string|null>=new FormControl<string>("", Validators.required);

  fragileInput:FormControl<boolean|null>=new FormControl<boolean>(false)

  boxID: Signal<number>
  
  constructor(private _stateService:StateService) {
    this.boxID = this._stateService.getLastBoxId();
  }

  tooltipText: string = 'The ID will be autocreated once you click "Create Box"';
  isTooltipVisible: boolean = false;
  toggleTooltip() {
    this.isTooltipVisible = !this.isTooltipVisible;
  }

  

  create() {
    let name = this.nameInput.value;
    if (name == "") {
      name = "Box";

    }


    const box:BoxModel={
      id:undefined, 
      name:name!, 
      isFragile:this.fragileInput.value??false,
    }

    this._stateService.setBox(box);
    console.log(this.nameInput.value);
  }
}
