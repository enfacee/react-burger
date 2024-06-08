import Ingredient from '../ingredient/ingredient'
import styles from './ingredient-category.module.css'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

IngredientsCategory.propTypes = {
    category: PropTypes.shape({
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            filter: PropTypes.string.isRequired,
            ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        }).isRequired
}
export default function IngredientsCategory ({category}){
    
    const { ingredients, loading } = useSelector(state => state.ingredients);

    const filtered = useMemo(()=> !loading ? ingredients.filter(item => item.type === category.filter) : null,
        [ingredients, loading, category.filter]);

    return (
        <>
            <h2 className="text text_type_main-medium mt-10 mb-6" ref={category.ref}>
                {category.name}
            </h2>
            <div className={`${styles.ingredients} ml-4 mr-4`}>
            {
                !loading ? filtered.map((item)=>
                    <Ingredient key={item._id} ingredient={item}/>) : null
            }
            </div>
        </>
    )
}