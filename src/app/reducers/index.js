import {
    INIT_FETCH_DATA,
    INIT_FETCH_DATA_SUCCESS,
    FETCH_EXTRA_DATA_SUCCESS,
    SHOW_RECOMEND,
    HIDDEN_RECOMEND,
    OPEN_APP,
    REPLAY,
    CLEAR_REPLAY_FLAG,
} from '../actions'

export default function playVideo(state = {}, action) {
    switch (action.type) {

        case INIT_FETCH_DATA:
            return {}

        case INIT_FETCH_DATA_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }

        case FETCH_EXTRA_DATA_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }

        case SHOW_RECOMEND : {
            return {
                ...state,
                recomendShow: true,
            }
        }
        case HIDDEN_RECOMEND : {
            return {
                ...state,
                recomendShow: false,
            }
        }
        case OPEN_APP: {
            window.location.href= state.appSchemeURL;
            return {
                ...state
            }
        }
        case REPLAY: {
            return {
                ...state,
                recomendShow: false,
                replayFlag: true,
            }
        }
        case CLEAR_REPLAY_FLAG: {
            return {
                ...state,
                replayFlag: false,
            }
        }

        default:
            return state || null
    }
}
