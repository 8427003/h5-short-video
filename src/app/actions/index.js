export const INIT_FETCH_DATA = 'INIT_FETCH_DATA';
export const INIT_FETCH_DATA_SUCCESS = 'INIT_FETCH_DATA_SUCCESS';
export const FETCH_EXTRA_DATA_SUCCESS = 'FETCH_EXTRA_DATA_SUCCESS';
export const SHOW_RECOMEND = 'SHOW_RECOMEND';
export const HIDDEN_RECOMEND = 'HIDDEN_RECOMEND';
export const OPEN_APP = 'OPEN_APP';
export const REPLAY = 'REPLAY';
export const CLEAR_REPLAY_FLAG = 'CLEAR_REPLAY_FLAG';

export function fetchData({ cid, uid }) {

    return { type: INIT_FETCH_DATA, cid, uid }
}

export function showRecomend () {
    return { type: SHOW_RECOMEND }
}

export function hiddenRecomend () {
    return { type: HIDDEN_RECOMEND }
}

export function openApp() {
    return { type: OPEN_APP }
}

export function replay() {
    return { type: REPLAY }
}

export function clearReplayFlag() {
    return { type: CLEAR_REPLAY_FLAG }
}

