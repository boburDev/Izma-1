import './Modal.scss';
import { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import DropSearch from '../DropSearch/DropSearch';
import { DatePicker } from 'antd'
const Modal1 = ({ myModal, setMymodal, block, title, setInfo, info, submitOK, uptRoom, text, groups,setInfo2, redir  }) => {
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

   const { enqueueSnackbar } = useSnackbar();

   const handleClick = () => {
      const message = 'O`chirildi'
      enqueueSnackbar(message, {
         variant: 'error',
      });

   };

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
            <form className="myModal-inner-form" id="modalForm"onSubmit={e => e.preventDefault()}>
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
                                          {
                                             block === 'delete' ?
                                                <>
                                                   <h2>{text}</h2>
                                                   <div className="buttonWrapper">
                                                      <button onClick={() => setMymodal(false)}>Yoq</button>
                                                      <button onClick={() => {
                                                         info ? setInfo(info) : setInfo()
                                                         setMymodal(false)
                                                         window.location.replace(redir)
                                                         handleClick()
                                                      }}>Ha</button>
                                                   </div>
                                                </> :
                                                <>
                                                   {
                                                      block === 'addGroupStudent' ?
                                                      <>
                                                        <div className="addGroup-row">
                                                               <label>Guruhni tanlang</label>
                                                               <DropSearch
                                                                  arr={groups}
                                                                  pInput={`Guruhni tanlang`}
                                                                  fnc={setInfo}
                                                               />
                                                        </div>
                                                        <div className="addGroup-row">
                                                               <label>Sanadan boshlab</label>
                                                               <DatePicker
                                                                  className='date__picker'
                                                                  onChange={(value, dateString) => {
                                                                     setInfo2(dateString)
                                                                  }}
                                                                  placeholder={"Kun-Oy-Yil"}
                                                                  //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                                                                  format={"DD-MM-YYYY"}
                                                               />
                                                        </div>
                                                            <div className="buttonWrapper">
                                                               <button onClick={() => {
                                                                  setMymodal(false)
                                                               }}>Talabni guruhga qo'shish</button>
                                                            </div>


                                                      </> :
                                                      <>
                                                      
                                                      </>
                                                   }
                                                </>
                                          }
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



export default Modal1