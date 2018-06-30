import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import styles from './index.module.less';

export default function Footer({ openApp, replay }) {
    return (
        <div className={styles.btnWrap}>
            <button className={styles.replay} onClick={replay}>重新播放</button>
            <button className={styles.openApp} onClick={openApp}>打开糖衣</button>
        </div>
    )
}


