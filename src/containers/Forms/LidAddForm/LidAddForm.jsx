import { useEffect, useRef } from 'react'
import './LidAddForm.scss'
import { useMutation } from '@apollo/client'
import { NEW_LEAD } from '../../../pages/Lids/query'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'
import { useSnackbar } from 'notistack';


const LidAddForm = ({ setAdd, itemId, formId, columns, setColumns }) => {
   const wrapperRef = useRef(null);
   const userName = useRef()
   const userNumber = useRef()
   const userComment = useRef()
   const [createLead] = useMutation(NEW_LEAD)
   const [lang] = useLang()

   const { enqueueSnackbar } = useSnackbar();

   const handleClick = () => {
      const message = 'Kamida Ismingiz bo`lishi shart'
      enqueueSnackbar(message, {
         variant: 'warning',
      });

   };
   

   const handleSubmit = () => {  

     if(userName.current.value) {
        createLead({
           variables: {
              name: userName.current.value,
              phone: userNumber.current.value ? `${userNumber.current.value}` : null,
              leadBoxID: typeof itemId === 'string' ? itemId : itemId?.id,
              gender: null,
              comment: userComment.current.value ? userComment.current.value : null,
              courseID: null,
              teachID: null
           }
        })

        setAdd()
        let form = document.querySelector('#form' + formId)
        form.reset()
        userName.current.value = ''
        userNumber.current.value = ''
        userComment.current.value = ''
     }else {
        handleClick()
     }
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

            if ((userName.current.value) && closeOrAdd === 0) {
               handleSubmit()
               setAdd(false)
            } else if (closeOrAdd === 0) {
               setAdd(false)
               userName.current.value = ''
               userNumber.current.value = ''
               userComment.current.value = ''
            }
         }
         document.addEventListener("mousedown", handleClickOutside);

         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref, itemId])
   }


   useOutsideAlerter(wrapperRef);
   return (

      <form id={`form` + formId} className="lllid">
      <div className="addForm" ref={wrapperRef}>
            <input autoComplete="off"  type="text" className="home-column-top__name"
            placeholder={Language[lang].students.id.fullName} required ref={userName}
            onKeyUp={(e) => {
               if (e.keyCode === 13) {
                  handleSubmit()
               }
            }}
         />
            <input autoComplete="off"  type="text" className="home-column-top__number"
            placeholder={Language[lang].students.payment.comment} required ref={userNumber} minLength={12} maxLength={12}
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