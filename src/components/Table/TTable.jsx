import TTableBlock from '../TableBlock/TTableBlock'
import './Table.scss'

const TTable = ({ block, arr, showDrawer, setDeleteId, setEditId, setInfo, openModal, setID, deleteRoom, setTakeID}) => {

   return (
      <div className="table">
         {
            block === "settingsHash" ? <>
            <div className="table-group-header">
            <h4 style={{width: '200px'}} className={'groupHash'}>First name / Surname</h4>
            <h4 className={'groupHash'}>Roli</h4>
            <h4 className={'groupHash'}>Telefon</h4>
            <h4 className={'groupHash'}>Tahrirlash</h4>
            <h4 className={'groupHash'}>Amallar</h4>
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
                  <h4 className={'settingsHashRooms'}>Id</h4>
                  <h4 className={'settingsHashRooms'}>Ism</h4>
                  <h4 className={'settingsHashRooms'}>Tahrirlash</h4>
                  <h4 className={'settingsHashRooms'}>Amallar</h4>
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
                        <h4 className={'financeHash'}>Talabalar ismi</h4>
                        <h4 className={'financeHash'}>Yaratilgan</h4>
                        <h4 className={'financeHash'}>Tulov turi</h4>
                        <h4 className={'financeHash'}>So’m</h4>
                        <h4 className={'financeHash'}>Izoh</h4>
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
                  <h4 className={'studentHash3'}>Nomi</h4>
                  <h4 className={'studentHash3'}>Sana</h4>
                  <h4 className={'studentHash3'}>Turkum</h4>
                  <h4 className={'studentHash3'}>Oluvchi</h4>
                  <h4 className={'studentHash3'}>So'm</h4>
                  <h4 className={'studentHash3'}>Amallar</h4>
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
                              <h4 className={'financeGroupHash'}>Guruhlar</h4>
                              <h4 className={'financeGroupHash'}>O’qituvchilar</h4>
                              <h4 className={'financeGroupHash'}>Kurslar</h4>
                              <h4 className={'financeGroupHash'}>O'quvchilar soni</h4>
                              <h4 className={'financeGroupHash'}>So'm</h4>
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
                                 <h4 className={'paymentHistory'}>Yozib olingan sana</h4>
                                 <h4 className={'paymentHistory'}>To'lov usuli</h4>
                                 <h4 className={'paymentHistory'}>Sana</h4>
                                 <h4 className={'paymentHistory'}>Debit</h4>
                                 <h4 className={'paymentHistory'}>Credit</h4>
                                 <h4 className={'paymentHistory'}>Izoh</h4>
                                 <h4 className={'paymentHistory'}>Xodim</h4>
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
                  <h4 className={'paymentHistory'}>Id</h4>
                  <h4 className={'paymentHistory'}>Ismi</h4>
                  <h4 className={'paymentHistory'}>Roli</h4>
                  <h4 className={'paymentHistory'}>Amallar</h4>
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

            </> :<>
            TTable
            </>
         }
      </div>
   )
}

export default TTable