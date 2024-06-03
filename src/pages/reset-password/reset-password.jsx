import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css'
export function ResetPasswordPage(){
    return (
        <div className={styles.pageContainer}>
            <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
            <div className={styles.inputs}>
                <Input type={'password'} placeholder={'Введите новый пароль'} icon={'ShowIcon'}/>
                <Input type={'text'} placeholder={'Введите код из письма'}/>
            </div>
            <Button htmlType={'button'} type={'primary'} extraClass='mb-20 mt-6'>Восстановить</Button>
            <div className={'text text_type_main-small text_color_inactive'}>
                <p>Вспомнили пароль?</p>
                <Link to="/login">Войти</Link>
            </div>
        </div>
    )
}