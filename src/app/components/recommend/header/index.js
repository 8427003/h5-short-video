import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from '../../../actions';
import styles from './index.module.less';

export default function Header({openApp}) {
    return (
        <div className={styles.title} onClick={openApp}>
            <div className={styles.logo}></div>
            <div className={styles.textWrap}>
                <div className={styles.nameWrap}>用<span className={styles.name}>糖衣</span></div>
                <div className={styles.desc}>找到跟多有品味的人</div>
            </div>
        </div>
    )
}
