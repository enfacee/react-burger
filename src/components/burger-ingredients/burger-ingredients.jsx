import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './burger-ingredients.module.css';
import IngredientsCategory from "./ingredient-category/ingredient-category";

function BurgerIngredients(){

    const [categories,] = useState([{
        key: 'buns',
        name: 'Булки',
        filter: 'bun',
    },{
        key: 'stuffing',
        name: 'Начинки',
        filter: 'main',
    },{
        key: 'sauces',
        name: 'Соусы',
        filter: 'sauce',
    }]);

    const [current, setCurrent] = useState('buns')

    return (
        <main className={styles.burgerIngredients}>
            <div className={styles.header}>
                <h1 className="text text_type_main-large pt-10 mb-5">Соберите бургер</h1>
                <div className ={styles.tab}>
                {
                    categories.map(category=>
                        <Tab key={category.key} value={category.key} active={current === category.key} onClick={setCurrent}>{category.name}</Tab>)
                }
                </div>
            </div>
            <div className={styles.container}>
            {
                categories.map(category=>
                    <IngredientsCategory key={category.key} category={category}/>)
            }
            </div>
        </main>
    );
}

export default BurgerIngredients;