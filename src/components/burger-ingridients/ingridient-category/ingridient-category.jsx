import Ingridient from "../ingridient/ingridient"
import styles from "./ingridient-category.module.css"
import PropTypes from 'prop-types'

const ingridientPropTypes = PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
});

IngridientsCategory.propTypes = {
    items: PropTypes.arrayOf(ingridientPropTypes).isRequired,
    filter: PropTypes.string.isRequired
}
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