import './DropSearch.scss'
import { useEffect, useRef } from 'react'
import Arrow from '../../assets/Icons/arrow_im.svg'

const DropSearch = ({ arr, pInput, fnc, notReq }) => {
   const input = useRef()
   const browsers = useRef()
   const arrow = useRef()



   useEffect(() => {

      arrow.current.addEventListener('click', () => {
         if (arrow.current.className === 'dropSearchArrow active') {
            arrow.current.classList.remove('active')
            browsers.current.style.display = 'none';
            input.current.style.borderRadius = "5px";

         } else {
            arrow.current.classList.add('active')
            browsers.current.style.display = 'block';
            input.current.style.borderRadius = "5px 5px 0 0";

         }
      })
      input.current.onfocus = function () {
         arrow.current.classList.add('active')
         browsers.current.style.display = 'block';
         input.current.style.borderRadius = "5px 5px 0 0";


         for (let option of browsers.current.childNodes) {
            if (input.current.value === option.textContent && input.current.value !== '') {
               option.classList.add('selected')
            } else {
               option.classList.remove('selected')
            }
         }
      };
      for (let option of browsers.current.childNodes) {

         option.onclick = function () {
            if (option.className === 'selected') {
               input.current.value = '';
            } else {
               input.current.value = option.textContent;
            }
            arrow.current.classList.remove('active')
            browsers.current.style.display = 'none';
            input.current.style.borderRadius = "5px";
         }
      };

      input.current.oninput = function () {
         currentFocus = -1;
         var text = input.current.value.toUpperCase();
         for (let option of browsers.current.childNodes) {
            if (option.value.toUpperCase().indexOf(text) > -1) {
               option.style.display = "block";
            } else {
               option.style.display = "none";
            }
         };
      }
      var currentFocus = -1;
      input.current.onkeydown = function (e) {
         if (e.keyCode === 40) {
            currentFocus++
            addActive(browsers.current.childNodes);
         }
         else if (e.keyCode === 38) {
            currentFocus--
            addActive(browsers.current.childNodes);
         }
         else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
               /*and simulate a click on the "active" item:*/
               if (browsers.current.options) browsers.current.childNodes[currentFocus].click();
            }
         }
      }

      function addActive(x) {
         if (!x) return false;
         removeActive(x);
         if (currentFocus >= x.length) currentFocus = 0;
         if (currentFocus < 0) currentFocus = (x.length - 1);
         x[currentFocus].classList.add("active");
      }
      function removeActive(x) {
         for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("active");
         }
      }
   }, [arr])


   return (
      <div className="dropSearch">
         <div className="inputWrapper">
            <input autoComplete="off" list="" name="browsers" placeholder={pInput} className="dropSearchInput"
               ref={input}
               required={notReq ? false : true}
            />
            <span ref={arrow} className="dropSearchArrow"><img src={Arrow} alt=""

            /></span>
         </div>
         <datalist className="dropSearchDatalist" ref={browsers}>
            {
               arr && arr.map((z, i) => (
                  <option
                  
                     onClick={(e) => {
                        if (e.target.className === 'selected') {
                           fnc('')
                        } else {
                           fnc(z)
                        }
                     }}
                     key={i} value={z.id ? z.id : z.Id}>{z.name ? z.name : z.room}</option>
               ))
            }
         </datalist>
      </div>
   )
}
export default DropSearch