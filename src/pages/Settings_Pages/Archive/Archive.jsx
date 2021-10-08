import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useState, useEffect } from 'react';
import TTable from '../../../components/Table/TTable';
import { COLLEGUES_BY_STATUS, UPT_STATUS, TEACHER_SUBSCRIPTION } from '../../../Querys/Settings';
import './Archive.scss'
import { useLang } from '../../../context/LanguageProvider';
import Language from '../../../lang/index'

const Archive = () => {

   const [data, setData] = useState([])
   const [val, setVal] = useState([])
   const [takeID, setTakeID] = useState()
   const [stat, setStat] = useState('')
   const [lang] = useLang()


   const {data: minusStatus} = useQuery(COLLEGUES_BY_STATUS)
	const [deleteCollegue] = useMutation(UPT_STATUS)

   useEffect(() => {
      if (minusStatus && minusStatus.selectByStatus) {  
         setData(minusStatus && minusStatus.selectByStatus)
      }
   }, [minusStatus])


   useEffect(() => {

      if (data.length) {
         
         const changedData = data.map(i => {
            let x = ''
            if (i.status === '-1' ){
               x = 'CEO'
            } else if (i.status === '-2' ){
               x = 'Marketer'
            } else if (i.status === '-3' ){
               x = 'Adminstrator'
            } else if (i.status === '-4' ){
               x = 'Casher'
            } else if (i.status === '-5' ){
               x = 'Teacher'
            }

            return {
               Id: i.Id,
               name: i.name,
               status: x,
               phoneNumber: i.phoneNumber
            }
         })

         setVal(changedData)
      }

   }, [data])

	const deletble = val.find(e => e.Id === takeID)

   useEffect(() => {
		
		if (takeID) {

			if (deletble?.status === 'CEO'){
				setStat(-1)
			} else if (deletble?.status === 'Marketer'){
				setStat(-2)}
			else if (deletble?.status === 'Adminstrator'){
				setStat(-3)
			} else if (deletble?.status === 'Casher'){
				setStat(-4)
			} else if (deletble?.status === 'Teacher'){
				setStat(-5)
			}

		}
		

	}, [takeID, deletble, setStat])

   useEffect(() => {

      if (stat) {
         deleteCollegue({variables: {id: takeID, status: stat * 10}})
      }

   }, [deleteCollegue, stat, takeID])

   useSubscription(TEACHER_SUBSCRIPTION, {
		onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
			cache.modify({
				fields: {
					selectByStatus: () => {}
				}
			})
		},
	})   


   return (
      <>
         <div className="izma__settings-archive">
            <div className="izma__settings-archive-up">
               <h3 className="izma__settings-archive-up-heading">
                  {Language[lang].settings.forms.formTitle}
               </h3>
               <h4 className="izma__settingsarchive-up-title">
                  {Language[lang].settings.employee.employeeTitle} | {Language[lang].settings.forms.formTitle}
               </h4>


            </div>
            <div className="izma__settings-archive-button">
               <TTable arr={val} block={"settingsArchive"} setTakeID={setTakeID} />
            </div>
         </div>

      </>
   )
}


export default Archive;
