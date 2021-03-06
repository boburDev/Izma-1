import './LidForm.scss'
import Banner from '../../../assets/banner.jpg'
import QoraBanner from '../../../assets/qorabanenr.svg'
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput'
import { useMutation, useQuery } from '@apollo/client'
import { COURSES, NEW_LEAD } from './query'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'

const LidForm = () => {

   const [name, setName] = useState("")
   const [phone, setPhone] = useState("")
   const [comment, setComment] = useState("")
   const [course, setCourse] = useState("")
   const [allCourse, setAllCourse] = useState([])
   const { hashtag } = useParams()
   const [lang] = useLang()

   const { data: courses } = useQuery(COURSES, {
      variables: { hashtag }
   })

   const [newLead] = useMutation(NEW_LEAD)

   useEffect(() => {
      if (courses && courses.byHashtag) {
         setAllCourse(courses && courses.byHashtag)
      }
   }, [courses])


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
                     <h3>{Language[lang].settings.forms.messageForLc}</h3>
                     <img src={QoraBanner} alt="" />
                  </div>
                  <div className="top_iteems1">
                     <p>{Language[lang].settings.forms.happyWhatWelistening}</p>

                  </div>
               </div>

               <div className="user_name1">
                  <label className="name_label1" htmlFor="">{Language[lang].settings.forms.fullName} *</label>
                  <input autoComplete="off"  onKeyUp={e => setName(e.target.value)} className="name_input1" type="text" name="" id="" />
               </div>

               <div className="user_name1">
                  <label className="name_label1" htmlFor="">{Language[lang].settings.forms.phoneNumber} *</label>
                  <PhoneNumberInput
                     setPhone={setPhone}
                  />
               </div>

               <div className="user_name1">
                  <label className="name_label1" htmlFor="">{Language[lang].settings.forms.comment}</label>

                  <textarea onKeyUp={e => setComment(e.target.value)} className="name_input1 comment1" type="text" name="" id="" />
               </div>

               <div className="user_name1">
                  <label className="name_label1" htmlFor="">{Language[lang].settings.forms.selectCourse} *</label>
                  <select onChange={e => setCourse(e.target.value)} className="name_input1" name="" id="">
                     <option value=""  disabled>{Language[lang].settings.forms.selectCourse}</option>
                     {
                        allCourse?.map((e, i) => (
                           <option key={i} value={e.id}>{e.name}</option>
                        ))
                     }
                  </select>
               </div>

               <button onClick={handleRequest}>{Language[lang].settings.forms.send}</button>
            </div>
         </div>
      </div>
   )
}

export default LidForm