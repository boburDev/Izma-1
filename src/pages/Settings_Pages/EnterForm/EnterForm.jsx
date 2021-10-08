import './EnterForm.scss'
// import Pen from '../../../assets/Icons/pen.svg'
import { useState } from 'react';
import PhoneNumberInput from "../../../components/PhoneNumberInput/PhoneNumberInput";
import Avatar from './containers/UploadFoto/UploadFoto'
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import { useLang } from '../../../context/LanguageProvider';
import Language from '../../../lang/index'

const EnterForm = () => {

   const [, setPassword] = useState("")
   const [, setPhone] = useState("")
   const [lang] = useLang()

   
   return (
      <>

         <div className="main-page">
            <div className="form-side">
               <div className="containers">
                  <div className="request-wrapper1">
                     <div className="boxLogin1">
                        <div className="inner1">
                           <div className="banner1">
                              <Avatar />
                           </div>
                           {/* <div className="anony_block1">
                           <input type="text" defaultValue="O'quv markaziga so'rov qoldiring" name="" id="req"
                              onKeyUp={e => setSendReq(e.target.value)}
                           />
                           <label className="circle-pen1" htmlFor="req"><img src={Pen} alt="" /></label>
                        </div> */}
                           <div className="login_page1">
                              <div className="right_part1">
                                 <Avatar />
                              </div>
                              <div className="left_part1">
                                 <div className="top_items1">
                                    <span>Login</span>
                                    <div className="lang1">
                                       <button>ENG</button>
                                       <button className="center_btn1">RU </button>
                                       <button>UZ</button>
                                    </div>
                                 </div>

                                 {/* <form onSubmit={submitLogin} action=""> */}
                                 <form id="enterFormRes" action="" onSubmit={() => {
                                    document.getElementById('enterFormRes').reset()
                                 }}>
                                    <label htmlFor="">{Language[lang].settings.forms.phoneNum} *</label>
                                    <PhoneNumberInput
                                       setPhone={setPhone}
                                    />


                                    <label className="mtt1" htmlFor="">{Language[lang].settings.forms.password} *</label>
                                    <PasswordInput
                                       setPassword={setPassword}
                                    />

                                    <button className="log_btn1">Login</button>
                                 </form>
                                 <div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default EnterForm