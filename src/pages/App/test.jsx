import TTable from "../../components/Table/TTable"
import {
    gql, useQuery
 } from '@apollo/client'
 

function Test() {

    
     const ONE_COURSE_TO_EDIT = gql `
     {
        checksCountsTest{
          debit
          credit
          createdAt
          studentName 
          studentGroups{
            name
            time
            teacher
          }
        }
      }
     `

     const { data: tt } = useQuery(ONE_COURSE_TO_EDIT)
     console.log(tt)

    return (
        <>
        
        <TTable block={'test'} arr={tt && tt.checksCountsTest} />
        
        </>
    )
}

export default Test