import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredient.module.css'
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { moveIngredient, removeIngredient } from '../../../services/reducers/burger-constructor';
import { TIngredient } from "../../../types/ingredient";
import { useAppDispatch } from "../../../hooks/hooks";

const typeName = 'element';

type TBurgerIngredient = {
    ingredient: TIngredient & { key: string};
    index: number;
}

type TDragObject = {
    id: string;
    index: number;
}

type TCollectedProps = {
    isDragging: boolean;
}

export default function BurgerIngredient({ingredient, index} : TBurgerIngredient){
    const ref = useRef<HTMLDivElement | null>(null)
    const dispatch = useAppDispatch();
    const [, drop] = useDrop<TDragObject, unknown, unknown>({
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
            if (!clientOffset) {
                return
            }
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
    const [{ isDragging }, drag] = useDrag<TDragObject, unknown, TCollectedProps>({
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