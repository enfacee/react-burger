import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './login.module.css'

export function LoginPage(){
    return (
        <div className={styles.pageContainer}>
            <div className="text text_type_main-medium mb-6">Вход</div>
            <div className={styles.inputs}>
                <Input type={'email'} placeholder={'E-mail'}/>
                <Input type={'password'} placeholder={'Пароль'} icon={'ShowIcon'}/>
            </div>
            <Button htmlType={'button'} type={'primary'} extraClass='mb-20 mt-6'>Войти</Button>
            <div className={'text text_type_main-small text_color_inactive'}>
                <p>Вы - новый пользователь?</p>
                <Link to="/register">Зарегистрироваться</Link>
            </div>
            <div className={'text text_type_main-small text_color_inactive'}>
                <p>Забыли пароль?</p>
                <Link to="/forgot-password">Восстановить пароль</Link>
            </div>
        </div>
    )
}