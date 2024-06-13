import { Button, EmailInput, Input, PasswordInput  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from 'react-router-dom';
import styles from './profile.module.css'
import { FormEvent, useCallback } from "react";
import { changeUserInfo, logout } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export function ProfilePage(){
	const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store.user);
    const { values, setValues, handleChange } = useForm({
        name: user!.name,
		email: user!.email,
		password: '',
    })
    const {email, name, password} = values;
    const reset = () => setValues({
        name: user!.name,
        email: user!.email,
        password: '',
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(changeUserInfo({
            name,
            email,
            password,
        }));
        reset();
    }
    const isChangeUserInfo = user!.name !== name || user!.email !== email || password !== '';
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
                <form onSubmit={handleSubmit}>
                    <Input type={'text'} placeholder={'Имя'} icon={'EditIcon'} value={name} name={'name'} onChange={handleChange}	onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                    <EmailInput placeholder={'email'} isIcon={true} value={email} name={'email'} onChange={handleChange} extraClass='mt-6'/>
                    <PasswordInput placeholder={'Пароль'} icon={'EditIcon'} value={password} name={'password'} onChange={handleChange} extraClass='mt-6'/>
                    {
                        isChangeUserInfo && 
                        <>
                            <Button htmlType="button" type="secondary" size="medium" onClick={reset}>Отмена</Button>
                            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Сохранить</Button>
                        </>
                    }
                </form>
            </div>            
        </div>
    )
}