import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from 'app/actions';

export class CommonDownApp extends Component {
    render(){
        const style = {

        }
        return <a href={this.props.appSchemeURL} style={style}>{this.props.children}</a>
    }
}


function mapStateToProps(state) {
    return {...state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...action,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonDownApp);

