import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export default function AppHeader(){
    return(
    <header className={styles.header}>
        <div className={styles.left}>
            <div className ={`${styles.button} p-5 ml-2 mt-4 mb-4`}>
                <BurgerIcon type="primary"/>
                <p className="text text_type_main-default ml-2">Конструктор</p>
            </div>
            <div className ={`${styles.button} p-5 ml-2 mt-4 mb-4`}>
                <ListIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
            </div>
        </div>
        <div className={styles.middle}>
            <Logo/>
        </div>
        <div className={styles.right}>
        <div className ={`${styles.button} p-5 ml-2 mt-4 mb-4`}>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
            </div>
        </div>
      </header>)
};