import { useEffect, useRef } from 'react'
import './LidAddForm.scss'

const LidAddForm = ({ setAdd, itemId, formId, columns, setColumns }) => {
   const userName = useRef()
   const userNumber = useRef()
   const userComment = useRef()

   const handleSubmit = async () => {
      // await request.post(`/list`, {
      //    userName: userName.current.value,
      //    userNumber: userNumber.current.value,
      //    userComment: userComment.current.value,
      //    itemId: itemId
      // });

      let item = typeof itemId === 'string' ? columns.find(el => el.id === itemId) : columns.find(el => el.boxStatus === itemId)
      
      
      item.items.push({
         id: 'adsfadf',
         userName: userName.current.value,
         userNumber: userNumber.current.value,
         userComment: userComment.current.value

      })
      setColumns(columns)
      setAdd()
      let form = document.querySelector('#form' + formId)
      form.reset()
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

            if ((userName.current.value || userNumber.current.value) && closeOrAdd > 0) {
               setAdd(false)
               handleSubmit()
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
         <input type="text" className="home-column-top__name"
            placeholder="ism va familiya" required ref={userName}
            onKeyUp={(e) => {
               if (e.keyCode === 13) {
                  handleSubmit()
               }
            }}
         />
         <input type="text" className="home-column-top__number"
            placeholder="telefon" required ref={userNumber} minLength={12} maxLength={12}
            onKeyUp={(e) => {
               if (e.keyCode === 13) {
                  handleSubmit()
               }
            }}
         />
         <input type="text" className="home-column-top__coment"
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