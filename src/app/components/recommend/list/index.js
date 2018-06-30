import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import styles from './index.module.less';
import ListItem from '../listItem';

export default class RecommendList extends Component{

    render (){
        const list = this.props.list || [];
        return (
            <ul className={styles.list} onClick={this.props.openApp}>
                {list.map((item, index) => (
                    <li className={styles.item} key={index}>
                        <ListItem
                            contentImg={item.contentImg}
                            content={item.content}
                            headImg={item.userInfo.headImg}
                            nickName={item.userInfo.nickname}
                        />
                    </li>
                ))}
            </ul>
        )
    }
}
