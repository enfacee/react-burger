import Ingredient from '../ingredient/ingredient'
import styles from './ingredient-category.module.css'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useGetIngredientsQuery } from "../../../services/burgerApi"

IngredientsCategory.propTypes = {
    category: PropTypes.shape({
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            filter: PropTypes.string.isRequired,
        }).isRequired
}
export default function IngredientsCategory ({category}){
    
    const { data, isLoading } = useGetIngredientsQuery();

    const filtered = useMemo(()=> !isLoading ? data.filter(item => item.type === category.filter) : null,
        [data, isLoading]);

    return (
        <>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {category.name}
            </h2>
            <div className={`${styles.ingredients} ml-4 mr-4`}>
            {
                !isLoading ? filtered.map((item)=>
                    <Ingredient key={item._id} ingredient={item}/>) : null
            }
            </div>
        </>
    )
}