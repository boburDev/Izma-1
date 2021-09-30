import React, { useState, useEffect } from 'react'
import moment from 'moment'
// import data from './data.json'
import st from './davomat.module.scss'
import { useDavomat } from '../../context/DavomatProvider'
function Davomat() {
    const [arr, setArr] = useState([])
    const [davomat] = useDavomat()
    const [state, setState] = useState([])
    const [start, setStart] = useState('')
    const [startDay, setStartDay] = useState('')
    const [days, setDays] = useState('')
    const [active, setActive] = useState(start-0)
    const [yearStart, setYearStart] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    // const [end, setEnd] = useState('')
    // const [yearEnd, setYearEnd] = useState('')
    
    
    
    useEffect(() => {
        if (davomat.groups) {
            setStart(davomat.groups.startDate.split('-')[1])
            setStartDay(davomat.groups.startDate.split('-')[2])
            setDays(davomat.groups.days)
            setYearStart(davomat.groups.startDate.split('-')[0])
            setStartDate(davomat.groups.startDate)
            setEndDate(davomat.groups.endDate)
        }
    }, [davomat])
    
    
    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ]
    
    const getMonths = (fromDate, toDate) => {
        const fromYear = fromDate.getFullYear();
        const fromMonth = fromDate.getMonth();
        const toYear = toDate.getFullYear();
        const toMonth = toDate.getMonth();
        const months = [];
        for(let year = fromYear; year <= toYear; year++) {
            let month = year === fromYear ? fromMonth : 0;
            const monthLimit = year === toYear ? toMonth : 11;
            for(; month <= monthLimit; month++) {
                months.push({ year, month })
            }
        }
        return months;
    }
    
    useEffect(()=>{
        setState(getMonths(new Date(startDate), new Date(endDate)))
    },[endDate, startDate])
    
    const [date, setDate] = useState([])
    
    const getDaysInMonth = (months, year) => {
        return (new Array(31)).fill('').map((v, i) => new Date(year, months - 1, i + 1)).filter(v => v.getMonth() === months - 1)
    }
    
    const monthly = (month,year, day = 1) => {
        setArr(arr)
        setDate(davomatCalendar(month, year, day).date.sort())
        let roun = document.querySelectorAll(`${st.round}`)
        roun.forEach(item => {
            item.classList.remove(`${st.false}`)
            item.classList.remove(`${st.true}`)
        })
    }
    
    
    const setMonth = (month, year, day) => {
        monthly(month, year, day)
    }
    
    const checkInput = (e) => {
        console.log(e.target.getAttribute('data-date'))
        console.log(e.target.getAttribute('data-id'))
        e.target.parentNode.childNodes[1].classList.toggle(`${st.show}`)
    }
    
    const come = e => {
        e.target.parentNode.parentNode.childNodes[0].classList.remove(`${st.false}`)
        e.target.parentNode.parentNode.childNodes[0].classList.add(`${st.true}`)
        e.target.parentNode.classList.remove(`${st.show}`)
        let body = {
            name: e.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML,
            date: e.target.parentNode.parentNode.childNodes[0].dataset.date,
            title: 'keldi'
        }
        console.log(body)
        arr.push(body)
        setArr(arr)
    }
    
    const dontCome = e => {
        e.target.parentNode.parentNode.childNodes[0].classList.remove(`${st.true}`)
        e.target.parentNode.parentNode.childNodes[0].classList.add(`${st.false}`)
        e.target.parentNode.classList.remove(`${st.show}`)
        let body = {
            name: e.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML,
            date: e.target.parentNode.parentNode.childNodes[0].dataset.date,
            title: 'kelmadi'
        }
        
        arr.push(body)
        setArr(arr)
    }
    
    const closer = (e) => {
        e.target.parentNode.classList.remove(`${st.show}`)
        e.target.parentNode.parentNode.childNodes[0].classList.remove(`${st.false}`)
        e.target.parentNode.parentNode.childNodes[0].classList.remove(`${st.true}`)
    }
    
    
    
    
    
    useEffect(() => {
        
        const data = davomatCalendar(start, yearStart, startDay)
        // setArr(arr)
        setActive(start-1)
        setDate(data.date.sort())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, startDay, yearStart])

    



    function davomatCalendar(start, yearStart, startDay = 1) {
        const DATE = getDaysInMonth(start, yearStart)
        const data = {
            date: [],
            fullDate: []
        }
        days.split(',').map(i => {
            DATE.map(item => {
                if (typeof startDay === 'string') {
                    if ((moment(item).format('DD') - 0) === (startDay - 0)) {
                        if((i - 1) === new Date(item).getDay()){
                            data.date.push(moment(item).format('DD/MM'))
                            console.log(moment(item).format('YYYY-MM-DD'))
                        }
                    }
                } else {
                    if ((i - 0) === new Date(item).getDay()) {
                        data.date.push(moment(item).format('DD/MM'))
                    }
                }                
                return ""
            })
            return ""
        })
        return data
    }


    return (
        <div className={st.home}>
        
        <div className={st.home_wrapper}>
        <div className={st.davomat}>
        <h4>Davomat</h4>
        <div className={st.top}>
        {
            state.map((i,key) =>
            <button
            onClick={() => {
                setMonth(i.month + 1, i.year, ((i.month + 1) === (start-0)) ? startDay : 1)
                setActive(i.month)
            }}
            key={key}
            className={`${st.top__btn} ${active === i.month ? `${st.top__btn_active}` : ''}`}>{monthNames[i.month]}</button>)
        }
        </div>
        </div>
        
        <table className={st.customer}>
        <thead className={st.customer_thead}>
        <tr>
        <th className={st.name_table}>Ism</th>
        {
            console.log(date)
        }
        {
            date.date && date.date.map((item, index) => (
                <th key={index}>
                {item}
                &ensp;&ensp;
                </th>
                ))
            }
            </tr>
            </thead>
            <tbody>
            {
                davomat.students && davomat.students.map((item, index) => (
                    <tr key={index}>
                    <td className={`${st.pupil} ${
                        item.groupStatus === 4 ? `${st.red}`: item.groupStatus === 5 ? `${st.orange}` : item.groupStatus === 3 ? `${st.blue}` :  ''
                        }`} key={index}>{item.name}</td>
                    
                    {
                        date.map((i,key) => (
                            <td className={st.td} key={key}>
                                {/* {
                                    console.log(item)
                                } */}
                            <div
                                className={st.round}
                                onClick={checkInput}
                                data-date={i}
                                data-id={item.id}>
                            </div>
                            <div className={st.checker}>
                            <h4
                            onClick={come} className={st.checker_true}>
                            
                            </h4>
                            <h4 onClick={dontCome} className={st.checker_false}>
                            
                            </h4>
                            <button className={st.checker_close} onClick={closer}>&times; </button>
                            </div>
                            </td>
                            ))
                        }
                        </tr>
                        ))
                    }
                    </tbody>
                    </table>
                    
                    
                    </div>
                    </div>
                    )
                }
                
    export default Davomat