import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import styles from './burger-constructor.module.css';
import Price from "../price/price";
import { addIngredient, clearConstructor } from "../../services/reducers/burger-constructor";
import Bun from "./bun/bun";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { sendOrder } from "../../services/actions/order";
import { clearOrder } from "../../services/reducers/order";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TIngredient } from "../../types/ingredient";

type TDropObject = {
    isHover: boolean;
}

export default function BurgerContructor(){
    const { bun, ingredients } = useAppSelector(state => state.burgerContructor);
    const { loading, order } = useAppSelector(state=> state.order);
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
	const navigate = useNavigate();
    const [{isHover}, dropTarget] = useDrop<TIngredient, unknown, TDropObject>({
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
    const createOrder = ()=>{
		if (user === null) {
			navigate('/login');
			return;
		}

        dispatch(sendOrder([bun!._id, ...ingredients.map(ingredient=>ingredient._id), bun!._id]))
    }
    const handleOrderClose = () => {
        dispatch(clearOrder());
        dispatch(clearConstructor());
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
                onClick={createOrder}>
                    Оформить заказ
                </Button>
            </div>
            {loading && 
				<Modal>
					<div className={styles.loading}>
						<p className="text text_type_main-medium p-15">
							Создание заказа...
						</p>
					</div>
				</Modal>
			}
            {order && 
                <Modal onClose={handleOrderClose}>
                    <OrderDetails/>
                </Modal>
            }
        </div>
    );
}