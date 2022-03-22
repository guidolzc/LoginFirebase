
import { types } from '../types/types';

const intialState = {
    uid: 123123,
    name:'fernando',
    dir:{
        b:12
    }
}


export const authReducer = (state =intialState, action) => {

  switch (action.type) {
      case types.login:
          return{ 
              uid: action.payload.uid,
              name:action.payload.displayName
          }
     case types.Logout:
            return{ }     
  
      default:
          return state;
  }
};
