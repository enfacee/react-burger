import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from 'react-router-dom';
import styles from './reset-password.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addFormInfo } from "../../services/reducers/user";
import { resetPassword } from "../../services/actions/user";

export function ResetPasswordPage(){
	const isResetPasswordCalled =
		localStorage.getItem('resetPasswordCalled') === '0';
    
    const dispatch = useDispatch();
    const { form, tokenSent, passwordChanged } = useSelector((store) => store.user);
    const { password, token } = form;
    const onChange = e => 
        dispatch(addFormInfo({key: e.target.name, value:e.target.value}));
    const formOnSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({password, token}));
    }
    
	if (!isResetPasswordCalled) {
		if (!tokenSent) {
			return <Navigate to={'/forgot-password'} replace />;
		} else if (passwordChanged) {
			return <Navigate to={'/login'} replace />			
		}
	}
    return (
        <form onSubmit={formOnSubmit}>
            <div className={`${styles.pageContainer} mt-10`}>
                <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
                <div className={styles.inputs}>
                    <PasswordInput type={'password'} placeholder={'Введите новый пароль'} icon={'ShowIcon'} value={password} name={'password'} onChange={onChange}/>
                    <Input type={'text'} placeholder={'Введите код из письма'} value={token} name={'token'} onChange={onChange}/>
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