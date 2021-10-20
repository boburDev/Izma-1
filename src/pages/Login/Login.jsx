import './Login.scss'
import Banner from '../../assets/banner.jpg'
import IZMA from '../../assets/Icons/top.svg'
import { useEffect, useState } from 'react';
import { LOGIN } from './query'
import { useMutation } from '@apollo/client';
import { useLogin } from '../../context/LoginProvider'
import { useParams } from 'react-router';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput'
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useLang } from '../../context/LanguageProvider'
import Language from '../../lang/index'
import { useSnackbar } from 'notistack';
const Login = () => {
   const [lang,setLang] = useLang()
   const [password, setPassword] = useState("")
   const [phone, setPhone] = useState("")
   const [token, setToken] = useLogin()
   const [active,setActive] = useState(lang || 'en')
   const { centerHashtag } = useParams()
   const language = Language[lang].authentication

   const { enqueueSnackbar } = useSnackbar();
   const handleClick2 = (message) => {
      enqueueSnackbar(message, {
         variant: 'error',
      });

   };


   const [login, {data: error}] = useMutation(LOGIN, {
      update: (cache, data) => {
         if (data) setToken({
            token: data.data.login,
            hashtag: centerHashtag
         })
      }
   })

   useEffect(() => {
      if (error?.login === null) {
         handleClick2(`Telefon yoki Parol noto'gri terilgan`)
      }
   }, [error])

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
      

      document.getElementById('loginFormRes').reset()
   }

   if (token.token) {
      window.location.assign('/dashboard')
   }

   return (
      <div className="container">
         <div className="request-wrapper">
            <div className="boxLogin">
               <div className="inner">
                  <div className="banner">
                     <img src={Banner} alt="" />
                  </div>
                  <div className="login_page">
                     <div className="right_part">
                        <img src={IZMA} alt="" />
                     </div>
                     <div className="left_part">
                        <div className="top_items">
                           <span>{language.login}</span>
                           <div className="lang">
                              <button onClick={() => {
                                 setLang('en')
                                 setActive(1)
                              }}
                              className={`${active === 'en' && 'active'}`}>{language.lang.en}</button>

                              <button onClick={() => {
                                 setLang('ru')
                                 setActive(2)
                              }}
                              className={`${active === 'ru' && 'active'} center_btn`}>{
                              language.lang.ru}</button>

                              <button onClick={() => {
                                 setLang('uz')
                                 setActive(3)
                              }}
                              className={`${active === 'uz' && 'active'}`}>{language.lang.uz}</button>
                           </div>
                        </div>

                        <form id="loginFormRes" onSubmit={submitLogin} action="">
                           <label htmlFor="">{language.phone} *</label>
                           <PhoneNumberInput
                              setPhone={setPhone}
                           />
                           <label className="mtt" htmlFor="">{language.password} *</label>
                           <PasswordInput
                              setPassword={setPassword}
                           />
                           <button className="log_btn" type="submit">{language.loginBtn}</button>
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