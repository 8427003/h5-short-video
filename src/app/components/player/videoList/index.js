import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from 'app/actions';
import MyVideo from '../video';
import ReactSwipe from 'react-swipe';
import { isAndroid } from 'app/helper';
import { CONTENT_TYPE, IMAGE_SWIPE_TIME } from 'app/constants';

export class VideoList extends Component {
    state = {
        playing: false,
    }
    handlePlaying = (curPos) => {
        if(!this.state.playing) {
            this.setState({
                playing: true
            })
        }
    }
    togglePlay = () => {
        if(this.props.contentType === CONTENT_TYPE.IMAGE) {
            return;
        }

        const curPos = this.swiper.getPos();
        if (this.state.playing) {
            this.videoDoms[curPos].pause();
            this.setState({
                playing: false
            })
        }
        else {
            this.videoDoms[curPos].play();
            //this.setState({
                //playing: true
            //})
        }
    }
    handlePlay = () => {
        if(this.props.contentType === CONTENT_TYPE.IMAGE) {
            return;
        }

        const curPos = this.swiper.getPos();

        //为了使第二个视频在第一个视频播放完后自动播发 ios is ok
        //if(!isAndroid() && !this.playFixed) {
            //Object.keys(this.videoDoms).forEach((item, index) => {

                //this.videoDoms[item].play();
                //setTimeout(()=>{
                    //this.videoDoms[item].pause();
                //}, 100)
            //});
            //this.playFixed = true;
        //}

        //this.videoDoms[curPos].style.width = '100%';
        this.videoDoms[curPos].style.display = 'block';
        this.videoDoms[curPos].play();
        this.initPlay = true;
    }
    handleNext = () => {
        if(!this.hasNext()) return;

        if(this.props.contentType === CONTENT_TYPE.IMAGE) {
            this.swiper.next();
            this.forceUpdate();
            return;
        }

        const curPos = this.swiper.getPos();
        this.videoDoms[curPos].pause();
        this.swiper.next();
        this.forceUpdate(() => {
            if (this.initPlay) {
                this.videoDoms[curPos + 1].play();
            }
        });
    }
    handlePrev = () => {
        if(!this.hasPrev()) return;

        if(this.props.contentType === CONTENT_TYPE.IMAGE) {
            this.swiper.prev();
            this.forceUpdate();
            return;
        }

        const curPos = this.swiper.getPos();
        console.log('do pause current')
        this.videoDoms[curPos].pause();
        this.swiper.prev();
        this.forceUpdate(() => {
            if(this.initPlay) {
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
                playing: isAndroid() ? false : false,
            })
            this.handleNext();
            return;
        }

        if(!this.hasNext()) {
            console.log('the last play end, will show recommend!')
            //this.videoDoms[curPos].style.width = 0;
            this.videoDoms[curPos].style.display = 'none';
            this.setState({
                playing: false,
            })
            this.props.showRecomend();
        }
    }
    handleSwipeChange = (index, elem) => {
        if(this.props.contentType === CONTENT_TYPE.VIDEO) {
            return;
        }
        this.forceUpdate();
        clearTimeout(this.swpipeTimer);
        if(index === this.props.videoList.length - 1) {
            this.swpipeTimer = setTimeout(() => {
                this.props.showRecomend();
            }, IMAGE_SWIPE_TIME);
        }

        // auto 存在issues，手动设置自动播放
        else if(index < this.props.videoList.length - 1){
            this.swpipeTimer = setTimeout(() => {
                this.swiper.next();
            }, IMAGE_SWIPE_TIME);
        }
    }
    initDoms = () => {
        this.videoDoms = document.getElementsByTagName('video');
    }
    componentDidUpdate() {
        this.initDoms();

        // 有数据后初始化
        if(!this.initFinish && this.videoDoms.length > 0) {
            this.initFinish = true;

            this.handlePlay();
            document.addEventListener("WeixinJSBridgeReady", () => { 
                this.handlePlay();
            }, false)
        }

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
        let swipeOptions = {
            disableScroll: true,
            continuous: false,
        }

        // 如果是图片，swipe 自动3秒切换
        if(props.contentType === CONTENT_TYPE.IMAGE) {

            // 手动prev 或 next 后auto 失效issues
            // 初始化时，callback不触发，利用auto 切换到第二页,
            // + 100 是让auto 执行一次后，晚于手动next() 执行
            swipeOptions.auto = IMAGE_SWIPE_TIME + 100;
            swipeOptions.callback = this.handleSwipeChange;
        }

        let videoList = props.videoList || [];

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
                                    contentType={props.contentType}
                                    onEnded={this.handleEnded}
                                    onPlaying={this.handlePlaying}
                                />
                            </div>
                        ))}
                    </ReactSwipe>
                    <div className={styles.maskBottom}></div>
                    <div className={styles.maskLeft}></div>
                </div>

                {(!this.state.playing && props.contentType === CONTENT_TYPE.VIDEO) &&
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
