import './Modal.scss';
import { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import DropSearch from '../DropSearch/DropSearch';
import { DatePicker } from 'antd'

import { useLang } from '../../context/LanguageProvider';
import Language from '../../lang/index'

const Modal1 = ({ myModal, setMymodal, block, title, setInfo, info, submitOK, uptRoom, text, groups,setInfo2, redir, snake  }) => {
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
   const [lang] = useLang();

   useEffect(() => {
      if(snake) {
         const message = 'O`chirildi'
         enqueueSnackbar(message, {
            variant: 'error',
         });
      }
   }, [snake, enqueueSnackbar])

   

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
            <form className="myModal-inner-form" id="modalForm"onSubmit={e => {
               e.preventDefault()
               document.getElementById('modalForm').reset()
               }}>
               {
                  block === 'addComment' ?
                     <>
                        <label className='myModal-inner-form-label'>{Language[lang].students.payment.comment}</label>
                        <textarea name="" id="" cols="30" onKeyUp={(e) => setInfo(e.target.value)} rows="4"></textarea>
                        <div className="buttonWrapper">
                           <button>{Language[lang].students.background.save}</button>
                        </div>
                     </> :
                     <>
                        {
                           block === 'roomEdit' ?
                              <>
                                 <label className='myModal-inner-form-label'>{Language[lang].students.editStudentInfo.nameOfRoom}</label>
                                 <input autoComplete="off"  type="text" defaultValue={info && info} onKeyUp={(e) => setInfo(e.target.value)} />
                                 <div className="buttonWrapper">
                                    <button onClick={uptRoom}>{Language[lang].students.background.save}</button>
                                 </div>
                              </> :
                              <>
                                 {
                                    block === 'roomAdd' ?
                                       <>
                                          <label className='myModal-inner-form-label'>{Language[lang].students.editStudentInfo.nameOfRoom}</label>
                                          <input autoComplete="off"  type="text" onKeyUp={(e) => setInfo(e.target.value)} />
                                          <div className="buttonWrapper">
                                             <button onClick={submitOK}>{Language[lang].students.background.save}</button>
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
                                                        if(redir) {
                                                           window.location.replace(redir)
                                                        }
                                                      }}>Ha</button>
                                                   </div>
                                                </> :
                                                <>
                                                   {
                                                      block === 'addGroupStudent' ?
                                                      <>
                                                        <div className="addGroup-row">
                                                               <label>{Language[lang].students.addNewStudentTitle.selectGroup}</label>
                                                               <DropSearch
                                                                  arr={groups}
                                                                  pInput={Language[lang].students.addNewStudentTitle.selectGroup}
                                                                  fnc={setInfo}
                                                               />
                                                        </div>
                                                        <div className="addGroup-row">
                                                               <label>{Language[lang].finance.startDay}</label>
                                                               <DatePicker
                                                                  className='date__picker'
                                                                  onChange={(value, dateString) => {
                                                                     setInfo2(dateString)
                                                                  }}
                                                                  placeholder={Language[lang].teachers.addNewUser.date}
                                                                  //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                                                                  format={"DD-MM-YYYY"}
                                                               />
                                                        </div>
                                                            <div className="buttonWrapper">
                                                               <button onClick={() => {
                                                                  setMymodal(false)
                                                               }}>{Language[lang].groups.additionalOption.addToGroupStudent}</button>
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