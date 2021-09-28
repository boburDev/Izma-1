import './LidForm.scss'
import Banner from '../../../assets/banner.jpg'
import QoraBanner from '../../../assets/qorabanenr.svg'
import PhoneInput from "react-phone-input-2";
import { useMutation, useQuery } from '@apollo/client';
import { COURSES, NEW_LEAD } from './query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


const LidForm = () => {

   const [name, setName] = useState("")
   const [phone, setPhone] = useState("")
   const [comment, setComment] = useState("")
   const [course, setCourse] = useState("")
   const { hashtag } = useParams()

   const { data: courses } = useQuery(COURSES, {
      variables: { hashtag }
   })

   const [newLead] = useMutation(NEW_LEAD, {
      update: (cache, data) => {
         console.log(data)
      }
   })

   const handleRequest = () => {
      newLead({
         variables: {
            name,
            phoneNumber: phone,
            comment,
            course,
            hashtag
         }
      })
   }

   return (
      <div className="container">
         <div className="lidFormm">
            <div className="inner">
               <div className="banner">
                  <img src={Banner} alt="" />
               </div>

               <div className="request_center">
                  <div className="top_iteems">
                     <h3>O'quv markaziga so'rov qoldiring</h3>
                     <img src={QoraBanner} alt="" />
                  </div>
                  <div className="top_iteems">
                     <p>Keling bir ajoyib hikoya yozamiz</p>

                  </div>
               </div>

               <div className="user_name">
                  <label className="name_label" htmlFor="">Ism va familya *</label>
                  <input onKeyUp={e => setName(e.target.value)} className="name_input" type="text" name="" id="" />
               </div>

               <div className="user_name">
                  <label className="name_label" htmlFor="">Telefon *</label>
                  <div className="number">
                     <span>+998</span>
                     <PhoneInput
                        className="phone_number"
                        country={"uz"}
                        inputStyle={{
                           width: "100%",
                           padding: "13px 10px 13px 44px",
                           background: "#ffffff",
                           border: "2px solid #EDF2F8",
                           boxSizing: "border-box",
                           fontSize: "16px",
                           outline: "none"
                        }}
                        specialLabel={false}
                        disableDropdown={true}
                        countryCodeEditable={false}
                        areaCodes={{
                           uz: ["+998"],
                        }}
                        masks={{ uz: "(..) ...-..-.." }}
                        prefix="+"
                        onChange={e => setPhone(e)}

                     />
                  </div>
               </div>

               <div className="user_name">
                  <label className="name_label" htmlFor="">Izoh</label>

                  <textarea onKeyUp={e => setComment(e.target.value)} className="name_input comment" type="text" name="" id="" />
               </div>

               <div className="user_name">
                  <label className="name_label" htmlFor="">Kursingizni tanlang *</label>
                  <select onChange={e => setCourse(e.target.value)} className="name_input" name="" id="">
                     {
                        courses && courses.byHashtag.map((e, i) => (
                           <option key={i} value={e.id}>{e.name}</option>
                        ))
                     }
                  </select>
               </div>

               <button onClick={handleRequest}>Yuborish</button>
            </div>
         </div>
      </div>
   )
}

export default LidForm