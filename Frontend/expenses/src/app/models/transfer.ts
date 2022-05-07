export interface Transfer {
    id: string
    room: string
    title: string
    cost: number
    createdDate: Date
    updatedDate: Date
    fromUser: {
        id: string
        username: string
    }
    toUser: {
        id: string
        username: string
    }
}
