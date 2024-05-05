import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import Price from "../price/price";
import PropTypes from 'prop-types';
import {ingridientPropTypes}  from "../../utils/ingridient-prop-types"


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
Bun.propTypes = {
    ingridient: ingridientPropTypes.isRequired,
    isTop: PropTypes.bool
};

// BurgerContructor.propTypes = {
//     items: PropTypes.arrayOf(ingridientPropTypes).isRequired,
//     openModal: PropTypes.func.isRequired
// };
export default function BurgerContructor(){
    // const bun = items[0];
    // const sause = items.filter(item=>item.type==='sauce')[0];
    // const ingridients = items.filter(item=>item.type==='main');
    // const price = bun.price+ ingridients.reduce((acc, {price})=>{
    //     return acc + price;
    // }, bun.price*2 + sause.price);

    return(
        <div className={`${styles.main} mt-25 pm-4 mr-4`}>
            {/* <Bun ingridient={bun}/>
            <div className={styles.container}>
            <ConstructorElement text={sause.name}
                        price={sause.price}
                        thumbnail={sause.image_mobile}/>
            {
                
                ingridients.map((item, key)=>
                    <ConstructorElement key={key} text={item.name}
                        price={item.price}
                        thumbnail={item.image_mobile}/>
                )
            }
            </div>
            <Bun ingridient={bun} isTop={false}/> */}
            <div className={`${styles.footer} mt-10 mb-10`}>
                <Price price={10101} size={"medium"}/>
                <Button htmlType="button" type="primary" size="large" 
                // onClick={openModal}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}