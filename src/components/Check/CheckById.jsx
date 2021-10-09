import './check.scss'
import ReactToPrint from 'react-to-print'
import Close from '../../assets/Icons/Group 26.svg'
import { useEffect, useState, useRef } from 'react'
import Logo from '../../assets/Icons/Sertifikat.png'
import { useLang } from '../../context/LanguageProvider'
import Language from '../../lang/index'
import moment from 'moment'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'


const Check = ({ id, setId  })=>{
    let componentRef = useRef(null)
    const [today,setToday] = useState('')
    const [month,setMonth] = useState('')
    const [state,setState] = useState({})
    const [lang] = useLang()

    const Check_BY_ID = gql`
    query checkOne($id: ID){
        checkOne(id: $id) {
          id
          serialNumber
          studentName
          typePayment
          amount
          time
          teacherName
          groupName
          timeAt
        }
      }
    `

    const { data: check } = useQuery(Check_BY_ID, {
        variables: {
            id: id
        }
    })

    useEffect(()=>{
        if(check && check.checkOne){
            setState(check && check.checkOne)
            console.log(check && check.checkOne)
        }
    },[check])

    const style = {
        fontFamily: 'Jost',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '23px',
        display: 'flex',
        marginBottom: '10px',
        alignItems: 'center',
        color: '#000000'
    }

    const styleTwo = {
        fontFamily: 'Calibri',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '20px',
        color: '#000',
        display: 'block',
        paddingLeft: '10px',
    }

    useEffect(()=>{
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


        const today = new Date(state.time-0)
        setMonth(months[today.getMonth()])
    },[state])

    useEffect(()=>{
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()
        today = dd + '-' + mm + '-' + yyyy
        setToday(moment(state.timeAt).format('DD-MM-YYYY / HH:MM:SS'))
    },[state])

    return (
        <div className="check-wrapper">
            <div className="check-holder">
                <h1>Kvitansiya</h1>
                 <button><img src={Close} onClick={() => {
                     setId('')
                 }} alt="" /></button>
            </div>
            <div className="check-inner" ref={el => (componentRef = el)}
                style={
                    {
                        padding: '10px 38px 38px 38px',
                        border: '1px solid #CFCFCF',
                        boxSizing: 'border-box',
                        boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.25)',
                        borderRadius: '6px',
                        maxWidth: '310px'
                    }
                }
            >
                <div className="print">
                    <img className="check-logo" src={Logo} alt="Logo" 
                    style={
                        {
                            width: '100px',
                            height: '100px',
                            objectFit:'contain',
                            display:'flex',
                            justifyContent:'center',
                            margin:'0 auto 10px auto'
                        }
                        
                        }/>
                    <div className="check-items">
                        <p
                            style={style}
                        >{Language[lang].groups.paymentInfo.receiptNumber} <span style={styleTwo}># {state.serialNumber}</span></p>
                        <p
                            style={style}
                        >{Language[lang].groups.paymentInfo.student} <span style={styleTwo}>{state.studentName}</span></p>
                        <p style={style}
                        >{Language[lang].groups.paymentInfo.paymentType}: <span style={styleTwo}>{state.typePayment}</span></p>
                        <p style={style}
                        >{Language[lang].groups.paymentInfo.amountPayment} <span style={styleTwo}>111 so'm</span></p>
                        <p style={style}>Vaqt: <span style={styleTwo}>
                            { today }
                            </span></p>
                        <p style={style}>{Language[lang].students.recordPayment.AcceptedDate} <span style={styleTwo}>
                            { month }
                            </span></p>
                        <p style={style}>{Language[lang].settings.editable.teacher} <span style={styleTwo}> {state.teacherName}</span></p>
                        <p
                            style={style}
                        >{Language[lang].groups.paymentInfo.group} <span style={styleTwo}>{state.groupName}</span></p>
                    </div>
                </div>
            </div>
            <ReactToPrint
                trigger={() => {
                    return <button className="copy-btn">Chop etish</button>
                }}
                copyStyles="true"
                content={() => componentRef}
            />
        </div>
    )
}

export default Check