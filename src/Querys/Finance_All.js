import { gql } from '@apollo/client'

const FINANCE_STUDENT = gql`
{
	financeStudents
}
`

const FINANCE_STUDENT_FILTER = gql`
query financeStudentsFilter($startDate: String, $endDate: String){
    financeStudentsFilter(startDate: $startDate, endDate: $endDate)
  }  
`


const FINANCE_STUDENT_TABLE = gql`
{
    financeStudentsList {
      id
      phone
      studentName
      typePayment
      amount
      comment
    }
}
`



export {
    FINANCE_STUDENT,
    FINANCE_STUDENT_FILTER,
    FINANCE_STUDENT_TABLE
}