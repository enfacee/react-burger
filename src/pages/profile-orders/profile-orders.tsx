import OrderCard from "../../components/order-card/order-card";
import styles from './profile-orders.module.css'

export function ProfileOrdersPage(){
    return (
        <div className={styles.orders}>
            <OrderCard forProfile={true}/>
            <OrderCard forProfile={true}/>
            <OrderCard forProfile={true}/>
            <OrderCard forProfile={true}/>
            <OrderCard forProfile={true}/>
        </div>
    )
}