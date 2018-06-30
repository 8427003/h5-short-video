import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from 'app/actions';

export class Video extends Component {
    handlePlayEnd = () => {
        this.props.onEnded && this.props.onEnded(this.props.index);
    }
    handlePlaying = () => {
        this.props.onPlaying && this.props.onPlaying(this.props.onPlaying)
    }
    componentDidMount(){
    }
    render(){
        return (
            <div className={styles.wrap}>
                <video
                    ref={dom => {this.dom = dom}}
                    webkit-playsinline="true"
                    playsInline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="true"
                    x5-video-orientation="portrait"
                    className={styles.video}
                    poster={this.props.poster}
                    onEnded={this.handlePlayEnd}
                >
                    <source src={this.props.src} type="video/mp4" />
                </video>
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

export default connect(mapStateToProps, mapDispatchToProps)(Video);