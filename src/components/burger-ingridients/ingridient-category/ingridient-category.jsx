import Ingridient from '../ingridient/ingridient'
import styles from './ingridient-category.module.css'
import PropTypes from 'prop-types'
import {ingridientPropTypes} from '../../../utils/ingridient-prop-types'

IngridientsCategory.propTypes = {
    items: PropTypes.arrayOf(ingridientPropTypes).isRequired,
    onIngridientClick: PropTypes.func.isRequired,
    filter: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired
}
export default function IngridientsCategory ({filter, items, onIngridientClick}){
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
                    <Ingridient key={item._id} ingridient={item} onIngridientClick={onIngridientClick}
                    count={filter==="main" ? 1
                    : key===0 && filter==="bun" ? 2
                    : 0}/>
                )
            }
            </div>
        </>
    )
}