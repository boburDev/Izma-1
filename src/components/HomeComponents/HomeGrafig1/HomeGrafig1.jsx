import { Component } from "react"
import ReactApexCharts from "react-apexcharts"
import React from 'react';
import './HomeGrafig1.scss'

class HomeGrafig1 extends Component {
   constructor(props) {
      super(props);
      let total = 42459
      let elTotal = total / 100
      let telegram = 23043
      let elTelegram = telegram / elTotal
      let elTelegrams = elTelegram.toFixed(2)
      let instagram = 14658
      let elInstagram = instagram / elTotal
      let elInstagrams = elInstagram.toFixed(2)
      let Facebook = 4758
      let elFacebook = Facebook / elTotal
      let elFacebooks = elFacebook.toFixed(2)
      this.state = {

         series: [elTelegrams, elInstagrams, elFacebooks],
         options: {
            chart: {
               height: 280,
               type: 'radialBar',
            },
            plotOptions: {
               radialBar: {
                  dataLabels: {
                     name: {
                        fontSize: '22px',

                     },
                     value: {
                        fontSize: '16px',
                     },
                     total: {
                        show: true,
                        label: 'Umumiy',
                        formatter: function (w) {
                           return total
                        }
                     }
                  }
               }
            },
            labels: ['Telegram', 'Instagram', 'Facebook'],
         },


      };
   }



   render() {
      return (

         <>
            <div className="izma__graph-section">


               <div className="graph__section">

                  <div id="chart">
                     <h2 className='izma__graph-heading' >
                        Mijoz manbalari
                     </h2>
                     <div className="chart-wrapper">
                        <ReactApexCharts className="react-chart-izma" options={this.state.options} series={this.state.series} type="radialBar" height={250} />
                     </div>
                     <div className="izma__graph-info">

                        <div className="izma__graph-order">
                           <div className="izma__graph-order-left">
                              <div className="circle__graph circle__graph-telegram"></div>
                              <p className="izma__graph-info-text">
                                 Telegram
                              </p>
                           </div>
                           <div className="izma__graph-order-right">
                              <p className="izma__graph-info-number">
                                 23043
                              </p>
                           </div>
                        </div>

                        <div className="izma__graph-order">
                           <div className="izma__graph-order-left">
                              <div className="circle__graph circle__graph-instagram"></div>
                              <p className="izma__graph-info-text">
                                 Instagram
                              </p>
                           </div>
                           <div className="izma__graph-order-right">
                              <p className="izma__graph-info-number">
                                 14658            </p>
                           </div>
                        </div>

                        <div className="izma__graph-order">
                           <div className="izma__graph-order-left">
                              <div className="circle__graph circle__graph-facebook"></div>
                              <p className="izma__graph-info-text">
                                 Facebook
                              </p>
                           </div>
                           <div className="izma__graph-order-right">
                              <p className="izma__graph-info-number">
                                 4758
                              </p>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>


            </div>




         </>


      )

   }
}


export default HomeGrafig1