import { OrderStatusEnum } from "../../types/orders"

type TOrderStatus = {
    status: OrderStatusEnum,
    className?: string
}

export default function OrderStatus({status, className}: TOrderStatus)  {
    className = (className ? className+' ':'')+ "text text_type_main-default";
    let text = ''
    switch (status){
        case OrderStatusEnum.CREATED:
            text = 'Создан';
            break;
        case OrderStatusEnum.PENDING:
            className = className + ' text_color_inactive';
            text = 'Готовится';
            break;
        case OrderStatusEnum.DONE:
            className = className + ' text_color_success';
            text = 'Выполнен';
            break;
        case OrderStatusEnum.CANCELLED:
            className = className + ' text_color_error';
            text = 'Отменён';
            break;            
    }
    return <p className={className}>{text}</p>
}