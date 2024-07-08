import styles from './preloader.module.css';

export default function Preloader(){
    return (
        <div className={styles.loading}>
            <p className="text text_type_main-medium p-15">Загрузка...</p>
        </div>
    )
}