import './CoursesFormMain.scss'
import CloseBtn from '../../../../assets/Icons/Group 26.svg'
import { Form, Input, } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COURSE } from '../../../../Querys/Courses_Query';
import { UPDATE_COURSE, ONE_COURSE_TO_EDIT } from '../../../../Querys/Courses_Query';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useLang } from '../../../../context/LanguageProvider';
import Language from '../../../../lang/index'

const CoursesFormMain = ({ onClose }) => {

   const { courseID } = useParams()

   const [lang] = useLang()

   const { data: dataToEdit } = useQuery(ONE_COURSE_TO_EDIT, { variables: { id: courseID } })
   const [Update_course] = useMutation(UPDATE_COURSE)


   const [name, setName] = useState(dataToEdit && dataToEdit.byCourseID[0].name)
   const [price, setPrice] = useState(dataToEdit && dataToEdit.byCourseID[0].price)
   const [description, setDescription] = useState(dataToEdit && dataToEdit.byCourseID[0].description)
   const [disabled, setDisabled] = useState(true)

   useEffect(() => {
      name && price ? setDisabled(false) : setDisabled(true)
   }, [name, price])

   const [newCourse] = useMutation(CREATE_COURSE, {
      update: (cache, data) => {
         // console.log(data)
      }
   })


   const handleSubmit = (id) => {
      onClose()

      const data = {
         name,
         price,
         description
      }

      if (courseID) {

         Update_course({
            variables: { id: courseID, ...data }
         })

      } else {

         newCourse({
            variables: data
         })
      }

      document.getElementById('courseformRes').reset()

   }

   return (
      <>
         <div className="izma__lidlar__form-bolim">
            <Form id="courseformRes" className="izma__lidlar__form-bolim-form" style={{ width: 400 }} data={disabled}>
               <div className="izma__lidlar__form-bolim-form-up">
                  <h3 className='izma__lidlar__form-bolim-form-heading' >{Language[lang].courses.editCourse.editCourseTitle}</h3>
                  <button className="izma__lidlar__form-bolim-form-close-btn" onClick={onClose} >
                     <img className="izma__lidlar__form-bolim-form-img" src={CloseBtn} alt="img" />
                  </button>
               </div>
               <div className="izma__lidlar__form-bolim-line"></div>

               <div className="form_group izma__lidlar__form-bolim-form-center" style={{ width: "100%" }}>
                  <label className='izma__lidlar__form-bolim-form-label'>{Language[lang].courses.editCourse.name}</label>
                  <Input autoComplete="off"  onChange={e => setName(e.target.value)} className={"section_name_input"} name={"nomi"} value={name} />
               </div>
               <div className="form_group" style={{ width: "100%" }}>
                  <label className='izma__lidlar__form-bolim-form-label'>{Language[lang].courses.editCourse.price}</label>
                  <Input autoComplete="off"  onChange={e => setPrice(e.target.value)} className={"section_name_input"} name={"nomi"} value={price} />
               </div>
               <div className="form_group izma__form__teaxtarea" style={{ width: 400 }}>
                  <label>{Language[lang].courses.editCourse.description}</label>
                  <TextArea
                     className={"section_name_input"}
                     onChange={e => setDescription(e.target.value)}
                     name={"description"}
                     autoSize
                     value={description}
                  />
               </div>
            </Form>
            <button onClick={handleSubmit} className="izma__lidlar__form-bolim-form-button">
               {Language[lang].settings.companySettings.save}
            </button>
         </div>
      </>
   )
}

export default CoursesFormMain

