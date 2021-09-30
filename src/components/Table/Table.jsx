import Pagination from '../Pagination/Pagination'
import TableBlock from '../TableBlock/TableBlock'
import './Table.scss'
import { useStudentData } from '../../context/StudentTableProvider'
import { useTeacherData } from '../../context/TeachersTableProvider'

const Table = ({ block, arr, showDrawer}) => {
   const [data] = useStudentData()
   const [teacherData] = useTeacherData()


   return (
      <div className="table">

         {
            block !== 'groupHash' ?

               <>
                  <div className="table-header">
                     <h4 className={block}>id</h4>
                     <h4 className={block}>Ism</h4>
                     <h4 className={block}>telefon</h4>
                     {
                        block === 'studentHash' ?
                           <>
                              <h4 className={block}>guruh</h4>
                              <h4 className={block}>{''}</h4>
                           </> : <></>
                     }
                     <h4 className={block}>{''}</h4>
                  </div>

                  {
                     block === 'studentHash' ?
                        <div className="table-body">
                           {/* {
                              console.log(data && data?.studentData)
                           }
                           {
                              data && data?.studentData.map((el, index) => (
                                 <TableBlock
                                    block={block}
                                    info={el}
                                    index={index}
                                    showDrawer={showDrawer}
                                    key={index}
                                 />
                              ))
                           } */}
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
                     <h4 className={block}>Kod</h4>
                     <h4 className={block}>Kurs nomi</h4>
                     <h4 className={block}>O'qituvchi</h4>
                     <h4 className={block}>Kunlar</h4>
                     <h4 className={block}>Mashg'ulotlar sanalari</h4>
                     <h4 className={block}>Xonalar</h4>
                     <h4 className={block}>Talabalar</h4>
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