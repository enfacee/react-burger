import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TPrice = {
    price: number;
    size?: "default" | "medium" | "large"
}

export default function Price({price, size="default"}: TPrice){
    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p className={"text text_type_digits-"+size}>{price}</p>
            <CurrencyIcon type="primary"/>
        </div>
    )
}