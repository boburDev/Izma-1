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

   useEffect(() => {
      let inp = document.querySelector('.passwordLogin')

      inp.addEventListener('focus', () => {
         inp.style.border = '1px solid #090761'
         inp.style.boxShadow = ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      })
      inp.addEventListener('blur', () => {
         inp.style.border = '1px solid #C9D5E4'
         inp.style.boxShadow = 'none'
      })
   }, [])

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
                        <img src={Logo} alt="" />
                        <img src={Logo2} alt="" />
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
                           <input className="passwordLogin" onKeyUp={e => setPassword(e.target.value)} type="password" name="" id="" />

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