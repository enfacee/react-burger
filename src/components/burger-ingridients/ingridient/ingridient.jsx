import styles from './ingridient.module.css';
import Price from "../../price/price";
export default function Ingridient({ingridient}){
    return(
        <div className={styles.ingridient}>
            <img src={ingridient.image} className="pl-4 pr-4 pb-1" alt="Изображение ингридиента"/>
            <Price price={ingridient.price}/>
            <p className="text text_type_main-default mt-1">{ingridient.name}</p>
        </div>
    )
}