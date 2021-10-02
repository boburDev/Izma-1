import './Modal.scss';
import { useEffect, useRef } from 'react';
const Modal = ({ myModal, setMymodal, block, title, setInfo, info, submitOK, uptRoom }) => {
   const commentText = useRef()
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
   return (
      <div className={`myModal ${myModal ? 'active' : ''}`} ref={wrapperRef}>
         <div className="myModal-inner">
            <div className="myModal-inner-header">
               <h2>{title}</h2>
               <div className="burger"
                  onClick={() => setMymodal(false)}
               >
                  <span></span>
               </div>
            </div>
            <form className="myModal-inner-form" onSubmit={e => e.preventDefault()}>
               {
                  block === 'addComment' ?
                     <>
                        <label className='myModal-inner-form-label'>Comment</label>
                        <textarea name="" id="" cols="30" onKeyUp={(e) => setInfo(e.target.value)} rows="4"></textarea>
                        <div className="buttonWrapper">
                           <button>Saqlash</button>
                        </div>
                     </> :
                     <>
                        {
                           block === 'roomEdit' ?
                              <>
                                 <label className='myModal-inner-form-label'>Xonani nomi</label>
                                 <input type="text" defaultValue={info && info} onKeyUp={(e) => setInfo(e.target.value)} />
                                 <div className="buttonWrapper">
                                    <button onClick={uptRoom}>Saqlash</button>
                                 </div>
                              </> :
                              <>
                                 {
                                    block === 'roomAdd' ?
                                       <>
                                          <label className='myModal-inner-form-label'>Xona nomi</label>
                                          <input type="text" onKeyUp={(e) => setInfo(e.target.value)} />
                                          <div className="buttonWrapper">
                                             <button onClick={submitOK}>Yaratish</button>
                                          </div>
                                       </> :
                                       <>
                                          <div className="buttonWrapper">
                                             <button>Yaratish</button>
                                          </div>
                                       </>
                                 }
                              </>

                        }
                     </>
               }
            </form>
         </div>
      </div>
   )
}

export default Modal