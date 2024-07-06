import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersInfo from '../../components/orders-info/orders-info';
import styles from './feed.module.css';

export function FeedPage() {
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