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

export class Play extends Component {

    render(){
        const props = this.props;

        return (
            <div className={styles.wrap}>
                <VideoList />

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
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Play);
