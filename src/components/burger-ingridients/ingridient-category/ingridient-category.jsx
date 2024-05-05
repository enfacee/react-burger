import Ingridient from '../ingridient/ingridient'
import styles from './ingridient-category.module.css'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useGetIngridientsQuery } from "../../../services/burgerApi"

IngridientsCategory.propTypes = {
    category: PropTypes.shape({
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            filter: PropTypes.string.isRequired,
        }).isRequired
}
export default function IngridientsCategory ({category}){
    
    const { data, isLoading } = useGetIngridientsQuery();

    const filtered = useMemo(()=> !isLoading ? data.filter(item => item.type === category.filter) : null,
        [data, isLoading]);

    return (
        <>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {category.name}
            </h2>
            <div className={`${styles.ingridients} ml-4 mr-4`}>
            {
                !isLoading ? filtered.map((item)=>
                    <Ingridient key={item._id} ingridient={item} count={item.count}/>) : null
            }
            </div>
        </>
    )
}