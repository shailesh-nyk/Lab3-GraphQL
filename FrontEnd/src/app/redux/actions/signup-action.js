import { SIGNUPBUYER , SIGNUPSELLER  } from "./action-types";
import config from '../../../app-config';
import axios from 'axios';
import gqlConfig from './../../graphQL/config';
import { signupBuyerQuery, signupSellerQuery } from '../../graphQL/mutations';

import {startLoader, stopLoader, setMessage } from './util-action';

const signupBuyerDispatcher = (payload) => {
  return { 
      type: SIGNUPBUYER, payload 
  };
}
const signupSellerDispatcher = (payload) => {
    return { 
        type: SIGNUPSELLER, payload 
    };
}

export const signupBuyer = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        // axios.post(config.api_host + '/register-buyer', payload) 
        gqlConfig({
            query: signupBuyerQuery,
            variables: payload
        })
        .then(resp => {
            dispatch(stopLoader());
            if(resp.data.signupBuyer){
                dispatch(signupBuyerDispatcher());
                dispatch(setMessage({
                        msg: "Successfully registered the buyer",
                        name: 'success'
                }))
            } else {
                dispatch(setMessage({
                        msg: "Could not register the user. Try again",
                        name: 'danger'
                })) 
            }
        })
        .catch(err => {
            dispatch(stopLoader());
            dispatch(setMessage({
                    msg: "Something went wrong",
                    name: 'danger'
            })) 
        })
    };
};
export const signupSeller = (payload) => {
    debugger;
    return dispatch => {
        dispatch(startLoader());
        gqlConfig({
            query: signupSellerQuery,
            variables: payload
        })
        .then(resp => {
            dispatch(stopLoader());
            if(resp.data.signupSeller){
                dispatch(signupSellerDispatcher());
                dispatch(setMessage({
                        msg: "Successfully registered your restaurant",
                        name: 'success'
                }))
            } else {
                dispatch(setMessage({
                        msg: "Could not register the user. Try again",
                        name: 'danger'
                })) 
            }
        })
        .catch(err => {
            dispatch(stopLoader());
            dispatch(setMessage({
                    msg: "Something went wrong",
                    name: 'danger'
            })) 
        })
    };
};
