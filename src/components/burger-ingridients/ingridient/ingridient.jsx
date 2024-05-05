import styles from './ingridient.module.css';
import Price from "../../price/price";
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux";
import { showInfo } from "../../../services/modal-slice";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingridientPropTypes}  from "../../../utils/ingridient-prop-types"


Ingridient.propTypes = {
    ingridient: ingridientPropTypes.isRequired,
    count: PropTypes.number
}
export default function Ingridient({ingridient, count = 0}){

    const dispatch = useDispatch();

    function onItemClick(){
        dispatch(showInfo(ingridient));
    }
    return(
        <div className={styles.ingridient} onClick={onItemClick}>
            <img src={ingridient.image} className="pl-4 pr-4 pb-1" alt="Изображение ингридиента"/>
            <Price price={ingridient.price}/>
            <p className="text text_type_main-default mt-1">{ingridient.name}</p>
            {
                count > 0 ? <Counter count={count}/> : null
            }
        </div>
    )
}