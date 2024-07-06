import styles from './orders-info.module.css'

export default function OrdersInfo () {

    const ready : Array<number> = [100,120,123,130,150,155,120,123,130,150,155,120,123,130,150,155];
    const inProgress : Array<number>  = [101, 102, 103, 104,105,106];
    return (
        <div className={styles.info}>
            <div className={styles.orders}>
                <div>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>
                    <div className={styles.numbers}>
                        {ready.map((number, i) => <p key={i} className='text text_type_digits-default text_color_success'>{number}</p>)}
                    </div>
                </div>
                <div>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>
                    <div className={styles.numbers}>
                        {inProgress.map((number, i) => <p key={i} className='text text_type_digits-default'>{number}</p>)}
                    </div>
                </div>
            </div>
            <div>
                <p className='text text_type_main-medium'>Выполнено за всё время:</p>
                <p className='text text_type_digits-large'>28752</p>
            </div>
            <div>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className='text text_type_digits-large'>138</p>
            </div>
        </div>
    )
}