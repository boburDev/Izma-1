import './StudentAdd.scss'
import CloceBtn from '../../../assets/Icons/Group 26.svg'
import { useState, useEffect } from 'react'
import Plus from '../../../assets/Icons/plus.png'
import Minus from '../../../assets/Icons/minus.png'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'
import { ADD_NEW_STUDENTS, GROUPS, NEW_CASH } from '../../../Querys/Students_Query';
import { useMutation, useQuery } from '@apollo/client';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import DropSearch from '../../../components/DropSearch/DropSearch';
import PasswordInput from '../../../components/PasswordInput/PasswordInput'
import { useSnackbar } from 'notistack';



const StudentAdd = ({ onCloseF }) => {

   const [fieldInput, setInputField] = useState([
      {
         number: null
      }
   ])



   const [fieldParents, setParents] = useState([
      {
         number: null
      }
   ])


   const addNewField = () => {
      setInputField([...fieldInput, { number: null }])
   }

   const removeField = (index) => {
      const values = [...fieldInput]
      values.splice(index, 1)
      setInputField(values)
   }

   const addNewFieldTwo = () => {
      setParents([...fieldParents, { number: null }])
   }

   const removeFieldTwo = (index) => {
      const valuesTwo = [...fieldParents]
      valuesTwo.splice(index, 1)
      setParents(valuesTwo)
   }


   // const mockVal = (str, repeat = 1) => ({
   //     value: str.repeat(repeat),
   // });

   // const [value, setValue] = useState('');
   // const [options, setOptions] = useState([]);

   // const onSearch = (searchText) => {
   //     setOptions(
   //         !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
   //     );
   // };

   // const onSelect = (data) => {
   //     console.log('onSelect', data);
   // };

   // const onChange = (data) => {
   //     setValue(data);
   // };



   const [stPhoneNum, setStPhoneNum] = useState('')
   const [stName, setStName] = useState('')
   const [stBirth, setStBirth] = useState('')
   const [stGender, setStGender] = useState()
   const [stTextInfo, setStTextInfo] = useState('')
   const [stTg, setStTg] = useState('')
   const [stGroup, setStGroup] = useState(null)
   const [stPassword, setStPassword] = useState('')

   // const [names, setNames] = useState([])
   // console.log(names)


   const [AddNewSudents, { data: checkStudent }] = useMutation(ADD_NEW_STUDENTS)
   const [newCash] = useMutation(NEW_CASH)

   useEffect(() => {

      if (checkStudent && checkStudent.createStudent.id) {
         newCash({
            variables: {
               stID: checkStudent && checkStudent.createStudent.id,
               cashAmm: '0'
            }
         })
      }
   }, [checkStudent, newCash])



   const { data: dataGroups } = useQuery(GROUPS, { variables: { teacherID: [], courseID: [] } })

   // useEffect(() => {
   //    if (dataGroups && dataGroups.groups) {
   //       const guruh = dataGroups.groups.map(item => {
   //          return {
   //             key: item.id,
   //             value: item.name,
   //             text: item.name
   //          }
   //       })
   //       setNames(guruh)
   //    }
   // }, [dataGroups])

   const { enqueueSnackbar } = useSnackbar();

   const handleClick = () => {
      const message = 'O`quvchi yaratildi'
      enqueueSnackbar(message, {
         variant: 'success',
      });

   };


   return (
      <div className="form-wrapper">
         <div className="top-place">
            <h1 className="place-name">Yangi foydalanuvchi qo’shish</h1>
            <button className="x-btn" onClick={onCloseF} >
               <img src={CloceBtn} alt="img" />
            </button>
         </div>

         <form onSubmit={(e) => {
            e.preventDefault()

            if (stName && stGender) {

               const data = {
                  mainPhone: [stPhoneNum.length === 12 ? {number: stPhoneNum} : { number: null }],
                  name: stName,
                  birthday: stBirth,
                  password: stPassword,
                  gender: stGender - 0,
                  photo: 'null',
                  groupID: [{ groupID: stGroup }],
                  comment: stTextInfo,
                  newNumber: fieldInput,
                  parentNumber: fieldParents,
                  telegram: [{ telegram: stTg }],
                  address: [{ address: 'null' }]
               }

               AddNewSudents({ variables: data })
            }
         }}>
            <div className="form-input">
               <label htmlFor="">Telefon</label>
               <PhoneNumberInput setPhone={setStPhoneNum} />

            </div>

            <div className="form-input">
               <label htmlFor="name">Ism</label>
               <input type="text" name="" id="name" className="new-input" onChange={e => setStName(e.target.value)} required />
            </div>
            <div className="form_group" id='sty'>
               <label htmlFor="date" className="form_label">To’g’ilgan sana</label>

               <DatePicker
                  className='date__picker lid-edit-date'
                  onChange={(value, dateString) => {
                     setStBirth(dateString)
                  }}
                  placeholder={"Kun-Oy-Yil"}
                  format={"DD-MM-YYYY"}
               />
            </div>
            <div className="form-input">
               <label htmlFor="date">Jinsi</label>
               <div className="genders">
                  <div className="gen_one">
                     <input value={1} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="men" />
                     <label htmlFor="men"></label>
                     <span>Erkak</span>
                  </div>
                  <div className="gen_one">
                     <input value={2} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="women" />
                     <label htmlFor="women"></label>
                     <span>Ayol</span>
                  </div>
               </div>
            </div>
            <div className="form-input">
               <label htmlFor="group">Guruhni tanlang</label>
               <DropSearch
                  arr={dataGroups && dataGroups.groups}
                  pInput={'Variantlarni tanlang'}
                  fnc={setStGroup}
               />
            </div>
            <div className="form-input">
               <label htmlFor="group">Komment</label>
               <textarea className="comment" name="" id="" cols="30" rows="10" onChange={e => setStTextInfo(e.target.value)}></textarea>
            </div>

            <div className="many-input">
               {
                  fieldInput.map((item, index) => (
                     <div className="form-input" key={index}>
                        <div className="buttosn">
                           <label htmlFor="">Ikkilamchi Telefon</label>
                           <div className="bla-bla">
                              <button
                                 type="button"
                                 className={`remadd_btn alone ${fieldInput.length === 1 ? 'active' : ''}`}
                                 onClick={(e) => {
                                    e.preventDefault()
                                    removeField(index)
                                 }}
                              ><img src={Minus} alt="" /></button>
                              <button
                                 type='button'
                                 className="remadd_btn"
                                 onClick={(e) => {
                                    e.preventDefault()
                                    addNewField()
                                 }}
                              ><img src={Plus} alt="" /></button>
                           </div>
                        </div>
                        <PhoneNumberInput setParents={setInputField} parents={fieldInput} />
                     </div>
                  ))

               }
            </div>

            <div className="many-input">
               {
                  fieldParents.map((item, index) => (
                     <div className="form-inpun" key={index}>
                        <div className="buttosn">
                           <label htmlFor="">Ota-onalar telefoni</label>
                           <div className="bla-bla">
                              <button
                                 className={`remadd_btnTwo aloneTwo ${fieldParents.length === 1 ? 'active' : ' '}`}
                                 onClick={() => removeFieldTwo(index)}
                              ><img src={Minus} alt="" /></button>
                              <button
                                 className="remadd_btnTwo"
                                 onClick={() => addNewFieldTwo()}
                              ><img src={Plus} alt="" /></button>
                           </div>
                        </div>
                        <PhoneNumberInput setParents={setParents} parents={fieldParents} />

                     </div>
                  ))
               }
            </div>

            <div className="form-input alone">
               <label htmlFor="">Telegram user name</label>
               <div className="numberTwo">
                  <span>@</span>
                  <input type="text" name="" autoComplete="off" className="user_name" onChange={e => setStTg('@' + e.target.value)} />
               </div>
            </div>

            <div className="form-input">
               <label htmlFor="">Parol</label>
               <PasswordInput setPassword={setStPassword} />
            </div>

            <button className="create-btn" onClick={() => {
               (stName && stGender) && onCloseF()
               handleClick()

            }}>Yarating</button>
         </form>
      </div>
   )
}

export default StudentAdd
