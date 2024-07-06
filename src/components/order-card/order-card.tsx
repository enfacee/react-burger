import styles from './order-card.module.css'
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import { useAppSelector } from '../../hooks/hooks';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CircleIngredient from '../circle-ingredient/circle-ingredient';

type TOrderCard = {
    forProfile?: boolean;
}
export default function OrderCard({forProfile = false}: TOrderCard){
    const location = useLocation();
    const number = `034535`;
    const { ingredients } = useAppSelector(state=>state.ingredients);
    const imgs = useMemo(()=> ingredients.slice(0, 6).map(item=>item.image_mobile)
        ,[ingredients]);
    return (
        <Link key={number} to={forProfile ? `/profile/orders/${number}`: `/feed/${number}`} state={{ background: location }} className={`${styles.card} p-6`}>
            <div className={styles.main}>
                <p className='text text_type_digits-default'>{'#' + number}</p>
                <p className="text text_type_main-default text_color_inactive">
					<FormattedDate date={new Date()} />
				</p>
            </div>
            <div>
            <p className='text text_type_main-medium'>Death Star Starship Main бургер</p>
            {forProfile && (<p className="text text_type_main-default mt-2">Готовится</p>)}            
            </div>
            <div className={styles.composition}>
                <div className={styles.ingredients}>
                    {
                        imgs.map((img, i)=> <CircleIngredient key={i} url={img} zIndex={imgs.length - i} margin={i}/>)
                    }
                </div>
                <Price price={480}/>
            </div>
        </Link>
    )
}