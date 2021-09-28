import { useEffect } from 'react'
import './PhoneNumberInput.scss'

const PhoneNumberInput = ({ setPhone, setParents, parents }) => {


   useEffect(() => {
      let inp = document.querySelector('.telInput')
      let box = document.querySelector('.phoneInput')

      inp.addEventListener('focus', () => {
         box.style.border = '2px solid #40a9ff'
         box.style.boxShadow = ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      })
      inp.addEventListener('blur', () => {
         box.style.border = '2px solid #C9D5E4'
         box.style.boxShadow = 'none'
      })
   }, [])

   return (
      <div className="phoneInput">
         <span className="numb">+998</span>
         <input
         
            minLength="9"
            maxLength="9"
            className="telInput" type="tel"
            onKeyUp={(e) => {
               if(setParents && e.target.value.length == 9) {
                  setParents(...parents, {number: e.target.value})
                  e.target.disabled = true
               }else if(setPhone && e.target.value.length == 9){
                  setPhone('998'+e.target.value)
                  e.target.disabled = true
               }
            }}
         />
      </div>
   )
}

export default PhoneNumberInput