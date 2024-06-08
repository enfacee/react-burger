import styles from "./modal.module.css"
import ModalOverlay from "../modal-overlay/modal-overlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import PropTypes from "prop-types"
import { useEffect } from "react";

const modalRoot = document.getElementById("react-modals");

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func
}

export default function Modal({children, header, onClose}){        
    function handleCloseModal(){
        onClose();
    }
    function handleOnClick(e){
        e.stopPropagation();
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
    // eslint-disable-next-line
    }, []);
    return (createPortal(
        (
             (<ModalOverlay closeModal={handleCloseModal}>
                <div className={`${styles.modal} p-10`} onClick={handleOnClick}>
                    <div className={`${styles.header}`}>
                        <p className="text text_type_main-large">{header}</p>
                        {onClose != null &&<CloseIcon type="primary" onClick={handleCloseModal}/>}
                    </div>
                    {children}
                </div>
            </ModalOverlay>)
        ),
        modalRoot)
    )
}