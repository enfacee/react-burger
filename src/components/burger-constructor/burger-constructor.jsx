import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import styles from './burger-constructor.module.css';
import Price from "../price/price";
import PropTypes from 'prop-types';
import { ingredientPropTypes }  from "../../utils/ingredient-prop-types"
import { addBun, addIngredient, removeIngredient } from "../../services/burger-constructor-slice";
import { useSendOrderMutation } from "../../services/burgerApi";


const Bun =({bun, isTop = true})=>{
    const dispatch = useDispatch();
    const [, dropTarget] = useDrop({
        accept: 'bun',
        drop(item) {
            dispatch(addBun(item));
            // onDropHandler(itemId);
        },
    });
    return(
        <div className={styles.bun} ref={dropTarget}>
            {
                bun ? <ConstructorElement 
                        type={isTop?"top":"bottom"}
                        isLocked={true}
                        text={bun.name+(isTop? "(верх)":" (низ)")}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        />
                    : <div className={`${styles.constructor_element}` + (isTop ?` ${styles.constructor_element_pos_top}` :` ${styles.constructor_element_pos_bottom}`)}/>
            }
        </div>
    )
};
Bun.propTypes = {
    bun: ingredientPropTypes,
    isTop: PropTypes.bool
};
export default function BurgerContructor(){

    const { bun, ingredients } = useSelector(state => state.burgerContructor);
    const dispatch = useDispatch();
    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch(addIngredient(item));
            // onDropHandler(itemId);
        },
    });
    const [send] = useSendOrderMutation();
    const sendOrder = ()=>{
        send([bun._id, ...ingredients.map(ingredient=>ingredient._id)])
    }
    const totalPrice = useMemo(()=> {
        return ingredients.reduce((acc, {price})=>{
                return acc + price;
            }, bun ? bun.price*2 : 0);
      }, [bun, ingredients])

    return(
        <div className={`${styles.main} mt-25 pm-4 mr-4`}>            
            <Bun bun={bun}/>
            <div className={styles.container} ref={dropTarget}>
            {
                !ingredients.length 
                    ? <div className={`${styles.constructor_element} ${styles.bun}`}/>
                    : ingredients.map((item, key)=>
                            <ConstructorElement key={item.key} text={item.name}
                                price={item.price} thumbnail={item.image_mobile} handleClose={()=>dispatch(removeIngredient(item.key))}/>
                        )
            }
            </div>
            <Bun bun={bun} isTop={false}/>
            <div className={`${styles.footer} mt-10 mb-10`}>
                <Price price={totalPrice} size={"medium"}/>
                <Button htmlType="button" type="primary" size="large" 
                disabled ={!bun || !ingredients.length }
                onClick={sendOrder}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}