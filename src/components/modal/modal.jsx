import styles from "./modal.module.css"
import ModalOverlay from "../modal-overlay/modal-overlay"
import PropTypes from "prop-types"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.getElementById("react-modals");

Modal.propTypes = {
    header: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}
export default function Modal({children, header, closeModal}){
    function handleOnClick(e){
        e.stopPropagation();
    }
    useEffect(()=>{
        const handleEscapePress = (e)=>{
            if(e.key==='Escape'){
                closeModal();
            }
        }
        window.addEventListener('keydown', handleEscapePress);

        return ()=>{
            window.removeEventListener('keydown', handleEscapePress);
        }
    }, [closeModal]);
    return (createPortal(
        (
            <ModalOverlay closeModal={closeModal}>
                <div className={`${styles.modal} p-10`} onClick={handleOnClick}>
                    <div className={`${styles.header}`}>
                        <p className="text text_type_main-large">{header}</p>
                        <CloseIcon type="primary" onClick={closeModal}/>
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        ),
        modalRoot)
    )
}