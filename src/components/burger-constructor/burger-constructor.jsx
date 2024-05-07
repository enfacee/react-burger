import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import styles from './burger-constructor.module.css';
import Price from "../price/price";
import { addIngredient } from "../../services/burger-constructor-slice";
import { useSendOrderMutation } from "../../services/burgerApi";
import Bun from "./bun/bun";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";



export default function BurgerContructor(){

    const { bun, ingredients } = useSelector(state => state.burgerContructor);
    const { showOrderModal } = useSelector(state=> state.modal);
    const dispatch = useDispatch();
    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch(addIngredient(item));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const style = {        
        "borderStyle":isHover ?"dotted":"none"
    }
    const [send] = useSendOrderMutation();
    const sendOrder = ()=>{
        send([bun._id, ...ingredients.map(ingredient=>ingredient._id), bun._id])
    }
    const totalPrice = useMemo(()=> {
        return ingredients.reduce((acc, {price})=>{
                return acc + price;
            }, bun ? bun.price*2 : 0);
      }, [bun, ingredients])

    return(
        <div className={`${styles.burgerContructor} mt-25 pm-4 mr-4`}>            
            <Bun bun={bun} type={'top'}/>
            <div className={styles.elementsContainer} ref={dropTarget}>
            {
                !ingredients.length 
                    ? <div className={`${styles.emptyElement} constructor-element text text_type_main-default ml-2`} style={style}>Выберите начинку</div>
                    : ingredients.map((ingredient, index)=>
                        <BurgerIngredient key={ingredient.key} ingredient={ingredient} index={index}/>)
            }
            </div>
            <Bun bun={bun} type={'bottom'}/>
            <div className={`${styles.footer} mt-10 mb-10`}>
                <Price price={totalPrice} size={"medium"}/>
                <Button htmlType="button" type="primary" size="large" 
                disabled ={!bun || !ingredients.length }
                onClick={sendOrder}>
                    Оформить заказ
                </Button>
            </div>
            {showOrderModal &&
                <Modal>
                    <OrderDetails/>
                </Modal>}
        </div>
    );
}