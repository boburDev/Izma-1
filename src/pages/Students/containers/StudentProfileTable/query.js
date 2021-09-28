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


export {
   HISTORY,
}