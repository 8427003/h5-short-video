import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';
import CommonDownApp from '../../commonDownApp';

export default class footerBar extends Component {
    render(){
        const { userName, headImgUrl } = this.props;

        return (
            <div className={styles.footerBar}>
                <div className={styles.user} onClick={this.props.openApp}>
                    {userName &&
                        <div className={styles.avatar}>
                            {headImgUrl &&
                                <img className={styles.img} src={headImgUrl} />
                            }
                            <div className={styles.textWrap}>
                                <span className={styles.name}>{userName}</span>
                                <span className={styles.recommend}>邀请你使用糖衣</span>
                            </div>
                        </div>
                    }
                    {!userName &&
                            <div className={styles.default}>
                                <span className={styles.logo}></span>
                                <span className={styles.brandDesc}>糖衣 , 连接品位</span>
                            </div>
                    }
                </div>
                <div className={styles.btnWrap}>
                    <button className={styles.openAppBtn} onClick={this.props.openApp}>打开糖衣</button>
                </div>

            </div>
        )
    }
}


