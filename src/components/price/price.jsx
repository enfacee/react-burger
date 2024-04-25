import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'

Price.propTypes = {
    price: PropTypes.number.isRequired,
    size: PropTypes.string
};

export default function Price({price, size="default"}){
    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p className={"text text_type_digits-"+size}>{price}</p>
            <CurrencyIcon type="primary" size="large"/>
        </div>
    )
}