import { useEffect } from 'react'
import './PhoneNumberInput.scss'

const PhoneNumberInput = ({ setPhone, setParents, parents, placeholder }) => {

   if(parents) {
      let n = parents
      if(parents.length === 13) {
         parents = `(${n[4]}${n[5]}) ${n[6]}${n[7]}${n[8]}-${n[9]}${n[10]}-${n[11]}${n[12]}`
      } else if (parents.length === 12) {
         parents = `(${n[3]}${n[4]}) ${n[5]}${n[6]}${n[7]}-${n[8]}${n[9]}-${n[10]}${n[11]}`
      }else if (parents.length === 9) {
         parents = `(${n[0]}${n[1]}) ${n[2]}${n[3]}${n[4]}-${n[5]}${n[6]}-${n[7]}${n[8]}`
      }else {
         parents = ''
      }
   }


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
            defaultValue={parents ? parents : ''}
            autoComplete="off"
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
            }} onPaste={(e) => {

              setTimeout(() => {
                 if(e.target.value.length >= 9) {
                    let n = e.target.value.split('').splice(0, 9)
                    e.target.value = `(${n[0]}${n[1]}) ${n[2]}${n[3]}${n[4]}-${n[5]}${n[6]}-${n[7]}${n[8]}`
                 } else if (e.target.value.length === 1) {
                    let n = e.target.value.split('').splice(0, 9)
                    e.target.value = `(${n[0]}`
                 }
                  else if (e.target.value.length === 2) {
                    let n = e.target.value.split('').splice(0, e.target.value.length)
                    e.target.value = `(${n[0]}${n[1]})`
                 } else if (e.target.value.length >= 3 && e.target.value.length < 5) {
                    let n = e.target.value.split('').splice(0, e.target.value.length)
                    e.target.value = `(${n[0] ? n[0] : ''}${n[1] ? n[1] : ''}) ${n[2] ? n[2] : ''}${n[3] ? n[3] : ''}${n[4] ? n[4] : ''}`
                 } else if (e.target.value.length >= 5 && e.target.value.length < 7) {
                    let n = e.target.value.split('').splice(0, e.target.value.length)
                    e.target.value = `(${n[0] ? n[0] : ''}${n[1] ? n[1] : ''}) ${n[2] ? n[2] : ''}${n[3] ? n[3] : ''}${n[4] ? n[4] : ''}-${n[5] ? n[5] : ''}`
                 } else if (e.target.value.length >= 6 && e.target.value.length <= 9) {
                    let n = e.target.value.split('').splice(0, e.target.value.length)
                    e.target.value = `(${n[0] ? n[0] : ''}${n[1] ? n[1] : ''}) ${n[2] ? n[2] : ''}${n[3] ? n[3] : ''}${n[4] ? n[4] : ''}-${n[5] ? n[5] : ''}${n[6] ? n[6] : ''}-${n[7] ? n[7] : ''}${n[8] ? n[8] : ''}`
                 }
                 else if (e.target.value.length < 9) {
                    let n = e.target.value.split('').splice(0, e.target.value.length)
                    e.target.value = `(${n[0] ? n[0] : ''}${n[1] ? n[1] : ''}) ${n[2] ? n[2] : ''}${n[3] ? n[3] : ''}${n[4] ? n[4] : ''}-${n[5] ? n[5] : ''}${n[6] ? n[6] : ''}-${n[7] ? n[7] : ''}${n[8] ? n[8] : ''}`
                 }
              }, 0);

              
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

