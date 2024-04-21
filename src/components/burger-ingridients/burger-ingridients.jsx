import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import PropTypes from 'prop-types'
import styles from './burger-ingridients.module.css';
import IngridientsCategory from "./ingridient-category/ingridient-category";

function BurgerIngridients({items}){
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
                <IngridientsCategory items={items} filter={'bun'}/>
                <IngridientsCategory items={items} filter={'sauce'}/>
                <IngridientsCategory items={items} filter={'main'}/>
            </div>
        </main>
    );
}
const ingridientPropTypes = PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
});
BurgerIngridients.propTypes = {
    items: PropTypes.arrayOf(ingridientPropTypes).isRequired
}

export default BurgerIngridients;