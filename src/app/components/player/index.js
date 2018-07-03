import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import VideoList from './videoList';
import ActionSide from './actionSide';
import Info from './info';
import GoodsList from './goodsList';
import FooterBar from './footerBar';
import styles from './index.module.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from 'app/actions';
import _get from 'lodash/get';
import { CONTENT_TYPE } from 'app/constants';
import { isAndroid } from 'app/helper';

export class Player extends Component {

    render(){
        const props = this.props;
        let hideInfo = false;
        if(isAndroid() && props.contentType === CONTENT_TYPE.VIDEO){
            hideInfo = true;
        }

        return (
            <div className={styles.wrap}>
                <VideoList />
                {!hideInfo &&
                    <React.Fragment>
                        <div className={styles.other}>
                            <div className={styles.maskWrap}>
                                <Info
                                    tagName={props.hashtagName}
                                    content={props.content}
                                    nickName={_get(props, 'userInfo.nickname')}
                                />
                                <GoodsList list={props.goodsList}/>
                            </div>

                            <FooterBar
                                openApp={props.openApp}
                                userName={_get(props, 'shareUser.userName')}
                                headImgUrl={_get(props, 'shareUser.headImgUrl')}
                            />
                        </div>

                        <ActionSide
                            headImg={_get(props, 'userInfo.headImg')}
                            likeCount={props.praiseCount}
                            commentCount={props.commentCount}
                            openApp={props.openApp}
                            isMiddle={_get(props, 'videoList.length') === 1}
                        />
                    </React.Fragment>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);
