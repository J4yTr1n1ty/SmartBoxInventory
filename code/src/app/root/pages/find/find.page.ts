import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { EntityEnum } from '@root/shared/enums/entity.enum';
import { BoxModel } from '@root/shared/models/box.model';
import { ItemModel } from '@root/shared/models/item.model';
import { StateService } from '@root/state/state.service';
import { concat, merge } from 'rxjs';

@Component({
  selector: 'root_find-page',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelect,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDivider,
  ],
  templateUrl: './find.page.html',
  styleUrl: './find.page.scss',
})
export class FindPage {
  entities: WritableSignal<(ItemModel|BoxModel)[]>=signal([]);
  
  boxesItems:FormControl<EntityEnum[]|null>=new FormControl<EntityEnum[]|null>(null);
  searchTerm:FormControl<string|null>=new FormControl<string>("");
  boxList:FormControl<EntityEnum[]|null>=new FormControl<EntityEnum[]|null>(null);

  result = new FormControl('');
  boxListResult = new FormControl('');
  searchList: EntityEnum[] = [EntityEnum.Item, EntityEnum.Box];
  
  constructor(private _stateService:StateService) {
    merge(
    this.boxesItems.valueChanges,
    this.searchTerm.valueChanges).subscribe(()=>{
      this.search()
    })
  }

  search() {
    //console.log("function called");
    let term:string = this.searchTerm.value??"";
    let entities:EntityEnum[] = this.boxesItems.value??[];
    //console.log(term);
    this._stateService.filter(term,entities)()
    this.entities.set(this._stateService.filter(term,entities)());
    console.log(this._stateService.filter(term,entities)());
  }

}
