import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import styles from './order.module.css'
import { useAppSelector } from "../../hooks/hooks";
import { useMemo } from "react";
import CircleIngredient from "../circle-ingredient/circle-ingredient";
import { useLocation } from "react-router-dom";
import OrderStatus from "../order-status/order-status";
import { OrderStatusEnum } from "../../types/orders";

export default function Order(){    
	const location = useLocation();
	const isInModal = location.state && location.state.background;
    const { ingredients } = useAppSelector(state=>state.ingredients);
    const orderIngredients = useMemo(()=> ingredients.slice(0, 10)
        ,[ingredients]);
    return (        
        <div className={!isInModal ? `${styles.page}`: ''}>            
            <p className='text text_type_digits-default mb-10'>#034535</p>
            <p className='text text_type_main-medium mb-3'>Black Hole Singularity острый бургер</p>
            <OrderStatus className='mb-15' status={OrderStatusEnum.DONE}/>
            <p className='text text_type_main-medium mb-6'>Состав:</p>
            <div className={`${styles.ingredients} mb-10`}>
                {
                    orderIngredients.map((ingredient, i)=>(
                        <div key={i} className={`${styles.ingredient} mr-6`}>
                            <div className={styles.ingredient}>
                                <CircleIngredient url={ingredient.image_mobile}/>
                                <p className="text text_type_main-default">{ingredient.name}</p>
                            </div>
                            <Price price={`${1}x${ingredient.price}`}/>
                        </div>
                    ))
                }                
            </div>
            <div className={styles.footer}>
                <FormattedDate date={new Date()} className='text text_type_main-default text_color_inactive'/>
                <Price price={510}/>
            </div>
        </div>
    )
}