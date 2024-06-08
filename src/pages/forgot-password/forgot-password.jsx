import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from 'react-router-dom';
import styles from './forgot-password.module.css'
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../services/actions/user";
import { useCallback, useEffect } from "react";
import { useForm } from "../../hooks/useForm";

export function ForgotPasswordPage(){
    const dispatch = useDispatch();
    const { values, handleChange } = useForm({email: ''})
    const { email } = values;
	useEffect(() => {
		localStorage.removeItem('resetPasswordCalled');
	}, []);

	const resetPassword = useCallback(() => {
		dispatch(forgotPassword({email}));
	}, [email, dispatch]);

    const formOnSubmit = e => {
        e.preventDefault();
        resetPassword();
    }
	const isPasswordSent = localStorage.getItem('resetPasswordCalled') === '0';
	if (isPasswordSent) {
		return (
			<Navigate to="/reset-password"/>
		);
	}
    return (
        <form onSubmit={formOnSubmit}>
            <div className={`${styles.pageContainer} mt-10`}>
                <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
                <div className={styles.inputs}>
                    <EmailInput value={email} name={'email'} onChange={handleChange}/>
                </div>
                <Button htmlType={'submit'} type={'primary'} extraClass='mb-20 mt-6'>Восстановить</Button>
                <div className={'text text_type_main-small text_color_inactive'}>
                    <p>Вспомнили пароль?</p>
                    <Link to="/login">Войти</Link>
                </div>
            </div>
        </form>
    )
}