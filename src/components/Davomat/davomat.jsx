import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import moment from 'moment'
import st from './davomat.module.scss'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GROUP_DAVOMAT, STUDENT_DAVOMAT } from './query'
import {useLang} from '../../context/LanguageProvider'
import Language from '../../lang/index'
import { BY_GROUP_ID } from '../../Querys/GroupTabs'
import { useDavomat } from '../../context/DavomatProvider'
function Davomat() {
    const id = useParams()
    const [lang] = useLang()
    const [groupStudents] = useDavomat()
    const [state, setState] = useState([])
    const [start, setStart] = useState('')
    const [startDay, setStartDay] = useState('')
    const [days, setDays] = useState('')
    const [active, setActive] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [monthlyGr, setMonthlyGr] = useState([])
    const [activeYear,setActiveYear] = useState(0)
    const [groupData,setGroupData] = useState({})
    const [attandenceDate, setAttandenceDate] = useState([])
    const [studentAtt,setStudentAtt] = useState([])
    
    useEffect(()=>{
        setActive(start-0)
    },[start, startDay])


    const { data: groupById } = useQuery(BY_GROUP_ID, {
        variables: { groupID: id && id.groupID }
    })
    
    useLayoutEffect(()=>{
        if (groupById && groupById.byGroupID) {
            setGroupData(groupById && groupById.byGroupID)
        }
    },[groupById])

    useEffect(() => {
        if (groupData.id) {
            setStart(groupData.startDate.split('-')[1])
            setActiveYear(groupData.startDate.split('-')[0]-0)
            setStartDay(groupData.startDate.split('-')[2])
            setDays(groupData.days)
            setStartDate(groupData.startDate)
            setEndDate(groupData.endDate)
        }
    }, [groupData])

    const [fff, { data: groupAtt }] = useLazyQuery(GROUP_DAVOMAT)

    useEffect(() => {
        if (active !== 0) {
            fff({
                variables: {
                    groupID: id && id.groupID,
                    month: active,
                    year: activeYear
                }
            })
        }
    }, [active, activeYear, fff, groupData, id])
    
    
    useEffect(()=>{
        if (groupAtt && groupAtt.groupAttendences) {
            setAttandenceDate(groupAtt.groupAttendences)
        }
    },[groupAtt])

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

    const davomatCalendar = useCallback((value) => {
        
        const data = []
            days.split(',').map(i => {
                value.map(item => {
                    if (endDate >= moment(item.day-0).format('YYYY-MM-DD')) {
                        if ((i - 0) === new Date(item.day-0).getDay()) {
                            const result = {
                                comment: item.comment,
                                id: item.id,
                                status: item.status,
                                day: item.day
                            }
                            data.push(result)
                        }
                    }
                    return ""
                })
                return ""
            })
        return data

    }, [days, endDate])


    useEffect(() => {
        const data = davomatCalendar(attandenceDate)
        setMonthlyGr(data.sort((a, b) => a.day - b.day))
    }, [attandenceDate, davomatCalendar])





    const { data: studentGrAtt } = useQuery(STUDENT_DAVOMAT, { variables: { 
        groupId: id && id.groupID,
        month: active,
        year: activeYear
    }})
    
    useEffect(()=>{
        if (studentGrAtt && studentGrAtt.studentAttendences) {
            setStudentAtt(studentGrAtt && studentGrAtt.studentAttendences)
        }
    },[studentGrAtt])





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
        console.log(body)
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
        console.log(body)
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
        <h4>{Language[lang].groups.groupInfo.attendance}</h4>
        <div className={st.top}>
        {
            state.map((i,key) =>
            <button
            onClick={() => {
                setMonthlyGr(davomatCalendar(attandenceDate).sort((a, b) => a.day - b.day))
                setActive(i.month+1)
                setActiveYear(i.year)
            }}
            key={key}
            className={`${st.top__btn} ${active === i.month+1 ? `${st.top__btn_active}` : ''}`}>{monthNames[i.month]}</button>)
        }
        </div>
        </div>

        <table className={st.customer}>
        <thead className={st.customer_thead}>
        <tr className={st.tr} id="tr_all">
        <th className={`${st.name_table} ${st.th}`}>F.I.O</th>
        {
            monthlyGr.length>0 && monthlyGr.map((item, index) => (
            <th
            id={item.id}
            data-satus={item.status}
            className={st.th} key={index} style={{
                cursor: `${(
                    moment(item.day-0).format('DD-MM-YYYY') <= moment(new Date()).format('DD-MM-YYYY')
                ) ? 'pointer' : ''}`
            }}>
                {moment(item.day-0).format('DD/MM') }&ensp;&ensp;
            </th>
            ))
        }
        </tr>
        </thead>
        <tbody className={st.tbody}>
            {
                groupStudents.length > 0 && groupStudents.map((item, index) => {
                    return <tr className={st.tr_tbody} key={index}>
                    <td className={`${st.pupil} ${st.td_tbody} ${
                        item.groupStatus === 4 ? `${st.red}`: item.groupStatus === 5 ? `${st.orange}` : item.groupStatus === 3 ? `${st.blue}` :  ''}`} key={index}>{item.name}</td>
                    {
                        studentAtt.length > 0 && studentAtt.map((val,key) => {
                            if (val.stId === item.id && val.data.length > 0) {
                                const result = monthlyGr.map((i, heys) => {
                                    let checker = false
                                    val.data.map(j => {
                                        if (moment(i.day-0).format('DD-MM-YYYY') === moment(j.attendenceDay-0).format('DD-MM-YYYY')) {
                                            checker = true
                                        }
                                        return ''
                                    })
                                    if (checker) {
                                        // console.log(checker)
                                        checker = false
                                        return <td className={st.td} key={heys}>
                                            <div
                                                className={st.round}
                                                onClick={checkInput}
                                                data-date={i.day}
                                                data-id={i.id}>
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
                                    }
                                    return <td></td>
                                })
                                return result
                            }
                            return ''
                    })
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