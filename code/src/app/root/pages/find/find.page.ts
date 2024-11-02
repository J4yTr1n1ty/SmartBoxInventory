import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './find.page.html',
  styleUrl: './find.page.scss',
})
export class FindPage {

  boxesItems:FormControl<string|null>=new FormControl<string>("");
  searchTerm:FormControl<string|null>=new FormControl<string>("");

  result = new FormControl('');
  searchList: string[] = ['Boxes', 'Items'];
  
  search() {
    //console.log("function called");
    let term = this.searchTerm.value;
    //console.log(term);

    
  }

}
