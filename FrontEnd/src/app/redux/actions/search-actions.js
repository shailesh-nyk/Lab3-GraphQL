import { SEARCHBYITEM , SEARCHBYITEMFAILED, SETCUISINES, CLEARSEARCH } from "../actions/action-types";
import config from './../../../app-config';
import axios from 'axios';
import {startLoader, stopLoader, setMessage } from './util-action';
import gqlConfig from './../../graphQL/config';
import { searchQuery } from '../../graphQL/queries';
const searchByItemDispatcher = (payload) => {
  return { 
      type: SEARCHBYITEM, payload
  };
}
const searchByItemFailedDispatcher = (payload) => {
    return { 
        type: SEARCHBYITEMFAILED , payload
    };
}
const setCuisineList = (payload) => {
    return {
        type: SETCUISINES , payload
    }
}

export const clearSearch = () => {
    return {
        type: CLEARSEARCH
    }
}

export const searchByItem = (payload) => {
    return dispatch => {
        dispatch(startLoader());
       // axios.get(config.api_host + '/search', { params: payload }) 
            gqlConfig({
                query: searchQuery,
                variables: { key: payload.searchKey }
            })
            .then(resp => {
                dispatch(stopLoader());
                if(resp.data.search){
                    dispatch(searchByItemDispatcher(resp.data.search))
                } else {
                    dispatch(searchByItemFailedDispatcher())
                }
            })
            .catch(err => {
                dispatch(stopLoader());
                dispatch(setMessage({
                    msg: "Oops! Something went wrong. Please try again",
                    name: 'danger'
                }))
            });
    };
};

export const getCuisineList = () => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.api_host + '/search/cuisine') 
            .then(resp => {
                dispatch(stopLoader());
                dispatch(setCuisineList(resp.data.content))
            }, err => {
                dispatch(stopLoader());
            });
    };
};
