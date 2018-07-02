import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';

function num10K(count) {
    if(count === undefined) {
        return '';
    }

    if (count < 10000) {
        return count;
    }

    return `${(Math.floor(count/10000 * 10) / 10).toFixed(1)}万`;
}

export default function ActionSide ({ likeCount, commentCount, headImg, openApp, isMiddle }) {

    return (
        <div className={isMiddle ? styles.actionSideMiddle : styles.actionSide}>
            <div className={styles.avatarWrap}>
                {headImg &&
                    <img
                        width="44"
                        height="44"
                        src={headImg}
                        className={styles.avatar}
                        onClick={openApp}
                    />
                }
            </div>
            <div className={styles.commentsWrap} onClick={openApp}>
                <div className={styles.commentsBg} >
                    <i className={styles.commentsIcon}></i>
                </div>
                <div className={styles.txt}>{num10K(commentCount)}</div>
            </div>
            <div className={styles.likeWrap} onClick={openApp}>
                <div className={styles.likeBg}>
                    <i className={styles.likeIcon}></i>
                </div>
                <div className={styles.txt}>{num10K(likeCount)}</div>
            </div>
        </div>
    )
}
