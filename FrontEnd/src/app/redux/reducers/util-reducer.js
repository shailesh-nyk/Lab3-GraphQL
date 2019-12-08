import { STARTLOADER, STOPLOADER, SETMSG, CLRMSG } from "../actions/action-types";

const initialState = {
    loaderClass : 'g-loader-hide',
    appStatus : {
         msg: '',
         name: ''
    }
}

const utilReducer = (state = initialState, action) => {
    switch (action.type) {
      case STARTLOADER: {
          return {
             ...state,
             loaderClass : 'g-loader-show'
          };
      }
      case STOPLOADER: {
          return {
             ...state,
             loaderClass : 'g-loader-hide'
          };
      }
      case SETMSG: {
          return {
            ...state,
            appStatus: action.payload
          }
      }
      case CLRMSG: {
        return {
          ...state,
          appStatus: {
              msg: '',
              name: ''
          }
        }
    }
    default:
        return state;
    }
  }
  
  export default utilReducer;