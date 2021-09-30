import LidHistoryBlock from '../../../components/LidsComponents/LidHistoryBlock/LidHistoryBlock'
import './LidsEdit.scss'

const LidsEdit = ({ setEdit, edit }) => {
   return (
      <div className={`lidsedit ${edit ? 'active' : ''}`}>
         <div className="lidsedit-header">
            <h2>Yaratishni o’rnatish</h2>

            <div className="closeBox" onClick={() => setEdit(false)}>
               <span></span>
            </div>
         </div>
         <div className="lidsedit-body">
            <div className="lidsedit-body-left">
               <form action="" >
                  <div className="row">
                     <label htmlFor="Nomi">Nomi</label>
                     <input type="text" />
                  </div>
                  <div className="row">
                     <label htmlFor="Nomi">Kursni tanlash</label>
                     <input type="text" />
                  </div>
                  <div className="row">
                     <label htmlFor="Nomi">O’qituvchini tanlang</label>
                     <input type="text" />
                  </div>
                  <div className="row">
                     <label htmlFor="Nomi">Kunlar</label>
                     <input type="text" />
                  </div>
                  <div className="row">
                     <label htmlFor="Nomi">Darsning boshlanish vaqti</label>
                     <input type="text" />
                  </div>
                  <button type="submit" >Yaratish</button>
               </form>
            </div>

            <div className="lidsedit-body-right">
               <h2>Tarix</h2>

               <div className="lidsedit-body-right-list">
                  <LidHistoryBlock />
                  <LidHistoryBlock />
                  <LidHistoryBlock />
                  <LidHistoryBlock />
               </div>
            </div>
         </div>
      </div>
   )
}

export default LidsEdit