import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import shoppingList from "./shoppingList/reducer";

export default combineReducers({
  appState,
  user,
  shoppingList,
});
