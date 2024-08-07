import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import styles from './bun.module.css';
import { addBun } from "../../../services/reducers/burger-constructor";
import { useAppDispatch } from "../../../hooks/hooks";
import { TIngredientResponse } from "../../../types/response";

type TBun = {
    bun: TIngredientResponse | null;
    type: 'top' | 'bottom';
}
export default function Bun({bun, type}: TBun){
    const dispatch = useAppDispatch();
    const [{isHover}, dropTarget] = useDrop({
        accept: 'bun',
        drop(item) {
            dispatch(addBun(item));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const style = {        
        borderStyle: isHover ?"dotted":"none"
    }
    return(
        <div className={styles.bun} ref={dropTarget} data-cy={`bun-constructor-${type}`} >
            {
                bun ? <ConstructorElement 
                        type={type}
                        isLocked={true}
                        text={bun.name+(type === "top"? "(верх)":" (низ)")}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        />
                    : <div className={`${styles.emptyBun} constructor-element text text_type_main-default ml-2 constructor-element_pos_${type}`} style={style}>Выберите булки</div>
            }
        </div>
    )
};