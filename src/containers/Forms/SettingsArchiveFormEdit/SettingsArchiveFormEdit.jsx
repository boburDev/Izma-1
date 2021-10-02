import '../SettingsArchiveForm/query'
import CloceBtn from '../../../assets/Icons/Group 26.svg'
import { Radio } from 'antd'
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput'
import { DatePicker } from 'antd'
import { useState, useEffect } from 'react'
import { UPDATE_COLLEGUES } from '../SettingsArchiveForm/query'
import { useMutation } from '@apollo/client'
import PasswordInput from '../../../components/PasswordInput/PasswordInput'

const SettingsArchiveForm = ({onClose, editableData}) => {

    const [value, setValue] = useState()
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')


    const [stat, setStat] = useState()


    const onChange = e => {
      setValue(e.target.value)
    }

    const [uptdateColleague] = useMutation(UPDATE_COLLEGUES)

    useEffect(() => {

        // editableData?.status === 1 && setStat('CEO')  
        // editableData?.status === 2 && setStat('Marketer') 
        // editableData?.status === 3 && setStat('Adminstrator')  
        // editableData?.status === 4 && setStat('Casher') 
        // editableData?.status === 5 && setStat('Teacher') 
        editableData?.status === 'CEO' && setStat(1)  
        editableData?.status === 'Marketer' && setStat(2) 
        editableData?.status === 'Adminstrator' && setStat(3)  
        editableData?.status === 'Casher' && setStat(4) 
        editableData?.status === 'Teacher' && setStat(5) 

    }, [setStat, editableData])


    function createColleague() {
        const data = {
            Id: editableData?.Id,
            name: name || editableData?.name,
            phoneNumber: phone || editableData?.phoneNumber,
            gender: gender-0 || editableData?.gender === 'Ayol' ? '2' : '1',
            password: password,
            status: value || stat,
            birthday: date || editableData?.date
        }

        uptdateColleague({
            variables: data
        })
    }

    
    return (
        <>
         <div className="izma__settings-archive-form-wrapper">
                <div className="top-place">
                    <h1 className="place-name">Tahrirlash</h1>
                    <button className="x-btn" onClick={onClose} >
                        <img src={CloceBtn} alt="img" />
                    </button>
                </div>
    
                <form action="" onSubmit={(e)=> e.preventDefault()}>
                    <div className="form-input">
                        <label htmlFor="">Telefon</label>
                        <PhoneNumberInput
                            setPhone={setPhone}
                            placeholder={editableData?.phoneNumber}
                        />
                    </div>
    
                    <div className="form-input">
                        <label htmlFor="name">Ism</label>
                        <input onKeyUp={e => setName(e.target.value)} type="text" id="name" placeholder={editableData?.name} className="input-izma"/>
                    </div>
                    <div className="form_group">
                            <label htmlFor="date" className="form_label">To’g’ilgan sana</label>
       
                    <DatePicker
                        className='date__picker lid-edit-date'
                        onChange={(value, dateString) => setDate(dateString)}
                        placeholder={"Kun-Oy-Yil"}
                        format={"DD-MM-YYYY"}
                    />
                    </div>
                    <div className="form_one">
                        <label htmlFor="name">Jinsi</label>

                        <div className="genders">
                            <div className="gen_one">
                                <input value={1} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="men" />
                                <label htmlFor="men"></label>
                                <span>Erkak</span>
                            </div>
                            <div className="gen_one">
                                <input value={2} onChange={e => setGender(e.target.value)}  type="radio" name="gender" id="women" />
                                <label htmlFor="women"></label>
                                <span>Ayol</span>
                            </div>
                        </div>
                    </div>
                   
                    <div className="form_one">
                        <span className="file">Foto</span>
                        <label htmlFor="file" className="choose_file">Hech qanday fayl tanlanmadi</label>
                        <input type="file" name="" id="file" />
                    </div>
                    <div className="form_one">
                        <label htmlFor="">Parol</label>
                        <PasswordInput
                            setPassword={setPassword}
                        />
                    </div>
    
                   <div>
                    <Radio.Group
                    className="izma__settings-checkbox-wrapper" onChange={onChange}>
                    
                   <Radio value={1}>CEO</Radio>
                   <Radio value={3}>Adminstrator</Radio>
                   <Radio value={5}>Teacher</Radio>
                   <Radio value={2}>Marketer</Radio>
                   <Radio value={4}>Cashier</Radio>
                   </Radio.Group>
                   </div>
    
                    <button className="create-btn" onClick={() => {
                        onClose()
                        createColleague()
                    }}>Yarating</button>
                </form>
            </div>
        </>
    )
}

export default SettingsArchiveForm