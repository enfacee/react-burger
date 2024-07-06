import OrderCard from "../order-card/order-card";
import styles from './orders-feed.module.css'

export default function OrdersFeed(){
    return (
        <>        
            <p className='text text_type_main-large mb-5'>Лента заказов</p>
            <div className={styles.orders}>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
            </div>
        </>
    )
}