import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './actions';

function Btn (props) {
    return <button
                onClick={props.toggleClick.bind(this, props.xxx)}
           >{props.xxx ? 'false': 'true'}</button>
}

function mapStateToProps(state) {
    return {...state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...action,
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Btn);
