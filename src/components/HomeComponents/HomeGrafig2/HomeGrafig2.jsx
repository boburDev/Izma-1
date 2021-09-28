import './HomeGrafig2.scss'
import ApexChart from './chart'

const HomeGrafig2 = () => {
   return (
      <div className="shoppingStatus">
         <div className="inner">
            <div className="heading"><h2>Sotuv jarayoni</h2></div>
            <div className="top_graph">
               <div className="left_side">
                  <div className="same_days">
                     <h3>Haftalik Detallar</h3>
                     <span>Last 7 days</span>
                  </div>
                  <button className="total_view">Detalno ko'rish</button>
               </div>
               <div className="right_side">
                  <ApexChart />
               </div>
            </div>

            <div className="bottom_graph">

               <div className="left_side">
                  <span>2 lidlar</span>
                  <div className="per_wrap four"><div className="per_color"></div></div>

                  <span>Kutish va to’plam</span>
                  <div className="per_wrap one"><div className="per_color"></div></div>
               </div>

               <div className="right_side">
                  <span>Guruhdagi qarz</span>
                  <div className="per_wrap two"><div className="per_color"></div></div>

                  <span>Guruhdagi qarz</span>
                  <div className="per_wrap thre"><div className="per_color"></div></div>
               </div>

            </div>
         </div>
      </div>
   )
}

export default HomeGrafig2