import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { getContentByCid, getContentByHashtag, getAppScheme } from '../service';
import { PLATFORM_TYPE } from '../constants';
import _get from 'lodash/get';
import { isAndroid } from '../helper';
import {
    INIT_FETCH_DATA,
    INIT_FETCH_DATA_SUCCESS,
    FETCH_EXTRA_DATA_SUCCESS,
} from '../actions'
import { CONTENT_TYPE } from 'app/constants';

const getVideoList = (list = [], contentType) => {

    // android 平台会弹起播放器，swipe切换效果布局紊乱
    // 去掉多视频播放
    if(list.length > 1 && isAndroid() && contentType === CONTENT_TYPE.VIDEO) {
        return list.slice(0, 1);
    }

    return list;
}

export function* initPage(action) {
    const { cid, uid } = action;

    let response = yield call(getContentByCid, { cid, uid } );
    const content = _get(response, 'data.resultContent.content');
    const shareUser = _get(response, 'data.resultContent.shareUser');
    let state = {
        praiseCount: content.praiseCount, //点赞数
        commentCount: content.commentCount, //评论数
        hashtagName: content.hashtagName, // 标签
        content: content.content,
        shareUser: shareUser, // 分享人
        userInfo: content.userInfo, // 用户信息
        contentType: content.contentType, // 1-视频 2-图文
        goodsList: content.goodsList || [], // 商品列表
        videoList: getVideoList(content.videoList, content.contentType), // 视频列表
    }
    yield put({ type: INIT_FETCH_DATA_SUCCESS, payload: state });



    let resByHashtag = yield call(getContentByHashtag, { hashtagId: content.hashtagId } );
    let resAppscheme = yield call(getAppScheme, { type: isAndroid() ? PLATFORM_TYPE.ANDROID : PLATFORM_TYPE.IOS } );

    state = {
        recommendList: _get(resByHashtag, 'data.resultContent'),
        appSchemeURL: _get(resAppscheme, 'data.resultContent.downloadUrl')
    }

    yield put({ type: FETCH_EXTRA_DATA_SUCCESS, payload: state });

}

export default function* rootSaga() {
    yield all([
        takeEvery(INIT_FETCH_DATA, initPage),
    ])
}

