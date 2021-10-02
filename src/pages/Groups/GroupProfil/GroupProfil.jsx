// import { useQuery } from '@apollo/client'
// import { useParams } from 'react-router'
import { useState } from 'react'
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'
import './GroupProfil.scss'
import GroupProfilRight from '../containers/GroupPforilRight/GroupProfilRight'
import GroupProfilLeft from '../containers/GroupProfilLeft/GroupProfilLeft'
import { BY_GROUP_ID } from '../../../Querys/GroupTabs'
import { useEffect } from 'react';
import Loader from '../../../components/Loader/Loader';

const GroupProfil = () => {
   const [dataHead, setDataHead] = useState({})
   const { groupID } = useParams()

   const { data, loading } = useQuery(BY_GROUP_ID, {
      variables: { groupID }
   })
   const [students, setStudents] = useState()

   useEffect(() => {
      if (data && data.byGroupID) {
         // console.log(data && data.byGroupID)
         setDataHead(data.byGroupID)
      }
   }, [data])

   return (
      <>
         <div className="izma__groups-attendence">
            {
               loading ? <Loader/> : <></>
            }
               <div className="izma__groups-attendence-headings">
                  <h3 className="izma__groups-attendence-heading">
                  Guruhlar |   { dataHead.courseName } | { dataHead && dataHead.teacher }
                  </h3>

               </div>
            <div className="izma__groups-attendence-wrapper">
               <GroupProfilLeft studData={(studentInfo) => setStudents(studentInfo)} />
               <div className="izma__groups-attendence-wrapper-right">
                  <GroupProfilRight studentsData={students} />
               </div>
            </div>
         </div>
      </>
   )
}

export default GroupProfil