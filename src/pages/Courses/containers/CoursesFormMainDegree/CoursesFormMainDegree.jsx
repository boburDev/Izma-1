import './CoursesFormMainDegree.scss'
import CloseBtn from '../../../../assets/Icons/Group 26.svg'
import { Form, Input, } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useMutation } from '@apollo/client';
import { NEW_DEGREE } from '../../../../Querys/Degree';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const CoursesFormMainDegree = ({ onClose }) => {

   const { courseID } = useParams()

   const [name, setName] = useState()
   const [price, setPrice] = useState()
   const [description, setDescription] = useState()
   const [disabled, setDisabled] = useState(true)

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

   }

   return (
      <>
         <div className="izma__lidlar__form-bolim">
            <Form className="izma__lidlar__form-bolim-form" style={{ width: 400 }} id={disabled}>
               <div className="izma__lidlar__form-bolim-form-up">
                  <h3 className='izma__lidlar__form-bolim-form-heading' >Kursni tahrirlash</h3>
                  <button className="izma__lidlar__form-bolim-form-close-btn" onClick={onClose} >
                     <img className="izma__lidlar__form-bolim-form-img" src={CloseBtn} alt="img" />
                  </button>
               </div>
               <div className="izma__lidlar__form-bolim-line"></div>

               <div className="form_group izma__lidlar__form-bolim-form-center" style={{ width: "100%" }}>
                  <label className='izma__lidlar__form-bolim-form-label'>Nomi</label>
                  <Input onChange={e => setName(e.target.value)} className={"section_name_input"} name={"nomi"} value={name} />
               </div>
               <div className="form_group" style={{ width: "100%" }}>
                  <label className='izma__lidlar__form-bolim-form-label'>Narxi</label>
                  <Input onChange={e => setPrice(e.target.value)} className={"section_name_input"} name={"nomi"} value={price} />
               </div>
               <div className="form_group izma__form__teaxtarea" style={{ width: 400 }}>
                  <label>Tavsif</label>
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
               Yarating
            </button>
         </div>
      </>
   )
}

export default CoursesFormMainDegree

