import axios from 'axios';
import qs from 'qs';

// 接口文档
// https://shimo.im/docs/JhbHOaYUp9UuaX9J

export const getContentByCid = ({ cid, uid }) => {
    return axios.get('/api/contentlist/v1/getbycid', {
        params: {
            cid,
            uid
        }
    });
}

export const getContentByHashtag = ({ hashtagId }) => {
    return axios.get('/api/contentlist/v1/getbyhashtag', {
        params: {
            hashtagId,
        }
    });
}

export const getAppScheme = type => {
    return axios.get('/api/version/v1/getversion', qs.stringify({type}));
}
