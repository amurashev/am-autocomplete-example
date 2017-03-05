import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';

import Container from './components/Container';


const App = (props) => <Container {...props} />;


function mapStateToProps(state) {
	return {
		form: state.form,
		dictionaries: state.dictionaries
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);