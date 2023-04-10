const SELECTED_THEATRE = 'SELECTED_THEATRE';

export default function SelectedTheatreReducer(state = {}, action) {
  switch (action.type) {
    case SELECTED_THEATRE:
      return action.payload;
    default:
      return state;
  }
};