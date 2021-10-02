import { gql } from '@apollo/client'

import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

const collague_id = gql `
query colleagues ($truee: String){
    colleagues(truee: $truee){
        Id
    }
}
`

const StudentsTablee = () => {

  const {data: collagueee} = useQuery(collague_id, {variables: {truee: 'truee'}})
  
  
  useEffect(() => {
    
    
    if(collagueee && collagueee.colleagues) {
      
      const studentt = collagueee && collagueee.colleagues.map(item => item.Id)
    
      let timee = 1000
      var arr = studentt && studentt
      var index = 0;
      setInterval(function() {
        // console.log(arr[index++])
      
        if (index === arr.length) {
          timee = 100000
        } else {
          console.log(arr[index++])
          // newSalary({variables: {stID: arr[index++], cashAmm: '0'}})
        }

      }, timee);
  
    }

  }, [collagueee])
  
  
  return ( <> <h1>test!!!</h1> </> )
}

export default StudentsTablee