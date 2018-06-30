import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';

export default function ActionSide ({ likeCount, commentCount, headImg, openApp }) {

    return (
        <div className={styles.actionSide}>
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
                <div className={styles.txt}>{commentCount}</div>
            </div>
            <div className={styles.likeWrap} onClick={openApp}>
                <div className={styles.likeBg}>
                    <i className={styles.likeIcon}></i>
                </div>
                <div className={styles.txt}>{likeCount}</div>
            </div>
        </div>
    )
}


