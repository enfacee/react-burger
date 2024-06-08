import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch} from "react-redux";
import { useDrop } from "react-dnd";
import styles from './bun.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes }  from "../../../utils/ingredient-prop-types"
import { addBun } from "../../../services/reducers/burger-constructor";


export default function Bun({bun, type}){
    const dispatch = useDispatch();
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
        <div className={styles.bun} ref={dropTarget} >
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
Bun.propTypes = {
    bun: ingredientPropTypes,
    type: PropTypes.string.isRequired
};