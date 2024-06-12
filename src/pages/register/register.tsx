import { Input, Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './register.module.css'
import { register } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../hooks/hooks";
import { FormEvent } from "react";

export function RegisterPage(){
    const dispatch = useAppDispatch();
    const { values, handleChange } = useForm({
        name: '',
		email: '',
		password: '',
    })
    const {email, name, password} = values;
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(register({email, password, name}));
    }
    return (
        <form onSubmit={onSubmit}>
            <div className={`${styles.pageContainer} mt-10`}>
                <div className="text text_type_main-medium mb-6">Регистрация</div>
                <div className={styles.inputs}>
                    <Input type={'text'} placeholder={'Имя'} value={name} name={'name'} onChange={handleChange}	onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                    <EmailInput value={email} name={'email'} onChange={handleChange}/>
                    <PasswordInput placeholder={'Пароль'} icon={'ShowIcon'} value={password} name={'password'} onChange={handleChange}/>
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