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

export {
    FINANCE_STUDENT,
    FINANCE_STUDENT_FILTER
}