import { combineReducers } from "redux";
import { usersReducer } from './users-reducer';
// import { currentUserReducer } from './currentuser-reducer';
// import { isLoggedInReducer } from './isLoggedIn-reducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  // currentUser: currentUserReducer,
  // isLoggedIn: isLoggedInReducer
})