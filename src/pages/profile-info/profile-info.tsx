import { Button, EmailInput, Input, PasswordInput  } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent } from "react";
import { changeUserInfo } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export function ProfileInfoPage(){
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
    return (        
                <form onSubmit={handleSubmit} className=' mt-20'>
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
    )
}