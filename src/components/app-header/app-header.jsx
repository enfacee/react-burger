import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function AppHeader(){
    const { pathname } = useLocation();
    return(
    <header className={styles.header}>
        <div className={styles.left}>
            <Link to='/' className ={`${styles.button} p-5 ml-2 mt-4 mb-4`}>
                <BurgerIcon type={pathname ==='/'? 'primary': 'secondary'}/>
                <p className={'text text_type_main-default ml-2' + (pathname ==='/'? '': ' text_color_inactive')}>Конструктор</p>
            </Link>
            <Link to='/feed' className ={`${styles.button} p-5 ml-2 mt-4 mb-4`}>
                <ListIcon type={pathname ==='/feed'? 'primary': 'secondary'}/>
                <p className={'text text_type_main-default ml-2' + (pathname ==='/feed'? '': ' text_color_inactive')}>Лента заказов</p>
            </Link>
        </div>
        <div className={styles.middle}>
            <Logo/>
        </div>
        <div className={styles.right}>
            <Link to='/profile' className ={`${styles.button} p-5 ml-2 mt-4 mb-4`}>
                <ProfileIcon type={pathname ==='/profile'? 'primary': 'secondary'}/>
                <p className={'text text_type_main-default ml-2' + (pathname ==='/profile'? '': ' text_color_inactive')}>Личный кабинет</p>
            </Link>
        </div>
      </header>)
};