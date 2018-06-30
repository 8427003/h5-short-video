import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';
import GoodsItem from './item';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from 'app/actions';

export class GoodsList extends Component {
    render(){
        const list = this.props.list || [];
        const size = list.length;

        if(size == 0) {
            return null;
        }

        const width = `${size === 1 ? 100 : 76.25 * size}%`;

        return (
            <div className={styles.goodsList}>
                <div className={styles.listView}>
                    <ul className={styles.listWrap} style={{width}}>
                        {list.map((item, index) => (
                            <li className={styles.itemWrap} key={index}>
                                <GoodsItem
                                    openApp={this.props.openApp}
                                    goodsTitle={item.goodsTitle}
                                    goodsImg={item.goodsImg}
                                    newPrice={item.price2}
                                    oldPrice={item.price1}
                                    isCoupon={item.isCoupon}
                                    couponAmount={item.couponAmount}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {...state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...action,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList);
