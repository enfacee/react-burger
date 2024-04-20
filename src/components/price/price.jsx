import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Price({price, size="default"}){
    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p className={"text text_type_digits-"+size}>{price}</p>
            <CurrencyIcon type="primary" size="large"/>
        </div>
    )
}