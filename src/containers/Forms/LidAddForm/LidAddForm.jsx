import { useEffect, useRef } from 'react'
import './LidAddForm.scss'
import { useMutation } from '@apollo/client'
import { NEW_LEAD } from '../../../pages/Lids/query'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'
import { useSnackbar } from 'notistack';


const LidAddForm = ({ setAdd, itemId, formId, columns, setColumns }) => {
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
              leadBoxID: itemId,
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


  

   function useOutsideAlerter(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            if (userName.current.value) {
               handleSubmit()
               setAdd(false)
            } else  {
               setAdd(false)
               userName.current.value = ''
               userNumber.current.value = ''
               userComment.current.value = ''
            }
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
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