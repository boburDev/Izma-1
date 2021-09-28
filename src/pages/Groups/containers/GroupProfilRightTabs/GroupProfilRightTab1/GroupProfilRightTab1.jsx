import './GroupProfilRightTab1.scss'
import CalendarImg from '../../../../../assets/Icons/calendar.svg'

const GroupProfilRightTab1 = () => {

   const fakeData = {
      data: {
         byGroupID: {
            id: "827c6da1-2bc7-46c6-abd5-c4a566143463",
            name: "test-1",
            students: [
               {
                  name: 'one',
               },
               {
                  name: 'two',
               },
               {
                  name: 'thre',
               },
               {
                  name: 'four',
               },
            ],
            days: "fri,mon",
            time: "09:00",
            startDate: "13-09-2021",
            endDate: "31-12-2021"
         }
      }
   }

   return (
      <>
         <div className="izma__groups-attendance-right-tabs-first">
            <div className="izma__groups-attendance-right-tabs-first-up">
               <h3 className="izma__groups-attendance-right-tabs-first-heading">
                  Kurs hali boshlanmagan
               </h3>
               <div className="izma__groups-attendance-right-tabs-first-right">
                  <img className="izma__groups-attendance-right-tabs-first-right-img" src={CalendarImg} alt="img" />
               </div>
            </div>



         </div>
         <div className="davomat-table">
            <div className="heading-davomat">
               <h1>Davomat</h1>
               <div className="davomat-calendar">
                  <button className="current-datas">08/21</button>
                  <button className="next-data">sent</button>
               </div>
            </div>

            <div className="middle-table">
               <h1>Ism</h1>
               <div className="days">
                  <span></span>
               </div>
            </div>

            <div className="students">
               {
                  fakeData.data.byGroupID.students.map(item => (
                     <div className="display-flex">
                        <div className="student-name">
                           {item.name}
                        </div>
                        <div className="student-boryoq">
                           <span></span>
                           <div className="bor-yoq">
                              <button></button>
                              <button></button>
                           </div>
                        </div>
                        <div className="student-boryoq">
                           <span></span>
                           <div className="bor-yoq">
                              <button></button>
                              <button></button>
                           </div>
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
      </>
   )
}
export default GroupProfilRightTab1