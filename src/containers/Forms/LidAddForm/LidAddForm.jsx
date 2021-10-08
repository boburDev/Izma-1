import { useEffect, useRef } from 'react'
import './LidAddForm.scss'
import { useMutation } from '@apollo/client'
import { NEW_LEAD } from '../../../pages/Lids/query'


const LidAddForm = ({ setAdd, itemId, formId, columns, setColumns }) => {
   const userName = useRef()
   const userNumber = useRef()
   const userComment = useRef()
   const [createLead] = useMutation(NEW_LEAD)
   

   const handleSubmit = async () => {
   
      createLead({ variables: { 
         name: userName.current.value,
         phone: userNumber.current.value,
         leadBoxID: typeof itemId === 'string' ? itemId : itemId?.id,
         gender: null,
         comment: userComment.current.value,
         courseID: null,
         teachID: null
      } })
     
      setAdd()
      let form = document.querySelector('#form' + formId)
      form.reset()
      userName.current.value = ''
      userNumber.current.value = ''
      userComment.current.value = ''
   }


   const useOutsideAlerter = (ref) => {
      useEffect(() => {
         function handleClickOutside(event) {
            let closeOrAdd = 0
            event.path && event.path.map(el => {
               if (el.className === 'home-column-top__name' || el.className === 'home-column-top__number' || el.className === 'home-column-top__coment') {
                  closeOrAdd++
               }
               return ''
            })

            if ((userName.current.value || userNumber.current.value) && closeOrAdd === 0) {
               setAdd(false)
               handleSubmit()
            } else if ((!userName.current.value || !userNumber.current.value) && closeOrAdd === 0) {
               setAdd(false)
            }
         }
         document.addEventListener("mousedown", handleClickOutside);

         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref])
   }


   const wrapperRef = useRef(null);
   useOutsideAlerter(wrapperRef);
   return (

      <form id={`form` + formId} className="lllid">
      <div className="addForm" ref={wrapperRef}>
            <input autoComplete="off"  type="text" className="home-column-top__name"
            placeholder="ism va familiya" required ref={userName}
            onKeyUp={(e) => {
               if (e.keyCode === 13) {
                  handleSubmit()
               }
            }}
         />
            <input autoComplete="off"  type="text" className="home-column-top__number"
            placeholder="telefon" required ref={userNumber} minLength={12} maxLength={12}
            onKeyUp={(e) => {
               if (e.keyCode === 13) {
                  handleSubmit()
               }
            }}
         />
            <input autoComplete="off"  type="text" className="home-column-top__coment"
            placeholder="comment" required ref={userComment}
            onKeyUp={(e) => {
               if (e.keyCode === 13) {
                  handleSubmit()
               }
            }} />
      </div>
      </form>
   )
}


export default LidAddForm