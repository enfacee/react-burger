import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredient.module.css'
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { ingredientPropTypes }  from "../../../utils/ingredient-prop-types"
import { moveIngredient, removeIngredient } from '../../../services/burger-constructor-slice';

const typeName = 'element';

export default function BurgerIngredient({ingredient, index}){
    const ref = useRef(null)
    const dispatch = useDispatch();
    const [, drop] = useDrop({
        accept: typeName,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(moveIngredient({dragIndex, hoverIndex}))
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type:  typeName,
        item: () => {
            return { id: ingredient.key, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <div className={styles.element} style={{ opacity }} ref={ref} >
            <DragIcon type="primary" />
            <ConstructorElement text={ingredient.name}
                price={ingredient.price} thumbnail={ingredient.image_mobile} handleClose={()=>dispatch(removeIngredient(ingredient.key))}/>
        </div>
    )
}

BurgerIngredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    index: PropTypes.number.isRequired
};