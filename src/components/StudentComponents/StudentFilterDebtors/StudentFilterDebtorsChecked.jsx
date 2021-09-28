import './StudentFilterDebtors.scss'

import { useState } from 'react'
import { useStudentFilter } from '../../../context/StudentFilter'

const StudentFilterDebtorsChecked = ({ nameSoha})=>{
    const [filterSoha, setFilterSoha] = useState(false)
    const [setDeb] = useStudentFilter(true)
    const [deb] = useStudentFilter()


    return (
        <div
            className={`filterName  ${filterSoha ? 'checked' : ' '}`}
            onClick={() => {
                setDeb([...deb, nameSoha])
                setFilterSoha(!filterSoha)}}
        >
            <span>{nameSoha}</span>
        </div>
    )
}

export default StudentFilterDebtorsChecked