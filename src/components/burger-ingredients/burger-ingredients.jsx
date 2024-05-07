import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import styles from './burger-ingredients.module.css';
import IngredientsCategory from "./ingredient-category/ingredient-category";

function BurgerIngredients(){

    const tabsRef = useRef();

    const categories = [{
        key: 'buns',
        name: 'Булки',
        filter: 'bun',
        ref: useRef()
    },{
        key: 'stuffing',
        name: 'Начинки',
        filter: 'main',
        ref: useRef()
    },{
        key: 'sauces',
        name: 'Соусы',
        filter: 'sauce',
        ref: useRef()
    }];

    const [currentTab, setCurrentTab] = useState('buns')
    function onScrollHandle(){
        const tabBottom = tabsRef.current.getBoundingClientRect().bottom;
        const minTabToCategory = categories.map(cat=>{
            return {
                key: cat.key,
                height: Math.abs(cat.ref.current.getBoundingClientRect().top - tabBottom)
            }
        }).reduce((prev, curr)=> prev.height < curr.height ? prev : curr)
        setCurrentTab(minTabToCategory.key);
    }
    return (
        <main className={styles.burgerIngredients}>
            <div className={styles.header}>
                <h1 className="text text_type_main-large pt-10 mb-5">Соберите бургер</h1>
                <div className ={styles.tab} ref={tabsRef}>
                {
                    categories.map(category=>
                        <Tab key={category.key} value={category.key} active={currentTab === category.key} onClick={setCurrentTab}>{category.name}</Tab>)
                }
                </div>
            </div>
            <div className={styles.container} onScroll={onScrollHandle}>
            {
                categories.map(category=>
                    <IngredientsCategory key={category.key} category={category}/>)
            }
            </div>
        </main>
    );
}

export default BurgerIngredients;