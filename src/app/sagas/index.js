import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { getContentByCid, getContentByHashtag, getAppScheme } from '../service';
import { PLATFORM_TYPE } from '../constants';
import _get from 'lodash/get';
import {
    INIT_FETCH_DATA,
    INIT_FETCH_DATA_SUCCESS,
    FETCH_EXTRA_DATA_SUCCESS,
} from '../actions'

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
        videoList: content.videoList || [], // 视频列表
    }
    yield put({ type: INIT_FETCH_DATA_SUCCESS, payload: state });



    let resByHashtag = yield call(getContentByHashtag, { hashtagId: content.hashtagId } );
    let resAppscheme = yield call(getAppScheme, { type: PLATFORM_TYPE.ANDROID } );

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

