//our root app component
import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'
import {LogMonitor} from '@ngrx/devtools'

// import * as TileActions from './tiles';
import * as TileActions from './tiles';

import {NewTileInput} from './components/newTile';
import {TileList} from './components/tileList'

@Component({
  selector: 'tile-app',
  providers: [],
  template: `
    <div>
      <log-monitor></log-monitor>
      <h2>Tiles</h2>
      <new-tile-input (create)="addTile($event)"></new-tile-input>
      =========
      <tile-list
        [tiles]="tiles | async"
        (complete)="completeTile($event)"
        (delete)="deleteTile($event)"
      ></tile-list>
      =========
      <div>
        <button (click)="show('ALL')">All</button>
        <button (click)="show('PENDING')">Pending</button>
        <button (click)="show('COMPLETE')">Complete</button>
      </div>
    </div>
  `,
  directives: [LogMonitor, NewTileInput, TileList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  constructor(private store: Store) {
    this.tiles = store.select('tiles')
      .combineLatest(store.select('visibilityFilter'), (tiles, visibilityFilter) => {
        return tiles.filter(visibilityFilter)
      });
  }
  addTile(newTile){
    this.store.dispatch({
      type: TileActions.ADD_TILE,
      payload: newTile
    });
  }
  completeTile(tile){
    this.store.dispatch({
      type: TileActions.COMPLETE_TILE,
      payload: tile
    });
  }
  deleteTile(tile){
    this.store.dispatch({
      type: TileActions.DELETE_TILE,
      payload: tile
    });
  }
  show(filter){
    this.store.dispatch({
      type: TileActions[filter]
    });
  }
}
