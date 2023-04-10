import { combineReducers } from 'redux';
import SelectedTheatreReducer from './SelectedTheatreReducer';

const appReducer = combineReducers({
  SelectedTheatreReducer,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
