import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';

export default class GoodsItem extends Component {

    render(){
        const {
            goodsImg,
            goodsTitle,
            newPrice,
            oldPrice,
            isCoupon, //是否有优惠
            couponAmount, //优惠价
        } = this.props;

        const couponFlag = (isCoupon === 1  && couponAmount) ? true : false;

        return (
            <div className={styles.itemSection} onClick={this.props.openApp}>
                <div className={styles.preInfo}>
                    <img className={styles.goodsImg} src={`${goodsImg}?x-oss-process=image/resize,h_100,w_100`} />
                </div>
                <div className={styles.middleInfo}>
                    <div className={styles.goodsTitle}>{goodsTitle}</div>
                    <div className={styles.goodsPrice}>
                        <span className={styles.newPrice}><i className={styles.rmb}>&yen;</i>{newPrice}</span>
                        <span className={styles.oldPrice}>{oldPrice}</span>
                    </div>
                </div>
                <div className={styles.afterInfo}>
                    {couponFlag &&
                        <React.Fragment>
                            <span className={styles.discountPrice}>{couponAmount}</span>
                            <span className={styles.discountUnit}>元券</span>
                        </React.Fragment>
                    }
                    {!couponFlag &&
                        <span className={styles.viewDetail}>查看<br />详情</span>
                    }
                </div>
            </div>
        )
    }
}


