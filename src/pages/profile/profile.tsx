import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './profile.module.css'
import { useCallback } from "react";
import { logout } from "../../services/actions/user";
import { useAppDispatch } from "../../hooks/hooks";

export function ProfilePage(){
	const { pathname } = useLocation();
    const dispatch = useAppDispatch();
	const onLogout = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);
    return (
        <div className={`${styles.profile} ml-30`}>
            <div className={`${styles.menu} mt-20`}>
                <Link to="/profile" className={`text text_type_main-medium ${styles.link} ${pathname === '/profile'
										? 'text_color_primary'
										: 'text_color_inactive'
								}`}>Профиль</Link>
                <Link to="/profile/orders" className={`text text_type_main-medium mt-2 ${styles.link} ${pathname === '/profile/orders'
										? 'text_color_primary'
										: 'text_color_inactive'
								}`}>История заказов</Link>
                <div className={`text text_type_main-medium text_color_inactive mt-2 ${styles.logout}`} onClick={onLogout}>Выход</div>
                <div className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</div>
            </div>            
            <div className={styles.inputs}>
                <Outlet/>
            </div>            
        </div>
    )
}