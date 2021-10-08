import './CoursesFormMainDegree.scss'
import CloseBtn from '../../../../assets/Icons/Group 26.svg'
import { Form, Input, } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useMutation } from '@apollo/client';
import { NEW_DEGREE } from '../../../../Querys/Degree';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useLang } from '../../../../context/LanguageProvider';
import Language from '../../../../lang/index'

const CoursesFormMainDegree = ({ onClose }) => {

   const { courseID } = useParams()

   const [name, setName] = useState()
   const [price, setPrice] = useState()
   const [description, setDescription] = useState()
   const [disabled, setDisabled] = useState(true)
   const [lang] = useLang()

   useEffect(() => {
      name && price ? setDisabled(false) : setDisabled(true)
   }, [name, price])

   const [newDegree, { data: ss }] = useMutation(NEW_DEGREE)

   console.log(ss)
   const handleSubmit = (id) => {
      onClose()

      newDegree({
         variables: {
            degreeName: name,
            degreePrice: price,
            degreeDesc: description,
            courseID: courseID
         }
      })

      document.getElementById('courseformRes2').reset()

   }

   return (
      <>
         <div className="izma__lidlar__form-bolim">
            <Form id="courseformRes2" className="izma__lidlar__form-bolim-form" style={{ width: 400 }} data={disabled}>
               <div className="izma__lidlar__form-bolim-form-up">
                  <h3 className='izma__lidlar__form-bolim-form-heading' >{Language[lang].courses.editCourse.editCourseName}</h3>
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
            {Language[lang].courses.editCourse.create}
            </button>
         </div>
      </>
   )
}

export default CoursesFormMainDegree

