import { useEffect, useRef } from 'react'
import './LidAddForm.scss'
import { useMutation } from '@apollo/client'
import { NEW_LEAD } from '../../../pages/Lids/query'
// <<<<<<< HEAD
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'
// =======
import { useSnackbar } from 'notistack';

// >>>>>>> 19e26c884841d66d8a6c48e3b37e02f80881de1d

const LidAddForm = ({ setAdd, itemId, formId, columns, setColumns }) => {
   const userName = useRef()
   const userNumber = useRef()
   const userComment = useRef()
   const [createLead] = useMutation(NEW_LEAD)
// <<<<<<< HEAD
   const [lang] = useLang()
// =======

   const { enqueueSnackbar } = useSnackbar();

   const handleClick = () => {
      const message = 'Ism va telefoningizni kiriting'
      enqueueSnackbar(message, {
         variant: 'warning',
      });

   };
// >>>>>>> 19e26c884841d66d8a6c48e3b37e02f80881de1d
   

   const handleSubmit = async () => {
   
     if(userName.current.value && userNumber.current.value) {
        createLead({
           variables: {
              name: userName.current.value,
              phone: userNumber.current.value,
              leadBoxID: typeof itemId === 'string' ? itemId : itemId?.id,
              gender: null,
              comment: userComment.current.value,
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

            if ((userName.current.value && userNumber.current.value) && closeOrAdd === 0) {
               setAdd(false)
               handleSubmit()
            } else if ((!userName.current.value || !userNumber.current.value) && closeOrAdd === 0) {
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
      }, [ref])
   }


   const wrapperRef = useRef(null);
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