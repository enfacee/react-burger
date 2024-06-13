import styles from "./order-details.module.css"
import done from "../../img/done.png"
import { useAppSelector } from "../../hooks/hooks";

export default function OrderDetails(){
    const { order } = useAppSelector(state=> state.order);
    return (
        <div className={styles.content}>
            <p className="text text_type_digits-large mb-8">{order!.order.number}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={done} className="m-15" alt="accept"/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитель готовности на орбитальной станции</p>
        </div>
    )
};