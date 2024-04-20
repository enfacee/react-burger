import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import Price from "../price/price";
const Bun =({ingridient, isTop = true})=>{
    return(
        <ConstructorElement 
        type={isTop?"top":"bottom"}
        isLocked={true}
        text={ingridient.name+(isTop? "(верх)":" (низ)")}
        price={ingridient.price}
        thumbnail={ingridient.image_mobile}/>
    )
};
const Ingridient =({ingridient})=>{
    return(
        <ConstructorElement text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image_mobile}/>
    )
};
export default function BurgerContructor({data}){
    const bun = data[0];
    const ingridients = data.filter(item=>item.type==='main');
    const price = bun.price+ ingridients.reduce((acc, {price})=>{
        return acc+ price;
    }, bun.price);
    return(
        <div className={`${styles.main} mt-25 pm-4 mr-4`}>
            <Bun ingridient={bun}/>
            <div className={styles.container}>
            {
                ingridients.map((item, key)=>
                    <Ingridient key={key} ingridient={item}/>
                )
            }
            </div>
            <Bun ingridient={bun} isTop={false}/>
            <div className={`${styles.footer} mt-10 mb-10`}>
                <Price price={price} size={"medium"}/>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}