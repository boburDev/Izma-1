import ReactApexCharts from "react-apexcharts"

function ApexChart (props) {

   const state = {

      series: [{
         name: 'Inflation',
         data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2]
      }],
      options: {
         chart: {
            height: 350,
            type: 'bar',
         },
         plotOptions: {
            bar: {
               borderRadius: 10,
               width: 26,
               dataLabels: {
                  position: 'top', // top, center, bottom
               },
            }
         },
         dataLabels: {
            enabled: false,
            formatter: function (val) {
               return val + "%";
            },
            offsetY: -20,
            style: {
               fontSize: '12px',
               colors: ["#304758"]
            }
         },

         xaxis: {
            categories: props.lang,
            position: 'top',
            axisBorder: {
               show: false
            },
            axisTicks: {
               show: false
            },
            crosshairs: {
               fill: {
                  type: 'gradient',
                  gradient: {
                     colorFrom: '#D8E3F0',
                     colorTo: '#BED1E6',
                     stops: [0, 100],
                     opacityFrom: 0.4,
                     opacityTo: 0.5,
                  }
               }
            },
            tooltip: {
               enabled: false,
            }
         },
         yaxis: {
            axisBorder: {
               show: false
            },
            axisTicks: {
               show: false,
            },
            labels: {
               show: false,
               formatter: function (val) {
                  return val + "%";
               }
            }

         },
      },


   };
      return (


         <div id="chart">
            <ReactApexCharts options={state.options} series={state.series} type="bar" height={250} />
         </div>
      )
}

export default ApexChart