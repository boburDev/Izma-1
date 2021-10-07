import Pagination from '../Pagination/Pagination'
import TableBlock from '../TableBlock/TableBlock'
import './Table.scss'
import { useStudentData } from '../../context/StudentTableProvider'
import { useTeacherData } from '../../context/TeachersTableProvider'
import { useLang } from '../../context/LanguageProvider'
import Language from '../../lang/index'

const Table = ({ block, arr, showDrawer}) => {
   const [data] = useStudentData()
   const [teacherData] = useTeacherData()

   const [lang] = useLang()


   return (
      <div className="table">

         {
            block !== 'groupHash' ?

               <>
                  <div className="table-header">
                     <h4 className={block}>{block !== 'studentHash' && 'id'}</h4>
                     <h4 className={block}>{Language[lang].settings.forms.name}</h4>
                     <h4 className={block}>{Language[lang].teachers.editTeacherInfo.phoneNumber}</h4>
                     {
                        block === 'studentHash' ?
                           <>
                              <h4 className={block}>{Language[lang].students.recordPayment.groupName}</h4>
                              <h4 className={block}>{''}</h4>
                           </> : <></>
                     }
                     <h4 className={block}>{''}</h4>
                  </div>

                  {
                     block === 'studentHash' ?
                        <div className="table-body">
                           {
                              data && data?.studentData?.map((el, index) => (
                                 <TableBlock
                                    block={block}
                                    info={el}
                                    index={index}
                                    showDrawer={showDrawer}
                                    key={index}
                                 />
                              ))
                           }
                            <Pagination />
                        </div>
                        :
                        <div className="table-body">
                           {
                              teacherData && teacherData?.colleagues?.map((el, index) => (
                                 <TableBlock
                                    block={block}
                                    info={el}
                                    index={index}
                                    key={index}
                                 />
                              ))
                           }
                        </div>
                  }


               </> :

               <>
                  <div className="table-group-header">
                     <h4 className={block}>{Language[lang].groups.tableRow.code}</h4>
                     <h4 className={block}>{Language[lang].groups.tableRow.courseName}</h4>
                     <h4 className={block}>{Language[lang].groups.tableRow.teacher}</h4>
                     <h4 className={block}>{Language[lang].groups.tableRow.daysTitle}</h4>
                     <h4 className={block}>{Language[lang].groups.tableRow.trainingDates}</h4>
                     <h4 className={block}>{Language[lang].groups.tableRow.room}</h4>
                     <h4 className={block}>{Language[lang].groups.tableRow.countStudents}</h4>
                  </div>

                  <div className="table-group-body">
                     {
                        arr && arr.map((el, index) => (
                           <TableBlock
                              block={block}
                              info={el}
                              index={index+1}
                              key={index}
                           />
                        ))
                     }
                  </div>


               </>
         }
      </div>
   )
}

export default Table