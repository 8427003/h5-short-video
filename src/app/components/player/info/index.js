import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';

export default class Info extends Component {
    render(){
        const { tagName, content, nickName } = this.props;
        return (
            <div className={styles.infoWrap}>
                {tagName &&
                    <div className={styles.tagWrap}>
                        <span className={styles.tag}>{tagName}</span>
                    </div>
                }
                {nickName && <div className={styles.name}>@{nickName}</div>}
                {content && <p className={styles.desc}>{content}</p>}
            </div>
        )
    }
}


