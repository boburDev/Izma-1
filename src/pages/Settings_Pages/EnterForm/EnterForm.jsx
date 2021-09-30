// import './EnterForm.scss'
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
                  <div className="request-wrapper">
                     <div className="inner">
                        <div className="banner">
                           <Avatar />
                        </div>
                        <div className="anony_block">
                           <input type="text" defaultValue="O'quv markaziga so'rov qoldiring" name="" id="req"
                              onKeyUp={e => setSendReq(e.target.value)}
                           />
                           <label className="circle-pen" htmlFor="req"><img src={Pen} alt="" /></label>
                        </div>
                        <div className="login_page">
                           <div className="right_part">
                              <Avatar />
                           </div>
                           <div className="left_part">
                              <div className="top_items">
                                 <span>Login</span>
                                 <div className="lang">
                                    <button>ENG</button>
                                    <button className="center_btn">RU </button>
                                    <button>UZ</button>
                                 </div>
                              </div>

                              {/* <form onSubmit={submitLogin} action=""> */}
                              <form action="">
                                 <label htmlFor="">Telefon *</label>
                                 <PhoneNumberInput
                                    setPhone={setPhone}
                                 />
                                 

                                 <label className="mtt" htmlFor="">Parol *</label>
                                 <PasswordInput
                                    setPassword={setPassword}
                                 />

                                 <button className="log_btn">Login</button>
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