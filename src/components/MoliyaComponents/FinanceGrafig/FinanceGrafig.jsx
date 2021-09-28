import { Component } from "react"
import ReactApexCharts from "react-apexcharts"
import React from 'react';
import './FinanceGrafig.scss'

class FinanceGrafig extends Component {
   constructor(props) {
      super(props);
      this.state = {
         series: [
            {
               name: "Finance",
               data: ['1', '1.5', '2.5', '3',]
            },
         ],
         options: {
            chart: {
               type: "line",
               stacked: false
            },

            colors: ["#E59F3F"],

            stroke: {
               width: [4, 4]
            },
            plotOptions: {
               bar: {
                  columnWidth: "20%"
               }
            },
            xaxis: {
               categories: [18.08, 21.08, 25.08, 29.08,]
            },
            yaxis: [
               {
                  labels: {
                     style: {
                        colors: "#222222"
                     }
                  },

               },

            ],

         }

      };
   }

   render() {
      return (
         <>
            <ReactApexCharts options={this.state.options} series={this.state.series} type="line" width={520} height={415} />
         </>
      )
   }
}

export default FinanceGrafig