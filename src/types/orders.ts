export type TOrder = {
    _id: string,
    ingredients: Array<string>,
    status: OrderStatusEnum,
    name: string,
    number: number,
    createdAt: string,
    updateAt: string
}

export type TOrdersFeed = {
    success: boolean,
    orders: Array<TOrder>,
    total: number,
    totalToday: number
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export enum OrderStatusEnum {
      DONE = 'done',
      CREATED = 'created',
      PENDING = 'pending',
      CANCELLED = 'cancelled'
}