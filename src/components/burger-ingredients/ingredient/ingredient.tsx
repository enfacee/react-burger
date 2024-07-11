import styles from './ingredient.module.css';
import Price from "../../price/price";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import { TIngredientResponse } from '../../../types/response';


type TIngredientProps = {
    ingredient: TIngredientResponse
}

export default function Ingredient({ingredient}:TIngredientProps){
    const location = useLocation();
  
    const ingredientId = ingredient._id;

    const [, dragRef] = useDrag<TIngredientResponse, unknown, unknown>({
        type: ingredient.type !== 'bun' ? 'ingredient' : ingredient.type,
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    const { bun, ingredients} = useAppSelector(state=>state.burgerContructor);
    var count = useMemo(()=>{
        return bun && bun._id === ingredient._id ? 2 : ingredients.filter(item=>item._id === ingredient._id).length;
        }, [bun, ingredient, ingredients])
    return(
        <Link key={ingredientId} to={`/ingredients/${ingredientId}`} state={{ background: location }} className={styles.ingredient} ref={dragRef}>
            <img src={ingredient.image} className="pl-4 pr-4 pb-1" alt="Изображение ингридиента"/>
            <Price price={ingredient.price}/>
            <p className="text text_type_main-default mt-1" data-cy="ingredient">{ingredient.name}</p>
            {
                count > 0 ? <Counter count={count}/> : null
            }
        </Link>
    )
}