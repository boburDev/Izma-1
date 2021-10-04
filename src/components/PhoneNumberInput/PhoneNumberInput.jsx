import { useEffect } from 'react'
import './PhoneNumberInput.scss'

const PhoneNumberInput = ({ setPhone, setParents, parents, placeholder }) => {


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
            placeholder={placeholder && placeholder}
            minLength="14"
            maxLength="14"
            className="telInput" type="tel"
            onKeyPress={(e) => {
               if (e.target.value.length === 2) {
                  // eslint-disable-next-line no-useless-concat
                  e.target.value = '(' + e.target.value + ')' + ' '
               } else if (e.target.value.length === 8) {
                  e.target.value = e.target.value + '-'
               } else if (e.target.value.length === 11) {
                  e.target.value = e.target.value + '-'
               }
            }}
            onKeyUp={(e) => {
               
               if(setParents && e.target.value.length === 14) {
                  e.target.blur()
               }else if(setPhone && e.target.value.length === 14){
                  setPhone('998'+e.target.value.replace(/[^\d|.-]/g, '').split('-').join(''))
               }
            }}
         />
      </div>
   )
}

export default PhoneNumberInput

