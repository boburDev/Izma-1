import DeleteImg from '../../../assets/Icons/settings-delete.svg'
import TTable from '../../../components/Table/TTable';
import './Archive.scss'


const Archive = () => {

   console.log(12)

   const data = []


   return (
      <>
         <div className="izma__settings-archive">
            <div className="izma__settings-archive-up">
               <h3 className="izma__settings-archive-up-heading">
                  Formalar
               </h3>
               <h4 className="izma__settingsarchive-up-title">
                  Xodimlar | Arxiv
               </h4>


            </div>
            <div className="izma__settings-archive-button">
               <TTable arr={data} block={"settingsArchive"} />
            </div>
         </div>

      </>
   )
}


export default Archive;
