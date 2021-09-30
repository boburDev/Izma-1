import { useState } from 'react'
import './StudentFilterDebtors.scss'

import StudentFilterDebtorsChecked from './StudentFilterDebtorsChecked'

const StudentFilterDebtors = ()=>{


    return (
        <div className="filterDebtors">
           <StudentFilterDebtorsChecked />    
        </div>
    )
}

export default StudentFilterDebtors