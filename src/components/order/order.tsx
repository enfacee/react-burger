import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import styles from './order.module.css'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import CircleIngredient from "../circle-ingredient/circle-ingredient";
import { useLocation, useParams } from "react-router-dom";
import OrderStatus from "../order-status/order-status";
import Preloader from "../preloader/preloader";
import { getOrderByNumber } from "../../services/actions/order";

export default function Order(){
    const { number } = useParams();
    const dispatch = useAppDispatch();
	const location = useLocation();
	const isInModal = location.state && location.state.background;
    const orderNumber = number as string 
    const ingredients = useAppSelector(state => state.ingredients.ingredients);
    const order = useAppSelector(state => {
        let order = state.feedOrders.orders.find(o => o.number === +orderNumber);
        if (order){
            return order;
        }
        order = state.profileOrders.orders.find(o => o.number === +orderNumber);
        if (order) {
            return order;
        }
        return state.order.currentOrder;
    })
    useEffect(() => {
        if (!order) {
            dispatch(getOrderByNumber(orderNumber));
        }
    }, [dispatch, order, orderNumber]);
    if (!order)
        return <Preloader/>
    
    const orderIngredients = ingredients.filter((ingredient)=> order.ingredients.includes(ingredient._id))
                            .map(ingredient=> ({...ingredient, count: order.ingredients.filter(id=> id === ingredient._id).length}))
    const price = orderIngredients.reduce((acc, cur)=> acc + cur.price * cur.count, 0);

    return (        
        <div className={!isInModal ? `${styles.page}`: ''}>            
            <p className='text text_type_digits-default mb-10'>#{order.number}</p>
            <p className='text text_type_main-medium mb-3'>{order.name}</p>
            <OrderStatus className='mb-15' status={order.status}/>
            <p className='text text_type_main-medium mb-6'>Состав:</p>
            <div className={`${styles.ingredients} mb-10`}>
                {
                    orderIngredients.map((ingredient, i)=>(
                        <div key={i} className={`${styles.ingredient} mr-6`}>
                            <div className={styles.ingredient}>
                                <CircleIngredient url={ingredient.image_mobile}/>
                                <p className="text text_type_main-default">{ingredient.name}</p>
                            </div>
                            <Price price={`${ingredient.count}x${ingredient.price}`}/>
                        </div>
                    ))
                }                
            </div>
            <div className={styles.footer}>
                <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive'/>
                <Price price={price}/>
            </div>
        </div>
    )
}