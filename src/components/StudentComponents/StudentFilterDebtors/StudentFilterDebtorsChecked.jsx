import './StudentFilterDebtors.scss'

import { useState } from 'react'
import { useStudentFilter } from '../../../context/StudentFilter'

const StudentFilterDebtorsChecked = ()=>{
    const [trueFalse, setTrueFalse] = useStudentFilter()


    return (
        <>
            <div
                className={`filterName  ${trueFalse.credit ? 'checked' : ' '}`}
                onClick={() => setTrueFalse({credit: !trueFalse.credit, sales: trueFalse.sales})}
            >
                <span>Qarzdorlar</span>
            </div>
            <div
                className={`filterName  ${trueFalse.sales ? 'checked' : ' '}`}
                onClick={() => setTrueFalse({sales: !trueFalse.sales, credit: trueFalse.credit})}
            >
                <span>Chegirmalar</span>
            </div>
        </>
    )
}

export default StudentFilterDebtorsChecked