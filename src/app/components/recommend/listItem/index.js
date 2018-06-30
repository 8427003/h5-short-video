import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import styles from './index.module.less';
import CommonDownApp from '../../commonDownApp';

export default function ListItem ({contentImg, content, nickName, headImg}) {
    return (
        <div className={styles.itemWrap}>
            <img
                className={styles.img}
                width="100%"
                src={`${contentImg}?x-oss-process=image/resize,m_pad,w_300,h_420,color_1a1a1a`}
            />
            <div className={styles.masker}></div>
            <div className={styles.textWrap}>
                <div className={styles.tt}>{content}</div>
                <div className={styles.author}>
                    <img
                        className={styles.avatar}
                        width="19"
                        height="19"
                        src={headImg}
                    />
                    <span className={styles.name}>{nickName}</span>
                </div>
            </div>
        </div>
    )
}
