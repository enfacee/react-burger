import { Input, Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './register.module.css'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/actions/user";
import { addFormInfo } from "../../services/reducers/user";

export function RegisterPage(){
    const dispatch = useDispatch();
    const {email, name, password} = useSelector((store) => store.user.form);
    const onChange = e => 
        dispatch(addFormInfo({key: e.target.name, value:e.target.value}));
    const onSubmit = e => {
        e.preventDefault();
        dispatch(register({email, password, name}));
    }
    return (
        <form onSubmit={onSubmit}>
            <div className={`${styles.pageContainer} mt-10`}>
                <div className="text text_type_main-medium mb-6">Регистрация</div>
                <div className={styles.inputs}>
                    <Input type={'text'} placeholder={'Имя'} value={name} name={'name'} onChange={onChange}/>
                    <EmailInput value={email} name={'email'} onChange={onChange}/>
                    <PasswordInput type={'password'} placeholder={'Пароль'} icon={'ShowIcon'} value={password} name={'password'} onChange={onChange}/>
                </div>
                <Button htmlType={'submit'} type={'primary'} extraClass='mb-20 mt-6'>Зарегистрироваться</Button>
                <div className={'text text_type_main-small text_color_inactive'}>
                    <p>Уже зарегистрированы?</p>
                    <Link to="/login">Войти</Link>
                </div>
            </div>
        </form>
    )
}