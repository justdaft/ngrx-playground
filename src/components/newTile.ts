import {Component, Output, EventEmitter} from 'angular2/core'

@Component({
  selector: 'new-tile-input',
  template: `
    <div>
      <input type="text" #newtile placeholder="Add a tile" />
      <button (click)="saveTile(newtile)">Add</button>
    </div>
  `
})
export class NewTileInput {
  @Output() create = new EventEmitter();
  saveTile(el){
    this.create.emit({text: el.value});
    el.value = ''
  }
}
