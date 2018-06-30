export const getUrlParams = () => {
    var search = location.search.substring(1);
    var result = decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"');
    if(!result) {
        return {};
    }
    return JSON.parse('{"' + result + '"}')
}

export const isAndroid = () => {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    return isAndroid;
}

export const isWX = () => {
    var ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false;
}
