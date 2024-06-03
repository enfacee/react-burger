import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './register.module.css'

export function RegisterPage(){
    return (
        <div className={styles.pageContainer}>
            <div className="text text_type_main-medium mb-6">Регистрация</div>
            <div className={styles.inputs}>
                <Input type={'text'} placeholder={'Имя'}/>
                <Input type={'email'} placeholder={'E-mail'}/>
                <Input type={'password'} placeholder={'Пароль'} icon={'ShowIcon'}/>
            </div>
            <Button htmlType={'button'} type={'primary'} extraClass='mb-20 mt-6'>Зарегистрироваться</Button>
            <div className={'text text_type_main-small text_color_inactive'}>
                <p>Уже зарегистрированы?</p>
                <Link to="/login">Войти</Link>
            </div>
        </div>
    )
}