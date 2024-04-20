import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './burger-ingridients.module.css';
import IngridientsCategory from "./ingridient-category/ingridient-category";

export default function BurgerIngridients({data}){
    const [current, setCurrent] = useState('buns')
    return (
        <main className={styles.burgerIngridients}>
            <div className={styles.header}>
                <h1 className="text text_type_main-large pt-10 mb-5">Соберите бургер</h1>
                <div className ={styles.tab}>
                    <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                    <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                    <Tab value="stuffing" active={current === 'stuffing'} onClick={setCurrent}>Начинки</Tab>
                </div>
            </div>
            <div className={styles.container}>
                <IngridientsCategory items={data} filter={'bun'}/>
                <IngridientsCategory items={data} filter={'sauce'}/>
                <IngridientsCategory items={data} filter={'main'}/>
            </div>
        </main>
    );
}