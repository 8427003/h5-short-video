import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from 'app/actions';
import MyVideo from '../video';
import ReactSwipe from 'react-swipe';

export class VideoList extends Component {
    state = {
        playing: false,
    }
    togglePlay = () => {
        const curPos = this.swiper.getPos();
        if (this.state.playing) {
            this.videoDoms[curPos].pause();
            this.setState({
                playing: false
            })
        }
        else {
            this.videoDoms[curPos].play();
            this.setState({
                playing: true
            })
        }
    }
    handlePlay = () => {
        const curPos = this.swiper.getPos();

        // weixin ios is ok
        if(!this.playFixed) {
            Object.keys(this.videoDoms).forEach((item) => {
                //this.videoDoms[item].play();
                //this.videoDoms[item].pause();
            });
            this.playFixed = true;
        }

        this.videoDoms[curPos].play();
        this.setState({
            playing: true,
        })
    }
    handleNext = () => {
        if(!this.hasNext()) return;

        const curPos = this.swiper.getPos();
        console.log('do pause current')
        this.videoDoms[curPos].pause();
        this.swiper.next();
        this.forceUpdate(() => {
            if (this.state.playing) {
                console.log('do play next')
                this.videoDoms[curPos + 1].play();
            }
        });
    }
    handlePrev = () => {
        if(!this.hasPrev()) return;

        const curPos = this.swiper.getPos();
        console.log('do pause current')
        this.videoDoms[curPos].pause();
        this.swiper.prev();
        this.forceUpdate(() => {
            if(this.state.playing) {
                console.log('do play prev')
                this.videoDoms[curPos - 1].play();
            }
        });
    }
    hasNext = () => {
        const curPos = this.swiper.getPos();
        const totalSlides = this.swiper.getNumSlides();
        return (curPos < totalSlides - 1) ? true : false;
    }
    hasPrev = () => {
        const curPos = this.swiper.getPos();
        return curPos > 0 ? true : false;
    }
    handleEnded = index => {
        const curPos = this.swiper.getPos();
        const totalSlides = this.swiper.getNumSlides();

        if(index !== curPos) return;

        if(this.hasNext()) {
            console.log('current play end, will play next one!')
            this.setState({
                playing: false,
            })
            this.handleNext();
            return;
        }

        if(!this.hasNext()) {
            console.log('the last play end, will show recommend!')
            this.setState({
                playing: false,
            })
            this.props.showRecomend();
        }
    }
    initDoms = () => {
        this.videoDoms = document.getElementsByTagName('video');
    }
    componentDidUpdate() {
        this.initDoms();

        if(this.props.replayFlag) {
            this.props.clearReplayFlag();
            this.swiper.slide(0);
            this.handlePlay();
        }
    }
    componentDidMount() {
        this.initDoms();
    }
    render(){
        const props = this.props;
        const style = {
            container: {
                height: '100%',
                overflow: 'hidden'
            },
            wrapper: {
                height: '100%'
            },
            child: {
                position: 'relative',
                float: 'left',
                height: '100%',
            }

        }
        const swipeOptions = {
            disableScroll: true,
            continuous: false,
        }
        const videoList = props.videoList || [];

        return (
            <React.Fragment>
                <div style={{width: '100%', height: '100%'}} onClick={this.togglePlay}>
                    <ReactSwipe
                        ref={dom => this.swiper = dom}
                        style={style}
                        swipeOptions={swipeOptions}
                        key={videoList.length}
                    >
                        {videoList.map((item, index) => (
                            <div key={index} >
                                <MyVideo
                                    index={index}
                                    poster={item.videoImg}
                                    src={item.videoUrl}
                                    onEnded={this.handleEnded}
                                />
                            </div>
                        ))}
                    </ReactSwipe>
                    <div className={styles.mask}></div>
                </div>

                {!this.state.playing &&
                    <div className={styles.playBtn} onClick={this.handlePlay}></div>
                }

                {this.swiper && this.hasPrev() &&
                    <button className={styles.pre} onClick={this.handlePrev}></button>
                }
                {this.swiper && this.hasNext() &&
                    <button className={styles.next} onClick={this.handleNext}></button>
                }
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
