import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'tile-list-item',
  template: `
    <li>
      <span [class.completed]="tile.completed">{{tile.text}}</span>
      <button (click)="complete.emit(tile)"> Done </button>
      <button (click)="destroy.emit(tile)"> Delete </button>
    </li>
  `
})
class TileListItem {
  @Input() tile;
  @Output() complete = new EventEmitter();
  @Output('delete') destroy = new EventEmitter()
}

@Component({
  selector: 'tile-list',
  template: `
    <div>
      <tile-list-item
        *ngFor="#tile of tiles"
        [tile]="tile"
        (complete)="completeTile.emit($event)"
        (delete)="deleteTile.emit($event)"
      ></tile-list-item>
    </div>
  `,
  directives: [TileListItem]
})
export class TileList {
  @Input() tiles;
  @Output('complete') completeTile = new EventEmitter();
  @Output('delete') deleteTile = new EventEmitter()
}
