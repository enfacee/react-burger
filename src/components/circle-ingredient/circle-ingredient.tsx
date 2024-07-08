import styles from './circle-ingredient.module.css'

type TCircleIngredient = {
    url: string,
	margin?: number;
	zIndex?: number;
}
export default function CircleIngredient({url, margin = 0, zIndex = 0} : TCircleIngredient){
    return (
        <div className={styles.circle} style={{left: `${margin * 50}px`, zIndex: zIndex, backgroundImage: `url(${url})`}}/>
    )
}