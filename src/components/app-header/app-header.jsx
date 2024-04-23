import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import PropTypes from 'prop-types'

const ButtonItem = (props)=> (
    <div className ={`${styles.button} p-5 ml-2 mt-4 mb-4`}>
        {props.children}
    </div>
);

const ButtonsContainer = (props)=> (
    <div className ={props.className}>
        {props.children}
    </div>
);
ButtonItem.propTypes = {
    chuldren: PropTypes.element
};
ButtonsContainer.propTypes = {
    className: PropTypes.string,
    chuldren: PropTypes.element
};

export default function AppHeader(){
    return(
    <header className={styles.header}>
        <ButtonsContainer className={styles.left}>
            <ButtonItem>
                <BurgerIcon type="primary"/>
                <p className="text text_type_main-default ml-2">Конструктор</p>
            </ButtonItem>
            <ButtonItem>
                <ListIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
            </ButtonItem>
        </ButtonsContainer>
        <ButtonsContainer className={styles.middle}>
            <Logo/>
        </ButtonsContainer>
        <ButtonsContainer className={styles.right}>
            <ButtonItem>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
            </ButtonItem>
        </ButtonsContainer>
      </header>)
};