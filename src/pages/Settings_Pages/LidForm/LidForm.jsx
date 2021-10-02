import './LidForm.scss'
import Banner from '../../../assets/banner.jpg'
import QoraBanner from '../../../assets/qorabanenr.svg'
import PhoneInput from "react-phone-input-2";
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
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
         <div className="lidFormm1">
            <div className="inner1">
               <div className="banner1">
                  <img src={Banner} alt="" />
               </div>

               <div className="request_center1">
                  <div className="top_iteems1">
                     <h3>O'quv markaziga so'rov qoldiring</h3>
                     <img src={QoraBanner} alt="" />
                  </div>
                  <div className="top_iteems1">
                     <p>Keling bir ajoyib hikoya yozamiz</p>

                  </div>
               </div>

               <div className="user_name1">
                  <label className="name_label1" htmlFor="">Ism va familya *</label>
                  <input onKeyUp={e => setName(e.target.value)} className="name_input1" type="text" name="" id="" />
               </div>

               <div className="user_name1">
                  <label className="name_label1" htmlFor="">Telefon *</label>
                  <PhoneNumberInput
                     setPhone={setPhone}
                  />
               </div>

               <div className="user_name1">
                  <label className="name_label1" htmlFor="">Izoh</label>

                  <textarea onKeyUp={e => setComment(e.target.value)} className="name_input1 comment1" type="text" name="" id="" />
               </div>

               <div className="user_name1">
                  <label className="name_label1" htmlFor="">Kursingizni tanlang *</label>
                  <select onChange={e => setCourse(e.target.value)} className="name_input1" name="" id="">
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