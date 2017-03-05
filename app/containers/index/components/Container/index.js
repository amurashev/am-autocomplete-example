
import React from 'react';

import './styles.styl';

import { FormField, AutoCompleteMulti } from '../../../../components/forms';



export default class Container extends React.Component {


	render() {
		const { form, dictionaries, actions } = this.props;		
		const { country } = form;
		const { countries } = dictionaries;
		
		console.warn('Container', country);

		return (
			<div className={'box'}>

				<FormField>
					<AutoCompleteMulti
						data={countries}
					    value={country}
						placeHolder="Выберите страну"
						maxResultCount={6}
					    onChange={(value) => actions.changeFiled('country', value)}
					/>
				</FormField>

				
				
			</div>
		);

	}
}



