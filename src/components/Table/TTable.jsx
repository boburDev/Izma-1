import TTableBlock from '../TableBlock/TTableBlock'
import './Table.scss'
import { useLang } from '../../context/LanguageProvider'
import Language from '../../lang/index'

const TTable = ({ block, arr, showDrawer, setDeleteId, setEditId, setInfo, openModal, setID, deleteRoom, setTakeID}) => {
   const [lang] = useLang();
   return (
      <div className="table">
         {
            block === "settingsHash" ? <>
            <div className="table-group-header">
            <h4 style={{width: '200px'}} className={'groupHash'}>{Language[lang].settings.employee.fullName}</h4>
            <h4 className={'groupHash'}>{Language[lang].settings.employee.role}</h4>
            <h4 className={'groupHash'}>{Language[lang].settings.employee.phoneNumber}</h4>
            <h4 className={'groupHash'}>{Language[lang].settings.employee.edit}</h4>
            <h4 className={'groupHash'}>{Language[lang].settings.employee.actions}</h4>
            </div>

            <div className="table-group-body">
            {
                arr && arr.map((el, index) => (
                    <TTableBlock
                        block={block}
                        info={el}
                        index={index+1}
                        key={index}
                        showDrawer={showDrawer}
                        setDeleteId={setDeleteId}
                        setEditId={setEditId}
                    />
                ))
            }
            </div>

            </> : block === "settingsHashRooms" ? <>
               <div className="table-header">
                  <h4 className={'settingsHashRooms'}>{Language[lang].settings.employee.id}</h4>
                  <h4 className={'settingsHashRooms'}>{Language[lang].settings.employee.fullName}</h4>
                  <h4 className={'settingsHashRooms'}>{Language[lang].settings.employee.edit}</h4>
                  <h4 className={'settingsHashRooms'}>{Language[lang].settings.employee.actions}</h4>
               </div>

               <div className="table-group-body">
                  {
                     arr && arr.map((el, index) => (
                        <TTableBlock
                              block={'settingsHashRooms'}
                              info={el}
                              index={index+1}
                              key={index}
                              setInfo={setInfo}
                              openModal={openModal}
                              setID={setID}
                              deleteRoom={deleteRoom}
                        />
                     ))
                  }
                  </div>
            </> : block === "financeHash" ? <>
               <div className="table-header">
                        <h4 className={'financeHash'}>{Language[lang].finance.filter.studentsFullName}</h4>
                        <h4 className={'financeHash'}>{Language[lang].finance.filter.created}</h4>
                        <h4 className={'financeHash'}>{Language[lang].finance.filter.typePayment}</h4>
                        <h4 className={'financeHash'}>{Language[lang].finance.filter.currency}</h4>
                        <h4 className={'financeHash'}>{Language[lang].finance.filter.comment}</h4>
                        <h4 className={'financeHash'}>{Language[lang].finance.filter.comment}</h4>
               </div>

               <div className="table-group-body">
                  {
                     arr && arr.map((el, index) => (
                        <TTableBlock
                              block={'financeHash'}
                              info={el}
                              index={index+1}
                              key={index}
                        />
                     ))
                  }
                  </div>

            </> : block === "financeCostHash" ? <>
               <div className="table-header">
                  <h4 className={'studentHash3'}>{Language[lang].finance.costsForPeriod.name}</h4>
                  <h4 className={'studentHash3'}>{Language[lang].finance.costsForPeriod.date}</h4>
                  <h4 className={'studentHash3'}>{Language[lang].finance.costsForPeriod.type}</h4>
                  <h4 className={'studentHash3'}>{Language[lang].finance.costsForPeriod.recipient}</h4>
                  <h4 className={'studentHash3'}>{Language[lang].finance.costsForPeriod.currency}</h4>
                  <h4 className={'studentHash3'}>{Language[lang].finance.costsForPeriod.actions}</h4>
               </div>

               <div className="table-group-body">
                  {
                     arr && arr.map((el, index) => (
                        <TTableBlock
                              block={'financeCostHash'}
                              info={el}
                              index={index+1}
                              key={index}
                        />
                     ))
                  }
                  </div>

            </> : block === "financeGroupHash" ? <>
               <div className="table-header">
                     <h4 className={'financeGroupHash'}>{Language[lang].finance.orderInfoGroup.groups}</h4>
                     <h4 className={'financeGroupHash'}>{Language[lang].finance.orderInfoGroup.teachers}</h4>
                     <h4 className={'financeGroupHash'}>{Language[lang].finance.orderInfoGroup.courses}</h4>
                     <h4 className={'financeGroupHash'}>{Language[lang].finance.orderInfoGroup.countStudent}</h4>
                     <h4 className={'financeGroupHash'}>{Language[lang].finance.orderInfoGroup.currency}</h4>
                     <h4 className={'financeGroupHash'}>{Language[lang].finance.orderInfoGroup.allSums}</h4>
               </div>

               <div className="table-group-body">
                  {
                     arr && arr.map((el, index) => (
                        <TTableBlock
                              block={'financeGroupHash'}
                              info={el}
                              index={index+1}
                              key={index}
                        />
                     ))
                  }
                  </div>

            </> : block === "paymentHistory" ? <>
               <div className="table-header">
                                 <h4 className={'paymentHistory'}>{Language[lang].students.payment.recordedDate}</h4>
                                 <h4 className={'paymentHistory'} style={{width: '150px'}}>{Language[lang].students.payment.paymentType}</h4>
                                 <h4 className={'paymentHistory'}>{Language[lang].students.payment.paymentDate}</h4>
                                 <h4 className={'paymentHistory'}>{Language[lang].students.payment.debt}</h4>
                                 <h4 className={'paymentHistory'}>{Language[lang].students.payment.credit}</h4>
                                 <h4 className={'paymentHistory'}>{Language[lang].students.payment.comment}</h4>
                                 <h4 className={'paymentHistory'}>{Language[lang].students.payment.employee}</h4>
               </div>

               <div className="table-group-body">
                  {
                     arr && arr.map((el, index) => (
                        <TTableBlock
                              block={'paymentHistory'}
                              info={el}
                              index={index+1}
                              key={index}
                        />
                     ))
                  }
                  </div>

            </> : block === "settingsArchive" ? <>
               <div className="table-header">
                  <h4 className={'paymentHistory'}>{Language[lang].settings.employee.id}</h4>
                  <h4 className={'paymentHistory'}>{Language[lang].settings.employee.fullName}</h4>
                  <h4 className={'paymentHistory'}>{Language[lang].settings.employee.role}</h4>
                  <h4 className={'paymentHistory'}>{Language[lang].settings.employee.actions}</h4>
               </div>

               <div className="table-group-body">
                  {
                     arr && arr.map((el, index) => (
                        <TTableBlock
                              block={'settingsArchive'}
                              info={el}
                              index={index+1}
                              key={index}
                              setTakeID={setTakeID}
                        />
                     ))
                  }
                  </div>

            </> : block === "test" ? <>
               <div className="table-header">
                  <h4 className={'paymentHistory'}>id</h4>
                  <h4 className={'paymentHistory'}>fullName</h4>
                  <h4 className={'paymentHistory'}>tulov</h4>
                  <h4 className={'paymentHistory'}>voqt</h4>
                  <h4 className={'paymentHistory'}>gruppasi</h4>
               </div>

               <div className="table-group-body">
                  {
                     arr && arr.map((el, index) => (
                        <TTableBlock
                              block={'test'}
                              info={el}
                              index={index+1}
                              key={index}
                              setTakeID={setTakeID}
                        />
                     ))
                  }
                  </div>

            </>: <>
            TTable
            </>
         }
      </div>
   )
}

export default TTable