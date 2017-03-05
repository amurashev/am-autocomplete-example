
import countries from '../../../../output/countries.json';


import {

} from '../constants';

const initialState = {
    countries: countries,
};

export default function dictionariesReducer(state = initialState, action) {
    switch(action.type) {        

        default: return state;
    }
}

