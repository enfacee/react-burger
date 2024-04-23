import styles from './ingridient.module.css';
import Price from "../../price/price";
import PropTypes from 'prop-types'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingridientPropTypes}  from "../../../utils/ingridient-prop-types"


Ingridient.propTypes = {
    ingridient: ingridientPropTypes.isRequired,
    onIngridientClick: PropTypes.func.isRequired,
    count: PropTypes.number
}
export default function Ingridient({ingridient, onIngridientClick, count = 0}){
    function onItemClick(){
        onIngridientClick(ingridient);
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