import { useAppSelector } from "../../hooks/hooks";
import OrderCard from "../order-card/order-card";
import styles from './orders-feed.module.css'

export default function OrdersFeed(){
    const {orders} = useAppSelector(state => state.feedOrders)
    return (
        <>        
            <p className='text text_type_main-large mb-5'>Лента заказов</p>
            <div className={styles.orders}>
                {
                    orders.map((order, i)=> <OrderCard key={i} order={order}/>)
                }
            </div>
        </>
    )
}