import { useLocation, useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css"
import { useAppSelector } from "../../hooks/hooks";

export default function IngredientDetails(){
    
    const { ingredientId } = useParams();    
	const { success, ingredients } = useAppSelector((state) => state.ingredients);
    const ingredient = ingredients.find(x => x._id === ingredientId)
	const location = useLocation();
	const isInModal = location.state && location.state.background;

    return (
        ingredient != null && success ?
        <div className={styles.content}>
            {!isInModal && <p className="text text_type_main-large mt-20">Детали ингредиента</p>}
            <img src={ingredient.image_large} alt='Изображение ингридиента'/>
            <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
            <div className={`${styles.items} text text_type_main-default text_color_inactive`}>
                <div>
                    <p>Каллории, ккал</p>
                    <p>{ingredient.calories}</p>
                </div>
                <div>
                    <p>Белки, г</p>
                    <p>{ingredient.proteins}</p>
                </div>
                <div>
                    <p>Жиры, г</p>
                    <p>{ingredient.fat}</p>
                </div>
                <div>
                    <p>Углеводы, г</p>
                    <p>{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div> : null
    )
};