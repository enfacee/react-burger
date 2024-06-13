import Ingredient from '../ingredient/ingredient'
import styles from './ingredient-category.module.css'
import { MutableRefObject, useMemo } from 'react'
import { useAppSelector } from '../../../hooks/hooks'

type TIngredientsCategory = {
    category: TCategory;
}

type TCategory = {
    key: string;
    name: string;
    filter: string;
    ref: MutableRefObject<HTMLDivElement | null>;
}

export default function IngredientsCategory ({category}:TIngredientsCategory){
    
    const { ingredients, loading } = useAppSelector(state => state.ingredients);

    const filtered = useMemo(()=> !loading ? ingredients.filter(item => item.type === category.filter) : null,
        [ingredients, loading, category.filter]);

    return (
        <>
            <h2 className="text text_type_main-medium mt-10 mb-6" ref={category.ref}>
                {category.name}
            </h2>
            <div className={`${styles.ingredients} ml-4 mr-4`}>
            {
                !loading ? filtered!.map((item)=>
                    <Ingredient key={item._id} ingredient={item}/>) : null
            }
            </div>
        </>
    )
}