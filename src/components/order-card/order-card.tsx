import styles from './order-card.module.css'
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import { useAppSelector } from '../../hooks/hooks';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CircleIngredient from '../circle-ingredient/circle-ingredient';
import { TOrder } from '../../types/orders';
import OrderStatus from '../order-status/order-status';

type TOrderCard = {
    forProfile?: boolean;
    order: TOrder
}
export default function OrderCard({order, forProfile = false}: TOrderCard){
    const location = useLocation();
    const { ingredients } = useAppSelector(state => state.ingredients);
    const {orderIngredients, price } = useMemo(()=> 
        {
            const orderIngredients = ingredients.filter((ingredient)=> order.ingredients.includes(ingredient._id))
                                    .map(ingredient=> ({...ingredient, count: order.ingredients.filter(id=> id === ingredient._id).length}))
            const price = orderIngredients.reduce((acc, cur)=>{
                return acc + (cur.price * cur.count );
            }, 0);
            return {orderIngredients, price}
        }                   
        ,[ingredients, order]);
    return (
        <Link key={order.number} to={forProfile ? `/profile/orders/${order.number}`: `/feed/${order.number}`} state={{ background: location }} className={`${styles.card} p-6`}>
            <div className={styles.main}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
            </div>
            <div>
            <p className='text text_type_main-medium'>{order.name}</p>
            {forProfile && (<OrderStatus status={order.status} className='mt-2'/>)}            
            </div>
            <div className={styles.composition}>
                <div className={styles.ingredients}>
                    {
                        orderIngredients.map((ingredient, i)=> <CircleIngredient key={i} url={ingredient.image_mobile} zIndex={orderIngredients.length - i} margin={i}/>)
                    }
                </div>
                <Price price={price}/>
            </div>
        </Link>
    )
}