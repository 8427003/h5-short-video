import 'normalize.css';
import './index.less';
import React, { Component } from 'react';
import Recommend from './components/recommend';
import Play from './components/play';
import { hot } from 'react-hot-loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from 'app/actions';
import { getUrlParams } from './helper';

export class App extends Component {

    componentDidMount () {
        var query = getUrlParams();

        this.props.fetchData({ cid: query.cid || 1, uid: query.uid || 2 });
    }

    render() {
        return (
            <div>
                <Play />
                {this.props.recomendShow && <Recommend />}
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
