import { Expense } from "./expense";
import { Transfer } from "./transfer";

export interface Room {
    id: string
    name: string
    description: string
    currency: string
    host: {
        id: string
        username: string
    }
    members: [{
        id: string
        username: string
    }]
    admins: [{
        id: string
        username: string
    }]
    expenses: Array<Expense>
    transfers: Array<Transfer>
}
