import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css'

export function ForgotPasswordPage(){
    return (
        <div className={styles.pageContainer}>
            <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
            <div className={styles.inputs}>
                <Input type={'email'} placeholder={'Укажите e-mail'}/>
            </div>
            <Button htmlType={'button'} type={'primary'} extraClass='mb-20 mt-6'>Восстановить</Button>
            <div className={'text text_type_main-small text_color_inactive'}>
                <p>Вспомнили пароль?</p>
                <Link to="/login">Войти</Link>
            </div>
        </div>
    )
}