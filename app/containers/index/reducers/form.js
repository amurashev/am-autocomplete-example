
import {
    FORM_CHANGE_FIELD
} from '../constants';

const initialState = {
    country: null,
};

export default function accountsListReducer(state = initialState, action) {

    switch(action.type) {

        case FORM_CHANGE_FIELD:
            return Object.assign({}, state, {
                [action.field]: action.value
            });

        default: return state;
    }
}

