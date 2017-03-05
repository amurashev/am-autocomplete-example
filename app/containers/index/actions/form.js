
import {
	FORM_CHANGE_FIELD
} from '../constants';

export const changeFiled = (field, value) => {
	
	return {
		type: FORM_CHANGE_FIELD,
		field,
		value
	}
};

