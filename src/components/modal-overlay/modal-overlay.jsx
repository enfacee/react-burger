import styles from "./modal-overlay.module.css"
import PropTypes from 'prop-types'

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default function ModalOverlay({children, closeModal}){
    return (
        <div className={styles.overlay} onClick={closeModal}>
            {children}
        </div>
    )
}