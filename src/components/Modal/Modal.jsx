import './Modal.scss';
import { useEffect, useRef } from 'react';
const Modal = ({myModal, setMymodal, block}) => {

   const useOutsideAlerter = (ref) => {
      useEffect(() => {
         function handleClickOutside(event) {
            if (event.target.className === 'myModal active') {
                  setMymodal(false)
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
   return(
      <div className={`myModal ${myModal ? 'active' : ''}`} ref={wrapperRef}>
         <div className="myModal-inner">
            <div className="myModal-inner-header">
               <h2>Yangi eslatma qo'shing</h2>
               <div className="burger"
                  onClick={() => setMymodal(false)}
               >
                  <span></span>
               </div>
            </div>
               <form action="" className="myModal-inner-form">
                  <input type="text" />

                  <button>Saqlash</button>
               </form>
         </div>
      </div>
   )
}

export default Modal