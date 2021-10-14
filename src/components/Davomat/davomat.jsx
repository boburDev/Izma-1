import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import moment from 'moment'
import st from './davomat.module.scss'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GROUP_DAVOMAT } from './query'
import {useLang} from '../../context/LanguageProvider'
import Language from '../../lang/index'
import { BY_GROUP_ID } from '../../Querys/GroupTabs'

// react-redux uninstall qivoring
function Davomat() {
    const id = useParams()
    const [lang] = useLang()
    
    const [arr, setArr] = useState([])
    const [state, setState] = useState([])
    const [start, setStart] = useState('')
    const [startDay, setStartDay] = useState('')
    const [days, setDays] = useState('')
    const [active, setActive] = useState(0)
    const [yearStart, setYearStart] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    // const [groupMonth,setGroupMonth] = useState([])
    // const [groupStuMonth,setGroupStuMonth] = useState([])
    const [, setMonthlyGr] = useState([])


    const [groupData,setGroupData] = useState({})
    const [attandenceDate, setAttandenceDate] = useState([])
    
    useEffect(()=>{
        setActive(start-0)
    },[start])


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
            setStartDay(groupData.startDate.split('-')[2])
            setDays(groupData.days)
            setYearStart(groupData.startDate.split('-')[0])
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
                    month: active
                }
            })
        }
    }, [active, fff, groupData, id])
    
    
    useEffect(()=>{
        if (groupAtt && groupAtt.groupAttendences) {
            // console.log(groupAtt.groupAttendences)
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

    // const getDaysInMonth = (months, year, start) => {
    //     let startDay = start
    //     const daysInMonth = groupMonth.map(i => {
    //         if (year >= moment(i).format('YYYY') && (months-0) === (moment(i).format('MM')-0)) {
    //             if (startDay <= moment(i).format('DD') ) {
    //                 startDay = '01'
    //                 return i
    //             }
    //         }
    //         return ''
    //     })
    //     const data = []
    //     for (const i of daysInMonth) {
    //         if (i !== '') {
    //             data.push(i)
    //         }
    //     }
    //     return data
    // }

    const davomatCalendar = useCallback((value) => {
        const data = []
        // console.log(data)
            days.split(',').map(i => {
                value.map(item => {
                    if (endDate >= moment(item.day-0).format('YYYY-MM-DD')) {
                        if ((i - 1) === new Date(item.day).getDay()) {
                            data.push(item)
                            // data.date.push(moment(item).format('DD/MM-YYYY'))
                        }
                    }
                    return ""
                })
                return ""
            })
        return data

    }, [days, endDate])



    // useEffect(()=>{
    //     fff({ variables: { 
    //         groupID: id && id.groupID,
    //         month: active
    //     }})
    //     // console.log(active)
    // },[active, fff, id])







    // const { data: studentGrAtt } = useQuery(STUDENT_DAVOMAT, { variables: { groupID: id && id.groupID}})


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








    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    const monthly = () => {
        setArr(arr)
        setMonthlyGr(davomatCalendar(attandenceDate).sort())

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
        if (false) {
        }
        // const data = davomatCalendar(attandenceDate)
        // console.log(attandenceDate)
        // console.log(data)
        // setArr(arr)
        // setActive(start-1)
        // setMonthlyGr(data.date.sort())
    }, [attandenceDate, davomatCalendar, start, startDay, yearStart])
    
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
                setActive(i.month+1)
            }}
            key={key}
            className={`${st.top__btn} ${active === i.month+1 ? `${st.top__btn_active}` : ''}`}>{monthNames[i.month]}</button>)
        }
        </div>
        </div>
        
            
        </div>
        </div>
        )
    }
                
    export default Davomat