import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import RecommendHeader from './header';
import RecommendList from './list';
import RecommendFooter from './footer';
import styles from './index.module.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from 'app/actions';

export class Recommend extends Component {

    render(){
        const props = this.props;

        return (
            <div className={styles.recommend}>
                <div className={styles.content}>
                    <RecommendHeader openApp={this.props.openApp}/>
                    <RecommendList list={props.recommendList} openApp={this.props.openApp}/>
                    <RecommendFooter openApp={this.props.openApp} replay={this.props.replay}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state = {}) {
    return {
        recommendList: state.recommendList
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...action,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
