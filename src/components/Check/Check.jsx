import './check.scss'
import ReactToPrint from 'react-to-print';
import Close from '../../assets/Icons/Group 26.svg'
import { useEffect, useRef } from 'react';
import Logo from '../../assets/Icons/Sertifikat.png'
import { useCheck } from '../../context/CheckProvider'
const Check = ({ handleCancelY ,  handleOkY  })=>{
    let componentRef = useRef(null)
    const [check, setCheck] = useCheck()

    const style = {
        fontFamily: 'Jost',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '16px',
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
        fontSize: '16px',
        lineHeight: '20px',
        color: '#000',
        display: 'block',
        paddingLeft: '10px',
    }

    useEffect(()=>{
        console.log(check && check.checkData && check.checkData)
    },[check])

    return (
        <div className="check-wrapper">
            <div className="check-holder">
                <h1>Kvitansiya</h1>
                 <button><img src={Close} onClick={() => {
                     setCheck({ check: false})
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
                        >Chek raqami: <span style={styleTwo}>error</span></p>
                        <p
                            style={style}
                        >Talaba: <span style={styleTwo}>{check &&  check?.checkData?.data?.studentName}</span></p>
                        <p
                            style={style}
                        >Turi: <span style={styleTwo}>Naqd pul</span></p>
                        <p
                            style={style}
                        >To’lov miqdori: <span style={styleTwo}>{check && check?.checkData?.data?.cashAmm}so'm</span></p>
                        <p
                            style={style}
                        >Vaqt: <span style={styleTwo}>08.08.2021 | 12:22:22</span></p>
                        <p
                            style={style}
                        >O'qituvchi: <span style={styleTwo}>{check  && check?.checkData?.data?.teacherName}</span></p>
                        <p
                            style={style}
                        >Guruhi: <span style={styleTwo}>{check && check.checkData && check.checkData.text}</span></p>
                    </div>
                </div>
            </div>
            <ReactToPrint
                trigger={() => {
                    return <button onClick={handleOkY} className="copy-btn">Chop etish</button>;
                }}
                copyStyles="true"
                content={() => componentRef}
            />
        </div>
    )
}

export default Check