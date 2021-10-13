import React, { useState, useEffect, useLayoutEffect } from 'react'
import moment from 'moment'
import st from './davomat.module.scss'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GROUP_DAVOMAT, STUDENT_DAVOMAT } from './query'
import {useLang} from '../../context/LanguageProvider'
import Language from '../../lang/index'
import { BY_GROUP_ID } from '../../Querys/GroupTabs'

// react-redux uninstall qivoring
function Davomat() {
    const id = useParams()
    const [arr, setArr] = useState([])
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
    const [monthlyStGr, setMonthlyStGr] = useState([])
    const [lang] = useLang()







    const [groupData,setGroupData] = useState({})


    const { data: groupById } = useQuery(BY_GROUP_ID, {
        variables: { groupID: id && id.groupID }
    })
    
    useLayoutEffect(()=>{
        if (groupById && groupById.byGroupID) {
            setGroupData(groupById && groupById.byGroupID)
        }
    },[groupById])




    const [fff, { data: groupAtt }] = useLazyQuery(GROUP_DAVOMAT)
    

    // const { data: studentGrAtt } = useQuery(STUDENT_DAVOMAT, { variables: { groupID: id && id.groupID}})

    useEffect(() => {
        console.log(groupData)
    }, [groupData])


    // useEffect(()=>{
    //     if (groupAtt && groupAtt.groupAttendences) {
    //         const mapped = groupAtt.groupAttendences.map(i => {
    //             return new Date(i.day-0)
    //         })
    //         setGroupMonth(mapped)
    //     }
    // },[groupAtt])

    // useEffect(()=>{
    //     if ((studentGrAtt && studentGrAtt.studentAttendence) &&
    //     (groupStudents && groupStudents.students)) {
    //         const mapped = groupStudents.students && groupStudents.students.map(i => {
    //             const mappedAtt = studentGrAtt.studentAttendence.map(j => {
    //                 if (i.id === j.studentID) {
    //                     return j
    //                 }
    //                 return ''
    //             })
    //             const data = []
    //             for (const i of mappedAtt) {
    //                 if (i !== '') {
    //                     data.push({ status: i.status, stId: i.studentID, day: i.day })
    //                 }
    //             }
    //             return {id: i.id, month: data}
    //         })
            
    //         const resultMapped = mapped.map(i => {
    //             const data = i.month.map(j => ({
    //                 s: j.status,
    //                 d: j.day
    //                 // moment(new Date(j.day-0)).format('DD/MM-YYYY')
    //             }))
    //             return { id: i.id, data }
    //         })
    //         // console.log(resultMapped)
    //         setGroupStuMonth(resultMapped)
    //     }
    // },[studentGrAtt, groupStudents])

    useEffect(() => {
        if (groupById && groupById.byGroupID) {
            setStart(groupById.byGroupID.startDate.split('-')[1])
            setStartDay(groupById.byGroupID.startDate.split('-')[2])
            setDays(groupById.byGroupID.days)
            setYearStart(groupById.byGroupID.startDate.split('-')[0])
            setStartDate(groupById.byGroupID.startDate)
            setEndDate(groupById.byGroupID.endDate)
        }
    }, [groupById])




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
            date: []
        }
        
        days.split(',').map(i => {
            DATE.map(item => {
                if (endDate >= moment(item).format('YYYY-MM-DD')) {
                    if ((i - 1) === new Date(item).getDay()) {
                        data.date.push(item)
                        // data.date.push(moment(item).format('DD/MM-YYYY'))
                    }
                }
                return ""
            })
            return ""
        })
        return data
    }



    // useEffect(()=>{
    //     fff({ variables: { 
    //         groupID: id && id.groupID,
    //         month: active
    //     }})
    //     // console.log(active)
    // },[active, fff, id])














    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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


    
    
    // useEffect(() => {
    //     const data = davomatCalendar(start, yearStart, startDay)
    //     // setArr(arr)
    //     setActive(start-1)
    //     setMonthlyGr(data.date.sort())
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [start, startDay, yearStart])
    
    // useEffect(() => {
    //     const data = davomatCalendar(start, yearStart, startDay)
    //     // setArr(arr)
    //     setActive(start-1)
    //     setMonthlyStGr(data.date.sort())
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [start, startDay, yearStart])

    



    
















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
                setMonth(i.month + 1, i.year, ((i.month + 1) === (start-0)) ? startDay : 1)
                setActive(i.month)
            }}
            key={key}
            className={`${st.top__btn} ${active === i.month ? `${st.top__btn_active}` : ''}`}>{monthNames[i.month]}</button>)
        }
        </div>
        </div>
        
            
        </div>
        </div>
        )
    }
                
    export default Davomat