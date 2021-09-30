import {
   gql
} from '@apollo/client'


const HISTORY = gql `
    query
        historyStudentPay($studentID: ID!){
        historyStudentPay (studentID: $studentID){
            id
            debit
            credit
            comment
            paymentType
            createdAt
            payed_at
        }
    }
`

const SUBSCRIPTION_HISTORY = gql `
    subscription{
        historyPay{
        id
        debit
        credit
        comment
        }
    }
`

export {
   HISTORY,
   SUBSCRIPTION_HISTORY
}