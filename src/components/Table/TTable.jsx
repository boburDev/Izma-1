import TTableBlock from '../TableBlock/TTableBlock'
import './Table.scss'

const TTable = ({ block, arr, showDrawer}) => {
	console.log(arr)


   return (
      <div className="table">
         {
            block === "settingsHash" ? <>
            <div className="table-group-header">
            <h4 className={'groupHash'}>First name / Surname</h4>
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

            </> : <>
            ok
            </>
         }
      </div>
   )
}

export default TTable