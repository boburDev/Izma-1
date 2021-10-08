import './DropSearch.scss'
import { useEffect, useRef, useState } from 'react'
import Arrow from '../../assets/Icons/arrow_im.svg'

const DropSearch = ({ arr, pInput, fnc, notReq }) => {
   const input = useRef()
   const inputSpan = useRef()
   const browsers = useRef()
   const arrow = useRef()
   const [focs, setFocs] = useState()




   useEffect(() => {
      arrow.current.classList.remove('active')
      browsers.current.style.display = 'none';
      input.current.style.borderRadius = "5px";

      

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

      inputSpan.current.onclick = function () {
         setFocs(true)
         input.current.focus()
      }

      input.current.addEventListener('blur', () => {
         setFocs(false)
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
      browsers.current.childNodes.forEach(option => {
         option.onclick = function () {
            if (option.className === 'selected') {
               input.current.value = '';
               inputSpan.current.textContent = 'Select options'
            } else {
               input.current.value = option.textContent;
               inputSpan.current.textContent = option.textContent;
            }
            arrow.current.classList.remove('active')
            browsers.current.style.display = 'none';
            input.current.style.borderRadius = "5px";
         }
      })

    
      input.current.oninput = function () {
         currentFocus = -1;
         var text = input.current.value.toUpperCase();
         for (let option of browsers.current.childNodes) {
            if (option.textContent.toUpperCase().indexOf(text) > -1) {
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

   const useOutsideAlerter = (ref) => {
      useEffect(() => {
         function handleClickOutside(event) {
            let coun = 0
            event.path && event.path.map(el => {
               if (el.className === 'dropSearch') {
                  coun++
               }
               return ''
            })


            if (coun === 0) {
               arrow.current.classList.remove('active')
               browsers.current.style.display = 'none';
               input.current.style.borderRadius = "5px";
            }

         }
         document.addEventListener("mousedown", handleClickOutside);

         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref])
   }



  
   const wrapperRef = useRef(null);
   useOutsideAlerter(wrapperRef);


   return (
      <div className="dropSearch" ref={wrapperRef}>
         <div className="inputWrapper">
            <div className="inputWrr">
               <input autoComplete="off" list="" name="browsers" placeholder={pInput} 
                  className={`dropSearchInput ${focs ? 'active': ''}`}
                  ref={input}
                  required={notReq ? false : true}
               />
               <span ref={inputSpan} className={`dropBox ${focs ? 'active' : ''}`}>Select options</span>
            </div>
            <span ref={arrow} className="dropSearchArrow" ><img src={Arrow} alt=""

            /></span>
         </div>
         <div className="dropSearchDatalist" ref={browsers}>
            {
               arr && arr.map((z, i) => (
                  <span
                  
                     onClick={(e) => {
                        if (e.target.className === 'selected') {
                           fnc('')
                        } else {
                           fnc(z)
                        }
                     }}
                     key={i} data-name={z.id ? z.id : z.Id}>{z.name ? z.name : z.room}</span>
               ))
            }
         </div>
      </div>
   )
}
export default DropSearch