import styles from "./modal.module.css"
import ModalOverlay from "../modal-overlay/modal-overlay"
import IngredientDetails from '../ingredient-details/ingredient-deltails';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/modal-slice";
import OrderDetails from "../order-details/order-details";

const modalRoot = document.getElementById("react-modals");

export default function Modal(){

    const { showedDetailsModal, showOrderModal } = useSelector(state=> state.modal);
    const dispatch = useDispatch();

    function handleOnClick(e){
        e.stopPropagation();
    }
    function handleCloseModal(){
        dispatch(closeModal());
    }
    useEffect(()=>{
        const handleEscapePress = (e)=>{
            if(e.key==='Escape'){
                handleCloseModal();
            }
        }
        window.addEventListener('keydown', handleEscapePress);

        return ()=>{
            window.removeEventListener('keydown', handleEscapePress);
        }
    }, [showedDetailsModal]);
    return (showedDetailsModal || showOrderModal ? createPortal(
        (
             (<ModalOverlay closeModal={handleCloseModal}>
                <div className={`${styles.modal} p-10`} onClick={handleOnClick}>
                    <div className={`${styles.header}`}>
                        <p className="text text_type_main-large">{showedDetailsModal?'Детали ингридиента':null}</p>
                        <CloseIcon type="primary" onClick={handleCloseModal}/>
                    </div>
                    {showedDetailsModal ? <IngredientDetails/> : <OrderDetails/>}
                </div>
            </ModalOverlay>)
        ),
        modalRoot) : null
    )
}