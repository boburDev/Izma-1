import TTableBlock from '../TableBlock/TTableBlock'
import './Table.scss'

const TTable = ({ block, arr, showDrawer}) => {

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
                    />
                ))
            }
            </div>

            </> : block === "settingsHashRooms" ? <>
               <div className="table-header">
                  <h4 className={'studentHash'}>Id</h4>
                  <h4 className={'studentHash'}>Ism</h4>
                  <h4 className={'studentHash'}>Tahrirlash</h4>
                  <h4 className={'studentHash'}>Amallar</h4>
               </div>

               <div className="table-group-body">
                  {
                     arr && arr.map((el, index) => (
                        <TTableBlock
                              block={'settingsHash'}
                              info={el}
                              index={index+1}
                              key={index}
                        />
                     ))
                  }
                  </div>
            </> : <>
            TTable
            </>
         }
      </div>
   )
}

export default TTable