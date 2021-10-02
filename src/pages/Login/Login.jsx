import './Login.scss'
import Banner from '../../assets/banner.jpg'
import Logo from '../../assets/Icons/top.svg'
import Logo2 from '../../assets/Group 12.svg'
import { useState, useEffect } from 'react';
import { LOGIN } from './query'
import { useMutation } from '@apollo/client';
import { useLogin } from '../../context/LoginProvider'
import { useParams } from 'react-router';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput'
import PasswordInput from '../../components/PasswordInput/PasswordInput';

const Login = () => {

   const [password, setPassword] = useState("")
   const [phone, setPhone] = useState("")
   const [token, setToken] = useLogin()

   const { centerHashtag } = useParams()


   const [login] = useMutation(LOGIN, {
      update: (cache, data) => {
         if (data) setToken({
            token: data.data.login,
            hashtag: centerHashtag
         })
      }
   })

   const submitLogin = (e) => {
      e.preventDefault()

      const data = {
         phoneNumber: phone,
         password: password,
         hashtag: centerHashtag
      }
      login({
         variables: data
      })
   }

   if (token.token) window.location.assign('/')



   return (
      <div className="container">
         <div className="request-wrapper">
            <div className="boxLogin">
               <div className="inner">
                  <div className="banner">
                     <img src={Banner} alt="" />
                  </div>
                  {/* <div className="anony_block">
                  <h3 className="request_set">
                     O'quv markaziga so'rov qoldiring
                  </h3>
               </div> */}
                  <div className="login_page">
                     <div className="right_part">
                        <img src={Banner} alt="" />
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

                        <form onSubmit={submitLogin} action="">
                           <label htmlFor="">Telefon *</label>


                           <PhoneNumberInput
                              setPhone={setPhone}
                           />

                           <label className="mtt" htmlFor="">Parol *</label>
                           <PasswordInput
                              setPassword={setPassword}
                           />

                           <button className="log_btn" type="submit">Login</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login