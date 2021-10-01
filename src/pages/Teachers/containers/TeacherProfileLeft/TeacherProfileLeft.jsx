import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { BY_COLLEGUE_ID } from './query'
import './TeacherProfileLeft.scss'
import PhoneInput from "react-phone-input-2";
import { Input, Space, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import Close from '../../../../assets/Icons/Group 26.svg'
import { Drawer, } from 'antd';
import PasswordInput from '../../../../components/PasswordInput/PasswordInput';
import { useLoader } from '../../../../context/Loader';
import { useEffect } from 'react';
import PhoneNumberInput from '../../../../components/PhoneNumberInput/PhoneNumberInput';

const TeacherProfileLeft = () => {
   const [openEdit, setOpenEdit] = useState(false)
   const { collegueID } = useParams()
   const [setLoader] = useLoader(true)


   const { data: collegue, loading } = useQuery(BY_COLLEGUE_ID, {
      variables: { id: collegueID }
   })

   useEffect(() => {
      setLoader(loading)
   }, [loading])

   const [visible, setVisible] = useState(false);
   const showDrawer = () => {
      setVisible(true);
   };

   const onClose = () => {
      setVisible(false);
   };


   return (
      <div className={`overlay ${openEdit ? 'active' : ''}`}>
         <div className="izma__teachers-payment-inner">


            <div className="izma__teachers-payment-inner-left">
               <div className="izma__teachers-payment-inner-left-wrapper">

                  <div className="izma__teachers-payment-inner-left-up">
                     <div className="izma__teachers-payment-inner-boxses-wrapper">
                        <button
                           onClick={showDrawer}
                           className="izma__teachers-payment-inner-left-up-box izma__teachers-payment-inner-left-up-box-blue"></button>
                     </div>
                     <div className="izma__teachers-payment-inner-left-up-left">
                        <div className="izma__teachers-payment-inner-left-up-box-black"></div>
                        <p className="izma__teachers-payment-inner-left-up-left-name">
                           {collegue && collegue.colleague_by_id.name}
                        </p>

                     </div>
                     <div className="izma__teachers-payment-inner-left-centerizma__teachers-payment-inner-left-center">
                        <div className="izma__teachers-payment-inner-left-center-number izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-number-text izma__teachers-payment-inner-left-center-text">
                              Telefon :
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-number-number izma__teachers-payment-inner-left-center-number-number-wrapper">
                              +{collegue && collegue.colleague_by_id.phoneNumber}
                           </p>
                        </div>

                        <div className="izma__teachers-payment-inner-left-center-balans izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-balans-text izma__teachers-payment-inner-left-center-text">
                              To’g’ilgan sana:
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-balans-balans izma__teachers-payment-inner-left-center-number-number-wrapper">
                              {collegue && collegue.colleague_by_id.birthday}
                           </p>
                        </div>

                        <div className="izma__teachers-payment-inner-left-center-role izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-role-text izma__teachers-payment-inner-left-center-text">
                              Jinsi:
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-role-role izma__teachers-payment-inner-left-center-role-role-wrapper">
                              {collegue && collegue.colleague_by_id.gender}
                           </p>
                        </div>

                        <div className="izma__teachers-payment-inner-left-center-role izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-role-text izma__teachers-payment-inner-left-center-text">
                              Rollar:
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-role-role izma__teachers-payment-inner-left-center-role-role-wrapper">
                              {collegue && collegue.colleague_by_id.status}
                           </p>
                        </div>

                        <div className="izma__teachers-payment-inner-left-center-filial izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-filial-text izma__teachers-payment-inner-left-center-text">
                              Filiallar:
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-filial-filial izma__teachers-payment-inner-left-center-role-role-wrapper">
                              {collegue && collegue.colleague_by_id.branchName}
                           </p>
                        </div>

                     </div>

                  </div>

               </div>
            </div>
         </div>

         <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
         >
            <div className="form_teacher">
               <div className="teacher_top">
                  <h1 className="name">O'qituvchini taxrirlash</h1>
                  <button onClick={onClose}><img src={Close} alt="" /></button>
               </div>

               <div className="forms">
                  <form action="">
                     <div className="form_one">
                        <label htmlFor="">Telefon</label>
                        <PhoneNumberInput
                           // setPhone={}
                        />
                        
                     </div>

                     <div className="form_one">
                        <label htmlFor="name">Ism</label>
                        <input type="text" name="name" id="name" />
                     </div>
                     <div className="form_group">
                        <label htmlFor="date" className="form_label">To’g’ilgan sana</label>

                        <DatePicker
                           className='date__picker lid-edit-date'
                           // onChange={(value, dateString) => {
                           //   const v = {
                           //     target: {
                           //       name: "sana",
                           //       value: dateString,
                           //     },
                           //   };
                           //   handleChange(v);
                           // }}

                           placeholder={"Kun-Oy-Yil"}
                           //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                           format={"DD-MM-YYYY"}
                        />
                     </div>

                     <div className="form_one">
                        <label htmlFor="name">Jinsi</label>

                        <div className="genders">
                           <div className="gen_one">
                              <input value="" type="radio" name="gender" id="men" />
                              <label htmlFor="men"></label>
                              <span>Erkak</span>
                           </div>
                           <div className="gen_one">
                              <input value="" type="radio" name="gender" id="women" />
                              <label htmlFor="women"></label>
                              <span>Ayol</span>
                           </div>
                        </div>
                     </div>
                     <div className="form_one">
                        <label htmlFor="comment">Komment</label>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                     </div>

                     <div className="form_one">
                        <span className="file">Foto</span>
                        <label htmlFor="file" className="choose_file">Hech qanday fayl tanlanmadi</label>
                        <input type="file" name="" id="file" />
                     </div>
                     <div className="form_one">
                        <label htmlFor="">Parol</label>
                        <PasswordInput/>
                     </div>

                     <button onClick={() => setOpenEdit(false)} className="cre_btn">O'zgartirish</button>
                  </form>
               </div>
            </div>
         </Drawer>
         
      </div>
   )
}

export default TeacherProfileLeft