import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { useParams } from 'react-router'
import { BY_COLLEGUE_ID, FILIAL, UPDATE_COLLEGUES, SUBCRIPTION_TEACHER } from './query'
import './TeacherProfileLeft.scss'
import { DatePicker } from 'antd';
import { useState } from 'react';
import Close from '../../../../assets/Icons/Group 26.svg'
import { Drawer, } from 'antd';
import PasswordInput from '../../../../components/PasswordInput/PasswordInput';
import { useLoader } from '../../../../context/Loader';
import { useEffect } from 'react';
import PhoneNumberInput from '../../../../components/PhoneNumberInput/PhoneNumberInput';
import moment from 'moment';
import { useName1 } from '../../../../context/NameProvider';


const TeacherProfileLeft = () => {
   const { collegueID } = useParams()
   const [setPeopleName] = useName1(true)
   // const [openEdit, setOpenEdit] = useState(false)
   const [setLoader] = useLoader(true)

   const [collegueInfo, setCollgueInfo] = useState()
   const { data: collegue, loading } = useQuery(BY_COLLEGUE_ID, { variables: { id: collegueID } })
   const {data: filial} = useQuery(FILIAL)

   const [UpdateColleguee] = useMutation(UPDATE_COLLEGUES)

   const [ name, setName ] = useState("")
   const [ birthDay, setBirthDay ] = useState("")
   const [ phone, setPhone ] = useState("")
   const [ gender, setGender ] = useState()
   const [ password, setPassword ] = useState("")
   const [ comment, setComment ] = useState("")

   useSubscription(SUBCRIPTION_TEACHER, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
        cache.modify({
          fields: {
              colleague_by_id: () => {}
          }
        })
      },
    })

   useEffect(() => {
      setLoader(loading)
   }, [loading, setLoader])


   useEffect(() => {
      setCollgueInfo(collegue && collegue.colleague_by_id)
   }, [collegue])
   


   const [visible, setVisible] = useState(false);
   const showDrawer = () => {
      setVisible(true);
   };

   const onClose = () => {
      setVisible(false);
   };

   const takeName = (e) => {
      setName(e.target.value)
  }

  const takeBirth = (date, dateString) => {
      setBirthDay(dateString)
  }

  const takePhone = (e) => {
      setPhone(e)
  }

  const takeGender = (e) => {
      setGender(e.target.value)
  }

  const takePass = (e) => {
      setPassword(e)
  }

  const takeComment = (e) => {
      setComment(e.target.value)

  }

  const handleTeacher = () => {
 
   const data = {
       Id: collegueID,
       name: name || (collegueInfo?.name),
       phoneNumber: phone || (collegueInfo?.phoneNumber),
       birthday: birthDay || (collegueInfo?.birthday),
       gender: gender || (collegueInfo?.gender === 'Ayol' ? '2' : '1' ),
       password: password,
       comment: comment || (collegueInfo?.comment),
       status: 5
       }

      UpdateColleguee({
         variables: data
      })
}

useEffect(() => {
   collegueInfo &&  setPeopleName(collegueInfo?.name)
})



   return (
      <div className={`overlay ${false ? 'active' : ''}`}>
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
                           {collegueInfo?.name}
                        </p>

                     </div>
                     <div className="izma__teachers-payment-inner-left-centerizma__teachers-payment-inner-left-center">
                        <div className="izma__teachers-payment-inner-left-center-number izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-number-text izma__teachers-payment-inner-left-center-text">
                              Telefon :
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-number-number izma__teachers-payment-inner-left-center-number-number-wrapper">
                              +{collegueInfo?.phoneNumber}
                           </p>
                        </div>

                        <div className="izma__teachers-payment-inner-left-center-balans izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-balans-text izma__teachers-payment-inner-left-center-text">
                              To’g’ilgan sana:
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-balans-balans izma__teachers-payment-inner-left-center-number-number-wrapper">
                              {collegueInfo?.birthday}
                           </p>
                        </div>

                        <div className="izma__teachers-payment-inner-left-center-role izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-role-text izma__teachers-payment-inner-left-center-text">
                              Jinsi:
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-role-role izma__teachers-payment-inner-left-center-role-role-wrapper">
                              {collegueInfo?.gender}
                           </p>
                        </div>

                        <div className="izma__teachers-payment-inner-left-center-role izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-role-text izma__teachers-payment-inner-left-center-text">
                              Rollar:
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-role-role izma__teachers-payment-inner-left-center-role-role-wrapper">
                              O’qituvchi
                           </p>
                        </div>

                        <div className="izma__teachers-payment-inner-left-center-filial izma__teachers-payment-inner-left-center-number-wrapper">
                           <p className="izma__teachers-payment-inner-left-center-filial-text izma__teachers-payment-inner-left-center-text">
                              Filiallar:
                           </p>
                           <p className="izma__teachers-payment-inner-left-center-filial-filial izma__teachers-payment-inner-left-center-role-role-wrapper">
                              {filial && filial.byBranchID.branchName}
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
                           placeholder={collegueInfo?.phoneNumber}
                           setPhone={takePhone}
                        />
                        
                     </div>

                     <div className="form_one">
                        <label htmlFor="name">Ism</label>
                        <input type="text" name="name" id="name" onChange={takeName} defaultValue={collegueInfo?.name} />
                     </div>
                     <div className="form_group">
                        <label htmlFor="date" className="form_label">To’g’ilgan sana</label>

                        <DatePicker
                           className='date__picker lid-edit-date'
                           defaultPickerValue={moment(collegueInfo?.birthday, 'DD-MM-YYYY')}
                           onChange={takeBirth}
                           placeholder={"Kun-Oy-Yil"}
                           format={"DD-MM-YYYY"}
                        />
                     </div>

                     <div className="form_one">
                        <label htmlFor="name">Jinsi</label>

                        <div className="genders">
                           <div className="gen_one">
                              <input value={'1'} type="radio" name="gender" id="men" onChange={takeGender}/>
                              <label htmlFor="men"></label>
                              <span>Erkak</span>
                           </div>
                           <div className="gen_one">
                              <input value={'2'} type="radio" name="gender" id="women" onChange={takeGender}/>
                              <label htmlFor="women"></label>
                              <span>Ayol</span>
                           </div>
                        </div>
                     </div>
                     <div className="form_one">
                        <label htmlFor="comment">Komment</label>
                        <textarea name="" id="" cols="30" rows="10" defaultValue={collegueInfo?.comment} onChange={takeComment}></textarea>
                     </div>

                     <div className="form_one">
                        <span className="file">Foto</span>
                        <label htmlFor="file" className="choose_file">Hech qanday fayl tanlanmadi</label>
                        <input type="file" name="" id="file" />
                     </div>
                     <div className="form_one">
                        <label htmlFor="">Parol</label>
                        <PasswordInput
                           setPassword={takePass}
                        />
                     </div>

                     <button onClick={(e) => {
                        e.preventDefault()
                        onClose()
                        handleTeacher()
                     }} className="cre_btn">O'zgartirish</button>
                  </form>
               </div>
            </div>
         </Drawer>
         
      </div>
   )
}

export default TeacherProfileLeft