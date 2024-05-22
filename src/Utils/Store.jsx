import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  csc_user : Cookies.get('csc_user')
  ? JSON.parse(Cookies.get('csc_user')):null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_SIGNIN' : 
      Cookies.set('csc_user', JSON.stringify(action.payload) , { expires: 1 });
      return {...state , csc_user:action.payload};
    case 'USER_SIGNOUT' : 
      Cookies.remove('csc_user');
      return {...state , 
        csc_user:null ,
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}