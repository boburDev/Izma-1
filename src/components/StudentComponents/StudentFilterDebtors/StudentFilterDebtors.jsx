import { useState } from 'react'
import './StudentFilterDebtors.scss'

import StudentFilterDebtorsChecked from './StudentFilterDebtorsChecked'

const StudentFilterDebtors = ()=>{


    const filterArr = [
        { filter: 'Chegirmalar' },
        { filter: 'Qarzdorlar' }
    ]

    return (
        <div className="filterDebtors">
            {
                filterArr.map((item, i) =>(
                    <StudentFilterDebtorsChecked
                        key={`${i}`}
                        nameSoha={item.filter}
                    />    
                ))
            }
        </div>
    )
}

export default StudentFilterDebtors