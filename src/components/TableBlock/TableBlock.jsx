import './TableBlock.scss'
import DeleteImg from '../../assets/Icons/delete-border.svg'
import DollarImg from '../../assets/Icons/dollar-border.svg'
import { Link } from 'react-router-dom'
import { useStudentPay } from '../../context/StudentPay'
import { DELETE_STUDENT } from  '../../Querys/Table_Query'
import { DELETE_TEACHER } from '../../Querys/Teacher_Query'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import  Modal1  from '../../components/Modal/Modal'
import { dayDivider } from '../../.../../context/DayDividerProvider'
import { useNavbar } from '../../context/NavbarProvider'

const TableBlock = ({ block, info, index, showDrawer }) => {
   const [setNavbarP] = useNavbar(true)
   const [ /*stID*/, setStudentID] = useStudentPay()
   const [modal, setModal] = useState()
   const [getID] = useMutation(DELETE_STUDENT)
   const [deleteTeacher] = useMutation(DELETE_TEACHER)
   
   


   return (
      <div className="tableBlock">
         {
            block !== 'groupHash' ?

               <>
                  <h4 className={`${block}`}>{block !== 'studentHash' && index+1}</h4>
                  <h4 className={`${block}`}>

                     {
                        block === 'studentHash' ?
                           <Link to={`/studentProfile/${info?.id}`}
                              onClick={() => {
                                 setNavbarP(info?.id)
                              }}
                           >
                              {info?.name}
                           </Link>
                           :
                           <Link to={`/teacherProfile/${info?.Id}`}
                              onClick={() => {
                                 setNavbarP(info?.id)
                              }}
                           >
                              {info?.name}
                           </Link>

                     }
                  </h4>
                  {
                     block === 'studentHash' ?  <>
                        {
                           info?.mainPhone[0]?.phone ?
                              <h4 className={`${block}`}><span>{info?.mainPhone[0]?.phone}</span></h4>
                              :
                              <h4 className={`${block}`}>{''}</h4>
                        }
                     </> : <>
                           <h4 className={`${block}`}><span>{info?.phoneNumber}</span></h4>
                     </>
                  }


                  {
                     block === 'studentHash' ? <>
                        {
                           info && info.groups.length > 0 ?
                           <>
                                 <h4 key={block} className={`${block}`} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                              {
                                 info?.groups?.map(el =>
                                    <span className="stuentGrWr" key={el?.name}><span className="studentGr">{el?.name}</span>({el?.teacher} - {el?.time})</span>
                                    )
                              }
                                 </h4>
                           </> 
                           :
                           <>
                                 <h4 className={`${block}`}
                                    
                                 >{''}</h4>
                           </>
                        }
                        <h4 className={`${block}`}
                           onClick={() => {
                              setStudentID({
                                 studentName: info?.name,
                                 studentId: info?.id
                              })
                              showDrawer()
                           }}
                        >
                           <img src={DollarImg} alt="" />
                        </h4>
                     </> : <></>
                  }


                  <h4 className={`${block}`}>
                     <Modal1
                     block="delete"
                        myModal={modal}
                        setMymodal={setModal}
                        title={info.__typename === 'Colleagues' ? `O'qituvchini o'chirish` : info.__typename === 'Students' ? `O'quvchini o'chirish` : ''}
                        text={info?.name + `ni o'chirilshni hohlaysizmi ?`}
                        info={info.__typename === 'Colleagues' ? { variables: { id: info.Id, status: -5 } } : info.__typename === 'Students' ? { variables: { studentID: info.id } } : ''}
                        setInfo={info.__typename === 'Colleagues' ? deleteTeacher : info.__typename === 'Students' ? getID : ''}
                     />
                     <img src={DeleteImg} alt="" onClick={() => {
                        setModal(true)
                     }}/>
                  </h4>
               </> :

               <Link to={`/groups/groupsProfil/${info?.id}`}
                 onClick={() => {
                    setNavbarP(info?.id)
                 }}
               >
                  <h4 className={`${block}`}>{index}</h4>
                  <h4 className={`${block}`}>{info?.name}</h4>
                  <h4 className={`${block}`}>{info?.teacher}</h4>
                  <h4 className={`${block}`}>{dayDivider(info.days)}</h4>
                  <h4 className={`${block}`}><span>{info?.startDate}</span>&nbsp;&nbsp;&nbsp;<span>{info?.endDate}</span></h4>
                  <h4 className={`${block}`}>{info?.rooms}</h4>
                  <h4 className={`${block}`}>{info?.studentsCount}</h4>
               </Link>
         }
      </div>
   )
}


export default TableBlock