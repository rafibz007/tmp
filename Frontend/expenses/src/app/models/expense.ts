export interface Expense {
    id: string
    title: string
    paidBy: string
    cost: number
    createdDate: Date
    updatedDate: Date
    participants: [{
        id: string
        username: string
    }]
}
