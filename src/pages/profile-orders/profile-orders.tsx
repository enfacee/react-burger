import { useEffect } from "react";
import OrderCard from "../../components/order-card/order-card";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from './profile-orders.module.css'
import { wsProfileConnect, wsProfileDisconnect } from "../../services/actions/orders";
import { WSS_URL } from "../../services/api";

export function ProfileOrdersPage(){

    const { orders } = useAppSelector(state => state.profileOrders)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        let token = (localStorage.getItem("accessToken") ?? '').replace("Bearer ", "");
      dispatch(wsProfileConnect(WSS_URL + `?token=${token}`));
      return () => {
        dispatch(wsProfileDisconnect());
      }
    }// eslint-disable-next-line
    ,[]);
    return (
        orders.length > 0 ? 
        <div className={styles.orders}>
            {
                orders.map((order, i)=> <OrderCard key={i} order={order} forProfile={true}/>)
            }
        </div> : <></>
    )
}