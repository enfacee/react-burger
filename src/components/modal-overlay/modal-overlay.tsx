import { ReactNode } from "react"
import styles from "./modal-overlay.module.css"

type TModalOverlay = {
    children: ReactNode;
    closeModal: () => void;
}

export default function ModalOverlay({children, closeModal}: TModalOverlay){
    return (
        <div className={styles.overlay} onClick={closeModal} data-cy="modal-overlay">
            {children}
        </div>
    )
}