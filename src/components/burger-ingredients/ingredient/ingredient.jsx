import styles from './ingredient.module.css';
import Price from "../../price/price";
import { useDispatch, useSelector } from "react-redux";
import { showInfo } from "../../../services/modal-slice";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropTypes}  from "../../../utils/ingredient-prop-types"
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';


Ingredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired
}
export default function Ingredient({ingredient}){

    const [{isDrag}, dragRef] = useDrag({
        type: ingredient.type !== 'bun' ? 'ingredient' : ingredient.type,
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    const { bun, ingredients} = useSelector(state=>state.burgerContructor);
    const dispatch = useDispatch();
    var count = useMemo(()=>{
        return bun && bun._id === ingredient._id ? 2 : ingredients.filter(item=>item._id === ingredient._id).length;
    }, [bun, ingredients])
    function onItemClick(){
        dispatch(showInfo(ingredient));
    }
    return(
        <div className={styles.ingredient} onClick={onItemClick} ref={dragRef}>
            <img src={ingredient.image} className="pl-4 pr-4 pb-1" alt="Изображение ингридиента"/>
            <Price price={ingredient.price}/>
            <p className="text text_type_main-default mt-1">{ingredient.name}</p>
            {
                count > 0 ? <Counter count={count}/> : null
            }
        </div>
    )
}