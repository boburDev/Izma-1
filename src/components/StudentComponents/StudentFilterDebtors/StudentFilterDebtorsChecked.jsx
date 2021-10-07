import './StudentFilterDebtors.scss'
import { useStudentFilter } from '../../../context/StudentFilter'
import Language from '../../../lang/index'
import { useLang } from '../../../context/LanguageProvider'

const StudentFilterDebtorsChecked = ()=>{
    const [trueFalse, setTrueFalse] = useStudentFilter()

    const [lang] = useLang()


    return (
        <>
            <div
                className={`filterName  ${trueFalse.credit ? 'checked' : ' '}`}
                onClick={() => setTrueFalse({credit: !trueFalse.credit, sales: trueFalse.sales})}
            >
                <span>{Language[lang].students.abtCourse.debt}</span>
            </div>
            <div
                className={`filterName  ${trueFalse.sales ? 'checked' : ' '}`}
                onClick={() => setTrueFalse({sales: !trueFalse.sales, credit: trueFalse.credit})}
            >
                <span>{Language[lang].students.abtCourse.discount}</span>
            </div>
        </>
    )
}

export default StudentFilterDebtorsChecked