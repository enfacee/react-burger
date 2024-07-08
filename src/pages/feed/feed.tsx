import { useEffect } from 'react';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersInfo from '../../components/orders-info/orders-info';
import styles from './feed.module.css';
import { useAppDispatch } from '../../hooks/hooks';
import { wsFeedDisconnect, wsFeedConnect } from '../../services/actions/orders';
import { WSS_URL } from '../../services/api';

export function FeedPage() {
    const dispatch = useAppDispatch();
    useEffect(()=>{
      dispatch(wsFeedConnect(WSS_URL + '/all'));

      return () => {
        dispatch(wsFeedDisconnect());
      }
    }// eslint-disable-next-line
    ,[]);
    return (
          <div className={`${styles.mainContainer} mb-8`}>
              <div className={styles.box}>
                <OrdersFeed/>
              </div>
              <div className={styles.box}>
                <OrdersInfo/>
              </div>
          </div>
      )
};