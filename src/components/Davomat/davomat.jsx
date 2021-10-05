import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useDavomat } from '../../context/DavomatProvider'
import st from './davomat.module.scss'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GROUP_DAVOMAT, STUDENT_DAVOMAT } from './query'

// react-redux uninstall qivor
function Davomat() {
    const id = useParams()
    const [arr, setArr] = useState([])
    const [groupStudents] = useDavomat()
    const [state, setState] = useState([])
    const [start, setStart] = useState('')
    const [startDay, setStartDay] = useState('')
    const [days, setDays] = useState('')
    const [active, setActive] = useState(start-0)
    const [yearStart, setYearStart] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    const [groupMonth,setGroupMonth] = useState([])
    const [groupStuMonth,setGroupStuMonth] = useState([])
    const [monthlyGr, setMonthlyGr] = useState([])

    const { data: groupAtt } = useQuery(GROUP_DAVOMAT, { variables: { groupID: id && id.groupID}})

    const { data: studentGrAtt } = useQuery(STUDENT_DAVOMAT, { variables: { groupID: id && id.groupID}})

    useEffect(()=>{
        if (groupAtt && groupAtt.groupAttendences) {
            const mapped = groupAtt.groupAttendences.map(i => {
                return new Date(i.day-0)
            })
            setGroupMonth(mapped)
        }
    },[groupAtt])

    useEffect(()=>{
        if ((studentGrAtt && studentGrAtt.studentAttendence) &&
        (groupStudents && groupStudents.students)) {
            const mapped = groupStudents.students && groupStudents.students.map(i => {
                const mappedAtt = studentGrAtt.studentAttendence.map(j => {
                    if (i.id === j.studentID) {
                        return j
                    }
                    return ''
                })
                const data = []
                for (const i of mappedAtt) {
                    if (i !== '') {
                        data.push({ status: i.status, stId: i.studentID, day: i.day })
                    }
                }
                return {id: i.id, month: data}
            })
            setGroupStuMonth(mapped)

            // console.log(mapped)



        }
    },[studentGrAtt, groupStudents])

    useEffect(() => {
        if (groupStudents.groups) {
            setStart(groupStudents.groups.startDate.split('-')[1])
            setStartDay(groupStudents.groups.startDate.split('-')[2])
            setDays(groupStudents.groups.days)
            setYearStart(groupStudents.groups.startDate.split('-')[0])
            setStartDate(groupStudents.groups.startDate)
            setEndDate(groupStudents.groups.endDate)
        }
    }, [groupStudents])




    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

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

    const getDaysInMonth = (months, year, start) => {
        let startDay = start
        const daysInMonth = groupMonth.map(i => {
            if (year >= moment(i).format('YYYY') && (months-0) === (moment(i).format('MM')-0)) {
                if (startDay <= moment(i).format('DD') ) {
                    startDay = '01'
                    return i
                }
            }
            return ''
        })
        const data = []
        for (const i of daysInMonth) {
            if (i !== '') {
                data.push(i)
            }
        }
        return data
    }

    function davomatCalendar(start, yearStart, startDay = 1) {
        const DATE = getDaysInMonth(start, yearStart, startDay)
        const data = {
            date: [],
            fullDate: []
        }
        
        days.split(',').map(i => {
            DATE.map(item => {
                if (endDate >= moment(item).format('YYYY-MM-DD')) {
                    if ((i - 1) === new Date(item).getDay()) {
                        data.date.push(moment(item).format('DD/MM'))
                    }
                }
                return ""
            })
            return ""
        })
        return data
    }
    // console.log(groupMonth)
















    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    const monthly = (month,year, day = 1) => {
        setArr(arr)
        setMonthlyGr(davomatCalendar(month, year, day).date.sort())

        let roun = document.querySelectorAll(`${st.round}`)
        roun.forEach(item => {
            item.classList.remove(`${st.false}`)
            item.classList.remove(`${st.true}`)
        })
    }
    
    const setMonth = (month, year, day) => {
        monthly(month, year, day)
    }


    
    
    useEffect(() => {
        const data = davomatCalendar(start, yearStart, startDay)
        // setArr(arr)
        setActive(start-1)
        setMonthlyGr(data.date.sort())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, startDay, yearStart])

    



    
















    
    const checkInput = (e) => {
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
        // console.log(body)
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
        <tr className={st.tr}>
        <th className={`${st.name_table} ${st.th}`}>Ism</th>
        {
            monthlyGr.map((item, index) => (
                <th className={st.th} key={index}>
                {item}
                &ensp;&ensp;
                </th>
                ))
            }
            </tr>
            </thead>
            <tbody className={st.tbody}>
            {
                // groupStuMonth
                groupStudents.students && groupStudents.students.map((item, index) => {

                    return <tr className={st.tr_tbody} key={index}>
                    <td className={`${st.pupil} ${st.td_tbody} ${
                        item.groupStatus === 4 ? `${st.red}`: item.groupStatus === 5 ? `${st.orange}` : item.groupStatus === 3 ? `${st.blue}` :  ''}`} key={index}>{item.name}</td>
                    {
                        groupStuMonth.map(i => {
                            console.log(i)
                            console.log(item)
                        })
                        // monthlyGr.map((i,key) => {
                        //     // groupStuMonth.month.day
                        //     // console.log(i)
                        //     // groupStuMonth.month.day
                        //     // console.log(moment(i).format('DD/MM'))
                        //     // console.log(groupMonth)
    
    
                        //     return <td className={st.td} key={key}>
                        //     <div
                        //         className={st.round}
                        //         onClick={checkInput}
                        //         data-date={i}
                        //         data-id={item.id}>
                        //     </div>
                        //     <div className={st.checker}>
                        //     <h4
                        //     onClick={come} className={st.checker_true}>
                            
                        //     </h4>
                        //     <h4 onClick={dontCome} className={st.checker_false}>
                            
                        //     </h4>
                        //     <button className={st.checker_close} onClick={closer}>&times; </button>
                        //     </div>
                        //     </td>
                        // })
                        }
                        </tr>
                })
                    
            }
            </tbody>
            </table>
            
            
            </div>
            </div>
                    )
                }
                
    export default Davomat