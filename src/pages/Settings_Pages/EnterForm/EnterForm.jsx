import './EnterForm.scss'
// import Banner from '../../../assets/banner.jpg'
import Pen from '../../../assets/Icons/pen.svg'
import { useState } from 'react';
import PhoneNumberInput from "../../../components/PhoneNumberInput/PhoneNumberInput";
import Avatar from './containers/UploadFoto/UploadFoto'
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
// import { LOGIN } from './query'
// import { useMutation } from '@apollo/client';
// import { useLogin } from './context'
// import { Redirect, useParams } from 'react-router';

const EnterForm = () => {

   const [password, setPassword] = useState("")
   const [phone, setPhone] = useState("")
   // const [token, setToken] = useLogin()

   // const { centerHashtag } = useParams()

   // const [login] = useMutation(LOGIN, {
   //     update: (cache, data) => {
   //         console.log(data)
   //         if (data) setToken({
   //             token: data.data.login,
   //             hashtag: centerHashtag
   //         })
   //     }
   // })

   // const submitLogin = (e) => {
   //     e.preventDefault()
   //     const data = {
   //         phoneNumber: phone,
   //         password,
   //         hashtag: centerHashtag
   //     }
   //     console.log(data)
   //     login({
   //         variables: data
   //     })
   // }

   // if (token.token) return <Redirect to="/lidlar" />

   const [sendReq, setSendReq] = useState('O\'quv markaziga so\'rov qoldiring')
   console.log(sendReq)
   return (
      <>

         <div className="main-page">
            <div className="form-side">
               <div className="containers">
                  <div className="request-wrapper1">
                     <div className="inner1">
                        <div className="banner1">
                           <Avatar />
                        </div>
                        <div className="anony_block1">
                           <input type="text" defaultValue="O'quv markaziga so'rov qoldiring" name="" id="req"
                              onKeyUp={e => setSendReq(e.target.value)}
                           />
                           <label className="circle-pen1" htmlFor="req"><img src={Pen} alt="" /></label>
                        </div>
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
                              <form action="">
                                 <label htmlFor="">Telefon *</label>
                                 <PhoneNumberInput
                                    setPhone={setPhone}
                                 />
                                 

                                 <label className="mtt1" htmlFor="">Parol *</label>
                                 <PasswordInput
                                    setPassword={setPassword}
                                 />

                                 <button className="log_btn1">Login</button>
                              </form>
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