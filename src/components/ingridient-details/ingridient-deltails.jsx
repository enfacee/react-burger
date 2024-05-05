import styles from "./ingridient-details.module.css"
import { useSelector } from "react-redux";

export default function IngridientDetails(){
    
    const {ingridientDetails: ingridient} = useSelector(state=> state.modal)

    return (
        <div className={styles.content}>
            <img src={ingridient.image_large} alt='Изображение ингридиента'/>
            <p className="text text_type_main-medium mt-4 mb-8">{ingridient.name}</p>
            <div className={`${styles.items} text text_type_main-default text_color_inactive`}>
                <div>
                    <p>Каллории, ккал</p>
                    <p>{ingridient.calories}</p>
                </div>
                <div>
                    <p>Белки, г</p>
                    <p>{ingridient.proteins}</p>
                </div>
                <div>
                    <p>Жиры, г</p>
                    <p>{ingridient.fat}</p>
                </div>
                <div>
                    <p>Углеводы, г</p>
                    <p>{ingridient.carbohydrates}</p>
                </div>
            </div>
            </div>
    )
};