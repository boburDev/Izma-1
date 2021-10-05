import './HomeGrafig2.scss'
import ApexChart from './chart'

const HomeGrafig2 = (props) => {
   return (
      <div className="shoppingStatus">
         <div className="inner">
            <div className="heading"><h2>{props.lang.mProcess}</h2></div>
            <div className="top_graph">
               <div className="left_side">
                  <div className="same_days">
                     <h3>{props.lang.wStatistics}</h3>
                     <span>{props.lang.lSevenDay}</span>
                  </div>
                  <button className="total_view">{props.lang.seeAll}</button>
               </div>
               <div className="right_side">
                  <ApexChart lang={props.lang.daysShort} />
               </div>
            </div>

            <div className="bottom_graph">

               <div className="left_side">
                  <span>2 {props.lang.leads}</span>
                  <div className="per_wrap four"><div className="per_color"></div></div>

                  <span>{ props.lang.waitAndPack }</span>
                  <div className="per_wrap one"><div className="per_color"></div></div>
               </div>

               <div className="right_side">
                  <span>{props.lang.groupDebpt}</span>
                  <div className="per_wrap two"><div className="per_color"></div></div>
               </div>

            </div>
         </div>
      </div>
   )
}

export default HomeGrafig2