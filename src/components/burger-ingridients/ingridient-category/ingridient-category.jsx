import Ingridient from "../ingridient/ingridient"
import styles from "./ingridient-category.module.css"

export default function IngridientsCategory ({filter, items}){
    return (
        <>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {filter === 'bun' ?
                "Булки":filter==='sauce' ?
                    "Соусы" : "Начинки"}
            </h2>
            <div className={`${styles.ingridients} ml-4 mr-4`}>
            {
                items.filter(item => item.type === filter).map((item, key)=>
                    <Ingridient key={key} ingridient={item}/>
                )
            }
            </div>
        </>
    )
    }