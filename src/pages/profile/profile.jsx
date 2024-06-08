import { Button, EmailInput, Input, PasswordInput  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from 'react-router-dom';
import styles from './profile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addFormInfo, resetUserInfo } from "../../services/reducers/user";
import { useCallback } from "react";
import { changeUserInfo, logout } from "../../services/actions/user";

export function ProfilePage(){
	const { pathname } = useLocation();
    const dispatch = useDispatch();
    const {email, name, password} = useSelector((store) => store.user.form);
    const {user} = useSelector((store) => store.user);
    const onChange = e => 
        dispatch(addFormInfo({key: e.target.name, value:e.target.value}));
    const formOnSubmit = e => {
        e.preventDefault();
        dispatch(changeUserInfo({
            name,
            email,
            password,
        }));
    }
    const isChangeUserInfo = user.name !== name || user.email !== email || password !== '';
	const onLogout = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);
    return (
        <div className={`${styles.profile} mt-20`}>
            <div className={styles.menu}>
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
                <form onSubmit={formOnSubmit}>
                    <Input type={'text'} placeholder={'Имя'} icon={'EditIcon'} value={name} name={'name'} onChange={onChange}/>
                    <EmailInput placeholder={'email'} icon={'EditIcon'} value={email} name={'email'} onChange={onChange} extraClass='mt-6'/>
                    <PasswordInput type={'password'} placeholder={'Пароль'} icon={'EditIcon'} value={password} name={'password'} onChange={onChange} extraClass='mt-6'/>
                    {
                        isChangeUserInfo && 
                        <>
                            <Button htmlType="button" type="secondary" size="medium" onClick={() => dispatch(resetUserInfo())}>Отмена</Button>
                            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Сохранить</Button>
                        </>
                    }
                </form>
            </div>            
        </div>
    )
}