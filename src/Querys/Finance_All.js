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
    payed_at
    payed_time
  }
}
`


const HARAJATLAR = gql`
{
    harajatlar{
      id
      name
      createdAt
      type
      buyer
      paymentAmount
    }
}
`

const NEW_HARAJAT = gql`
mutation newHarajat(
    $name: String
    $createdAt: String
    $type: String
    $buyer: String
    $paymentAmount: Int
  ) {
  newHarajat(
    name: $name
    createdAt: $createdAt
    type: $type
    buyer: $buyer
    paymentAmount: $paymentAmount
  ) {
    id
    name
    createdAt
    type
    buyer
    paymentAmount
  }
}
`


const FILTER_DATA = gql`
query harajatlarFilter($startDate: String $endDate: String){
  harajatlarFilter(startDate: $startDate endDate: $endDate)
}
`


const GROUPS_COURSES = gql `
{
  courses{
    name
    price
    groups{
      name
      teacher
      students{
        id
        status
      }
    }
  }
}
`

const COURSES_INFO = gql `
    query {
        courses {
        name
        price
            groups {
            studentsCount
            }
        }
    }
`

const DELETE_HARAJAT = gql `
  mutation deleteHarajat($id: ID) {
    deleteHarajat(id: $id) {
      id
    }
  }
`

const SUBSCRIP_HARAJAT = gql `
  subscription {
    harajat{
      id
      name
      paymentAmount
    }
  }
`

export {
    FINANCE_STUDENT,
    FINANCE_STUDENT_FILTER,
    FINANCE_STUDENT_TABLE,
    HARAJATLAR,
    NEW_HARAJAT,
    FILTER_DATA,
    GROUPS_COURSES,
    COURSES_INFO,
    DELETE_HARAJAT,
    SUBSCRIP_HARAJAT
}