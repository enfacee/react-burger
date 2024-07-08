import { useAppSelector } from '../../hooks/hooks';
import styles from './orders-info.module.css'

export default function OrdersInfo () {
    const { success, pending, total, totalToday } = useAppSelector(state => state.feedOrders);
    return (
        <div className={styles.info}>
            <div className={styles.orders}>
                <div>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>
                    <div className={styles.numbers}>
                        {success.map((number, i) => <p key={i} className='text text_type_digits-default text_color_success'>{number}</p>)}
                    </div>
                </div>
                <div>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>
                    <div className={styles.numbers}>
                        {pending.map((number, i) => <p key={i} className='text text_type_digits-default'>{number}</p>)}
                    </div>
                </div>
            </div>
            <div>
                <p className='text text_type_main-medium'>Выполнено за всё время:</p>
                <p className='text text_type_digits-large'>{total}</p>
            </div>
            <div>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className='text text_type_digits-large'>{totalToday}</p>
            </div>
        </div>
    )
}