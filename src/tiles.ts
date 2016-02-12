//tiles reducer

export const ADD_TILE = 'ADD_TILE';
export const UPDATE_TILE = 'UPDATE_TILE';
export const DELETE_TILE = 'DELETE_TILE';
export const COMPLETE_TILE = 'COMPLETE_TILE';

export const tiles = (state = [], {type, payload}) => {
  console.log('ACTION:', type, payload);
  switch(type){
    case ADD_TILE:
      return state.concat([Object.assign({}, payload, {id: state.length + 1})]);
    case UPDATE_TILE:
      return state.map(tile => {
        return tile.id !== payload.id ?
          tile :
          Object.assign({}, tile, payload)
      });
    case COMPLETE_TILE:
      return state.map(tile => {
        return tile.id !== payload.id ?
          tile :
          Object.assign({}, tile, {completed: true})
      });
    case DELETE_TILE:
      return state.filter(tile => tile.id !== payload.id);
    default:
      return state;
  }
}

export const ALL = 'ALL'
export const COMPLETE = 'COMPLETE'
export const PENDING = 'PENDING'

export const visibilityFilter = (state = (tile) => true, {type, payload}) => {
  switch(type){
    case ALL:
      return (tile) => true;
    case COMPLETE:
      return (tile) => tile.completed;
    case PENDING:
      return (tile) => !tile.completed;
    default:
      return state;
  }
}
