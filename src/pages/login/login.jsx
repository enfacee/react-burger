import { Button, EmailInput, PasswordInput  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './login.module.css'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/actions/user";
import { addFormInfo } from "../../services/reducers/user";

export function LoginPage(){
    const dispatch = useDispatch();
    const {email, password} = useSelector(store => store.user.form);
    const onChange = e => 
        dispatch(addFormInfo({key: e.target.name, value:e.target.value}));
    const onSubmit = e => {
        e.preventDefault();
        dispatch(login({email, password}));
    }
    return (
        <form onSubmit={onSubmit}>
            <div className={`${styles.pageContainer} mt-10`}>
                <p className="text text_type_main-medium mb-6">Вход</p>
                <div className={styles.inputs}>
                    <EmailInput value={email} name={'email'} onChange={onChange}/>
                    <PasswordInput type={'password'} placeholder={'Пароль'} icon={'ShowIcon'} value={password} name={'password'} onChange={onChange}/>
                </div>
                <Button htmlType={'submit'} type={'primary'} extraClass='mb-20 mt-6'>Войти</Button>
                <div className={'text text_type_main-small text_color_inactive'}>
                    <p>Вы - новый пользователь?</p>
                    <Link to="/register">Зарегистрироваться</Link>
                </div>
                <div className={'text text_type_main-small text_color_inactive'}>
                    <p>Забыли пароль?</p>
                    <Link to="/forgot-password">Восстановить пароль</Link>
                </div>
            </div>
        </form>
    )
}