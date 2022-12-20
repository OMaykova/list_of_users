
import {ADD_USERS } from './actions';
import { UPDATE_USER} from './actions';
const initialState = []

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      state =[...state, action.payload]
      return state
      case UPDATE_USER:
        const {id, like} = action.payload
        console.log('id like', id, like)

        state = [...state, state.map((u) => {
          if (u.id === id) {
           return {...u, like: like}
          }
          return u
          })]
        return state
    default:
      return state
  }
}