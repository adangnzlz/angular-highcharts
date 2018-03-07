import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit {


  checkboxGroup: FormGroup;

  @Output() checkChange: EventEmitter<any[]>;

  @Input() title: string;
  _items: any[];
  @Input('items')
  set items(value: any[]) {
    this._items = value;
    if (this._items) {
      this.createCheckBoxes(this._items);
    }
  }
  @Input('disabled')
  set disabled(value: boolean) {
    if (value) {
      this.checkboxGroup.disable();
    } else {
      this.checkboxGroup.enable();
    }
  }
  constructor(private _fb: FormBuilder) {
    this.checkChange = new EventEmitter();
  }

  ngOnInit(): void {

  }

  public clear() {
    this.createCheckBoxes(this._items);
  }

  createCheckBoxes(list) {
    const array = [];
    list.forEach(element => { array.push(new FormControl(false)); });
    const checkboxArray = new FormArray(array);
    this.checkboxGroup = this._fb.group({ array: checkboxArray });
    this.checkboxGroup.valueChanges.subscribe(result => {
      const selectedItems = [];
      result.array.forEach((element, index) => {
        if (element) {
          selectedItems.push(this._items[index]);
        }
      });
      this.checkChange.emit(selectedItems);
    });
  }

}
