import { gql } from '@apollo/client'

const COLLEGUES = gql`
    query {
        all_colleagues{
            Id
            name
            status
            phoneNumber
            
          }  
    }
`

const CREATE_SALARY = gql `
  mutation
    updateColleagueSalary($id: ID $salary: Int $type: Int){
    updateColleagueSalary(
      colleagueId: $id
      salary: $salary
      type: $type
    )
  }
`

const CREATE_SALARY_FOR_ALL = gql `
  mutation
  updateColleagueSalary($salary: Int $type: Int){
    updateColleagueSalary(
      salary: $salary
      type: $type
    )
  }
`

const TEACHER_SALARY_TYPE = gql `
  query {
    colleguagesSalary{
      amount
      type
      teacherID
      teacherName
    }
  }
`

const CHECK_TEACHER = gql `
  query checksCollegues($text: String) {
    checksCollegues(text: $text)
  }
`


export {
    COLLEGUES,
    CREATE_SALARY,
    CHECK_TEACHER,
    TEACHER_SALARY_TYPE,
    CREATE_SALARY_FOR_ALL
}